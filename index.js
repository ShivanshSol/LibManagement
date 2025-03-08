const express = require('express');
const {users} = require('./data/users.json');

const app = express();

const PORT = 5500;

app.use(express.json());

app.get("/", (req,res) => {
    res.status(200).json({
        message: "server is up & running :)"
    });

});


/*
*Route:/users
*Method: GET
*Description: Get all users
*Access: Public
*Parameter: None
*/

app.get("/users", (req,res) => {
    res.status(200).json({
        success : true,
        data : users
    });
});


/*
*Route:/users/:id  // ':'=>for displaying id value 
*Method: GET
*Description: Get single user by their id
*Access: Public
*Parameter: id
*/

app.get("/users/:id", (req,res) =>{
		const { id } = req.params; //to fetch the id present in req.
		const user = users.find((each) =>each.id === id);
		
		if(!user){
				return res.status(404).json({
						success : false,
						message : "user does not exist"
				});
		}
		else{
				return res.status(200).json({
						success : true,
						message : "User Found",
						data : user
				});
		}
});


/*
*Route:/users 
*Method: POST
*Description: Creating a new user 
*Access: Public
*Parameter: None
*/

app.post("/users", (req,res) => {
	const { id, name, surname, email, subscriptionType, subscriptionDate } = req.body;

	const user =users.find((each) => each.id === id);
	if (user){
		return res.status(404).json({
			success : false,
			message : "User already exists!"
		});
	}

	users.push({
		id,
		name,
		surname,
		email,
		subscriptionType,
		subscriptionDate
	});

	return res.status(201).json({
		success : true,
		message : "User created successfully",
		data : users
	});

});

/** //DAY02
*Route:/users/:id  // ':'=>for displaying id value 
*Method: PUT  // to update
*Description: updating a user by their id
*Access: Public
*Parameter: ID
*/

app.put("/users/:id", (req,res) => {
	const { id } = req.params;
	const { data } = req.body;

	const user = users.find((each) => each.id === id);

	if(!user){
		return res.status(404).json({
			success : false,
			message : "User does not exist !!"
		});
	}

	const updateUserData = users.map((each) => {
		if(each.id === id){
			return{
				...each,
				...data
			};
		}
			return each;
	});

	return res.status(200).json({
		success : true,
		message : "User updated successfully",
		data : updateUserData
	});

});






/*for anyother route*/
app.get("*", (req,res) => {
    res.status(404).json({
        message: "page not found :( (This route does not exist)"
    }); 
});


app.listen(PORT , () => {
    console.log(`the server is running on port ${PORT}`);
});
