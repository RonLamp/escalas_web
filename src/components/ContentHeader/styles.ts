import styled from "styled-components";

interface ITitleContainerProps {
	linecolor: string;
}

export const Container = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
	margin-bottom: 20px;
	margin-right: 20px;
`;

export const TitleContainer = styled.div<ITitleContainerProps>`
	> h2 {
		color: ${(props) => props.theme.colors.white};

		&::after {
			content: "";
			display: block;
			width: 35px;
			border-bottom: 5px solid ${(props) => props.linecolor};
		}
	}
`;

export const Controllers = styled.div`
	display: flex;
`;
