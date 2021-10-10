declare module 'cli-handle-error' {
  const handleError: (
    heading: string,
    err?: Error,
    displayError?: boolean,
    exit?: boolean,
  ) => void;
  export default handleError;
}
