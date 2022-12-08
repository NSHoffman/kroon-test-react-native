import { GistsConfig } from './config';

export const getQueryParamsString = <
  P extends Record<string, unknown> = {},
>(
  params: P,
): string => {
  const urlParams = new URLSearchParams();

  Object.entries(params).forEach(param => {
    urlParams.append(param[0], String(param[1]));
  });

  return urlParams.toString();
};

export const createGetGistsQueryParams = (
  page: number = 1,
  perPage: number = GistsConfig.defaultGistsPerPage,
  since?: string,
) => ({
  page,
  per_page: perPage,
  ...(since ? { since } : undefined),
});
