import React, { Component } from 'react'
import { Column, Cell, Table } from "@blueprintjs/table";

class DataExample extends Component {
  render() {
    const usCurrency = (rowIndex) => {
      return <Cell>{`$${(rowIndex * 10).toFixed(2)}`}</Cell>
    };
    const eurCurrency = (rowIndex) => {
      return <Cell>{`EUR ${(rowIndex * 10).toFixed(2)}`}</Cell>
    };
    const plCurrency = (rowIndex) => {
      return <Cell>{`PLN ${(rowIndex * 10).toFixed(2)}`}</Cell>
    };

    return (
      <div className="example-window">
        <Table numRows={20}>
          <Column name="Dollars" cellRenderer={usCurrency}/>
          <Column name="Euros" cellRenderer={eurCurrency}/>
          <Column name="Polish zł" cellRenderer={plCurrency}/>
          <Column name="Dollars" cellRenderer={usCurrency}/>
          <Column name="Euros" cellRenderer={eurCurrency}/>
          <Column name="Polish zł" cellRenderer={plCurrency}/>
        </Table>
      </div>
    );
  }
}


export default DataExample;