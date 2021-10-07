declare module 'cli-handle-error' {
  declare const handleError: (
    heading: string,
    err?: Error,
    displayError?: boolean,
    exit?: boolean,
  ) => void;
  export = handleError;
}
