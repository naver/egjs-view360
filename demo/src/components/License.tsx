import React from "react";
import clsx from "clsx";
import styles from "./license.module.css";
import LICENSE from "./license";

const LICENSE_TO_LINK = {
  CC0: "https://creativecommons.org/publicdomain/zero/1.0/",
  "CC BY 4.0": "https://creativecommons.org/licenses/by/4.0/",
  "CC BY-SA 4.0": "https://creativecommons.org/licenses/by-sa/4.0/",
  "CC BY-NC 3.0": "https://creativecommons.org/licenses/by-nc/3.0/",
  "CC BY-NC-SA 4.0": "http://creativecommons.org/licenses/by-nc-sa/4.0/",
  "CC BY 3.0": "https://creativecommons.org/licenses/by/3.0/",
  "Pixabay License": "https://pixabay.com/service/terms/"
};

export interface LicenseProps extends React.HTMLAttributes<HTMLDivElement> {
  item: string | null
}

export default ({ item = null, ...restProps }: LicenseProps) => {
  const license = LICENSE[item];
  const modalRef = React.useRef<HTMLDivElement>();
  const stopPropagate = React.useCallback(evt => {
    evt.stopPropagation();
  }, []);

  return <>
    <div className={clsx("license-container", styles.wrapper)} {...restProps} title="Show Attribution" onClick={evt => {
      modalRef.current!.classList.add("visible");
    }}></div>
    <div ref={modalRef} onClick={() => {
      modalRef.current!.classList.remove("visible");
    }} className="demo-viewer-modal">
      { license &&
        <div className="content">
          {license.ansel && <>
            <span>Screenshot from </span>
          </>}
          <a href={license.link} target="_blank" rel="noopener noreferrer" onClick={stopPropagate}>{ license.name }</a>
          <span> by </span>
          <a href={license.authorLink} target="_blank" rel="noopener noreferrer" onClick={stopPropagate}>{ license.author }</a>
          {license.license && <>
            <span> licensed under </span>
            <a href={LICENSE_TO_LINK[license.license]} target="_blank" rel="noopener noreferrer" onClick={stopPropagate}>{ license.license }</a>
          </>}
          {
            license.ansel && <>
            <span> taken with </span>
            <a href="https://www.nvidia.com/en-us/geforce/geforce-experience/ansel/" target="_blank" rel="noopener noreferrer" onClick={stopPropagate}>NVidia Ansel</a>
          </>}
        </div>
      }
    </div>
  </>;
};
