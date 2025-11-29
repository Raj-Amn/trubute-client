import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Typography,
  Stack,
  MenuItem,
  Checkbox,
  InputAdornment,
  Collapse,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { RadioGroup, FormControlLabel, Radio } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { Divider, TextField } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import { Controller, useForm } from "react-hook-form";
import type { Control, FieldErrors } from "react-hook-form";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";

import { Card, CardContent, Grid } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useCreateMemorial } from "../api/memorialApi";

interface StepThreePlanProps {
  lovedOneForm: any;
}

const StepThreePlan: React.FC<StepThreePlanProps> = ({ lovedOneForm }) => {
  const plans = [
    {
      name: "Basic",
      price: "Free",
      subText: "Essential features. Our basic features are always free.",
      details: ["Essential features", "Basic support", "Memorial website"],
      type: "free",
    },
    {
      name: "Premium",
      price: "₹3,999 /yr",
      subText: "All features. Get full Premium access for a year.",
      details: [
        "Everything in Basic",
        "Custom domain",
        "Unlimited photos & tributes",
        "Priority support",
      ],
      type: "yearly",
    },
    {
      name: "Lifetime",
      price: "₹7,999 one-time",
      subText:
        "Everything in Premium, forever. Never worry about renewals or losing memories.",
      details: [
        "Everything in Premium",
        "Lifetime hosting",
        "Permanent access",
        "Dedicated support",
      ],
      type: "lifetime",
    },
  ];

  const handleLogData = () => {
    console.log("📝 Loved One Form Data:", lovedOneForm.getValues());
    alert("Check console for logged form data!");
  };

  return (
    <Box textAlign="center" mt={4}>
      <Typography
        variant="h5"
        fontWeight={600}
        color="#0b2c52"
        mb={3}
        textAlign="center"
      >
        Choose Your Payment Plan
      </Typography>

      <Controller
        name="plan"
        control={lovedOneForm.control}
        defaultValue=""
        render={({ field }) => (
          <Grid
            container
            spacing={3}
            justifyContent="center"
            alignItems="stretch"
          >
            {plans.map((plan) => (
              <Grid key={plan.name}>
                <Card
                  elevation={field.value === plan.name ? 6 : 2}
                  onClick={() => field.onChange(plan.name)}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    height: "100%",
                    cursor: "pointer",
                    borderRadius: 3,
                    border:
                      field.value === plan.name
                        ? "2px solid #b68b43"
                        : "1px solid #c5d3e0",
                    transition: "0.3s",
                    "&:hover": {
                      borderColor: "#b68b43",
                      transform: "translateY(-4px)",
                      boxShadow: "0 6px 14px rgba(0,0,0,0.08)",
                    },
                  }}
                >
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography
                      variant="h6"
                      color="#0b2c52"
                      fontWeight={700}
                      mb={1}
                    >
                      {plan.name}
                    </Typography>

                    <Typography
                      variant="h5"
                      color={plan.type === "free" ? "#0b2c52" : "#b68b43"}
                      fontWeight={700}
                      mb={1}
                    >
                      {plan.price}
                    </Typography>

                    {plan.type === "yearly" && (
                      <Typography variant="body2" color="text.secondary" mb={1}>
                        Renews annually
                      </Typography>
                    )}

                    {plan.type === "lifetime" && (
                      <Typography variant="body2" color="text.secondary" mb={1}>
                        One-time payment
                      </Typography>
                    )}

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      mb={2}
                      minHeight={50}
                    >
                      {plan.subText}
                    </Typography>

                    <Stack spacing={1} alignItems="flex-start" mb={2}>
                      {plan.details.map((item) => (
                        <Stack
                          key={item}
                          direction="row"
                          alignItems="center"
                          spacing={1}
                        >
                          <CheckCircleIcon
                            sx={{ color: "#b68b43", fontSize: 18 }}
                          />
                          <Typography variant="body2">{item}</Typography>
                        </Stack>
                      ))}
                    </Stack>
                  </CardContent>

                  <Box sx={{ p: 2 }}>
                    <Button
                      fullWidth
                      variant={
                        field.value === plan.name ? "contained" : "outlined"
                      }
                      onClick={() => field.onChange(plan.name)}
                      sx={{
                        borderRadius: 2,
                        py: 1,
                        fontWeight: 600,
                        color: field.value === plan.name ? "#fff" : "#0b2c52",
                        backgroundColor:
                          field.value === plan.name ? "#b68b43" : "#fff",
                        borderColor:
                          field.value === plan.name ? "#b68b43" : "#c5d3e0",
                        "&:hover": {
                          backgroundColor:
                            field.value === plan.name ? "#a17837" : "#f1f3f5",
                        },
                      }}
                    >
                      {field.value === plan.name ? "Selected" : "Select"}
                    </Button>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      />

      {lovedOneForm.formState.errors.plan && (
        <Typography color="error" mt={2}>
          {lovedOneForm.formState.errors.plan.message}
        </Typography>
      )}
    </Box>
  );
};

interface StepFourPrivacyProps {
  lovedOneForm: any;
}

const StepFourPrivacy: React.FC<StepFourPrivacyProps> = ({ lovedOneForm }) => {
  const navigate = useNavigate();
  const { mutate: createMemorial, isPending } = useCreateMemorial();

  const handleSubmit = () => {
    const data = lovedOneForm.getValues();

    // Construct payload
    const payload = {
      ...data,
      createdBy: "670f0c8b1234567890abcdef", // Replace with logged-in user id
    };

    // Send to backend
    createMemorial(payload, {
      onSuccess: (res) => {
        console.log("✅ Memorial created:", res.memorial);

        const website = data.website.trim().toLowerCase();
        alert("🎉 Memorial created successfully!");
        navigate(`/memorial/${website}`);
      },
      onError: (err: any) => {
        console.error("❌ Error creating memorial:", err);
        alert(err?.response?.data?.message || "Something went wrong!");
      },
    });
  };

  return (
    <Box mt={4}>
      <Typography
        variant="h5"
        textAlign="center"
        mb={3}
        color="#0b2c52"
        fontWeight={700}
      >
        Privacy Options
      </Typography>

      <Typography variant="body1" textAlign="center" mb={1}>
        Would you like to share your memorial with others or keep it private?
      </Typography>
      <Typography
        variant="body2"
        textAlign="center"
        color="text.secondary"
        mb={3}
      >
        (This can be changed later.)
      </Typography>

      <Controller
        name="privacy"
        control={lovedOneForm.control}
        defaultValue=""
        render={({ field }) => (
          <RadioGroup
            value={field.value || ""}
            onChange={(e) => field.onChange(e.target.value)}
          >
            {/* Public */}
            <Card
              sx={{
                border:
                  field.value === "public"
                    ? "2px solid #b68b43"
                    : "1px solid #c5d3e0",
                borderRadius: 3,
                mb: 2,
                transition: "0.3s",
                "&:hover": { borderColor: "#b68b43" },
              }}
            >
              <CardContent>
                <FormControlLabel
                  value="public"
                  control={<Radio color="primary" />}
                  label={
                    <Typography variant="h6" color="#0b2c52" fontWeight={600}>
                      All visitors can view and contribute
                    </Typography>
                  }
                />
                <Typography variant="body2" color="text.secondary">
                  This option allows easy access and collaboration. Recommended
                  for most memorials.
                </Typography>
              </CardContent>
            </Card>

            {/* Private */}
            <Card
              sx={{
                border:
                  field.value === "private"
                    ? "2px solid #b68b43"
                    : "1px solid #c5d3e0",
                borderRadius: 3,
                transition: "0.3s",
                "&:hover": { borderColor: "#b68b43" },
              }}
            >
              <CardContent>
                <FormControlLabel
                  value="private"
                  control={<Radio color="primary" />}
                  label={
                    <Typography variant="h6" color="#0b2c52" fontWeight={600}>
                      Visible only to me
                    </Typography>
                  }
                />
                <Typography variant="body2" color="text.secondary">
                  Choose this option if you do not want the memorial to be
                  visible to others at this time.
                </Typography>
              </CardContent>
            </Card>
          </RadioGroup>
        )}
      />

      {lovedOneForm.formState.errors.privacy && (
        <Typography color="error" mt={1} fontSize="0.875rem">
          {lovedOneForm.formState.errors.privacy.message}
        </Typography>
      )}

      <Box textAlign="center" mt={4}>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={isPending}
          sx={{
            backgroundColor: "#b68b43",
            borderRadius: 2,
            px: 4,
            py: 1.2,
            fontWeight: 600,
            color: "#fff",
            "&:hover": { backgroundColor: "#a17837" },
          }}
        >
          {isPending ? "Submitting..." : "Finish & Create Memorial"}
        </Button>
      </Box>
    </Box>
  );
};

// --- Form Schemas ---
const signupSchema = z.object({
  firstName: z.string().min(1, "First name required"),
  lastName: z.string().min(1, "Last name required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Minimum 6 characters"),
});

const lovedOneSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  middleName: z.string().optional(),
  lastName: z.string().min(1, "Last name is required"),
  gender: z.string().min(1, "Gender is required"),
  relationship: z.string().min(1, "Relationship is required"),
  relationshipOther: z.string().optional(),
  designation: z.string().min(1, "Designation is required"),
  designationOther: z.string().optional(),
  privacy: z.string().optional(),
  plan: z.string().optional(),

  website: z
    .string()
    .min(1, "Website name is required")
    .regex(/^[a-zA-Z0-9-]+$/, "Only letters, numbers, and hyphens are allowed"),
  specialDesignation: z.string().optional(),
  moreDetails: z.string().optional(),
  bornYear: z.string().optional(),
  bornMonth: z.string().optional(),
  bornDay: z.string().optional(),
  bornCity: z.string().optional(),
  bornState: z.string().optional(),
  bornCountry: z.string().optional(),
  passedYear: z.string().optional(),
  passedMonth: z.string().optional(),
  passedDay: z.string().optional(),
  passedCity: z.string().optional(),
  passedState: z.string().optional(),
  passedCountry: z.string().optional(),
  status: z.string().optional(),
  title: z.string().optional(),
  description: z.string().optional(),
  location: z.string().optional(),
});

export type SignupFormData = z.infer<typeof signupSchema>;
export type LovedOneFormData = z.infer<typeof lovedOneSchema>;

export const CreateTributePage: React.FC = () => {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setActiveStep(1);
    }
  }, []);

  const first = params.get("first") || "";
  const last = params.get("last") || "";

  const steps = [
    "Sign in or Create Account",
    "About your loved one",
    "Choose your plan",
    "Privacy options",
  ];

  const [activeStep, setActiveStep] = useState(0);

  // --- Form hooks ---
  const signupForm = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: { firstName: "", lastName: "", email: "", password: "" },
  });

  const lovedOneForm = useForm<LovedOneFormData>({
    resolver: zodResolver(lovedOneSchema),
    defaultValues: {
      firstName: first,
      middleName: "",
      lastName: last,
      gender: "",
      relationship: "",
      designation: "",
      specialDesignation: "",
      moreDetails: "",
      plan: "",
      privacy: "public",
    },
  });

  useEffect(() => {
    lovedOneForm.reset({ firstName: first, lastName: last });
  }, [first, last, lovedOneForm]);

  const handleBack = () => setActiveStep((prev) => Math.max(prev - 1, 0));
  const handleNext = () => setActiveStep((prev) => prev + 1);

  const handleSignupSubmit = (data: SignupFormData) => {
    console.log("✅ Signup data:", data);
    setActiveStep(1);
  };

  const handleLovedOneSubmit = (data: LovedOneFormData) => {
    console.log("✅ Loved one data:", data);
    setActiveStep(2);
  };

  return (
    <Box
      sx={{
        background: "linear-gradient(180deg, #e8f0f7 0%, #ffffff 100%)",
        minHeight: "100vh",
        py: 6,
      }}
    >
      <Container maxWidth="md">
        <Typography
          variant="h4"
          textAlign="center"
          fontWeight={600}
          mb={4}
          color="text.primary"
        >
          Create a Memorial Website
        </Typography>

        <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 5 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Paper
          elevation={3}
          sx={{
            p: { xs: 3, md: 5 },
            borderRadius: 4,
            backgroundColor: "#fff",
            maxWidth: 900,
            mx: "auto",
          }}
        >
          {activeStep === 0 && (
            <StepOneSignup
              control={signupForm.control}
              errors={signupForm.formState.errors}
              onSubmit={signupForm.handleSubmit(handleSignupSubmit)}
            />
          )}

          {activeStep === 1 && (
            <StepTwoLovedOne
              control={lovedOneForm.control}
              errors={lovedOneForm.formState.errors}
              onSubmit={lovedOneForm.handleSubmit(handleLovedOneSubmit)}
            />
          )}

          {activeStep === 2 && <StepThreePlan lovedOneForm={lovedOneForm} />}
          {activeStep === 3 && <StepFourPrivacy lovedOneForm={lovedOneForm} />}

          <Stack direction="row" justifyContent="space-between" mt={4}>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              variant="outlined"
              sx={{ borderRadius: 2 }}
            >
              Back
            </Button>

            {activeStep > 1 && activeStep < steps.length - 1 && (
              <Button
                onClick={handleNext}
                variant="contained"
                sx={{
                  backgroundColor: "#b68b43",
                  borderRadius: 2,
                  "&:hover": { backgroundColor: "#a17837" },
                }}
              >
                Continue
              </Button>
            )}
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
};

