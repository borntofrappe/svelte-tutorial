export const randomColor = () => `
	hsl(
	${Math.floor(Math.random() * 360)},
	${Math.floor(Math.random() * (100 - 80) + 80)}%,
	${Math.floor(Math.random() * (70 - 50) + 50)}%
	)
`;