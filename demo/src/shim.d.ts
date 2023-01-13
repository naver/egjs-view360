import React from "react";

declare global {
  declare module "*.mdx" {
    import type {ComponentType} from 'react';

    const ReactComponent: ComponentType;

    export default ReactComponent;
  }
  declare module "*.md" {
    import type {ComponentType} from 'react';

    const ReactComponent: ComponentType;

    export default ReactComponent;
  }
}
