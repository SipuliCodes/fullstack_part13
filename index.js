const express = require("express");
const app = express();

const { PORT } = require('./util/config')
const {connectToDatabase} = require('./util/db')

const blogsRouter = require("./controllers/blogs");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login")
const authorRouter = require("./controllers/authors")
const readinglistRouter = require('./controllers/readinglists')
const logoutRouter = require('./controllers/logout')

const { errorHandler } = require('./util/middleware')

app.use(express.json());

app.use("/api/blogs", blogsRouter);
app.use("/api/users", usersRouter)
app.use("/api/login", loginRouter)
app.use("/api/authors", authorRouter)
app.use("/api/readinglists", readinglistRouter)
app.use("/api/logout", logoutRouter)

const start = async () => {
  await connectToDatabase()
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

app.use(errorHandler)

start()
