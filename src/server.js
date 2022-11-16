
import express from "express";
import morgan from "morgan";
import session from "express-session";
import MongoStore from "connect-mongo";
import rootRouter from "./routers/rootRouter";
import videoRouter from "./routers/videoRouter";
import userRouter from "./routers/userRouter";
import { localsMiddleware } from "./middlewares";



const app = express();
const logger = morgan("dev");


app.set("view engine", "pug"); // 뷰엔진 세팅
app.set("views", process.cwd() + "/src/views"); // 뷰엔진 세팅, 폴더 변경
app.use(logger);
app.use(express.urlencoded({extended:true})); // req.body 사용 세팅, form을 이해하고 우리가 사용할 수 있는 자바스크립트 오브젝트 형식으로 변환해줌.

app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: false, // 접속하는 모든 사용자에 대한 세션 저장여부
    saveUninitialized: false, // 접속하는 모든 사용자에 대한 세션 저장여부
    store: MongoStore.create({mongoUrl: process.env.DB_URL}), // 세션을 데이터베이스에 저장, 없으면 메모리에 저장
}));

app.use(localsMiddleware);
app.use("/uploads", express.static("uploads"));
app.use("/", rootRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);

export default app;