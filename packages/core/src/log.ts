import {
  Logger,
  FileTransport,
  ConsoleTransport,
  Transport,
  LoggerLevel,
  ConsoleTransportOptions,
  FileTransportOptions,
} from 'egg-logger';
import chalk from 'chalk';

const duartionRegexp = /([0-9]+ms)/g;
const categoryRegexp = /(\[[\w\-_.:]+\])/g;
const httpMethodRegexp = /(GET|POST|PUT|PATH|HEAD|DELETE) /g;

interface IMeta {
  level: LoggerLevel;
  date: string;
  pid: number;
  hostname: string;
  message: string;
}
const formatter = (meta?: object) => {
  const metaObj = meta as IMeta;
  let msg = metaObj.message;
  if (metaObj.level === 'ERROR') {
    return chalk.red(msg);
  } else if (metaObj.level === 'WARN') {
    return chalk.yellow(msg);
  }
  msg = msg.replace(duartionRegexp, chalk.green('$1'));
  msg = msg.replace(categoryRegexp, chalk.blue('$1'));
  msg = msg.replace(httpMethodRegexp, chalk.cyan('$1 '));
  return msg;
};

class _ConsoleTransport extends ConsoleTransport {
  constructor(options: ConsoleTransportOptions) {
    super({
      formatter,
      ...options,
    });
  }
}

class _FileTransport extends FileTransport {
  constructor(options: FileTransportOptions) {
    super({
      formatter,
      ...options,
    });
  }
}

export {
  Logger,
  formatter,
  Transport,
  _ConsoleTransport as ConsoleTransport,
  _FileTransport as FileTransport,
};
