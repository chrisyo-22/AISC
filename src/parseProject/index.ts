import { parseLocalProject } from './parseLocalProject.js';
import { parseRemoteProject } from './parseRemoteProject.js';
import type { PackageJson } from '../types.js';

export function parseProject(projectRoot: string): Promise<PackageJson> {
    if(projectRoot.startsWith('http://') || projectRoot.startsWith('https://')){
        return parseRemoteProject(projectRoot);
    }else{
        return parseLocalProject(projectRoot);
    }
}
