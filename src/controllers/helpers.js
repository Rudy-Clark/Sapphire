export function parseError(err) {
  const res = {};
  const { data } = err;
  const errorFields = Object.keys(data);
  errorFields.map(field => {
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < data[field].length; i++) {
      if (data[field][i].keyword === 'required') {
        res[field] = `${field} не может быть пустым`;
      }
    }
  });

  return res;
}
