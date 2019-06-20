import React from 'react';

class ErrorMessage extends React.Component {
    render() {
        switch (this.props.errorCode) {
            case 0:// Empty string
                return <span>{this.props.label} is not empty</span>;
            default:
                return '';

        }
    }
}

export default ErrorMessage;