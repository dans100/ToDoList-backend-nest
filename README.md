<h1 align="center" id="title">ToDoList</h1>

<p id="description">A simple application that effectively allows you to organize your work. It was created as part of my own work to complete the MegaK course.</p>

<h2>🚀 Demo</h2>

[https://todolist.networkmanager.pl/](https://todolist.networkmanager.pl/)

<p>Login without creating an account: e-mail: admin@admin.com password: admin</p>

<h2>Project Screenshots:</h2>

<img src="https://raw.githubusercontent.com/dans100/ToDoList-frontend/main/public/login.png" alt="project-screenshot" width="800" height="385/">

<img src="https://raw.githubusercontent.com/dans100/ToDoList-frontend/main/public/view.png" alt="project-screenshot" width="800" height="385/">

<img src="https://raw.githubusercontent.com/dans100/ToDoList-frontend/main/public/deadlines.png" alt="project-screenshot" width="800" height="385/">

<img src="https://raw.githubusercontent.com/dans100/ToDoList-frontend/main/public/darkmode.png" alt="project-screenshot" width="800" height="385/">

  
  
<h2>🧐 Features</h2>

Here're some of the project's best features:

*   editing existing tasks
*   task search
*   calendar with deadlines
*   login and registration
*   dark mode
*   responsive styles

<h2>🛠️ Installation Steps:</h2>

<p>1. Clone the backend project</p>

```
https://github.com/dans100/ToDoList-backend-nest.git
```

<p>2. Go to the project folder</p>

```
cd ToDoList-backend-nest
```

<p>3. Install dependencies</p>

```
yarn
```

<p>4. Start the server development</p>

```
nest start
```

<p>5. Start the watch mode</p>

```
nest start --watch
```

<p>To run this project, you will need to add the following environment variables to your .env file</p>

* ACCESS_KEY
* CORS_ORIGIN
* DOMAIN
* DB_HOST
* DB_USERNAME
* DB_PASSWORD
* DB_DATABASE


<p>Create the TypeORM configuration file</p>

<p>
{
  "type": "mysql",
  "host": process.env.DB_HOST,
  "port": process.env.DB_PORT,
  "username": process.env.DB_USERNAME,
  "password": process.env.DB_PASSWORD,
  "database": process.env.DB_DATABASE,
  "entities": ["dist/**/*.entity{.ts,.js}"],
  "synchronize": true
}
</p>
  
<h2>💻 Built with</h2>

Technologies used in the project:

*   Nest.js
*   Typescript
*   TypeORM
*   Passport.js
