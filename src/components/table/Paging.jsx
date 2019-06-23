import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStepBackward, faStepForward, faBackward, faForward } from '@fortawesome/free-solid-svg-icons';

class Paging extends React.Component {
    constructor(props) {
        super(props);
        this.state = { ...props };
        this.state['startIdx'] = 0;
    }

    onChangePage = (page) => {
        // Check page
        let { startIdx, maxDisplayPages, pageNum } = this.state;
        let range = [startIdx, startIdx + maxDisplayPages-1];
        if (page < range[0]) {// case page less than start index page
            range[0] = page - maxDisplayPages+1;
            range[1] = page;
            if(range[0] < 0){
                range[0] = 0;
                range[1] = maxDisplayPages-1;
            }
            this.setState({
                page: page,
                startIdx: range[0]
            });
        } else if (page > range[1]) {// case page more than end index page
            range[0] = page;
            range[1] = page + maxDisplayPages-1;
            if(range[1]>pageNum){
                range[1] = pageNum;
                range[0] = range[1] - maxDisplayPages;
            }
            this.setState({
                page: page,
                startIdx: range[0]
            });
        } else {// normal case, page in range
            this.setState({
                page: page
            });
        }
        
        this.props.onChangePage(page);
        
    }

    backPage = (page) => {
        if (0 < page) {
            this.onChangePage(page - 1);
        }
    }

    nextPage = (page) => {
        if (page < this.state.pageNum - 1) {
            this.onChangePage(page + 1);
        }
    }
    goLimitPage = (type) => {
        let page = 0;
        if (1 === type) {
            page = this.state.pageNum - 1;
        }
        this.onChangePage(page);
    }

    render() {
        let { page, pageNum, maxDisplayPages, startIdx } = this.state;
        if (1 < pageNum) {
            let pageItem = [];
            let num = startIdx + maxDisplayPages;
            if (num > this.state.pageNum) {
                num = pageNum;
            }
            for (let i = startIdx; i < num; i++) {
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