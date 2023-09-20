const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();



const app = express();
const PORT = 8000;

app.use(express.json());
app.use('/api/v1',require('./src/v1/routes/auth'));
//expressサーバー接続
app.listen(PORT, (req, res) => {
    console.log("サーバーが起動しました");
});

//mongodb接続
try {
    mongoose.connect(process.env.MONGODB_URL);
    console.log('サーバーが起動しました')
} catch (err) {
    console.log(err);
}