const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");

dotenv.config();
const db = mysql.createPool({
  host: process.env.DB_HOST,
  PORT: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

app.use(cors());
app.use(express.json());

app.get("/api/get", (req, res) => {
  const sqlGet = "SELECT * FROM subject_db";
  db.query(sqlGet, (error, result) => {
    res.send(result);
  });
});

app.post("/api/post", (req, res) => {
  const { subject, lecturer, work_load } = req.body;
  const sqlInsert =
    "INSERT INTO subject_db(subject, lecturer, work_load) VALUES (?,?,?)";
  db.query(sqlInsert, [subject, lecturer, work_load], (error, result) => {
    console.log(error);
  });
});

app.delete("/api/remove/:id", (req, res) => {
  const { id } = req.params;
  const sqlRemove = "DELETE FROM subject_db WHERE id = ?";
  db.query(sqlRemove, id, (error, result) => {
    console.log(error);
  });
});

app.get("/api/get/:id", (req, res) => {
  const { id } = req.params;
  const sqlGet = "SELECT * FROM subject_db where id = ?";
  db.query(sqlGet, id, (error, result) => {
    if (error) {
      console.log(error);
    }
    res.send(result);
  });
});

app.put("/api/update/:id", (req, res) => {
  const { id } = req.params;
  const { subject, lecturer, work_load } = req.body;
  const sqlUpdate =
    "UPDATE subject_db SET subject = ?, lecturer = ?, work_load = ? WHERE id = ?";
  db.query(sqlUpdate, [subject, lecturer, work_load, id], (error, result) => {
    if (error) {
      console.log(error);
    }
    res.send(result);
  });
});

app.get("/", (req, res) => {
  // const sqlInsert =
  //   "INSERT INTO subject_db(subject, lecturer, work_load) VALUES ('Kotijooks', 'Kott Jooks', 10)";
  // db.query(sqlInsert, (error, result) => {
  //   console.log("error", error);
  //   console.log("result", result);
  //   res.send("Hello Express");
  // });
  // res.send("Hello Express");
});

app.listen(3000, () => {
  console.log("server is running on port 3000");
});
