import React, {
  ReactElement,
  useCallback,
  useMemo,
  useState,
  useEffect,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "src/components/Button";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import * as Tooltip from "@radix-ui/react-tooltip";
import { PencilIcon } from "@heroicons/react/24/solid";
import { useQuery, useQueryClient } from "react-query";

import { ReactSelect, TextEditor, Loading } from "src/components";

import { useGetCommunityList } from "../Community/api/useGetCommunityList";
import { useGetCategoryByCommunity } from "../Community/api/useGetCategoryByCommunity";
import { useCreateNewPost, useGetTagList } from "./api/index";

import { getUserIdFromToken } from "src/utils/authenticationHelper/tokenHandler";
import {
  contentWarning,
  tagWarning,
  titleWarning,
} from "./utils/postConstants";
import { useAuth } from "src/utils/authenticationHelper/authProvider";

import { useCreatePostStore } from "./store/createPostStore";
import { validateUrlsInContent } from "../../utils/urlValidator";

export default function CreatePost(): ReactElement {
  const queryClient = useQueryClient();

  const postDetails = useCreatePostStore(
    useCallback((state) => state.postDetails, [])
  );
  const setPostDetails = useCreatePostStore(
    useCallback((state) => state.setPostDetails, [])
  );

  const getPostDetails = useCreatePostStore(
    useCallback((state) => state.getPostDetails, [])
  );

  const showWarning = useCreatePostStore(
    useCallback((state) => state.showWarning, [])
  );

  const isEditing = useCreatePostStore(
    useCallback((state) => state.isEditing, [])
  );

  const clearPostDetails = useCreatePostStore(
    useCallback((state) => state.clearPostDetails, [])
  );

  const { data, isLoading: isCommunityListLoading } = useGetCommunityList();
  const { mutate: createNewPost, isLoading: isCreatingPost } =
    useCreateNewPost();
  const { data: categoryList, isLoading: isCategoryListLoading } =
    useGetCategoryByCommunity(
      postDetails?.Community ? postDetails?.Community : 1
    );
  const { data: trendingTags, isLoading: trendingTagLoading } = useGetTagList();

  const isLoading =
    isCreatingPost ||
    trendingTagLoading ||
    isCategoryListLoading ||
    isCommunityListLoading;

  const [userMode, updateUserMode] = useState<string>("");
  //for warning in url
  const [contentUrlWarning, setContentUrlWarning] = useState<{
    isInvalid: boolean;
    invalidUrl: string | null;
  } | null>(null);

  const location = useLocation();
  const navigate = useNavigate();

  const id = location.search.split("threadId=")[1];

  //for setting the user mode
  useEffect(() => {
    if (location?.pathname.split("/").includes("edit-posts"))
      updateUserMode && updateUserMode("Edit");
    if (location?.pathname.split("/").includes("createpost"))
      updateUserMode && updateUserMode("Create");
  }, [location?.pathname, updateUserMode]);

  //for warning the url
  useEffect(() => {
    if (postDetails?.content) {
      const warning = validateUrlsInContent(postDetails.content);
      setContentUrlWarning(warning);
    }
  }, [postDetails?.content]); // Trigger validation whenever content changes

  const { tokenType } = useAuth();

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

  useQuery(["edit-post", id, userMode, tagOptions], () => {
    getPostDetails(id, userMode, tokenType, tagOptions);
  });

  function savePost() {
    let postValue = {
      ...postDetails,
      userId: getUserIdFromToken(),
      userMode: userMode,
      threadId: id,
      communityId: dropdownOptions?.find(
        (item) => item?.name === postDetails?.communityName
      )?.value,
      isDraft: false,
    };

    createNewPost(postValue, {
      onSuccess: () => {
        queryClient.invalidateQueries(["get_post_details"]);
        navigate(
          location.state?.from
            ? `${location.state.from}?threadId=${id}`
            : "/home"
        );
        clearPostDetails();
      },
    });
  }

  function draftPost() {
    let draftValue = {
      ...postDetails,
      userId: getUserIdFromToken(),
      userMode: userMode,
      threadId: id,
      communityId: dropdownOptions?.find(
        (item) => item?.name === postDetails?.communityName
      )?.value,
      isDraft: true,
    };

    createNewPost(draftValue, {
      onSuccess: () => {
        queryClient.invalidateQueries(["get_post_details"]);
        navigate(
          location.state?.from
            ? `${location.state.from}?threadId=${id}`
            : "/home"
        );
        clearPostDetails();
      },
    });
  }
  //check disbaled
  function isDisabled() {
    if (
      showWarning(postDetails, "title") ||
      showWarning(postDetails, "content") ||
      showWarning(postDetails, "tagNames") ||
      ((postDetails?.Community === -1 ||
        postDetails?.Category === -1 ||
        postDetails?.Category === undefined ||
        postDetails?.Community === undefined) &&
        userMode !== "Edit") ||
      contentUrlWarning?.isInvalid
    ) {
      return true;
    }
    return false;
  }

  function renderSelectDropDowns({
    label,
    key,
    name,
    id,
    dropdownOptions,
  }: {
    label: string;
    key: string;
    name: string;
    id: string;
    dropdownOptions: Array<{ value: number; name: string }> | undefined;
  }) {
    return (
      <div className="space-y-1">
        <label htmlFor={id} className="font-medium block">
          {label}
        </label>
        <select
          name={name}
          id={id}
          className="h-9 w-72 rounded-lg px-3 border border-black/20 outline-none"
          onChange={(e) => {
            setPostDetails(key, parseInt(e.target.value));
          }}
          value={(postDetails && postDetails[`${key}`]?.toString()) ?? ""}
        >
          {dropdownOptions?.map((item) => (
            <option value={item?.value}>{item?.name}</option>
          ))}
        </select>
      </div>
    );
  }

  function renderReactSelectWithTooltip() {
    return (
      <div className="space-y-1">
        <label htmlFor="tag" className="font-medium block">
          Tag
        </label>
        <div className="relative w-full">
          <ReactSelect
            options={tagOptions}
            id="tag"
            setSelectedOptions={(e) => {
              setPostDetails("tagNames", e);
            }}
            value={postDetails?.tagNames}
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
                <button
                  className="absolute top-5 transform -translate-y-1/2 right-2 cursor-pointer"
                  disabled
                >
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
                    <li>Avoid using single characters or numbers as tags.</li>
                    <li>Use relevant keywords to enhance searchability.</li>
                    <li>
                      Check for suggestions provided below for accurate and
                      popular tags.
                    </li>
                    <li>
                      Ensure that tags accurately represent the main topics or
                      themes of your post.
                    </li>
                    <li>You cannot add invalid or inappropriate tags.</li>
                  </ul>
                  <Tooltip.Arrow className="fill-white" />
                </Tooltip.Content>
              </Tooltip.Portal>
            </Tooltip.Root>
          </Tooltip.Provider>
          {showWarning(postDetails, "tagNames") && (
            <p className="text-gray-600 text-sm py-2 px-1">{tagWarning}</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-auto gap-6 pt-6 sm:px-2 lg:px-8">
      <div className="min-w-40 max-w-44 space-y-5" />
      <div className="grid grow grid-cols-3 gap-4">
        <div className="col-span-2 space-y-2 pl-10 pb-7">
          {!isLoading ? (
            <form className="w-full space-y-5 rounded-md p-4 bg-white shadow-sm">
              <h1 className="font-semibold text-xl text-slate-900 flex items-center gap-2">
                <span className="size-10 bg-primary-100 rounded-full flex items-center justify-center">
                  {" "}
                  <PencilIcon className="size-6 text-primary-700" />
                </span>
                {postDetails?.isDraft
                  ? "Publish Draft"
                  : userMode === "Edit"
                  ? "Edit Post"
                  : "Create Post"}
              </h1>
              {userMode !== "Edit" && (
                <div className="flex items-center justify-between">
                  {renderSelectDropDowns({
                    id: "community",
                    name: "community",
                    key: "Community",
                    dropdownOptions: dropdownOptions,
                    label: "Community",
                  })}
                  {renderSelectDropDowns({
                    id: "category",
                    name: "category",
                    key: "Category",
                    dropdownOptions: categoryOptions,
                    label: "Category",
                  })}
                </div>
              )}
              <div className="space-y-1">
                <label htmlFor="title" className="font-medium block">
                  Title
                </label>
                <input
                  type="text"
                  id="tag"
                  className="h-9 w-full pl-2 rounded-lg border border-black/20 outline-none"
                  onChange={(e) => {
                    setPostDetails("title", e.target.value);
                  }}
                  value={postDetails?.title}
                />
                {showWarning(postDetails, "title") && (
                  <p className="text-red-500 text-sm">{titleWarning}</p>
                )}
              </div>
              <div className="space-y-1">
                <label htmlFor="description" className="font-medium">
                  Description
                </label>
                <TextEditor
                  id="description"
                  onChange={(e: any) => {
                    setPostDetails("content", e);
                  }}
                  value={postDetails?.content}
                />
                {showWarning(postDetails, "content") && (
                  <p className="text-red-500 text-sm">{contentWarning}</p>
                )}
                {contentUrlWarning && (
                  <p className="text-red-500 text-sm">
                    {contentUrlWarning.invalidUrl}
                  </p>
                )}
              </div>
              {renderReactSelectWithTooltip()}
              <div className="flex justify-end items-center gap-3">
                <Button
                  size="medium"
                  variant="secondary"
                  onClick={() => {
                    draftPost();
                  }}
                  disabled={isDisabled()}
                >
                  Save as draft
                </Button>
                <Button
                  size="medium"
                  variant="primary"
                  onClick={() => {
                    savePost();
                  }}
                  disabled={isDisabled()}
                >
                  {postDetails?.isDraft
                    ? "Publish Draft"
                    : userMode === "Edit"
                    ? "Edit Post"
                    : "Create Post"}
                </Button>
              </div>
            </form>
          ) : (
            <div className="flex justify-center h-96 items-center">
              <Loading />
            </div>
          )}
        </div>
        <div className="col-span-1" />
      </div>
    </div>
  );
}
