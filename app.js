let express=require('express');
let bodyParser = require('body-parser');
let apiRouter=require('./router');

let app=express();

app.set('views','./views')
	.set('view engine','ejs')
	.use(express.static('static'))
	.use(bodyParser.json())
	.use(bodyParser.urlencoded({ extended: false }))
	.use(apiRouter)
	.listen(3000);

console.log('express listen on http://localhost:3000/');

// search("http://172.16.0.130:8808/admin/sys!chaxun.action?fjmc=112-222");