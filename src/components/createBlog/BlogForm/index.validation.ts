import * as Yup from "yup";

export const blogValidation = Yup.object().shape({
  file: Yup.mixed().test("required", "File is required", (value) => {
    return value && (value as FileList).length > 0;
  }),
  subject: Yup.string()
    .min(5, "minimum 5 simvols")
    .required("Subject is required"),
  content: Yup.string()
    .min(100, "minimum 100 simvols")
    .required("Content is required"),
});
