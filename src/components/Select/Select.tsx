import React, { useState } from 'react';
import classnames from 'classnames';
import ClickOutside from '@components/ClickOutside';
import { capitalizeFirstLetter } from '@common/utils';
import ExpendArrow from '../Icons/ExpendArrow';
import { TFieldType } from '../Form/types';
import styles from './styles.module.scss';

interface IComponentProps {
  options: TFieldType[];
  selected: TFieldType;

  onChange: (type: TFieldType) => void;
}

type TProps = IComponentProps;

const Select = ({ options, selected, onChange }: TProps) => {
  const selectedOption = capitalizeFirstLetter(selected || 'Choose field type');
  const [isOpen, setIsOpen] = useState<boolean>(false);

  if (!options.length) {
    return <div>Ошибка</div>;
  }

  const toggleIsOpen = () => {
    setIsOpen(!isOpen);
  };

  const selectedOptionClasses = classnames(styles['selected-option'], {
    [styles['selected-option--is-open']]: isOpen,
    [styles['selected-option--selected']]: selected,
  });

  return (
    <ClickOutside onClickOutside={() => setIsOpen(false)}>
      {({ innerRef }) => (
        <div className={styles.select}>
          <div className={selectedOptionClasses} role="button" onClick={toggleIsOpen} tabIndex={-1}>
            {selectedOption}
            <div className={styles.arrow}>
              <ExpendArrow />
            </div>
          </div>
          {isOpen && (
            <div ref={innerRef} className={styles.options}>
              {options.map((item, i) => {
                const isActive = item === selected;
                const optionClassNames = classnames(styles.option, { [styles['option--active']]: isActive });
                const itemName = capitalizeFirstLetter(item);

                const onClick = (): void => {
                  if (!isActive) {
                    onChange(item);
                  }

                  setIsOpen(false);
                };

                return (
                  <div role="button" className={optionClassNames} onClick={onClick} tabIndex={i} key={item}>
                    {itemName}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </ClickOutside>
  );
};

export default Select;
