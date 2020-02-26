import { Post } from '.'

let post

beforeEach(async () => {
  post = await Post.create({ title: 'test', category: 'test', shortDescription: 'test', description: 'test', image: 'test', comments: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = post.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(post.id)
    expect(view.title).toBe(post.title)
    expect(view.category).toBe(post.category)
    expect(view.shortDescription).toBe(post.shortDescription)
    expect(view.description).toBe(post.description)
    expect(view.image).toBe(post.image)
    expect(view.comments).toBe(post.comments)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = post.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(post.id)
    expect(view.title).toBe(post.title)
    expect(view.category).toBe(post.category)
    expect(view.shortDescription).toBe(post.shortDescription)
    expect(view.description).toBe(post.description)
    expect(view.image).toBe(post.image)
    expect(view.comments).toBe(post.comments)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
