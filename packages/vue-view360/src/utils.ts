export const getProps = (thisVal: any) => {
  return Object.keys(thisVal.$props).reduce((props, propName) => {
    if (thisVal.$props[propName] != null) {
      props[propName] = thisVal.$props[propName];
    }

    return props;
  }, {});
};

