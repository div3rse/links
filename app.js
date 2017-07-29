var express = require('express')
var randomstring = require("randomstring")
var app = express()
app.set('port', process.env.PORT || 4040)
app.set('views', __dirname + '/views')
app.set('view engine', 'ejs')
app.set('env', process.env.NODE_ENV)
app.use(express.static(__dirname + '/public'))
var links = {}

app.get('/', (req, res) => {
	res.render('pages/index')
})

app.get('/l/:id', (req, res) => {
	var id = req.params.id
	if (links[id]) {
		res.redirect(links[id])
	}
	else {
		res.redirect('/')
	}
	delete links[id]
})

app.get('/create', (req, res) => {
	var url = req.query.url
	var id = randomstring.generate(4)
	links[id] = url
	res.json({url, id, link: `${req.protocol}://${req.get('host')}/l/${id}`})
})

/* unsure if links should be viewable, privacy issues and all
app.get('/ls', (req, res) => {
	res.json(links)
})
*/

if (app.get('env') == 'production'){
	process.on('uncaughtException', function (err) {
		console.log('Caught exception:', err)
	})
}
app.listen(app.get('port'), () => {
	console.log('Node app running on port', app.get('port'))
})