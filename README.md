### /users       >fetching all user data
>>POST : create a new user  
>>GET : Get all the user info here  (User Info)


### /users/{ID}      >fetching a particular user

GET : Get a user by ID
PUT(slight update): update a user by their ID(To update user info)
DELETE : Delete a user by ID (check if he/she still have an issued book && if there is any fine to be paid) 


### /users/subscription-details/{ID}

GET : Get user subscription details
>>Date of subscription
>>Valid till
>>Is there any fine


### /books

GET : get all the books
POST : Create/Add a new book


### /books/{ID}   (>Book-ID)

GET : Get a book by ID
PUT : Update a book by ID


### /books/issued

GET: Get all issued books


### /books/issued/withFine

GET: Get all issued books with their fine