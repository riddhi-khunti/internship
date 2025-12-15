const express = require("express");
const app = express();
const PORT = 3001;

app.get("/endpoint", (req, res) => {
    res.json( "hello world" );
});

app.listen(PORT, () => {
   console.log(`Running PORT : ${PORT}`);
});
