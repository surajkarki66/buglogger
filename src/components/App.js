import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";

import AddLogItem from "./AddLogItem";
import LogItem from "./LogItem";

const App = () => {
  const [logs, setLogs] = useState([
    {
      _id: 1,
      text: "This is log one",
      priority: "low",
      user: "Suraj",
      created: new Date().toString(),
    },
    {
      _id: 2,
      text: "This is log two",
      priority: "moderate",
      user: "Ram",
      created: new Date().toString(),
    },
    {
      _id: 3,
      text: "This is log three",
      priority: "high",
      user: "Denver",
      created: new Date().toString(),
    },
  ]);
  return (
    <Container>
      <AddLogItem />
      <Table>
        <thead>
          <tr>
            <th>Priority</th>
            <th>Log Text</th>
            <th>User</th>
            <th>Created</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {" "}
          {logs.map((log) => (
            <LogItem log={log} key={log._id} />
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default App;
