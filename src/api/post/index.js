import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Post, { schema } from './model'

const router = new Router()
const { title, category, shortDescription, description, image, comments } = schema.tree

/**
 * @api {post} /posts Create post
 * @apiName CreatePost
 * @apiGroup Post
 * @apiParam title Post's title.
 * @apiParam category Post's category.
 * @apiParam shortDescription Post's shortDescription.
 * @apiParam description Post's description.
 * @apiParam image Post's image.
 * @apiParam comments Post's comments.
 * @apiSuccess {Object} post Post's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Post not found.
 */
router.post('/',
  body({ title, category, shortDescription, description, image, comments }),
  create)

/**
 * @api {get} /posts Retrieve posts
 * @apiName RetrievePosts
 * @apiGroup Post
 * @apiUse listParams
 * @apiSuccess {Object[]} posts List of posts.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /posts/:id Retrieve post
 * @apiName RetrievePost
 * @apiGroup Post
 * @apiSuccess {Object} post Post's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Post not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /posts/:id Update post
 * @apiName UpdatePost
 * @apiGroup Post
 * @apiParam title Post's title.
 * @apiParam category Post's category.
 * @apiParam shortDescription Post's shortDescription.
 * @apiParam description Post's description.
 * @apiParam image Post's image.
 * @apiParam comments Post's comments.
 * @apiSuccess {Object} post Post's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Post not found.
 */
router.put('/:id',
  body({ title, category, shortDescription, description, image, comments }),
  update)

/**
 * @api {delete} /posts/:id Delete post
 * @apiName DeletePost
 * @apiGroup Post
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Post not found.
 */
router.delete('/:id',
  destroy)

export default router
