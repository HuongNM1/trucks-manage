import React from 'react';
import './Table.scss';
import Header from './header';
import Body from './body';
import Paging from './Paging';

/**
 * Table component
 */
class Table extends React.Component {
    onSort = (sortBy, sortType) => {
        this.props.onSort(sortBy, sortType);
    }
    render() {
        return (
            <div className="table-list-cover">
                <div className="table-list-panel">
                    <table className='table-list' cellPadding='0' cellSpacing='0'>
                        <Header value={this.props.header || []} sort={this.props.sort} onSort={this.onSort} />
                        <Body
                            value={this.props.dataList || []}
                            header={this.props.header}
                            onOpenEditForm={this.props.onOpenEditForm}
                            onDelete={this.props.onDelete}
                            mapping={this.props.mapping}
                        />
                    </table>
                </div>
                <Paging
                    page={this.props.pageIdx}
                    numberItemOnePage={this.props.numberItemOnePage}
                    listItems={this.props.dataFilterList}
                    maxDisplayPages={this.props.maxDisplayPages}
                    onChangePage={this.props.onChangePage} />
            </div>
        );
    }
}

export default Table;