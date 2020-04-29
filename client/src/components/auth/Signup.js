import React from 'react';
import { Form, Field } from 'react-final-form';

 const Signup = props => {
  return (
    <Form
      initialValues={{
        email: '',
        password: ''
      }}
      onSubmit={values => {
        // send values to the cloud
        console.log("Form submitted these values", values);
      }}
      // validate={values => {
      //   // do validation here, and return errors object
      // }}
      render={({ handleSubmit, submitting }) => (
      <form onSubmit={handleSubmit}>
        <fieldset>
          <label>Email</label>
          <Field
            name="email"
            component="input"
            type="text"
            placeholder="Email"
          />
        </fieldset>
        <fieldset>
          <label>Password</label>
          <Field
            name="password"
            component="input"
            type="password"
            placeholder=""
            autoComplete="none"
           />
        </fieldset>
        <fieldset>
          <button type="submit" disabled={submitting}>
            Submit
          </button>
        </fieldset>
      </form>
    )}
    />
  );
}

export default Signup;
