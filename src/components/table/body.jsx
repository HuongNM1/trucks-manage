import * as React from 'react';
import Td from './td';

/**
 * Body component
 */

class Body extends React.Component {
    renderBody() {
        let bodyItems = [];
        let cells = [];
        let item = {}

        for (let i = 0; i < this.props.value.length; i++) {
            item = this.props.value[i];
            cells = [];
            const keys = Object.keys(item);
            for (let i = 0; i < keys.length; i++) {
                if ('id' !== keys[i]) {
                    cells.push(<Td key={`${keys[i]}`} value={item[keys[i]]} />);
                }
            }
            bodyItems.push(
                <tr key={`${this.props.value[i].id}-${i}`}>
                    {cells}
                    <td className="d-flex">
                        <button type="button" className="btn btn-outline-warning mr-1"
                            onClick={()=>{this.props.onOpenEditForm(this.props.value[i].id)}}
                            >Edit</button>
                        <button type="button" className="btn btn-outline-danger">Delete</button>
                    </td>
                </tr>
            );
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