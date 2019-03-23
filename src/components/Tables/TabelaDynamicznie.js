import React from "react";
import { Column, Cell, Table } from "@blueprintjs/table";
import DummyData from "./dummy-data.json";

// poweilanie pierwszego wiersza tabeli do 1000
const klucze = Object.keys(DummyData[0]["_source"]);
for (let i = 0; i<1000; i+=1) {
  DummyData.push(DummyData[0]);
}

class TabelaDynamicznie extends React.Component {
  state = {
    numResultsRows: DummyData.length,
    results: DummyData
  };

  createColumn(name) {
    const showCell = (rowID, colID) => {
      const colName = klucze[colID];
      return <Cell>{DummyData[rowID]._source[colName]}</Cell>;
    };
    // console.log(columnData);
    return <Column key={name} cellRenderer={showCell} name={name} />;
  }

  createColumns(columnDatas) {
    return Object.keys(columnDatas[0]["_source"]).map(this.createColumn);
  } // zamien na entries, żeby się dostać do klucza i wartości

  createTable(results, numResultsRows) {
    return (
      <Table style={{ width: "100%" }} numRows={numResultsRows}>
        {this.createColumns(results)}
      </Table>
    );
  }

  render() {
    return this.createTable(this.state.results, this.state.numResultsRows);
  }
}

export default TabelaDynamicznie;
