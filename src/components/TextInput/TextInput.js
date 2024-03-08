import React, { useState } from 'react';
import { TextField } from '@mui/material';

const TextInput = ({ label, onChange, value }) => {
    // Use useState to manage the input value
    const [inputValue, setInputValue] = useState(value || '');

    const handleChange = (event) => {
        setInputValue(event.target.value);
        if (onChange) {
            onChange(event.target.value); // Call the provided onChange handler
        }
    };

    return (
        <TextField
            InputLabelProps={{
                style: { fontSize: '16px' }, // Set font size for label only
            }}
            label={label}
            // variant="outlined"
            value={inputValue}
            onChange={handleChange}
        />
    );
};

export default TextInput;
