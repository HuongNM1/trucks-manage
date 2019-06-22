import React from 'react';

class Checkbox extends React.Component {
    onChange = (event)=>{
        this.props.onChange(event.target.value, event.target.checked);
    }
    render() {
        return (
            <div className="checkbox">
                <input
                    type="checkbox"
                    value={this.props.value}
                    onChange={this.onChange}
                    checked = {this.props.checked}
                />{this.props.label}
            </div>
        );
    }
}

export default Checkbox;