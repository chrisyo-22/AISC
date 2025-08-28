import { renderMarkdown } from './markdown.js';

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
export async function render(auditResult, packageJson) {
  const data = {
    audit: auditResult,
    desc,
    packageJson,
  };
  return await renderMarkdown(data);
}
