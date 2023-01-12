

import React, { useState } from "react";
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { login } from "../services/auth-service";

const Login: React.FC = () => {
    let navigate: NavigateFunction = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");

    const initialValues: {
        username: string;
        password: string;
    } = {
        username: "",
        password: "",
    };

    const validationSchema = Yup.object().shape({
        username: Yup.string().required("Username field is required!"),
        password: Yup.string().required("Password field is required!"),
    });

    const handleLogin = (formValue: { username: string; password: string }) => {
        const { username, password } = formValue;

        setMessage("");
        setLoading(true);

        login(username, password)
        .then(() => {
            navigate("/home");
            window.location.reload();
        }, (error) => {
                setLoading(false);
                setMessage(error.message);
            }
        );
    };
    return (
        <div className="text-center w-100">
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleLogin}>
                <Form className="form-signin m-auto">
                    <img className="mb-4" src="https://holion.dk/img/logo.png" alt="" width="290" height="72"/>
                    <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
                    <div className="form-floating">
                        <Field name="username" id="floatingInput" type="text" className="form-control" placeholder="Username"/>
                        <label htmlFor="floatingInput" className="sr-only">Username</label>
                    </div>
                    <div className="form-floating">
                        <Field name="password" id="floatingPassword" type="password" className="form-control mb-3" placeholder="Password"/>
                        <label htmlFor="floatingPassword" className="sr-only">Password</label>
                    </div>
                    <button className="btn btn-lg btn-primary btn-block w-100 mb-3" type="submit">
                        {loading && (
                            <span className="spinner-border spinner-border-sm"></span>
                        )}
                        <span>Sign in</span>
                    </button>
                    <ErrorMessage
                            name="password"
                            component="div"
                            className="alert alert-danger"
                        />
                    <ErrorMessage
                        name="username"
                        component="div"
                        className="alert alert-danger"
                    />
                    {message && (
                        <div className="alert alert-danger" role="alert">
                            {message}
                        </div>
                    )}
                </Form>
            </Formik>
        </div>
    )
}

export default Login;