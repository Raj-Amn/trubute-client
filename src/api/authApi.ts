import { useMutation } from "@tanstack/react-query";
import axiosInstance from "./axiosInstance";
import type { LoginInput, SignupInput } from "../types/authTypes";

const login = async (data: LoginInput) => {
  const res = await axiosInstance.post("/auth/login", data);
  return res.data;
};

const signup = async (data: SignupInput) => {
  const res = await axiosInstance.post("/auth/signup", data);
  return res.data;
};

export const useLogin = () =>
  useMutation({
    mutationFn: login,
  });

export const useSignup = () =>
  useMutation({
    mutationFn: signup,
  });
