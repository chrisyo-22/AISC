const URL = "https://registry.npmjs.org/-/npm/v1/security/audits";

export async function remoteAudit(packageName, packageVersion) {
    const body = {
        name: 'example-audit',
        version: '1.0.0',
        requires: {
            [packageName]: packageVersion,
        },
        dependencies: {
            [packageName]: {
                version: packageVersion,
            },
        },
    }
    const resp = await fetch(URL, {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',

        },
        body: JSON.stringify(body),
    })

    return await resp.json();
}