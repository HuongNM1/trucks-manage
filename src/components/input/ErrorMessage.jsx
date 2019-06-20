import React from 'react';
import './Input.scss';

class ErrorMessage extends React.Component {
    render() {
        switch (this.props.errorCode) {
            case 0:// Empty string
                return <span className="msg-error">{this.props.label} is not empty</span>;
            case 1:// Out of max-length
                return <span className="msg-error">{this.props.label} is out of max-length</span>;
            default:
                return '';

        }
    }
}

export default ErrorMessage;