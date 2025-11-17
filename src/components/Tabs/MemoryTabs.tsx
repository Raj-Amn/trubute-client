
import React, { useState } from "react";
import AboutSection from "./AboutSection";
import GallerySection from "./GallerySection";
import LifeSection from "./LifeSection";
import StoriesSection from "./StoriesSection";


type MemoryTabsProps = {
  firstName: string;
  lastName: string;
};

const MemoryTabs: React.FC<MemoryTabsProps> = ({ firstName, lastName }) => {
  const [activeTab, setActiveTab] = useState("about");

  const tabs = [
    { id: "about", label: "ABOUT" },
    { id: "life", label: "LIFE" },
    { id: "gallery", label: "GALLERY" },
    { id: "stories", label: "STORIES" },
  ];

  return (
    <div className="w-full">
      {/* Tabs header */}
      <div className="flex bg-[#D4B58B] rounded-t-lg overflow-hidden">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-3 font-semibold text-center transition-all duration-200 ${activeTab === tab.id
              ? "bg-[#FFFBF5] text-[#372E29]"
              : "bg-[#C5A67B] text-[#502A12]"
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tabs content */}
      <div className="bg-[#FFFBF5] p-6 rounded-b-lg shadow-sm">
        {activeTab === "about" && (
          <AboutSection firstName={firstName} lastName={lastName} />
        )}
        {activeTab === "life" && (
          <LifeSection firstName={firstName} lastName={lastName} />
        )}
        {activeTab === "gallery" && <GallerySection />}
        {activeTab === "stories" && (
          <StoriesSection firstName={firstName} lastName={lastName} />
        )}
      </div>
    </div>
  );
};

export default MemoryTabs;
