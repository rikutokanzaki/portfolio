export type TerminalParams = {
  title?: string;
  head?: string;
  delimiter?: string;
  cwd?: string;
  symbol?: string;
  commands: Array<string>;
  url: string;
  headColor?: string;
  delimiterColor?: string;
  cwdColor?: string;
  symbolColor?: string;
  cursorColor?: string;
  commandColor?: string;
  targetOption?: string;
};
