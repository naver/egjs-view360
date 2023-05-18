import clsx from "clsx";
import React, { useEffect, useImperativeHandle, useRef, useState } from "react";
import { useBaseUrlUtils } from "@docusaurus/useBaseUrl";
import VanillaView360, { ControlBar, ControlBarItemOptions, LoadingSpinner, View360Options } from "../../../packages/view360/src";
import {
  Projection,
  EquirectProjection,
  CubemapProjection,
  CubestripProjection,
  EquiangularProjection,
  CylindricalProjection,
  StereoEquiProjection,
  LittlePlanetProjection
} from "../../../packages/view360/src/projection";
import { getObjectOption } from "../../../packages/view360/src/utils";
import LoadButton from "./LoadButton";
import OptionExample from "./OptionExample";
import License, { LicenseProps } from "./License.tsx";
import OriginalImageButton from "./plugin/OriginalImageButton";
import { PROJECTION_TYPE } from "./const";
import EventVisualizer from "./EventVisualizer";

interface DemoOptions extends Partial<View360Options>, React.HTMLAttributes<HTMLDivElement> {
  projectionType: string;
  projectionOptions: Record<string, any>;
  license: LicenseProps["item"];
  ratio: string | null;
  showControlBar: boolean | Partial<ControlBarItemOptions>;
  showSpinner: boolean;
  clickToLoad: boolean;
  showExampleCode: boolean | string[];
  showEvents: string[];
}

const View360 = React.forwardRef(({
  license = null,
  showControlBar = true,
  showSpinner = true,
  clickToLoad = false,
  showExampleCode = false,
  showEvents = [],
  ratio = "16by9",
  projectionType = PROJECTION_TYPE.EQUIRECTANGULAR,
  projectionOptions = {},
  ...restProps
}: Partial<DemoOptions>, ref) => {
  const [viewer, setViewer] = useState<VanillaView360>();
  const wrapperRef = useRef<HTMLDivElement>();
  const { withBaseUrl } = useBaseUrlUtils();

  useEffect(() => {
    if (!viewer) return;

    viewer.load(createProjection(projectionType, projectionOptions, withBaseUrl));
  }, [projectionType, projectionOptions]);

  useEffect(() => {
    // onMount
    const {
      children,
      plugins = [],
      ...restOptions
    } = restProps;

    if (showControlBar) {
      const originalImageButton = new OriginalImageButton();

      plugins.push(new ControlBar({
        ...getObjectOption(showControlBar),
        customItems: [originalImageButton]
      }));
    }

    if (showSpinner) {
      plugins.push(new LoadingSpinner(getObjectOption(showSpinner)));
    }

    if (clickToLoad) {
      restOptions.autoInit = false;
    }

    const options = {
      ...restOptions,
      plugins,
      projection: projectionOptions.src
        ? createProjection(projectionType, projectionOptions, withBaseUrl)
        : null
    }

    const view360 = new VanillaView360(wrapperRef.current, options);
    setViewer(view360);

    return () => {
      // onUnmount
      view360.destroy();
    }
  }, []);

  useImperativeHandle(ref, () => ({
    load: (projectionType: string, projectionOptions: Record<string, any>) => {
      if (!viewer) return;
      viewer.load(createProjection(projectionType, projectionOptions, withBaseUrl));
    },
    refreshHotspots: () => {
      if (!viewer) return;
      viewer.hotspot.refresh();
    },
    viewer: () => {
      return viewer;
    }
  }), [viewer]);

  const {
    children,
    className,
    style,
    on,
    ...otherProps
  } = restProps;

  const optionsToInclude = Array.isArray(showExampleCode) ? showExampleCode : [];
  const view360Options = Object.keys(otherProps)
    .filter(key => {
      return key in VanillaView360.prototype || optionsToInclude.includes(key);
    })
    .reduce((options, key) => {
      return { ...options, [key]: otherProps[key] };
    }, {});

  const classes = ["view360-container"];

  if (ratio) {
    classes.push(`is-${ratio}`);
  }

    return <>
      <div ref={wrapperRef} className={clsx(...classes, className)} style={style}>
        <canvas className="view360-canvas"></canvas>
        { license && <License item={license} /> }
        { clickToLoad && <LoadButton onClick={() => { viewer.init(); }} /> }
        { children }
      </div>
      { showExampleCode && <OptionExample options={view360Options} projectionType={projectionType} projectionOptions={projectionOptions} />}
      { showEvents.length > 0 && <EventVisualizer viewer={viewer} events={showEvents} />}
    </>;
});

const createProjection = (projectionType: string, projectionOptions: any, withBaseUrl): Projection => {
  if (projectionOptions.src && (typeof projectionOptions.src === "string" || Array.isArray(projectionOptions.src))) {
    projectionOptions.src = Array.isArray(projectionOptions.src)
      ? projectionOptions.src.map(src => withBaseUrl(src))
      : withBaseUrl(projectionOptions.src)
  }

  switch (projectionType) {
    case PROJECTION_TYPE.EQUIRECTANGULAR:
      return new EquirectProjection(projectionOptions);
    case PROJECTION_TYPE.CUBEMAP:
      return new CubemapProjection(projectionOptions);
    case PROJECTION_TYPE.CUBESTRIP:
      return new CubestripProjection(projectionOptions);
    case PROJECTION_TYPE.EAC:
      return new EquiangularProjection(projectionOptions);
    case PROJECTION_TYPE.CYLINDRICAL:
      return new CylindricalProjection(projectionOptions);
    case PROJECTION_TYPE.STEREOSCOPIC_EQUI:
      return new StereoEquiProjection(projectionOptions);
    case PROJECTION_TYPE.LITTLE_PLANET:
      return new LittlePlanetProjection(projectionOptions);
    default:
      throw new Error(`Wrong projection, given: ${projectionType}`);
  }
};

export * from "../../../packages/view360/src/index";

export default View360;
