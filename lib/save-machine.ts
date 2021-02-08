export default function saveMachine(newToken: string, urlTokensChange: any) {


    const currentUrls: string[] = JSON.parse(localStorage.getItem('urlTokens') || null) || [];

    currentUrls.push(newToken);

    localStorage.setItem('urlTokens', JSON.stringify(currentUrls));

    urlTokensChange(currentUrls);

}