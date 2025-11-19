"use client";
import * as Z from "zod";
import { Badge } from "@/components/ui/badge";
import { useLocale, useTranslations } from "next-intl";
import {
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { DragEndEvent, DragOverEvent } from "@dnd-kit/core";
import { KanbanColumn, KanbanColumns } from "@/components/kanban/kanban-column";
import Kanban from "@/components/kanban/kanban-provider";
import { KanbanCard, KanbanCards } from "@/components/kanban/kanban-card";
import {
  useGetAllocatedStaff,
  useGetStaffList,
} from "@/app/dashboard-api/staff-allocation";
import ListSkeletonView from "./skeleton-view";
import { useQueryClient } from "@tanstack/react-query";
import { useGetStaffCountedActiveBranches } from "@/app/dashboard-api/valueHelp";
import { arrayMove } from "@dnd-kit/sortable";
import NO_DATA_IMG from "@/assets/images/no-data.webp";
import Image from "next/image";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Button } from "@/components/ui/button";
import { useMutate } from "../use-mutate";

import { Spinner } from "@/components/ui/spinner";
import TableToolbar from "../table-toolbar";
import { AnimatePresence, motion } from "framer-motion";
import NoResultsView from "@/components/no-results";
import RHFForm from "@/components/rhf-form";
import { useKeyboardShortcut } from "@/hooks/use-keyboard-shortcut";
import EmptyView from "./empty-view";
import {
  DEFAULT_PAGE_SIZE,
  GENDER_OPTIONS,
  LIST_COUNT,
  ORDER_BY_OPTIONS,
  ORDER_DIR_OPTIONS,
} from "../constants";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryParams } from "@/hooks/use-query-params";
import { useDebounce } from "@/hooks/use-debounce";
import { UserCard } from "../user-card";

const StaffAllocationForm = lazy(() => import("../staff-allocation-form"));

