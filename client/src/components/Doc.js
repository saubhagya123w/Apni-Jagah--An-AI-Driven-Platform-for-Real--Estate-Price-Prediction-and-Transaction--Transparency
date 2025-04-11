import React, { useState } from 'react';

const PropertyForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    document: null
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    if (e.target.name === 'document') {
      setFormData({ ...formData, document: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('name', formData.name);
    data.append('email', formData.email);
    data.append('document', formData.document);

    try {
      const res = await fetch('http://localhost:5008/submit-property', {
        method: 'POST',
        body: data
      });

      const result = await res.json();
      setMessage(result.message);
    } catch (error) {
      console.error('Error submitting form:', error);
      setMessage('Something went wrong. Please try again.');
    }
  };

  return (
    <div>
      <h2>Submit Your Property</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label><br />
          <input type="text" name="name" onChange={handleChange} required />
        </div>
        <div>
          <label>Email:</label><br />
          <input type="email" name="email" onChange={handleChange} required />
        </div>
        <div>
          <label>Property Document (PDF/Images):</label><br />
          <input type="file" name="document" accept=".pdf,.jpg,.jpeg,.png" onChange={handleChange} required />
        </div>
        <button type="submit">Submit Property</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default PropertyForm;
