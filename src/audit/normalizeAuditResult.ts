import { getDepChains } from './getDepChain.js';

interface VulnerabilityInfo {
  name: string;
  severity: 'low' | 'moderate' | 'high' | 'critical';
  via?: Array<any>;
  nodes?: string[];
  [key: string]: any;
}

interface NormalizedPackage {
  name: string;
  severity: 'low' | 'moderate' | 'high' | 'critical';
  problems: any[];
  nodes: string[];
  depChains: string[][];
}

function _normalizeVulnerabilities(auditResult: any) {
  const result = {
    critical: [] as NormalizedPackage[],
    high: [] as NormalizedPackage[],
    moderate: [] as NormalizedPackage[],
    low: [] as NormalizedPackage[],
  };
  for (const key in auditResult.vulnerabilities) {
    const packageInfo: VulnerabilityInfo = auditResult.vulnerabilities[key];
    const normalizedPackage = _normalizePackage(packageInfo);
    if (normalizedPackage) {
      result[normalizedPackage.severity].push(normalizedPackage);
    }
  }
  return result;

  function _normalizePackage(packageInfo: VulnerabilityInfo): NormalizedPackage | null {
    const { via = [] } = packageInfo;
    const validVia = via.filter((it) => typeof it === 'object');
    if (validVia.length === 0) {
      return null;
    }
    const info: NormalizedPackage = {
      name: packageInfo.name,
      severity: packageInfo.severity,
      problems: validVia,
      nodes: packageInfo.nodes || [],
      depChains: [],
    };
    info.depChains = getDepChains(packageInfo as any, auditResult.vulnerabilities);
    // info.depChains = info.depChains.filter(
    //   (chain) => !isInvalidChain(chain, packageInfo.name)
    // );
    return info;
  }
}

export function normalizeAuditResult(auditResult: any) {
  return {
    vulnerabilities: _normalizeVulnerabilities(auditResult),
  };
}
