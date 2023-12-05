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

export const TdFirstTableP = styled.td`
   border: 4px solid ${props => props.theme.colors.tertiary};
   width: 30%;
`;
export const TdFirstTableC = styled.td`
   border: 4px solid ${props => props.theme.colors.tertiary};
   width: 10%;
`;
export const TdFirstTableH = styled.td`
   border: 4px solid ${props => props.theme.colors.tertiary};
   width: 10%;
`;
export const TdFirstTableD = styled.td`
   border: 4px solid ${props => props.theme.colors.tertiary};
   width: 50%;
`;

export const TrFirstTable = styled.tr``;

export const TheadTable = styled.thead``;

export const TrTable = styled.tr``;

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
