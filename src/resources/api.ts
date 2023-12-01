import axios from "axios";

export const api = axios.create({
	baseURL: import.meta.env.VITE_SERVER_ENDPOINT,
});
// // Adicione um interceptor para as respostas
// api.interceptors.response.use(
// 	(response) => {
// 		console.log("Resposta recebida:", response.status);

// 		// Se a resposta for bem-sucedida, apenas a retorna
// 		return response;
// 	},
// 	async (error) => {
// 		if (error.response && error.response.status === 401) {
// 			// Se receber uma resposta 401, faça o signOut
// 			//const { signOut } = useAuth(); // Use a função de signOut do useAuth
// 			//const navig = useNavigate();
// 			api.defaults.headers.common["Authorization"] = "";
// 			localStorage.removeItem("@agenda:auth");
// 			//navig("/");

// 			console.error("Recebeu uma resposta 401. Efetuando o signOut.");

// 			try {
// 				//await signOut();
// 			} catch (signOutError) {git
// 				console.error("Erro ao efetuar o signOut:", signOutError);
// 			}
// 		}
// 		return Promise.reject(error);
// 	}
// );
