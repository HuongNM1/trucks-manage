import React from 'react';
import PrehandleTable from './components/prehandletable/PrehandleTable';
import Table from './components/table/Table';
import Load from './components/Load';
import InputForm from './components/form/InputForm';
import TruckModel from './services/truckModel';
import {connect} from 'react-redux';
import Fn from './common/functions';
import { GET_TRUCK_DATA } from './services/apiconfig';
import * as actions from './redux/actions';

class App extends React.Component {
  // constructor(props) {
  //   super(props);

    // this.props = {
    //   header: [],
    //   dataList: [],
    //   sortBy: 0,
    //   sortType: 0,
    //   load: true,
    //   dataFilterList: [],
    //   dataListPage: [],
    //   openInputForm: false,
    //   typeInputForm: 0,
    //   dataModel: {},
    //   formType: 0,
    //   pageIdx: 0,
    //   maxDisplayPages: 5,
    //   numberItemOnePage: 10,
    //   searchBy: '',
    //   searchString: ''
    // }

    // Object.keys(TruckModel).forEach((key, idx) => {
    //   this.props.dataModel[key] = { value: '', errorCode: null };
    // });
  // }

  // async getData() {
  //   let self = this;
  //   self.setState({ load: true });
  //   const result = await axios.get('http://localhost:3008/');
  //   const dataList = sessionStorage.getItem('dataList');
  //   let data = null;
  //   if (dataList) {
  //     try {
  //       data = JSON.parse(dataList);
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   }
  //   if (result && result.data) {
  //     if (data) {
  //       result.data['dataList'] = [...data];
  //     }
  //     self.setState({
  //       header: result.data['header'],
  //       dataList: result.data['dataList'],
  //       mapping: result.data['mapping'],
  //       pageIdx: 0,
  //       attributesInum: result.data['attributesInum'],
  //       load: false,
  //       dataFilterList: result.data['dataList'],
  //       dataListPage: result.data['dataList'].slice(this.props.pageIdx, this.props.pageIdx + this.props.numberItemOnePage)
  //     });
  //   }
  // }
  componentDidMount() {
    this.props.onLoad();
  }
  // proccessDataShow() {
  //   let { dataList, dataFilterList, header } = this.props;
  //   // handle search
  //   dataFilterList = dataList.filter((value, index) => {
  //     if ('' === this.props.searchBy) {
  //       for (let i = 0; i < header.length; i++) {
  //         if (header[i].searchAble &&
  //           value[header[i].key].toString().toLowerCase().indexOf(this.props.searchString.toString().toLowerCase()) !== -1) {
  //           return true;
  //         }
  //       }
  //       return false;
  //     } else {
  //       return value[this.props.searchBy].toLowerCase().indexOf(this.props.searchString.toLowerCase()) !== -1;
  //     }
  //   });

  //   // handle sort
  //   dataFilterList.sort((d1, d2) => {
  //     let { sortBy } = this.props;
  //     if (0 === this.props.sortType) {// sort a->z, min->max
  //       if (d1[sortBy] > d2[sortBy]) {
  //         return 1;
  //       } else if (d1[sortBy] < d2[sortBy]) {
  //         return -1;
  //       } else {
  //         return 0;
  //       }
  //     } else if (1 === this.props.sortType) {// sort z->a, max->min
  //       if (d1[sortBy] > d2[sortBy]) {
  //         return -1;
  //       } else if (d1[sortBy] < d2[sortBy]) {
  //         return 1;
  //       } else {
  //         return 0;
  //       }
  //     }
  //   });

  //   this.setState(
  //     {
  //       pageIdx: 0,
  //       dataFilterList: dataFilterList,
  //       dataListPage: dataFilterList.slice(this.props.pageIdx, this.props.pageIdx + this.props.numberItemOnePage)
  //     }
  //   );
  // }

  searchBy = (searchBy, searchString) => {
    this.setState(
      {
        searchBy: searchBy,
        searchString: searchString
      }, () => {
        this.proccessDataShow();
      }
    );
  }

  addTruck = () => {
    this.setState({
      openInputForm: true,
      formType: 0
    })
  }

  // onOpenEditForm = (truckId) => {
  //   let dataModel = {};
  //   for (let i = 0; i < this.props.dataList.length; i++) {
  //     if (truckId === this.props.dataList[i]['id']) {
  //       Object.keys(this.props.dataList[i]).forEach((key, idx) => {
  //         dataModel[key] = { value: this.props.dataList[i][key], errorCode: null }
  //       });
  //       this.setState({
  //         openInputForm: true,
  //         formType: 1,
  //         dataModel: dataModel
  //       });
  //       return true;
  //     }
  //   }
  // }

  getTextValue = (attribute, value) => {
    let { mapping } = this.props;
    let mappingValues = mapping[attribute];
    if (mappingValues && Array.isArray(mappingValues) && 0 < mappingValues.length) {
      for (let i = 0; i < mappingValues.length; i++) {
        if (mappingValues[i]['value'] === value) {
          return mappingValues[i]['text'];
        }
      }
    }
  }

  getDataModelValue = (dataModel) => {
    let dataValue = {};
    Object.keys(dataModel).forEach((key, idx) => {
      if ('function' === typeof TruckModel[key].showValue) {
        let keyForValue = key.split('-show')[0];
        dataValue[key] = TruckModel[key].showValue(dataModel, key, dataModel[keyForValue].value, this.props.mapping[keyForValue]);
      } else {
        dataValue[key] = dataModel[key].value;
      }
    });
    return dataValue;
  }

  onSubmitForm = (dataModel) => {
    let { dataList } = this.props;
    if (0 === this.props.formType) {
      dataModel['id'].value = dataList[dataList.length - 1]['id'] + 1;
      dataList.push(this.getDataModelValue(dataModel));
    } else if (1 === this.props.formType) {
      let dataValue = this.getDataModelValue(dataModel);
      for (let i = 0; i < dataList.length; i++) {
        if (dataList[i].id == dataValue['id']) {
          dataList[i] = { ...dataValue };
          break;
        }
      }
    }
    this.setState({
      dataList: dataList
    }, () => { this.proccessDataShow(); })
    sessionStorage.setItem('dataList', JSON.stringify(dataList));
  }

  // onDelete = (truckId) => {
  //   let cf = window.confirm('Do you really want to delete this truck information?');
  //   if (true === cf) {
  //     let { dataList } = this.props;
  //     for (let i = 0; i < dataList.length; i++) {
  //       if (dataList[i]['id'] === truckId) {
  //         dataList.splice(i, 1);
  //         this.setState({
  //           dataList: dataList
  //         }, () => {
  //           this.proccessDataShow();
  //         });
  //         sessionStorage.setItem('dataList', JSON.stringify(dataList));
  //         return true;
  //       }
  //     }
  //   }
  // }

  onCloseFrom = () => {
    this.setState({
      openInputForm: false
    })
  }

  // onChangePage = (pageIdx) => {
  //   this.setState({
  //     pageIdx: pageIdx,
  //     dataListPage: this.props.dataFilterList.slice((pageIdx * this.props.numberItemOnePage), (pageIdx * this.props.numberItemOnePage + this.props.numberItemOnePage))
  //   })
  // }

  // onSort = (sortBy, sortType) => {
  //   this.setState({
  //     sortBy: sortBy,
  //     sortType: sortType
  //   }, () => {
  //     this.proccessDataShow();
  //   })
  // }

  render() {
    let content = null;
    if (this.props.load) {
      content =
        <div className="cover">
          <h1 className="page-title">Truck Managment</h1>
          <Load />
        </div>;
    } else {
      let inputForm = this.props.openInputForm ?
        <div className="row">
          <InputForm
            onSubmit={this.onSubmitForm}
            onClose={this.onCloseFrom}
            formType={this.props.formType}
            value={this.props.dataModel}
            mapping={this.props.mapping}
          />
        </div> : '';
      content =
        <div className="cover">
          <div className="page-title">
            <h1 className="text">Truck Managment</h1>
          </div>
          <div>
            {inputForm}
          </div>
          <PrehandleTable search={this.searchBy} value={this.props.header} addTruck={this.addTruck} />
          <div className="number-of-item">
            <span className="number-title">There are </span>
            <span className="number-value">{this.props.dataFilterList.length}</span>
            <span className="number-title"> item(s) in list</span>
          </div>
          <Table
            // header={this.props.header}
            // sort={{ sortBy: this.props.sortBy, sortType: this.props.sortType }}
            // onSort={this.onSort}
            // dataList={this.props.dataListPage}
            // dataFilterList={this.props.dataFilterList}
            // mapping={this.props.mapping}
            // pageIdx={this.props.pageIdx}
            // numberItemOnePage={this.props.numberItemOnePage}
            // maxDisplayPages={this.props.maxDisplayPages}
            // onOpenEditForm={this.onOpenEditForm}
            // onDelete={this.onDelete}
            // onChangePage={this.onChangePage}
          />
        </div>;
    }
    return content;
  }
}

const mapStateToProps = state =>({
  ...state.common, ...state.model
});

const mapDispatchToProps = dispatch =>{
  return {
    onLoad: ()=>{
      console.log('onload called')
      dispatch(actions.asynAction(GET_TRUCK_DATA));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
