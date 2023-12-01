import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.div`
	height: 100%;
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;

	background-color: ${(props) => props.theme.colors.tertiary};
`;

export const LoginContainer = styled.div`
	height: 600px;
	width: 1000px;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;

	box-shadow: -15px 15px 20px rgba(0, 0, 0, 0.3); /* Valores podem ser ajustados */
`;

export const ErrorContainer = styled.div`
	height: 100%;
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	background-color: ${(props) => props.theme.colors.secondary};

	> img {
		height: 100%;
	}
`;

export const SubContainerLeft = styled.div`
	height: 100%;
	width: 50%;
	display: flex;
	flex-direction: column;
	justify-content: start;
	align-items: center;

	border-top-left-radius: 6px;
	border-bottom-left-radius: 0px;

	background-color: ${(props) => props.theme.colors.secondary};

	> img {
		height: 100px;
	}
`;
export const SubContainerRight = styled.div`
	width: 50%;
	height: 100%;
	padding: 15px;

	border-top-right-radius: 6px;
	border-bottom-right-radius: 6px;

	background-color: ${(props) => props.theme.colors.primary};

	> img {
		width: 100%;
		height: 100%;
		padding: 20px;
	}
`;

export const Logo = styled.div`
	margin-top: 20px;
	> img {
		width: 150px;
	}
`;

export const DividerText = styled.div`
	position: relative;
	color: ${(props) => props.theme.colors.gray};
	margin-bottom: 10px;
	&::before,
	&::after {
		content: "";
		position: absolute;
		top: 50%;
		width: 50px; /* Largura da linha */
		height: 2px; /* Altura da linha */
		background-color: ${(props) => props.theme.colors.gray}; /* Cor da linha */
		transform: translateY(-50%);
		z-index: -1;
	}

	&::before {
		left: 0;
	}

	&::after {
		right: 0;
	}
`;

export const SmallText = styled.small`
	/* Estilos para o texto pequeno */
`;

export const Form = styled.form`
	width: 70%;
	border-radius: 5px;

	> p {
		color: ${(props) => props.theme.colors.gray};
	}

	> input {
		width: 100%;
		margin: 7px 0;
		padding: 10px;
		border-radius: 5px;
		background-color: ${(props) => props.theme.colors.primary};
		border: 1px solid ${(props) => props.theme.colors.gray};
		color: ${(props) => props.theme.colors.gray};

		/* Estilos para após o preenchimento automático */
		&:-webkit-autofill {
			-webkit-box-shadow: 0 0 0px 1000px
				${(props) => props.theme.colors.primary} inset;
			-webkit-text-fill-color: ${(props) => props.theme.colors.gray} !important;
		}
	}

	> button {
		width: 100%;
		padding: 10px;
		border-radius: 5px;
		margin-top: 20px;
		border-radius: 5px;
		border: none;
		background-color: ${(props) => props.theme.colors.warning};
		color: ${(props) => props.theme.colors.white};
		font-weight: bold;
		font-size: medium;
	}
`;

export const LinkContainer = styled.div`
	width: 70%;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: right;
	margin-top: 15px;
`;

export const MenuItemLink = styled(Link)`
	font-size: medium;
	margin-top: 10px;
	display: flex;
	justify-content: right;
	color: ${(props) => props.theme.colors.gray};
	text-decoration: none;

	transition: opacity 0.3s;

	&:hover {
		opacity: 0.7;
	}

	> svg {
		font-size: 20px;
		margin-right: 5px;
	}
`;

export const LinkAContainer = styled.div`
	width: 70%;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	margin-top: 15px;
`;

export const MenuItemLinkA = styled.a`
	width: 100%;
	height: 37px;
	display: flex;
	justify-content: center;
	align-items: center;
	color: ${(props) => props.theme.colors.white};
	background-color: ${(props) => props.theme.colors.warning};

	font-weight: bold;
	text-decoration: none;

	margin-top: 20px;
	border-radius: 5px;
	border: none;

	transition: opacity 0.3s;

	&:hover {
		opacity: 0.7;
	}

	> svg {
		font-size: 20px;
	}

	> img {
		height: 30px;
		margin-right: 10px;
	}
`;

export const ButtonSocial = styled.button`
	width: 200px;
	height: 100px;
	border-radius: 5px;
	border: none;
	background-color: ${(props) => props.theme.colors.warning};
	color: ${(props) => props.theme.colors.white};
	font-size: medium;
	font-weight: bold;
	transition: opacity 0.3s;
`;
