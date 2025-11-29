import { useState } from "react";
import axiosInstance from "../utils/axiosInstance";

const usePhotoMedia = (memorialId: string) => {
  const [page, setPage] = useState(1);

  const fetchPhotos = async () => {
    const res = await axiosInstance.get(
      `/memorial/${memorialId}/media?page=${page}&limit=10&type=photo`
    );
    return res.data;
  };

  return { fetchPhotos, page, setPage };
};

export default usePhotoMedia;
