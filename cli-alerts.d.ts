interface Options {
  type: 'warning' | 'success' | 'info' | 'error';
  msg: string;
  name: string;
}

declare module 'cli-alerts' {
  const alert: (options: Options) => void;
  export = alert;
}
