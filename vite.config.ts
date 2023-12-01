import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
//import singleFile from "vite-plugin-singlefile";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		/* singleFile({
			exclude: [], // Lista de módulos que devem ser excluídos do arquivo único
		}), */
	],
});
