import * as React from 'react';
import Td from './td';
import TruckModel from '../../services/truckModel';
import { connect } from 'react-redux';

/**
 * Header component
 */
class Header extends React.Component {
    renderHeader() {
        let headerItems = [];

        for (let i = 0; i < this.props.header.length; i++) {
            if (TruckModel[this.props.header[i].key].showOnList) {
                headerItems.push(
                    <Td
                        key={`${this.props.header[i].key}-${i}`}
                        value={this.props.header[i]} type={1}
                    />);
            }
        }
        return headerItems;
    }
    render() {
        return (
            <thead className="thead-dark">
                <tr>
                    {this.renderHeader()}
                    <th> <div className="th-content-action">Action</div></th>
                </tr>
            </thead>
        );
    }
}

const mapStateToProps = state =>({
    header: state.model.header
});

export default connect(mapStateToProps, null)(Header);