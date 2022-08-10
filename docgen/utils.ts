import Identifier, { IdentifierGroups } from "./Identifier";

export const showExtends = (classData: Identifier) => classData.extends.length > 0
  ? ` extends ${classData.extends.map(parent => parent.name).join(", ")}`
  : "";
export const showImplements = (data: Identifier) => data.implements && data.implements.length > 0
  ? ` implements ${data.implements.map(iface => parseInterface(iface)).join(", ")}`
  : "";
export const parseInterface = (iface: IdentifierGroups["implements"][0]) => iface.typeArguments && iface.typeArguments.length > 0
  ? `${iface.name}<${iface.typeArguments.map(arg => arg.name).join(", ")}>`
  : iface.name;
