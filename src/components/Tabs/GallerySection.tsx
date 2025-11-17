
import React, { useMemo, useRef, useState } from "react";

type MediaKind = "photo" | "video" | "audio";

const GallerySection: React.FC = () => {
  const [active, setActive] = useState<MediaKind>("photo");
  const [photos, setPhotos] = useState<File[]>([]);
  const [videos, setVideos] = useState<File[]>([]);
  const [audios, setAudios] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Map active tab to files + setter + accept string
  const ctx = useMemo(() => {
    switch (active) {
      case "photo":
        return {
          files: photos,
          setFiles: setPhotos,
          accept: "image/*",
          title: "Add Photos",
          help: "Choose images or drag and drop them here.",
        };
      case "video":
        return {
          files: videos,
          setFiles: setVideos,
          accept: "video/*",
          title: "Add Videos",
          help: "Choose videos or drag and drop them here.",
        };
      case "audio":
        return {
          files: audios,
          setFiles: setAudios,
          accept: "audio/*",
          title: "Add Audio",
          help: "Choose audio files or drag and drop them here.",
        };
    }
  }, [active, photos, videos, audios]);

  const openPicker = () => inputRef.current?.click();

  const filterByActive = (list: FileList | null) => {
    if (!list) return [];
    const arr = Array.from(list);
    if (active === "photo") return arr.filter((f) => f.type.startsWith("image/"));
    if (active === "video") return arr.filter((f) => f.type.startsWith("video/"));
    return arr.filter((f) => f.type.startsWith("audio/"));
  };

  const addFiles = (list: FileList | null) => {
    const valid = filterByActive(list);
    if (!valid.length) return;
    ctx.setFiles((prev) => [...prev, ...valid]);
  };

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    addFiles(e.dataTransfer.files);
  };

  const removeAt = (idx: number) => {
    ctx.setFiles((prev) => prev.filter((_, i) => i !== idx));
  };

  const clearAll = () => ctx.setFiles([]);

  return (
    <div className="space-y-6">
      {/* Tabs header */}
      <div className="bg-[#EADFC7] rounded-lg shadow-sm">
        <div className="grid grid-cols-3 text-center text-[#372E29] font-semibold pt-4">
          {(["photo", "video", "audio"] as MediaKind[]).map((k) => (
            <button
              key={k}
              onClick={() => setActive(k)}
              className={`py-3 transition ${active === k ? "border-b-2 border-[#372E29]" : "border-b border-[#CDBB9B]"
                }`}
            >
              {k.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Drop zone */}
        <div className="p-6">
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={onDrop}
            className={`rounded-md border-2 border-dashed p-8 flex flex-col items-center justify-center text-center transition
            ${isDragging ? "border-[#A67C52] bg-[#F3E8D1]" : "border-[#C5A67B] bg-[#E1D1B4]"}`}
          >
            <div className="w-10 h-10 rounded-full bg-[#8A7E6C] text-white flex items-center justify-center text-2xl mb-3">
              ↑
            </div>
            <p className="text-[#372E29] mb-3">{ctx.help}</p>
            <button
              type="button"
              onClick={openPicker}
              className="text-sm px-4 py-2 rounded-md bg-white border shadow-sm hover:bg-[#fff7ee]"
            >
              Choose files
            </button>
            <input
              ref={inputRef}
              type="file"
              multiple
              accept={ctx.accept}
              className="hidden"
              onChange={(e) => addFiles(e.target.files)}
            />
          </div>
        </div>
      </div>

      {/* Selected list / previews */}
      <div className="bg-[#D4C4A5] rounded-lg p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-2xl font-semibold text-[#372E29]">{ctx.title}</h3>
          {ctx.files.length > 0 && (
            <button
              type="button"
              onClick={clearAll}
              className="text-sm px-3 py-1 rounded-md bg-white border hover:bg-[#fff7ee]"
            >
              Clear all
            </button>
          )}
        </div>

        {ctx.files.length === 0 ? (
          <p className="text-[#372E29]/80 text-sm">No files added yet.</p>
        ) : active === "photo" ? (
          // Photo thumbnails
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {ctx.files.map((f, i) => {
              const src = URL.createObjectURL(f);
              return (
                <div key={i} className="relative group rounded-md overflow-hidden bg-white border">
                  <img src={src} alt={f.name} className="w-full h-32 object-cover" />
                  <div className="px-2 py-1 text-xs truncate text-[#372E29]">{f.name}</div>
                  <button
                    type="button"
                    onClick={() => removeAt(i)}
                    className="absolute top-1 right-1 text-xs bg-black/60 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition"
                  >
                    Remove
                  </button>
                </div>
              );
            })}
          </div>
        ) : (
          // File list for videos/audio
          <ul className="space-y-2">
            {ctx.files.map((f, i) => (
              <li key={i} className="flex items-center justify-between bg-white rounded-md border px-3 py-2">
                <div className="min-w-0">
                  <div className="text-sm font-medium text-[#372E29] truncate">{f.name}</div>
                  <div className="text-xs text-[#372E29]/70 truncate">{f.type || "unknown"}</div>
                </div>
                <button
                  type="button"
                  onClick={() => removeAt(i)}
                  className="text-xs px-2 py-1 rounded-md bg-[#cda97f] text-white hover:opacity-90"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default GallerySection;
