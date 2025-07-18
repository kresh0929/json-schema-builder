const generateSchema = (fields) => {
  const schema = {};
  fields.forEach(({ key, type, children }) => {
    if (!key) return;
    if (type === 'Nested') {
      schema[key] = generateSchema(children || []);
    } else {
      schema[key] = type === 'String' ? '' : 0;
    }
  });
  return schema;
};

export default generateSchema;
