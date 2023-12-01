import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.aside`
	grid-area: AS;

	background-color: ${(props) => props.theme.colors.primary};
	padding-left: 15px;

	border-right: 1px solid ${(props) => props.theme.colors.gray};
`;

export const Header = styled.header`
	display: flex;
	/* flex-direction: column;
  justify-content: center; */
	align-items: center;

	margin-top: 15px;
`;

export const Title = styled.h3`
	color: ${(props) => props.theme.colors.white};

	margin-left: 10px;
`;

export const LogImg = styled.img`
	height: 40px;
	width: 40px;
`;

export const MenuContainer = styled.nav`
	margin-top: 20px;
	display: flex;
	flex-direction: column;
`;

export const MenuItemLink = styled(Link)`
	display: flex;
	align-items: center;
	color: ${(props) => props.theme.colors.white};
	text-decoration: none;
	margin: 3px 0;

	transition: opacity 0.3s;

	&:hover {
		opacity: 0.7;
	}

	> svg {
		font-size: 20px;
		margin-right: 5px;
	}
`;

export const MenuItemButton = styled.button`
	//-- adaptação de um button para um link(a)
	font-size: 16px;
	border: none;
	background: none;
	display: flex;
	align-items: center;
	color: ${(props) => props.theme.colors.white};
	text-decoration: none;
	margin: 3px 0;

	transition: opacity 0.3s;

	&:hover {
		opacity: 0.7;
	}

	> svg {
		font-size: 20px;
		margin-right: 5px;
	}
`;

export const Profile = styled.div`
	display: flex;
	flex-direction: column;
	color: ${(props) => props.theme.colors.white};
`;

export const Welcome = styled.h4`
	margin-top: 20px;
	margin-bottom: 5px;
`;

export const UserName = styled.span``;

export const ToggleContainer = styled.div`
	margin-top: 30px;
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-right: 15px;
`;
