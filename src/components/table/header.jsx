import * as React from 'react';
import Td from './Td';
import TruckModel from '../../services/TruckModel';

/**
 * Header component
 */
class Header extends React.Component {
    renderHeader() {
        let headerItems = [];

        for (let i = 0; i < this.props.value.length; i++) {
            if (TruckModel[this.props.value[i].key].showOnList) {
                headerItems.push(<Td key={`${this.props.value[i].key}-${i}`} value={this.props.value[i]} type={1} />);
            }
        }
        return headerItems;
    }
    render() {
        return (
            <thead className="thead-dark">
                <tr>
                    {this.renderHeader()}
                    <th>Action</th>
                </tr>
            </thead>
        );
    }
}

export default Header;