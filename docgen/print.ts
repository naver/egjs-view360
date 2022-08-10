import { KIND_NAME_REMAPPED } from "./const";
import Identifier from "./Identifier";
import { showExtends, showImplements } from "./utils";

export default (data: Identifier) => `---
custom_edit_url: null
---

\`\`\`ts
${[KIND_NAME_REMAPPED[data.kind]]} ${data.name}${showExtends(data)}${showImplements(data)}
\`\`\`
`;
