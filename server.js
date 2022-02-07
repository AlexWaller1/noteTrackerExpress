console.log("Hello Oa");
console.log("--------------------------");

// Dependenices

let express = require("express");

let path = require("path");

//const db = require("./db.json");

let fs = require("fs");

let app = express();

let PORT = 3009;

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

console.log("----------------------------------");

let notes = [
  {
    id: 1,
    task: "take out the garbage"
  },
  {
    id: 2,
    task: "clean the carpet"
  },
  {
    id: 3,
    task: "clear off the table"
  }
];

let jsonNotes = JSON.stringify(notes);

console.log("----------------------------------");

let data5 = fs.readFileSync("./test.json", "utf-8");

console.log(data5);
let data14 = JSON.parse(data5);
console.log(data14);

app.get("/", (req, res) => res.sendFile(path.join(__dirname, "index.html")));

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "notes.html"));
});

app.get("/api/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "db.json"));
});

app.post("/api/notes", (req, res) => {
  let data11 = fs.readFileSync("db.json", "utf-8");

  let data12 = JSON.parse(data11);

  let newID = data12.length + 1;

  let newTask = {
    id: newID,
    name: req.headers.name,
    task: req.headers.task
  };

  data12.push(newTask);

  let data14 = JSON.stringify(data12);

  fs.writeFile(path.join(__dirname, "db.json"), data14, err => {
    if (err) throw err;
    console.log("new task added");
  });
});

app.get("/api/notes/:id", (req, res) => {
  let targetID = req.params.id;

  let data21 = fs.readFileSync("db.json", "utf-8");
  let data22 = JSON.parse(data21);

  for (let i = 0; i <= data22.length; i++) {
    if (data22[i].id == targetID) {
      res.json(data22[i]);
    }
  }
  res.send("no task found");
});

app.delete("/api/notes/:id", (req, res) => {
  let targetID = req.params.id;

  let data21 = fs.readFileSync("db.json", "utf-8");
  let data22 = JSON.parse(data21);

  data22.splice(targetID - 1, 1);

  for (let i = 0; i < data22.length; i++) {
    if (data22[i].id > targetID) {
      data22[i].id = data22[i].id - 1;
    }
  }

  let data23 = JSON.stringify(data22);
  fs.writeFile(path.join(__dirname, "db.json"), data23, err => {
    if (err) throw err;
    console.log("task deleted");
  });
});

console.log("----------------------------------");

let data6 = fs.readFileSync("test.txt", "utf8");

console.log(data6);

console.log("JSON Array");

app.listen(PORT, () => {
  console.log(`App listening on PORT ${PORT}`);
});
