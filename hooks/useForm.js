import { useEffect, useState } from 'react';

/**
 *  Custom hook to process all kind of forms as a controlled component
 * * takes initial values and populates them
 * * if the initial values are changing, updates through useEffect
 * * provides handleChange method, which supports number, string and file input field types
 * * provides resetForm and clearForm methods
 * */
const useForm = (initial = {}) => {
    // create an own state object for our inputs
    const [inputs, setInputs] = useState(initial);

    // the initial state is checked by concatenating all values
    const initialValues = Object.values(initial).join('');

    // monitor if any variables are now defined and update the input fields
    useEffect(() => {
        // runs when the things we are watching change
        setInputs(initial);
    }, [initialValues]);

    const handleChange = (e) => {
        // get the input value, name and type fropm the target HTML element
        let { value, name, type } = e.target;

        // handle specific types individually
        if (type === 'number') {
            // directly parse integers
            value = parseInt(value, 10);
        }
        if (type === 'file') {
            // if it is a file, destructure the first file from target array
            [value] = e.target.files;
        }
        // otherwise, directly handle as string

        // update all input fields
        setInputs({
            ...inputs,
            [name]: value,
        });
    };

    /**
     * just reset to the initial values
     */
    const resetForm = () => {
        setInputs(initial);
    };

    /**
     * clear the form by providing empty strings to all fields
     */
    const clearForm = () => {
        const blankState = Object.fromEntries(
            Object.entries(inputs).map(([key, value]) => [key, ''])
        );
        setInputs(blankState);
    };

    return {
        inputs,
        handleChange,
        resetForm,
        clearForm,
    };
};

export default useForm;
