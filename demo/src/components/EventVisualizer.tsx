import React from "react";
import clsx from "clsx";
import View360, { EVENTS } from "@site/../packages/view360/src";
import styles from "./event-visualizer.module.css";

const COLORS = {
  // from https://lospec.com/palette-list/pear36
  [EVENTS.INPUT_START]: "#4b5bab",
  [EVENTS.INPUT_END]: "#3ca370",
  [EVENTS.STATIC_CLICK]: "#8c3f5d",
  [EVENTS.BEFORE_RENDER]: "#ba6156",
  [EVENTS.RENDER]: "#f2a65e",
  [EVENTS.RESIZE]: "#5e315b",
  [EVENTS.LOAD_START]: "#bd4882",
  [EVENTS.LOAD]: "#80366b",
  [EVENTS.PROJECTION_CHANGE]: "#eb564b",
  [EVENTS.READY]: "#7e7e8f",
  [EVENTS.VIEW_CHANGE]: "#323e4f",
  [EVENTS.VR_START]: "#b0305c",
  [EVENTS.VR_END]: "#73275c"
}

class EventsVisualizer extends React.Component<{
  viewer: View360;
  events: string[];
}, {
  events: Array<{ name: string; count: number, evt }>;
}> {
  public static defaultProps = {
    events: []
  };

  public constructor(props) {
    super(props);

    this.state = {
      events: []
    };
  }

  public componentDidMount(): void {
    setTimeout(() => {
      const { viewer, events } = this.props;

      Object.values(events).forEach(evt => {
        viewer.on((evt as any), this._onEvent);
      });
    });
  }

  public render() {
    const events = this.state.events;
    return <div>
      <h4>Events Triggered</h4>
      { events.map(({ name, count, evt }, idx) => (
        <div key={idx} className={clsx(styles.btn, "button button--active button--info")} style={{ backgroundColor: COLORS[name] ?? "" }}>
          <span>{ name }</span>
          <span className={styles.separator}>x</span>
          <span className={styles.count}>{ count }</span>
        </div>
      ))}
    </div>;
  }

  private _onEvent = evt => {
    const events = this.state.events;
    const lastEvt = events[events.length - 1];

    if (!lastEvt || evt.type !== lastEvt.name) {
      events.push({ name: evt.type, count: 1, evt });

      if (events.length > 20) {
        events.splice(0, events.length - 20);
      }
    } else {
      lastEvt.count += 1;
    }

    this.setState({ events });
  };
}

export default EventsVisualizer;
