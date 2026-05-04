import { reactive } from 'vue';
import type { ZodType } from 'zod';

type FormErrors<T> = Partial<Record<keyof T, string>>;

export const useFormValidation = <T extends object>(schema: ZodType<T>) => {
  const fieldErrors = reactive<Record<string, string>>({});

  const clearErrors = () => {
    Object.keys(fieldErrors).forEach((key) => {
      delete fieldErrors[key];
    });
  };

  const validate = (form: T): form is T => {
    clearErrors();
    const result = schema.safeParse(form);

    if (result.success) {
      return true;
    }

    result.error.issues.forEach((issue) => {
      const field = issue.path[0]?.toString();
      if (field && !fieldErrors[field]) {
        fieldErrors[field] = issue.message;
      }
    });

    return false;
  };

  return { fieldErrors: fieldErrors as FormErrors<T>, validate, clearErrors };
};
