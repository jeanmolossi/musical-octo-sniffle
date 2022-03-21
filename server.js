const path = require('path')
const express = require('express')
// const fallback = require('express-history-api-fallback');

const app = express();

const root = path.join(__dirname, 'public');

app.use(express.static(root));
// app.use(fallback('index.html', { root }));

app.listen(process.env.PORT || 80, () => {
	console.log('Server started at port ' + (process.env.PORT || 80));
});
