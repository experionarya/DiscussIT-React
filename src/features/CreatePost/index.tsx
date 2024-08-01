import React, { ReactElement, useCallback, useMemo } from "react";
import { Button } from "src/components/Button";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import * as Tooltip from "@radix-ui/react-tooltip";
import { PencilIcon } from "@heroicons/react/24/solid";

import TextEditor from "src/components/TextEditor";
import { ReactSelect } from "src/components/ReactSelect";

import { useGetCommunityList } from "../Community/api/useGetCommunityList";
import { useGetCategoryByCommunity } from "../Community/api/useGetCategoryByCommunity";
import { useCreateNewPost, useGetTagList } from "./api/index";

import { getUserIdFromToken } from "src/utils/authenticationHelper/tokenHandler";
import {
  contentWarning,
  tagWarning,
  titleWarning,
  format,
} from "./utils/postConstants";

import { useCreatePostStore } from "./store/createPostStore";

export default function CreatePost(): ReactElement {
  const { data } = useGetCommunityList();
  const { mutate: createNewPost } = useCreateNewPost();

  const postDetails = useCreatePostStore(
    useCallback((state) => state.postDetails, [])
  );
  const setPostDetails = useCreatePostStore(
    useCallback((state) => state.setPostDetails, [])
  );

  const showWarning = useCreatePostStore(
    useCallback((state) => state.showWarning, [])
  );

  const { data: categoryList } = useGetCategoryByCommunity(
    postDetails?.Community ? postDetails?.Community : 1
  );

  const { data: trendingTags } = useGetTagList();

  //tag options
  const tagOptions = useMemo(() => {
    const value = trendingTags?.map((item: any) => ({
      value: item?.tagId,
      label: item?.tagName,
    }));

    return value;
  }, [trendingTags]);

  //community
  const dropdownOptions = useMemo(() => {
    if (data) {
      const value = data?.map((item) => ({
        name: item?.communityName,
        value: item?.communityID,
      }));
      value?.unshift({ name: "Select one", value: -1 });
      return value;
    }
  }, [data]);

  //category
  const categoryOptions = useMemo(() => {
    if (categoryList) {
      const value = categoryList?.map((item) => ({
        name: item?.communityCategoryName,
        value: item?.communityCategoryMappingID,
      }));
      value?.unshift({ name: "Select one", value: -1 });
      return value;
    }
  }, [categoryList]);

  function savePost() {
    let postValue = { ...postDetails, userId: getUserIdFromToken() };
    createNewPost(postValue);
  }

  //check disbaled
  function isDisabled() {
    if (
      showWarning(postDetails, "Title") ||
      showWarning(postDetails, "Description") ||
      showWarning(postDetails, "TagStatus") ||
      postDetails?.Community !== "-1" ||
      postDetails?.Category !== "-1"
    ) {
      return true;
    }
  }

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-auto gap-6 pt-6 sm:px-2 lg:px-8">
      <div className="min-w-40 max-w-44 space-y-5" />
      <div className="grid grow grid-cols-3 gap-4">
        <div className="col-span-2 space-y-2 pl-10">
          <form className="w-full space-y-5 rounded-md p-4 bg-white shadow-sm">
            <h1 className="font-semibold text-xl text-slate-900 flex items-center gap-2">
              <span className="size-10 bg-primary-100 rounded-full flex items-center justify-center">
                {" "}
                <PencilIcon className="size-6 text-primary-700" />
              </span>
              Create Post
            </h1>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <label htmlFor="community" className="font-medium block">
                  Community
                </label>
                <select
                  name="community"
                  id="community"
                  className="h-9 w-72 rounded-lg px-3 border border-stroke-weak outline-none"
                  onChange={(e) => {
                    console.log("eee", e.target.value);
                    setPostDetails("Community", parseInt(e.target.value));
                  }}
                  value={postDetails?.Community?.toString()}
                >
                  {dropdownOptions?.map((item) => (
                    <option value={item?.value}>{item?.name}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-1">
                <label htmlFor="category" className="font-medium block">
                  Category
                </label>
                <select
                  name="category"
                  id="category"
                  className="h-9 w-72 rounded-lg border px-3 border-stroke-weak outline-none"
                  onChange={(e) => {
                    setPostDetails("Category", parseInt(e.target.value));
                  }}
                  value={postDetails?.Category?.toString()}
                >
                  {categoryOptions?.map((item) => (
                    <option value={item?.value}>{item?.name}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="space-y-1">
              <label htmlFor="title" className="font-medium block">
                Title
              </label>
              <input
                type="text"
                id="tag"
                className="h-9 w-full pl-2 rounded-lg border border-stroke-weak outline-none"
                onChange={(e) => {
                  setPostDetails("Title", e.target.value);
                }}
                value={postDetails?.Title}
              />
              {showWarning(postDetails, "Title") && (
                <p className="text-red-500">{titleWarning}</p>
              )}
            </div>
            <div className="space-y-1">
              <label htmlFor="description" className="font-medium">
                Description
              </label>
              <TextEditor
                id="description"
                onChange={(e: any) => {
                  console.log("eee", e);
                  setPostDetails("Description", e);
                }}
                value={postDetails?.Description}
              />
              {showWarning(postDetails, "Description") && (
                <p className="text-red-500">{contentWarning}</p>
              )}
            </div>
            <div className="space-y-1">
              <label htmlFor="tag" className="font-medium block">
                Tag
              </label>
              <div className="relative w-full">
                <ReactSelect
                  options={tagOptions}
                  id="tag"
                  setSelectedOptions={(e) => setPostDetails("TagStatus", e)}
                  isSearchable={true}
                  menuPlacement="top"
                  components={{
                    DropdownIndicator: () => null,
                    IndicatorSeparator: () => null,
                    ClearIndicator: () => null,
                  }}
                />
                <Tooltip.Provider>
                  <Tooltip.Root>
                    <Tooltip.Trigger asChild>
                      <button className="absolute top-1/4 transform -translate-y-1/2 right-2">
                        <InformationCircleIcon className="h-6 w-6 text-gray-500" />
                      </button>
                    </Tooltip.Trigger>
                    <Tooltip.Portal>
                      <Tooltip.Content
                        className="rounded-md data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade text-violet11 select-none bg-white px-[15px] py-[10px] text-[15px] leading-none shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] will-change-[transform,opacity]"
                        sideOffset={5}
                        side="bottom"
                      >
                        <ul className="text-sm marker:text-sky-400 list-disc pl-5 space-y-3 text-slate-700">
                          <li>
                            Tags should be descriptive and related to your post
                            content.
                          </li>
                          <li>
                            Avoid using single characters or numbers as tags.
                          </li>
                          <li>
                            Use relevant keywords to enhance searchability.
                          </li>
                          <li>
                            Check for suggestions provided below for accurate
                            and popular tags.
                          </li>
                          <li>
                            Ensure that tags accurately represent the main
                            topics or themes of your post.
                          </li>
                          <li>You cannot add invalid or inappropriate tags.</li>
                        </ul>
                        <Tooltip.Arrow className="fill-white" />
                      </Tooltip.Content>
                    </Tooltip.Portal>
                  </Tooltip.Root>
                </Tooltip.Provider>
                {showWarning(postDetails, "TagStatus") && (
                  <p className=" text-red-500">{tagWarning}</p>
                )}
              </div>
            </div>
            <div className="flex justify-end items-center gap-3">
              <Button size="medium" variant="secondary">
                Saved draft
              </Button>
              <Button
                size="medium"
                variant="primary"
                onClick={() => {
                  savePost();
                }}
                disabled={isDisabled()}
              >
                Post
              </Button>
            </div>
          </form>
        </div>
        <div className="col-span-1" />
      </div>
    </div>
  );
}

// "absolute inset-0 bg-gradient-to-r from-[#36b49f] to-[#DBFF75] opacity-40 [mask-image:radial-gradient(farthest-side_at_top,white,transparent)] dark:from-[#36b49f]/30 dark:to-[#DBFF75]/30 dark:opacity-100"
