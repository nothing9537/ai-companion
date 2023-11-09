'use client';

import React, { ReactElement, createContext, useCallback } from 'react';
import { ControllerFieldState, ControllerRenderProps, FieldValues, Path, UseFormReturn, UseFormStateReturn } from 'react-hook-form';

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../shadcn-ui/ui/form';
import { cn } from '../utils';

interface FormFieldWrapperProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: Path<T>;
  children: (props: FormFieldContextProps<T>) => ReactElement;
  label?: {
    className?: string;
    value: string;
  };
  withError?: boolean;
  customControl?: boolean;
  formItemClassName?: string;
}

export interface FormFieldContextProps<T extends FieldValues> {
  field: ControllerRenderProps<T, Path<T>>;
  fieldState: ControllerFieldState;
  formState: UseFormStateReturn<T>;
}

const FormFieldContext = createContext({});

export const FormFieldWrapper = <T extends FieldValues>(props: FormFieldWrapperProps<T>): JSX.Element => {
  const { form, name, children, label, withError = true, customControl = false, formItemClassName } = props;

  if (label) {
    label.className = 'uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70';
  }

  const renderFormField = useCallback(() => (
    <FormField
      control={form.control}
      name={name}
      render={(renderProps: FormFieldContextProps<T>) => (
        <FormItem className={cn('w-full', formItemClassName)}>
          <FormLabel className={label?.className}>
            {label?.value}
          </FormLabel>
          {customControl ? (
            children?.(renderProps)
          ) : (
            <FormControl>
              {children?.(renderProps)}
            </FormControl>
          )}
          {withError && <FormMessage />}
        </FormItem>
      )}
    />
  ), [children, customControl, form.control, formItemClassName, label?.className, label?.value, name, withError]);

  return (
    <FormFieldContext.Consumer>
      {renderFormField}
    </FormFieldContext.Consumer>
  );
};
