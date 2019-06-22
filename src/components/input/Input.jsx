import React from 'react';
import ErrorMessage from './ErrorMessage';
import TextareaInput from './TextareaInput';
import TextInput from './TextInput';
import SelectInput from './SelectInput';
import './Input.scss';

class Input extends React.Component {
    onChange = (event) => {
        this.props.onChange(this.props.attribute, event.target.value);
    }
    getInputElem = () => {
        let { label } = this.props.modelInfor;
        switch (this.props.type) {
            case 1:
                return <TextInput label={label} value={this.props.value.value} onChange={this.onChange} />;
            case 2:
                return <TextareaInput value={this.props.value.value} onChange={this.onChange} modelInfor={this.props.modelInfor} />;
            case 3:
                return <SelectInput mapping={this.props.mapping[this.props.attribute]} onChange={this.onChange} value={this.props.value.value} />;
            case 4:
                //list checkbox
                break;
            default:
                return '';
        }
    }

    markRequireEle = () => {
        let { validate } = this.props.modelInfor;
        return validate && validate.require ? <b className="require-star">*</b> : ''
    }

    getErrorMsg = () => {
        let { label, validate } = this.props.modelInfor;
        return null !== this.props.value.errorCode ?
            <ErrorMessage errorCode={this.props.value.errorCode} label={label} validate={validate} /> :
            '';
    }

    getLabel = () => {
        let { label } = this.props.modelInfor;
        if ('function' === typeof label) {
            label = label.apply();
        }
        return label;
    }

    render() {
        return (
            <div className="input-group mb-3 d-flex">
                <div className="input-label">
                    <label className="mr-2">{this.getLabel()}</label>
                    {this.markRequireEle()}
                </div>
                <div className="input-content">
                    {this.getInputElem()}
                    {this.getErrorMsg()}
                </div>
            </div>
        );
    }
}

export default Input;