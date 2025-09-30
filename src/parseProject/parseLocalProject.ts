import path from 'path';
import fs from 'fs';
import type { PackageJson } from '../types.js';

export async function parseLocalProject(projectRoot: string): Promise<PackageJson> {
    const packageJsonPath = path.join(projectRoot, 'package.json');
    const json = await fs.promises.readFile(packageJsonPath, 'utf-8');
    return JSON.parse(json);
}
