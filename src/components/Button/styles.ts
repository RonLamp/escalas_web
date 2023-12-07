import styled from 'styled-components';

export const Container = styled.button`
   width: 100%;
   height: 30px;
   margin-right: 20px;
   padding: 10px;
   border-radius: 5px;
   font-weight: bold;
   color: ${props => props.theme.colors.white};
   background-color: ${props => props.theme.colors.warning};

   transition: opacity 0.3s;
   &:hover {
      opacity: 0.7;
   }
`;

export const ButtonContainer = styled.div`
   > button {
      /* height: 32px; */
      /* width: 190px; */
      min-width: 100px;
      padding: 6px 10px;
      border-radius: 5px;
      margin-right: 5px;
      margin-left: 10px;

      color: ${props => props.theme.colors.white};
      border: solid 1px ${props => props.theme.colors.white};
      background-color: ${props => props.theme.colors.secondary};
      text-decoration: none;

      transition: opacity 0.3s;

      &:hover {
         opacity: 0.7;
         background-color: ${props => props.theme.colors.primary};
      }
   }
`;
