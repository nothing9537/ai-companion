This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

Install dependencies and run the project

```bash
npm i
# and
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
----

## About

This is an application for communicating with AI companions. All base variants were created using OpenAI, Replicate llama-2-13b model. The user can communicate with them in real time, create their own custom companions, but only with a subscription. The subscription is fake, and is regulated by Stripe.

The app supports theming, application has 2 themes: Dark and Light. 

It also supports adaptability out of the box, thanks to TailwindCSS and shadcn-ui.

Also, the user can search for companions by category and description/name.

This is the basic functionality, let's look at each section in more detail

Sometimes companions may take a long time to respond, or not respond at all. You should either choose another companion, wait, or retry your request
----

## Architecture

The project was written on a modern Front-end architecture - FSD (Feature Sliced Design)

Read more about the architecture - [here](https://feature-sliced.design/docs/get-started/overview)

In a nutshell, the architecture is a file structure divided into layers (hereafter referred to as `LAYER`'s). Each `LAYER` has its own slice (hereinafter referred to as `SLICE`'s), and each `SLICE` has its own segments (hereinafter referred to as `SEGMENT`'s).

The architecture is presented in a hierarchical structure: **`app/pages/widgets/features/entities/shared`**

3 pillars of the architecture:

1) Each `LAYER` can only import from underlying `LAYER`'s. That is, from pages can't import anything from app, can't use in `enitities` something from `widgets` / `features`, `shared` can't use anything "from above" at all. There are valid exceptions that are customized for the project, like redux state, some configs and such.

2) Every SLICE should have a public-api, from which only what is really needed is exported, and nothing more.

3) Also, you can't use `LAYER-in-LAYER`. The exceptions are `entities` (more on the types level) and `shared`. Shared doesn't really have much structure, basic `lib/api/types/config/ui` are welcome there. 


----

## Users

When a user accesses the site for the first time, they need to register / authorize through any available method, through the Clerk authentication system.

In the basic version of the account, the user can communicate with the available companions, but he can only create companions after signing up.

For fake subscription, use the following data: [here](/docs/subsciption.md)

----

## Companions

Companions are user-created AI models based on incoming data. They are close to communicating like a real person, with their own unique character that depends on the input parameters.

You can communicate with them without a fake subscription, and create your own with a fake subscription.

The llama-2-13b model was used for the companion model.

List of project libraries related to AI

- `pinecone` - vector database
- `openai` - AI models, requests, Embeddings
- `upstash`- Also Redis DB
- `langchain`
- `ai` - from vercel, used for live chat

----

## Scripts

- `npm run dev - ` application launch in development mode
- `npm run build - ` building an application for production mode via webpack
- `npm run lint - ` runs ESlint rules compliance check
- `npm run lint:fix - ` fix all auto-fixable ESLint problems
- `npm run studio` - runs prisma.js studio to manage Database
- `npm run db:update` - updates db and Schema in project
- `npm run add:component` - adds component from shadcn-ui, for ex `npm run add:component button`

----

## Technology Stack

The main infrastructure of the application is built on a modern framework for building fullstack applications, NextJS 13. 

A complete list of the entire technology stack is given below

- **[React 18](https://react.dev/learn)**
- **[NextJS 13](https://nextjs.org/docs)**
- **[Tailwind CSS](https://tailwindcss.com/docs/installation)**
- **[Clerk](https://clerk.com/docs/quickstarts/nextjs)**
- **[PlanetScale](https://planetscale.com/docs/concepts/what-is-planetscale)**
- **[Prisma.js](https://www.prisma.io/docs/getting-started)**
- **[react-hook-form](https://react-hook-form.com/get-started)**
- **[shadcn-ui](https://ui.shadcn.com/docs)**
- **[zustand](https://docs.pmnd.rs/zustand/getting-started/introduction)**
- **[Stripe](https://stripe.com/docs/api)**
- **[langchain](https://js.langchain.com/docs/get_started/introduction)**
- **[pineconde](https://sdk.pinecone.io/typescript/)**
- **[ai](https://sdk.vercel.ai/docs)**
- **[replicate](https://github.com/replicate/replicate-javascript)**

----

## ORM

Prisma.js, one of the most advanced solutions in this area, was chosen as ORM (Object-Oriental Mapping) technology for database querying. 

In conjunction with the [vs-code extension](https://marketplace.visualstudio.com/items?itemName=Prisma.prisma), it allows you to conveniently compose models, generate a database object, as well as provides a convenient API for working with the database.

All described types in the model are installed in the project as a package, and they can be imported from any place from a single package throughout the project. 

Prisma also provides a handy prisma-studio **`(npx prisma studio)`** that allows direct interaction with the database, and supports all CRUD operations.

----

## Database

PlanetScale cloud database was chosen as the database, which makes it very easy to set up databases. I used a MySQL database from PlanetScale to store all the application information.

For uploading images used [Cloudinary service](https://cloudinary.com/documentation/react_integration).

----

## Environment

The application infrastructure is built on the requirement of **Next JS** framework as it works based on the file and folder structure in the application.

Navigation and working with backend endpoints is done through the folder and file structure.

As described above, the project was developed on FSD-architecture. It allows to easily decompose the code into its own areas of responsibility, no unnecessary dependencies between components are created, the project is easily scalable and maintainable

The `shared` layer contains many handy utilities for interacting with libraries. Hooks, classes, functions, and so on.

----

## Working with forms

Although the application is not large, it contains a large number of forms. In the course of development we developed a wrapper component FormFieldWrapper, based on React.Context, which allows you to conveniently interact with props on the top level. [More about the component](/docs/form-field-wrapper.md)

----

## ENV Structure

```js
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY= /* Key for interaction with Clerk Authorization API */

CLERK_SECRET_KEY= /* Clerk Secret Key */

DATABASE_URL= /* Reference to the database, including authorization data */

NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME= /* Cloudinary key for images uploading */

PINECONE_INDEX=
PINECONE_ENVIRONMENT=
PINECONE_API_KEY=

UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=

OPENAI_API_KEY=

REPLICATE_API_TOKEN=

STRIPE_API_KEY=/* Stripe payment system */
STRIPE_WEBHOOK_SECRET=/* Stripe webhook */

NEXT_PUBLIC_APP_URL=/* Website url */


```
----
