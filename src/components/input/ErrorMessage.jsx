import React from 'react';
import './Input.scss';

class ErrorMessage extends React.Component {
    render() {
        switch (this.props.errorCode) {
            case 0:// Empty string
                return <span className="msg-error">{this.props.label} is not empty</span>;
            case 1:// Out of max-length
                return <span className="msg-error">{this.props.label} is out of {this.props.validate.maxLength} characters</span>;
            case 2:// Is not number
                return <span className="msg-error">{this.props.label} must be number</span>;
            case 3:// Out of max-value
                return <span className="msg-error">{this.props.label} is out of {this.props.validate.maxValue}</span>;
            case 4:// Is not plate string
                return <span className="msg-error">{this.props.label} is not truck palete format</span>;
            case 5:// Is out of max items
                return <span className="msg-error">{this.props.label} is out of max {this.props.validate.maxItem} items</span>;
            default:
                return '';

        }
    }
}

export default ErrorMessage;