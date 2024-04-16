import { getAllByLabelText } from '@testing-library/react';
import React, { Component } from 'react';

class LeftPanel extends Component {

    handleChange = (e) => {
        let options = { ...this.props.options };
        options[e.target.name] = e.target.value;
        this.props.onOptionChange(options);
    };

    makeBoxes = (arr, value, name, label) => (
        <>
            <label style={{ width: '250px' }} className='form-check-label fw-bold px-3 py-2 bg-light border'>{label}</label>
            {
                arr.map((a) => (
                    <div key={a.value} style={{ width: '250px' }} className="form-check px-5 py-2 border">
                        <input
                            className='form-check-input'
                            type='radio'
                            name={name}
                            value={a.value}
                            checked={value === a.value}
                            onChange={this.handleChange}
                        />
                        <label className='form-check-label '>{a.display}</label>
                    </div>
                ))
            }
        </>
    );
    makeDD =(arr, value, name, label)=>(
        <>
            <div className="form-group max-w-36">
                                    <label className='fw-bold w-full text-xs px-3 py-2 my-0 bg-light border form-label'>{label}</label>
                                    <select
                                        
                                        name={name}
                                        onChange={this.handleChange}
                                        value={value}
                                        className='form-control text-xs border text-wrap '>
                                        <option value=''>{label}</option>
                                        {arr.map((a) => (
                                            <option key={a.value} value={a.value}>{a.display}</option>
                                        ))}
                                    </select>
                                </div>
        </>
    )
    render() {
        let { langRestrict = '', filter = '', printType = '',orderBy='' } = this.props.options;
        // let { language='',filters='',print='',sort='' } = this.props.settingsValue;
        let { values } =  this.props;
        let languages = [{ display: 'English', value: 'en' }, { display: 'French', value: 'fr' }, { display: 'Hindi', value: 'hi' }, { display: 'Spanish', value: 'es' }, { display: 'Chinese', value: 'zh' }];
        let filterss = [{ display: 'Full Volume', value: 'full' }, { display: 'Partial Volume', value: 'partial' }, { display: 'Free Google e-Books', value: 'free-ebooks' }, { display: 'Paid Google e-Books',value:'paid-ebooks' }];
        let prints = [{ display: 'All', value: 'all' }, { display: 'Books', value: 'books' }, { display: 'Magazines', value: 'magazines' }, ];
        let orders = ['relevance', 'newest'];
        return (
            <>
                <div className=" hidden sm:grid grid-flow-row grid-cols-12">
                    {
                        values.language ? (
                            <div className="col-span-12 my-2">
                                {this.makeBoxes(languages, langRestrict, 'langRestrict', 'Language')}
                            </div>
                        ):''
                    }
                    {
                        values.filter ? (
                            <div className="col-span-12 my-2 ">
                                {this.makeBoxes(filterss, filter, 'filter', 'Filter')}
                            </div>
                        ):''
                    }
                    {
                        values.printType ? (
                            <div className="col-span-12 my-2 ">
                                {this.makeBoxes(prints, printType, 'printType', 'Print Type')}
                            </div>
                        ): ''
                    }
                    
                    {
                        values.sortBy ? (
                            <div className="col-span-12 my-2 pb-5 ">

                                <div className="form-group">
                                    <label style={{ width: '250px' }} className='fw-bold px-3 py-2 my-0 bg-light border form-label'>Order By</label>
                                    <select
                                        style={{ width: '250px' }}
                                        name='orderBy'
                                        onChange={this.handleChange}
                                        value={orderBy}
                                        className='form-control px-5 py-2 border'>
                                        <option value=''>Order By</option>
                                        {orders.map((a) => (
                                            <option key={a}>{a}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        ): ''
                    }
                    

                </div>
                <div className='flex sm:hidden justify-between w-full '>
                {
                        values.language ? (
                            <div className="max-w-40 mx-1 text-xs">
                                {this.makeDD(languages, langRestrict, 'langRestrict', 'Lang')}
                            </div>
                        ):''
                    }
                    {
                        values.filter ? (
                            <div className="max-w-40 mx-1 ">
                                {this.makeDD(filterss, filter, 'filter', 'Filter')}
                            </div>
                        ):''
                    }
                    {
                        values.printType ? (
                            <div className="max-w-40 mx-1">
                                {this.makeDD(prints, printType, 'printType', 'Print Type')}
                            </div>
                        ): ''
                    }
                    
                    {
                        values.sortBy ? (
                            <div className="max-w-40 mx-1">

                                <div className="form-group max-w-36">
                                    <label className='fw-bold text-xs px-3 py-2 my-0 bg-light border form-label'>Order By</label>
                                    <select
                                       
                                        name='orderBy'
                                        onChange={this.handleChange}
                                        value={orderBy}
                                        className='form-control text-xs border'>
                                        <option value=''>Order By</option>
                                        {orders.map((a) => (
                                            <option key={a}>{a}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        ): ''
                    }
                </div>
            </>
        )
    }
}
export default LeftPanel;