export const getProps = (thisVal: any) => {
  return Object.keys(thisVal.$props).reduce((props, propName) => {
    if (thisVal.$props[propName] != null) {
      props[propName] = thisVal.$props[propName];
    }

    return props;
  }, {} as {[key: string]: any});
};

export const generateCanvasKey = (oldKey: number) => {
  let newKey: number;

  do {
    const array = new Uint32Array(1);
    crypto.getRandomValues(array);
    newKey = array[0];
  } while (newKey === oldKey);

  return newKey;
};
