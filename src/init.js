import "dotenv/config"; //env 사용, 제일먼저 사용해야 됨
import "./db";
import "./models/video";
import "./models/user";
import app from "./server";

const PORT = 4000;

const handleListening = () => console.log(`✅ Sever listening on port http://localhost:${PORT} 🚀`);

app.listen(PORT, handleListening)