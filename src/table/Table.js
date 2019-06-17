import React from 'react';
import axios from 'axios';
import './Table.scss';

class Td extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: props.value };
    }
    handleValue() {
        if ('string' === typeof (this.state.value)) {
            return this.state.value;
        } else if ('object' === typeof (this.state.value)) {
            if (this.state.value.text) {
                return this.state.value.text;
            } else {
                Object.keys(this.state.value).forEach((key) => {
                    return this.state.value[key];
                });
            }

        }
    }
    render() {
        return (
            <td key={this.handleValue()}>{this.handleValue()}</td>
        );
    }
}

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: props.value };
    }
    renderHeader() {
        let headerItems = [];

        for (let i = 0; i < this.state.value.length; i++) {
            headerItems.push(<Td key={`${this.state.value[i].key}-${i}`} value={this.state.value[i]} />);
        }
        return headerItems;
    }
    render() {
        return (
            <thead>
                <tr>
                    {this.renderHeader()}
                </tr>
            </thead>
        );
    }
}

class Body extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: props.value };
    }
    renderBody() {
        let bodyItems = [];
        let row = {};
        let cells = [];

        for (let i = 0; i < this.state.value.length; i++) {
            row = this.state.value[i];
            cells = Array();
            Object.keys(row).forEach((key) => {
                if ('id' !== key) {
                    cells.push(<Td key={`${key}`} value={row[key]} />);
                }
            });
            bodyItems.push(<tr key={`${this.state.value[i].id}-${i}`}>{cells}</tr>);
        }
        return bodyItems;
    }
    render() {
        return (
            <tbody>
                {this.renderBody()}
            </tbody>
        );
    }
}

class Table extends React.Component {
    constructor() {
        super();
        this.state = {
            header: [],
            dataList: []
        }
    }
    componentDidMount() {
        axios.get('http://localhost:3008/')
            .then(
                (res) => {
                    console.log('123');
                    if (res && res.data) {
                        this.setState({
                            header: res.data['header'],
                            dataList: res.data['dataList']
                        })
                    }
                }
            )
    }
    
    render() {
        
        console.log('456');
        return (
            <table className='table-list' cellPadding='0' cellSpacing='0'>
                <Header value={this.state.header} />
                <Body value={this.state.dataList} />
            </table>
        );
    }
}

export default Table;