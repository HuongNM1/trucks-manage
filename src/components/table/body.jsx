import * as React from 'react';
import Td from './td';
import TruckModel from '../../services/truckModel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import {connect} from 'react-redux';
import {onOpenEditFormAction, onDeleteAction} from '../../redux/actions'

/**
 * Body component
 */

class Body extends React.Component {
    renderBody() {
        let bodyItems = [];
        let cells = [];
        let item = {}
        if(0 === this.props.dataList.length){
            let columns = 1;
            for (let i = 0; i < this.props.header.length; i++) {
                if (TruckModel[this.props.header[i].key].showOnList){
                    columns+=1;
                }
            }
            return (
                <tr>
                    <td className="no-data" colspan={`${columns}`}>There are no data</td>
                </tr>
            );
        }

        for (let i = 0; i < this.props.dataList.length; i++) {
            item = this.props.dataList[i];
            cells = [];
            const keys = Object.keys(item);
            for (let i = 0; i < keys.length; i++) {
                if ('id' !== keys[i] && TruckModel[keys[i]].showOnList) {
                    cells.push(<Td key={`${keys[i]}`} value={item[keys[i]]} mapping={this.props.mapping[keys[i]]} />);
                }
            }
            bodyItems.push(
                <tr key={`${this.props.dataList[i].id}-${i}`}>
                    {cells}
                    <td className="">
                        <div className='d-flex'>
                            <div className="edit-truck-button mr-2"
                                onClick={() => { this.props.onOpenEditForm(this.props.dataList[i].id) }}
                            ><FontAwesomeIcon icon={faPencilAlt} /></div>
                            <div className="delete-truck-button"
                                onClick={() => { this.props.onDelete(this.props.dataList[i].id) }}>
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
const mapStateToProps = state => ({
    header: state.model.header,
    dataList: state.model.dataList,
    mapping: state.model.mapping
});

const mapDispatchToProps = dispatch =>{
    return {
        onOpenEditForm: id=>{dispatch(onOpenEditFormAction(id))},
        onDelete: id=>{dispatch(onDeleteAction(id))}
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Body);