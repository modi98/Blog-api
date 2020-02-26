import request from 'supertest'
import { apiRoot } from '../../config'
import express from '../../services/express'
import routes, { Post } from '.'

const app = () => express(apiRoot, routes)

let post

beforeEach(async () => {
  post = await Post.create({})
})

test('POST /posts 201', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ title: 'test', category: 'test', shortDescription: 'test', description: 'test', image: 'test', comments: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.title).toEqual('test')
  expect(body.category).toEqual('test')
  expect(body.shortDescription).toEqual('test')
  expect(body.description).toEqual('test')
  expect(body.image).toEqual('test')
  expect(body.comments).toEqual('test')
})

test('GET /posts 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /posts/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${post.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(post.id)
})

test('GET /posts/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /posts/:id 200', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${post.id}`)
    .send({ title: 'test', category: 'test', shortDescription: 'test', description: 'test', image: 'test', comments: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(post.id)
  expect(body.title).toEqual('test')
  expect(body.category).toEqual('test')
  expect(body.shortDescription).toEqual('test')
  expect(body.description).toEqual('test')
  expect(body.image).toEqual('test')
  expect(body.comments).toEqual('test')
})

test('PUT /posts/:id 404', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ title: 'test', category: 'test', shortDescription: 'test', description: 'test', image: 'test', comments: 'test' })
  expect(status).toBe(404)
})

test('DELETE /posts/:id 204', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${post.id}`)
  expect(status).toBe(204)
})

test('DELETE /posts/:id 404', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})
