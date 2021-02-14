import React, { useEffect, useState } from 'react';
import axios from 'axios';

export const LibraryContext = React.createContext();

const storageAuth = localStorage.getItem('auth')? JSON.parse(localStorage.getItem('auth')) : false;
const storageToken = localStorage.getItem('token') ? localStorage.getItem('token') : null;


export const LibraryProvider = (props) => {
    const [authors, setAuthors] = useState([]);
    const [books, setBooks] = useState([]);
    const [auth, setAuth] = useState(storageAuth);
    const [token, setToken] = useState(storageToken);
    
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const storageAuth = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : false;
        const storageToken = localStorage.getItem('token') ? localStorage.getItem('token') : null;
        setAuth(storageAuth);
        setToken(storageToken);
        const resultAuthor = await axios(
            'http://localhost:5000/authors',
        );
        setAuthors(resultAuthor.data);

        const resultBooks = await axios(
            'http://localhost:5000/books',
        );
        setBooks(resultBooks.data);
    };

    const reloadData = () => {
        fetchData();
    }

    const updateAuthors = (authors) => {
        setAuthors(authors);
    }

    const addAuthor = (data) => {
        axios.post('http://localhost:5000/authors', data)
        .then()
        .catch(err => console.log(err));
        
    }

    const addBook = (data) => {
        axios.post('http://localhost:5000/books', data)
        .then()
        .catch(err => console.log(err));
    }

    const login = (userName, password) => {
        axios.post('http://localhost:5000/login', {
            userName: userName,
            password: password
        }).then((response) => {
            localStorage.setItem('auth', response.data.auth);
            localStorage.setItem('token', response.data.token);
            setAuth(response.data.auth);
            setToken(response.data.token);
            
        });
    }

    const logout = () => {
        localStorage.setItem('auth', false);
        localStorage.setItem('token', null);
    }

    const deleteAuthor = (idAuthor) => {
        axios.delete(`http://localhost:5000/authors/${idAuthor}`)
        .then((response) => {
            
        });
    }

    const deleteBook = (idBook) => {
        axios.delete(`http://localhost:5000/books/${idBook}`)
            .then((response) => {

            });
    }


    const removeBookFromAuthor = (idAuthor, idBook) => {
        axios.delete(`http://localhost:5000/authors/${idAuthor}/books/${idBook}`)
        .then((response) => {

        });
    }

    const removeAuthorFromBook = (idBook, idAuthor) => {
        axios.delete(`http://localhost:5000/books/${idBook}/authors/${idAuthor}`)
        .then((response) => {

        });
    }

    const editAuthor = (id, data) => {
        axios.patch(`http://localhost:5000/authors/${id}`, data)
        .then()
        .catch(err => console.log(err));
    }

    const editBook = (id, data) => {
        axios.patch(`http://localhost:5000/books/${id}`, data)
            .then()
            .catch(err => console.log(err));
    }

    const updateBooks = (books) => {
        setBooks(books);
    }

    const getBooks = () => {
        return books;
    }

    const values = {
        updateAuthors,
        updateBooks,
        books,
        authors,
        deleteAuthor,
        deleteBook,
        removeBookFromAuthor,
        removeAuthorFromBook,
        addAuthor,
        addBook,
        auth,
        login,
        logout,
        reloadData,
        editAuthor,
        editBook
    }

    return (
        <LibraryContext.Provider value={ values }>
            { props.children }
        </LibraryContext.Provider>
    )
}