// import dotenv from 'dotenv';
import { StreamingTextResponse, LangChainStream } from 'ai';
import { currentUser } from '@clerk/nextjs';
import { Replicate } from 'langchain/llms/replicate';
import { CallbackManager } from 'langchain/callbacks';
import { NextResponse } from 'next/server';

import { rateLimit } from '@/shared/lib/rate-limit';
import { MemoryManager } from '@/shared/lib/memory';
import { db } from '@/shared/lib/db';

// dotenv.config({ path: '.env' });

export async function POST(
  request: Request,
  { params }: { params: { chatId: string } },
) {
  try {
    const { prompt } = await request.json();
    const user = await currentUser();

    if (!user || !user.firstName || !user.id) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const identifier = `${request.url}-${user.id}`;
    const { success } = await rateLimit(identifier);

    if (!success) {
      return new NextResponse('Rate limit exceeded', { status: 429 });
    }

    const companion = await db.companion.update({
      where: {
        id: params.chatId,
      },
      data: {
        messages: {
          create: {
            content: prompt,
            role: 'user',
            userId: user.id,
          },
        },
      },
    });

    if (!companion) {
      return new NextResponse('Companion not found', { status: 404 });
    }

    const name = companion.id;
    // eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-unused-vars
    const companion_file_name = `${name}.txt`;

    const companionKey = {
      companionName: name!,
      userId: user.id,
      modelName: 'llama2-13b',
    };

    console.log('GET MEMORY MANAGER INSTANCE BEFORE', new Date().toLocaleString());
    const memoryManager = await MemoryManager.getInstance();
    console.log('GET MEMORY MANAGER INSTANCE AFTER', new Date().toLocaleString());

    console.log('GET MEMORY MANAGER READ LATEST HISTORY BEFORE', new Date().toLocaleString());
    const records = await memoryManager.readLatestHistory(companionKey);
    console.log('GET MEMORY MANAGER READ LATEST HISTORY AFTER', new Date().toLocaleString());
    if (records.length === 0) {
      console.log('MEMORY MANAGER seedChatHistory BEFORE', new Date().toLocaleString());
      await memoryManager.seedChatHistory(companion.seed, '\n\n', companionKey);
      console.log('MEMORY MANAGER seedChatHistory AFTER', new Date().toLocaleString());
    }
    console.log('MEMORY MANAGER writeToHistory BEFORE', new Date().toLocaleString());
    await memoryManager.writeToHistory(`User: ${prompt}\n`, companionKey);
    console.log('MEMORY MANAGER recentChatHistory BEFORE', new Date().toLocaleString());
    const recentChatHistory = await memoryManager.readLatestHistory(companionKey);
    console.log('MEMORY MANAGER recentChatHistory AFTER', new Date().toLocaleString());

    console.log('MEMORY MANAGER vectorSearch BEFORE', new Date().toLocaleString());
    // const similarDocs = await memoryManager.vectorSearch(
    //   recentChatHistory,
    //   companion_file_name,
    // );
    console.log('MEMORY MANAGER vectorSearch AFTER', new Date().toLocaleString());

    const relevantHistory = '';
    // if (!!similarDocs && similarDocs.length !== 0) {
    //   relevantHistory = similarDocs.map((doc) => doc.pageContent).join('\n');
    // }
    const { handlers } = LangChainStream();
    // Call Replicate for inference
    console.log('CREATE MODEL BEFORE', new Date().toLocaleString());
    const model = new Replicate({
      model:
        'a16z-infra/llama-2-13b-chat:df7690f1994d94e96ad9d568eac121aecf50684a0b0963b25a41cc40061269e5',
      input: {
        max_length: 2048,
      },
      apiKey: process.env.REPLICATE_API_TOKEN,
      callbackManager: CallbackManager.fromHandlers(handlers),
    });
    console.log('CREATE MODEL AFTER', new Date().toLocaleString());

    // Turn verbose on for debugging
    model.verbose = true;

    console.log('MODEL RESP BEFORE', new Date().toLocaleString());
    const resp = String(
      await model
        .call(
          `
        ONLY generate plain sentences without prefix of who is speaking. DO NOT use ${companion.name}: prefix. 

        ${companion.instructions}

        Below are relevant details about ${companion.name}'s past and the conversation you are in.
        ${relevantHistory}


        ${recentChatHistory}\n${companion.name}:`,
        )
        .catch(console.error),
    );
    console.log('MODEL RESP AFTER', new Date().toLocaleString());

    const cleaned = resp.replaceAll(',', '');
    const chunks = cleaned.split('\n');
    const response = chunks[0];

    console.log('MEMORY MANAGER writeToHistory BEFORE', new Date().toLocaleString());
    await memoryManager.writeToHistory(`${response.trim()}`, companionKey);
    console.log('MEMORY MANAGER writeToHistory AFTER', new Date().toLocaleString());
    // eslint-disable-next-line global-require
    const { Readable } = require('stream');

    const s = new Readable();
    s.push(response);
    s.push(null);
    if (response !== undefined && response.length > 1) {
      console.log('MEMORY MANAGER RESPONSE writeToHistory BEFORE', new Date().toLocaleString());
      await memoryManager.writeToHistory(`${response.trim()}`, companionKey);
      console.log('MEMORY MANAGER RESPONSE writeToHistory AFTER', new Date().toLocaleString());

      await db.companion.update({
        where: {
          id: params.chatId,
        },
        data: {
          messages: {
            create: {
              content: response.trim(),
              role: 'system',
              userId: user.id,
            },
          },
        },
      });
    }

    return new StreamingTextResponse(s);
  } catch (error) {
    return new NextResponse('Internal Error', { status: 500 });
  }
}
