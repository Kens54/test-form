import React from 'react';
import { TArraysResult, TObjectsResult } from '../Form/types';
import styles from './styles.module.scss';

interface IComponentProps {
  arraysResult: TArraysResult;
  objectsResult: TObjectsResult;
}

type TProps = IComponentProps;

const FormResults = ({ arraysResult, objectsResult }: TProps) => {
  if (!arraysResult || !objectsResult) {
    return null;
  }

  return (
    <div className={styles.results}>
      <div className={styles['results-item']}>{JSON.stringify(arraysResult)}</div>
      <div className={styles['results-item']}>{JSON.stringify(objectsResult)}</div>
    </div>
  );
};

export default FormResults;
