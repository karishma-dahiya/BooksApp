import React, { Component } from 'react';

class Settings extends Component {

    handleChange = (e) => {
        let options = { ...this.props.settingValues };
        let { type,name, checked, value } = e.target;
        console.log(name, value);
        if (type === 'checkbox') {
            if (checked) {
                options[name] = name;
            } else {
                options[name] = '';
            }
        } else {
            options[name] = value;
        }
        this.props.onSubmit(options);
    }
    render() {
        let { printType = '', language = '', filter = '', sortBy = '',maxResults='8' } = this.props.settingValues;
        return (
            <div className="container">
                <h3 className='text-danger'>Select Options for Filtering on Left Panel</h3>
                <div className="form-check">
                    <input
                        className='form-check-input form-check-inline'
                        type='checkbox'
                        name='printType'
                        value={printType}
                        checked={printType === 'printType'}
                        onChange={this.handleChange}
                    />
                    <label className='form-check-label '>printType--{'(Restrict to books or magaines)'}</label>
                </div>
                <div className="form-check">
                    <input
                        className='form-check-input form-check-inline'
                        type='checkbox'
                        name='language'
                        value={language}
                        checked={language === 'language'}
                        onChange={this.handleChange}
                    />
                    <label className='form-check-label '>languages--{'(Restrict to volumes returned to those that are tagged with the specified language)'}</label>
                </div>
                <div className="form-check">
                    <input
                        className='form-check-input form-check-inline'
                        type='checkbox'
                        name='filter'
                        value={filter}
                        checked={filter === 'filter'}
                        onChange={this.handleChange}
                    />
                    <label className='form-check-label '>filter--{'(Filter search result by volume type and availability)'}</label>
                </div>
                <div className="form-check">
                    <input
                        className='form-check-input form-check-inline'
                        type='checkbox'
                        value={sortBy}
                        name='sortBy'
                        checked={sortBy}
                        onChange={this.handleChange}
                    />
                    <label className='form-check-label '>orderBy--{'(Order of the volume search result)'}</label>
                </div>
                <div className="form-group">
                    <label className='form-label fs-5 text-success'>No of entries on a page</label>
                    <br/>
                    <input
                        className='form-input'
                        type='number'
                        name='maxResults'
                        value={maxResults}
                        onChange={this.handleChange}
                    />
                </div>
            </div>
        );
    }
}
export default Settings;