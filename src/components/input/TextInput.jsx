import React from 'react';

class TextInput extends React.Component {
    render() {
        return (
            <input
                type="text"
                className="form-control"
                placeholder={`Input ${this.props.label}`}
                aria-describedby="button-addon2"
                value={this.props.value}
                onChange={this.props.onChange}
            />
        );
    }
}

export default TextInput;