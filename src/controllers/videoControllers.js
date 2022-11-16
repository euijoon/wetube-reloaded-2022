import { now } from "mongoose";
import Video from "../models/video";
import User from "../models/user";




export const home = async (req, res) => {   //await는 함수에서만 사용 가능하므로, 함수외 사용시 async를 넣어줘야 됨(promis)
    try {
        const videos = await Video.find({}).sort({createdAt: "desc"}); // await는 자료를 찾을때까지 이 구문에서 대기함, 자료 찾은 후 다음줄로 넘어감 ,,, {}는 조건없이 전체를 찾음
        return res.render("home", { pageTitle: "Home", videos});
    } catch { // try에서 에러 발생시 catch로 넘어감
        return res.render("server-error")
    }
    
};
export const getEdit = async (req, res) => {
    const { id } = req.params; 
    const { _id } = req.session.user;
    const video = await Video.findById(id);
    if(video === null){
        return res.status(404).render("404", { pageTitle: "Video not found."});
    }
    if(String(video.owner) !== String(_id)){
        return res.status(403).redirect("/");
    }
    return res.render("edit" , { pageTitle: `Edit: ${video.title}`, video})
    
};
export const postEdit = async (req, res) => {
    const { id } = req.params;
    const { _id } = req.session.user;
    const { title, description, hashtags } = req.body;
    const video = await Video.exists({_id: id});
    if(!video){
        return res.status(404).render("404", { pageTitle: "Video not found."});
    }
    if(String(video.owner) !== String(_id)){
        return res.status(403).redirect("/");
    }
    await Video.findByIdAndUpdate(id, {
        title,
        description,
        hashtags: Video.formatHashtags(hashtags),
    })
    return res.redirect(`/videos/${id}`);
};

export const watch = async (req, res) => {
    const { id } = req.params;
    const video = await Video.findById(id).populate("owner"); // populate,  ref에 적었던 "user" --> owner 부분을 실제 user data로 채워줌
    console.log(video);
    if(video === null){
        return res.render("404", { pageTitle: "Video not found."});
    }
    return res.render("watch", { pageTitle: video.title, video});
};

export const getUpload = (req, res) => {
    return res.render("upload", {pageTitle: "Upload Video"});
};

export const postUpload = async (req, res) => {
    const { user: {_id} } = req.session;
    const { path } = req.file;
    const { title, description, hashtags } = req.body;
    try {
        const newVideo = await Video.create({
            title,
            description, 
            fileUrl: path,
            owner: _id,
            hashtags: Video.formatHashtags(hashtags),
        });
        const user = await User.findById(_id);
        user.videos.push(newVideo._id);
        user.save();
        return res.redirect("/");
    } catch(error) {
        return res.status(400).render("upload", {pageTitle: "Upload Video", errorMessage: error._message});
    }
    
};

export const deleteVideo = async (req, res) => {
    const { id } = req.params;
    const { _id } = req.session.user;
    const video = await Video.findById(id);
    if(!video){
        return res.status(404).render("404", { pageTitle: "Video not found."});
    }
    if(String(video.owner) !== String(_id)){
        return res.status(403).redirect("/");
    }
    await Video.findByIdAndDelete(id);
    return res.redirect("/");
}

export const search = async (req, res) => {
    const { keyword } = req.query;
    let videos = [];
    if(keyword){
        videos = await Video.find({
            title: {
                $regex: new RegExp(`${keyword}$`, "i"), //keyword 키워드가 포함된 제목 검색,  `^${keyword}` 키워드가 시작 단어인 제목 검색, `${keyword}$` 키워드가 끝인 제목 검색
            },
        })
    }
    return res.render("search", {pageTitle: "Search", videos});
}