import React from 'react';
import { TFieldValue } from '../Form/types';
import styles from './styles.module.scss';

interface IComponentProps {
  inputType?: string;
  value: TFieldValue;
  placeholder?: string;
  disabled?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

type TProps = IComponentProps;

const Input = ({ value, onChange, onBlur, inputType = 'text', placeholder, disabled }: TProps) => {
  return (
    <input
      className={styles.input}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      type={inputType}
      placeholder={placeholder}
      disabled={disabled}
    />
  );
};

export default Input;
