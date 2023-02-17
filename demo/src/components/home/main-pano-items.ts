const BF5 = [
  "HGJRZy7",
  "HGJRQvS",
  "HGJRLa2"
];

const DRG = [
  "HGJ5hN9"
];

const DQ11 = [
  "HGJ5ZKv",
  "HGJ5sVa",
  "HGJ5LiJ",
  "HGJ5tlR",
  "HGJ5DSp",
  "HGJ5mHN",
  "HGJ5pRI",
  "HGJ5yNt"
];

const FF15 = [
  "HGJWyOb",
  "HGJXJzx",
  "HGJXdWQ",
  "HGJX9bj"
];

const FOR_HONOR = [
  "HGJXzzv",
  "HGJXC5g",
  "HGJXomJ",
  "HGJXnea"
];

const QUBE2 = [
  "HGJXR1I",
  "HGJXAqN"
];

const WITNESS = [
  "HGJXlmG",
  "HGJXEX4",
  "HGJXGLl",
  "HGJX1If",
  "HGJXVB2",
  "HGJXW1S",
  "HGJXXr7"
];

// https://freeimage.host/
const bindImageSrc = src => `https://iili.io/${src}.jpg`;

export default [
  ...BF5.map(src => ({ src: bindImageSrc(src), license: "battlefieldV" })),
  ...DRG.map(src => ({ src: bindImageSrc(src), license: "drg" })),
  ...DQ11.map(src => ({ src: bindImageSrc(src), license: "dq11" })),
  ...FF15.map(src => ({ src: bindImageSrc(src), license: "ff15" })),
  ...FOR_HONOR.map(src => ({ src: bindImageSrc(src), license: "for_honor" })),
  ...QUBE2.map(src => ({ src: bindImageSrc(src), license: "qube2" })),
  ...WITNESS.map(src => ({ src: bindImageSrc(src), license: "witness" }))
];
