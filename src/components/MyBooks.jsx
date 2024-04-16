import React, { Component } from 'react';


class SavedBooks extends Component {
    
    handlebooks = (id) => {
        this.props.onRemoveBook(id);
    }
    render() {
        let { books } = this.props;
        return (
            <div className="">
                <div className="bg-info fw-bold text-center fs-3 text-warning">
                    {books.length===0 ? 'No book added ' : 'My Book List'}
                </div>
                <div className="grid grid-flow-row grid-cols-12 container p-5 m-2">
                    {books.map((a) => (
                        <div key={a.id} className=" bg-success flex flex-col justify-between rounded-md border-light sm:col-span-3 col-span-6 m-2  text-center">
                            <div className="d-flex justify-content-center">
                                <img src={a.volumeInfo.imageLinks.thumbnail ? a.volumeInfo.imageLinks.thumbnail : ''} alt='img' />
                            </div>
                            <div className="fw-bold mt-2 fs-5 ">{a.volumeInfo.title}</div>
                            <div className="">{a.volumeInfo.authors}</div>
                            <div className="">{a.volumeInfo.categories ? a.volumeInfo.categories : 'N/A'}</div>
                            <div className="flex w-full">
                                <button onClick={() => this.handlebooks(a.id)} className='btn mt-2 w-full text-center btn-secondary'>
                                    Remove 
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}
export default SavedBooks;