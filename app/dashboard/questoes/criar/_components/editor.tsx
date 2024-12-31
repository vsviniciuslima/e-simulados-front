"use client";

import React, { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import "../../../../../styles/quill.snow.css"; // Import Quill styles
import "../../../../../styles/quill.bubble.css"; // Import Quill styles
import { CreateQuestion } from "@/types/questions";
import { useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { SwitchIcon } from "@radix-ui/react-icons";

const QuillEditor = dynamic(() => import("react-quill"), { ssr: false });

export default function Editor() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<CreateQuestion>();

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
    setValue("statement", newContent);
  };

  const handleThemeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTheme(event.target.value);
  };

  return (
    <div className="min-h-[200px] border border-gray-200 rounded-lg flex flex-col justify-between">
      {theme === "snow" && (
        <QuillEditor
          value={content}
          onChange={handleEditorChange}
          modules={quillModules}
          formats={quillFormats}
          theme="snow"
          placeholder="Escreva algo maravilhoso..."
        />
      )}
      {theme === "bubble" && (
        <QuillEditor
          value={content}
          onChange={handleEditorChange}
          modules={quillModules}
          formats={quillFormats}
          theme="bubble"
          placeholder="Escreva algo maravilhoso..."
        />
      )}
      <div className="flex justify-end">
        <Button
          variant="ghost"
          size="icon"
          type="button"
          onClick={(e) => {
            console.log("Theme:", theme);
            setTheme(theme === "snow" ? "bubble" : "snow");
          }}
        >
          <SwitchIcon />
        </Button>
      </div>
    </div>
  );
}
