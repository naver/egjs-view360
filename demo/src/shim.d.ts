// Definitions to let TS understand .vs, .fs, .glsl shader files
declare module "*.module.css" {
  const value: Record<string, any>;
  export default value;
}
declare module "*.svg" {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export default content;
}
