import React from "react";
import CodeBlock from "@theme/CodeBlock";
import Feature from "./Feature";
import styles from "./features.module.css";

import {
  IconBrandOpenSource,
  IconAdjustmentsAlt,
  IconPhotoCheck,
  IconPlug,
  Icon360View,
  IconBrandTypescript,
  IconBrandReact,
  IconCardboards,
  IconBadgeVr,
  Icon360,
  IconVideo,
  IconSettings,
  IconPuzzle,
  IconBulb,
  IconBrandJavascript,
  IconFreeRights,
  IconBrowser
} from "@tabler/icons";
import IconBrandIE from "@site/static/icon/ie.svg";

export default () => {
  return <section className={styles.features}>
    <Feature
      title={<><Icon360 />Display 360 images and videos</>}
      subtitle="Display your 360 image / video in your website inline"
      items={[
        "Easy to setup",
        "Rich API",
        "Integrate with other video players"
      ]}
      image={<Icon360View />} />
    <Feature
      title={<><IconVideo />Supports various projection types</>}
      subtitle="Supports various 360 image/video formats, and more projection types will continue to be added."
      items={[
        "Equirectangular",
        "Cubemaps",
        "Panorama images taken from your smartphone",
        "Youtube 360 videos (Equiangular Cubemaps)",
        "...and more"
      ]}
      reversed
      image={<IconPhotoCheck />} />
    <Feature
      title={<><IconSettings />Customizable</>}
      subtitle="You can easily customize the behavior of the viewer with the options & events."
      items={[
        <>
          Customize projections, camera, controls, etc. by simply changing options
          <CodeBlock className="language-javascript">
            {`new View360("#el", {\n  autoplay: true\n})`}
          </CodeBlock>
        </>
      ]}
      image={<IconAdjustmentsAlt />} />
    <Feature
      title={<><IconPuzzle />Plugins</>}
      subtitle="Supports ready-to-use plugins to enhance your viewer"
      items={[
        "Out-of-the-box video control",
        "Loading indicator",
        "...and more will be added"
      ]}
      reversed
      image={<IconPlug />} />
    <Feature
      title={<><IconBadgeVr />VR-ready</>}
      subtitle={`Enter VR sessions by simply calling "view360.vr.enter()"`}
      items={[
        "Enter VR sessions with almost every projection types",
        "Supports stereoscopic equirectangular projection",
        "Cardboard VR & Head-mounted display"
      ]}
      image={<IconCardboards />} />
    <Feature
      title={<><IconBulb />Typescript-based</>}
      subtitle="All source code is written in Typescript, you don't have to install extra package for types."
      items={[
        "Supports all major module types",
        "ESM, CJS, UMD"
      ]}
      reversed
      image={<IconBrandTypescript />} />
    <Feature
      title={<><IconBrandJavascript />Official package per framework</>}
      subtitle="Use View360 with your favorite framework!"
      items={[
        "React",
        "Angular",
        "Vue (Both 2 & 3)",
        "Svelte",
        "If you have another framework you want, please suggest it to us."
      ]}
      image={<IconBrandReact />} />
    <Feature
      title={<><IconBrowser />Supports old browsers</>}
      subtitle="View360 supports old browsers with WebGL, including IE11"
      items={[
        "With Promise polyfill only",
        "It also supports all major browsers & OS",
        "Desktop PC(Windows, Mac, Linux), Mobile(Android, iOS)",
        "Chrome, Firefox, Safari, ..."
      ]}
      reversed
      image={<IconBrandIE />} />
    <Feature
      title={<><IconFreeRights />Free and Open Source</>}
      subtitle="100% free for both commercial & non-commercial uses forever."
      items={[
        "Open source under MIT license",
        "No license fees required",
        "No contracts"
      ]}
      image={<IconBrandOpenSource />} />
  </section>
}
