import React from 'react';

class Paging extends React.Component {

    render() {
        let { page, pageNum } = this.props;
        console.log(page);
        if (1 < pageNum) {
            let pageItem = [];
            for (let i = 0; i < pageNum; i++) {
                if (i === page) {
                    pageItem.push(
                        <div key={i} className="page-item focus"
                            onClick={() => { this.props.onChangePage(i) }}>{i + 1}</div>
                    );
                } else {
                    pageItem.push(
                        <div key={i} className="page-item"
                            onClick={() => { this.props.onChangePage(i) }}>{i + 1}</div>
                    );
                }
            }
            return (
                <div className="paging d-flex flex-end">
                    {pageItem}
                </div>
            );
        }
        return '';
    }
}

export default Paging;