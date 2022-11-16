import express from "express";
import { getEdit, watch, postEdit, getUpload, postUpload, deleteVideo } from "../controllers/videoControllers";
import { protectorMiddleware, publicOnlyMiddleware, videoUpload } from "../middlewares";

const videoRouter = express.Router();

videoRouter.get("/:id([0-9a-f]{24})", watch); // (\\d+) => 숫자만 입력 가능
videoRouter.route("/:id([0-9a-f]{24})/edit").all(protectorMiddleware).get(getEdit).post(postEdit);
videoRouter.route("/upload").all(protectorMiddleware).get(getUpload).post(videoUpload.single("video"),postUpload);
videoRouter.get("/:id([0-9a-f]{24})/delete", protectorMiddleware, deleteVideo);


export default videoRouter;