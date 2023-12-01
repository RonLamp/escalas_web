import styled from "styled-components";

export const Container = styled.div`
	margin-right: 20px;
	> select {
		height: 28px;
		width: 100%;
		min-width: 100px;
		padding: 6px 10px;
		border-radius: 5px;

		color: ${(props) => props.theme.colors.white};
		border: solid 1px ${(props) => props.theme.colors.white};
		background-color: ${(props) => props.theme.colors.secondary};
		text-decoration: none;

		transition: opacity 0.3s;

		&:hover {
			opacity: 0.7;
			background-color: ${(props) => props.theme.colors.primary};
		}
	}
`;
