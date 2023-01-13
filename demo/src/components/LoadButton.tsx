import React from "react";
import styles from "./load-button.module.css";

class LoadButton extends React.Component<{ onClick: () => any }, { done: boolean }> {
  public constructor(props) {
    super(props);

    this.state = {
      done: false
    }
  }

  public render() {
    if (this.state.done) {
      return <></>;
    } else {
      return <div className={styles.wrapper}>
        <button className="button button--lg button--primary" onClick={() => {
          this.props.onClick();
          this.setState({ done: true });
        }}>LOAD</button>
      </div>;
    }
  }
}

export default LoadButton;
