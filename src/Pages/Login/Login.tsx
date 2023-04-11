import React, { useContext, useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './Login.css';
import AuthContext from '../../Context/AuthContext';
import Modals from '../../Reusable/Modals';
import { Navigate, useNavigate } from 'react-router-dom';

const Login = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  const initialValues = {
    username: '',
    password: '',
  };

  useEffect(() => {
    const isLoggedInValue = localStorage.getItem('isLoggedIn');
    if (isLoggedInValue === 'true') {
      setIsLoggedIn(true);
    }
  }, [setIsLoggedIn]);

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .required('Username is required')
      .min(5, 'Username must be at least 5 characters')
      .max(15, 'Username must be less than 15 characters')
      .matches(/^[a-zA-Z0-9_]*$/, 'Username can only contain letters, numbers, and underscores'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters'),
  });

  const handleSubmit = (values: { username: string; password: string }) => {
    console.log(values);
    localStorage.setItem('username', values.username);
    localStorage.setItem('isLoggedIn', 'true');
    setIsLoggedIn(true);
    setShowSuccess(true);
    setTimeout(() => {
      navigate('/Admin/Home');
    }, 2000);
  };
  console.log(isLoggedIn);

  if (isLoggedIn) {
    return <Navigate to="/Admin/Home" replace />;
  }

  return (
    <div className="container">
      <div className="position">
        <div className="col-lg-6">
          <div className=" card LoginCard" style={{ width: '600px', height: '350px' }}>
            <div className="card-body">
              <h1 className="title card-title mb-4">Login</h1>
              <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                {({ errors, touched }) => (
                  <Form>
                    <div className="form-group mb-3">
                      <label htmlFor="username">Username</label>
                      <Field
                        type="text"
                        name="username"
                        id="username"
                        className={`form-control ${errors.username && touched.username ? 'is-invalid' : ''}`}
                      />
                      <ErrorMessage name="username" component="div" className="invalid-feedback" />
                    </div>
                    <div className="form-group mb-3">
                      <label htmlFor="password">Password</label>
                      <Field
                        type="password"
                        name="password"
                        id="password"
                        className={`form-control ${errors.password && touched.password ? 'is-invalid' : ''}`}
                      />
                      <ErrorMessage name="password" component="div" className="invalid-feedback" />
                    </div>
                    <div className="form-group button mb-3">
                      <button type="submit" className="btn btn-success btn-block" style={{ width: '100%' }}>
                        Login
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
              <Modals
                show={showSuccess}
                onCloseButtonClick={() => setShowSuccess(false)}
                title="Success!"
                message={`Hello ${localStorage.getItem('username')}!`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
