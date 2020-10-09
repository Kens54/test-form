import React from 'react';
import styles from './styles.module.scss';

interface IComponentProps {
  text: string;
  onClick: () => void;
}

type TProps = IComponentProps;

const FormButton = ({ text, onClick }: TProps) => {
  return (
    <button className={styles.button} onClick={onClick} type="button">
      {text}
    </button>
  );
};

export default FormButton;
