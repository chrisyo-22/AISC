import ejs from 'ejs';
import { join } from 'path';
import { getDirname } from '../common/utils.js';

const templatePath = join(getDirname(import.meta.url), './template/index.ejs');

export function renderMarkdown(data: any): Promise<string> {
  return new Promise((resolve, reject) => {
    ejs.renderFile(templatePath, data, (err: Error | null, str?: string) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(str!);
    });
  });
}
