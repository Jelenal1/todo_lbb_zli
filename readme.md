# Todo Api

This is a express.js api written which makes it possible to create read update and delete Todos. You have to have a login in order to be able to use the api.

### Installing

1. Clone the repository:

<pre><code class="hljs" id="Vm2g2kucIEbNfYKXtElGZgg12TMkILIx">git clone https://github.com/jelenal1/todo_lbb_zli.git
</code></pre>

2. Install the dependencies:

<pre><code class="hljs" id="pjCNAtCVCkM0YgunpYGhSUUc80x00TgA">yarn
</code></pre>

### Running the app

To run the app, use the following command:

<pre><code class="hljs" id="rINbf01KqjeUwCmwUTVkcYwEC00nMpMr">yarn start
</code></pre>

The app will be available at `http://localhost:3000`.

## API Reference

### `GET /tasks`

Get all tasks for the logged in user.

### `POST /tasks`

Create a new task.

### `GET /tasks/:id`

Get a task by ID.

### `PUT /tasks/:id`

Update a task by ID.

### `DELETE /tasks/:id`

Delete a task by ID.

### `POST /login`

Log in a user with their email and password.

### `GET /verify`

Verify a user by their session cookie.

### `DELETE /logout`

Log out a user and delete the session cookie.

## Built With

* [Express.js](https://expressjs.com/) - Web framework
* [Swagger UI Express](https://www.npmjs.com/package/swagger-ui-express) - OpenAPI documentation
* [Jest](https://jestjs.io/) - Testing framework

## Authors

* **Your Name** - *Initial work* - [Your GitHub username](https://github.com/your-username)
