// src/pages/MemorialPage.tsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import HeaderSection from "../components/Tabs/HeaderSection";
import MemoryTabs from "../components/Tabs/MemoryTabs";

type Memorial = {
  _id: string;
  firstName: string;
  lastName: string;
  website: string;
};

const ViewMemorialPage: React.FC = () => {
  const { idOrWebsite = "" } = useParams<{ idOrWebsite: string }>();
  const [memorial, setMemorial] = useState<Memorial | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Base URL without trailing slash
  const API_BASE =process.env.REACT_APP_API_BASE;

  useEffect(() => {
    if (!idOrWebsite) return;

    setLoading(true);
    fetch(`${API_BASE}/memorials/${idOrWebsite}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setMemorial(data.memorial);
      })
      .catch(() => setError("Failed to load memorial"))
      .finally(() => setLoading(false));
  }, [idOrWebsite]);

  if (loading) return <div className="p-6 text-center">Loading memorial...</div>;
  if (error) return <div className="p-6 text-center text-red-600">{error}</div>;
  if (!memorial) return <div className="p-6 text-center">No memorial found.</div>;

  return (
    <div>
      <HeaderSection firstName={memorial.firstName} lastName={memorial.lastName} />

      <div className="max-w-5xl mx-auto px-4 py-6 grid-cols-3">
        <MemoryTabs firstName={memorial.firstName} lastName={memorial.lastName} />
      </div>
    </div>
  );
};

export default ViewMemorialPage;
