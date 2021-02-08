export default function saveMachine(newToken: string, urlTokensChange: any) {


    const currentUrls: string[] = JSON.parse(localStorage.getItem('urlTokens') || null) || [];

    console.log( currentUrls)
    currentUrls.push(newToken);
    console.log( currentUrls,JSON.stringify(currentUrls))

    localStorage.setItem('urlTokens', JSON.stringify(currentUrls));

    urlTokensChange(currentUrls);

}