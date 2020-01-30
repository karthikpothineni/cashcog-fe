import React from 'react';
import {DropdownButton, Dropdown, ButtonGroup} from 'react-bootstrap'
const columnHeader = ["UUID", "Description", "CreatedTime", "Amount", "Currency", "Status", "FirstName", "LastName", "Approve", "Decline"];
export default class ChildComponent extends React.Component {

    constructor(props) {
        super(props);
        this.generateHeader = this.generateHeader.bind(this);
        this.generateTableData = this.generateTableData.bind(this);
    }

    generateHeader() {
        let res = [];
        for (let i = 0; i < columnHeader.length; i++) {
            res.push(<th key={columnHeader[i]}>{columnHeader[i]}</th>)
        }
        return res;
    }

    generateTableData() {
        let res = [];
        let tableData = this.props.expenses;
        for (let i = 0; i < tableData.length; i++) {
            res.push(
                <tr key={tableData[i].uuid}>
                    <td key={tableData[i].uuid}>{tableData[i].uuid}</td>
                    <td key={tableData[i].description}>{tableData[i].description}</td>
                    <td key={tableData[i].created_at}>{tableData[i].created_at}</td>
                    <td key={tableData[i].amount}>{tableData[i].amount}</td>
                    <td key={tableData[i].currency}>{tableData[i].currency}</td>
                    <td key={tableData[i].is_approved}>{tableData[i].is_approved}</td>
                    <td key={tableData[i].employee.first_name}>{tableData[i].employee.first_name}</td>
                    <td key={tableData[i].employee.last_name}>{tableData[i].employee.last_name}</td>
                    <td>
                        <button type="button" className="btn btn-outline-primary" disabled={tableData[i].is_approved === "Approved"} onClick={() => this.props.handleStatus(tableData[i].uuid, "Approved", i)}>Approve</button>
                    </td>
                    <td>
                        <button type="button" className="btn btn-outline-primary" disabled={tableData[i].is_approved === "Declined"} onClick={() => this.props.handleStatus(tableData[i].uuid, "Declined", i)}>Decline</button>
                    </td>
                </tr>
            )
        }
        return res;
    }
  
    render() {
        return (
            <div>
                <br />
                <h1 align="center">XCNT</h1>
                <h3 align="center">Expense Tracker</h3>
                <br />
                <ButtonGroup className="float-right">
                    <DropdownButton className="mr-2" id="dropdown-basic-button" title={this.props.sortTitle}>
                    <Dropdown.Item eventKey="created_at" onSelect={() => this.props.handleSort("created_at", "Sort(CreatedTime)")}>CreatedTime</Dropdown.Item>
                    <Dropdown.Item eventKey="amount" onSelect={() => this.props.handleSort("amount", "Sort(Amount)")}>Amount</Dropdown.Item>
                    <Dropdown.Item eventKey="currency" onSelect={() => this.props.handleSort("currency", "Sort(Currency)")}>Currency</Dropdown.Item>
                    </DropdownButton>
                    <DropdownButton className="mr-5" id="dropdown-basic-button" title={this.props.orderTitle}>
                    <Dropdown.Item eventKey="Ascending" onSelect={() => this.props.handleOrder("asc", "Order(Ascending)")}>Ascending</Dropdown.Item>
                    <Dropdown.Item eventKey="Descending" onSelect={() => this.props.handleOrder("desc", "Order(Descending)")}>Descending</Dropdown.Item>
                    </DropdownButton>
                </ButtonGroup>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            {this.generateHeader()}
                        </tr>
                    </thead>
                    <tbody>
                        {this.generateTableData()}
                    </tbody>
                </table>
            </div>
        )
    }
}
