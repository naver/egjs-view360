import React from "react";
import Layout from "@theme/Layout";
import Translate from '@docusaurus/Translate';
import styles from "./home.module.css";
import Main from "../components/home/Main";
import Features from "../components/home/Features";

class Home extends React.Component {
  public render() {
    return (<Layout>
      <div className="container">
        <Main />
        <Features />
      </div>
    </Layout>);
  }
}

export default Home;
