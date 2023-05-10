import CommonProps from "@/models/CommonProps";
import ContactModel, { AddressModel } from "@/models/ContactModel";
import ContactValidationSchema from "@/validation/ContactValidationSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { NextPage } from "next";
import { Button, Card, FloatingLabel, Form } from "react-bootstrap";
import { useForm, useController, Controller } from "react-hook-form";
import UserAddress from "./UserAddress";
import { useEffect, useRef, useState } from "react";
import Select from "react-select";
//import ReCAPTCHA from "react-google-recaptcha";

interface ContactUsProps extends CommonProps {}

const ContactUs: NextPage<ContactUsProps> = (props) => {
  const initialValues: AddressModel[] = [
    { addressLine1: "", addressLine2: "", city: "", countryId: 0, stateId: "" },
  ];

  const countryList = [
    { id: 1, name: "India" },
    { id: 2, name: "United States" },
    { id: 3, name: "United Kindom" },
    { id: 4, name: "France" },
    { id: 5, name: "Brazil" },
    { id: 6, name: "Italy" },
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

  const submitData = async (formData: ContactModel) => {
    console.log("formData", formData);
  };

  useEffect(() => {
    setValue("name", "Sonu Kumar", { shouldValidate: true });
    setValue("email", "kumarsonu676@gmail.com", { shouldValidate: true });
    setValue("countryId", 5);
  }, []);

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
              <Controller
                control={control}
                name="countryId"
                render={({ field: { onChange, onBlur, value, name, ref } }) => (
                  <Select
                    placeholder="Select Country"
                    options={countryList}
                    getOptionValue={(option) => `${option.id}`}
                    getOptionLabel={(option) => `${option.name}`}
                    instanceId={"countryId"}
                    onChange={(option) => {
                      onChange(option?.id);
                    }}
                    onBlur={onBlur}
                    value={countryList.find((x) => x.id === value)}
                    name={name}
                    ref={ref}
                  />
                )}
              />
              {errors.countryId && (
                <span className="text-danger">{errors.countryId.message}</span>
              )}
            </Form.Group>

            <Form.Group className="mb-3">
              <Controller
                control={control}
                name={`tags`}
                render={({ field: { onChange, onBlur, value, name, ref } }) => (
                  <Select
                    placeholder="Select tag(s)"
                    options={tagList}
                    instanceId={`tags`}
                    onChange={(option) => {
                      const selectedValues = option.map((x) => {
                        return x.value;
                      });
                      onChange(selectedValues);
                    }}
                    isMulti={true}
                    onBlur={onBlur}
                    value={tagList.filter((x) => value?.includes(x.value))}
                    name={name}
                    ref={ref}
                  />
                )}
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
          </Card.Body>
        </Card>

        <UserAddress
          register={register}
          control={control}
          errors={errors}
          setValue={setValue}
          getValues={getValues}
        />

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
