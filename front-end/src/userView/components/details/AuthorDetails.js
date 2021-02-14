import React, { useContext, useEffect, useState } from 'react';
import { Button, Card, ListGroup } from 'react-bootstrap';
import { Link, useHistory, useLocation, useParams } from 'react-router-dom';
import './detailsStyle.css';
import axios from 'axios';
import AddBookToAuthor from './AddBookToAuthor';
import { LibraryContext } from '../../../context/LibraryContext';

const AuthorDetails = () => {
    const { id } = useParams();
    const { deleteAuthor, removeBookFromAuthor } = useContext(LibraryContext);
    const [books, setBooks] = useState([]);
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [dob, setDob] = useState("")
    const [image, setImage] = useState("")
    const [show, setShow] = useState(false);
    const [author, setAuthor] = useState();
    let history = useHistory();

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        axios.get(`http://localhost:5000/authors/${id}`,)
        .then((response) => {
            setAuthor(response.data);
            setFirstName(response.data.firstName)
            setLastName(response.data.lastName)
            setDob(response.data.dob)
            setImage(response.data.image)
        })
        
        axios.get(`http://localhost:5000/authors/${id}/books`)
        .then((response) => {
            setBooks(response.data);
        })
    }

    const onHide = () => {
        setShow(false)
        window.location.reload();
    }

    const handleDeleteAuthor = (id) => {
        deleteAuthor(id);
        history.push('/')
    }

    const handleRemoveBook = (authorId, bookId) => {
        removeBookFromAuthor(authorId, bookId);
        window.location.reload();
    }

    return (
        <div className="detailsContainer">
            <Card>
                <Card.Header>Author details</Card.Header>
                <Card.Body>
                    <Card.Img className="authorImage" variant="top" src={`/images/uploads/${image}`} />
                    <Card.Title>{firstName + " " + lastName }</Card.Title>
                    <Card.Text> Date of birth: { dob.toString().substring(0, 10) } </Card.Text>
                    <Card.Title>Books</Card.Title>
                    <ListGroup>
                    { books.map(book => (
                        <ListGroup.Item key={book.id}>
                            <Link to={{ pathname: `/book/${book.id}`, state: book}}>  
                                { book.title} 
                            </Link>
                            <Button variant="danger" className="removeButton" onClick={() => handleRemoveBook(id, book.id)}>Remove</Button>
                        </ListGroup.Item>   
                    ))}
                    </ListGroup>  
                    <Button variant="primary" className="groupButton" onClick={() => setShow(true)}>Add book</Button>
                    <Link to={{ pathname: `/editauthor/${id}`, state: author }}>
                        <Button variant="warning" className="groupButton">Edit author</Button>
                    </Link>
                    <Button variant="danger" className="groupButton" onClick={() => handleDeleteAuthor(id)}>Delete author</Button>
                </Card.Body>
            </Card>
            {
                show &&
                <AddBookToAuthor author={ author } show={show} onHide={onHide} />
            }
        </div>
    )
}

export default AuthorDetails;