import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Books from './Books';
import Home from './Home';
import SavedBooks from './MyBooks';
import NavbarComp from './Navbar';
import Settings from './Settings';


class MainComponent extends Component {

    state = {
        savedBook: [],
        settingValues: {
            printType: 'printType',
            language: 'language',
            filter: 'filter',
            sortBy: 'sortBy',
            maxResults:8,
        },
    }
    

    handleBookAdd = (book) => {
        let s1 = { ...this.state };
        if (book.added) {
            s1.savedBook.push(book);
        } else {
            let ind = s1.savedBook.findIndex((a) => a.id === book.id);
            s1.savedBook.splice(ind, 1);
        }
        //console.log(s1.savedBook);
        this.setState(s1);       
    }
    removeBook = (id) => {
        let s1 = { ...this.state };
        let ind = s1.savedBook.findIndex((a) => a.id === id);
        s1.savedBook.splice(ind, 1);
        this.setState(s1); 
    }
    handleSettings = (options) => {
        //console.log(options);
        this.setState({settingValues:options})
    }
    render() {
        //console.log(this.state.savedBook);
        return (
            <>
                <NavbarComp />
                <Switch>
                    <Route
                        path='/books'
                        render={(props) =>
                            <Books
                                {...props}
                                onBookAdd={this.handleBookAdd}
                                addedBooks={this.state.savedBook}
                                settingsValue={this.state.settingValues}
                            />}
                    ></Route>
                    <Route
                        path='/settings'
                        render={(props) =>
                            <Settings
                                {...props}
                                settingValues={this.state.settingValues}
                                onSubmit = {this.handleSettings}
                            />}></Route>
                    <Route
                        path='/myBooks'
                        render={(props) =>
                            <SavedBooks
                                {...props}
                                books={this.state.savedBook}
                                onRemoveBook = {this.removeBook}
                            />
                        }
                    ></Route>
                    <Route path='/' component={Home}></Route>

                </Switch>
            </>
        )
    }
}
export default MainComponent;