import React from "react";
import { Container } from "./styles";

type ISelectInputProps = {
  options: {
    id: string;
    name: string;
  }[];
  title?: string; // Nova propriedade opcional
  selectedid?: string; // Nova propriedade opcional
  value?: string; // Nova propriedade opcional

  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void; // Função onChange adicionada
}

const SelectInput: React.FC<ISelectInputProps> = ({
  options,
  onChange,
  selectedid,
  title,

}) => {
  return (
    <Container>
      <select onChange={onChange} defaultValue={selectedid} title={title}  >
        {options.map((option, idx) => (
          <option
            key={idx}
            id={option.id}
            value={option.id}
          //selected={selectedid === option.id ? true : false}
          >
            {option.name}
          </option>
        ))}
      </select>
    </Container>
  );
};

export default SelectInput;
