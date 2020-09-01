import i18next from 'i18next';
import i18nextMiddleware from 'i18next-express-middleware';
import FilesystemBackend from "i18next-node-fs-backend";
import { join } from 'path';
import { readdirSync, existsSync } from 'fs';

export default (app, rootPath = join(process.cwd(), 'locales')) => {
  const preload = readdirSync(rootPath, (err, data) => {
    if (err) throw err;
  });

  if (!existsSync(rootPath)) return console.log('The models storage directory does not exist');

  const ns = [];
  preload?.map(file => join(rootPath, file)).forEach(path => {
    if (readdirSync(path).length) {
      readdirSync(path).map(file => {
        if (file.indexOf('.') !== 0 && file.slice(-5) === '.json') {
          const name = file.slice(0, -5);
          if (!ns.includes(name)) ns.push(name);
        }
      });
    }
  });

  i18next
  .use(i18nextMiddleware.LanguageDetector)
  .use(FilesystemBackend)
  .init({
    fallBackLng: ['en'],
    backend: {
      loadPath: join(rootPath, '{{lng}}', '{{ns}}.json'),
      addPath: join(rootPath, '{{lng}}', '{{ns}}.missing.json')
    },
    debug: false,
    detection: {
      order: ['querystring', 'cookie'],
      caches: ['cookie']
    },
    preload,
    ns,
    defaultNS: ns?.length ? ns[0] : null,
    saveMissing: true
  });

  app.use(i18nextMiddleware.handle(i18next));
}