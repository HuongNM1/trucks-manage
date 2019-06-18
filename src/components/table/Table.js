import React from 'react';
import './Table.scss';
import Header from './header/header';
import Body from './body/body';

/**
 * Table component
 */
class Table extends React.Component {
    render() {
        return (
            <div>
                <table className='table' cellPadding='0' cellSpacing='0'>
                    <Header value={this.props.header || []} />
                    <Body value={this.props.dataList || []} />
                </table>
            </div>
        );
    }
}

export default Table;