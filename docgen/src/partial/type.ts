/**
 * "type.tsx", Adapted and modified from TypeDoc's default theme licensed under Apache License 2.0
 * https://github.com/TypeStrong/typedoc/blob/8a3e195d3814b6cf54f036fa528ad3a804678d1a/src/lib/output/themes/default/partials/type.tsx
 * @see https://github.com/TypeStrong/typedoc/blob/master/LICENSE
 */
import {
  DeclarationReflection,
  LiteralType,
  ReferenceType,
  ReflectionKind,
  Type,
  TypeContext,
  TypeKindMap
} from "typedoc";
import { RenderContext } from "../DocumentRenderer";
import { stringify, bindLink, bindLinkByName, name } from "../utils";
import { memberSignatureTitle } from "./member.signature.title";

export interface TypeRenderContext extends RenderContext {
  includeLink: boolean;
  simplify: boolean;
}

let indentationDepth = 0;
function includeIndentation(): string {
  return indentationDepth > 0 ? " ".repeat(indentationDepth * 2) : "";
}

const typeRenderers: {
  [K in keyof TypeKindMap]: (ctx: TypeRenderContext, type: TypeKindMap[K]) => string;
} = {
  array(ctx, type) {
    return `${render(type.elementType, ctx, TypeContext.arrayElement)}[]`;
  },
  conditional(ctx, type) {
    return [
      render(type.checkType, ctx, TypeContext.conditionalCheck),
      "extends",
      render(type.extendsType, ctx, TypeContext.conditionalExtends),
      "?",
      render(type.trueType, ctx, TypeContext.conditionalTrue),
      ":",
      render(type.falseType, ctx, TypeContext.conditionalFalse)
    ].join(" ");
  },
  indexedAccess(ctx, type) {
    let indexType = render(type.indexType, ctx, TypeContext.indexedIndex);

    if (
        type.objectType instanceof ReferenceType &&
        type.objectType.reflection &&
        type.indexType instanceof LiteralType &&
        typeof type.indexType.value === "string"
    ) {
        const childReflection = type.objectType.reflection.getChildByName([type.indexType.value]);
        if (childReflection && ctx.includeLink) {
          indexType = bindLink(childReflection, ctx);
        }
    }

    return `${render(type.objectType, ctx, TypeContext.indexedObject)}[${indexType}]`;
  },
  inferred(ctx, type) {
    const items = [`infer ${type}`];

    if (type.constraint) {
      items.push("extends", render(type.constraint, ctx, TypeContext.inferredConstraint));
    }

    return items.join(" ");
  },
  intersection(ctx, type) {
    return type.types.map(item => render(item, ctx, TypeContext.intersectionElement)).join(" & ");
  },
  intrinsic(ctx, type) {
    return type.name;
  },
  literal(ctx, type) {
    return stringify(type.value);
  },
  mapped(ctx, type) {
    const children: string[] = [];

    switch (type.readonlyModifier) {
      case "+":
        children.push("readonly");
        break;
      case "-":
        children.push("-readonly");
        break;
    }

    children.push(`[ ${type.parameter} in ${render(type.parameterType, ctx, TypeContext.mappedParameter)}`);

    if (type.nameType) {
      children.push(`as ${render(type.nameType, ctx, TypeContext.mappedName)}`);
    }

    children.push("]");

    switch (type.optionalModifier) {
      case "+":
        children.push("?:");
        break;
      case "-":
        children.push("-?:");
        break;
      default:
        children.push(": ");
    }

    children.push(render(type.templateType, ctx, TypeContext.mappedTemplate));

    return `{ ${children.join(" ")} }`;
  },
  "named-tuple-member"(ctx, type) {
    return `${type.name}${type.isOptional ? "?:" : ":"} ${render(type.element, ctx, TypeContext.tupleElement)}`;
  },
  optional(ctx, type) {
    return `${render(type.elementType, ctx, TypeContext.optionalElement)}?`;
  },
  predicate(ctx, type) {
    const items: string[] = [];
    if (type.asserts) {
      items.push("asserts");
    }

    items.push(type.name);

    if (type.targetType) {
      items.push("is", render(type.targetType, ctx, TypeContext.predicateTarget));
    }

    return items.join(" ");
  },
  query(ctx, type) {
    return `typeof ${render(type.queryType, ctx, TypeContext.queryTypeTarget)}`;
  },
  reference(ctx, type) {
    const reflection = type.reflection;

    let refName: string;

    if (reflection) {
      if (!ctx.includeLink || reflection.kindOf(ReflectionKind.TypeParameter)) {
        // Don't generate a link will always point to this page, but do set the kind.
        refName = name(reflection);
      } else {
        refName = bindLinkByName(name(reflection), ctx);
      }
    } else if (type.externalUrl && ctx.includeLink) {
      refName = `[${type.name}](${type.externalUrl})`;
    } else {
      refName = type.name;
    }

    if (type.typeArguments?.length) {
      const typeArguments = type.typeArguments
        .map(item => {
          if ((item as ReferenceType).name) {
            const refName = (item as ReferenceType).name;

            if (ctx.includeLink) {
              return bindLinkByName(refName, ctx);
            } else {
              return refName;
            }
          } else {
            return render(item, ctx, TypeContext.referenceTypeArgument);
          }
        });

      return `${refName}<${typeArguments.join(", ")}>`;
    }

    return refName;
  },
  reflection(ctx, type) {
    if (ctx.simplify) return type.stringify(TypeContext.none);

    const members: string[] = [];
    const children: DeclarationReflection[] = type.declaration.children || [];

    indentationDepth++;

    for (const item of children) {
      if (item.getSignature && item.setSignature) {
        members.push(`${name(item)}: ${render(item.getSignature.type, ctx, TypeContext.none)}`);
        continue;
      }

      if (item.getSignature) {
        members.push(`get ${name(item)}(): ${render(item.getSignature.type, ctx, TypeContext.none)}`);
        continue;
      }

      if (item.setSignature) {
        const params = item.setSignature.parameters?.map(item => {
          return `${name(item)}: ${render(item.type, ctx, TypeContext.none)}`;
        });

        members.push(`set ${name(item)}(${params})`);
        continue;
      }

      if (item.signatures) {
        for (const sig of item.signatures) {
          const signatureTitle = memberSignatureTitle(sig, ctx, {
            hideName: true,
            arrowStyle: false,
          });

          members.push(`${name(item)}${item.flags.isOptional ? "?" : ""}${signatureTitle}`);
        }
        continue;
      }

      members.push(`${name(item)}${item.flags.isOptional ? "?: " : ": "}${render(item.type, ctx, TypeContext.none)}`);
    }

    if (type.declaration.indexSignature) {
      const index = type.declaration.indexSignature;

      members.push(`[${name(index.parameters![0])}: ${render(index.parameters![0].type, ctx, TypeContext.none)}]: ${render(index.type, ctx, TypeContext.none)}`);
    }

    if (!members.length && type.declaration.signatures?.length === 1) {
      indentationDepth--;

      const signatureTitle = memberSignatureTitle(type.declaration.signatures[0], ctx, {
        hideName: true,
        arrowStyle: true,
      });

      return `(${signatureTitle})`;
    }

    for (const item of type.declaration.signatures || []) {
        members.push(memberSignatureTitle(item, ctx, { hideName: true }));
    }

    if (members.length) {
      const membersWithSeparators = members.flatMap(m => [
        includeIndentation(),
        m,
        ";\n"
      ]);
      membersWithSeparators.pop();

      indentationDepth--;

      return `{\n${membersWithSeparators.join("")}\n${includeIndentation()}}`;
    }

    indentationDepth--;
    return "{}";
  },
  rest(ctx, type) {
    return `...${render(type.elementType, ctx, TypeContext.restElement)}`;
  },
  "template-literal"(ctx, type) {
    const items = [
      "`",
    ];

    if (type.head) {
      items.push(type.head);
    }

    items.push(
      ...type.tail.map(item => {
        return `"\${${render(item[0], ctx, TypeContext.templateLiteralElement)}}${item[1] ?? ""}`;
      })
    );

    items.push("`");
    return items.join("");
  },
  tuple(ctx, type) {
    return `[${type.elements.map(item => render(item, ctx, TypeContext.tupleElement))}]`;
  },
  typeOperator(ctx, type) {
    return `${type.operator} ${render(type.target, ctx, TypeContext.typeOperatorTarget)}`;
  },
  union(ctx, type) {
    return type.types.map(item => render(item, ctx, TypeContext.unionElement)).join(" | ");
  },
  unknown(ctx, type) {
    return type.name;
  }
};

export const render = (type: Type | undefined, ctx: TypeRenderContext, where: TypeContext): string => {
  if (!type) return "any";

  const renderFn = typeRenderers[type.type];
  const rendered = renderFn(ctx, type as never);

  if (type.needsParenthesis(where)) {
    return `(${rendered})`;
  }

  return rendered;
};

export const renderType = (type: Type | undefined, ctx: RenderContext, option: Partial<Omit<TypeRenderContext, keyof RenderContext>> = {}): string => {
  const {
    includeLink = true,
    simplify = false
  } = option;

  return render(type, {
    ...ctx,
    includeLink,
    simplify
  }, TypeContext.none);
};
