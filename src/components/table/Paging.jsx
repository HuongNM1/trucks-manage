import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStepBackward, faStepForward, faBackward, faForward } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import { onChangePageAction } from '../../redux/actions';

class Paging extends React.Component {
    constructor(props) {
        super(props);
        this.state = { ...props };
        this.state['startIdx'] = 0;
    }

    getPageNumber = (numberOfItem) => {
        let result = numberOfItem / this.props.numberItemOnePage;
        try {
            let parts = result.toString().split('.');
            if (1 === parts.length) {
                return parseInt(parts[0]);
            } else if (2 === parts.length) {
                if (0 < parseInt(parts[1])) {
                    return parseInt(parts[0]) + 1;
                } else {
                    return parseInt(parts[0]);
                }
            } else {
                return 0;
            }
        } catch (e) {
            console.log('pagging error: ', e);
            return 1;
        }
    }

    onChangePage = (page) => {
        // Check page
        let { startIdx, maxDisplayPages } = this.state;
        let pageNum = this.getPageNumber(this.props.listItems.length);
        let range = [startIdx, startIdx + maxDisplayPages - 1];
        if (page < range[0]) {// case page less than start index page
            range[0] = page - maxDisplayPages + 1;
            range[1] = page;
            if (range[0] < 0) {
                range[0] = 0;
                range[1] = maxDisplayPages - 1;
            }
            this.setState({
                page: page,
                startIdx: range[0]
            });
        } else if (page > range[1]) {// case page more than end index page
            range[0] = page;
            range[1] = page + maxDisplayPages - 1;
            if (range[1] > pageNum) {
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
        let pageNum = this.getPageNumber(this.props.listItems.length);
        if (page < pageNum - 1) {
            this.onChangePage(page + 1);
        }
    }
    goLimitPage = (type) => {
        let page = 0;
        let pageNum = this.getPageNumber(this.props.listItems.length);
        if (1 === type) {
            page = pageNum - 1;
        }
        this.onChangePage(page);
    }

    render() {
        let { page, maxDisplayPages, startIdx } = this.state;
        let pageNum = this.getPageNumber(this.props.listItems.length);
        if (1 < pageNum) {
            let pageItem = [];
            let num = startIdx + maxDisplayPages;
            if (num > pageNum) {
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
            if (maxDisplayPages < pageNum) {
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
const mapStateToProps = state => {
    return ({
    page: state.model.pageIdx,
    numberItemOnePage: state.model.numberItemOnePage,
    listItems: state.model.dataFilterList,
    maxDisplayPages: state.model.maxDisplayPages
})};

const mapDispatchToProps = dispatch => {
    return {
        onChangePage: (page) => { dispatch(onChangePageAction(page)) }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Paging);