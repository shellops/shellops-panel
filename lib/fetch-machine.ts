export default async function fetchMachine(path: string, urlToken: string) {

    const headers = new Headers();
    const userPass = urlToken.split('//')[1].split('@')[0];

    headers.append('Authorization', 'Basic ' + btoa(userPass));

    const response = await fetch(urlToken.replace(userPass, '') + path, { headers });

    if (response.status > 400) throw {
        status: response.status,
        statusText: response.statusText
    };

    return response.json();
}