import { runCommand } from '../common/utils.js';

export async function npmAudit(workDir: string): Promise<any> {
  const cmd = `npm audit --json`;
  const jsonResult = await runCommand(cmd, workDir); // 在工作目录中执行命令
  const auditData = JSON.parse(jsonResult);
  return auditData;
}
