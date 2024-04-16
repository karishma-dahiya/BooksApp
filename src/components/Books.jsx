import React, { Component } from 'react';
import LeftPanel from './Sidepanel';
import queryString from 'query-string'
import http from './httpReq.js';

class Books extends Component {

    state = {
        books: [],
        startIndex: '',
        maxResults: 8,
        arrLength: '',
        addedBooks: [],
        settingsValue: '',
        added:'',
        searchText:''
        
    }
    getProps = () => {
        let { addedBooks, settingsValue } = this.props;
        this.setState({ addedBooks: addedBooks, settingsValue: settingsValue });
    }
    async getBooks() {
        try {
            let { addedBooks, settingsValue } = this.props;
            let max = settingsValue.maxResults;
            let queryParms = queryString.parse(this.props.location.search);
            let { searchText } = queryParms;
            let startIndex = (this.state.startIndex && this.state.searchText===searchText) ? this.state.startIndex : 0;
           
            let searchStr = this.makeSearchStr(queryParms);
            //console.log(searchText,searchStr);
            let maxres = startIndex === 0 ? `&maxResults=${max}` : '';
            //console.log(searchStr);
            const response = await http.get(`/?q=${searchText}${searchStr}${maxres}`);
            let books = response.data.totalItems === 0 ? [] : response.data.items;
            //console.log(response.data);
            //let { data } = response;
            this.setState({
                books: books,
                startIndex: startIndex,
                arrLength: response.data.totalItems,
                addedBooks: addedBooks,
                settingsValue: settingsValue,
                maxResults:max,
                searchText:searchText
            });
            this.setBooks();
            //console.log(queryParms);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    setBooks = () => {
        let s1 = { ...this.state };
        let { books, addedBooks } = s1;
        let newbooks = books.map((a) => {
            let book = addedBooks.find((b) => b.id === a.id);
            if (book) {
                a.added = true;    
            } 
                return a; 
        });
        //console.log(newbooks,addedBooks);
        if (addedBooks.length > 0) {
            this.setState({ books: newbooks });
        }
    }
    async componentDidMount() {
        this.getBooks();
        
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps !== this.props) {
            if (prevState.added !== this.state.added) {
                this.getProps();
                this.setBooks();
            } else {
                //this.setBooks();
                this.getBooks();
            }
            
        }
    }
   
