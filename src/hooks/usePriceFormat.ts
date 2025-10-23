import { useState, useCallback } from 'react';

export const usePriceFormat = (initialValue: string = '') => {
  const [value, setValue] = useState(initialValue);

  const formatPrice = useCallback((input: string) => {
    const numbers = input.replace(/[^0-9]/g, '');
    
    if (numbers === '') return '';
    
    return parseInt(numbers).toLocaleString('ko-KR');
  }, []);

  const handleChange = useCallback((input: string) => {
    const formatted = formatPrice(input);
    setValue(formatted);
  }, [formatPrice]);

  const reset = useCallback(() => {
    setValue('');
  }, []);

  return {
    value,
    handleChange,
    reset,
    formatPrice
  };
};




