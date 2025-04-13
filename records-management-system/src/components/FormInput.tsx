import React from 'react';

interface FormInputProps {
    type: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormInput: React.FC<FormInputProps> = ({ type, placeholder, value, onChange }) => {
    return <input type={type} placeholder={placeholder} value={value} onChange={onChange} />;
};

export default FormInput;

// tsconfig.json
{
  "compilerOptions": {
    "jsx": "react",
    "types": ["react", "react-dom"]
  }
}

// styles.css
.container {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: #f9f9f9;
}