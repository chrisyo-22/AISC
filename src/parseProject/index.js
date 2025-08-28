import { parseLocalProject } from './parseLocalProject.js';
import { parseRemoteProject } from './parseRemoteProject.js';

export function parseProject(projectRoot){
    if(projectRoot.startsWith('http://') || projectRoot.startsWith('https://')){
        return parseRemoteProject(projectRoot);
    }else{
        return parseLocalProject(projectRoot);
    }
}