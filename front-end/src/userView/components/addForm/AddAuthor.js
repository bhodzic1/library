import React, { useContext, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import './addAuthor.css';
import { useHistory } from 'react-router-dom';
import { LibraryContext } from '../../../context/LibraryContext';

const AddAuthor = () => {
    const { addAuthor } = useContext(LibraryContext)
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [dob, setDob] = useState("");
    const [image, setImage] = useState(null)
    const history = useHistory();

    const handleFirstNameChange = (e) => {
        e.preventDefault();
        setFirstName(e.target.value);
    }
    const handleLastNameChange = (e) => {
        e.preventDefault();
        setLastName(e.target.value);
    }
    const handleDOBChange = (e) => {
        e.preventDefault();
        setDob(e.target.value);
    }
    const handleImageUplaod = (e) => {
        e.preventDefault();
        setImage(e.target.files[0]);
    }
    const handleAddAuthor = () => {
        let data = new FormData();
        data.append("firstName", firstName);
        data.append("lastName", lastName);
        data.append("dob", dob);
        data.append("image", image);
        addAuthor(data);
        history.push("/");
    }

    return (
        <div className="containerForm">
            <Form onSubmit={() => handleAddAuthor() }>
                <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>First name</Form.Label>
                    <Form.Control type="text" placeholder="Enter your first name" onChange={handleFirstNameChange} value={firstName} required />
                    <Form.Label>Last name</Form.Label>
                    <Form.Control type="text" placeholder="Enter your last name" onChange={handleLastNameChange} value={lastName} required />
                    <Form.Label>Date of birth</Form.Label>
                    <Form.Control type="date" onChange={handleDOBChange} value={dob} required />
                    <Form.Label>Image</Form.Label>
                    <Form.Control name="myImage" type="file" accept="image/*" onChange={handleImageUplaod} />
                    <Button className="addButton" variant="primary" type="submit">
                        Submit
                    </Button>
                </Form.Group>
            </Form>
        </div>
    )
}

export default AddAuthor;