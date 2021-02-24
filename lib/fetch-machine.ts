export default async function fetchMachine(path: string, urlToken: string, method = 'GET', body?): Promise<any> {

    const headers = new Headers();
    const userPass = urlToken.split('//')[1].split('@')[0];

    headers.append('Authorization', 'Basic ' + btoa(userPass));
    headers.append('Content-Type', 'application/json');

    const response = await fetch(
        urlToken.replace(userPass, '') + path,
        { headers, method, body: body ? JSON.stringify(body) : undefined });

    if (response.status > 400) throw {
        status: response.status,
        statusText: response.statusText
    };

    let result = await response.text();
    try {
        result = JSON.parse(result)
    } catch (error) {

    }

    return result;
}