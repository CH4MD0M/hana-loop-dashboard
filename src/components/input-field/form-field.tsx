import React from 'react';

import styles from './style.module.css';

interface FormFieldProps {
  children: React.ReactNode;
  fullWidth?: boolean;
  isHorizontal?: boolean;
}

interface FormFieldTitleProps {
  title: string;
  isRequired?: boolean;
}

const FormField = ({ children, fullWidth, isHorizontal }: FormFieldProps) => {
  const fieldClasses = [
    styles.formField,
    isHorizontal ? styles.formFieldHorizontal : styles.formFieldVertical,
    fullWidth ? styles.formFieldFullWidth : '',
  ]
    .filter(Boolean)
    .join(' ');

  return <div className={fieldClasses}>{children}</div>;
};

const FieldTitle = ({ title, isRequired = true }: FormFieldTitleProps) => {
  const titleClasses = [styles.fieldTitle, isRequired ? styles.fieldTitleRequired : '']
    .filter(Boolean)
    .join(' ');

  return <span className={titleClasses}>{title}</span>;
};

FormField.Title = FieldTitle;

export default FormField;
