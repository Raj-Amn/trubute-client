import React from "react";
import {
  Card, CardContent, TextField, Button, Typography, Alert, CircularProgress
} from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLogin } from "../api/authApi";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

type LoginForm = z.infer<typeof schema>;

const LoginPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>({
    resolver: zodResolver(schema),
  });

  const navigate = useNavigate();
  const { login } = useAuth();
  const mutation = useLogin();

  const onSubmit = (data: LoginForm) => {
    mutation.mutate(data, {
      onSuccess: (res) => {
        login(res);
        navigate("/");
      },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="max-w-md w-full shadow-lg">
        <CardContent>

          <Typography variant="h5" align="center">Login</Typography>

          {mutation.isError && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {(mutation.error as any)?.response?.data?.message || "Login failed"}
            </Alert>
          )}

          <form onSubmit={handleSubmit(onSubmit)}>

            <TextField
              label="Email"
              fullWidth
              sx={{ mt: 2 }}
              {...register("email")}
              error={!!errors.email}
              helperText={errors.email?.message}
            />

            <TextField
              type="password"
              label="Password"
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
              startIcon={<LoginIcon />}
              type="submit"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? <CircularProgress size={20} /> : "Login"}
            </Button>

          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
