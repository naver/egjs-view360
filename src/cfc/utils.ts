export const getValidProps = (propsObj: any) => {
  return Object.keys(propsObj).reduce((props, propName) => {
    if (propsObj[propName] != null) {
      props[propName] = propsObj[propName];
    }

    return props;
  }, {});
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
