import React from 'react';
import './Table.scss';
import Header from './header';
import Body from './body';

/**
 * Table component
 */
class Table extends React.Component {
    render() {
        return (
            <div>
                <table className='table' cellPadding='0' cellSpacing='0'>
                    <Header value={this.props.header || []} />
                    <Body
                        value={this.props.dataList || []}
                        onOpenEditForm={this.props.onOpenEditForm}
                        onDelete={this.props.onDelete}
                    />
                </table>
            </div>
        );
    }
}

export default Table;