interface StepOneSignupProps {
  control: Control<SignupFormData>;
  errors: FieldErrors<SignupFormData>;
  onSubmit: () => void;
}

const StepOneSignup: React.FC<StepOneSignupProps> = ({
  control,
  errors,
  onSubmit,
}) => {
  return (
    <form onSubmit={onSubmit}>
      <Stack spacing={3}>
        <Typography variant="h5" textAlign="center">
          Sign in or Create an Account
        </Typography>

        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={4}
          alignItems="center"
          justifyContent="space-between"
        >
          <Stack spacing={2} flex={1} alignItems="center">
            <Typography variant="body1">Use your social profile:</Typography>
            <Button
              variant="contained"
              startIcon={<FacebookIcon />}
              fullWidth
              sx={{
                backgroundColor: "#1877f2",
                "&:hover": { backgroundColor: "#145dbf" },
                borderRadius: 2,
                py: 1.2,
                fontWeight: 500,
                maxWidth: 280,
              }}
            >
              Sign in with Facebook
            </Button>
            <Button
              variant="outlined"
              startIcon={<GoogleIcon />}
              fullWidth
              sx={{
                borderColor: "#dadce0",
                borderRadius: 2,
                py: 1.2,
                fontWeight: 500,
                maxWidth: 280,
              }}
            >
              Sign in with Google
            </Button>
          </Stack>

          <Divider
            orientation="vertical"
            flexItem
            sx={{
              mx: 3,
              display: { xs: "none", md: "block" },
              borderColor: "#ccc",
            }}
          />

          <Stack spacing={2} flex={1} sx={{ width: "100%", maxWidth: 350 }}>
            <Typography variant="body1">Or sign up manually:</Typography>

            <Controller
              name="firstName"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="First name"
                  size="small"
                  fullWidth
                  error={!!errors.firstName}
                  helperText={errors.firstName?.message}
                />
              )}
            />

            <Controller
              name="lastName"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Last name"
                  size="small"
                  fullWidth
                  error={!!errors.lastName}
                  helperText={errors.lastName?.message}
                />
              )}
            />

            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Email"
                  size="small"
                  fullWidth
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              )}
            />

            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Password"
                  type="password"
                  size="small"
                  fullWidth
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />
              )}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: "#b68b43",
                borderRadius: 2,
                py: 1.2,
                fontWeight: 500,
                "&:hover": { backgroundColor: "#a17837" },
              }}
            >
              Continue
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </form>
  );
};

