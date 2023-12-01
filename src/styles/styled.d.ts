import "styled-components";

declare module "styled-components" {
	export interface DefaultTheme {
		title: string;

		colors: {
			primary: string;
			secondary: string;
			tertiary: string;

			white: string;
			black: string;
			gray: string;

			success: string;
			info: string;
			warning: string;

			buttonbg: string;
			buttonborder: string;
			buttonhoverbg: string;
			buttonhoverborder: string;
			buttonactivebg: string;
			buttonactiveborder: string;
		};
	}
}
