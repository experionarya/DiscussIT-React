import React, { ReactElement } from "react";
import {
    HandThumbUpIcon,
    HandThumbDownIcon,
    ChatBubbleOvalLeftEllipsisIcon,
    ShareIcon,
    BookmarkIcon
  } from "@heroicons/react/24/outline";

export default function Grid(): ReactElement {
  return (
    <div className="border border-stroke-weak rounded pl-5 pr-5 pt-2 pb-2 grid grid-rows-12">
    <div className="flex items-center row-span-1">
      <img
        src={require(`../../assets/images//person-4.jpg`)}
        alt="person 3"
        className="rounded-full w-9 h-9"
      />
      <div className="ml-3 font-sans">
        <div className="flex">
          <strong className="text-text-strong text-sm">
            Subha Lakshmi
          </strong>
        </div>
        <div className="flex text-text-weak text-[12px]">
          <div>Former Student</div>
          <div className="ms-2">.May 7</div>
        </div>
      </div>
    </div>
    <div className="text-text-strong row-span-10 h-full">
      <strong className="text-base">My heartbreaking journey 💔</strong>
      <p className="text-[15px] mt-1">
        So today I am going to share my 2nd drop journey (Pura story bahut
        lamba h quora hang hojayega) NEET 23 result came and I scored 576 in
        my 1st drop (Rank 44759😭) It was really devastating for me ……
        Relatives log sab tanne sunane lage parents ko I felt like I was a
        complete failure….Mere
      </p>
      <img
        src={require(`../../assets/images/note.jpg`)}
        alt="person"
        className="w-full mt-2"
      />
    </div>
    <div className="flex row-span-1">
      <div className="flex items-center">
      <button className="h-4 w-4 text-green-600">
        <HandThumbUpIcon />
      </button>
      <span className="text-xs ms-1">15</span>
      <button className="h-4 w-4 text-red-600 ms-2">
        <HandThumbDownIcon />
      </button>
      <span className="text-xs ms-1">7</span>
      <button className="h-4 w-4 text-blue-400 ms-2">
        <ChatBubbleOvalLeftEllipsisIcon />
      </button>
      <span className="text-xs ms-1">20</span>  
      <button className="h-4 w-4 ms-3">
      <ShareIcon/>
      </button>
      <button className="h-4 w-4 ms-3">
      <BookmarkIcon/>
      </button>
      </div>
    </div>
  </div> 
  );
}
