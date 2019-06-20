import React from 'react';
import ErrorMessage from './ErrorMessage';

class Input extends React.Component {
    onChange = (event) => {
        this.props.onChange(this.props.attribute, event.target.value);
    }
    render() {
        let { label, validate } = this.props.modelInfor;
        let requireEle = validate && validate.require ? <b className="require-star">*</b> : '';
        let errorEle = null !== this.props.value.errorCode ?
            <ErrorMessage errorCode={this.props.value.errorCode} label={label} /> :
            '';
        switch (this.props.type) {
            case 1:
                return (
                    <div className="input-group mb-3">
                        <label>{label}</label>
                        {requireEle}
                        <input
                            type="text"
                            className="form-control"
                            placeholder={`Input ${label}`}
                            aria-describedby="button-addon2"
                            value = {this.props.value.value}
                            onChange={this.onChange}
                        />
                        {errorEle}
                    </div>
                );
            default:
                return '';
        }
    }
}

export default Input;