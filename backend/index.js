const mysql = require("mysql2");
const express = require("express");
const fs = require("fs");
const busboyBodyParser = require("busboy-body-parser");
const path = require("path");

const connectionParams = require("./connection.js");
const { log } = require("console");

// получаем все новости
const getAllNews = "SELECT * FROM news";

const connectionParam = connectionParams();

const connection = mysql.createConnection(connectionParam);

const fronendPath = "http://127.0.0.1:5173/";

const PORT = process.env.PORT || 3010;
const app = express();

async function getAllNewsFunc() {
  // выполняем запрос и получаем все новости
  return connection
    .promise()
    .query(getAllNews, [])
    .then(([rows, fields]) => {
      return rows;
    })
    .catch(console.log);
}

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

app.listen(PORT, () => console.log("Сервер запущен..."));

app.get("/get_news", function (_, response) {
  getAllNewsFunc()
    .then((result) => {
      return result;
    })
    .then((news) => {
      response.send(JSON.stringify(news));
    });
});

// Запрос на получение новости по ID
const getQueryNews = `SELECT news.*, pictures.* FROM news 
LEFT JOIN pictures ON news.id = pictures.id
WHERE news.id = ?`

// Прокидываем get-запрос на получение новости по id динамически получая id со стороны клиента
app.get("/get_news/:id", (require, response) => {
  const values = [require.params.id]
  connection.query(getQueryNews, values, (err, results) => {
    response.send({
      results: results
    })
  })
})