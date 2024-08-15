import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { StatusCodes } from 'http-status-codes';
import mongoSanitize from 'express-mongo-sanitize';
import rateLimit from 'express-rate-limit';
import routeUser from './routes/user.js';
import routeProduct from './routes/product.js';
import routeOrder from './routes/order.js';
import routePhoto from './routes/photo.js';
import './passport/passport.js';
// 导入 socket.io 和 socket.io-adapter：
import { createAdapter } from '@socket.io/mongo-adapter';
import { MongoClient } from 'mongodb';
import { Server } from 'socket.io';
import http from 'http';

const app = express();
const server = http.createServer(app);

// 初始化 Socket.IO
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// 连接到 MongoDB，并设置 Socket.IO 的 MongoDB Adapter
const mongoClient = new MongoClient(process.env.DB_URL);
await mongoClient.connect();
const db = mongoClient.db();
io.adapter(createAdapter(db.collection('socket.io-adapter')));

app.use(rateLimit({
  windowMs: 1000 * 60 * 15,
  max: 100,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  statusCode: StatusCodes.TOO_MANY_REQUESTS,
  message: '太多請求',
  handler(req, res, next, options) {
    res.status(options.statusCode).json({
      success: false,
      message: options.message
    });
  }
}));

app.use(cors({
  origin(origin, callback) {
    if (origin === undefined ||
      origin.includes('github.io') || origin.includes('localhost') || origin.includes('127.0.0.1')
    ) {
      callback(null, true);
    } else {
      callback(new Error('CORS'), false);
    }
  }
}));

app.use(express.json());
app.use((_, req, res, next) => {
  res.status(StatusCodes.BAD_REQUEST).json({
    success: false,
    message: '資料格式錯誤'
  });
});

app.use(mongoSanitize());

app.use('/user', routeUser);
app.use('/product', routeProduct);
app.use('/order', routeOrder);
app.use('/photo', routePhoto);

app.all('*', (req, res) => {
  res.status(StatusCodes.NOT_FOUND).json({
    success: false,
    message: '找不到'
  });
});

// 启动服务器并连接到 MongoDB
server.listen(process.env.PORT || 4000, async () => {
  console.log('伺服器啟動');
  await mongoose.connect(process.env.DB_URL);
  mongoose.set('sanitizeFilter', true);
  console.log('資料庫連線成功');
});