interface StepTwoLovedOneProps {
  control: Control<LovedOneFormData>;
  errors: FieldErrors<LovedOneFormData>;
  onSubmit: () => void;
}

const relationshipOptions = [
  "Mother",
  "Father",
  "Sister",
  "Brother",
  "Spouse",
  "Friend",
  "Grandparent",
  "Other",
];

const designationOptions = [
  "Doctor",
  "Teacher",
  "Engineer",
  "Artist",
  "Lawyer",
  "Student",
  "Other",
];

const StepTwoLovedOne: React.FC<StepTwoLovedOneProps> = ({
  control,
  errors,
  onSubmit,
}) => {
  const [relationshipOther, setRelationshipOther] = useState(false);
  const [designationOther, setDesignationOther] = useState(false);
  const [showMoreInfo, setShowMoreInfo] = useState(false);

  // const onSubmit: SubmitHandler<LovedOneFormData> = (data) => {
  //   console.log("🕊️ Loved One Data Submitted:", data);
  //   alert("✅ Tribute data logged successfully!");
  // };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box
        sx={{
          background: "linear-gradient(180deg, #e8f0f7 0%, #ffffff 100%)",
          borderRadius: 3,
          p: { xs: 3, md: 5 },
          boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        <form onSubmit={onSubmit}>
          <Stack spacing={2}>
            <Typography
              variant="h5"
              textAlign="center"
              fontWeight={600}
              color="#0b2c52"
            >
              About Your Loved One
            </Typography>

            {/* --- First Name --- */}
            <Controller
              name="firstName"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="First Name"
                  fullWidth
                  error={!!errors.firstName}
                  helperText={errors.firstName?.message}
                  variant="outlined"
                />
              )}
            />

            {/* --- Middle Name --- */}
            <Controller
              name="middleName"
              control={control}
              render={({ field }) => (
                <TextField {...field} label="Middle Name" fullWidth />
              )}
            />

            {/* --- Last Name --- */}
            <Controller
              name="lastName"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Last Name"
                  fullWidth
                  error={!!errors.lastName}
                  helperText={errors.lastName?.message}
                />
              )}
            />

            {/* --- Gender --- */}
            <Typography variant="body1" mt={1} fontWeight={500}>
              Gender
            </Typography>
            <Controller
              name="gender"
              control={control}
              render={({ field }) => (
                <RadioGroup row {...field}>
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="Male"
                  />
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="Female"
                  />
                  <FormControlLabel
                    value="other"
                    control={<Radio />}
                    label="Other"
                  />
                </RadioGroup>
              )}
            />
            {errors.gender && (
              <Typography variant="caption" color="error">
                {errors.gender.message}
              </Typography>
            )}

            {/* --- Relationship Dropdown --- */}
            <Controller
              name="relationship"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  label="Relationship"
                  fullWidth
                  error={!!errors.relationship}
                  helperText={errors.relationship?.message}
                  onChange={(e) => {
                    field.onChange(e);
                    setRelationshipOther(e.target.value === "Other");
                  }}
                >
                  {relationshipOptions.map((opt) => (
                    <MenuItem key={opt} value={opt}>
                      {opt}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
            {relationshipOther && (
              <Controller
                name="relationshipOther"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Specify Relationship"
                    fullWidth
                  />
                )}
              />
            )}

            {/* --- Designation Dropdown --- */}
            <Controller
              name="designation"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  label="Designation"
                  fullWidth
                  error={!!errors.designation}
                  helperText={errors.designation?.message}
                  onChange={(e) => {
                    field.onChange(e);
                    setDesignationOther(e.target.value === "Other");
                  }}
                >
                  {designationOptions.map((opt) => (
                    <MenuItem key={opt} value={opt}>
                      {opt}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
            {designationOther && (
              <Controller
                name="designationOther"
                control={control}
                render={({ field }) => (
                  <TextField {...field} label="Specify Designation" fullWidth />
                )}
              />
            )}

            {/* --- Website --- */}
            <Controller
              name="website"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Website Name"
                  fullWidth
                  error={!!errors.website}
                  helperText={
                    errors.website
                      ? errors.website.message
                      : "Choose a short, memorable name (letters, numbers, hyphens)"
                  }
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        .tribute.com
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />

            {/* --- More Info Checkbox --- */}
            <FormControlLabel
              control={
                <Checkbox
                  checked={showMoreInfo}
                  onChange={(e) => setShowMoreInfo(e.target.checked)}
                />
              }
              label="Add more information (optional)"
            />

            {/* --- Expandable Section --- */}
            <Collapse in={showMoreInfo}>
              <Box
                sx={{
                  p: 2,
                  borderRadius: 2,
                  border: "1px solid #c5d3e0",
                  backgroundColor: "#f7fafc",
                }}
              >
                <Typography
                  variant="subtitle1"
                  fontWeight={600}
                  mb={1}
                  color="#0b2c52"
                >
                  Additional Information (can be updated later)
                </Typography>

                {/* --- Extra Profile Details --- */}
                <Stack spacing={2} mb={2}>
                  <Controller
                    name="title"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Title"
                        size="small"
                        fullWidth
                      />
                    )}
                  />

                  <Controller
                    name="description"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Short Description"
                        size="small"
                        multiline
                        rows={3}
                        fullWidth
                      />
                    )}
                  />

                  <Controller
                    name="location"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Address / Location"
                        size="small"
                        fullWidth
                      />
                    )}
                  />

                  <Controller
                    name="moreDetails"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="More Details (optional)"
                        size="small"
                        multiline
                        rows={3}
                        fullWidth
                      />
                    )}
                  />

                  <Controller
                    name="specialDesignation"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Special Designation"
                        size="small"
                        fullWidth
                      />
                    )}
                  />


                </Stack>

                {/* --- Born Section --- */}
                <Typography variant="body2" fontWeight={600} mt={3}>
                  Born
                </Typography>

                <Stack direction="row" spacing={2} alignItems="center">
                  <Controller
                    name="bornDay"
                    control={control}
                    render={({ field }) => (
                      <DatePicker
                        label="Date of Birth"
                        value={field.value ? dayjs(field.value) : null}
                        onChange={(date: any) =>
                          field.onChange(date ? date.toISOString() : "")
                        }
                        slotProps={{
                          textField: { size: "small", fullWidth: true },
                        }}
                      />
                    )}
                  />
                </Stack>

                <Stack direction="row" spacing={2} mt={1}>
                  <Controller
                    name="bornCity"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="City or Town"
                        size="small"
                        fullWidth
                      />
                    )}
                  />

                  <Controller
                    name="bornState"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        select
                        label="State"
                        size="small"
                        fullWidth
                      >
                        {[
                          "California",
                          "Texas",
                          "Florida",
                          "Ontario",
                          "Maharashtra",
                        ].map((state) => (
                          <MenuItem key={state} value={state}>
                            {state}
                          </MenuItem>
                        ))}
                      </TextField>
                    )}
                  />

                  <Controller
                    name="bornCountry"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        select
                        label="Country"
                        size="small"
                        fullWidth
                      >
                        {[
                          "United States",
                          "India",
                          "Canada",
                          "Australia",
                          "UK",
                        ].map((country) => (
                          <MenuItem key={country} value={country}>
                            {country}
                          </MenuItem>
                        ))}
                      </TextField>
                    )}
                  />
                </Stack>

                {/* --- Passed Away Section --- */}
                <Typography variant="body2" fontWeight={600} mt={3}>
                  Passed Away
                </Typography>

                <Stack direction="row" spacing={2} alignItems="center">
                  <Controller
                    name="passedDay"
                    control={control}
                    render={({ field }) => (
                      <DatePicker
                        label="Date of Passing"
                        value={field.value ? dayjs(field.value) : null}
                        onChange={(date: any) =>
                          field.onChange(date ? date.toISOString() : "")
                        }
                        slotProps={{
                          textField: { size: "small", fullWidth: true },
                        }}
                      />
                    )}
                  />
                </Stack>

                <Stack direction="row" spacing={2} mt={1}>
                  <Controller
                    name="passedCity"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="City or Town"
                        size="small"
                        fullWidth
                      />
                    )}
                  />

                  <Controller
                    name="passedState"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        select
                        label="State"
                        size="small"
                        fullWidth
                      >
                        {[
                          "California",
                          "Texas",
                          "Florida",
                          "Ontario",
                          "Maharashtra",
                        ].map((state) => (
                          <MenuItem key={state} value={state}>
                            {state}
                          </MenuItem>
                        ))}
                      </TextField>
                    )}
                  />

                  <Controller
                    name="passedCountry"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        select
                        label="Country"
                        size="small"
                        fullWidth
                      >
                        {[
                          "United States",
                          "India",
                          "Canada",
                          "Australia",
                          "UK",
                        ].map((country) => (
                          <MenuItem key={country} value={country}>
                            {country}
                          </MenuItem>
                        ))}
                      </TextField>
                    )}
                  />
                </Stack>
              </Box>
            </Collapse>

            {/* --- Submit Button --- */}
            <Box textAlign="right" mt={3}>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  backgroundColor: "#b68b43",
                  color: "white",
                  fontWeight: 600,
                  borderRadius: 2,
                  px: 4,
                  py: 1.2,
                  "&:hover": { backgroundColor: "#a17837" },
                }}
              >
                Save & Continue
              </Button>
            </Box>
          </Stack>
        </form>
      </Box>
    </LocalizationProvider>
  );
};

export default StepTwoLovedOne;
