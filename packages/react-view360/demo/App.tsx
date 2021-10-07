import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Header from "./Header";
import Rerender from "./case/Rerender";
import Video from "./case/Video";
import "./App.css";

export default class App extends Component<{}> {
  public render() {
    return (<Router>
      <Header/>
      <Switch>
        <Route path="/rerender">
          <Rerender />
        </Route>
        <Route path="/video">
          <Video />
        </Route>
      </Switch>
    </Router>);
  }
}
