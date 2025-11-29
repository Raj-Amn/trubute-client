// import { Box, Typography } from "@mui/material";
// import AboutSectionCard from "./AboutSectionCard";
// import MemorialCarousel from "./MemorialCarousel";
// import dayjs from "dayjs";

// const formatDate = (isoDate: string | undefined) => {
//   if (!isoDate) return "—";
//   return dayjs(isoDate).format("DD MMM YYYY");
// };

// const AboutTab = ({ memorial }: any) => {
//   return (
//     <Box sx={{ p: 2 }}>
//       <Typography
//         variant="h4"
//         fontWeight={700}
//         sx={{ color: "#0b2c52", mb: 3, textAlign: "center" }}
//       >
//         Honoring the Life of {memorial?.firstName}{" "}
//         {memorial?.middleName || ""} {memorial?.lastName}
//       </Typography>

//       <MemorialCarousel>
//         {/* PERSONAL DETAILS */}
//         <AboutSectionCard title="Personal Details" bg="#f7f9fc">
//           <Typography>
//             <strong>Full Name:</strong> {memorial?.firstName}{" "}
//             {memorial?.middleName || ""} {memorial?.lastName}
//           </Typography>

//           <Typography>
//             <strong>Relationship:</strong>{" "}
//             {memorial?.relationshipOther || memorial?.relationship}
//           </Typography>

//           <Typography>
//             <strong>Role / Designation:</strong>{" "}
//             {memorial?.designationOther || memorial?.designation}
//           </Typography>

//           {memorial?.specialDesignation && (
//             <Typography>
//               <strong>Special Honor:</strong> {memorial?.specialDesignation}
//             </Typography>
//           )}

//           {memorial?.title && (
//             <Typography>
//               <strong>Title:</strong> {memorial?.title}
//             </Typography>
//           )}

//           {memorial?.description && (
//             <Typography>
//               <strong>Description:</strong> {memorial?.description}
//             </Typography>
//           )}

//           {memorial?.location && (
//             <Typography>
//               <strong>Location:</strong> {memorial?.location}
//             </Typography>
//           )}
//         </AboutSectionCard>

//         {/* BIRTH INFO */}
//         <AboutSectionCard title="Birth Information" bg="#fff2f2">
//           <Typography>
//             <strong>Date of Birth:</strong> {formatDate(memorial?.bornDay)}
//           </Typography>

//           <Typography>
//             <strong>Birthplace:</strong>{" "}
//             {memorial?.bornCity || "—"}, {memorial?.bornState || "—"},{" "}
//             {memorial?.bornCountry || "—"}
//           </Typography>
//         </AboutSectionCard>

//         {/* PASSING INFO */}
//         <AboutSectionCard title="In Loving Memory" bg="#edf3ff">
//           <Typography>
//             <strong>Date of Passing:</strong> {formatDate(memorial?.passedDay)}
//           </Typography>

//           <Typography>
//             <strong>Place:</strong>{" "}
//             {memorial?.passedCity || "—"}, {memorial?.passedState || "—"},{" "}
//             {memorial?.passedCountry || "—"}
//           </Typography>
//         </AboutSectionCard>

//         {/* LEGACY */}
//         <AboutSectionCard title="Legacy" bg="#fff8e8">
//           <Typography sx={{ lineHeight: 1.7 }}>
//             {memorial?.moreDetails ||
//               "Their light continues to shine through those they touched."}
//           </Typography>
//         </AboutSectionCard>

//         {/* WEBSITE + PLAN */}
//         <AboutSectionCard title="Memorial Information" bg="#f4fafb">
//           <Typography>
//             <strong>Memorial Page:</strong> {memorial?.website}
//           </Typography>

//           <Typography>
//             <strong>Plan:</strong> {memorial?.plan}
//           </Typography>

//           <Typography>
//             <strong>Privacy:</strong>{" "}
//             {memorial?.privacy === "public"
//               ? "Public – Anyone can view"
//               : "Private – Only invited viewers"}
//           </Typography>

//           <Typography>
//             <strong>Status:</strong> {memorial?.status}
//           </Typography>
//         </AboutSectionCard>
//       </MemorialCarousel>
//     </Box>
//   );
// };

