import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';
import { auditPackage } from './entry/index.js';

// Create server instance
const server = new McpServer({
  name: 'audit-server',
  title: 'Frontend Engineer Security Audit Service',
  version: '0.1.0',
});

server.registerTool(
  'auditPackage',
  {
    title: 'Audit Frontend Project',
    description:
      'Audit all direct and indirect dependencies of the frontend project, and get the security audit result. Support local project audit, and also support remote repository audit. The audit result is a standard format markdown string, no need to modify, directly used for display.',
    inputSchema: {
      projectRoot: z
        .string()
        .describe('The root path of the local project, or the URL address of the remote repository'),
      savePath: z
        .string()
        .describe(
          'The path to save the audit result, pass the audit.md file under the root path of the current project, if there is no current project, pass the audit.md file under the desktop path (note that the desktop path must be passed in absolute path)'
        ),
    },
  },
  async ({ projectRoot, savePath }: { projectRoot: string; savePath: string }) => {
    await auditPackage(projectRoot, savePath);
    return {
      content: [
        {
          type: 'text' as const,
          text: `Audit completed, the result has been saved to: ${savePath}`,
        },
      ],
    };
  }
);


const transport = new StdioServerTransport();
server.connect(transport);
