import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);// turn exec to a function that returns a Promise

export function getDirname(url: string): string {
    return dirname(fileURLToPath(url));
}

export function uniqueId(): string {
    // Generate a unique ID using timestamp and random string
    const timestamp = Date.now().toString(36);
    const randomStr = Math.random().toString(36).substring(2, 8);
    return `${timestamp}-${randomStr}`;
}

export async function runCommand(cmd: string, cwd: string): Promise<string> {
  try {
    const result = await execAsync(cmd, {
      cwd,
      encoding: 'utf-8',
    });
    // return audit's JSON result
    return result.stdout.toString();
  } catch (err: any) {
    if (err.stdout) {
      return err.stdout.toString();
    }
    throw err;
  }
}
