import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
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

class License extends React.Component<LicenseProps, {
  license: Record<string, any> | null;
  visible: boolean;
}> {
  public static defaultProps = {
    item: null
  };

  private _modalRef = React.createRef<HTMLDivElement>();

  public constructor(props) {
    super(props);

    this.state = {
      license: props.item ? LICENSE[props.item] : null,
      visible: false
    }
  }

  public componentDidUpdate(prevProps: Readonly<LicenseProps>): void {
    if (this.props.item !== prevProps.item) {
      this.setState({
        license: LICENSE[this.props.item]
      });
    }
  }

  public render() {
    const modalRef = this._modalRef;
    const { item, ...restProps } = this.props;
    const license = this.state.license;

    if (!license) return <></>;

    return <>
      <div className={clsx("license-container", styles.wrapper)} {...restProps} title="Show Attribution" onClick={evt => {
        evt.stopPropagation();
        this.setState({ visible: true });
      }}></div>
      <div ref={modalRef} key={item}
      className={clsx({
        visible: this.state.visible,
        "demo-viewer-modal": true
      })}
      onClick={() => {
        this.setState({ visible: false });
      }}>
        {this.state.visible && <div className="content">
          {license.ansel && <>
            <span>Screenshot from </span>
          </>}
          <Link href={license.link} target="_blank" rel="noopener noreferrer" onClick={evt => evt.stopPropagation()}>{ license.name }</Link>
          <span> by </span>
          <Link href={license.authorLink} target="_blank" rel="noopener noreferrer" onClick={evt => evt.stopPropagation()}>{ license.author }</Link>
          {license.license && <>
            <span> licensed under </span>
            <Link href={LICENSE_TO_LINK[license.license]} target="_blank" rel="noopener noreferrer" onClick={evt => evt.stopPropagation()}>{ license.license }</Link>
          </>}
          {
            license.ansel && <>
            <span> taken with </span>
            <Link href="https://www.nvidia.com/en-us/geforce/geforce-experience/ansel/" target="_blank" rel="noopener noreferrer" onClick={evt => evt.stopPropagation()}>NVidia Ansel</Link>
          </>}
        </div>}
      </div>
    </>;
  }
}

export default License;
