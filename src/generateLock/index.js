
import fs from 'fs';
import path from 'path';
import { runCommand } from '../common/utils.js';

async function writePackageJson(workDir, packageJson) {
    const packageJsonPath = path.join(workDir, 'package.json');
    const packageJsonString = JSON.stringify(packageJson, null, 2);
    await fs.promises.writeFile(packageJsonPath, packageJsonString, 'utf-8');
}



async function createLockFile(workDir){
    const cmd = `npm install --package-lock-only`;
    await runCommand(cmd, workDir);
}

export async function generateLock(workDir, packageJson) {
    //1. write package.json to the work directory
    await writePackageJson(workDir, packageJson);

    //2. create a lock file
    await createLockFile(workDir);

}