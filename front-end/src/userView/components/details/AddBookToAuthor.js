import React, { useContext, useEffect, useState } from 'react';
import { Form, Modal, Button } from 'react-bootstrap';
import { LibraryContext } from '../../../context/LibraryContext';
import axios from 'axios';


const AddBookToAuthor = (props) => {
    const authorId = useState(props.author.id)
    const [books, setBooks] = useState([]);
    const [value, setValue] = useState();

    useEffect(() => {
        axios.get(
            'http://localhost:5000/books',
        ).then((response) => {
            axios.get(
                `http://localhost:5000/authors/${props.author.id}/books`,
            ).then((response2) => {
                const temp = response.data.filter(({ id, title }) =>
                    !response2.data.some(exclude => exclude.id === id && exclude.title === title)
                );
                setBooks(temp);
                if (temp != null)
                    setValue(temp[0])
            });
        });
    }, [])

    const submitForm = (e) => {
        if (value != null) {
            axios.post(`http://localhost:5000/authors/${props.author.id}/books`, {
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
                <Modal.Title>ADD BOOK TO AUTHOR</Modal.Title>
                <Form onSubmit={submitForm}>
                    <Form.Group controlId="exampleForm.SelectCustom">
                        <Form.Label>Custom select</Form.Label>
                        <Form.Control onChange={e => setValue(e.currentTarget.value)} as="select" custom>
                            { books.map(book => (
                                <option key={ book.id } value={ book }> { book.title } </option>
                            )) }
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

export default AddBookToAuthor;