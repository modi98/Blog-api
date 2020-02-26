import mongoose, { Schema } from 'mongoose'

const categories = ['travel', 'lifestyle', 'business', 'food', 'work']
const postSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: categories,
    required: true
  },
  shortDescription: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  comments: [
    {
      author: String,
      comment: String
    }
  ]
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

postSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      title: this.title,
      category: this.category,
      shortDescription: this.shortDescription,
      description: this.description,
      image: this.image,
      comments: this.comments,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Post', postSchema)

export const schema = model.schema
export default model
