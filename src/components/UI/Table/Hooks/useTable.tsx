"use client";

import { useEffect, useState } from "react";
import { IMeta } from "../types/table.types";
import { IResponseAxios, ISearch, ISort } from "@/types/AxiosConfig.type";
import { useQuery } from "react-query";

export interface IUseTableHookProps<T = any> {
  api: (params: any) => Promise<IResponseAxios<T[]>>;
  initialPage: number;
  initialSearchs?: ISearch<T>;
  initialSorts?: ISort<T>;
  enable: boolean;
}

function useTable<T>({
  api,
  initialPage = 1,
  initialSearchs = {},
  initialSorts = {},
  enable,
}: IUseTableHookProps<T>) {
  const [meta, setMeta] = useState<IMeta>({
    current_page: 1,
    from: 1,
    last_page: 1,
    per_page: 1,
    to: 1,
    total: 1,
  });

  const [currentPage, setCurrentPage] = useState(initialPage);

  const [params, setParams] = useState<any>({});

  const [searchs, setSearchs] = useState<ISearch<T>>(initialSearchs);

  const [sorts, setSorts] = useState<ISort<T>>(initialSorts);

  const [cachUUID, setCachUUID] = useState(crypto.randomUUID());

  const generateSorts = () => {
    const urlsSearchParams = new URLSearchParams(sorts as any);
    return urlsSearchParams.toString().replace("=", ":");
  };

  const { data, refetch, isLoading } = useQuery(
    [cachUUID, currentPage, sorts, searchs, params],
    {
      queryFn: async () => {
        const { data, meta } = await api({
          ...params,
          page: currentPage || 1,
          per_page: 14,
          ...searchs,
          sorts: generateSorts(),
        });
        setMeta(meta);
        return data;
      },
      enabled: enable,
    },
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchs, sorts]);

  const nextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  return {
    data: (data as T[]) || [],
    meta,
    currentPage,
    isLoading,
    forceRefresh: refetch,
    nextPage,
    setCurrentPage,
    setParams,
    searchs,
    setSearchs,
    sorts,
    setSorts,
    params,
  };
}

export default useTable;
