import React, { useContext, useEffect, useState } from 'react';
import { Button, Card, ListGroup } from 'react-bootstrap';
import { Link, useHistory, useLocation, useParams } from 'react-router-dom';
import './detailsStyle.css';
import axios from 'axios';
import { LibraryContext } from '../../../context/LibraryContext';
import AddAuthorToBook from './AddAuthorToBook';

const BookDetails = () => {
    const { id } = useParams();
    const [isbn, setIsbn] = useState("");
    const [title, setTitle] = useState("");
    const [pages, setPages] = useState("");
    const [published, setPublished] = useState("");
    const [image, setImage] = useState("");
    const [book, setBook] = useState();
    const { removeAuthorFromBook, deleteBook } = useContext(LibraryContext);
    const [authors, setAuthors] = useState([]);
    const [show, setShow] = useState(false);
    let location = useLocation();
    let history = useHistory();

    useEffect(() => { 
        fetchData();
    }, [])

    const fetchData = async () => {
        axios.get(`http://localhost:5000/books/${id}`,)
            .then((response) => {
                setBook(response.data);
                setTitle(response.data.title);
                setPages(response.data.pages)
                setIsbn(response.data.isbn)
                setPublished(response.data.published)
                setImage(response.data.image)
            })

        axios.get(`http://localhost:5000/books/${id}/authors`)
            .then((response) => {
                setAuthors(response.data);
            })
    }

    const onHide = () => {
        setShow(false)
        window.location.reload();
    }

    const handleDeleteBook = (id) => {
        deleteBook(id);
        history.push('/')
    }

    const handleRemoveAuthor = (bookId, authorId) => {
        removeAuthorFromBook(bookId, authorId);
        window.location.reload();
    }

    return (
        <div className="detailsContainer">
            <Card>
                <Card.Header>Book details</Card.Header>
                <Card.Body>
                    <Card.Img className="authorImage" variant="top" src={`/images/uploads/${image}`} />
                    <Card.Title>{title}</Card.Title>
                    <Card.Text> ISBN: { isbn } </Card.Text>
                    <Card.Text> Pages: { pages } </Card.Text>
                    <Card.Text> Published at: { published } </Card.Text>
                    <Card.Title>Authors</Card.Title>
                    <ListGroup>
                        {authors.map(author => (
                            <ListGroup.Item key={author.id} > 
                                <Link to={{ pathname: `/author/${author.id}`, state: author }}>
                                    {author.firstName + " " + author.lastName}
                                </Link>
                                <Button variant="danger" className="removeButton" onClick={() => handleRemoveAuthor(id, author.id)}>Remove</Button>
                            </ListGroup.Item>
                        ))}
                    </ListGroup> 
                    <Button variant="primary" className="groupButton" onClick={() => setShow(true)}>Add author</Button>
                    <Link to={{ pathname: `/editbook/${id}`, state: book }}>
                        <Button variant="warning" className="groupButton">Edit book</Button>
                    </Link>
                    <Button variant="danger" className="groupButton" onClick={() => handleDeleteBook(id)}>Delete book</Button>
                </Card.Body>
            </Card>
            {
                show &&
                <AddAuthorToBook book={ book } show={show} onHide={onHide} />
            }
        </div>
    )
}

export default BookDetails;