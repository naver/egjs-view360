import * as React from "react";
import { Link } from "react-router-dom";

export default class Header extends React.Component {
  public render() {
    return (
      <div>
        <ul className="header">
          <h3>PanoViewer</h3>
          <li><Link to="/rerender">Rerender</Link></li>
          <li><Link to="/video">Video</Link></li>
        </ul>
        <ul className="header">
          <h3>SpinViewer</h3>
          <li><Link to="/spin">Default</Link></li>
        </ul>
      </div>
    );
  }
}
