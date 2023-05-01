import * as Yup from "yup";

const ContactValidationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().required("Email is required"),
  address: Yup.array().of(
    Yup.object().shape({
      addressLine1: Yup.string().required("Address line 1 is required"),
      addressLine2: Yup.string(),
      city: Yup.string().required("City is required"),
    })
  ),
  countryId: Yup.number().required("Country is required"),
  //tags: Yup.string().required("Tag is required"),
  tags: Yup.array().of(Yup.string()).min(1, "Please select at least one tag"),
  isActive: Yup.boolean(),
  gender: Yup.string().required("Gender is required"),

  profilePicture: Yup.mixed()
    .test("required", "Profile picture is required", (value) => {
      const files = value as FileList;
      if (!files || files.length <= 0) return false;
      return true;
    })
    .test("fileSize", "Max 1mb file zise allowed", (value) => {
      const files = value as FileList;
      if (!files || files.length <= 0) return true;

      //files[0].size => //The value will be in bytes
      const fileSizeInByte = files[0].size;
      const FILE_SIZE = 1024 * 1024; // 1 MB in bytes
      return fileSizeInByte <= FILE_SIZE;
    }),
  recaptcha: Yup.string().required("Please verify that you are not a robot"),
});

export default ContactValidationSchema;
