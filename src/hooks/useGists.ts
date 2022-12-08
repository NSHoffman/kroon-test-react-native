import { useState, useEffect, useCallback } from 'react';

import { BaseGistDTO, getGists, GistsConfig } from '../api/Github';
import { createGetGistsQueryParams } from '../api/Github/utils';
import { filterUniqueById } from '../utils';

type UseGistsInput = {
  per_page?: number;
  since?: string;
};

type UseGistsOutput = {
  data: Array<BaseGistDTO>;
  error: unknown;
  isLoading: boolean;
  isFetchingNextPage: boolean;
  hasNextPage: boolean | undefined;

  fetchNextPage: () => void;
};

export const useGists = (args: UseGistsInput = {}): UseGistsOutput => {
  const gistsPerPage = args.per_page ?? GistsConfig.defaultGistsPerPage;

  const [page, setPage] = useState(1);
  const [gists, setGists] = useState<BaseGistDTO[]>([]);
  const [isFetching, setFetching] = useState(false);
  const [error, setError] = useState<unknown>(null);

  const isLoading = isFetching && page === 1;
  const isFetchingNextPage = isFetching && page > 1;

  const hasNextPage =
    gists.length + gistsPerPage <= GistsConfig.maxGistsAllowed;

  const fetchNextPage = useCallback(async () => {
    setFetching(true);

    try {
      const pendingPages = [];

      for (let p = 1; p <= page; p++) {
        const pendingPage = getGists(
          createGetGistsQueryParams(p, gistsPerPage, args.since),
        );
        pendingPages.push(pendingPage);
      }

      const fetchedPages = await Promise.all(pendingPages);

      const gistsList = fetchedPages.flatMap(p => p);
      const uniqueGistsList = filterUniqueById<BaseGistDTO>(gistsList);

      setGists(uniqueGistsList);
      setPage(currentPage => currentPage + 1);
    } catch (e) {
      setError(e);
    } finally {
      setFetching(false);
    }
  }, [args.since, gistsPerPage, page]);

  useEffect(() => {
    fetchNextPage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    data: gists,
    error,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  };
};
