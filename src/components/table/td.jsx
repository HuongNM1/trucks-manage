import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import { onSortAction } from '../../redux/actions';

/**
 * TD component
 */
class Td extends React.Component {
    parseStringnumberToNumber = (val) => {
        try {
            return (val.toString().indexOf('.') !== -1) ? parseFloat(val) : parseInt(val);
        } catch (e) {
            console.log(e);
            return val;
        }
    }

    handleValue() {
        // Handle parse value
        let { value } = this.props;
        if (null != value && '' !== value && !isNaN(value) && 'string' === typeof value) {
            value = this.parseStringnumberToNumber(value);
        }
        //
        if ('string' === typeof value || 'number' === typeof value) {
            return this.props.value;
        } else if ('object' === typeof (value)) {
            if (value.text) {
                if (value.note) {
                    return `${value.text} ${value.note}`;
                }
                return value.text;
            } else {
                let val = [];
                Object.keys(value).forEach((key) => {
                    val.push(value[key]);
                });
                return val.join('-');
            }
        }
    }
    // onSort = (sortBy, sortType) => {
    //     this.props.onSort(sortBy, sortType);
    // }
    render() {
        let tdEle = (
            <td key={this.handleValue()}>{this.handleValue()}</td>
        );
        if (1 === this.props.type) {
            let sortEle = this.props.value.sortAble ?
                <div className={`sort-icon-cover sort-icon-cover-${this.props.value.key}`}>
                    <div className='up' onClick={() => { this.props.onSort(this.props.value.key, 0) }}><FontAwesomeIcon icon={faAngleUp} /></div>
                    <div className='down' onClick={() => { this.props.onSort(this.props.value.key, 1) }}><FontAwesomeIcon icon={faAngleDown} /></div>
                </div> : '';
            tdEle = (
                <th key={this.handleValue()} scope="col">
                    <div className={`th-content th-content-${this.props.value.key}`}>
                        {this.handleValue()}
                        {sortEle}
                    </div>
                </th>
            );
        }
        return tdEle;
    }
}

const mapStateToProps = state => {
    return ({ ...state.model })
};
const mapDispatchToProps = dispatch => {
    return {
        onSort: (sortBy, sortType) => { dispatch(onSortAction(sortBy, sortType)) }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Td);