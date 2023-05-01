import CommonProps from "@/models/CommonProps";
import ContactModel, { AddressModel } from "@/models/ContactModel";
import { NextPage } from "next";
import { Fragment, useEffect, useState } from "react";
import { Button, Card, FloatingLabel, Form } from "react-bootstrap";
import {
  Control,
  FieldErrors,
  UseFormRegister,
  useFieldArray,
} from "react-hook-form";

interface UserAddressProps extends CommonProps {
  register: UseFormRegister<ContactModel>;
  control: Control<ContactModel>;
  errors: FieldErrors<ContactModel>;
}

const UserAddress: NextPage<UserAddressProps> = (props) => {
  const { register, control, errors } = props;
  const { append, remove, fields, replace } = useFieldArray({
    control,
    name: "address",
  });

  const addAddress = () => {
    append({ addressLine1: "", addressLine2: "", city: "" });
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
    },
    {
      addressLine1: "Sarvodya Nagar",
      addressLine2: "Behind Ara central School",
      city: "Ara",
    },
  ];

  const setAddressValue = () => {
    replace(initialValues);
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
