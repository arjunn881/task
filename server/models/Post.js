import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    title : {
        type: String,
        required:true,
    },
    desc : {
        type: String,
        required:true,
    },
    details : {
        type: String,
        required:true,
    }
})

export default mongoose.model("Post", postSchema);