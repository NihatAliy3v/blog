import { Box, Button, Stack, styled, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { ButtonComponent } from "../../common/Button";
import useYupValidationResolver from "../../../hooks/useYupValidationResolver ";
import { blogValidation } from "./index.validation";
import { useContext, useState } from "react";
import { JwtPayload } from "jwt-decode";
import { AuthContext } from "../../../contexts/AuthContext";
import api from "../../../services/api";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});
const BlogForm = () => {
  const resolver = useYupValidationResolver(blogValidation);
  const [imagePreview, setImagePreview] = useState<string | ArrayBuffer | null>(
    null
  );
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  const { user } = context;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver });

  const nameIdentifierKey = import.meta.env.VITE_NAMEIDENTIFIER_KEY;

  const onSubmit = (data:any) => {
    console.log({
      ...data,
      createdBy: user && user[nameIdentifierKey as keyof JwtPayload],
    });

    const formData = new FormData();

    if (data.file && data.file[0]) {
        formData.append("file", data.file[0]);
      }
      formData.append("subject", data.subject);
      formData.append("content", data.content);
      
      const createdByValue = user && user[nameIdentifierKey as keyof JwtPayload];
      if (createdByValue) {
        formData.append("createdBy", createdByValue as string);
      }

      api.post("/api/BlogPosts",formData)
  };
  console.log(errors);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="pt-[90px] w-[500px] mx-auto"
    >
      <Stack gap="20px" alignItems="center">
        <Box className="w-full">
          <TextField
            error={!!errors.subject}
            type="text"
            id="subject"
            fullWidth
            {...register("subject")}
            label="subject"
            helperText={errors.subject?.message as string}
          />
        </Box>

        <Box className="w-full">
          <TextField
            error={!!errors.content}
            multiline
            maxRows={8}
            id="content"
            fullWidth
            {...register("content")}
            label="content"
            helperText={errors.content?.message as string}
          />
        </Box>

        {/* <Box>
          <input
            type="text"
            id="createdBy"
            value={1}
            hidden
            {...register("createdBy")}
          />
        </Box> */}

        <Stack gap="10px">
          <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
          >
            Upload file
            <VisuallyHiddenInput
              type="file"
              {...register("file")}
              onChange={handleFileChange}
            />
          </Button>
          {errors.file && <span>This field is required</span>}
          {imagePreview && (
            <Box>
              <img
                src={imagePreview as string}
                alt="Preview"
                style={{ maxWidth: "100%", maxHeight: "400px" }}
              />
            </Box>
          )}
        </Stack>
        <Stack className="w-[200px]" alignItems="center">
          <ButtonComponent variant="contained" type="submit" text="Submit" />
        </Stack>
      </Stack>
    </form>
  );
};

export default BlogForm;
