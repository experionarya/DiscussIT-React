import React, { ReactElement, useState, useMemo, useCallback } from "react";
import { useQueryClient } from "react-query";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import dayjs from "dayjs";

import { Button } from "src/components/Button";

import { useGetAllCategories } from "../../api/useGetAllCategories";
import { useSaveCategories } from "../../api/useSaveCategories";

import { useHomeStore } from "../../store/homeStore";
import { getUserIdFromToken } from "src/utils/authenticationHelper/tokenHandler";

import { AllCategoryType } from "src/features/Community/types/categoryType";
import { QueryClient } from "react-query";
import { useGetPreferenceList } from "../../api/useGetPreferenceList";

type AddCategoryType = {
  isOpen: boolean;
  handleClose: () => void;
};

export function AddCategories({
  isOpen,
  handleClose,
}: AddCategoryType): ReactElement {
  const { data: allCategories } = useGetAllCategories();
  const { mutate: saveCategories } = useSaveCategories();
  const { data: preferenceList, refetch } = useGetPreferenceList();

  const queryClient = useQueryClient();

  const [categorySearchParam, setCategorySearchParam] = useState<string>("");

  const addToCategoryList = useHomeStore(
    useCallback((state) => state.addToCategoryList, [])
  );
  const setCheckedItems = useHomeStore(
    useCallback((state) => state.setCheckedItems, [])
  );

  const userDetails = useHomeStore(
    useCallback((state) => state.userDetails, [])
  );

  const checkedItems = useHomeStore(
    useCallback((state) => state.checkedItems, [])
  );

  const searchedValues = useMemo(() => {
    if (categorySearchParam && categorySearchParam !== "") {
      const result = allCategories?.filter((item) =>
        item?.communityCategoryName
          ?.toLocaleLowerCase()
          .includes(categorySearchParam?.toLocaleLowerCase())
      );
      return result;
    } else return allCategories;
  }, [allCategories, categorySearchParam]);

  function handleCheckboxChange(event: any) {
    setCheckedItems(event);
  }

  function saveCategoryList() {
    const filteredData = allCategories?.filter(
      (item) => checkedItems[item.communityCategoryID]
    );
    const formattedData = filteredData?.map((item) => ({
      ...item,
      createdAt: dayjs().utc().format(),
      createdBy: getUserIdFromToken(),
      modifiedAt: dayjs().utc().format(),
      modifiedBy: getUserIdFromToken(),
      id: 0,
    }));

    // saveCategories(filteredData);
    saveCategories(formattedData, {
      onSuccess: () => {
        refetch();
        queryClient.invalidateQueries("get_preference_list", {
          refetchInactive: true,
        });
        queryClient.invalidateQueries("get_preference_list", {
          refetchActive: true,
        });
      },
    });
  }

  return (
    <>
      <Dialog
        open={isOpen}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={handleClose}
      >
        <div className="fixed inset-0 bg-black opacity-65" aria-hidden="true" />
        <div className="fixed inset-0 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel className="w-96 rounded-lg bg-white backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0">
              <div className="grid grid-cols-6 p-5">
                <DialogTitle as="h3" className="col-span-5">
                  <h1 className="font-semibold text-slate-900 flex ml-1">
                    Add categories
                  </h1>
                </DialogTitle>
                <button
                  onClick={handleClose}
                  className="col-span-1 flex justify-end"
                >
                  <XMarkIcon className="size-6 text-slate-400" />
                </button>
              </div>
              <div className="flex relative pl-5 pr-5">
                <button className="absolute mt-[10px] ml-2">
                  <MagnifyingGlassIcon className="size-4 text-slate-400" />
                </button>
                <input
                  type="text"
                  className="h-9 w-96 rounded-lg border border-stroke-weak pl-8 pr-2 outline-none"
                  placeholder="Search"
                  onChange={(e) => setCategorySearchParam(e.target.value)}
                  value={categorySearchParam}
                />
              </div>
              <div className="max-h-80 overflow-y-scroll space-y-4 pl-7 pr-5 pt-3">
                {searchedValues?.map((item: AllCategoryType) => (
                  <div
                    className="flex items-center gap-3"
                    key={item?.communityID}
                  >
                    <input
                      type="checkbox"
                      className="size-4"
                      id={item?.communityID.toString()}
                      onChange={handleCheckboxChange}
                      name={item?.communityCategoryID?.toString()}
                      checked={
                        checkedItems[`${item?.communityCategoryID?.toString()}`]
                      }
                    />

                    <label
                      className="text-sm text-slate-700"
                      htmlFor={item?.communityID.toString()}
                    >
                      {item?.communityCategoryName}
                    </label>
                  </div>
                ))}
              </div>
              <hr className="mt-3" />
              <div className="flex gap-2 justify-end p-3">
                <Button size="medium" variant="secondary" onClick={handleClose}>
                  Cancel
                </Button>
                <Button
                  size="medium"
                  variant="primary"
                  onClick={() => {
                    addToCategoryList(checkedItems);
                    saveCategoryList();
                    handleClose();
                  }}
                >
                  Add
                </Button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
