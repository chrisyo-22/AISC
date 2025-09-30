import { npmAudit } from "./npmAudit.js";
import { normalizeAuditResult } from "./normalizeAuditResult.js";
import { currentAudit } from "./currentAudit.js";
import type { PackageJson, NormalizedAuditResult } from "../types.js";


export async function audit(workDir: string, packageJson: PackageJson): Promise<NormalizedAuditResult> {
    //1. run npmAudit to get audit result
    const auditResult = await npmAudit(workDir);

    //2. normalize the audit result
    const normalizedResult: any = normalizeAuditResult(auditResult);

    //3. add the current audit result
    const current = await currentAudit(packageJson.name, packageJson.version);
    if (current) {
        const severity = current.severity as 'low' | 'moderate' | 'high' | 'critical';
        normalizedResult.vulnerabilities[severity].unshift(current);
    }
    // add summary information
    normalizedResult.summary = {
        total: Object.values(normalizedResult.vulnerabilities).reduce(
            (sum: number, arr: any) => sum + arr.length,
            0
        ),
        critical: normalizedResult.vulnerabilities.critical.length,
        high: normalizedResult.vulnerabilities.high.length,
        moderate: normalizedResult.vulnerabilities.moderate.length,
        low: normalizedResult.vulnerabilities.low.length,
    };
    return normalizedResult as NormalizedAuditResult;

}
