import express from 'express';
import cors from 'cors';
import cookieParser from "cookie-parser";
import bodyParser from 'body-parser';
import dotenv from "dotenv"
import http from 'http';
dotenv.config();
const app = express();

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

app.use(express.json());
app.use(cookieParser());
const corsoptions = {
  origin: '*',
  methods: "GET, POST, PUT, DELETE, HEAD, PATCH",
  credentials: true,
}

app.use(cors(corsoptions));

app.get('/', (req, res) => {
  return res.json({
    success: true,
    message: "Your server is up and running",
  });
});


const createServer = (host, port) => {
  http.createServer(app).listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}.`)
  })
}

const serverConfig = [
  { "host": "localhost", "port": 3001 },
  { "host": "localhost", "port": 3002 },
  { "host": "localhost", "port": 3003 },
  { "host": "localhost", "port": 3004 }
]
serverConfig.forEach(server => createServer(server.host, server.port));