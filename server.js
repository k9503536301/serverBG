const express = require("express");
const app = express();
const fs = require('fs');

const DBService = require("./static/services/DBService.js");


app.set('port', (process.env.PORT || 3000));
///////////// Функции //////////////////////
function serveSPA(req,res){ // вызов продукта
    const content= fs.readFileSync("public/spa.html");
    res.setHeader("Content-Type", 'text/html');
    res.end(content);
}

function serveScrapeByRNT(req, res) {
    DBService.getInfoByRNT(req.params.RNT).then(tender => {
        if (!tender) {
            serveNotFound(req, res)
        }
        else res.json(tender);
    }).catch(()=> {
        res.status(500).send("Ошибка 500" +"<br>"+"Вы ввели некорректный ID");
    });
}

function serveWinners(req,res) {
    DBService.getWinners(req.query.dateFrom, req.query.dateTo).then(clients => {
        if (!clients) {
            serveNotFound(req, res)
        }
        else res.json(clients);
    });

}

function serveNotFound(req, res){
    res.send("Введенная вами страница на сайте не обнаружена.");
}


////////////////     Маршрутизация    /////////////

app.get('/', serveSPA);
app.get('/calculator', serveSPA);
app.get('/search', serveSPA);
app.get('/information', serveSPA);
app.get('/information/:RNT', serveSPA);

const staticMiddleware = express.static("public");
app.use(staticMiddleware);


app.get('/api/scrape/:RNT', serveScrapeByRNT);

app.get('/api/winners', serveWinners);

app.use(serveNotFound);

DBService.init();

app.use((err, request, response, next) => {
    console.log(err);
    response.status(500).send('Something broke!');
});
app.listen(app.get('port'), () => console.log(`Server started at ${app.get('port')}`));