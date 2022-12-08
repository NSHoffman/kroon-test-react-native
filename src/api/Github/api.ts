import { BaseGistDTO } from './dto';
import { GithubGistsFetchError } from './error';
import { GistsConfig } from './config';
import { GetGistsQueryParams } from './types';
import { getQueryParamsString } from './utils';

export const getGists = async (
  params: GetGistsQueryParams,
): Promise<BaseGistDTO[]> => {
  const url = `${
    GistsConfig.url
  }?${getQueryParamsString<GetGistsQueryParams>(params)}`;

  const response = await fetch(url, {
    headers: {
      accept: 'application/vnd.github+json',
    },
  });

  if (response.status !== 200) {
    throw new GithubGistsFetchError(
      `Failed to fetch Github gists. Status: ${response.status}`,
    );
  }

  const gists = await response.json();

  return gists as BaseGistDTO[];
};
