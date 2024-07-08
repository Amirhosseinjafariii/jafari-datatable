import './style.css';
import React from 'react';
import DataTable from "./DataTable"

function App() {
  return (
    <>
      <DataTable deleteButton={true} editButton={true} theme="green" data={[
        { name: "ali", family: "rezaei", retirement: true, average: 15.25, },
        { name: "reza", family: "alinia", retirement: true, average: 16.25 },
        { name: "ahmad", family: "hassani", retirement: false, average: 18.25 },

      ]}
        columns={["first name", "last name", "retirement", "average"]}
      />
      <DataTable deleteButton={true} editButton={true} theme="blue" data={[
        { name: "ali", family: "rezaei", retirement: false, average: 15.25 },
        { name: "reza", family: "alinia", retirement: true, average: 16.25 },
        { name: "ahmad", family: "hassani", retirement: false, average: 18.25 },
      ]} />
      <DataTable deleteButton={true} editButton={true} theme="orange" data={[
        { width: 8, length: 9 },
        { width: 4, length: 6 },
        { width: 3, length: 5 },
      ]} />
      <DataTable deleteButton={true} editButton={true} theme="purple" data={[
        { width: 8, length: 9 },
        { width: 4, length: 6 },
        { width: 3, length: 5 },
      ]} columns={["arz", "tool"]} />

    </>
  );
}

export default App;