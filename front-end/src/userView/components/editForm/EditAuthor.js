import React, { useContext, useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom';
import { LibraryContext } from '../../../context/LibraryContext';
import axios from 'axios';

const EditAuthor = () => {
    const { id } = useParams();
    const { editAuthor } = useContext(LibraryContext);
    const [author, setAuthor] = useState();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [image, setImage] = useState(null)
    const history = useHistory();
    
    const [dob, setDob] = useState("");
    
    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        axios.get(`http://localhost:5000/authors/${id}`,)
        .then((response) => {
            setAuthor(response.data);
            setFirstName(response.data.firstName)
            setLastName(response.data.lastName)
            setImage(response.data.image)

            const dateOfBirth = response.data.dob.toString().substring(0, 10)
            const year = dateOfBirth.toString().substring(0, 4);
            const month = dateOfBirth.toString().substring(5, 7);
            const day = dateOfBirth.toString().substring(8, 10);
            setDob(('0' + parseInt(year)).slice(-4) + "-" + ('0' + parseInt(month)).slice(-2) + "-" + ('0' + parseInt(day)).slice(-2));
        }) 
    }

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
    const handleEditAuthor = () => {
        let data = new FormData();
        data.append("firstName", firstName);
        data.append("lastName", lastName);
        data.append("dob", dob);
        data.append("image", image);
        editAuthor(id, data);
        history.push("/");
    }

    return (
        <div className="containerForm">
            <Form onSubmit={() => handleEditAuthor()}>
                <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>First name</Form.Label>
                    <Form.Control type="text" placeholder="Enter your first name" onChange={handleFirstNameChange} value={firstName} required />
                    <Form.Label>Last name</Form.Label>
                    <Form.Control type="text" placeholder="Enter your last name" onChange={handleLastNameChange} value={lastName} required />
                    <Form.Label>Date of birth</Form.Label>
                    <Form.Control type="date" dateformat={"YYYY/MM/DD"} onChange={handleDOBChange} value={dob} required />
                    <Form.Label>Image</Form.Label>
                    <Form.Control name="myImage" type="file" accept="image/*" onChange={handleImageUplaod} />
                    <Button variant="primary" className="addButton" type="submit">
                        Submit
                    </Button>
                </Form.Group>
            </Form>
        </div>
    )
}

export default EditAuthor;