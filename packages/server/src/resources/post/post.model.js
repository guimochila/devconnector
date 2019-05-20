import { model, Schema } from 'mongoose';
import slug from 'slugs';

const postSchema = new Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: 'Please, enter a title name.',
    },
    slug: String,
    text: {
      type: String,
      required: 'Please, enter a text for your post.',
      trim: true,
    },
    likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

postSchema.pre('save', async function createSlug(next) {
  if (!this.isModified('title')) {
    return next();
  }
  this.slug = slug(this.title);
  const slugRegEx = new RegExp(`^(${this.slug})((-[0-9]*)?)$`, 'i');

  const postsWithSlug = await this.constructor.find({ slug: slugRegEx });

  if (postsWithSlug.length) {
    this.slug = `${this.slug}-${Math.floor(1000 + Math.random() * 9000)}`;
  }

  next();
});

postSchema.virtual('comments', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'post',
});

export default model('Post', postSchema);
