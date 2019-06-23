import * as React from 'react';
import Td from './td';
import TruckModel from '../../services/truckModel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

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
                if ('id' !== keys[i] && TruckModel[keys[i]].showOnList) {
                    cells.push(<Td key={`${keys[i]}`} value={item[keys[i]]} mapping={this.props.mapping[keys[i]]} />);
                }
            }
            bodyItems.push(
                <tr key={`${this.props.value[i].id}-${i}`}>
                    {cells}
                    <td className="">
                        <div className='d-flex'>
                            <div className="edit-truck-button mr-1"
                                onClick={() => { this.props.onOpenEditForm(this.props.value[i].id) }}
                            ><FontAwesomeIcon icon={faPencilAlt} /></div>
                            <div className="delete-truck-button"
                                onClick={() => { this.props.onDelete(this.props.value[i].id) }}>
                                <FontAwesomeIcon icon={faTrashAlt} /></div>
                        </div>
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