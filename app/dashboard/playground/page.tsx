"use client";

import React, { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import "../../../styles/quill.snow.css"; // Import Quill styles
import "../../../styles/quill.bubble.css"; // Import Quill styles

const QuillEditor = dynamic(() => import("react-quill"), { ssr: false });

export default function Home() {
  const [content, setContent] = useState("");
  const [theme, setTheme] = useState("bubble"); // Manage the selected theme in state

  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      [{ align: [] }],
      [{ color: [] }],
      ["code-block"],
      ["clean"],
    ],
  };

  const quillFormats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "link",
    "image",
    "align",
    "color",
    "code-block",
  ];

  const handleEditorChange = (newContent: any) => {
    setContent(newContent);
  };

  const handleThemeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTheme(event.target.value);
  };

  return (
    <main>
      <div className="flex items-center flex-col">
        <div className="m-10 flex flex-col items-center">
          <span className="text-2xl text-center">Quill Rich Text Editor</span>
          <div className="text-center">Author : Soubhagyajit Borah</div>
          <div className="text-center">
            visit{" "}
            <a
              href="https://www.sjbtechcenter.online/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500"
            >
              www.sjbtechcenter.online
            </a>{" "}
            for more information
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="theme-select" className="mr-2">
            Select Theme:
          </label>
          <select id="theme-select" value={theme} onChange={handleThemeChange}>
            <option value="bubble">Bubble</option>
            <option value="snow">Snow</option>
          </select>
        </div>
        {theme === "snow" && (
          <div className="w-full min-h-[200px] flex justify-center">
            <QuillEditor
              value={content}
              onChange={handleEditorChange}
              modules={quillModules}
              formats={quillFormats}
              className="w-1/2 min-h-[200px] border border-gray-200 rounded-lg"
              theme="snow"
            />
          </div>
        )}
        {theme === "bubble" && (
          <div className="w-full min-h-[200px] flex justify-center">
            <QuillEditor
              value={content}
              onChange={handleEditorChange}
              modules={quillModules}
              formats={quillFormats}
              className="w-1/2 min-h-[200px] bg-white border border-gray-200 rounded-lg "
              theme="bubble"
              placeholder="Escreva algo maravilhoso..."
            />
          </div>
        )}
      </div>
    </main>
  );
}
