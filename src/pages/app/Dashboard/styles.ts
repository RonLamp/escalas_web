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
   background-color: ${props => props.theme.colors.primary};
   border: 1px solid ${props => props.theme.colors.tertiary};
   width: 100%;
   height: 100%;
   border-collapse: collapse;
`;

export const TheadFirstTable = styled.thead`
   border: 1px solid ${props => props.theme.colors.tertiary};
   text-align: center;
   font-size: 1.2rem;
`;

export const TdFirstLeftTable = styled.td`
   border: 1px solid ${props => props.theme.colors.tertiary};
   color: ${props => props.theme.colors.primary};
   width: 16%;
`;
export const TdFirstTable = styled.td`
   border: 1px solid ${props => props.theme.colors.tertiary};
   width: 12%;
`;
export const TrFirstTable = styled.tr``;

export const TheadSubTitleTable = styled.thead`
   text-align: center;
   font-size: 1.2rem;
`;
export const TdSubTitleLeftTable = styled.td`
   border: 1px solid ${props => props.theme.colors.tertiary};
   font-weight: 400;
`;
export const TdSubTitleTable = styled.td`
   border: 1px solid ${props => props.theme.colors.tertiary};
`;
export const TrSubTitleTable = styled.tr``;

export const TheadTable = styled.thead`
   //height: 100%;
   //background-color: antiquewhite;
`;
export const TrTable = styled.tr`
   //height: 100%;
   //border: 1px solid ${props => props.theme.colors.tertiary};
`;
export const TdLeftTable = styled.td`
   border: 1px solid ${props => props.theme.colors.tertiary};
   width: 16%;
   padding-left: 7px;
`;
export const TdTable = styled.td`
   border: 1px solid ${props => props.theme.colors.tertiary};
   width: 12%;
   height: 100%;
   background-color: ${props => props.theme.colors.secondary};
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
   background-color: ${({isSelected, theme}) =>
      isSelected ? theme.theme.colors.primary : 'white'};

   &:hover {
      background-color: ${({theme}) => theme.theme.colors.secondary};
   }
`;
