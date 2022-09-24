# todo-list
A todo-list api consisting of basic CRUD operations, JWT authentication etc with nodejs,express,mongodb. 
Also implements a basic logger using winston along with integration tests using Jest.

## API-Endpoints and Usage

## 1. Signup : POST {{host}}/users
 
    takes the following(All mandatory) as request body in JSON :
    
    - name : String
    - email : String, unique
    - password : String, minlength = 8
    
    This will register the user in the DB and returns a JWT token which has to be provided in the Authorization header for every subsequent request.
    
## 2. Login : POST {{host}}/users/login

     takes the following(All mandatory) as request body in JSON :

    - email : String
    - password : String
    
    It'll login the user and returns a JWT token (if the provided credentials are valid) which has to be provided in the Authorization header for every subsequent request.
    
## 3. Logout : POST {{host}}/users/logout

    logs out the user. Have to provide the JWT token in Authorization header to perform this action
    
## 4. Create Task : POST {{host}}/tasks

    takes the following as request body in JSON :
    
    - task : String, required
    - completed : Boolean, default - 'false'
    
    Headers : Authorization : Bearer {{JWT_TOKEN}}
    
## 5. Update Task : PATCH {{host}}/tasks/{taskId}
    
    takes {taskId} as path param. refers to id of the task to be updated
    
    takes the following as request body in JSON :
    
    - task : String
    - completed : Boolean
    
     Headers : Authorization : Bearer {{JWT_TOKEN}}
    
## 6. Delete Task : DELETE {{host}}/tasks/{taskId}
    
    takes {taskId} as path param. refers to id of the task to be updated
    
     Headers : Authorization : Bearer {{JWT_TOKEN}}
     
## 7. Get All Tasks : Get {{host}}/tasks
    
     Headers : Authorization : Bearer {{JWT_TOKEN}}
     
## 8. Get Task By Id : Get {{host}}/tasks/{taskId}

     takes {taskId} as path param. refers to id of the task to be updated
    
     Headers : Authorization : Bearer {{JWT_TOKEN}}
    

### Please note that user has to spinup a local mongodb instance on PORT 27017 before starting the service. if the connect-string is different than the one mentioned in .env file, please update the same
