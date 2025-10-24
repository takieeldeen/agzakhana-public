import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";

export type UseQueryParamsProps = {
  defaultParams?: { [prop: string]: string };
};
export const useQueryParams = ({ defaultParams }: UseQueryParamsProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [currentSearchParams, setCurrentSearchParams] = useState<string>(
    `?${new URLSearchParams(searchParams?.toString())?.toString()}`
  );

  const dirtyParams = useMemo(
    () =>
      defaultParams
        ? Object.keys(defaultParams).filter(
            (paramName) =>
              searchParams.get(paramName) !== defaultParams?.[paramName]
          )
        : [],
    [defaultParams, searchParams]
  );

  const isDirty = dirtyParams.length > 0;

  const navigate = useCallback(
    (path?: string) => {
      router.replace(path ?? currentSearchParams);
    },
    [currentSearchParams, router]
  );

  const setParams = useCallback(
    (params: { [paramName: string]: string }) => {
      const url = new URLSearchParams(searchParams?.toString());
      Object.keys(params).forEach((paramName) => {
        url.set(paramName, params[paramName]);
      });
      setCurrentSearchParams(`?${url.toString()}`);
    },
    [searchParams]
  );

  const hasParam = useCallback(
    (paramName: string) => {
      return !!searchParams.get(paramName);
    },
    [searchParams]
  );
  const hasParams = useCallback(
    (paramName: string[]) => {
      return paramName.every((param) => !!searchParams.get(param));
    },
    [searchParams]
  );

  const resetParam = useCallback(
    (paramName: keyof typeof defaultParams) => {
      const url = new URLSearchParams(searchParams?.toString());
      if (!!defaultParams) {
        url.set(paramName, defaultParams[paramName]);
        setCurrentSearchParams(`?${url.toString()}`);
      } else {
        return;
      }
    },
    [defaultParams, searchParams]
  );

  const resetParams = useCallback(() => {
    const url = new URLSearchParams();
    if (defaultParams) {
      Object.keys(defaultParams).forEach((paramName) => {
        url.set(paramName, defaultParams[paramName]);
      });
    }
    // router.replace(`?${url.toString()}`);
    setCurrentSearchParams(`?${url.toString()}`);
  }, [defaultParams]);
  const memoizedValue = useMemo(
    () => ({
      isDirty,
      dirtyParams,
      currentSearchParams,
      setParams,
      hasParam,
      hasParams,
      resetParam,
      resetParams,
      navigate,
    }),
    [
      currentSearchParams,
      dirtyParams,
      hasParam,
      hasParams,
      isDirty,
      navigate,
      resetParam,
      resetParams,
      setParams,
    ]
  );

  return memoizedValue;
};
