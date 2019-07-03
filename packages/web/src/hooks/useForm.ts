import { useState, ChangeEvent } from 'react';

function useForm<T>(
  initialState: T,
): [T, (e: ChangeEvent<HTMLInputElement>) => void] {
  const [values, setValues] = useState<T>(initialState);

  function handleChange(e: ChangeEvent<HTMLInputElement>): void {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  }

  return [values, handleChange];
}

export default useForm;
