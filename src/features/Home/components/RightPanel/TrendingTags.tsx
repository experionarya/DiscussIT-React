import React, { ReactElement } from "react";

export default function TrendingTags(): ReactElement {
  return (
    <div>
      <h4 className="flex justify-center">
        <strong>Trending Tags</strong>
      </h4>
      <div className="flex flex-row flex-wrap mt-5 gap-3">
      <button className="flex justify-center pl-2 pr-2 min-w-12 border border-primary items-center hover:border-primary-900 hover:text-primary-900 rounded-full text-primary">Java</button>
      <button className="flex justify-center pl-2 pr-2 min-w-12 border border-primary items-center hover:border-primary-900 hover:text-primary-900 rounded-full text-primary">Python</button>
      <button className="flex justify-center pl-2 pr-2 min-w-12 border border-primary items-center hover:border-primary-900 hover:text-primary-900 rounded-full text-primary">Flutter</button>
      <button className="flex justify-center pl-2 pr-2 min-w-12 border border-primary items-center hover:border-primary-900 hover:text-primary-900 rounded-full text-primary">Testing</button>
      <button className="flex justify-center pl-2 pr-2 min-w-12 border border-primary items-center hover:border-primary-900 hover:text-primary-900 rounded-full text-primary">Machine Learning</button>
      <button className="flex justify-center pl-2 pr-2 min-w-12 border border-primary items-center hover:border-primary-900 hover:text-primary-900 rounded-full text-primary">AI</button>
      <button className="flex justify-center pl-2 pr-2 min-w-12 border border-primary items-center hover:border-primary-900 hover:text-primary-900 rounded-full text-primary">Cloud</button>
      </div>
      </div>
  );
}
