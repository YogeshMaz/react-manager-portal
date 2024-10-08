import React from 'react';
import { useLocation } from 'react-router-dom';

const FormPage = () => {
    const location = useLocation();
    const formData = location.state?.formData; // Access passed data

    const [formValues, setFormValues] = React.useState({
        field1: formData?.field1 || '', // Example field
        field2: formData?.field2 || '', // Example field
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission
        console.log('Form submitted with values:', formValues);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                name="field1"
                value={formValues.field1}
                onChange={handleChange}
                placeholder="Field 1"
            />
            <input
                name="field2"
                value={formValues.field2}
                onChange={handleChange}
                placeholder="Field 2"
            />
            {/* Add more fields as necessary */}
            <button type="submit">Submit</button>
        </form>
    );
};

export default FormPage;
