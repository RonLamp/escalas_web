import React from "react";

import { Container, ToogleLabel, ToogleSelector } from "./styles";

interface IToogleProps {
  labelLeft: string;
  labelRight: string;
  checked: boolean;
  handleChange(): void;
}

const Toogle: React.FC<IToogleProps> = ({
  labelLeft,
  labelRight,
  checked,
  handleChange,
}) => {
  return (
    <Container>
      <ToogleLabel>{labelLeft}</ToogleLabel>
      <ToogleSelector
        checked={checked}
        uncheckedIcon={false}
        checkedIcon={false}
        draggable
        onChange={handleChange}
      />
      <ToogleLabel>{labelRight}</ToogleLabel>
    </Container>
  );
};

export default Toogle;
