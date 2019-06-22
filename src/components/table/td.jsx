import * as React from 'react';

/**
 * TD component
 */
class Td extends React.Component {
    handleValue() {
        if ('string' === typeof this.props.value) {
            return this.props.value;
        } else if ('number' === typeof this.props.value) {
            let mapping = this.props.mapping;
            if (null != mapping &&
                Array.isArray(mapping) &&
                0 < mapping.length) {
                for (let i = 0; i < mapping.length; i++) {
                    if (this.props.value === mapping[i].value) {
                        
                        return mapping[i].text;
                    }
                }
            }
            return this.props.value;
        } else if ('object' === typeof (this.props.value)) {
            if (this.props.value.text) {
                if (this.props.value.note) {
                    return `${this.props.value.text} ${this.props.value.note}`;
                }
                return this.props.value.text;
            } else {
                let val = [];
                Object.keys(this.props.value).forEach((key) => {
                    val.push(this.props.value[key]);
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