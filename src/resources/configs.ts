export const categories = [
	{ id: "CONS", name: "Consulta" },
	{ id: "RECON", name: "Reconsulta" },
	{ id: "EXAM", name: "Exame" },
];

export const status = [
	{ id: "DISP", name: "Disponível" },
	{ id: "MARK", name: "Marcado" },
	{ id: "NOTI", name: "Notificado" },
	{ id: "CONF", name: "Confirmado" },
	{ id: "END", name: "Finalizado" },
	{ id: "CANC", name: "Cancelado" },
	{ id: "BLOQ", name: "Bloqueada" },
	{ id: "INCO", name: "Inconsistência" },
];

export const types = [
	{ id: "MARK", name: "Marcação" },
	{ id: "FIT", name: "Encaixe" },
];

export const sex = [
	{ id: "MASCULINO", name: "Masculino" },
	{ id: "FEMININO", name: "Feminino" },
];

export const years = [
	{ id: "2022", name: "2022" },
	{ id: "2023", name: "2023" },
	{ id: "2024", name: "2024" },
	{ id: "2025", name: "2025" },
	{ id: "2026", name: "2026" },
	{ id: "2027", name: "2027" },
];

export const weekDays = [
	{ id: "0", name: "Domingo" },
	{ id: "1", name: "Segunda" },
	{ id: "2", name: "Terça" },
	{ id: "3", name: "Quarta" },
	{ id: "4", name: "Quinta" },
	{ id: "5", name: "Sexta" },
	{ id: "6", name: "Sábado" },
];

export const months = [
	{ id: "01", name: "Janeiro" },
	{ id: "02", name: "Fevereiro" },
	{ id: "03", name: "Março" },
	{ id: "04", name: "Abril" },
	{ id: "05", name: "Maio" },
	{ id: "06", name: "Junho" },
	{ id: "07", name: "Julho" },
	{ id: "08", name: "Agosto" },
	{ id: "09", name: "Setembro" },
	{ id: "10", name: "Outubro" },
	{ id: "11", name: "Novembro" },
	{ id: "12", name: "Dezembro" },
];

export const times: number[] = [
	0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
	22, 23,
];

export const timeStr: string[] = [
	"00",
	"01",
	"02",
	"03",
	"04",
	"05",
	"06",
	"07",
	"08",
	"09",
	"10",
	"11",
	"12",
	"13",
	"14",
	"15",
	"16",
	"17",
	"18",
	"19",
	"20",
	"21",
	"22",
	"23",
];

export const minuteStr: string[] = [
	"00",
	"05",
	"10",
	"15",
	"20",
	"25",
	"30",
	"35",
	"40",
	"45",
	"50",
	"55",
];

export const levels = [
	{
		id: "0",
		name: "Vendor",
	},
	{
		id: "1",
		name: "Proprietário",
	},
	{
		id: "2",
		name: "Administrativo",
	},
	/* 	{
		id: "3",
		name: "Level 3 - Profissional",
	},
	{

		id: "4",
		name: "Level 4 - Atendente",
	}, */
];

export const UFs = [
	{ id: "AC", name: "AC" },
	{ id: "AL", name: "AL" },
	{ id: "AM", name: "AM" },
	{ id: "AP", name: "AP" },
	{ id: "BA", name: "BA" },
	{ id: "CE", name: "CE" },
	{ id: "DF", name: "DF" },
	{ id: "ES", name: "ES" },
	{ id: "GO", name: "GO" },
	{ id: "MA", name: "MA" },
	{ id: "MG", name: "MG" },
	{ id: "MT", name: "MT" },
	{ id: "MS", name: "MS" },
	{ id: "PA", name: "PA" },
	{ id: "PB", name: "PB" },
	{ id: "PE", name: "PE" },
	{ id: "PI", name: "PI" },
	{ id: "PR", name: "PR" },
	{ id: "RJ", name: "RJ" },
	{ id: "RN", name: "RN" },
	{ id: "RS", name: "RS" },
	{ id: "RO", name: "RO" },
	{ id: "RR", name: "RR" },
	{ id: "SC", name: "SC" },
	{ id: "SP", name: "SP" },
	{ id: "SE", name: "SE" },
	{ id: "TO", name: "TO" },
	{ id: "BR", name: "BR" },
];

export const reasons = [
	{
		id: "0",
		name: "Solicitação do Cliente",
	},
	{
		id: "1",
		name: "Impossibilidade do Profissional",
	},
	{
		id: "2",
		name: "Falta de Condições Técnicas",
	},
	/* 	{
		id: "3",
		name: "Falta de Condições Técnicas",
	},
	{
		id: "4",
		name: "Level 4 - Atendente",
	}, */
];

