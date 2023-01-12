import React, { useState } from "react";
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import IUser from "../models/loginModel";
import { register } from "../services/auth-service";

const Register: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");
    
    let navigate: NavigateFunction = useNavigate();

    const initialValues = {
      username: "",
      email: "",
      password: "",
    };
  
    const validationSchema = Yup.object().shape({
      username: Yup.string()
        .test(
          "len",
          "The username must be between 3 and 20 characters.",
          (val: any) =>
            val &&
            val.toString().length >= 3 &&
            val.toString().length <= 20
        )
        .required("This field is required!"),
      email: Yup.string()
        .email("This is not a valid email.")
        .required("This field is required!"),
      password: Yup.string()
        .test(
          "len",
          "The password must be between 6 and 40 characters.",
          (val: any) =>
            val &&
            val.toString().length >= 6 &&
            val.toString().length <= 40
        )
        .required("This field is required!"),
    });
  
    const handleRegister = (formValue: { username: string, email: string, password: string }) => {
        const { username, email, password } = formValue;
        setLoading(true);
        register(username, email, password)
        .then((response) => {
            setLoading(false)
            navigate("/login");
        }, (error) => {
            setMessage(error.message);
            setLoading(false)
        });
    };
  
    return (
        <div className="text-center w-100">
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleRegister}>
                <Form className="form-signin m-auto">
                    <img className="mb-4" src="https://holion.dk/img/logo.png" alt="" width="290" height="72"/>
                    <h1 className="h3 mb-3 font-weight-normal">Please register</h1>
                    <label htmlFor="username" className="sr-only">Email address</label>
                    <Field name="username" type="text" className="form-control" placeholder="Username"/>
                    <ErrorMessage
                        name="username"
                        component="div"
                        className="alert alert-danger"
                    />
                    <label htmlFor="email" className="sr-only">Email address</label>
                    <Field name="email" type="text" className="form-control" placeholder="Email"/>
                    <ErrorMessage
                        name="email"
                        component="div"
                        className="alert alert-danger"
                    />
                    <label htmlFor="password" className="sr-only">Password</label>
                    <Field name="password" type="password" className="form-control mb-3" placeholder="Password"/>
                    <ErrorMessage
                        name="password"
                        component="div"
                        className="alert alert-danger"
                    />
                    <button className="btn btn-lg btn-primary btn-block w-100" type="submit">
                        {loading && (
                            <span className="spinner-border spinner-border-sm"></span>
                        )}
                        <span>Sign up</span>
                    </button>
                    {message && (
                        <div className="alert alert-danger" role="alert">
                            {message}
                        </div>
                    )}
                </Form>
            </Formik>
        </div>
    );
  };
  
export default Register;