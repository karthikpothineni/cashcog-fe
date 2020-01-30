import React from 'react';
import ChildComponent from './ChildComponent';

export default class App extends React.Component {

filterOrder = "";
sortFilter = "";

  constructor(props) {
    super(props);
    this.state = {
      expenses: [],
      sortTitle: "Sort",
      orderTitle: "Order"
    };
    this.handleStatus = this.handleStatus.bind(this);
    this.handleSort = this.handleSort.bind(this);
    this.handleOrder = this.handleOrder.bind(this);
  }

  render() {
    return (<div>
      <ChildComponent expenses={this.state.expenses} sortTitle={this.state.sortTitle} orderTitle={this.state.orderTitle} handleStatus={this.handleStatus} handleSort={this.handleSort} handleOrder={this.handleOrder}/>
    </div>
    )
  }

  handleStatus(uuid, status, index) {
    let requestBody = {
      "is_approved": status
    }
    fetch('http://127.0.0.1:8000/v1/expense/' + uuid + "/", {
      method: 'PUT',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      body: JSON.stringify(requestBody)
    }).then(res => res.json())
      .then((data) => {
        let updatedExpenses = this.state.expenses;
        updatedExpenses[index] = data;
        this.setState({ expenses: updatedExpenses });
      })
      .catch((error) => {
        console.log('Error in updating expense:', error);
      })
  }

  handleSort(sortFilter, sortTitle) {
    this.sortFilter = sortFilter;
    this.setState({ sortTitle: sortTitle });
    if(this.filterOrder==="") {
      return;
    } else {
      fetch('http://127.0.0.1:8000/v1/sort/?filter=' + this.sortFilter + "&order="+this.filterOrder)
      .then(res => res.json())
        .then((data) => {
          this.setState({ expenses: data});
        })
        .catch((error) => {
          console.log('Error in sorting expenses:', error);
        })
    }
  }

  handleOrder(order, orderTitle) {
    this.filterOrder = order;
    this.setState({ orderTitle: orderTitle });
    if(this.sortFilter==="") {
      return;
    } else {
      fetch('http://127.0.0.1:8000/v1/sort/?filter=' + this.sortFilter + "&order="+this.filterOrder)
      .then(res => res.json())
        .then((data) => {
          this.setState({ expenses: data});
        })
        .catch((error) => {
          console.log('Error in sorting expenses:', error);
        })
    }
  }

  componentDidMount() {
    fetch('http://127.0.0.1:8000/v1/expense/')
      .then(res => res.json())
      .then((data) => {
        this.setState({ expenses: data });
      })
      .catch(e => console.log(e));
  }
}