// export default AboutTab;
import { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import AboutSectionCard from "./AboutSectionCard";
import MemorialCarousel from "./MemorialCarousel";
import dayjs from "dayjs";
import axiosInstance from "../api/axiosInstance";
import { useAuth } from "../hooks/useAuth";

const formatDate = (isoDate: string | undefined) => {
  if (!isoDate) return "—";
  return dayjs(isoDate).format("DD MMM YYYY");
};

const AboutTab = ({ memorial, reloadMemorial }: any) => {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ ...memorial });
  const user=useAuth()
  console.log(user,memorial,'memorial')

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      await axiosInstance.put(`/memorial/${memorial._id}`, form);
      setOpen(false);
      reloadMemorial(); // refresh data after update
    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  };

  const isOwner = user.user?.id === memorial?.createdBy;

  return (
    <Box sx={{ p: 2 }}>
      <Typography
        variant="h4"
        fontWeight={700}
        sx={{ color: "#0b2c52", mb: 3, textAlign: "center" }}
      >
        Honoring the Life of {memorial?.firstName}{" "}
        {memorial?.middleName || ""} {memorial?.lastName}
      </Typography>

      {/* SHOW EDIT BUTTON ONLY IF USER IS CREATOR */}
      {isOwner && (
        <Box sx={{ textAlign: "right", mb: 2 }}>
          <Button variant="contained" onClick={() => setOpen(true)}>
            Edit Details
          </Button>
        </Box>
      )}

      {/* DETAILS CAROUSEL */}
      <MemorialCarousel>
        <AboutSectionCard title="Personal Details" bg="#f7f9fc">
          <Typography>
            <strong>Full Name:</strong> {memorial?.firstName}{" "}
            {memorial?.middleName || ""} {memorial?.lastName}
          </Typography>

          <Typography>
            <strong>Relationship:</strong>{" "}
            {memorial?.relationshipOther || memorial?.relationship}
          </Typography>

          <Typography>
            <strong>Designation:</strong>{" "}
            {memorial?.designationOther || memorial?.designation}
          </Typography>

          {memorial?.title && (
            <Typography>
              <strong>Title:</strong> {memorial?.title}
            </Typography>
          )}

          {memorial?.description && (
            <Typography>
              <strong>Description:</strong> {memorial?.description}
            </Typography>
          )}

          {memorial?.location && (
            <Typography>
              <strong>Location:</strong> {memorial?.location}
            </Typography>
          )}
        </AboutSectionCard>

        <AboutSectionCard title="Birth Information" bg="#fff2f2">
          <Typography>
            <strong>Date of Birth:</strong> {formatDate(memorial?.bornDay)}
          </Typography>

          <Typography>
            <strong>Birthplace:</strong> {memorial?.bornCity}, {memorial?.bornState},{" "}
            {memorial?.bornCountry}
          </Typography>
        </AboutSectionCard>

        <AboutSectionCard title="In Loving Memory" bg="#edf3ff">
          <Typography>
            <strong>Date of Passing:</strong> {formatDate(memorial?.passedDay)}
          </Typography>

          <Typography>
            <strong>Place:</strong> {memorial?.passedCity},{" "}
            {memorial?.passedState}, {memorial?.passedCountry}
          </Typography>
        </AboutSectionCard>

        <AboutSectionCard title="Legacy" bg="#fff8e8">
          <Typography sx={{ lineHeight: 1.7 }}>
            {memorial?.moreDetails ||
              "Their light continues to shine through those they touched."}
          </Typography>
        </AboutSectionCard>

        <AboutSectionCard title="Memorial Information" bg="#f4fafb">
          <Typography>
            <strong>Memorial Page:</strong> {memorial?.website}
          </Typography>
          <Typography>
            <strong>Plan:</strong> {memorial?.plan}
          </Typography>
          <Typography>
            <strong>Privacy:</strong> {memorial?.privacy}
          </Typography>
        </AboutSectionCard>
      </MemorialCarousel>

      {/* POPUP FORM FOR UPDATING DETAILS */}
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Edit Memorial Details</DialogTitle>
        <DialogContent sx={{ display: "grid", gap: 2, mt: 1 }}>
          <TextField
            label="First Name"
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Middle Name"
            name="middleName"
            value={form.middleName}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Last Name"
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Title"
            name="title"
            value={form.title}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Description"
            name="description"
            value={form.description}
            onChange={handleChange}
            multiline
            rows={3}
            fullWidth
          />
          <TextField
            label="Location"
            name="location"
            value={form.location}
            onChange={handleChange}
            fullWidth
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleUpdate}>
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AboutTab;
