import { createWorkDir, deleteWorkDir } from '../workDir/index.js';
import { parseProject } from '../parseProject/index.js';
import { auditPackage } from '../entry/index.js';

/**
 * Audit the project itself and all its direct and indirect dependencies
 * @param {string} projectRoot project root directory, can be the path of local project or the URL of remote project
 */
export async function auditProject(projectRoot) {
  // 1. create work directory
  const workDir = await createWorkDir();
  // 2. parse project's package.json file
  const packageJSON = await parseProject(projectRoot);
  // 3. audit project
  await auditPackage(projectRoot, '../result/audit.md');
  // 3. write to work directory
  // const depTree = await generateDepTree(packageJSON);
  // 3. parse dependency tree, get each package's dependency
  // const parsedTree = await parseTree(depTree);
  // 4. create audit task
  // const tasks = createTasks(parsedTree);
}

auditProject(
  'https://github.com/chrisyo-22/warehouse_invoice_system'
);
