/**
 * Module dependencies.
 */
//mysqlクライアント作成


var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , mysql = require('mysql');


var DB_NAME = 'mydb';
var TABLE = 'user';
console.log(mysql);


var client = mysql.createConnection({
  user: 'ユーザー名',
  password: 'パスワード'
});

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 8080);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
  checkDb();
});




// 
var testVal = "testVal";

// データベースへ接続し、CRUD実行。
function checkDb(){
    client.connect(function(err) {
        if (err) throw err;
    
        // 検索クエリ
        client.query("SELECT * FROM test_table", function(err, results, fields) {
            if (err) throw err;
        });
        // 登録クエリ
        client.query(
            "INSERT INTO test_table (test_col) VALUES (?)",
            [testVal],
            function(err, results) {
                if (err) throw err;   
            }
        );
        // 更新クエリ
        client.query(
            "UDPATE test_table SET test_col = ? WHERE test_col = ?",
            ["update"+testVal, testVal],
            function(err, results) {
                if (err) throw err;   
            }
        );
        // 削除クエリ
        client.query(
            "DELETE test_table WHERE test_col = ?",
            ["update"+testVal],
            function(err, results) {
                if (err) throw err;   
            }
        );
    });
}