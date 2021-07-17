import React from 'react';

// Components
import InputOption from './InputOption';
import RadioGroupOption from './RadioGroupOption';
import CheckboxOption from './CheckboxOption';
import SelectBoxOption from './SelectBoxOption';
import ImageOption from './ImageOption';

export const ProductDetailOptions = ({
  options,
  selectedOptions,
  changeOptionHandler,
}) => {
  /**
   * Renders different options.
   * "Memory capacity" for example.
   *
   * @param {object} item - Option information.
   *
   * @return {JSX.Element}
   */
  const renderOptionItem = (item) => {
    const option = { ...item };
    const defaultValue = selectedOptions[item.selectDefaultId];

    switch (item.option_type) {
      case 'I':
        return (
          <ImageOption
            option={option}
            value={defaultValue}
            key={item.selectDefaultId}
            onChange={(val) => changeOptionHandler(option.selectDefaultId, val)}
          />
        );

      case 'T':
        return (
          <InputOption
            option={option}
            value={defaultValue}
            key={item.selectDefaultId}
            onChange={(val) => changeOptionHandler(option.selectDefaultId, val)}
          />
        );

      case 'S':
        return (
          <SelectBoxOption
            option={option}
            value={defaultValue}
            key={item.selectDefaultId}
            onChange={(val) => changeOptionHandler(option.selectDefaultId, val)}
          />
        );

      case 'R':
        return (
          <RadioGroupOption
            option={option}
            value={defaultValue}
            key={item.selectDefaultId}
            onChange={(val) => changeOptionHandler(option.selectDefaultId, val)}
          />
        );

      case 'C':
        return (
          <CheckboxOption
            option={option}
            value={defaultValue}
            key={item.selectDefaultId}
            onChange={(val) => changeOptionHandler(option.selectDefaultId, val)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      {options.map((option) => {
        return renderOptionItem(option);
      })}
    </>
  );
};
