const express = require('express');
const app = express()
const documentController = require('./controllers/document-controller');
const fs = require('fs');

var bodyParser = require('body-parser')

app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({
  extended: true
}));

app.set('view engine', 'pug')

app.get('/', documentController.form)
//app.get('/form2', documentController.form2)
app.post('/step2', documentController.form2)
app.post('/document-confirmation', documentController.showDoc)
// app.get('/thanx-page', documentController.showDoc)




app.listen(3000)
