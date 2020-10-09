import React, { useCallback } from 'react';
import Select from '@components/Select';
import Input from '@components/Input';

import { capitalizeFirstLetter } from '@src/common/utils';
import { TFieldType, TFieldValue, TError } from '../types';
import styles from './styles.module.scss';
import FieldButton from '../FieldButton';

interface IComponentProps {
  type: TFieldType;
  value: TFieldValue;

  options: TFieldType[];
  id: number;
  error: TError;

  handleChangeFieldType: (id: number, type: TFieldType) => void;
  handleChangeFieldValue: (id: number, value: TFieldValue) => void;
  handleAddField: () => void;
  handleRemoveField: (id: number) => void;
}

type TProps = IComponentProps;

const Field = ({
  options,
  type,
  value,
  id,
  error,
  handleChangeFieldType,
  handleChangeFieldValue,
  handleAddField,
  handleRemoveField,
}: TProps) => {
  const getInputType = useCallback(() => {
    switch (type) {
      case 'email':
      case 'phone':
        return type;
      default:
        return 'text';
    }
  }, [type]);

  const inputPlaceholder = type ? `Enter ${capitalizeFirstLetter(type)}` : '';

  return (
    <div className={styles.field}>
      <div className={styles.content}>
        <div className={styles['content-item']}>
          <Select
            options={options}
            selected={type}
            onChange={(fieldType: TFieldType) => handleChangeFieldType(id, fieldType)}
          />
        </div>
        <div className={styles['content-item']}>
          <Input
            value={value}
            inputType={getInputType()}
            onChange={e => handleChangeFieldValue(id, e.target.value)}
            onBlur={e => handleChangeFieldValue(id, e.target.value.trim())}
            placeholder={inputPlaceholder}
            disabled={!type}
          />
        </div>
      </div>
      <div className={styles.buttons}>
        {type && value.trim() && (
          <div className={styles.button}>
            <FieldButton content="+" handleClick={handleAddField} />
          </div>
        )}
        <div className={styles.button}>
          <FieldButton content="-" handleClick={() => handleRemoveField(id)} />
        </div>
      </div>
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
};

export default Field;
