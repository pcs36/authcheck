import express from 'express'
import cors from 'cors'
import usersRoute from './src/routes/users.routes.js'
const PORT = process.env.PORT || 5000;
const app = new express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())

app.use(process.env.API_URL+process.env.API_VERSION+'/user', usersRoute )
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})