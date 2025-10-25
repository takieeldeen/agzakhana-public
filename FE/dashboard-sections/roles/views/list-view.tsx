"use client";
import * as Z from "zod";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useCallback, useEffect, useMemo, useState } from "react";
import ListTableRow from "../list-table-row";
import { useTranslations } from "next-intl";
import TableToolbar from "../table-toolbar";
import GridTableRow from "../grid-table-row";
import DashboardPagination from "@/components/dashboard-pagination";
import { useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import ListSkeletonView from "./skeleton-view";
import EmptyView from "./empty-view";
import NoResultsView from "@/components/no-results";
import { useResponsive } from "@/hooks/use-responsive";
import { useForm } from "react-hook-form";
import RHFForm from "@/components/rhf-form";
import { useDebounce } from "@/hooks/use-debounce";
import { useGetRoles } from "@/app/dashboard-api/roles";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  DEFAULT_PAGE_SIZE,
  LIST_COUNT,
  ORDER_BY_OPTIONS,
  ORDER_DIR_OPTIONS,
} from "../constants";
import { useQueryParams } from "@/hooks/use-query-params";

export default function ListView() {
  const mdUp = useResponsive("up", "md");
  // State Management ////////////////////////////////////
  const [filtersSynced, setFiltersSynced] = useState<boolean>(false);
  // const [filtersLoaded,set]
  const [viewMode, setViewMode] = useState<"LIST" | "GRID">(
    !mdUp ? "GRID" : "LIST"
  );
  // Custom Hooks ////////////////////////////////////
  const t = useTranslations();
  const router = useRouter();
  const searchParams = useSearchParams();
  const defaultParams = useMemo(
    () => ({
      page: "1",
      size: DEFAULT_PAGE_SIZE?.toString(),
    }),
    []
  );
  console.log("rerendered");

  // Filters /////////////////////////////////////////////
  const filtersSchema = Z.object({
    name: Z.string(),
    status: Z.string().nullable(),
    sort: Z.object({
      _id: Z.string(),
      nameAr: Z.string(),
      nameEn: Z.string(),
      value: Z.string(),
    }).nullable(),
    permission: Z.object({
      _id: Z.string(),
      nameAr: Z.string(),
      nameEn: Z.string(),
    }).nullable(),
    dir: Z.object({
      _id: Z.string(),
      nameAr: Z.string(),
      nameEn: Z.string(),
      value: Z.string(),
    }).nullable(),
    size: Z.number(),
  });
  const defaultValues = useMemo(
    () => ({
      name: "",
      status: null,
      sort: null,
      permission: null,
      dir: null,
      size: DEFAULT_PAGE_SIZE,
    }),
    []
  );

  const methods = useForm({
    defaultValues,
    resolver: zodResolver(filtersSchema),
  });
  const {
    watch,
    formState: { dirtyFields },
    setValue,
  } = methods;
  const { initParams, syncParams } = useQueryParams({
    defaultParams,
    setValue,
  });
  const filtervalues = watch();
  const debouncedSearch = useDebounce(filtervalues?.name, 1000);
  const filters = useMemo(
    () => ({
      name: debouncedSearch,
      status: filtervalues?.status,
      sort: filtervalues?.sort?.value ?? null,
      permissions: searchParams?.get("permission") ?? null,
    }),
    [
      debouncedSearch,
      filtervalues?.sort?.value,
      filtervalues?.status,
      searchParams,
    ]
  );
  console.log(filtervalues);
  // Helper Constants ////////////////////////////////////////
  const GRID_MODE = viewMode === "GRID";
  const LIST_MODE = viewMode === "LIST";
  const page = +(searchParams.get("page") ?? 0);
  const onSubmit = useCallback((data: any) => {
    console.log(data);
  }, []);
  // Data Fetching Hooks ////////////////////////////////////
  const { data, isLoading, isFetching, results } = useGetRoles(
    filtervalues.size,
    page,
    filters,
    { enabled: filtersSynced }
  );
  const canReset = Object.values(dirtyFields).length > 0;
  const notFound = canReset && results === 0;
  const isEmpty = !canReset && results === 0;
  // LifeCycle Hooks ////////////////////////////////////////
  useEffect(() => {
    initParams();
  }, [initParams]);

  useEffect(() => {
    if (filtersSynced) return;
    syncParams({
      sort: (val: any) => ORDER_BY_OPTIONS?.find((opt) => opt?.value === val),
      dir: (val: any) => ORDER_DIR_OPTIONS?.find((opt) => opt?.value === val),
      size: (val: any) => LIST_COUNT?.find((opt) => opt === val) ?? "9",
      permission: () => null,
    });

    setFiltersSynced(true);
  }, [filtersSynced, searchParams, setValue, syncParams]);
  if (isLoading) return <ListSkeletonView />;
  if (isEmpty)
    return (
      <EmptyView
        icon="solar:key-broken"
        title={t("COMMON.EMPTY_TITLE", {
          ENTITY_NAME: t("ROLES_MANAGEMENT.ENTITY_NAME"),
        })}
        subtitle={t("COMMON.EMPTY_SUBTITLE", {
          ENTITY_NAME: t("ROLES_MANAGEMENT.ENTITY_NAME"),
        })}
        action={() => {
          console.log("Hello World");
        }}
        actionTitle={t("COMMON.CREATE", {
          ENTITY_NAME: t("ROLES_MANAGEMENT.ENTITY_NAME"),
        })}
      />
    );
  return (
    <div className="flex flex-col gap-3 h-full">
      {/* Title Bar */}
      <div className="flex md:flex-row flex-col md:gap-0 gap-2  justify-between md:sticky relative md:top-0 bg-slate-50 pt-2 z-20 dark:bg-dark-background">
        <div className="flex flex-col">
          <h3 className="text-3xl font-bold dark:text-white">
            {t("ROLES_MANAGEMENT.LIST_TITLE")}
          </h3>
          <p className="dark:text-gray-200">
            {t("ROLES_MANAGEMENT.LIST_SUBTITLE")}
          </p>
        </div>
        <div className="flex flex-row gap-2">
          {mdUp && (
            <div className="h-12 bg-gray-200 rounded-md dark:bg-dark-card ml-auto rtl:ml-0 rtl:mr-auto">
              <Button
                className={cn(
                  "w-12 p-0 h-full bg-gray-200 dark:bg-dark-card border-2 border-transparent  transition-all duration-300",
                  viewMode === "GRID" && "border-emerald-600"
                )}
                onClick={() => setViewMode("GRID")}
              >
                <Icon
                  icon="mingcute:grid-fill"
                  className={cn(
                    "text-black h-6! w-6! transition-all duration-300 dark:text-white",
                    viewMode === "GRID" &&
                      "text-emerald-600 dark:text-emerald-600"
                  )}
                />
              </Button>
              <Button
                className={cn(
                  "w-12 p-0 h-full bg-gray-200 dark:bg-dark-card border-2 border-transparent transition-all duration-300",
                  viewMode === "LIST" && "border-emerald-600"
                )}
                onClick={() => setViewMode("LIST")}
              >
                <Icon
                  icon="f7:menu"
                  className={cn(
                    "text-black h-6! w-6! transition-all duration-300 dark:text-white",
                    viewMode === "LIST" &&
                      "text-emerald-600 dark:text-emerald-600"
                  )}
                />
              </Button>
            </div>
          )}
          <Button className="bg-emerald-600 h-12 text-sm dark:text-white">
            <Icon icon="gg:add" className="w-6! h-6!" />
            {t("COMMON.ADD_ENTITY", {
              ENTITY_NAME: t("ROLES_MANAGEMENT.INDIFINITE_ENTITY_NAME"),
            })}
          </Button>
        </div>
      </div>
      {/* View Bar */}
      <div className="flex flex-row justify-between items-end">
        <AnimatePresence>
          {isFetching && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
            >
              <Badge className="bg-emerald-600">
                <Spinner />
                {t("COMMON.SYNCING")}
              </Badge>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {/* List View */}
      <div className="flex md:flex-row flex-col-reverse gap-3 relative items-stretch md:h-full">
        {/* List  */}
        {notFound && <NoResultsView />}
        {!notFound && (
          <div className="h-full w-full relative">
            <div className="w-full overflow-y-scroll px-2 h-full absolute">
              {LIST_MODE && (
                <motion.ul
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 100, opacity: 0 }}
                  className="flex flex-col gap-3 w-full"
                >
                  {!isLoading &&
                    data?.map((role) => (
                      <ListTableRow key={role?._id} role={role} />
                    ))}
                </motion.ul>
              )}
              {GRID_MODE && (
                <motion.ul
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 100, opacity: 0 }}
                  className="flex flex-col md:flex-row gap-3 w-full md:flex-wrap"
                >
                  {data?.map((role) => (
                    <GridTableRow key={role?._id} role={role} />
                  ))}
                </motion.ul>
              )}
            </div>
          </div>
        )}
        {/* Toolbar */}
        <RHFForm
          methods={methods}
          onSubmit={onSubmit}
          className="min-w-76 bg-card rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.05)] md:h-[28rem] lg:h-full  relative md:sticky md:top-[4.5rem] flex flex-col gap-0 self-stretch dark:bg-dark-card"
        >
          <TableToolbar />
        </RHFForm>
      </div>
      <AnimatePresence>
        {!notFound && (
          <motion.div
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-row mr-auto rtl:mr-0 rtl:ml-auto py-4"
          >
            <DashboardPagination
              totalRowsCount={results ?? 0}
              rowsPerPage={filtervalues.size}
              page={page}
              onChange={(newPage) => {
                const params = new URLSearchParams(searchParams.toString());
                params.set("page", newPage?.toString());
                router?.replace(`?${params.toString()}`);
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
