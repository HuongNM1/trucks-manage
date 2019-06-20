import React from 'react';

class Paging extends React.Component {

    render() {
        let { page, pageNum } = this.props;
        let pageItem = [];
        for (let i = 1; i <= pageNum; i++) {
            if (i === page) {
                pageItem.push(
                    <div key={i} className="page-item focus"
                        onClick={() => { this.props.onChangePage(i) }}>{i}</div>
                );
            } else {
                pageItem.push(
                    <div key={i} className="page-item"
                        onClick={() => { this.props.onChangePage(i) }}>{i}</div>
                );
            }
        }
        return (
            <div className="paging d-flex flex-end">
                {pageItem}
            </div>
        );
    }
}

export default Paging;