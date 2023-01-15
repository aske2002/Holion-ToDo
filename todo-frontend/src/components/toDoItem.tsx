import React, { useState } from "react";
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import editToDoModel from "../models/editToDoModel";

interface ToDoItemProps {
    Id: number,
    ItemName: string,
    IsComplete: boolean,
    CreateDate?: Date,
    isMock?: boolean,
    editFunction: (formvalue: editToDoModel) => void,
    deleteFunction: (id: number) => void,
}

const ToDoItem: React.FC<ToDoItemProps> = ({CreateDate, ItemName, IsComplete, Id, isMock, editFunction, deleteFunction}: ToDoItemProps) => {
    const [isEdit, setIsEdit] = useState<boolean>(false);

    console.log(IsComplete)
    const initialValues: {
        ItemName: string,
    } = {
        ItemName: ItemName,
    };    

    const validationSchema = Yup.object().shape({
        ItemName: Yup.string().required("Please enter new name"),
    });

    return (
        <li className="list-group-item d-flex justify-content-between align-items-center px-3" style={{opacity: isMock===true ? "0.5" : "1"}}>
            <div>
                {isEdit ? (
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={(values: {ItemName: string}) => { editFunction({ItemName: values.ItemName, Id: Id}); setIsEdit(false); initialValues.ItemName = ""}}>
                        <Form>
                            <Field type="text" name="ItemName" autoFocus className="form-control" aria-label="Username" aria-describedby="basic-addon1"/>
                        </Form>
                    </Formik>
                    
                ) : (
                    <h4>{ItemName}</h4>
                )}
                <small>{(CreateDate == null) ? "Loading" : new Date(CreateDate).toDateString()}</small>
            </div>
            {(isMock === undefined) && (
                <div className="d-flex align-items-center">
                    <div style={{cursor: "pointer"}} onClick={() => setIsEdit(!isEdit)}>
                        <EditRoundedIcon/>
                    </div>
                    <div style={{cursor: "pointer"}} onClick={(e) => {deleteFunction(Id);}}>
                            <DeleteRoundedIcon className="mx-3" />
                    </div>
                    <input style={{height: "30px", width: "30px"}} className="form-check-input" type="checkbox" id="flexCheckChecked" checked={IsComplete} onChange={(e) => editFunction({Id: Id, IsComplete: e.target.checked})}/>
                </div>
            )}
        </li>
    )
}

export default ToDoItem