import React from 'react'
import './style.css';
import AuthorsTable from './tables/AuthorsTable';
import BooksTable from './tables/BooksTable';

const Home = () => {
    return (
        <div>
            <AuthorsTable />
            <BooksTable />
        </div>
    )
}

export default Home;