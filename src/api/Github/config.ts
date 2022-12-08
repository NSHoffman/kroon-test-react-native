export const GistsConfig = {
  url:
    process.env.GITHUB_GISTS_API_URL ||
    'https://api.github.com/gists/public',

  defaultGistsPerPage: 30,
  maxGistsAllowed: 3000,
};
