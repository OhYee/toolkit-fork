import { Logger, FileTransport, ConsoleTransport } from '../src/log';

test('logger', () => {
  const logger = new Logger({});
  logger.set(
    'file',
    new FileTransport({
      file: 'test.log',
      level: 'INFO',
    }),
  );
  logger.set(
    'console',
    new ConsoleTransport({
      level: 'DEBUG',
    }),
  );
  logger.debug('debug foo'); // only output to stdout
  logger.info('GET /foo/bar 200ms');
  logger.warn('[分类: 警告信息]');
  logger.error(new Error('error foo'));
});
