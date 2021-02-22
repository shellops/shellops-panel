export function getUrlTokens(): string[] {
  return JSON.parse(global.localStorage?.getItem("urlTokens") || "[]")
}
