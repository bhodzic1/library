import React, { useContext, useEffect } from 'react'
import { Button, Table } from 'react-bootstrap';
import { LibraryContext } from '../../../context/LibraryContext';
import { Link } from 'react-router-dom';
import './style.css';

const BooksTable = () => {
    const { books, auth, reloadData } = useContext(LibraryContext);

    useEffect(() => {
        reloadData();
    }, [])

    return (
        <div className="tableAuthorsBooks">
            <h2>BOOKS</h2>
            <Table responsive>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>ISBN</th>
                        <th>Pages</th>
                        <th>Published</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {books.map(book => (
                        <tr key={book.id}>
                            <td> {book.title} </td>
                            <td> {book.isbn} </td>
                            <td> {book.pages} </td>
                            <td> {book.published} </td>
                            <td>
                                {auth &&
                                    <Link to={{ pathname: `/book/${book.id}`, state: book }}>
                                        <Button>Details</Button>
                                    </Link>
                                }
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            { auth &&
                <Link to="/addbooks">
                    <Button>
                        Add book
                        </Button>
                </Link>
            }
        </div>
    )
}

export default BooksTable;