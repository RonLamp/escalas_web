import styled from "styled-components";
import { PatternFormat, NumericFormat } from "react-number-format";
import { MultiSelect } from "react-multi-select-component";

export const Container = styled.div``;

export const ContentButton = styled.div`
	display: flex;
`;

export const ButtonState = styled.button`
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 0px 0px 0px 20px;
	width: 30px;
	height: 30px;

	border-radius: 5px;
	color: ${(props) => props.theme.colors.white};
	border: solid 1px ${(props) => props.theme.colors.white};
	background-color: ${(props) => props.theme.colors.secondary};
	text-decoration: none;

	transition: opacity 0.3s;

	&:hover {
		opacity: 0.6;
		background-color: ${(props) => props.theme.colors.primary};
	}

	&.disabled {
		opacity: 0.3;
		cursor: auto;
	}
`;

export const MainForm = styled.main`
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const JustForm = styled.form`
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 10px;
`;

export const DivForm = styled.div`
	width: 100%;
	margin: 3px;
	display: flex;
	flex-direction: row;
	justify-content: center;

	div {
		span {
			font-size: small;
			color: ${(props) => props.theme.colors.warning};
		}
	}
`;

export const LabelForm = styled.label`
	display: flex;
	align-items: center; /* Alinha verticalmente ao centro */
	width: 10%;
	min-width: 75px;
	height: 25px;
	font-size: small;

	border-radius: 5px;
	color: ${(props) => props.theme.colors.white};
	background-color: ${(props) => props.theme.colors.secondary};
	text-decoration: none;
`;

export const InputForm = styled.input`
	display: flex;
	align-items: center; /* Alinha verticalmente ao centro */
	width: 50%;
	min-width: 280px;
	height: 25px;
	padding: 0px 10px;

	border-radius: 5px;
	color: ${(props) => props.theme.colors.white};
	border: solid 1px ${(props) => props.theme.colors.white};
	background-color: ${(props) => props.theme.colors.secondary};
	text-decoration: none;
`;

export const InputRadioForm = styled.input`
	display: flex;
	align-items: center; /* Alinha verticalmente ao centro */
	/* 	-webkit-appearance: none;
	-moz-appearance: none;
	appearance: none; */

	margin-left: 20px;
	width: 20px;
	height: 20px;
	border: solid 1px ${(props) => props.theme.colors.white};
	border-radius: 50%;
	outline: none;
	cursor: pointer;

	background-color: aliceblue;
	:checked {
		background-color: red;
	}
`;

export const InputDateForm = styled.input`
	display: flex;
	align-items: center; /* Alinha verticalmente ao centro */
	width: 50%;
	min-width: 280px;
	height: 25px;
	padding: 0px 10px;

	border-radius: 5px;
	color: ${(props) => props.theme.colors.white};
	border: solid 1px ${(props) => props.theme.colors.white};
	background-color: ${(props) => props.theme.colors.secondary};
	text-decoration: none;

	input[type="date"]::-webkit-calendar-picker-indicator {
		background-color: ${(props) => props.theme.colors.white};
	}
`;

export const PaternFormatForm = styled(PatternFormat)`
	display: flex;
	align-items: center; /* Alinha verticalmente ao centro */
	width: 50%;
	min-width: 280px;
	height: 25px;
	padding: 0px 10px;

	border-radius: 5px;
	color: ${(props) => props.theme.colors.white};
	border: solid 1px ${(props) => props.theme.colors.white};
	background-color: ${(props) => props.theme.colors.secondary};
	text-decoration: none;
`;

export const SelectForm = styled.select`
	display: flex;
	align-items: center; /* Alinha verticalmente ao centro */
	width: 50%;
	min-width: 280px;
	height: 25px;
	padding: 0px 10px;

	border-radius: 5px;
	color: ${(props) => props.theme.colors.white};
	border: solid 1px ${(props) => props.theme.colors.white};
	background-color: ${(props) => props.theme.colors.secondary};
	text-decoration: none;
`;

export const ButtonForm = styled.button`
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 10px 0px 0px 30px;

	padding: 0px 5px;
	height: 30px;
	border-radius: 5px;

	color: ${(props) => props.theme.colors.white};
	border: solid 1px ${(props) => props.theme.colors.white};
	background-color: ${(props) => props.theme.colors.secondary};
	text-decoration: none;

	transition: opacity 0.3s;

	&:hover {
		opacity: 0.6;
		background-color: ${(props) => props.theme.colors.primary};
	}
`;

export const TextAreaForm = styled.textarea`
	display: flex;
	align-items: center; /* Alinha verticalmente ao centro */
	width: 50%;
	min-width: 280px;
	height: 100px;
	padding: 10px;

	border-radius: 5px;
	color: ${(props) => props.theme.colors.white};
	border: solid 1px ${(props) => props.theme.colors.white};
	background-color: ${(props) => props.theme.colors.secondary};
	text-decoration: none;

	overflow-y: scroll;
	&::-webkit-scrollbar {
		width: 10px;
	}
	&::-webkit-scrollbar-track {
		background-color: ${(props) => props.theme.colors.secondary};
	}
	&::-webkit-scrollbar-thumb {
		background-color: ${(props) => props.theme.colors.gray};
		border-radius: 5px; /* Raio da borda da barra de rolagem */
	}
	&::-webkit-scrollbar-thumb:hover {
		background-color: ${(props) =>
			props.theme.colors
				.white}; /* Cor do preenchimento da barra de rolagem em hover */
	}
`;

interface NumberFormProps {
	width?: string; // Defina a propriedade 'width' como opcional
	margin?: string; // Defina a propriedade 'margin' como opcional
}

export const NumberForm = styled(NumericFormat)<NumberFormProps>`
	display: flex;
	align-items: center; /* Alinha verticalmente ao centro */
	width: ${(props) =>
		props.width || "50%"}; /* Use a prop 'width' ou o valor padrão '50%' */
	margin: ${(props) =>
		props.margin ||
		"0px 0px 0px 0px"}; /* Use a prop 'margin' ou o valor padrão '0px 0px 0px 0px' */
	min-width: 100px;
	height: 25px;
	padding: 0px 10px;
	text-align: right;

	border-radius: 5px;
	color: ${(props) => props.theme.colors.white};
	border: solid 1px ${(props) => props.theme.colors.white};
	background-color: ${(props) => props.theme.colors.secondary};
	text-decoration: none;
`;

export const MultiSelectForm = styled(MultiSelect)`
	width: 70%;

	--rmsc-main: ${(props) => props.theme.colors.gray} !important;
	--rmsc-hover: ${(props) => props.theme.colors.primary} !important;
	--rmsc-selected: ${(props) => props.theme.colors.primary} !important;
	--rmsc-border: ${(props) => props.theme.colors.white} !important;
	--rmsc-gray: ${(props) => props.theme.colors.white} !important;
	--rmsc-bg: ${(props) => props.theme.colors.secondary} !important;
	--rmsc-p: 10px !important; /* Spacing */
	--rmsc-radius: 5px !important; /* Radius */
	--rmsc-h: 25px !important; /* Height */

	.search input {
		color: ${(props) => props.theme.colors.white} !important;
	}
`;
