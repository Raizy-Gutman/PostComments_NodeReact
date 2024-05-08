

// // import express from 'express';
// // import usersRoutes from './routes/usersRoutes.js';
// // import todosRoutes from './routes/todosRoutes.js';
// // import postsRoutes from './routes/postsRoutes.js';
// // import passwordsRoutes from './routes/passwordsRoutes.js';
// // import commentsRoutes from './routes/commentsRoutes.js';

// // const app = express();
// // const PORT = process.env.PORT || 3000;

// // // Middleware
// // app.use(express.json());

// // // Routes
// // app.use('/api/users', usersRoutes);
// // app.use('/api/todos', todosRoutes);
// // app.use('/api/posts', postsRoutes);
// // app.use('/api/passwords', passwordsRoutes);
// // app.use('/api/comments', commentsRoutes);

// // // Start the server
// // app.listen(PORT, () => {
// //     console.log(`Server is running on port ${PORT}`);
// // });








// // import express from 'express';
// // import cors from 'cors';
// // import usersRoutes from './app/routes/usersRoutes.js';
// // import todosRoutes from './app/routes/todosRoutes.js';
// // import postsRoutes from './app/routes/postsRoutes.js';
// // import passwordsRoutes from './app/routes/passwordsRoutes.js';
// // import commentsRoutes from './app/routes/commentsRoutes.js';

// // const app = express();
// // const PORT = process.env.PORT || 3000;

// // // Middleware
// // app.use(express.json());
// // app.use(express.urlencoded({ extended: true }));

// // // Routes
// // app.use('/api/users', usersRoutes);
// // app.use('/api/todos', todosRoutes);
// // app.use('/api/posts', postsRoutes);
// // app.use('/api/passwords', passwordsRoutes);
// // app.use('/api/comments', commentsRoutes);

// // // CORS setup
// // const cors = require("cors");
// // const corsOptions = {
// //   origin: "http://localhost:3300"
// // };
// // app.use(cors(corsOptions));

// // // Simple route
// // app.get("/", (req, res) => {
// //   res.json({ message: "Welcome to my application." });
// // });

// // // Start the server
// // app.listen(PORT, () => {
// //     console.log(`Server is running on port ${PORT}`);
// // });










// import express from 'express';
// import cors from 'cors';
// import dotenv from 'dotenv';
// import usersRoutes from './app/routes/usersRoutes.js';
// import todosRoutes from './app/routes/todosRoutes.js';
// import postsRoutes from './app/routes/postsRoutes.js';
// import passwordsRoutes from './app/routes/passwordsRoutes.js';
// import commentsRoutes from './app/routes/commentsRoutes.js';

// const app = express();

// dotenv.config({ path: './app/config/.env' });
// const PORT = process.env.PORT || 3000;

// // CORS configuration
// const corsOptions = {
//   origin: "http://localhost:3300"
// };

// // Middleware
// app.use(cors(corsOptions));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Routes
// app.use('/api/users', usersRoutes);
// app.use('/api/todos', todosRoutes);
// app.use('/api/posts', postsRoutes);
// app.use('/api/passwords', passwordsRoutes);
// app.use('/api/comments', commentsRoutes);

// // Default route
// app.get("/", (req, res) => {
//   res.json({ message: "Welcome to my application." });
// });

// // Start the server
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}.`);
// });








//להחזיר לקדמותו:
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRouter from './app/routes/usersRoutes.js';
import todosRoutes from './app/routes/todosRoutes.js';
import postsRoutes from './app/routes/postsRoutes.js';
import passwordsRoutes from './app/routes/passwordsRoutes.js';
import commentsRoutes from './app/routes/commentsRoutes.js';

const app = express();

dotenv.config({ path: './app/config/.env' });
// Middleware
const PORT = process.env.PORT || 3000;
app.use((req,res,next)=>{
  console.log("hello"+req.params)
  next()
});

// Middleware
app.use(cors()); // Enable CORS for all origins
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/users', userRouter);
app.use('/todos', todosRoutes);
app.use('/posts', postsRoutes);
app.use('/passwords', passwordsRoutes);
app.use('/comments', commentsRoutes);

// Default route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to my application." });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
