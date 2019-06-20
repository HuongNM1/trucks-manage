import React from 'react';
import SearchBox from './searchbox/SearchBox';

class PrehandleTable extends React.Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-8">
                        <SearchBox search={this.props.search} value={this.props.value} />
                    </div>
                    <div className="col-4">
                        <button
                            type="button"
                            className="btn btn-info"
                            onClick={this.props.addTruck}
                        >
                            Add new truck
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default PrehandleTable;