const express = require("express"); //importing express
const { users } = require('../data/users.json'); //importing users data from users.json file
const router = express.Router(); //creating a router

/*  //DAY01
*Route:/users
*Method: GET
*Description: Get all users
*Access: Public
*Parameter: None
*/

router.get("/", (req,res) => {
    res.status(200).json({
        success : true,
        data : users
    });
});


/*  //DAY01
*Route:/users/:id  // ':'=>for displaying id value 
*Method: GET
*Description: Get single user by their id
*Access: Public
*Parameter: id
*/

router.get("/:id", (req,res) =>{
		const { id } = req.params; //to fetch the id present in req.
		const user = users.find((each) => each.id === id);
		
		if(!user){
				return res.status(404).json({
						success : false,
						message : "User does not exist !!"
				});
		}
		else{
				return res.status(200).json({
						success : true,
						message : "User Found !!",
						data : user
				});
		}
});
 

/*  //DAY02
*Route:/users 
*Method: POST
*Description: Creating a new user 
*Access: Public
*Parameter: None
*/

router.post("/", (req,res) => {
	const { id, name, surname, email, subscriptionType, subscriptionDate } = req.body;

	const user = users.find((each) => each.id === id);
	if (user){
		return res.status(404).json({
			success : false,
			message : "User already exists !!"
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
		message : "User created successfully !!",
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

router.put("/:id", (req,res) => {
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
		message : "User updated successfully !!",
		data : updateUserData
	});

});


/** //DAY03
*Route:/users/:id  // ':'=>for displaying id value 
*Method: DELETE  // to delete an user
*Description: deleting a user by their id
*Access: Public
*Parameter: ID
*/

router.delete("/:id", (req,res) => {
	const { id } = req.params;

	const user = users.find((each) => each.id === id);

	if(!user){
		return res.status(404).json({
			success : false,
			message : "User does not exist !!"
		});
	}

	const index = users.indexOf(user);
	users.splice(index,1);

	return res.status(200).json({
		success : true,
		message : "User deleted successfully !!",
		data : users
	});
});


module.exports = router; //exporting the router to use in index.js