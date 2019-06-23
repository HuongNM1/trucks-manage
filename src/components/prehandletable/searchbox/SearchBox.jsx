import React from 'react';
// import Dropdown from './SearchDropdown'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

class SearchBox extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            searchBy: ''
        }

        this.getSearchBy = this.getSearchBy.bind(this);
    }

    getSearchBy(key) {
        this.setState({ searchBy: key });
    }
    render() {
        const searchIcon = <FontAwesomeIcon icon={faSearch} />
        return (
            <div className="input-group mb-3">
                {/* <Dropdown value={this.props.value} getSearchBy={this.getSearchBy} /> */}
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search here..."
                    aria-describedby="button-addon2"
                    id="input-search"
                />
                <div className="input-group-append">
                    <button
                        className="btn btn-outline-secondary"
                        type="button" id="button-addon2"
                        onClick={() => {
                            let searchElem = document.getElementById('input-search');
                            if (searchElem) {
                                this.props.search(this.state.searchBy, searchElem.value);
                            }
                        }}>
                        
                        {searchIcon}
                        Search
                    </button>
                </div>
            </div>
        );
    }
}

export default SearchBox;