import React from 'react';

class TextareaInput extends React.Component {
    render() {
        let counter = this.props.modelInfor.showCounter ? <div className="show-counter-chars float-right">
            <span>{`${this.props.value.length}/${this.props.modelInfor.validate.maxLength}`}</span>
        </div> : '';
        return (
            <div>
                <textarea
                    className="form-control"
                    id="exampleFormControlTextarea1"
                    rows="3"
                    placeholder={`Input ${this.props.modelInfor.label}`}
                    value={this.props.value}
                    onChange={this.props.onChange}>
                </textarea>
                {counter}
            </div>
        );
    }
}

export default TextareaInput;