export const genders = [
	{
		id: "Heterosexual",
		name: "Heterosexual",
	},
	{
		id: "Homossexual",
		name: "Homossexual",
	},
	{
		id: "Lésbica",
		name: "Lésbica",
	},
	{
		id: "Gay",
		name: "Gay",
	},
	{
		id: "Bissexual",
		name: "Bissexual",
	},
	{
		id: "Travesti",
		name: "Travesti",
	},
	{
		id: "Mais +",
		name: "Mais +",
	},
	{
		id: "Transgênero",
		name: "Transgênero",
	},
	{
		id: "Não-Binário",
		name: "Não-Binário",
	},
	{
		id: "Gênero Fluido",
		name: "Gênero Fluido",
	},
	{
		id: "Agênero",
		name: "Agênero",
	},
	{
		id: "Bigênero",
		name: "Bigênero",
	},
	{
		id: "Gêneroqueer",
		name: "Gêneroqueer",
	},
	{
		id: "Andrógino",
		name: "Andrógino",
	},
	{
		id: "Two-Spirit",
		name: "Two-Spirit",
	},
	{
		id: "Demigênero",
		name: "Demigênero",
	},
	{
		id: "Intergênero",
		name: "Intergênero",
	},
	{
		id: "Neutrois",
		name: "Neutrois",
	},
	{
		id: "Pangênero",
		name: "Pangênero",
	},
	{
		id: "Gênerofluxo",
		name: "Gênerofluxo",
	},
	{
		id: "Genderqueer",
		name: "Genderqueer",
	},
	{
		id: "Transmasculino",
		name: "Transmasculino",
	},
];

export const gendersWithExplicity = [
	{
		id: "Heterosexual",
		name: "É uma orientação sexual na qual uma pessoa é predominantemente atraída emocional, romântica e/ou sexualmente por pessoas do sexo oposto.",
	},
	{
		id: "Homossexual",
		name: "refere-se à orientação sexual de uma pessoa na qual ela é predominantemente atraída emocional, romântica e/ou sexualmente por pessoas do mesmo sexo.",
	},
	{
		id: "Lésbica",
		name: " Uma mulher que é sexualmente, emocionalmente ou romanticamente atraída por outras mulheres.",
	},
	{
		id: "Gay",
		name: " Um homem que é sexualmente, emocionalmente ou romanticamente atraído por outros homens. Também pode ser usado como um termo genérico para se referir a todas as pessoas homossexuais.",
	},
	{
		id: "Bissexual",
		name: " Alguém que é sexualmente, emocionalmente ou romanticamente atraído por pessoas de ambos os sexos, ou seja, homens e mulheres.",
	},
	{
		id: "Travesti",
		name: "Uma pessoa que se veste e/ou apresenta-se de uma forma que difere das expectativas tradicionais de gênero, frequentemente associada a pessoas designadas como masculinas ao nascer que se vestem de maneira feminina.",
	},
	{
		id: "Mais +",
		name: " O sinal de mais na sigla LGBTQIA+ indica que a comunidade é inclusiva e aberta a todas as outras identidades de gênero e orientações sexuais que não foram especificamente listadas.",
	},
	{
		id: "Transgênero",
		name: "Uma pessoa cuja identidade de gênero difere do sexo atribuído no nascimento.",
	},
	{
		id: "Não-Binário",
		name: "Uma pessoa que não se identifica exclusivamente como homem ou mulher. Pode incluir identidades como gênero fluido, agênero, gêneroqueere outras.",
	},
	{
		id: "Gênero Fluido",
		name: "Uma pessoa cuja identidade de gênero é fluida e pode variar ao longo do tempo.",
	},
	{
		id: "Agênero",
		name: "Uma pessoa que não se identifica com nenhum gênero em particular ou com a noção de gênero em si.",
	},
	{
		id: "Bigênero",
		name: "Uma pessoa que se identifica com dois gêneros distintos, seja simultaneamente ou em momentos diferentes.",
	},
	{
		id: "Gêneroqueer",
		name: "Uma pessoa cuja identidade de gênero desafia ou questiona as normas tradicionais de gênero.",
	},
	{
		id: "Andrógino",
		name: "Uma pessoa cuja identidade de gênero é uma mistura de características de gênero tradicionalmente associadas a homens e mulheres.",
	},
	{
		id: "Two-Spirit",
		name: "Um termo usado por algumas culturas indígenas da América do Norte para descrever uma pessoa que tem tanto características masculinas quanto femininas e muitas vezes tem um papel espiritual na comunidade.",
	},
	{
		id: "Demigênero",
		name: "Uma pessoa que se identifica parcialmente com um gênero específico, mas não completamente.",
	},
	{
		id: "Intergênero",
		name: "Uma pessoa cuja identidade de gênero combina ou incorpora elementos de múltiplos gêneros.",
	},
	{
		id: "Neutrois",
		name: "Uma pessoa que se identifica como um gênero neutro, ou seja, não como homem nem como mulher.",
	},
	{
		id: "Pangênero",
		name: "Uma pessoa que se identifica com todos os gêneros ou cuja identidade de gênero é abrangente e inclusiva.",
	},
	{
		id: "Gênerofluxo",
		name: "Uma pessoa cuja identidade de gênero é fluida e pode mudar ao longo do tempo, mas de uma forma mais fluida e variável do que alguém que se identifica como gênero fluido.",
	},
	{
		id: "Genderqueer",
		name: "Uma pessoa que se identifica de forma não convencional em relação às categorias de gênero masculino ou feminino, muitas vezes rejeitando tais categorias ou desafiando-as.",
	},
	{
		id: "Transmasculino",
		name: "Uma pessoa que foi designada como feminina ao nascer, mas que se identifica como masculina ou em algum ponto ao longo do espectro de gênero masculino.",
	},
];
