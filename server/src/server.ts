import express from 'express';
import cors from "cors"
import { votesRoute } from './routes/votes.routes';
import { communityRoute } from './routes/community.routes';


const app = express();

app.use(cors())
app.use(express.json())

//Config rotas

app.use(votesRoute)
app.use(communityRoute)


app.listen(process.env.PORT || 3333, () => {
    console.log("HTTP server running")
})