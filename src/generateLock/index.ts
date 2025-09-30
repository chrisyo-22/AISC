import fs from 'fs';
import path from 'path';
import { runCommand } from '../common/utils.js';
import type { PackageJson } from '../types.js';

function sanitizePackageJson(packageJson: PackageJson): PackageJson {
    // Remove link: dependencies that can't be resolved remotely
    const sanitized = { ...packageJson };
    
    ['dependencies', 'devDependencies', 'optionalDependencies', 'peerDependencies'].forEach(depType => {
        if (sanitized[depType as keyof PackageJson]) {
            const deps = sanitized[depType as keyof PackageJson] as Record<string, string>;
            sanitized[depType as keyof PackageJson] = Object.fromEntries(
                Object.entries(deps).filter(([_, version]) => !version.startsWith('link:'))
            ) as any;
        }
    });
    
    return sanitized;
}

async function writePackageJson(workDir: string, packageJson: PackageJson): Promise<void> {
    const packageJsonPath = path.join(workDir, 'package.json');
    const sanitized = sanitizePackageJson(packageJson);
    const packageJsonString = JSON.stringify(sanitized, null, 2);
    await fs.promises.writeFile(packageJsonPath, packageJsonString, 'utf-8');
}



async function createLockFile(workDir: string): Promise<void> {
    const cmd = `npm install --package-lock-only --legacy-peer-deps`;
    await runCommand(cmd, workDir);
}

export async function generateLock(workDir: string, packageJson: PackageJson): Promise<void> {
    //1. write package.json to the work directory
    await writePackageJson(workDir, packageJson);

    //2. create a lock file
    await createLockFile(workDir);

}
