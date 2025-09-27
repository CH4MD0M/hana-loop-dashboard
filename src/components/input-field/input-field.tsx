import {
  type ControllerRenderProps,
  type ControllerFieldState,
  type FieldValues,
  type FieldPath,
  Controller,
  useFormContext,
} from 'react-hook-form';

import { AlertCircle } from 'lucide-react';

import styles from './style.module.css';

interface InputFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  name: TName;
  renderInput: (
    field: ControllerRenderProps<TFieldValues, TName>,
    fieldState: ControllerFieldState
  ) => React.ReactNode;
}

const InputField = ({ name, renderInput }: InputFieldProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <div className={styles.container}>
          {renderInput(field, fieldState)}
          {fieldState.error?.message && (
            <div className={styles.errorContainer}>
              <AlertCircle size={18} />
              <span>{fieldState.error.message}</span>
            </div>
          )}
        </div>
      )}
    />
  );
};

export default InputField;
