import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';

const app = express();
dotenv.config();

app.use(express.json({ limit:"30mb", extended: true }));
app.use(express.urlencoded({ limit:"30mb", extended: true }));
app.use(cors());

app.use('/posts', postRoutes);
app.use('/user', userRoutes);

app.get('/', (req, res) => {
    res.send("Onion Man API")
});

const path = require("path");
const favicon = require("serve-favicon");
app.use(favicon(path.join(dirname, "build", "favicon.ico")));
app.use(express.static(path.join(__dirname, "client", "build")));
app.get("/*", function(request, response) {
    response.sendFile(path.join(__dirname, "./client/build", "index.html"));
})

//mongodb.com/cloud/atlas
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(process.env.PORT ||3000, () => console.log(`Server running on port: ${PORT}`)) )
    .catch((error) => console.log(`${error} did not connect.`) );

// mongoose.set('useFindAndModify', false);