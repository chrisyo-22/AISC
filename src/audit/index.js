import { npmAudit } from "./npmAudit.js";
import { normalizeAuditResult } from "./normalizeAuditResult.js";
import { currentAudit } from "./currentAudit.js";


export async function audit(workDir, packageJson) {
    //1. run npmAudit to get audit result
    const auditResult = await npmAudit(workDir);

    //2. normalize the audit result
    const normalizedResult = normalizeAuditResult(auditResult);

    //3. add the current audit result
    const current = await currentAudit(packageJson.name, packageJson.version);
    if (current) {
        normalizedResult.vulnerabilities[current.severity].unshift(current);
    }
    // add summary information
    normalizedResult.summary = {
        total: Object.values(normalizedResult.vulnerabilities).reduce(
            (sum, arr) => sum + arr.length,
            0
        ),
        critical: normalizedResult.vulnerabilities.critical.length,
        high: normalizedResult.vulnerabilities.high.length,
        moderate: normalizedResult.vulnerabilities.moderate.length,
        low: normalizedResult.vulnerabilities.low.length,
    };
    return normalizedResult;

}