    handlePage = (str) => {
        let queryParms = queryString.parse(this.props.location.search);
        let s1 = { ...this.state };
        if (str === 'next') {
            s1.startIndex = s1.startIndex + s1.maxResults;
            queryParms.startIndex = +s1.startIndex;
            queryParms.maxResults = +s1.maxResults;
        } else if (str === 'pre') {
            s1.startIndex = s1.startIndex - s1.maxResults;
            queryParms.startIndex = +s1.startIndex;
            queryParms.maxResults = +s1.maxResults;
        }
        //console.log(queryParms);
        this.callURL('/books', queryParms);
        this.setState(s1);
    }
    handleMybooks = (id) => {
        
        let s1 = { ...this.state };
        let ind = s1.books.findIndex((a) => a.id === id);
        s1.books[ind].added = s1.books[ind].added===true ? false : true;
        let book1 = s1.books.find((a) => a.id === id);
        s1.added = id;
        // if(s1.books[ind].added){
        this.props.onBookAdd(book1);
        this.setState(s1);
        
    }
    handleChange = (options) => {
        this.callURL('/books', options);
    }
    callURL = (url, options) => {
        let searchStr = this.makeSearchStr(options);
        this.props.history.push({
            pathName: url,
            search: searchStr,
        });
    };
    makeSearchStr = (options) => {
        let { searchText,langRestrict, filter, printType, orderBy,startIndex,maxResults} = options;
        let searchStr = '';
        searchStr = this.addToQueryStr(searchStr, 'searchText', searchText);
        searchStr = this.addToQueryStr(searchStr, 'langRestrict', langRestrict);
        searchStr = this.addToQueryStr(searchStr, 'filter', filter);
        searchStr = this.addToQueryStr(searchStr, 'printType', printType);
        searchStr = this.addToQueryStr(searchStr, 'orderBy', orderBy);
        searchStr = this.addToQueryStr(searchStr, 'startIndex', startIndex);
        searchStr = this.addToQueryStr(searchStr, 'maxResults', maxResults);
        return searchStr;
    };
    addToQueryStr = (str, name, value) =>
        value
            ? str
                ? `${str}&${name}=${value}`
                : `${str}&${name}=${value}`
            : str;
    render() {
        
        let { books, startIndex, maxResults, arrLength, settingsValue } = this.state;
        let endIndex = (+startIndex) + (+maxResults) ;
        let queryParms = queryString.parse(this.props.location.search);
        let { searchText } = queryParms;
        return (
            <div className="container max-w-screen p-4">
                <div className="grid grid-flow-cols grid-cols-12 ">
                    <div className="md:col-span-3 col-span-12 ">
                        <LeftPanel
                            options={queryParms}
                            onOptionChange={this.handleChange}
                            values={settingsValue}
                        />
                    </div>
                    <div className="md:col-span-9 col-span-12">
                        <h2 className='text-center text-xl sm:text-2xl font-semibold my-4 text-warning'>{ searchText} Books</h2>
                        <h4 className='text-info'>{books.length===0 ? 'No Data Found' : (`${(+startIndex)+1} - ${endIndex} entries`) }</h4>
                        {
                            books.length > 0 ? (
                                <>
                                <div className="grid sm:hidden grid-flow-col my-2 grid-cols-12">
                                        <div className="col-span-2">
                                            {startIndex > 1 ? (
                                                <button onClick={() => this.handlePage('prev')} className='btn btn-primary btn-sm'>Prev</button>
                                            ) : ''}
                                        </div>
                                        <div className="col-span-8"></div>
                                        <div className="col-span-2">
                                            {endIndex < arrLength ? (
                                                <button onClick={() => this.handlePage('next')} className='btn btn-primary btn-sm'>Next</button>
                                            ) : ''}
                                        </div>
                                    </div>
                                <div className="grid grid-flow-row grid-cols-12">
                                    {books.map((a) => (
                                        <div key={a.id} className="flex flex-col rounded-md justify-between bg-success m-1 sm:max-h-96 border-light md:col-span-3 col-span-6   text-center ">
                                            <div className="d-flex justify-content-center">
                                                <img src={a?.volumeInfo?.imageLinks?.thumbnail ? a.volumeInfo.imageLinks.thumbnail : ''} alt='img' />
                                            </div>
                                            <div className="fw-bold mt-2 fs-5 ">{a?.volumeInfo?.title}</div>
                                            <div className="">{a?.volumeInfo?.authors}</div>
                                            <div className="">{a?.volumeInfo?.categories ? a.volumeInfo.categories : 'N/A'}</div>
                                            <div className="flex w-full content-center">
                                                <button onClick={() => this.handleMybooks(a.id)} className={`rounded-b-md p-2 text-white font-semibold w-full mt-1  ${a?.added? 'bg-blue-500':'bg-gray-500'}`}>
                                                    {a?.added ? 'Remove' : 'Save'}
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                    </div>
                                    <div className="hidden sm:grid grid-flow-col my-2 grid-cols-12">
                                        <div className="col-span-2">
                                            {startIndex > 1 ? (
                                                <button onClick={() => this.handlePage('prev')} className='btn btn-warning'>Prev</button>
                                            ) : ''}
                                        </div>
                                        <div className="col-span-8"></div>
                                        <div className="col-span-2">
                                            {endIndex < arrLength ? (
                                                <button onClick={() => this.handlePage('next')} className='btn btn-warning'>Next</button>
                                            ) : ''}
                                        </div>
                                    </div>
                                </>
                            ):''
                        }
                        
                        
                    </div>
                </div>
            </div>
        );
    }
}
export default Books;