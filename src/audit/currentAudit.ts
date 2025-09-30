import { remoteAudit } from './remoteAudit.js';

type SeverityLevel = 'info' | 'low' | 'moderate' | 'high' | 'critical';

const severityLevelsMap: Record<SeverityLevel, number> = {
  info: 0,
  low: 1,
  moderate: 2,
  high: 3,
  critical: 4,
};

interface Advisory {
  id: number;
  title: string;
  url: string;
  severity: SeverityLevel;
  cwe: string;
  cvss: any;
  vulnerable_versions: string;
}

// add the current project's audit result
export async function currentAudit(name: string, version: string): Promise<any | null> {
  // 1. call remoteAudit function to get audit result
  const auditResult = await remoteAudit(name, version);

  // 2. normalize audit result
  if (
    !auditResult.advisories ||
    Object.keys(auditResult.advisories).length === 0
  ) {
    return null;
  }
  const result: any = {
    name,
    range: version,
    nodes: ['.'],
    depChains: [],
  };
  const advisories: Advisory[] = Object.values(auditResult.advisories);
  let maxSeverity: SeverityLevel = 'info';
  result.problems = advisories.map((advisory) => {
    const problem = {
      source: advisory.id,
      name,
      dependency: name,
      title: advisory.title,
      url: advisory.url,
      severity: advisory.severity,
      cwe: advisory.cwe,
      cvss: advisory.cvss,
      range: advisory.vulnerable_versions,
    };
    // update the max severity
    if (severityLevelsMap[problem.severity] > severityLevelsMap[maxSeverity]) {
      maxSeverity = problem.severity;
    }
    return problem;
  });
  result.severity = maxSeverity;
  return result;
}
