import * as React from "react";
import { Link } from "react-router-dom";

export default class Header extends React.Component {
  public render() {
    return (
      <ul className="header">
        <li><Link to="/rerender">Rerender</Link></li>
        <li><Link to="/video">Video</Link></li>
      </ul>
    );
  }
}
