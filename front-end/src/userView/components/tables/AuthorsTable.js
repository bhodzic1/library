import React, { useContext, useEffect } from 'react'
import { Button, Table } from 'react-bootstrap';
import { LibraryContext } from '../../../context/LibraryContext';
import { Link } from 'react-router-dom';
import './style.css';

const AuthorsTable = () => {
    const { authors, auth, reloadData } = useContext(LibraryContext);
    useEffect(() => {
        reloadData();
    }, [])

    return (
        <div className="tableAuthorsBooks">
            <h2>AUTHORS</h2>
            <Table responsive>
                <thead>
                    <tr>
                        <th>First name</th>
                        <th>Last name</th>
                        <th>Date of birth</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {authors.map(author => (
                        <tr key={author.id}>

                            <td> {author.firstName} </td>
                            <td> {author.lastName} </td>
                            <td> {author.dob.toString().substring(0, 10)} </td>

                            <td> {auth &&
                                <Link to={{ pathname: `/author/${author.id}`, state: author }}>
                                    <Button>Details</Button>
                                </Link>
                            }
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            {auth &&
                <Link to="/addauthor">
                    <Button>
                        Add author
                    </Button>
                </Link>
            }
        </div>
    )
}

export default AuthorsTable;
