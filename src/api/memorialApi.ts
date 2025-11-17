import { useMutation } from "@tanstack/react-query";
import axiosInstance from "./axiosInstance";

export interface MemorialData {
  firstName: string;
  middleName?: string;
  lastName: string;
  gender?: string;
  relationship: string;
  relationshipOther?: string;
  designation: string;
  designationOther?: string;
  specialDesignation?: string;
  moreDetails?: string;

  bornYear?: string;
  bornMonth?: string;
  bornDay?: string;
  bornCity?: string;
  bornState?: string;
  bornCountry?: string;

  passedYear?: string;
  passedMonth?: string;
  passedDay?: string;
  passedCity?: string;
  passedState?: string;
  passedCountry?: string;

  website: string;
  plan: string;
  privacy: "public" | "private";
  createdBy: string;
}

const createMemorial = async (data: MemorialData) => {
  const res = await axiosInstance.post("/memorials", data);
  return res.data;
};

export const useCreateMemorial = () => {
  return useMutation({
    mutationFn: createMemorial,
  });
};
