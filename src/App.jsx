import React from 'react';
import axios from 'axios';
import PrehandleTable from './components/prehandletable/PrehandleTable';
import Table from './components/table/Table';
import Load from './components/Load';
import InputForm from './components/form/InputForm';
import TruckModel from './services/truckModel';


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      header: [],
      dataList: [],
      sortBy: 0,
      sortType: 0,
      load: true,
      dataFilterList: [],
      dataListPage: [],
      openInputForm: false,
      typeInputForm: 0,
      dataModel: {},
      formType: 0,
      pageIdx: 0,
      pageNumber: 1,
      numberItemOnePage: 5,
      searchBy: '',
      searchString: ''
    }

    Object.keys(TruckModel).forEach((key, idx) => {
      this.state.dataModel[key] = { value: '', errorCode: null };
    });
  }


  async getData() {
    let self = this;
    self.setState({ load: true });
    const result = await axios.get('http://localhost:3008/');
    const dataList = sessionStorage.getItem('dataList');
    let data = null;
    if (dataList) {
      try {
        data = JSON.parse(dataList)
      } catch (e) {
        console.log(e);
      }
    }
    if (result && result.data) {
      if (data) {
        result.data['dataList'] = [...data];
      }
      self.setState({
        header: result.data['header'],
        dataList: result.data['dataList'],
        mapping: result.data['mapping'],
        pageNumber: result.data['dataList'].length / this.state.numberItemOnePage,
        pageIdx: 0,
        attributesInum: result.data['attributesInum'],
        load: false,
        dataFilterList: result.data['dataList'],
        dataListPage: result.data['dataList'].slice(this.state.pageIdx, this.state.pageIdx + this.state.numberItemOnePage)
      });
    }
  }

  componentDidMount() {
    this.getData()
  }
  proccessDataShow() {
    let { dataList, dataFilterList, header } = this.state;
    dataFilterList = dataList.filter((value, index) => {
      if ('' === this.state.searchBy) {
        for (let i = 0; i < header.length; i++) {
          if ('string' === typeof value[header[i].key] &&
            value[header[i].key].toLowerCase().indexOf(this.state.searchString.toLowerCase()) !== -1) {
            return true;
          }
        }
        return false;
      } else {
        return value[this.state.searchBy].toLowerCase().indexOf(this.state.searchString.toLowerCase()) !== -1;
      }
    });
    this.setState(
      {
        dataFilterList: dataFilterList,
        pageNumber: dataFilterList.length / this.state.numberItemOnePage,
        dataListPage: dataFilterList.slice(this.state.pageIdx, this.state.pageIdx + this.state.numberItemOnePage)
      }
    );
  }

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

  // resetDataModel = () => {
  //   let dataModel = {};
  //   Object.keys(TruckModel).forEach((key, idx) => {
  //     dataModel[key] = { value: TruckModel[key].value, errorCode: null };
  //   });
  //   return dataModel;
  // }

  addTruck = () => {
    this.setState({
      // dataModel: this.resetDataModel(),
      openInputForm: true,
      formType: 0
    })
  }

  // convertItemToModel(dataItem) {
  //   let dataItemModel = {};
  //   Object.keys(dataItem).forEach((key, idx)=>{
  //       dataItemModel[key] = { value: dataItem[key], errorCode: null }
  //   });
  //   return dataItemModel;
  // }

  onOpenEditForm = (truckId) => {
    let dataModel = {};
    for (let i = 0; i < this.state.dataList.length; i++) {
      if (truckId === this.state.dataList[i]['id']) {
        Object.keys(this.state.dataList[i]).forEach((key, idx) => {
          dataModel[key] = { value: this.state.dataList[i][key], errorCode: null }
        });
        this.setState({
          openInputForm: true,
          formType: 1,
          dataModel: dataModel
        });
        return true;
      }
    }
  }

  getTextValue = (attribute, value) => {
    let { mapping } = this.state;
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
        dataValue[key] = TruckModel[key].showValue(dataModel, key, dataModel[keyForValue].value, this.state.mapping[keyForValue]);
      } else {
        dataValue[key] = dataModel[key].value;
      }
    });
    return dataValue;
  }

  onSubmitForm = (dataModel) => {
    let { dataList } = this.state;
    if (0 === this.state.formType) {
      dataModel['id'] = dataList[dataList.length - 1]['id'] + 1;
      dataList.push(this.getDataModelValue(dataModel));
    } else if (1 === this.state.formType) {
      let dataValue = this.getDataModelValue(dataModel);
      for (let i = 0; i < dataList.length; i++) {
        if (dataList[i].id === dataValue['id']) {
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

  onDelete = (truckId) => {
    let cf = window.confirm('Do you really want to delete this truck information?');
    if (true === cf) {
      let { dataList } = this.state;
      for (let i = 0; i < dataList.length; i++) {
        if (dataList[i]['id'] === truckId) {
          dataList.splice(i, 1);
          this.setState({
            dataList: dataList
          }, () => {
            this.proccessDataShow();
          });
          sessionStorage.setItem('dataList', JSON.stringify(dataList));
          return true;
        }
      }
    }
  }

  onCloseFrom = () => {
    this.setState({
      openInputForm: false
    })
  }

  pagingHandleList(page) {

  }

  onChangePage = (pageIdx) => {
    this.setState({
      pageIdx: pageIdx,
      dataListPage: this.state.dataFilterList.slice(pageIdx, pageIdx + this.state.numberItemOnePage)
    })
  }

  render() {
    let content = null;
    if (this.state.load) {
      content =
        <div className="container cover">
          <h1 className="page-title">Truck Managment</h1>
          <Load />
        </div>;
    } else {
      let inputForm = this.state.openInputForm ?
        <div className="row">
          <InputForm
            onSubmit={this.onSubmitForm}
            onClose={this.onCloseFrom}
            formType={this.state.formType}
            value={this.state.dataModel}
            mapping={this.state.mapping}
          />
        </div> : '';
      content =
        <div className="container cover">
          <h1 className="page-title">Truck Managment</h1>
          {inputForm}
          <div className="row">
            <PrehandleTable search={this.searchBy} value={this.state.header} addTruck={this.addTruck} />
            <Table
              header={this.state.header}
              dataList={this.state.dataListPage}
              mapping={this.state.mapping}
              pageIdx={this.state.pageIdx}
              pageNumber={this.state.pageNumber}
              onOpenEditForm={this.onOpenEditForm}
              onDelete={this.onDelete}
              onChangePage={this.onChangePage}
            />
          </div>
        </div>;
    }
    return content;
  }
}

export default App;
