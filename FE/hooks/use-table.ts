import { useMemo, useState, useEffect, useCallback } from "react";

// ----------------------------------------------------------------------

export type TableProps = {
  dense: boolean;
  page: number;
  rowsPerPage: number;
  order: "asc" | "desc";
  orderBy: string;
  filters: { [filter: string]: any };
  isLoading: boolean;
  loadingDependencies: { [dependency: string]: boolean };
  //
  selected: any[];
  onSelectRow: (id: any) => void;
  onSelectAllRows: (checked: boolean, newSelecteds: any[]) => void;
  //
  onResetPage: VoidFunction;
  onSort: (id: string) => void;
  onChangePage: (event: unknown, newPage: number) => void;
  onChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeDense: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onUpdatePageDeleteRow: (totalRowsInPage: number) => void;
  onUpdatePageDeleteRows: ({
    totalRowsInPage,
    totalRowsFiltered,
  }: {
    totalRowsInPage: number;
    totalRowsFiltered: number;
  }) => void;
  //
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setDense: React.Dispatch<React.SetStateAction<boolean>>;
  setOrder: React.Dispatch<React.SetStateAction<"desc" | "asc">>;
  setOrderBy: React.Dispatch<React.SetStateAction<string>>;
  setSelected: React.Dispatch<React.SetStateAction<any[]>>;
  setRowsPerPage: React.Dispatch<React.SetStateAction<number>>;
  setFilters: React.Dispatch<React.SetStateAction<{ [filter: string]: any }>>;
  setLoadingDependencies: React.Dispatch<
    React.SetStateAction<{ [filter: string]: boolean }>
  >;
};

// ----------------------------------------------------------------------

type ReturnType = TableProps;

export type UseTableProps = {
  defaultDense?: boolean;
  defaultOrder?: "asc" | "desc";
  defaultOrderBy?: string;
  defaultSelected?: any[];
  defaultRowsPerPage?: number;
  defaultCurrentPage?: number;
  defaultFilters?: { [filter: string]: any };
  defaultLoadingDependencies?: { [dependency: string]: boolean };
};

export default function useTable(props?: UseTableProps): ReturnType {
  const [dense, setDense] = useState(!!props?.defaultDense);

  const [page, setPage] = useState(props?.defaultCurrentPage || 0);

  const [orderBy, setOrderBy] = useState(props?.defaultOrderBy || "unkown");

  const [rowsPerPage, setRowsPerPage] = useState(
    props?.defaultRowsPerPage || 5
  );

  const [order, setOrder] = useState<"asc" | "desc">(
    props?.defaultOrder || "asc"
  );

  const [selected, setSelected] = useState<any[]>(props?.defaultSelected || []);

  const [filters, setFilters] = useState<{ [filter: string]: any }>(
    props?.defaultFilters || {}
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingDependencies, setLoadingDependencies] = useState<{
    [dependency: string]: boolean;
  }>(props?.defaultLoadingDependencies || {});

  // const tableLoading = tableLoadingArray.every((loadingDependency) => loadingDependency);
  const onSort = useCallback(
    (id: string) => {
      const isAsc = orderBy === id && order === "asc";
      if (id !== "") {
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(id);
      }
    },
    [order, orderBy]
  );

  const onSelectRow = useCallback(
    (inputValue: any) => {
      const exists = selected.find((el) => el?.id === inputValue?.id);
      const newSelected = exists
        ? selected.filter((value) => value?.id !== inputValue?.id)
        : [...selected, inputValue];

      setSelected(newSelected);
    },
    [selected]
  );

  const onChangeRowsPerPage = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setPage(0);
      setRowsPerPage(parseInt(event.target.value, 10));
    },
    []
  );

  const onChangeDense = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setDense(event.target.checked);
    },
    []
  );

  const onSelectAllRows = useCallback(
    (checked: boolean, inputValue: any[]) => {
      const uniqueSet = new Set([
        ...inputValue.map((obj) => JSON.stringify(obj)),
        ...selected.map((obj) => JSON.stringify(obj)),
      ]);

      const uniqueArray = Array.from(uniqueSet).map((str) => JSON.parse(str));
      if (checked) {
        // let uniqueValues = [...selected, ...inputValue];
        setSelected(uniqueArray);
        return;
      }
      setSelected(
        selected.filter(
          (value) => !inputValue.find((el) => el?.id === value?.id)
        )
      );
    },
    [selected]
  );

  const onChangePage = useCallback((event: unknown, newPage: number) => {
    setPage(newPage);
  }, []);

  const onResetPage = useCallback(() => {
    setPage(0);
  }, []);

  const onUpdatePageDeleteRow = useCallback(
    (totalRowsInPage: number) => {
      setSelected([]);
      if (page) {
        if (totalRowsInPage < 2) {
          setPage(page - 1);
        }
      }
    },
    [page]
  );

  const onUpdatePageDeleteRows = useCallback(
    ({
      totalRowsInPage,
      totalRowsFiltered,
    }: {
      totalRowsInPage: number;
      totalRowsFiltered: number;
    }) => {
      const totalSelected = selected.length;

      setSelected([]);

      if (page) {
        if (totalSelected === totalRowsInPage) {
          setPage(page - 1);
        } else if (totalSelected === totalRowsFiltered) {
          setPage(0);
        } else if (totalSelected > totalRowsInPage) {
          const newPage =
            Math.ceil((totalRowsFiltered - totalSelected) / rowsPerPage) - 1;

          setPage(newPage);
        }
      }
    },
    [page, rowsPerPage, selected.length]
  );

  useEffect(() => {
    setIsLoading(
      Object?.values?.length > 0
        ? Object?.values?.(loadingDependencies)?.some(
            (dependency) => dependency
          )
        : false
    );
  }, [loadingDependencies]);
  const memoizedValues = useMemo(
    () => ({
      isLoading,
      dense,
      order,
      page,
      orderBy,
      rowsPerPage,
      filters,
      loadingDependencies,
      //
      selected,
      onSelectRow,
      onSelectAllRows,
      //
      onSort,
      onChangePage,
      onChangeDense,
      onResetPage,
      onChangeRowsPerPage,
      onUpdatePageDeleteRow,
      onUpdatePageDeleteRows,
      //
      // setIsLoading,
      setLoadingDependencies,
      setPage,
      setFilters,
      setDense,
      setOrder,
      setOrderBy,
      setSelected,
      setRowsPerPage,
    }),
    [
      dense,
      filters,
      isLoading,
      loadingDependencies,
      onChangeDense,
      onChangePage,
      onChangeRowsPerPage,
      onResetPage,
      onSelectAllRows,
      onSelectRow,
      onSort,
      onUpdatePageDeleteRow,
      onUpdatePageDeleteRows,
      order,
      orderBy,
      page,
      rowsPerPage,
      selected,
    ]
  );
  return memoizedValues;
}
