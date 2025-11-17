

import React, { useRef, useState } from "react";

type StoriesProps = {
  firstName: string;
  lastName: string;
  onPublishStory?: (story: {
    title: string;
    contentHtml: string;
    attachment?: File | null;
  }) => void;
};

const StoriesSection: React.FC<StoriesProps> = ({ firstName, lastName, onPublishStory }) => {
  const [title, setTitle] = useState("");
  const [attachment, setAttachment] = useState<File | null>(null);
  const editorRef = useRef<HTMLDivElement | null>(null);
  const fileRef = useRef<HTMLInputElement | null>(null);

  const apply = (
    cmd: "bold" | "italic" | "underline" | "insertUnorderedList" | "insertOrderedList"
  ) => document.execCommand(cmd, false);

  const handleAttach = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] ?? null;
    setAttachment(f);
  };

  const publish = () => {
    const html = editorRef.current?.innerHTML?.trim() || "";
    if (!html) return;

    const payload = { title: title.trim(), contentHtml: html, attachment };
    if (onPublishStory) {
      onPublishStory(payload);
    } else {
      console.log("Story published:", payload);
      alert("Story published (demo). Console me payload dekho.");
    }

    // reset
    setTitle("");
    setAttachment(null);
    if (editorRef.current) editorRef.current.innerHTML = "";
    if (fileRef.current) fileRef.current.value = "";
  };

  return (
    <div className="space-y-6">
      {/* Intro */}
      <p className="text-[#372E29] leading-relaxed">
        Yeh jagah {firstName} ki yaadein share karne ke liye hai. Chhoti si kahani,
        koi mitha waqt, ya koi seekh — sab yahan likh sakte ho.
      </p>

      <div className="bg-[#D4C4A5] rounded-lg p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-[#372E29] mb-4">Share a story</h2>

        {/* Title */}
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title (optional)"
          className="w-full bg-[#FFFBF5] rounded-md px-4 py-3 outline-none focus:ring-2 focus:ring-[#C5A67B] mb-3"
        />

        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-2 rounded-md bg-[#F3E8D1] px-2 py-2">
          <button className="px-3 py-1 rounded hover:bg-[#E8D7B8]" onClick={() => apply("bold")}>B</button>
          <button className="px-3 py-1 rounded hover:bg-[#E8D7B8]" onClick={() => apply("italic")}><span className="italic">I</span></button>
          <button className="px-3 py-1 rounded hover:bg-[#E8D7B8]" onClick={() => apply("underline")}><span className="underline">U</span></button>
          <div className="h-6 w-px bg-[#C5A67B] mx-1" />
          <button className="px-3 py-1 rounded hover:bg-[#E8D7B8]" onClick={() => apply("insertUnorderedList")}>••</button>
          <button className="px-3 py-1 rounded hover:bg-[#E8D7B8]" onClick={() => apply("insertOrderedList")}>1.</button>
        </div>

        {/* Editor */}
        <div
          ref={editorRef}
          contentEditable
          suppressContentEditableWarning
          className="mt-2 min-h-[220px] w-full bg-[#FFFBF5] rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[#C5A67B]"
          aria-label="Story content editor"
        />

        {/* Attachment */}
        <div className="mt-4 border border-dashed border-[#C5A67B] rounded-md p-4 bg-[#F7F0E3] flex items-center gap-3">
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="shrink-0 bg-[#C9B289] text-[#372E29] px-3 py-2 rounded-md"
          >
            ⬆️ Add a media attachment
          </button>
          <div className="text-sm text-[#372E29]">
            Photo, video, audio ya PDF jod sakte ho.
            {attachment && <span className="ml-2 font-medium">({attachment.name})</span>}
          </div>
          <input
            ref={fileRef}
            type="file"
            className="hidden"
            onChange={handleAttach}
            accept="image/*,video/*,audio/*,.pdf"
          />
        </div>

        {/* Footer */}
        <div className="mt-3 flex items-center justify-between text-sm text-[#372E29]">
          <span>by {firstName} {lastName}</span>
          <button
            type="button"
            onClick={publish}
            className="bg-[#9B8066] hover:opacity-95 text-white font-medium px-6 py-2 rounded-md"
          >
            Publish
          </button>
        </div>
      </div>
    </div>
  );
};

export default StoriesSection;
