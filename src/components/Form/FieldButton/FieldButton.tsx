import React from 'react';
import styles from './styles.module.scss';

interface IComponentProps {
  content: '+' | '-';
  handleClick: () => void;
}

type TProps = IComponentProps;

const FieldButton = ({ content, handleClick }: TProps) => (
  <button className={styles.button} onClick={handleClick} type="button">
    {content}
  </button>
);

export default FieldButton;
