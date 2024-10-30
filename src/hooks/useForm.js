import { useState } from 'react';

export const useForm = (initialForm = {}, extraFields = {}) => {
  
    const [formState, setFormState] = useState(initialForm);
    const [extraState, setExtraState] = useState(extraFields); 
    const [errors, setErrors] = useState({});

    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setFormState({
            ...formState,
            [name]: value
        });
        // Clear error when user type in the input
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: ''
            });
        }
    };

    const onResetForm = () => {
        setFormState(initialForm);
        setExtraState(extraFields); 
        setErrors({});
    };

    const validateFields = () => {
        const newErrors = {};
        
        // Validar campos principales
        for (const key in formState) {
            if (!formState[key]) {
                newErrors[key] = `${key} cannot be empty`;
            }
        }

        // Validate extra fields
        for (const key in extraState) {
            if (!extraState[key]) {
                newErrors[key] = `${key} cannot be empty`;
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; 
    };

    const updateExtraField = (field, value) => {
        setExtraState({
            ...extraState,
            [field]: value,
        });
        // Clear error when user select an avatar
        if (errors[field]) {
            setErrors({
                ...errors,
                [field]: ''
            });
        }
    };

    return {
        ...formState,
        ...extraState,
        formState,
        extraState,
        errors,
        onInputChange,
        onResetForm,
        validateFields,
        updateExtraField, 
    };
};