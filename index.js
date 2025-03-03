const express = require('express');
const {users} = require('./data/users.json');

const app = express();

const PORT = 5500;

app.use(express.json());

app.get("/" , (req,res) => {
    res.status(200).json({
        message: "server is up & running :)"
    });

});

/**
*Route:/users
*Method: GET
*Description: Get all users
*Access: Public
*Parameter: None
*/

app.get("/users" , (req,res) => {
    res.status(200).json({
        success : true,
        data : users
    });
});

app.get("*" , (req,res) => {
    res.status(404).json({
        message: "page not found :( (This route does not exist)"
    }); 
});

app.listen(PORT , () => {
    console.log(`the server is running on port ${PORT}`);
});
