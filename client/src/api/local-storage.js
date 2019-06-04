/* eslint-disable no-param-reassign */
import { isEmpty } from 'lodash';

const keys = ['name', 'token', 'role'];

const setItem = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const removeItem = key => localStorage.removeItem(key);

export const getItem = key => JSON.parse(localStorage.getItem(key));

export const setLocalStorage = data =>
  keys.reduce((object, item) => {
    if (!isEmpty(data[item])) {
      setItem(item, data[item]);
      object[item] = data[item];
    }
    return object;
  }, {});

export const getLocalStorage = () => {
  if (isEmpty(keys)) return null;
  return keys.reduce((object, key) => {
    if (!isEmpty(getItem(key))) object[key] = getItem(key);
    return object;
  }, {});
};

export const clearLocalStorage = () => keys.forEach(key => removeItem(key));
