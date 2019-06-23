import React from 'react';
class SelectInput extends React.Component {
    createOptions = ()=>{
        let options = [];
        this.props.mapping.forEach((value, index)=>{
            options.push(<option className="select-option" key={index} value={value.value}>{value.text}</option>);
        });
        return options;
    }
    
    render() {
        return (
            <select name="carlist" className="carlist form-control" onChange={this.props.onChange} value={this.props.value}>
                {this.createOptions()}
            </select>
        );
    }
}

export default SelectInput;