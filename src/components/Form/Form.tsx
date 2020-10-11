import React, { useState } from 'react';
import { getRandomNumber, cloneArray } from '@common/utils';
import FormTemplate from './FormTemplate';
import { TFields, TFieldType, TFieldValue, IField, TArraysResult, TObjectsResult } from './types';

const Form = () => {
  const selectOptions: TFieldType[] = ['email', 'phone', 'link'];

  const getFieldId = (fieldsArray: TFields): number => {
    const newId = getRandomNumber();

    const isNotUniqueId = fieldsArray.some(item => item.id === newId);

    return isNotUniqueId ? getFieldId(fieldsArray) : newId;
  };

  const createNewField = (fieldsArray: TFields): IField => ({
    type: '',
    value: '',
    error: null,
    id: getFieldId(fieldsArray),
  });

  const [fields, setFields] = useState<TFields>([createNewField([])]);
  const [arraysResult, setArraysResult] = useState<TArraysResult>(null);
  const [objectsResult, setObjectsResult] = useState<TObjectsResult>(null);

  const checkToEmptyFields = (): boolean => {
    const isUnfilledFields = fields.some(item => !item.type || !item.value);

    if (isUnfilledFields) {
      const newFields = fields.map(item => {
        if (!item.type || !item.value) {
          return { ...item, error: 'Fill in the field' };
        }

        return item;
      });

      setFields(newFields);

      return true;
    }

    return false;
  };

  const handleChangeFieldType = (fieldId: number, type: TFieldType): void => {
    const newFields = cloneArray(fields);

    const currentField = newFields.find(item => item.id === fieldId);
    if (currentField) {
      currentField.type = type;
      currentField.error = null;
    }

    setFields(newFields);
  };

  const handleChangeFieldValue = (fieldId: number, value: TFieldValue): void => {
    const newFields = cloneArray(fields);

    const currentField = newFields.find(item => item.id === fieldId);
    if (currentField) {
      currentField.value = value;
      currentField.error = null;
    }

    setFields(newFields);
  };

  const handleAddField = (): void => {
    if (!checkToEmptyFields()) {
      const newFields = [...cloneArray(fields), createNewField(fields)];
      setFields(newFields);
    }
  };

  const handleRemoveField = (fieldId: number): void => {
    const newFields = cloneArray(fields);
    if (fields.length > 1) {
      const fieldIndex = newFields.findIndex(item => item.id === fieldId);
      newFields.splice(fieldIndex, 1);
    } else if (fields.length === 1) {
      const lastField = newFields[0];

      lastField.type = '';
      lastField.value = '';
      lastField.error = null;
    }

    setFields(newFields);
  };

  const getFormValues = () => {
    const fieldsArray: TArraysResult = [];
    fieldsArray[0] = [];
    fieldsArray[1] = [];

    fields.forEach(item => {
      fieldsArray[0].push(item.type);
      fieldsArray[1].push(item.value);
    });

    return fieldsArray;
  };

  const convertArrayToObject = () => {
    if (checkToEmptyFields()) {
      setArraysResult(null);
      setObjectsResult(null);
    } else {
      const fieldsArray: TObjectsResult = [];
      const formValues = getFormValues();

      formValues[0].forEach((item, key) => {
        const fieldObject = { type: item, value: formValues[1][key] };
        fieldsArray[key] = fieldObject;
      });

      setArraysResult(formValues);
      setObjectsResult(fieldsArray);
    }
  };

  return (
    <FormTemplate
      fields={fields}
      options={selectOptions}
      handleChangeFieldType={handleChangeFieldType}
      handleChangeFieldValue={handleChangeFieldValue}
      handleAddField={handleAddField}
      handleRemoveField={handleRemoveField}
      convertArrayToObject={convertArrayToObject}
      arraysResult={arraysResult}
      objectsResult={objectsResult}
    />
  );
};

export default Form;
