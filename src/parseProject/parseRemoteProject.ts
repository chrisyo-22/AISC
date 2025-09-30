import type { GitHubInfo, PackageJson } from '../types.js';

function parseGithubUrl(url: string): GitHubInfo {
    try {

        const parsedUrl = new URL(url);

        //make sure it's a github url
        if (parsedUrl.hostname !== 'github.com') {
            throw new Error(`Invalid GitHub URL: ${url}`);
        }
        const parts = parsedUrl.pathname.split('/').filter(Boolean);

        if (parts.length < 2) {
            throw new Error(`Invalid GitHub URL: ${url}`);
        }

        const owner = parts[0];
        const repo = parts[1];
        const restPath = parts.slice(2);

        //const path

        const path = restPath.length > 0 ? restPath.join('/') : '';

        return { owner, repo, path };
    } catch (e) {
        throw new Error(`Invalid GitHub URL: ${url}`);
    }


}



async function getPackageJsonUrl(gitInfo: GitHubInfo): Promise<string> {
    let { owner, repo, path } = gitInfo;
    if (path.startsWith('/tree/')) {
        const pathParts = path.split('/').filter(Boolean);
        path = `tags/${pathParts[1]}`;
    } else {
        const url = `https://api.github.com/repos/${owner}/${repo}`;
        const info: any = await fetch(url).then((res) => res.json());
        path = `heads/${info.default_branch}`;
    }
    return `https://raw.githubusercontent.com/${owner}/${repo}/${path}/package.json`;
}


export async function parseRemoteProject(githubUrl: string): Promise<PackageJson> {
    try {
        // Parse the GitHub URL to extract owner, repo, and path
        const gitInfo = parseGithubUrl(githubUrl);
        
        // Get the raw package.json URL based on the parsed info
        const packageJsonUrl = await getPackageJsonUrl(gitInfo);
        
        // Fetch the package.json content
        const response = await fetch(packageJsonUrl);
        
        if (!response.ok) {
            throw new Error(`Failed to fetch package.json: ${response.status} ${response.statusText}`);
        }
        
        const packageJsonText = await response.text();
        
        // Parse and return the JSON
        return JSON.parse(packageJsonText);
        
    } catch (error) {
        if (error instanceof SyntaxError) {
            throw new Error('Invalid JSON in package.json file');
        }
        throw error;
    }
}
