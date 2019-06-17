import React, { useState, FormEvent } from 'react';

function useFormValidation(initialState = {}) {
  const [values, setValues] = useState(initialState);

  function handleChange(e: FormEvent<HTMLInputElement>): void {
    const input = e.target as HTMLInputElement;
    setValues({
      ...values,
      [input.name]: input.value,
    });
  }

  return [values, handleChange];
}

export default useFormValidation;
