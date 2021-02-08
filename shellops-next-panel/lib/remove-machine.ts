export default function removeMachine(urlToken: string, urlTokensChange: any) {

    const currenturls = JSON.parse(localStorage.getItem('urlTokens') || null) || [];
    const updatedTokens = currenturls.filter(p => p !== urlToken);
    localStorage.setItem('urlTokens', JSON.stringify(updatedTokens));

    urlTokensChange(updatedTokens);
}