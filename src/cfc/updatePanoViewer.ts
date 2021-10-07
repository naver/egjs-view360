import PanoViewer, { PanoViewerOptions } from "../PanoViewer/PanoViewer";

export default (panoViewer: PanoViewer, newProps: Partial<PanoViewerOptions>, prevProps: Partial<PanoViewerOptions>) => {
  if (isPropChanged(newProps.image, prevProps.image)) {
    panoViewer.setImage(newProps.image, {
      projectionType: newProps.projectionType,
      cubemapConfig: newProps.cubemapConfig,
      stereoFormat: newProps.stereoFormat,
      isVideo: false
    });
  } else if (isPropChanged(newProps.video, prevProps.video)) {
    panoViewer.setVideo(newProps.video, {
      projectionType: newProps.projectionType,
      cubemapConfig: newProps.cubemapConfig,
      stereoFormat: newProps.stereoFormat
    });
  }

  const singleUpdateOptions: Array<keyof PanoViewerOptions> = [
    "fovRange",
    "gyroMode",
    "pitchRange",
    "showPolePoint",
    "touchDirection",
    "useKeyboard",
    "useZoom",
    "yawRange"
  ];

  singleUpdateOptions.forEach(optionName => {
    updateOption(panoViewer, optionName, newProps, prevProps);
  });
};

const isPropChanged = (val: any, prevVal: any): val is true => val != null && val !== prevVal;
const updateOption = (panoViewer: PanoViewer, optionName: string, newProps: Partial<PanoViewerOptions>, prevProps: Partial<PanoViewerOptions>) => {
  if (isPropChanged(newProps[optionName], prevProps[optionName])) {
    panoViewer[`set${optionName[0].toUpperCase()}${optionName.slice(1)}`](newProps[optionName]);
  }
};
