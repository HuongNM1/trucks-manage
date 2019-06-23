import React from 'react';
import SearchBox from './searchbox/SearchBox';
import './PrehandleTable.scss';

class PrehandleTable extends React.Component {
    render() {
        return (
            <div className="cover-prehandle">
                <div className="search-item">
                    <SearchBox search={this.props.search} value={this.props.value} />
                </div>
                <div className="add-item">
                    <button
                        className="add-truck-class float-right"
                        onClick={this.props.addTruck}
                    >
                        + Add new truck
                        </button>
                </div>
            </div>
        );
    }
}

export default PrehandleTable;