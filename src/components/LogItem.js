import React from "react";
import Badge from "react-bootstrap/Badge";
import Moment from "react-moment";
import Button from "react-bootstrap/Button";

const LogItem = ({ log }) => {
  const { priority, user, text, created } = log;

  const setVariant = () => {
    if (priority === "high") {
      return "danger";
    } else if (priority === "moderate") {
      return "warning";
    } else {
      return "success";
    }
  };
  return (
    <tr>
      <td>
        <Badge pill bg={setVariant()} className="p-2">
          {priority.charAt(0).toUpperCase() + priority.slice(1)}
        </Badge>
      </td>

      <td>{text}</td>
      <td>{user}</td>
      <td>
        <Moment format="MMMM Do YYYY, h:mm:ss a">{new Date(created)}</Moment>
      </td>
      <td>
        <Button variant="danger" size="sm">
          x
        </Button>
      </td>
    </tr>
  );
};

export default LogItem;
