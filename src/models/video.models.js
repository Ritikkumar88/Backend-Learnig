import mongoose , {Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";



const videoSchema = new Schema({
    
    videoFile: {
        type: String, // cloudnary url
        require: true,
    },

    thumbnail: {
        type: String, // cloudnary url
        require: true,
    },

    title: {
        type: String, 
        require: true,
    },

    discription: {
        type: String, 
        require: true,
    },

    duration: {
        type: Number, // cloudnary url
        require: true,
    },

    views : {
        type: Number,
        default: 0
    },

    isPublished : {
        type: Boolean,
        default: true,
    },

    owner: {
        type: Schema.Types.ObjectId,
        ref : "user"
    },

} , {timestamps: true});

videoSchema.plugin(mongooseAggregatePaginate);

export const video = mongoose.model('video' , videoSchema);