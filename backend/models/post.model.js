import mongoose from 'mongoose'
const postschema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required:true
    },
    text: {
      type: String,
      required:true
    },
    likes: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
    ],
    comments: [
      {
        text: {
          type: String,
          required: true
        },
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
          required: true
        }
      }
    ]
  },
  { timestamps: true }
)
const Post=new mongoose.model("Post", postschema);
export default Post;