import { model, Schema } from 'mongoose';

const commentSchema = new Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: 'Author is required',
    },
    post: {
      type: Schema.Types.ObjectId,
      ref: 'Post',
      required: 'Post is required',
    },
    text: {
      type: String,
      trim: true,
      required: 'Comment must have a text',
    },
  },
  {
    timestamps: true,
  },
);

function autopopulate(next) {
  this.populate('author', 'name avatar');
  next();
}

commentSchema.pre('find', autopopulate);
commentSchema.pre('findOne', autopopulate);

export default model('Comment', commentSchema);
