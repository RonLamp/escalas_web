import styled from "styled-components";
import Switch, { ReactSwitchProps } from "react-switch";
//import { redirect } from "react-router-dom";

export const Container = styled.div`
	display: flex;
	align-items: center;
`;

export const ToogleLabel = styled.span`
	color: ${(props) => props.theme.colors.white};
	display: flex;
	justify-content: center;
	width: 45px;
`;

export const ToogleSelector = styled(Switch).attrs<ReactSwitchProps>(
	({ theme }) => ({
		onColor: theme.colors.buttonbg,
		offColor: theme.colors.buttonbg,
		offHandleColor: theme.colors.buttonhoverbg,
		onHandleColor: theme.colors.buttonhoverbg,
		handleDiameter: 16,
		height: 24,
		width: 40,
	})
)<ReactSwitchProps>`
	margin: 0px;
`;
