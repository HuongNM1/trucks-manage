import React from 'react';
import './Table.scss';
import Header from './Header';
import Body from './Body';
import Paging from './Paging';

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
                <Paging page={this.props.pageIdx} pageNum={this.props.pageNumber}
                    onChangePage={this.props.onChangePage} />
            </div>
        );
    }
}

export default Table;