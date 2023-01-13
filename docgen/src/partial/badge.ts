const badge = (txt: string, type: string) => `<span className="badge badge--${type}">${txt}</span>`;

export const primary = (txt: string) => badge(txt, "primary");
export const secondary = (txt: string) => badge(txt, "secondary");
export const success = (txt: string) => badge(txt, "success");
export const info = (txt: string) => badge(txt, "info");
export const warning = (txt: string) => badge(txt, "warning");
export const danger = (txt: string) => badge(txt, "danger");
