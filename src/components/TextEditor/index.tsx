import React, { useState, useRef, useEffect } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.snow.css";

import hljs from "highlight.js";
import "highlight.js/styles/monokai.css";

// Configure languages for highlight.js
hljs.configure({
  languages: ["javascript", "python", "java", "html", "css"],
});

export function TextEditor({
  value,
  onChange,
  id,
  className,
}: {
  value: any;
  onChange: any;
  id: string;
  className?: any;
}) {
  const quillRef = useRef(null);
  console.log("quill ref", quillRef);

  useEffect(() => {
    if (quillRef?.current) {
      const quill: any = quillRef?.current && quillRef?.current;

      // Add matcher to handle pasting
      quill?.editor?.clipboard.addMatcher(
        Node.ELEMENT_NODE,
        (node: any, delta: any) => {
          const codeBlocks = node.querySelectorAll("pre.ql-syntax");
          if (codeBlocks.length) {
            // Highlight code syntax on paste
            codeBlocks.forEach((block: any) => {
              hljs.highlightBlock(block);
            });
          }
          return delta;
        }
      );
    }
  }, []);
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
      ["code-block"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "blockquote",
    "list",
    "bullet",
    "link",
    "image",
    "code-block",
  ];

  return (
    <ReactQuill
      ref={quillRef}
      value={value}
      onChange={onChange}
      modules={modules}
      formats={formats}
      className="create-posts"
    />
  );
}
