import CommonProps from "@/models/CommonProps";
import ContactModel, { AddressModel } from "@/models/ContactModel";
import ContactValidationSchema from "@/validation/ContactValidationSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { NextPage } from "next";
import { Button, Card, FloatingLabel, Form } from "react-bootstrap";
import { useForm, useController } from "react-hook-form";
import UserAddress from "./UserAddress";
import { useEffect, useRef, useState } from "react";
import Select from "react-select";
import ReCAPTCHA from "react-google-recaptcha";

interface ContactUsProps extends CommonProps {}

const ContactUs: NextPage<ContactUsProps> = (props) => {
  const initialValues: AddressModel[] = [
    { addressLine1: "", addressLine2: "", city: "" },
  ];

  const countryList = [
    { value: 1, label: "India" },
    { value: 2, label: "United States" },
    { value: 3, label: "United Kindom" },
    { value: 4, label: "France" },
    { value: 5, label: "Brazil" },
    { value: 6, label: "Italy" },
  ];

  const tagList = [
    { value: "tag 1", label: "tag 1", selected: false },
    { value: "tag 2", label: "tag 2", selected: true },
    { value: "tag 3", label: "tag 3", selected: false },
    { value: "tag 4", label: "tag 4", selected: false },
    { value: "tag 5", label: "tag 5", selected: true },
  ];
  const {
    formState: { errors },
    handleSubmit,
    register,
    control,
    setValue,
    getValues,
  } = useForm<ContactModel>({
    resolver: yupResolver(ContactValidationSchema),
    defaultValues: {
      name: "",
      email: "",
      address: initialValues,
    },
  });

  const { field: countryId } = useController({
    name: "countryId",
    control,
  });
  const { field: tags } = useController({
    name: "tags",
    control,
  });

  const submitData = async (formData: ContactModel) => {
    console.log("formData", formData);
  };

  useEffect(() => {
    setValue("name", "Sonu Kumar", { shouldValidate: true });
    setValue("email", "kumarsonu676@gmail.com", { shouldValidate: true });
    setValue("countryId", 5);
  }, []);

  const onCountryChange = (option: any) => {
    countryId.onChange(option.value);
  };

  const [initialTag, setInitalTag] = useState(() => {
    const initVal = tagList.filter((x) => x.selected === true);
    tags.onChange(initVal.map((x) => x?.value));
    return initVal;
  });
  const onTagChange = (option: any) => {
    const newValue = option.map((x: any) => ({ ...x, selected: true }));
    setInitalTag(newValue);
    tags.onChange(option.map((x: any) => x.value));
  };

  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const resetCaptcha = () => {
    if (recaptchaRef.current) {
      recaptchaRef.current.reset();
      setValue("recaptcha", "");
    }
  };

  return (
    <div>
      <h1>Dynamic Form Example</h1>

      <Form
        method="post"
        autoComplete="off"
        className="login_form"
        onSubmit={handleSubmit(submitData)}
      >
        <Card>
          <Card.Header>Basic Information</Card.Header>
          <Card.Body>
            <Form.Group className="mb-3">
              <FloatingLabel label="Name*">
                <Form.Control
                  type="text"
                  placeholder="Name*"
                  autoComplete="off"
                  {...register("name")}
                />
              </FloatingLabel>
              {errors.name && (
                <span className="text-danger">{errors.name.message}</span>
              )}
            </Form.Group>

            <Form.Group className="mb-3">
              <FloatingLabel label="Email*">
                <Form.Control
                  type="text"
                  placeholder="Email*"
                  autoComplete="off"
                  {...register("email")}
                />
              </FloatingLabel>
              {errors.email && (
                <span className="text-danger">{errors.email.message}</span>
              )}
            </Form.Group>

            <Form.Group className="mb-3">
              <label>Country</label>
              <Select
                className="form-control"
                placeholder="Select country"
                options={countryList}
                isSearchable={true}
                value={countryList.find((x) => x.value === countryId.value)}
                onChange={onCountryChange}
                instanceId="countryIds"
              />

              {errors.countryId && (
                <span className="text-danger">{errors.countryId.message}</span>
              )}
            </Form.Group>

            <Form.Group className="mb-3">
              <label>Tags</label>
              <Select
                className="form-control"
                placeholder="Select tags"
                options={tagList}
                isSearchable={true}
                isMulti={true}
                value={initialTag}
                onChange={onTagChange}
                instanceId="tags"
              />

              {errors.tags && (
                <span className="text-danger">{errors.tags.message}</span>
              )}
            </Form.Group>

            <Form.Group className="mt-3">
              <Form.Check
                inline
                label="Status"
                type="checkbox"
                {...register("isActive")}
              />
              {errors.isActive && (
                <span className="text-danger">{errors.isActive.message}</span>
              )}
            </Form.Group>

            <Form.Group className="mt-3">
              <Form.Check
                inline
                label="Male"
                value={"M"}
                type="radio"
                {...register("gender")}
              />

              <Form.Check
                inline
                label="Female"
                value={"F"}
                type="radio"
                {...register("gender")}
              />

              {errors.gender && (
                <span className="text-danger">{errors.gender.message}</span>
              )}
            </Form.Group>

            <Form.Group className="mt-3">
              <label>Profile Picture*</label>
              <Form.Control
                type="file"
                multiple={true}
                placeholder="Profile Picture*"
                {...register("profilePicture")}
              />
              {errors.profilePicture && (
                <span className="text-danger">
                  {errors.profilePicture.message}
                </span>
              )}
            </Form.Group>

            <Form.Group className="mt-3">
              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                onChange={(value: string) =>
                  setValue("recaptcha", value, { shouldValidate: true })
                }
              />
              {errors.recaptcha && (
                <span className="text-danger">{errors.recaptcha.message}</span>
              )}

              <br />
              <br />
              <button
                type="button"
                className="btn btn-primary"
                onClick={resetCaptcha}
              >
                Reset Captcha
              </button>
            </Form.Group>
          </Card.Body>
        </Card>

        <UserAddress register={register} control={control} errors={errors} />

        <Form.Group className="mt-3 text-center">
          <Button variant="primary" type="submit" className="btn_main">
            Submit
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
};

export default ContactUs;
