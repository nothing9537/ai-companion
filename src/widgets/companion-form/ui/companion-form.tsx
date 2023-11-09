'use client';

import { FC, memo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Category, Companion } from '@prisma/client';
import * as z from 'zod';

import { cn } from '@/shared/lib/utils';
import { Form } from '@/shared/shadcn-ui/ui/form';
import { Separator } from '@/shared/shadcn-ui/ui/separator';
import { FormFieldWrapper } from '@/shared/lib/components/form-field-wrapper';
import { Input } from '@/shared/shadcn-ui/ui/input';
import { ImageUpload } from '@/features/image-upload';

interface CompanionFormProps {
  initialData: Companion | null;
  categories: Category[];
  className?: string;
}

const formSchema = z.object({
  name: z.string().min(1, {
    message: 'Name is required',
  }),
  description: z.string().min(1, {
    message: 'Description is required',
  }),
  instructions: z.string().min(200, {
    message: 'Instructions require at least 200 characters',
  }),
  seed: z.string().min(200, {
    message: 'Seed require at least 200 characters',
  }),
  imageUrl: z.string().min(1, {
    message: 'Image is required',
  }),
  categoryId: z.string().min(1, {
    message: 'Category is required',
  }),
});

type FormSchema = z.infer<typeof formSchema>;

export const CompanionForm: FC<CompanionFormProps> = memo(({ categories, initialData, className }) => {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
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

  const onSubmit = async (values: FormSchema) => {
    console.log(values);
  };

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
          <FormFieldWrapper form={form} name="name" formItemClassName="flex flex-col items-center justify-center space-y-4">
            {({ field }) => (
              <ImageUpload
                value={field.value}
                onChange={field.onChange}
                disabled={isLoading}
              />
            )}
          </FormFieldWrapper>
        </form>
      </Form>
    </section>
  );
});
