import React from 'react';
import { Input, Select, Button, Space, Card } from 'antd';

const { Option } = Select;

const SchemaField = ({ field, onUpdate, onDelete }) => {
  const handleChange = (key, value) => {
    onUpdate({ ...field, [key]: value });
  };

  const handleAddNested = () => {
    const updated = {
      ...field,
      children: [...(field.children || []), { id: Date.now(), key: '', type: 'String', children: [] }],
    };
    onUpdate(updated);
  };

  const updateNestedField = (index, updatedChild) => {
    const newChildren = [...(field.children || [])];
    newChildren[index] = updatedChild;
    onUpdate({ ...field, children: newChildren });
  };

  const deleteNestedField = (index) => {
    const newChildren = field.children.filter((_, i) => i !== index);
    onUpdate({ ...field, children: newChildren });
  };

  return (
    <Card size="small" style={{ marginBottom: '1rem' }}>
      <Space wrap>
        <Input
          placeholder="Field Name"
          value={field.key}
          onChange={(e) => handleChange('key', e.target.value)}
        />
        <Select
          value={field.type}
          style={{ width: 120 }}
          onChange={(value) => handleChange('type', value)}
        >
          <Option value="String">String</Option>
          <Option value="Number">Number</Option>
          <Option value="Nested">Nested</Option>
        </Select>
        <Button danger onClick={onDelete}>Delete</Button>
        {field.type === 'Nested' && (
          <Button onClick={handleAddNested}>Add Nested Field</Button>
        )}
      </Space>
      {field.type === 'Nested' && field.children.length > 0 && (
        <div style={{ paddingLeft: '2rem', marginTop: '1rem' }}>
          {field.children.map((child, index) => (
            <SchemaField
              key={child.id}
              field={child}
              onUpdate={(updated) => updateNestedField(index, updated)}
              onDelete={() => deleteNestedField(index)}
            />
          ))}
        </div>
      )}
    </Card>
  );
};

export default SchemaField;
