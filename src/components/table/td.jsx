import * as React from 'react';

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
    render() {
        let tdEle = (
            <td key={this.handleValue()}>{this.handleValue()}</td>
        );
        if (1 === this.props.type) {
            tdEle = (
                <th key={this.handleValue()} scope="col">{this.handleValue()}</th>
            );
        }
        return tdEle;
    }
}

export default Td;