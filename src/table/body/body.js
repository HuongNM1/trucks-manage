import * as React from 'react';
import Td from '../td/td';
import './body.scss';

/**
 * Body component
 */

class Body extends React.Component {
    renderBody() {
        let bodyItems = [];
        let row = {};
        let cells = [];

        for (let i = 0; i < this.props.value.length; i++) {
            row = this.props.value[i];
            cells = [];
            const keys = Object.keys(row);
            for(let i = 0; i < keys.length; i++){
                if ('id' !== keys[i]) {
                    cells.push(<Td key={`${keys[i]}`} value={row[keys[i]]} />);
                }
            }
            bodyItems.push(<tr key={`${this.props.value[i].id}-${i}`}>{cells}</tr>);
        }
        return bodyItems;
    }
    render() {
        return (
            <tbody>
                {this.renderBody()}
            </tbody>
        );
    }
}

export default Body;