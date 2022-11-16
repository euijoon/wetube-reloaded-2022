import mongoose from "mongoose";




const videoSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true, maxLength: 80 },
    description: { type: String, required: true, trim: true },
    fileUrl: { type: String, required: true },
    createdAt: { type: Date, required: true, default: Date.now },
    hashtags: [{ type: String, trim: true }],
    meta: {
        viwes: { type: Number, default: 0, required: true },
        rating: { type: Number, default: 0, required: true },
    },
    owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "user" }, //ref
});

videoSchema.static("formatHashtags", function(hashtags) {
    return hashtags.split(",").map((word) => (word.startsWith('#') ? word : `#${word}`)); // split 단어를 구분하는 값(",") => 구분하여 어레이로 변환 , map 단어 앞에 붙여주는 표시 (#)
})

const Video = mongoose.model("video", videoSchema);

export default Video; 