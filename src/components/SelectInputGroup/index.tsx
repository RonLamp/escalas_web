import React from "react";
import { Container } from "./styles";


type ISelectInputGroupProps = {
  options: {
    profiss_Id: string;
    profiss_name: string;
    color: string;
    obs?: string;
  }[]
  title?: string; // Nova propriedade opcional
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void; // Função onChange adicionada
}

const SelectInputGroup: React.FC<ISelectInputGroupProps> = ({
  options,
  onChange,
  //selectedid,
  title,

}) => {
  return (
    <Container>
      <select
        onChange={onChange}
        title={title}  >
        {options.map((option, idx) => (
          <option
            key={idx}
            id={option.profiss_Id}
            value={option.profiss_name}
          >
            {option.profiss_name}
          </option>
        ))}
      </select>
    </Container>
  );
};

export default SelectInputGroup;
