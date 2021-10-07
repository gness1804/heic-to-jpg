interface Options {
  type: 'warning' | 'success' | 'info' | 'error';
  msg: string;
  name: string;
}

declare module 'cli-alerts' {
  declare const alert: (options: Options) => void;
  export = alert;
}
