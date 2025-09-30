export interface PackageJson {
  name: string;
  version: string;
  description?: string;
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
  [key: string]: any;
}

export interface GitHubInfo {
  owner: string;
  repo: string;
  path: string;
}

export interface Vulnerability {
  name: string;
  severity: 'low' | 'moderate' | 'high' | 'critical';
  title: string;
  url: string;
  dependency: string;
  dependencyChain?: string[];
  range?: string;
  fixedIn?: string;
}

export interface AuditSummary {
  total: number;
  critical: number;
  high: number;
  moderate: number;
  low: number;
}

export interface NormalizedAuditResult {
  vulnerabilities: {
    critical: Vulnerability[];
    high: Vulnerability[];
    moderate: Vulnerability[];
    low: Vulnerability[];
  };
  summary?: AuditSummary;
}
