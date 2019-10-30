const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title: { type: String, required: true },
    body: { type: Schema.Types.Mixed, required: true }, //type: String instead?
    published: { type: Boolean, required: true },
    timestamp: { type: Date, default: Date.now() },
    comments: {
        author: { type: String, required: true },
        body: { type: String, required: true },
        timestamp: { type: Date, default: Date.now() }
    }
});

const Post = mongoose.model('Post', PostSchema);
module.exports = Post;
