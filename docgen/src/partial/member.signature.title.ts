/**
 * "member.signature.title.tsx", Adapted and modified from TypeDoc's default theme licensed under Apache License 2.0
 * https://github.com/TypeStrong/typedoc/blob/8a3e195d3814b6cf54f036fa528ad3a804678d1a/src/lib/output/themes/default/partials/member.signature.title.tsx
 * @see https://github.com/TypeStrong/typedoc/blob/master/LICENSE
 */
import { ReflectionKind, SignatureReflection, TypeContext } from "typedoc";
import { renderTypeParametersSignature, name } from "../utils";
import { render as renderType, TypeRenderContext } from "./type";

export const memberSignatureTitle = (
  props: SignatureReflection,
  ctx: TypeRenderContext,
  { hideName = false, arrowStyle = false }: { hideName?: boolean; arrowStyle?: boolean } = {}
) => {
  const items: Array<string | null> = [];

  if (hideName) {
    if (props.kind === ReflectionKind.ConstructorSignature) {
      if (props.flags.isAbstract) {
        items.push("abstract");
      }
      items.push("new");
    }
  } else {
    if (props.kind === ReflectionKind.ConstructorSignature) {
      if (props.flags.isAbstract) {
        items.push("abstract");
      }
      items.push("new ");
      items.push(name(props.parent.parent!));
    } else {
      items.push(name(props));
    }
  }

  items.push(renderTypeParametersSignature(props.typeParameters));

  const params = props.parameters ?? [];
  items.push(`(${params.map(item => `${item.flags.isRest ? "..." : ""}${name(item)}: ${renderType(item.type, ctx, TypeContext.none)}`).join(", ")})${props.type ? `${arrowStyle ? " => " : ": "}${renderType(props.type, ctx, TypeContext.none)}` : ""}`);

  return items.filter(val => !!val).join("");
};
