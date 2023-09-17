import { useContext } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import styled from "styled-components";
import { ModalContext } from "../../../../../context/ModalProvider";

const animatedComponents = makeAnimated();

const Container = styled.div``;

const customStyles = {
  option: (base) => {
    return {
      ...base,
    };
  },

  control: (styles) => {
    return {
      ...styles,
    };
  },

  menu: (styles) => {
    return {
      ...styles,
      maxHeight: 300,
      overflow: "scroll",
    };
  },

  multiValue: (provided, state) => {
    const background = state.data.background;
    const color = state.data.color;
    return {
      ...provided,
      background,
      color,
    };
  },

  multiValueLabel: (provided, state) => {
    const color = state.data.color;
    return {
      ...provided,
      color,
    };
  },
};

const SelectMenu = ({ data, isWeekly }) => {
  const { setWeeklyAutoRecharge, setMonthlyAutoRecharge } =
    useContext(ModalContext);

  const handleWeeklyChange = (e) => {
    const id = e.map(({ id }) => id);
    setWeeklyAutoRecharge(id);
  };

  const handleMonthlyChange = (e) => {
    const id = e.map(({ id }) => id);
    setMonthlyAutoRecharge(id);
  };

  return (
    <Container>
      <Select
        onChange={isWeekly ? handleWeeklyChange : handleMonthlyChange}
        styles={customStyles}
        closeMenuOnSelect={false}
        components={animatedComponents}
        isMulti
        options={data}
      />
    </Container>
  );
};

export default SelectMenu;
