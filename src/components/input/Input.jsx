import React from 'react';
import ErrorMessage from './ErrorMessage';

class Input extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: '',
            errorCode: null
        }
    }
    onChange = (event) => {
        this.props.onChange(this.props.attribute, event.target.value);
    }
    render() {
        let { label, validate } = this.props.modelInfor;
        let requireEle = validate && validate.require ? <b className="require-star">*</b> : '';
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
                            onChange={this.onChange}
                        />
                        <ErrorMessage errorCode={this.state.errorCode} label={label}/>
                    </div>
                );
            default:
                return '';
        }
    }
}

export default Input;