import { useCallback } from "react";
import {
  FieldErrors,
  FieldValues,
  Resolver,
  ResolverResult,
} from "react-hook-form";
import * as yup from "yup";

const useYupValidationResolver = <T extends FieldValues>(
  validationSchema: yup.AnyObjectSchema
): Resolver<T> =>
  useCallback(
    async (data: T): Promise<ResolverResult<T>> => {
      try {
        const values = await validationSchema.validate(data, {
          abortEarly: false,
        });
        return {
          values,
          errors: {},
        };
      } catch (error) {
        return {
          values: {},
          errors: (error as yup.ValidationError).inner.reduce<FieldErrors<T>>(
            (allErrors, currentError) => ({
              ...allErrors,
              [currentError.path!]: {
                type: currentError.type ?? "validation",
                message: currentError.message,
              },
            }),
            {}
          ),
        };
      }
    },
    [validationSchema]
  );

export default useYupValidationResolver;
