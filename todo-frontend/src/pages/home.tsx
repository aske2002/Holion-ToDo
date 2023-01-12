import React, { useState, useEffect } from "react";
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import loginModel from "../models/loginModel";
import * as AuthService from "../services/auth-service";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as ToDoService from "../services/todo-service"
import * as Yup from "yup";
import toDoModel from "../models/toDoModel";

const Home: React.FC = () => {
  const [toDoList, setToDoList] = useState<toDoModel[]>([]);
  const [message, setMessage] = useState<string>();

  useEffect(() => {
    getToDos()
  }, []);

  if (!AuthService.getCurrentUser()) {
    return <Navigate to="/login" replace/>
  }

  const initialValues: {
    addtodo: string;
  } = {
      addtodo: "",
  };

  const getToDos = () => {
    ToDoService.getToDos()
    .then((response) => {
      setToDoList(response.data)
    }, (error) => {
      setMessage(error.message)
    })
  }

  const addToDo = (formValue: { addtodo: string;}) => {
    const { addtodo } = formValue;

    setMessage("");

    ToDoService.addToDo(addtodo)
    .then(() => {
      getToDos()
    })
    .catch((error) => {
            setMessage(error.message);
        }
    );
  }

  const validationSchema = Yup.object().shape({
    addtodo: Yup.string().required("Todo name is required!"),
  });
  return (
    <div className="container">
        <h3>Goodmorning</h3>
        <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={addToDo}>
          <Form className="input-group mb-3">
            <Field name="addtodo" type="text" className="form-control" placeholder="Write something you need to remember!"/>
            <button className="btn btn-primary btn-large" type="submit" id="button-addon1">Add</button>
          </Form>
        </Formik>
        <ul className="list-group">
          {toDoList.map(function(d){
            console.log(d)
            return (
              <li className="list-group-item">{d.ItemName}</li>
            )
          })} 
        </ul>
    </div>
  );
};

export default Home;