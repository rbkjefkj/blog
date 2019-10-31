const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title: { type: String, required: true },
    body: { type: Schema.Types.Mixed, required: true }, //type: String instead?
    published: { type: Boolean, required: true },
    timestamp: { type: Date, default: Date.now() },
    comments: { //NEED to make the comments such that upon creating a post there are none required but when a user types a comment both comment author and body are required.
        author: { type: String },
        body: { type: String },
        timestamp: { type: Date, default: Date.now() }
    }
});

const Post = mongoose.model('Post', PostSchema);
module.exports = Post;
