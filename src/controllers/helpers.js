export function parseError(err) {
  const res = {};
  const { data } = err;
  const errorFields = Object.keys(data);
  errorFields.map(field => {
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < data[field].length; i++) {
      console.log(data[field][i].keyword);
      if (data[field][i].keyword === 'required') {
        res[errorFields[i]] = `${errorFields[i]} не может быть пустым`;
      }
    }
  });

  return res;
}
