const path = require('path')

module.exports = {
	entry: './source/js/app.js', // plik źródłowy, od którego zaczyna się budowanie
	output: {
		filename: 'bundle.js', // nazwa pliku wyjściowego
		path: path.resolve(__dirname, 'dist'), // ścieżka do katalogu, gdzie ma być zapisany plik wyjściowy
	},
}
