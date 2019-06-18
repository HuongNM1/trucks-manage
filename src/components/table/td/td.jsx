import * as React from 'react';
import './td.scss';
/**
 * TD component
 */
class Td extends React.Component {
    handleValue() {
        if ('string' === typeof (this.props.value)) {
            return this.props.value;
        } else if ('object' === typeof (this.props.value)) {
            if (this.props.value.text) {
                return this.props.value.text;
            } else {
                Object.keys(this.props.value).forEach((key) => {
                    return this.props.value[key];
                });
            }
        }
    }
    render() {
        let reactElem = (
            <td key={this.handleValue()}>{this.handleValue()}</td>
        );
        if(1 === this.props.type){
            reactElem = (
                <th key={this.handleValue()} scope="col">{this.handleValue()}</th>
            );
        }
        return reactElem;
    }
}

export default Td;