import FormResults from '@src/components/FormResults';
import React from 'react';
import Field from '../Field';
import FormButton from '../FormButton';
import { TArraysResult, TFields, TFieldType, TFieldValue, TObjectsResult } from '../types';
import styles from './styles.module.scss';

interface IComponentProps {
  fields: TFields;
  options: TFieldType[];
  arraysResult: TArraysResult;
  objectsResult: TObjectsResult;

  handleChangeFieldType: (id: number, type: TFieldType) => void;
  handleChangeFieldValue: (id: number, value: TFieldValue) => void;
  handleAddField: () => void;
  handleRemoveField: (id: number) => void;
  convertArrayToObject: () => void;
}

type TProps = IComponentProps;

const FormTemplate = ({
  fields,
  options,
  arraysResult,
  objectsResult,
  handleChangeFieldType,
  handleChangeFieldValue,
  handleAddField,
  handleRemoveField,
  convertArrayToObject,
}: TProps) => {
  return (
    <>
      <div className={styles.form}>
        {fields.map(item => (
          <Field
            options={options}
            type={item.type}
            value={item.value}
            key={item.id}
            id={item.id}
            error={item.error}
            handleChangeFieldType={handleChangeFieldType}
            handleChangeFieldValue={handleChangeFieldValue}
            handleAddField={handleAddField}
            handleRemoveField={handleRemoveField}
          />
        ))}
        <FormButton text="Get results" onClick={convertArrayToObject} />
      </div>
      <FormResults arraysResult={arraysResult} objectsResult={objectsResult} />
    </>
  );
};

export default FormTemplate;