export default function KanbanView() {
  const { isLoading } = useGetStaffList(1, 9);
  const {
    data: branches,
    isLoading: branchesLoading,
    key: branchesKey,
  } = useGetStaffCountedActiveBranches();
  const { data: users, results, isFetching } = useGetAllocatedStaff();
  const { onAllocating } = useMutate();
  const locale = useLocale();
  const t = useTranslations();
  const queryClient = useQueryClient();

  const handleDragEnd = useCallback(
    async (event: DragEndEvent) => {
      const { active, over } = event;
      if (!over) return;
      const activeIdx = active?.data?.current?.sortable?.index;
      const overIdx = over?.data?.current?.sortable?.index;

      if (activeIdx === overIdx) return;
      queryClient.setQueryData(branchesKey, (data: any) => {
        if (
          over?.data?.current?.type === "CARD" ||
          active?.data?.current?.type === "CARD"
        )
          return data;
        const oldArr = data?.content;
        const newArr = arrayMove(oldArr, activeIdx, overIdx);
        data.content = newArr;
        return data;
      });
    },
    [branchesKey, queryClient]
  );
  const handleDragOver = useCallback(
    async (event: DragOverEvent) => {
      const { over, active } = event;
      if (!over || !active) return;

      const overData = over?.data?.current?.data;
      const activeData = active?.data?.current?.data;

      const isActiveACard = active?.data?.current?.type === "CARD";
      const isOverACard = over?.data?.current?.type === "CARD";
      const isOverAColumn = over?.data?.current?.type === "COLUMN";

      // only handle user drags here
      if (!isActiveACard) return;

      // Dropping card over another card (same flat array reorder)
      if (isOverACard) {
        await onAllocating(activeData, overData, {}, "reorder");
        return;
      }
      if (isOverAColumn) {
        await onAllocating(activeData, overData, {}, "allocate");
      }
    },
    [onAllocating]
  );

  const pathname = usePathname();
  const IS_INTERCEPTED = !pathname.endsWith("users");
  const [filtersSynced, setFiltersSynced] = useState<boolean>(false);
  // Custom Hooks ////////////////////////////////////
  const router = useRouter();
  const searchParams = useSearchParams();
  const defaultParams = useMemo(
    () => ({
      page: "1",
      size: DEFAULT_PAGE_SIZE?.toString(),
    }),
    []
  );
  // Filters /////////////////////////////////////////////
  const filtersSchema = Z.object({
    name: Z.string(),
    status: Z.string().nullable(),
    gender: Z.object({
      _id: Z.string(),
      nameAr: Z.string(),
      nameEn: Z.string(),
      value: Z.string(),
    }).nullable(),
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
    size: Z.union([Z.string(), Z.number()]),
  });
  const defaultValues = useMemo(
    () => ({
      name: "",
      status: null,
      gender: null,
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
      gender: filtervalues?.gender?.value ?? null,
      sort: filtervalues?.sort?.value ?? null,
      dir: filtervalues?.dir?.value ?? null,
      roles: searchParams?.get("role") ?? null,
    }),
    [
      debouncedSearch,
      filtervalues?.dir?.value,
      filtervalues?.gender,
      filtervalues?.sort?.value,
      filtervalues?.status,
      searchParams,
    ]
  );
  // Helper Constants ////////////////////////////////////////
  const onSubmit = useCallback((data: any) => {
    console.log(data);
  }, []);
  // Data Fetching Hooks ////////////////////////////////////

  const canReset =
    Object.keys(dirtyFields)?.filter(
      (keyName) => keyName !== "page" && keyName !== "size"
    ).length > 0;
  const notFound = canReset && results === 0;
  const isEmpty = !canReset && results === 0;
  // Callbacks ////////////////////////////////////////
  const handleCreationTrigger = useCallback(() => {
    router.push("./users/create");
  }, [router]);
  useKeyboardShortcut("ctrl+k", () => handleCreationTrigger);

  // LifeCycle Hooks ////////////////////////////////////////
  useEffect(() => {
    initParams();
  }, [initParams]);

  useEffect(() => {
    if (filtersSynced || IS_INTERCEPTED) return;
    syncParams({
      sort: (val: any) => ORDER_BY_OPTIONS?.find((opt) => opt?.value === val),
      dir: (val: any) => ORDER_DIR_OPTIONS?.find((opt) => opt?.value === val),
      gender: (val: any) =>
        Object.values(GENDER_OPTIONS)?.find((opt) => opt?.value === val),
      size: (val: any) => LIST_COUNT?.find((opt) => opt === val) ?? "9",
      permission: () => null,
    });

    setFiltersSynced(true);
  }, [IS_INTERCEPTED, filtersSynced, searchParams, setValue, syncParams]);
  if (isLoading || branchesLoading) return <ListSkeletonView />;

  if (isEmpty)
    return (
      <>
        <EmptyView
          icon="solar:key-broken"
          title={t("COMMON.EMPTY_TITLE", {
            ENTITY_NAME: t("USERS_MANAGEMENT.ENTITY_PLURAL"),
          })}
          subtitle={t("COMMON.EMPTY_SUBTITLE", {
            ENTITY_NAME: t("USERS_MANAGEMENT.ENTITY_NAME"),
          })}
          action={() => {
            handleCreationTrigger();
          }}
          actionTitle={t("COMMON.CREATE", {
            ENTITY_NAME: t("USERS_MANAGEMENT.ENTITY_NAME"),
          })}
        />
      </>
    );

  return (
    <div className="flex flex-col gap-3 h-full p-3 pt-0">
      {/* Title Bar */}
      <div className="flex md:flex-row flex-col md:gap-0 gap-2  justify-between md:sticky relative md:top-0 bg-slate-50 pt-2 z-20 dark:bg-dark-background">
        <div className="flex flex-col">
          <h3 className="text-3xl font-bold dark:text-white">
            {t("DASHBOARD_NAV_BAR.USERS_DISTRIBUTION")}
          </h3>
          <div className="flex flex-row gap-4">
            <p className="dark:text-gray-200">
              {t("STAFF_ALLOCATION.LIST_SUBTITLE")}
            </p>
            <AnimatePresence>
              {isFetching && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                >
                  <Badge className="bg-emerald-600 dark:text-white">
                    <Spinner />
                    {t("COMMON.SYNCING")}
                  </Badge>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        <div className="flex flex-row gap-2">
          <Button
            className="bg-emerald-600 h-12 text-sm dark:text-white w-full md:w-fit"
            onClick={handleCreationTrigger}
          >
            <Icon icon="gg:add" className="w-6! h-6!" />
            {t("COMMON.ADD_ENTITY", {
              ENTITY_NAME: t("USERS_MANAGEMENT.INDIFINITE_ENTITY_NAME"),
            })}
          </Button>
        </div>
      </div>
      {/* View Bar */}
      {/* List View */}
      <div className="flex md:flex-row flex-col-reverse gap-3 relative items-stretch md:h-full">
        {/* List  */}
        {notFound && <NoResultsView />}
        {!notFound && (
          <div className=" md:h-full w-full relative pb-12 md:pb-0 ">
            <div className="w-full overflow-y-auto px-2 h-fit md:h-full relative md:absolute">
              <div className="h-full w-full flex flex-row gap-3 py-2">
                <Kanban
                  onDragEnd={handleDragEnd}
                  onDragOver={handleDragOver}
                  cardOverlay={(activeCard) => <UserCard user={activeCard} />}
                >
                  <KanbanColumns
                    columnIds={branches?.map((branch) => branch?._id)}
                    className="flex flex-row gap-2 h-full w-full overflow-x-auto pb-3"
                  >
                    <KanbanColumn
                      sortableAPI={{ disabled: true }}
                      columnId="UNALLOCATED"
                      columnData={{
                        _id: "UNALLOCATED",
                        nameAr: "",
                      }}
                      renderPlaceholder={() => (
                        <div className="w-96 h-full border-2 border-dashed border-emerald-600 shrink-0 rounded-lg p-3" />
                      )}
                      className="w-96 h-full bg-gray-100 dark:bg-dark-900 shrink-0 rounded-lg p-3"
                    >
                      <h4 className="text-lg mb-3 font-semibold dark:text-white">
                        {locale === "ar"
                          ? "الموظفين غير المعينين"
                          : "Unallocated Staff"}{" "}
                        (
                        {
                          users?.filter(
                            (user) => "UNALLOCATED" === user?.branch?._id
                          )?.length
                        }
                        )
                      </h4>

                      {users?.filter(
                        (user) => "UNALLOCATED" === user?.branch?._id
                      )?.length > 0 && (
                        <KanbanCards
                          cardIds={users
                            ?.filter(
                              (user) => "UNALLOCATED" === user?.branch?._id
                            )
                            ?.map((user) => user?._id)}
                          asChild
                        >
                          <ul className="flex flex-col gap-2 overflow-x-hidden overflow-y-auto flex-1">
                            {users
                              ?.filter(
                                (user) => "UNALLOCATED" === user?.branch?._id
                              )
                              ?.map((user) => (
                                <KanbanCard
                                  renderPlaceholder={() => (
                                    <li className="h-48 w-full rounded-md bg-gray-200 dark:bg-dark-950 p-3 list-none" />
                                  )}
                                  cardData={user}
                                  cardId={user?._id}
                                  key={user?._id}
                                  // asChild
                                >
                                  <UserCard user={user} />
                                </KanbanCard>
                              ))}
                          </ul>
                        </KanbanCards>
                      )}
                    </KanbanColumn>
                    {branches?.map((branch) => (
                      <KanbanColumn
                        sortableAPI={{ disabled: true }}
                        columnId={branch?._id}
                        key={branch?._id}
                        columnData={branch}
                        renderPlaceholder={() => (
                          <div className="w-96 h-full border-2 border-dashed border-emerald-600 shrink-0 rounded-lg p-3" />
                        )}
                        className="w-96 h-full bg-gray-100 dark:bg-dark-900 shrink-0 rounded-lg p-3"
                      >
                        <h4 className="text-lg mb-3 font-semibold dark:text-white">
                          {locale === "ar" ? branch?.nameAr : branch?.nameEn} (
                          {
                            users?.filter(
                              (user) => branch?._id === user?.branch?._id
                            )?.length
                          }
                          )
                        </h4>
                        {users?.filter(
                          (user) => branch?._id === user?.branch?._id
                        )?.length === 0 && (
                          <div className=" w-full flex h-4/5 items-center justify-center flex-col gap-2">
                            <Image
                              src={NO_DATA_IMG}
                              alt="s"
                              className="dark:opacity-45"
                            />
                            <p className="text-lg font-semibold dark:text-gray-300">
                              {t("STAFF_ALLOCATION.NOT_ALLOCATED")}
                            </p>
                          </div>
                        )}
                        {users?.filter(
                          (user) => branch?._id === user?.branch?._id
                        )?.length > 0 && (
                          <KanbanCards
                            cardIds={users
                              ?.filter(
                                (user) => branch?._id === user?.branch?._id
                              )
                              ?.map((user) => user?._id)}
                            asChild
                          >
                            <ul className="flex flex-col gap-2 overflow-x-hidden overflow-y-auto flex-1">
                              {users
                                ?.filter(
                                  (user) => branch?._id === user?.branch?._id
                                )
                                ?.map((user) => (
                                  <KanbanCard
                                    renderPlaceholder={() => (
                                      <li className="h-48 w-full rounded-md bg-gray-200 dark:bg-dark-950 p-3 list-none" />
                                    )}
                                    cardData={user}
                                    cardId={user?._id}
                                    key={user?._id}
                                  >
                                    <UserCard
                                      user={user}
                                      key={user?.branch?._id}
                                    />
                                  </KanbanCard>
                                ))}
                            </ul>
                          </KanbanCards>
                        )}
                      </KanbanColumn>
                    ))}
                  </KanbanColumns>
                </Kanban>
              </div>
            </div>
          </div>
        )}
        {/* Toolbar */}
        <RHFForm
          methods={methods}
          onSubmit={onSubmit}
          className="min-w-76 bg-card rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.05)] md:h-[28rem] lg:h-full  relative md:sticky md:top-[4.5rem] flex flex-col gap-0 self-stretch dark:bg-dark-card"
        >
          <TableToolbar results={results ?? 0} />
        </RHFForm>
      </div>
      {/* {showCreationModal !== "HIDDEN" && ( */}
      <Suspense>
        <StaffAllocationForm
        // open
        // onClose={() => {
        //   setShowCreationModal("HIDDEN");
        //   setEditedRoleId(null);
        // }}
        // refetch={() => {}}
        />
      </Suspense>
      {/* )} */}
    </div>
  );
}

// function UserColumn({branch}:{branch:any}){

// }
