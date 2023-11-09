'use client';

import { FC, memo, useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Category, Companion } from '@prisma/client';
import { Wand2 } from 'lucide-react';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';

import { cn } from '@/shared/lib/utils';
import { Form, FormControl } from '@/shared/shadcn-ui/ui/form';
import { Separator } from '@/shared/shadcn-ui/ui/separator';
import { FormFieldWrapper } from '@/shared/lib/components/form-field-wrapper';
import { Input } from '@/shared/shadcn-ui/ui/input';
import { ImageUpload } from '@/features/image-upload';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/shadcn-ui/ui/select';
import { Textarea } from '@/shared/shadcn-ui/ui/textarea';
import { PREAMBLE, SEED_CHAT } from '@/shared/consts/ai-seed-and-preabmle';
import { Button } from '@/shared/shadcn-ui/ui/button';
import { useToast } from '@/shared/shadcn-ui/ui/use-toast';
import { CompanionFormSchema, CompanionFormSchemaValues, companionAPI } from '@/entities/companion';

interface CompanionFormProps {
  initialData: Companion | null;
  categories: Category[];
  className?: string;
}

export const CompanionForm: FC<CompanionFormProps> = memo(({ categories, initialData, className }) => {
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<CompanionFormSchemaValues>({
    resolver: zodResolver(CompanionFormSchema),
    mode: 'all',
    defaultValues: initialData || {
      name: '',
      description: '',
      instructions: '',
      seed: '',
      imageUrl: '',
      categoryId: undefined,
    },
  });

  const isLoading = form.formState.isSubmitting;

  useEffect(() => {
    if (initialData) {
      form.reset(initialData);
    }
  }, [form, initialData]);

  const onSubmit = useCallback(async (values: CompanionFormSchemaValues) => {
    if (initialData) {
      const response = await companionAPI.updateCompanion(initialData.id, values);

      if (response instanceof AxiosError) {
        toast({ variant: 'destructive', description: `Something went wrong, when updating ${initialData.name} Companion` });
      } else {
        router.refresh();
        router.push('/');
        toast({ description: `Successfully edited ${initialData.name} Companion!` });
      }
    } else {
      const response = await companionAPI.createCompanion(values);

      if (response instanceof AxiosError) {
        toast({ variant: 'destructive', description: 'Something when creating new Companion' });
      } else {
        router.refresh();
        router.push('/');
        toast({ description: `Successfully created ${response.name} Companion!` });
      }
    }
  }, [initialData, router, toast]);

  return (
    <section className={cn('h-full p-4 space-y-2 max-w-3xl mx-auto', className)}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 pb-10">
          <div className="space-y-2 w-full">
            <div>
              <h3 className="text-lg font-medium">
                General Information
              </h3>
              <p className="text-sm text-muted-foreground">
                General information about your Companion
              </p>
            </div>
            <Separator className="bg-primary/10" />
          </div>
          <FormFieldWrapper form={form} name="imageUrl" classNames={{ formItem: 'flex flex-col items-center justify-center space-y-4' }}>
            {({ field }) => (
              <ImageUpload
                value={field.value}
                onChange={field.onChange}
                disabled={isLoading}
              />
            )}
          </FormFieldWrapper>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormFieldWrapper
              form={form}
              name="name"
              label="Name"
              classNames={{ formItem: 'col-span2 md:col-span-1' }}
              formFieldDescription="This is how your AI COmpanion will be named"
            >
              {({ field }) => (
                <Input
                  disabled={isLoading}
                  placeholder="Elon Mask"
                  {...field}
                />
              )}
            </FormFieldWrapper>
            <FormFieldWrapper
              form={form}
              name="description"
              classNames={{ formItem: 'col-span2 md:col-span-1' }}
              label="Description"
              formFieldDescription="Short description for your AI Companion"
            >
              {({ field }) => (
                <Input
                  disabled={isLoading}
                  placeholder="CEO & Founder of Tesla, SpaceX"
                  {...field}
                />
              )}
            </FormFieldWrapper>
            <FormFieldWrapper
              form={form}
              name="categoryId"
              classNames={{ formItem: 'col-span2 md:col-span-1' }}
              label="Category"
              formFieldDescription="Select a category for your AI"
              customControl
            >
              {({ field }) => (
                <Select disabled={isLoading} onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="bg-background">
                      <SelectValue defaultValue={field.value} placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </FormFieldWrapper>
          </div>
          <Separator className="bg-primary/10" />
          <div className="space-y-2 w-full">
            <div>
              <h3 className="text-lg font-medium">
                Configuration
              </h3>
              <p className="text-sm text-muted-foreground">
                Detailed instructions for AI Behavior
              </p>
            </div>
            <Separator className="bg-primary/10" />
          </div>
          <FormFieldWrapper
            form={form}
            name="instructions"
            classNames={{ formItem: 'col-span2 md:col-span-1' }}
            label="Instructions"
            formFieldDescription="Describe and detail your companions's backstory and relevant details"
          >
            {({ field }) => (
              <Textarea
                rows={7}
                className="resize-none"
                disabled={isLoading}
                placeholder={PREAMBLE}
                {...field}
              />
            )}
          </FormFieldWrapper>
          <FormFieldWrapper
            form={form}
            name="seed"
            classNames={{ formItem: 'col-span2 md:col-span-1' }}
            label="Example conversation"
            formFieldDescription="Describe and detail your companions's backstory and relevant details"
          >
            {({ field }) => (
              <Textarea
                rows={12}
                className="resize-none"
                disabled={isLoading}
                placeholder={SEED_CHAT}
                {...field}
              />
            )}
          </FormFieldWrapper>
          <div className="w-full flex justify-center">
            <Button size="lg" disabled={isLoading}>
              {initialData ? 'Edit your companion' : 'Create your companion'}
              <Wand2 className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </form>
      </Form>
    </section>
  );
});
