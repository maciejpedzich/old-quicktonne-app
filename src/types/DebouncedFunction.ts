// eslint-disable-next-line
type DebouncedFunction = Function & {
  clear(): void;
  flush(): void;
};

export default DebouncedFunction;
