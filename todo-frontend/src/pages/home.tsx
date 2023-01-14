import React, { useState, useEffect } from "react";
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import loginModel from "../models/loginModel";
import * as AuthService from "../services/auth-service";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as ToDoService from "../services/todo-service"
import * as Yup from "yup";
import toDoModel from "../models/toDoModel";
import ToDoItem from "../components/toDoItem";
import editToDoModel from "../models/editToDoModel";

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

  const deleteToDo = (Id: number) => {
    const filteredList = toDoList.filter(e => e.Id != Id)
    setToDoList(filteredList)
    ToDoService.deleteToDo(Id)
    .then(() => {
      getToDos()
    })
    .catch((error) => {
            setMessage(error.message);
            getToDos()
        }
    );

  }

  const editToDo = (formvalue: editToDoModel) => {
    const filteredList = toDoList.map(item => {
      if(item.Id == formvalue.Id) {
        if (formvalue.ItemName != undefined) {
          item.ItemName = formvalue.ItemName
        }
        if (formvalue.IsComplete != undefined) {
          item.IsComplete = formvalue.IsComplete
        }
      }
      return item
    });
    setToDoList(filteredList)
    ToDoService.editToDo({ItemName: formvalue.ItemName, Id: formvalue.Id, IsComplete: formvalue.IsComplete})
    .then(() => {
      getToDos()
    })
    .catch((error) => {
            setMessage(error.message);
            getToDos()
        }
    );
  }

  const addToDo = (formValue: { addtodo: string;}) => {
    const { addtodo } = formValue;

    setMessage("");

    const newTodo: toDoModel = {
      Id: 0,
      ItemName: addtodo,
      IsComplete: false,
      isMock: true,
    }

    const newList: toDoModel[] = [...[newTodo], ...toDoList]
    setToDoList(newList)
    ToDoService.addToDo(addtodo)
    .then(() => {
      getToDos()
    })
    .catch((error) => {
            setMessage(error.message);
            getToDos()
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
                onSubmit={(values, {resetForm}) => {addToDo({addtodo: values.addtodo}); resetForm();}}>
          <Form className="input-group mb-3">
            <Field name="addtodo" type="text" className="form-control" placeholder="Write something you need to remember!"/>
            <button className="btn btn-primary btn-large" type="submit" id="button-addon1">Add</button>
          </Form>
        </Formik>
        <ul className="list-group">
          {toDoList.map(function(d){
            return (
              <ToDoItem ItemName={d.ItemName} CreateDate={d.CreateDate} Id={d.Id} IsComplete={d.IsComplete} isMock={d.isMock} editFunction={editToDo} deleteFunction={deleteToDo}/>
            )
          })} 
        </ul>
    </div>
  );
};

export default Home;