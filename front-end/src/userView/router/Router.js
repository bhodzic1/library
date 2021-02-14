import React, { useContext } from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import NavigationBar from '../navigationBar/NavigationBar';
import App from '../../App';
import AddAuthor from '../components/addForm/AddAuthor';
import AddBook from '../components/addForm/AddBook';
import AuthorDetails from '../components/details/AuthorDetails';
import BookDetails from '../components/details/BookDetails';
import Login from '../components/login/Login';
import { LibraryContext } from '../../context/LibraryContext';
import EditAuthor from '../components/editForm/EditAuthor';
import EditBook from '../components/editForm/EditBook';


const Router = () => { 
    const { auth } = useContext(LibraryContext);
    return (
        <BrowserRouter>
            <NavigationBar />
            <Switch>
                <Route path="/" component={ App } exact />
                { auth &&
                    <Route path="/addauthor" component={ AddAuthor } />
                }
                { auth &&
                    <Route path="/addbooks" component={ AddBook } />
                }
                { auth &&
                    <Route path="/author/:id" component={ AuthorDetails } />
                }
                { auth &&
                    <Route path="/book/:id" component={ BookDetails } />
                }
                { !auth &&
                    <Route path="/login" component={ Login } />
                }
                { auth &&
                    <Route path="/editauthor/:id" component={ EditAuthor } />
                }
                { auth &&
                    <Route path="/editbook/:id" component={ EditBook } />
                }
            </Switch>
        </BrowserRouter>

    )
}

export default Router;