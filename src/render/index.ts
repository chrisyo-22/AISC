import { renderMarkdown } from './markdown.js';
import type { NormalizedAuditResult, PackageJson } from '../types.js';

const desc = {
  severityLevels: {
    low: 'Low',
    moderate: 'Moderate',
    high: 'High',
    critical: 'Critical',
  },
};

/**
 * Render auditResult to markdown string
 * @param {object} auditResult standardized audit result
 * @param {object} packageJson package.json content
 */
export async function render(auditResult: NormalizedAuditResult, packageJson: PackageJson): Promise<string> {
  const data = {
    audit: auditResult,
    desc,
    packageJson,
  };
  return await renderMarkdown(data);
}
