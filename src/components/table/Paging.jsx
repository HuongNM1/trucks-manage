import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStepBackward, faStepForward, faBackward, faForward } from '@fortawesome/free-solid-svg-icons';

class Paging extends React.Component {
    constructor(props) {
        super(props);
        this.state = { ...props };
    }

    onChangePage = (page) => {
        this.props.onChangePage(page);
        this.setState({
            page: page
        });
    }

    backPage = (page) => {
        if (0 < page) {
            this.setState({
                page: page - 1
            });
            this.props.onChangePage(page - 1);
        }
    }

    nextPage = (page) => {
        if (page < this.state.pageNum - 1) {
            this.setState({
                page: page + 1
            });
            this.props.onChangePage(page + 1);
        }
    }
    goLimitPage = (type) => {
        let page = 0;
        if (1 === type) {
            page = this.state.pageNum - 1;
        }
        this.setState({
            page: page
        });
        this.props.onChangePage(page);
    }
    render() {
        let { page, pageNum, maxDisplayPages } = this.state;
        if (1 < pageNum) {
            let pageItem = [];
            for (let i = 0; i < maxDisplayPages; i++) {
                if (i === page) {
                    pageItem.push(
                        <div key={i} className="page-item focus"
                            onClick={() => { this.onChangePage(i) }}>{i + 1}</div>
                    );
                } else {
                    pageItem.push(
                        <div key={i} className="page-item"
                            onClick={() => { this.onChangePage(i) }}>{i + 1}</div>
                    );
                }
            }
            let pageEle = <div className="paging d-flex flex-end">
                {pageItem}
            </div>;
            if (maxDisplayPages < this.props.pageNum) {
                pageEle = <div className="paging d-flex flex-end">
                    <div className="page-item first-page" onClick={() => { this.goLimitPage(0) }}><FontAwesomeIcon icon={faStepBackward} /></div>
                    <div className="page-item prev-page" onClick={() => { this.backPage(page) }}><FontAwesomeIcon icon={faBackward} /></div>
                    {pageItem}
                    <div className="page-item next-page" onClick={() => { this.nextPage(page) }}><FontAwesomeIcon icon={faForward} /></div>
                    <div className="page-item last-page" onClick={() => { this.goLimitPage(1) }}><FontAwesomeIcon icon={faStepForward} /></div>
                </div>;
            }
            return (
                <div>{pageEle}</div>
            );
        }
        return '';
    }
}

export default Paging;