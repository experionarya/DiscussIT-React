import React, { ReactElement } from "react";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";

import { ArrowLeftIcon } from "@heroicons/react/24/solid";

import { Thread } from "./components/Thread";
import { Comments } from "./components/Comments";
import { Replies } from "./components/Replies";

import { usePostDetailsStore } from "./store/postDetailsStore";
import { useAuth } from "src/utils/authenticationHelper/authProvider";
import { getParsedToken } from "src/utils/authenticationHelper/tokenHandler";

export default function PostDetails(): ReactElement {
  const location = useLocation();

  const { tokenType } = useAuth();

  const getPostDetailsInfo = usePostDetailsStore(
    React.useCallback((state: any) => state.getPostDetailsInfo, [])
  );

  const postDetails = usePostDetailsStore(
    React.useCallback((state: any) => state.postDetails, [])
  );

  const threadId = location.search.split("threadId=")[1];

  useQuery(
    ["get_post_details", { threadId: threadId }],
    () => {
      getPostDetailsInfo({
        token: getParsedToken(),
        tokenType: tokenType,
        threadId: threadId,
      });
    },
    { staleTime: Infinity }
  );

  return (
    <div className="mt-16 mx-auto flex w-full max-w-7xl flex-auto gap-6 pt-6 sm:px-2 lg:px-8">
      <div className="min-w-40 max-w-44 space-y-5 flex justify-end">
        <button className="size-10 border border-stroke-stong/50 text-slate-700 bg-white rounded-full flex justify-center items-center">
          <ArrowLeftIcon className="size-5" />
        </button>
      </div>
      <div className="grid grow grid-cols-3 gap-4 pl-10">
        <div className="col-span-2 space-y-2">
          <article className="w-full space-y-3 overflow-hidden rounded-md bg-white p-3 shadow-sm">
            <Thread postDetails={postDetails} />
            <Comments />
            <Replies />

            {/* <div className="flex min-w-0 gap-x-2 pl-3 pt-0 mt-0">
              <img
                className="h-8 w-8 flex-none rounded-full bg-gray-50"
                src={require(`../../assets/images/person-5.jpg`)}
                alt="avatar"
              />
              <div className="mt-1">
                <div className="min-w-0 flex">
                  <p className="text-sm font-semibold leading-tight text-slate-900">
                    Joel Reid
                  </p>
                  <p className="truncate text-xs leading-tight text-slate-500 ml-1 mt-0.5">
                    .15 days
                  </p>
                </div>
                <p className="text-slate-900 dark:text-slate-300 mt-1">
                  The orange is not actually very visible in North West
                  Australia… Where large parts of the soil is orange and red. It
                  is highly visible in the areas an astronaut is “expected” to
                  land… Like the ocean or tundra.
                </p>
                <div className="flex mt-2 space-x-3">
                  <button className="flex items-center gap-1 rounded-full px-1 py-0.5 text-xs hover:bg-slate-200">
                    <ArrowUpIconMicro className="size-4 text-gray-600" />
                    <span className="sr-only">Up vote</span>
                    <span>10</span>
                  </button>
                  <button className="flex items-center gap-1 rounded-full px-1 py-0.5 text-xs hover:bg-slate-200">
                    <ArrowDownIconMicro className="size-4 text-gray-600" />
                    <span className="sr-only">Down vote</span>
                    <span>1</span>
                  </button>
                  <button className="rounded-full px-1 py-0.5 text-xs hover:bg-slate-200 font-semibold text-gray-600">
                    Reply
                  </button>
                </div>
                <div className="flex mt-5">
                  <img
                    className="h-6 w-6 mr-2 flex-none rounded-full bg-gray-50"
                    src={require(`../../assets/images/person-3.jpg`)}
                    alt="avatar"
                  />
                  <div className="mt-1">
                    <div className="min-w-0 flex">
                      <p className="text-sm font-semibold leading-tight text-slate-900">
                        Dona Riya
                      </p>
                      <p className="truncate text-xs leading-tight text-slate-500 ml-1 mt-0.5">
                        .11 days
                      </p>
                    </div>
                    <p>
                      most of the earth is made up of water which they are more
                      likely to land. Slash if they land on earth they’ll be
                      fine but if they land in water the urgency of them needing
                      to be found increases
                    </p>
                    <div className="flex mt-2 space-x-3">
                      <button className="flex items-center gap-1 rounded-full px-1 py-0.5 text-xs hover:bg-slate-200">
                        <ArrowUpIconMicro className="size-4 text-gray-600" />
                        <span className="sr-only">Up vote</span>
                        <span>8</span>
                      </button>
                      <button className="flex items-center gap-1 rounded-full px-1 py-0.5 text-xs hover:bg-slate-200">
                        <ArrowDownIconMicro className="size-4 text-gray-600" />
                        <span className="sr-only">Down vote</span>
                        <span>3</span>
                      </button>
                      <button className="rounded-full px-1 py-0.5 text-xs hover:bg-slate-200 font-semibold text-gray-600">
                        Reply
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex mt-5">
                  <img
                    className="h-6 w-6 mr-2 flex-none rounded-full bg-gray-50"
                    src={require(`../../assets/images/person-7.jpg`)}
                    alt="avatar"
                  />
                  <div className="mt-1">
                    <div className="min-w-0 flex">
                      <p className="text-sm font-semibold leading-tight text-slate-900">
                        Jose Miya
                      </p>
                      <p className="truncate text-xs leading-tight text-slate-500 ml-1 mt-0.5">
                        .10 days
                      </p>
                    </div>
                    <p>
                      most of the earth is made up of water which they are more
                      likely to land. Slash if they land on earth they’ll be
                      fine but if they land in water the urgency of them needing
                      to be found increases
                    </p>
                    <div className="flex mt-2 space-x-3">
                      <button className="flex items-center gap-1 rounded-full px-1 py-0.5 text-xs hover:bg-slate-200">
                        <ArrowUpIconMicro className="size-4 text-gray-600" />
                        <span className="sr-only">Up vote</span>
                        <span>8</span>
                      </button>
                      <button className="flex items-center gap-1 rounded-full px-1 py-0.5 text-xs hover:bg-slate-200">
                        <ArrowDownIconMicro className="size-4 text-gray-600" />
                        <span className="sr-only">Down vote</span>
                        <span>3</span>
                      </button>
                      <button className="rounded-full px-1 py-0.5 text-xs hover:bg-slate-200 font-semibold text-gray-600">
                        Reply
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
          </article>
        </div>
        <div className="col-span-1 space-y-2 overflow-y-auto" />
      </div>
    </div>
  );
}
