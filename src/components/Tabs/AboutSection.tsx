
import React, { useState } from "react";

type AboutProps = {
  firstName: string;
  lastName: string;
  onPublishTribute?: (text: string) => void; // optional
};

const AboutSection: React.FC<AboutProps> = ({ firstName, lastName, onPublishTribute }) => {
  const [text, setText] = useState("");

  const publish = () => {
    const t = text.trim();
    if (!t) return;
    onPublishTribute?.(t);
    // demo fallback
    if (!onPublishTribute) {
      console.log("Tribute published:", { text: t });
      alert("Tribute published (demo). Open console to see payload.");
    }
    setText("");
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <p className="italic text-2xl text-[#2A5E65]">
          “Let the memory of {firstName} be with us forever.”
        </p>
      </div>

      <div className="text-center text-[#372E29]">
        <p>
          This memorial website was created in memory of our loved one {firstName} {lastName}. <br />
          We will remember {firstName} forever.
        </p>
      </div>

      <div className="bg-[#E0D1AD] rounded-lg p-6 shadow-sm">
        <h2 className="text-[#372E29] font-semibold text-2xl">Leave a Tribute</h2>

        <div className="flex gap-6 mb-4">
          <button type="button" className="flex flex-col justify-center items-center px-6 py-6 text-[#372E29] hover:bg-[#D8C7A3] rounded-md">
            🌸<span className="text-sm mt-1">Lay a Flower</span>
          </button>
          <button type="button" className="flex flex-col justify-center items-center px-6 py-6 text-[#372E29] hover:bg-[#D8C7A3] rounded-md">
            🕯️<span className="text-sm mt-1">Light a Candle</span>
          </button>
          <button type="button" className="flex flex-col justify-center items-center px-6 py-6 text-[#372E29] hover:bg-[#D8C7A3] rounded-md">
            ✍️<span className="text-sm mt-1">Leave a Note</span>
          </button>
        </div>

        <label htmlFor="tribute" className="sr-only">Tribute</label>
        <textarea
          id="tribute"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={`Add your tribute text for ${firstName} here`}
          className="w-full p-4 bg-[#FFFFFF] rounded-md focus:outline-none focus:ring-[#372E29] focus:ring-1"
        />

        <div className="text-right mt-4">
          <button
            type="button"
            onClick={publish}
            disabled={!text.trim()}
            className={`font-medium px-12 py-3 rounded-lg ${text.trim() ? "bg-[#977755] text-white" : "bg-[#977755]/60 text-white cursor-not-allowed"}`}
          >
            Publish
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
