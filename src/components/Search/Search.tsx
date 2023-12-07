import { useState, useRef, useCallback, ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';
import debounce from 'lodash.debounce';

import { setSearchRequest } from '../../redux/slices/filterSlice';

import styles from './Search.module.scss';

export const Search = () => {
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();

  const sendRequestToServer = useCallback(
    debounce((value) => {
      dispatch(setSearchRequest(value));
    }, 500),
    []
  );

  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;

    setInputValue(newValue);
    sendRequestToServer(newValue);
  };

  const onClickClear = () => {
    setInputValue('');
    dispatch(setSearchRequest(''));
    inputRef.current?.focus();
  };

  return (
    <div className={styles.root}>
      <svg
        className={styles.icon}
        xmlns="http://www.w3.org/2000/svg"
        id="Outline"
        viewBox="0 0 24 24"
        width="18"
        height="18"
      >
        <path d="M23.707,22.293l-5.969-5.969a10.016,10.016,0,1,0-1.414,1.414l5.969,5.969a1,1,0,0,0,1.414-1.414ZM10,18a8,8,0,1,1,8-8A8.009,8.009,0,0,1,10,18Z" />
      </svg>
      <input
        ref={inputRef}
        value={inputValue}
        onChange={inputChangeHandler}
        className={styles.input}
        type="text"
        name="input-search"
        placeholder="Поиск пиццы..."
      />
      {inputValue && (
        <svg
          onClick={onClickClear}
          className={styles.clear}
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8 8L16 16"
            stroke="#000000"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M16 8L8 16"
            stroke="#000000"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </div>
  );
};
