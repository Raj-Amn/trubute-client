import React from "react";
import {
  Card, CardContent, TextField, Button, Typography, Alert, CircularProgress
} from "@mui/material";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSignup } from "../api/authApi";
import { useNavigate } from "react-router-dom";

const schema = z.object({
  fullName: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
});

type SignupForm = z.infer<typeof schema>;

const SignupPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<SignupForm>({
    resolver: zodResolver(schema),
  });

  const navigate = useNavigate();
  const mutation = useSignup();

const onSubmit = (data: SignupForm) => {
  const payload = {
    name: data.fullName,   // backend expects name
    email: data.email,
    password: data.password,
  };

  mutation.mutate(payload, {
    onSuccess: () => navigate("/login"),
  });
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="max-w-md w-full shadow-lg">
        <CardContent>

          <Typography variant="h5" align="center">Create Account</Typography>

          {mutation.isError && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {(mutation.error as any)?.response?.data?.message || "Signup failed"}
            </Alert>
          )}

          <form onSubmit={handleSubmit(onSubmit)}>

            <TextField
              label="Full Name"
              fullWidth
              sx={{ mt: 2 }}
              {...register("fullName")}
              error={!!errors.fullName}
              helperText={errors.fullName?.message}
            />

            <TextField
              label="Email"
              fullWidth
              sx={{ mt: 2 }}
              {...register("email")}
              error={!!errors.email}
              helperText={errors.email?.message}
            />

            <TextField
              label="Password"
              type="password"
              fullWidth
              sx={{ mt: 2 }}
              {...register("password")}
              error={!!errors.password}
              helperText={errors.password?.message}
            />

            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, py: 1.2 }}
              type="submit"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? <CircularProgress size={20} /> : "Sign Up"}
            </Button>

          </form>

        </CardContent>
      </Card>
    </div>
  );
};

export default SignupPage;
