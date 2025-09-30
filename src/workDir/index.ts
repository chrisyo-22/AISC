import fs from 'fs';

import {join} from 'path';
import {uniqueId, getDirname} from '../common/utils.js';
const __dirname = getDirname(import.meta.url); //get current file directory

const basePath = join(__dirname, '../..');//get the base path of the project
const workBasePath = join(basePath, 'work');//get the work base path
fs.mkdirSync(workBasePath, {recursive: true});//create the work base path

export async function createWorkDir(): Promise<string> {
    const workDir = join(workBasePath, uniqueId());
    await fs.promises.mkdir(workDir, {recursive: true});
    return workDir;
}

export async function deleteWorkDir(workDir: string): Promise<void> {
    await fs.promises.rm(workDir, { recursive: true }); // delete the work directory
}
