import { useState, useCallback } from 'react';

const useForm = (
  {
    initialValues = {},
    onSubmit,
    validator = () => {},
    validateOnChange = true,
    validateOnBlur = false
  },
  ...dependencies
) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [blurredFields, setBlurredFields] = useState({});

  const handleSubmit = useCallback(
    event => {
      event.preventDefault();
      const newErrors = validator(values) || {};
      const valid = !Object.values(newErrors)
        .filter(error => !!error)
        .flat().length;
      if (valid) {
        onSubmit(values);
      } else {
        console.log('jojojo1', newErrors);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [values, setErrors, validator, onSubmit, ...dependencies]
  );

  const runValidations = useCallback(
    (newValues, key) => {
      const validations = validator(newValues) || {};
      if (key) {
        setErrors({ ...errors, [key]: validations[key] });
      } else {
        setErrors(validator(newValues));
      }
    },
    [validator, errors, setErrors]
  );

  const handleValueChange = useCallback(
    (key, value) => {
      const newValues = {
        ...values,
        [key]: value
      };
      setValues(newValues);
      if (validateOnChange) {
        runValidations(newValues, key);
      }
    },
    [values, setValues, runValidations, validateOnChange]
  );

  const handleBlur = useCallback(
    key => {
      setBlurredFields({
        ...blurredFields,
        [key]: true
      });
      if (validateOnBlur) runValidations(values, key);
    },
    [blurredFields, setBlurredFields, runValidations, values, validateOnBlur]
  );

  return {
    values,
    setValues,
    errors,
    setErrors,
    blurredFields,
    setBlurredFields,
    handleValueChange,
    handleSubmit,
    handleBlur
  };
};

export default useForm;
