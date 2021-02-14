import React, { useContext, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { LibraryContext } from '../../../context/LibraryContext';
import './addAuthor.css';

const AddBook = () => {
    const { addBook } = useContext(LibraryContext);
    const [isbn, setIsbn] = useState("");
    const [title, setTitle] = useState("");
    const [pages, setPages] = useState(0);
    const [published, setPublished] = useState(0);
    const [image, setImage] = useState(null)
    let history = useHistory();

    const handleIsbnChange = (e) => {
        e.preventDefault();
        setIsbn(e.target.value);
    }

    const handleTitleChange = (e) => {
        e.preventDefault();
        setTitle(e.target.value);
    }

    const handlePagesChange = (e) => {
        e.preventDefault();
        setPages(e.target.value);
    }

    const handlePublishedChange = (e) => {
        e.preventDefault();
        setPublished(e.target.value);
    }

    const handleImageUplaod = (e) => {
        e.preventDefault();
        setImage(e.target.files[0]);
    }

    const handleAddBook = () => {
        let data = new FormData();
        data.append("isbn", isbn);
        data.append("title", title);
        data.append("pages", pages);
        data.append("published", published);
        data.append("image", image);
        addBook(data);
        history.push("/");
    }

    return (
        <div className="containerForm">
            <Form onSubmit={ () => handleAddBook() }>
                <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>ISBN</Form.Label>
                    <Form.Control type="text" placeholder="Enter isbn" onChange={ handleIsbnChange } value={ isbn } required />
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" placeholder="Enter title" onChange={ handleTitleChange } value={ title } required />
                    <Form.Label>Pages</Form.Label>
                    <Form.Control type="number" onChange={ handlePagesChange } value={ pages } required />
                    <Form.Label>Published</Form.Label>
                    <Form.Control type="number" onChange={ handlePublishedChange } value={ published } required />
                    <Form.Label>Image</Form.Label>
                    <Form.Control name="image" type="file" accept="image/*" onChange={handleImageUplaod} />
                    <Button variant="primary" className="addButton" type="submit">
                        Submit
                    </Button>
                </Form.Group>
            </Form>
        </div>
    )
}

export default AddBook;