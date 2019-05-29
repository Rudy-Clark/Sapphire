export function parseError(err) {
  const res = {};
  const { data } = err;
  Object.keys(data).forEach(field => {
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < data[field].length; i++) {
      if (data[field][i].keyword === 'required') {
        res[field] = `${field} не может быть пустым`;
      } else if (data[field][i].keyword === 'minLength') {
        res[field] = `${field} не меньше 4 символов`;
      } else if (data[field][i].keyword === 'maxLength') {
        res[field] = `${field} не больше 100 символов`;
      } else if (data[field][i].keyword === 'unique') {
        res[field] = `${data[field][i].value} уже занят`;
      }
    }
  });

  return res;
}
