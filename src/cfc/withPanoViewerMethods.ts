import { PanoViewer } from "../PanoViewer";

import withMethods from "./withMethods";

const withPanoViewerMethods = (prototype: any, name: string) => {
  withMethods(PanoViewer, prototype, name);
};

export default withPanoViewerMethods;
