import React, { useContext, useEffect, useState } from 'react';
import { Form, Modal, Button } from 'react-bootstrap';
import { LibraryContext } from '../../../context/LibraryContext';
import axios from 'axios';


const AddAuthorToBook = (props) => {
    const authorId = useState(props.book.id)
    const [authors, setAuthors] = useState([]);
    const [value, setValue] = useState();

    useEffect(() => {
        axios.get(
            'http://localhost:5000/authors',
        ).then((response) => {
            axios.get(
                `http://localhost:5000/books/${props.book.id}/authors`,
            ).then((response2) => {
                const temp = response.data.filter(({ id, firstName }) =>
                    !response2.data.some(exclude => exclude.id === id && exclude.firstName === firstName)
                );
                setAuthors(temp);
                if (temp != null)
                    setValue(temp[0])
            });
        });
    }, [])

    const submitForm = (e) => {
        if (value != null) {
            axios.post(`http://localhost:5000/books/${props.book.id}/authors`, {
                id: value.id
            })
        }
        props.onHide();
    }

    return (
        <Modal {...props}
            backdrop="static"
            keyboard={false}>
            <Modal.Header closeButton>
                <Modal.Title>ADD AUTHOR TO BOOK</Modal.Title>
                <Form onSubmit={submitForm}>
                    <Form.Group controlId="exampleForm.SelectCustom">
                        <Form.Label>Custom select</Form.Label>
                        <Form.Control onChange={e => setValue(e.currentTarget.value)} as="select" custom>
                            {authors.map(author => (
                                <option key={author.id} value={author}> { author.firstName + " " + author.lastName} </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Modal.Footer>
                        <Button variant="success" type="submit">
                            Submit
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal.Header>
        </Modal>
    )
}

export default AddAuthorToBook;