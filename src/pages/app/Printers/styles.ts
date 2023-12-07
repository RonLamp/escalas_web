import styled from 'styled-components';

export const Container = styled.div`
   width: 100%;
`;

export const TdCaptionTable = styled.caption`
   font-size: 1.5rem;
   font-weight: bold;
   margin-bottom: 1rem;
`;

export const TTable = styled.table`
   background-color: none;
   //border: 1px solid black;
   color: black;
   width: 100%;
   height: 100%;
   border-collapse: collapse;
`;

export const TheadFirstTable = styled.thead`
   border: 1px solid black;
   text-align: center;
   font-size: 1.2rem;
`;

export const TdFirstTableP = styled.td`
   border: 2px solid ${props => props.theme.colors.tertiary};
   width: 25%;
`;
export const TdFirstTableC = styled.td`
   border: 2px solid ${props => props.theme.colors.tertiary};
   width: 10%;
`;
export const TdFirstTableH = styled.td`
   border: 2px solid ${props => props.theme.colors.tertiary};
   width: 10%;
`;
export const TdFirstTableD = styled.td`
   border: 2px solid ${props => props.theme.colors.tertiary};
   width: 55%;
   word-wrap: break-word; /* Quebra de palavra */
   white-space: normal; /* Ajuste automático da altura */
`;

export const TrFirstTable = styled.tr``;

export const TheadTable = styled.thead``;

export const TrTable = styled.tr``;

export const TdLeftTable = styled.td`
   border: 1px solid ${props => props.theme.colors.tertiary};
   width: 16%;
   padding-left: 7px;
   text-align: left;
`;
export const TdRightTable = styled.td`
   border: 1px solid ${props => props.theme.colors.tertiary};
   width: 16%;
   padding-left: 7px;
`;
export const TdTable = styled.td`
   border: 1px solid ${props => props.theme.colors.tertiary};
   width: 12%;
   height: 100%;
   background-color: none;
   text-align: center;
`;

export const TrashInput = styled.div<{isSelected: boolean}>`
   display: flex;
   justify-content: center;
   align-items: center;
   height: 25px;
   width: 100%;
   cursor: pointer;
   border: 1px solid #ccc;
   padding: 10px;
   background-color: none;
`;

export const TFood = styled.tfoot``;

interface TDFoodProps {
   colSpan: number;
}

export const TDFood = styled.td<TDFoodProps>`
   border: 1px solid ${props => props.theme.colors.tertiary};
   text-align: center;
   /* Outros estilos que você deseja aplicar */

   /* Exemplo de condição para aplicar estilos específicos com base no colSpan */
   ${props =>
      props.colSpan === 2 &&
      `
     font-weight: bold;
     background-color:none;
     /* Outros estilos específicos para colSpan 2 */
   `}
`;
