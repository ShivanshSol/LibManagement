const express = require('express');

const usersRouter = require("./routes/users_routes");
const booksRouter = require("./routes/books_routes");

const app = express();

const PORT = 5500; //3000 also works



app.use(express.json());

app.get("/", (req,res) => {
    res.status(200).json({
        message: "server is up & running :)"
    });
});


app.use("/users", usersRouter);
app.use("/books", booksRouter);


/*for anyother route*/
app.get("*", (req,res) => {
    res.status(404).json({
        message: "Page not found :( -This route does not exist !!"
    }); 
});


app.listen(PORT , () => {
    console.log(`The server is running on Port: ${PORT}`);
});
