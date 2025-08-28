import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);// turn exec to a function that returns a Promise

export function getDirname(url) {
    return dirname(fileURLToPath(url));
}

export function uniqueId() {
    // Generate a unique ID using timestamp and random string
    const timestamp = Date.now().toString(36);
    const randomStr = Math.random().toString(36).substring(2, 8);
    return `${timestamp}-${randomStr}`;
}

export async function runCommand(cmd, cwd) {
  try {
    const stdout = await execAsync(cmd, {
      cwd,
      encoding: 'utf-8',
      stdio: ['ignore', 'pipe', 'pipe'],
    });
    // return audit's JSON result
    return stdout.stdout.toString();
  } catch (err) {
    if (err.stdout) {
      return err.stdout.toString();
    }
    throw err;
  }
}

