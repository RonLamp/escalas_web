import styled from "styled-components";

export const SelectableContainer = styled.div<{ isSelected: boolean }>`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 25px;
	width: 100%;
	cursor: pointer;
	border: 1px solid #ccc;
	padding: 10px;
	background-color: ${({ isSelected, theme }) =>
		isSelected ? theme.theme.colors.primary : "white"};

	&:hover {
		background-color: ${({ theme }) => theme.theme.colors.secondary};
	}
`;
