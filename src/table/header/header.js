import * as React from 'react';
import Td from '../td/td';
import './header.scss';

/**
 * Header component
 */
class Header extends React.Component {
    renderHeader() {
        let headerItems = [];

        for (let i = 0; i < this.props.value.length; i++) {
            headerItems.push(<Td key={`${this.props.value[i].key}-${i}`} value={this.props.value[i]} />);
        }
        return headerItems;
    }
    render() {
        return (
            <thead>
                <tr>
                    {this.renderHeader()}
                </tr>
            </thead>
        );
    }
}

export default Header;