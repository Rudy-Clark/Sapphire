export function parseError(err) {
  const res = {};
  console.log(err);
  const { data } = err;
  Object.keys(data).forEach(field => {
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < data[field].length; i++) {
      switch (data[field][i].keyword) {
        case 'required':
          res[field] = `${field} не может быть пустым`;
          break;
        case 'minLength':
          res[field] = `${field} не меньше 4 символов`;
          break;
        case 'maxLength':
          res[field] = `${field} не больше 100 символов`;
          break;
        case 'unique':
          res[field] = `${data[field][i].value} уже занят`;
          break;
        case 'format':
          res[field] = `неверный формат E-mail`;
          break;
        default:
          break;
      }
    }
  });
  /**
   * FORMAT
   * res = { field: [{ keyword: @String, value: @String }] }
   */
  return res;
}
