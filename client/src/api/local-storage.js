import { isEmpty } from 'lodash';

const keys = ['name', 'token', 'role'];

const setItem = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const getItem = key => JSON.parse(localStorage.getItem(key));

const removeItem = key => localStorage.removeItem(key);

export const setLocalStorage = data => {
  keys.forEach(item => {
    if (!isEmpty(data[item])) setItem(item, data[item]);
  });
};

export const getLocalStorage = () => {
  if (isEmpty(keys)) return null;
  return keys.reduce((object, key) => {
    // eslint-disable-next-line no-param-reassign
    if (!isEmpty(getItem(key))) object[key] = getItem(key);
    return object;
  }, {});
};

export const clearLocalStorage = () => keys.forEach(key => removeItem(key));
