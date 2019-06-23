import React from 'react';

class Checkbox extends React.Component {
    constructor(props) {
        super(props);
        this.state = { ...props };
    }
    onChange = (event) => {
        this.setState({
            checked: event.target.checked
        });
        let value = null;
        try {
            value = parseInt(event.target.value)
        } catch (e) {
            console.log('parse int error: ', e);
        }
        this.state.onChange(value, event.target.checked);
    }
    onTriggerClick = ()=>{
        this.inputElement.click();
    }
    render() {
        return (
            <div className="checkbox" onClick={this.onTriggerClick}>
                <input
                    type="checkbox"
                    value={this.state.value}
                    onChange={this.onChange}
                    checked={this.state.checked}
                    ref={input => this.inputElement = input}
                /><span onClick={this.onTriggerClick}>{this.state.label}</span>
            </div>
        );
    }
}

export default Checkbox;