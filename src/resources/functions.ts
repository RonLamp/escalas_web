export function darkenColor(hexColor: string, percent: number) {
	// Remover o caractere '#' se presente
	hexColor = hexColor.replace(/^#/, "");

	// Converter para valores RGB
	const r = parseInt(hexColor.substring(0, 2), 16);
	const g = parseInt(hexColor.substring(2, 4), 16);
	const b = parseInt(hexColor.substring(4, 6), 16);

	// Ajustar os componentes RGB para tornar a cor mais escura
	const darkenedR = Math.round(r * (1 - percent / 100));
	const darkenedG = Math.round(g * (1 - percent / 100));
	const darkenedB = Math.round(b * (1 - percent / 100));

	// Converter de volta para hexadecimal
	const darkenedHex = `#${((darkenedR << 16) | (darkenedG << 8) | darkenedB)
		.toString(16)
		.padStart(6, "0")}`;

	return darkenedHex;
}
