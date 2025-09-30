import { createWorkDir, deleteWorkDir } from '../workDir/index.js';
import { parseProject } from '../parseProject/index.js';
import { generateLock } from '../generateLock/index.js';
import { audit } from '../audit/index.js';
import { render } from '../render/index.js';
import fs from 'fs';

export async function auditPackage(projectRoot: string, savePath: string): Promise<void> {
    //1. Create a work directory
    const workDir = await createWorkDir();

    try {
        //2. Analyze the project, and add package.json to the work directory
        const packageJson = await parseProject(projectRoot);

        //3. generate json.lock file
        await generateLock(workDir, packageJson);
        
        // 4. audit work directory
        const auditResult = await audit(workDir, packageJson);
        
        // 5. render audit result
        const renderedResult = await render(auditResult, packageJson);
        
        // 6. save result to specified path
        await fs.promises.writeFile(savePath, renderedResult);
    } finally {
        // 7. always delete work directory, even if there's an error
        await deleteWorkDir(workDir);
    }
}
