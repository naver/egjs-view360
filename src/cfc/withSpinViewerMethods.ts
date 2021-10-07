import { SpinViewer } from "../SpinViewer";

import withMethods from "./withMethods";

const withSpinViewerMethods = (prototype: any, name: string) => {
  withMethods(SpinViewer, prototype, name);
};

export default withSpinViewerMethods;
