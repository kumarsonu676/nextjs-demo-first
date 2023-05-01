import { NextPage } from "next";
import { UseFormRegister } from "react-hook-form";
import Select from "react-select";

interface CustomSelectProps {
  options: [];
  register?: UseFormRegister<any>;
}
const CustomSelect: NextPage<CustomSelectProps> = (props) => {
  const { options, register } = props;

  return <Select options={options} />;
};

export default CustomSelect;
