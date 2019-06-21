import React from 'react';
import ErrorMessage from './ErrorMessage';
import './Input.scss';

class Input extends React.Component {
    onChange = (event) => {
        this.props.onChange(this.props.attribute, event.target.value);
    }
    render() {
        console.log(this.props.mapping);
        let { label, validate } = this.props.modelInfor;
        let requireEle = validate && validate.require ? <b className="require-star">*</b> : '';
        let errorEle = null !== this.props.value.errorCode ?
            <ErrorMessage errorCode={this.props.value.errorCode} label={label} validate={validate} /> :
            '';
        let inputElem = '';
        switch (this.props.type) {
            case 1:
                inputElem = <input
                    type="text"
                    className="form-control"
                    placeholder={`Input ${label}`}
                    aria-describedby="button-addon2"
                    value={this.props.value.value}
                    onChange={this.onChange}
                />;
                break;
            case 2:

                let counter = this.props.modelInfor.showCounter ? <div className="show-counter-chars float-right">
                    <span>{`${this.props.value.value.length}/${this.props.modelInfor.validate.maxLength}`}</span>
                </div> : '';
                inputElem =
                    <div>
                        <textarea
                            className="form-control"
                            id="exampleFormControlTextarea1"
                            rows="3"
                            placeholder={`Input ${label}`}
                            value={this.props.value.value}
                            onChange={this.onChange}>
                        </textarea>
                        {counter}
                    </div>;
                break;
            case 3:
                let optionList = [];
                if (this.props.mapping && Array.isArray(this.props.mapping) && 0 < this.props.mapping.length) {
                    for (let i = 0; i < this.props.mapping.length; i++) {
                        if (this.props.mapping[i].attribute === this.props.attribute) {
                            for (let j = 0; j < this.props.mapping[i].mappingValues.length; j++) {
                                optionList.push(
                                    <option value={this.props.mapping[i].mappingValues[j].value}>
                                        {this.props.mapping[i].mappingValues[j].text}
                                    </option>
                                );
                            }
                        }
                    }
                }
                inputElem =
                    <select name="carlist"
                        value={this.props.value.value}
                        onChange={this.onChange}>
                        {optionList}
                    </select>;
                break;
            case 4:
                //list checkbox
                break;
            default:
                inputElem = '';
                break;
        }
        return (
            <div className="input-group mb-3 d-flex">
                <div className="input-label">
                    <label className="mr-2">{label}</label>
                    {requireEle}
                </div>
                <div className="input-content">
                    {inputElem}
                    {errorEle}
                </div>
            </div>
        );
    }
}

export default Input;