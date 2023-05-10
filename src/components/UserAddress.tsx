import CommonProps from "@/models/CommonProps";
import ContactModel, { AddressModel } from "@/models/ContactModel";
import { NextPage } from "next";
import { Fragment, useEffect, useState } from "react";
import { Button, Card, FloatingLabel, Form } from "react-bootstrap";
import Select from "react-select";
import {
  Control,
  Controller,
  FieldErrors,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
  useFieldArray,
} from "react-hook-form";

interface UserAddressProps extends CommonProps {
  register: UseFormRegister<ContactModel>;
  control: Control<ContactModel>;
  errors: FieldErrors<ContactModel>;
  setValue: UseFormSetValue<ContactModel>;
  getValues: UseFormGetValues<ContactModel>;
}

interface StateDto {
  id: number;
  code: string;
  name: string;
  countryId: number;
}

const UserAddress: NextPage<UserAddressProps> = (props) => {
  const { register, control, errors, setValue, getValues } = props;
  const { append, remove, fields, replace, update } = useFieldArray({
    control,
    name: "address",
  });

  const countryList = [
    { id: 1, name: "India" },
    { id: 2, name: "United States" },
    { id: 3, name: "United Kindom" },
    { id: 4, name: "France" },
    { id: 5, name: "Brazil" },
    { id: 6, name: "Italy" },
  ];

  const stateList: StateDto[] = [
    { id: 1, code: "BR", name: "Bihar", countryId: 1 },
    { id: 2, code: "UP", name: "Utter Pradesh", countryId: 1 },
    { id: 3, code: "CA", name: "California", countryId: 2 },
    { id: 4, code: "FL", name: "Florida", countryId: 2 },
  ];

  const addAddress = () => {
    append({
      addressLine1: "",
      addressLine2: "",
      city: "",
      countryId: 0,
      stateId: "",
    });
  };

  const removeAddress = (index: number) => {
    //take confirmation then remove
    remove(index);
  };

  const initialValues: AddressModel[] = [
    {
      addressLine1: "Indrapuri",
      addressLine2: "House number: 79",
      city: "Patna",
      countryId: 0,
      stateId: "",
    },
    {
      addressLine1: "Sarvodya Nagar",
      addressLine2: "Behind Ara central School",
      city: "Ara",
      countryId: 0,
      stateId: "",
    },
  ];

  const setAddressValue = () => {
    replace(initialValues);
  };

  const [stateByCountry, setStateByCountry] = useState<{ state: StateDto[] }[]>(
    []
  );

  const onCountryChange = (index: number, countryId?: number) => {
    const filteredStates: StateDto[] = stateList.filter(
      (state) => state.countryId === countryId
    );

    const existingValue = getValues(`address.${index}`);
    // unmount fields and remount with updated value
    //update(index, { ...getValues(`address.${index}`), stateId: "" });
    setValue(`address.${index}.stateId`, "");

    setStateByCountry((prevOptions) => {
      const newOptions = [...prevOptions];
      newOptions[index] = { state: filteredStates };
      return newOptions;
    });
  };

  return (
    <>
      <Card className="mt-3">
        <Card.Header>Address</Card.Header>
        <Card.Body>
          <Button variant="primary" className="mb-3" onClick={setAddressValue}>
            Fill Address
          </Button>

          {fields.map((item, index) => (
            <Fragment key={item.id}>
              <Form.Group className="mb-3">
                <FloatingLabel label="Address Line 1*">
                  <Form.Control
                    type="text"
                    placeholder="Address Line 1*"
                    autoComplete="off"
                    {...register(`address.${index}.addressLine1`)}
                  />
                </FloatingLabel>
                {errors.address?.[index]?.addressLine1 && (
                  <span className="text-danger">
                    {errors.address?.[index]?.addressLine1?.message}
                  </span>
                )}
              </Form.Group>
              <Form.Group className="mb-3">
                <FloatingLabel label="Address Line 2">
                  <Form.Control
                    type="text"
                    placeholder="Address Line 2"
                    autoComplete="off"
                    {...register(`address.${index}.addressLine2`)}
                  />
                </FloatingLabel>
                {errors.address?.[index]?.addressLine2 && (
                  <span className="text-danger">
                    {errors.address?.[index]?.addressLine2?.message}
                  </span>
                )}
              </Form.Group>

              <Form.Group className="mb-3">
                <Controller
                  control={control}
                  name={`address.${index}.countryId`}
                  render={({
                    field: { onChange, onBlur, value, name, ref },
                  }) => (
                    <Select
                      placeholder="Select Country"
                      options={countryList}
                      getOptionValue={(option) => `${option.id}`}
                      getOptionLabel={(option) => `${option.name}`}
                      instanceId={`address.${index}.countryId`}
                      onChange={(option) => {
                        onChange(option?.id);
                        onCountryChange(index, option?.id);
                      }}
                      onBlur={onBlur}
                      value={countryList.find((x) => x.id === value)}
                      name={name}
                      ref={ref}
                    />
                  )}
                />
                {errors.address?.[index]?.countryId && (
                  <span className="text-danger">
                    {errors.address?.[index]?.countryId?.message}
                  </span>
                )}
              </Form.Group>

              <Form.Group className="mb-3">
                <Controller
                  control={control}
                  name={`address.${index}.stateId`}
                  render={({
                    field: { onChange, onBlur, value, name, ref },
                  }) => (
                    <Select
                      placeholder="Select State"
                      options={stateByCountry?.[index]?.state}
                      getOptionValue={(option) => `${option.code}`}
                      getOptionLabel={(option) => `${option.name}`}
                      instanceId={`address.${index}.stateId`}
                      onChange={(option) => {
                        onChange(option?.code);
                      }}
                      onBlur={onBlur}
                      value={stateByCountry?.[index]?.state.find(
                        (x) => x.code === value
                      )}
                      name={name}
                      ref={ref}
                    />
                  )}
                />
                {errors.address?.[index]?.stateId && (
                  <span className="text-danger">
                    {errors.address?.[index]?.stateId?.message}
                  </span>
                )}
              </Form.Group>

              <Form.Group className="mb-3">
                <FloatingLabel label="City*">
                  <Form.Control
                    type="text"
                    placeholder="City *"
                    autoComplete="off"
                    {...register(`address.${index}.city`)}
                  />
                </FloatingLabel>
                {errors.address?.[index]?.city && (
                  <span className="text-danger">
                    {errors.address?.[index]?.city?.message}
                  </span>
                )}
              </Form.Group>

              {index > 0 && (
                <Form.Group className="mb-3">
                  <Button variant="danger" onClick={() => removeAddress(index)}>
                    Remove
                  </Button>
                </Form.Group>
              )}

              <hr />
            </Fragment>
          ))}

          <Button variant="primary" onClick={addAddress}>
            Add Address
          </Button>
        </Card.Body>
      </Card>
    </>
  );
};

export default UserAddress;
