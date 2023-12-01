import styled from "styled-components";

export const Container = styled.div`
  grid-area: CT;
  background-color: ${(props) => props.theme.colors.secondary};
  color: ${(props) => props.theme.colors.white};

  padding: 20px;
`;
