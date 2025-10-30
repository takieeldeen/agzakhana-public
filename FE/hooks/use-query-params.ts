import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { UseFormSetValue } from "react-hook-form";

// Generic mapped type for key-value mapping functions
type ValueMappingOptions<T extends Record<string, string>> = {
  [K in keyof T]?: (paramValue: string | undefined) => any;
};

export type UseQueryParamsProps<
  T extends Record<string, string> = Record<string, string>
> = {
  defaultParams?: T;
  setValue?: UseFormSetValue<any>;
};

export function useQueryParams<
  T extends Record<string, string> = Record<string, string>
>({ defaultParams, setValue }: UseQueryParamsProps<T>) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [currentSearchParams, setCurrentSearchParams] = useState<string>(
    `?${new URLSearchParams(searchParams?.toString()).toString()}`
  );

  // detect dirty params
  const dirtyParams = useMemo(() => {
    if (!defaultParams) return [];
    return Object.keys(defaultParams).filter(
      (paramName) => searchParams.get(paramName) !== defaultParams[paramName]
    );
  }, [defaultParams, searchParams]);

  const isDirty = dirtyParams.length > 0;

  // Navigation helper
  const navigate = useCallback(
    (path?: string) => {
      router.replace(path ?? currentSearchParams);
    },
    [currentSearchParams, router]
  );

  // Update multiple params
  const setParams = useCallback(
    (params: Record<string, string>) => {
      const url = new URLSearchParams(searchParams?.toString());
      Object.entries(params).forEach(([key, value]) => {
        url.set(key, value);
      });
      setCurrentSearchParams(`?${url.toString()}`);
    },
    [searchParams]
  );

  const getAllParams = useCallback(() => {
    const params: Record<string, string> = {};
    searchParams.forEach((value, key) => {
      params[key] = value;
    });
    return params;
  }, [searchParams]);

  const hasParam = useCallback(
    (paramName: string) => !!searchParams.get(paramName),
    [searchParams]
  );

  const hasParams = useCallback(
    (paramNames: string[]) => paramNames.every((p) => !!searchParams.get(p)),
    [searchParams]
  );

  const resetParam = useCallback(
    (paramName: keyof T) => {
      if (!defaultParams) return;
      const url = new URLSearchParams(searchParams?.toString());
      url.set(paramName as string, defaultParams[paramName]);
      setCurrentSearchParams(`?${url.toString()}`);
    },
    [defaultParams, searchParams]
  );

  const resetParams = useCallback(() => {
    const url = new URLSearchParams();
    if (defaultParams) {
      Object.entries(defaultParams).forEach(([key, value]) => {
        url.set(key, value);
      });
    }
    router.replace(`?${url.toString()}`);
    setCurrentSearchParams(`?${url.toString()}`);
  }, [defaultParams, router]);

  const initParams = useCallback(() => {
    const url = new URLSearchParams(searchParams?.toString());
    if (!defaultParams) return;
    Object.entries(defaultParams).forEach(([key, value]) => {
      const previousVal = url.get(key);
      const NO_PREV_VAL = previousVal === null;
      if (NO_PREV_VAL && !!value) url.set(key, value);
    });
    router.replace(`?${url.toString()}`);
  }, [defaultParams, router, searchParams]);

  const syncParams = useCallback(
    (valueMappingOptions?: ValueMappingOptions<any>) => {
      if (!setValue || !defaultParams) return;
      const allParams = getAllParams();
      Object.keys(allParams).forEach((paramName) => {
        const val = searchParams.get(paramName);
        const mapper = valueMappingOptions?.[paramName as keyof T];
        const mappedVal = mapper ? mapper(val ?? undefined) : val;
        if (mappedVal) setValue(paramName, mappedVal, { shouldDirty: true });
      });
    },
    [defaultParams, getAllParams, searchParams, setValue]
  );
  const syncParam = useCallback(
    (paramName: string, mapper?: (value: string | undefined) => any) => {
      if (!setValue) return;

      const val = searchParams.get(paramName);
      const mappedVal = mapper ? mapper(val ?? undefined) : val;
      if (mappedVal) setValue(paramName, mappedVal, { shouldDirty: true });
    },
    [searchParams, setValue]
  );

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
      initParams,
      navigate,
      getAllParams,
      syncParams,
      syncParam,
    }),
    [
      isDirty,
      dirtyParams,
      currentSearchParams,
      setParams,
      hasParam,
      hasParams,
      resetParam,
      resetParams,
      initParams,
      navigate,
      getAllParams,
      syncParams,
      syncParam,
    ]
  );

  return memoizedValue;
}
