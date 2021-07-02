const { model, Schema } = require("mongoose")

const ObjectId = Schema.ObjectId;
const PostsSchema = new Schema({
  author: ObjectId,
  media: {
    type: [{
      type: {
        type: String,
        enum: ["img", "video"],
        required: true
      },
      path: {
        type: String,
        required: true
      }
    }],
    required: true
  },
  content: String,
  genre: {
    type: String,
    enum: ["드라마", "판타지", "액션", "공포", "코미디"],
    required: true
  },
  tags:{
    type: [{
      type: ObjectId,
      ref: "tags",
      unique: true
    }]
  },
  likes: {
    type: [{
      user_id: {
        type: ObjectId,
        ref: "users"
      }
    }]
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = model("posts", PostsSchema);