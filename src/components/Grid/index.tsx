import React, { ReactElement } from "react";
import { useNavigate} from 'react-router-dom';
import { ArrowDownIcon as ArrowDownIconMicro } from "@heroicons/react/16/solid";
import { ArrowUpIcon as ArrowUpIconMicro } from "@heroicons/react/16/solid";
import { ChatBubbleOvalLeftIcon as ChatBubbleOvalLeftIconMicro } from "@heroicons/react/16/solid";
import { ArrowUpTrayIcon as ArrowUpTrayIconMicro } from "@heroicons/react/16/solid";
import { BookmarkIcon as BookmarkIconMicro } from "@heroicons/react/16/solid";

export default function Grid(): ReactElement {
  const navigate = useNavigate();

  function gotoPost() {
    navigate(`/community/category-posts/replies`);
  }

  return (
    <div>
      <article className="w-full space-y-3 overflow-hidden rounded-md bg-white p-3 shadow-sm">
        <div className="flex min-w-0 gap-x-2">
          <img
            className="h-8 w-8 flex-none rounded-full bg-gray-50"
            src={require(`../../assets/images/person-4.jpg`)}
            alt=""
          />
          <div className="min-w-0 flex-auto">
            <p className="text-sm font-semibold leading-tight text-slate-900">
              Subha Lakshmi
            </p>
            <p className="truncate text-xs leading-tight text-slate-500">
            October 15, 2024
            </p>
          </div>
        </div>
        <div className="space-y-1 cursor-pointer" onClick={gotoPost}>
          <h5 className="font-semibold text-slate-900">
            How to handle exceptions in Java?
          </h5>
          <p className="text-slate-900">
            What are some best practices for handling exceptions in Java
            applications to ensure robust error handling and graceful
            degradation?
            <a href="#" className="text-primary-800 underline">
              (More)
            </a>
          </p>
        </div>
        <img
          src={require(`../../assets/images/Java.png`)}
          alt="java"
          className="cursor-pointer"
          onClick={gotoPost}
        />
        <div className="flex space-x-3">
          <button className="flex items-center gap-1 rounded-full px-1 py-0.5 text-xs hover:bg-slate-200">
            <ArrowUpIconMicro className="size-4 text-gray-600" />
            <span className="sr-only">Up vote</span>
            <span>20</span>
          </button>
          <button className="flex items-center gap-1 rounded-full px-1 py-0.5 text-xs hover:bg-slate-200">
            <ArrowDownIconMicro className="size-4 text-gray-600" />
            <span className="sr-only">Down vote</span>
            <span>3</span>
          </button>
          <button className="flex items-center gap-1 rounded-full px-1 py-0.5 text-xs hover:bg-slate-200" onClick={gotoPost}>
            <ChatBubbleOvalLeftIconMicro className="size-4 text-gray-600" />
            <span className="sr-only">Comment</span>
            <span>10</span>
          </button>
          <button className="flex items-center gap-1 rounded-full px-1 py-0.5 text-xs hover:bg-slate-200">
            <ArrowUpTrayIconMicro className="size-4 text-gray-600" />
            <span className="sr-only">Share</span>
          </button>
          <button
            className="flex items-center gap-1 rounded-full px-1 py-0.5 text-xs hover:bg-slate-200"
            title=""
          >
            <BookmarkIconMicro className="size-4 text-gray-600" />
            <span className="sr-only">Bookmark</span>
          </button>
        </div>
      </article>
    </div>
  );
}
