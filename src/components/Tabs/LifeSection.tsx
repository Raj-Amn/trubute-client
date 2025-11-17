
import React, { useRef, useState } from "react";

type LifeProps = {
  firstName: string;
  lastName: string;
  onPublishLife?: (chapter: {
    title: string;
    content: string;
    attachment?: File | null;
  }) => void;
};

const LifeSection: React.FC<LifeProps> = ({ firstName, lastName, onPublishLife }) => {
  const [title, setTitle] = useState("");
  const [chapter, setChapter] = useState("");
  const [attachment, setAttachment] = useState<File | null>(null);
  const fileRef = useRef<HTMLInputElement | null>(null);

  const applyFormat = (cmd: "bold" | "italic" | "underline" | "insertUnorderedList" | "insertOrderedList") => {
    document.execCommand(cmd, false);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setAttachment(file);
  };

  const handlePublish = () => {
    const payload = { title, content: chapter, attachment };

    if (onPublishLife) {
      onPublishLife(payload);
    } else {
      console.log("Life chapter published:", payload);
      alert("Life chapter published (demo). Check console.");
    }

    setTitle("");
    setChapter("");
    setAttachment(null);
    if (fileRef.current) fileRef.current.value = "";
  };

  return (
    <div className="space-y-6">
      <div className="text-[#372E29] leading-relaxed">
        <p>
          In this section, you can create a chapter-by-chapter biography of {firstName}.
          Help others experience life through {firstName}'s eyes.
        </p>
        <p className="mt-3">
          Describe memorable events from childhood, youth, and adulthood.
          Collaborate with family to build a complete and rich life story.
        </p>
      </div>

      <div className="bg-[#D4C4A5] rounded-lg p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-[#372E29] mb-4">
          Add a Life Story Chapter
        </h2>

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title (optional)"
          className="w-full bg-[#FFFBF5] rounded-md px-4 py-3 outline-none focus:ring-2 focus:ring-[#C5A67B]"
        />

        {/* Toolbar */}
        <div className="mt-3 flex flex-wrap items-center gap-2 rounded-md bg-[#F3E8D1] px-2 py-2">
          <button className="px-3 py-1 rounded hover:bg-[#E8D7B8]" onClick={() => applyFormat("bold")}>B</button>
          <button className="px-3 py-1 rounded hover:bg-[#E8D7B8]" onClick={() => applyFormat("italic")}><span className="italic">I</span></button>
          <button className="px-3 py-1 rounded hover:bg-[#E8D7B8]" onClick={() => applyFormat("underline")}><span className="underline">U</span></button>
          <div className="h-6 w-px bg-[#C5A67B] mx-1" />
          <button className="px-3 py-1 rounded hover:bg-[#E8D7B8]" onClick={() => applyFormat("insertUnorderedList")}>••</button>
          <button className="px-3 py-1 rounded hover:bg-[#E8D7B8]" onClick={() => applyFormat("insertOrderedList")}>1.</button>
        </div>

        {/* Editable area */}
        <div
          contentEditable
          suppressContentEditableWarning
          onInput={(e) => setChapter((e.target as HTMLDivElement).innerHTML)}
          className="mt-2 min-h-[180px] w-full bg-[#FFFBF5] rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[#C5A67B]"
        />

        {/* File upload */}
        <div className="mt-4 border border-dashed border-[#C5A67B] rounded-md p-4 bg-[#F7F0E3] flex items-center gap-3">
          <button
            onClick={() => fileRef.current?.click()}
            className="shrink-0 bg-[#C9B289] text-[#372E29] px-3 py-2 rounded-md"
          >
            ⬆️ Add a media attachment
          </button>
          <div className="text-sm text-[#372E29]">
            Add a photo, video, song, or PDF to this chapter.
            {attachment && <span className="ml-2 font-medium">({attachment.name})</span>}
          </div>
          <input
            ref={fileRef}
            type="file"
            className="hidden"
            onChange={handleFileSelect}
            accept="image/*,video/*,audio/*,.pdf"
          />
        </div>

        <div className="mt-3 flex items-center justify-between text-sm text-[#372E29]">
          <span>by {firstName} {lastName}</span>
          <button
            onClick={handlePublish}
            className="bg-[#A67C52] text-white font-medium px-6 py-2 rounded-md"
          >
            Publish
          </button>
        </div>
      </div>
    </div>
  );
};

export default LifeSection;
