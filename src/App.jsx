import React, { useState } from 'react';
import { Button, Tabs } from 'antd';
import SchemaField from './components/SchemaField';

const App = () => {
  const [fields, setFields] = useState([]);

  const handleAddField = () => {
    const newField = {
      id: Date.now(),
      key: '',
      type: 'String',
      children: [],
    };
    setFields([...fields, newField]);
  };

  const updateField = (index, updatedField) => {
    const newFields = [...fields];
    newFields[index] = updatedField;
    setFields(newFields);
  };

  const deleteField = (index) => {
    const newFields = fields.filter((_, i) => i !== index);
    setFields(newFields);
  };

  const buildJson = (fieldsArray) => {
    const result = {};
    fieldsArray.forEach(field => {
      if (field.type === 'Nested') {
        result[field.key] = buildJson(field.children || []);
      } else {
        result[field.key] = field.type;
      }
    });
    return result;
  };

  const items = [
    {
      key: '1',
      label: 'Schema Builder',
      children: (
        <>
          <Button type="primary" onClick={handleAddField} style={{ marginBottom: '1rem' }}>
            Add Field
          </Button>
          {fields.map((field, index) => (
            <SchemaField
              key={field.id}
              field={field}
              onUpdate={(updated) => updateField(index, updated)}
              onDelete={() => deleteField(index)}
            />
          ))}
        </>
      ),
    },
    {
      key: '2',
      label: 'JSON Preview',
      children: (
        <pre style={{ background: '#f6f6f6', padding: '1rem', borderRadius: '5px' }}>
          {JSON.stringify(buildJson(fields), null, 2)}
        </pre>
      ),
    },
  ];

  return (
    <div style={{ padding: '2rem' }}>
      <h1>JSON Schema Builder</h1>
      <Tabs defaultActiveKey="1" items={items} />
    </div>
  );
};

export default App;
