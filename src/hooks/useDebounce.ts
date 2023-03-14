import { useRef } from 'react';
const useDebounce = () => {
  let timer = useRef<null | ReturnType<typeof setTimeout>>(null);

  const debounce = (callback: () => void, delay: number) => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      callback();
    }, delay);
  };

  return { debounce };
};
export default useDebounce;
