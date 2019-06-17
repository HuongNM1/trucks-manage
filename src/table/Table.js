import React from 'react';
import axios from 'axios';
import * as Data from '../services/data';
import './Table.scss';
import Header from './header/header';
import Body from './body/body';

/**
 * Table component
 */
class Table extends React.Component {
    constructor() {
        super();
        this.state = {
            header: [],
            dataList: []
        }
    }

    // async getData() {
    //     let self = this;
    //     const result = await axios.get('http://localhost:3008/');
    //     if (result && result.data) {
    //         self.setState({
    //             header: result.data['header'],
    //             dataList: result.data['dataList']
    //         });
    //         console.log(result);
    //     }
    // }

    getData() {
        let result = Data.getData();
        this.setState({
            header: result.data['header'],
            dataList: result.data['dataList']
        });
    }

    componentWillMount() {
        this.getData()
    }

    render() {
        return (
            <div>
                <table className='table-list' cellPadding='0' cellSpacing='0'>
                    <Header value={this.state.header} />
                    <Body value={this.state.dataList} />
                </table>
            </div>
        );
    }
}

export default Table;