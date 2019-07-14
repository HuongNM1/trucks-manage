import * as React from 'react';
import Td from './td';
import TruckModel from '../../services/truckModel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import {connect} from 'react-redux';
// import {onOpenEditFormAction, onDeleteAction} from '../../redux/actions'
import * as actions from '../../redux/actions'
import {bindActionCreators} from 'redux';
/**
 * Body component
 */

class Body extends React.Component {
    renderBody() {
        let bodyItems = [];
        let cells = [];
        let item = {}
        if(0 === this.props.dataListPage.length){
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

        for (let i = 0; i < this.props.dataListPage.length; i++) {
            item = this.props.dataListPage[i];
            cells = [];
            const keys = Object.keys(item);
            for (let i = 0; i < keys.length; i++) {
                if ('id' !== keys[i] && TruckModel[keys[i]].showOnList) {
                    cells.push(<Td key={`${keys[i]}`} value={item[keys[i]]} mapping={this.props.mapping[keys[i]]} />);
                }
            }
            bodyItems.push(
                <tr key={`${this.props.dataListPage[i].id}-${i}`}>
                    {cells}
                    <td className="">
                        <div className='d-flex'>
                            <div className="edit-truck-button mr-2"
                                onClick={() => { this.props.onOpenEditForm(this.props.dataListPage[i].id) }}
                            ><FontAwesomeIcon icon={faPencilAlt} /></div>
                            <div className="delete-truck-button"
                                onClick={() => { this.props.onDelete(this.props.dataListPage[i].id) }}>
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
    dataListPage: state.model.dataListPage,
    mapping: state.model.mapping
});

const mapDispatchToProps = dispatch =>{
    return {
        // onOpenEditForm: id=>{dispatch(actions.onOpenEditFormAction(id))},
        // onDelete: id=>{dispatch(actions.onDeleteAction(id))}
        // Tuong duong voi doan code ben duoi
        onOpenEditForm: bindActionCreators(actions.onOpenEditFormAction, dispatch),
        onDelete: bindActionCreators(actions.onDeleteAction, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Body);