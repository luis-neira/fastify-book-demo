const t = require('tap')
const fcli = require('fastify-cli/helper')

t.todo('the application should start', async (t) => {})
t.todo('the alive route is online', async (t) => {})
t.todo('the application should not start', async (t) => {})

const startArgs = '-l info --options app.js'

t.test('the application should start', async (t) => {
  const envParam = {
    NODE_ENV: 'test',
    MONGO_URL: 'mongodb://localhost:27017/test'
  }
  const app = await fcli.build(startArgs, {
    configData: envParam
  })
  t.teardown(() => { app.close() })
  await app.ready()
  t.pass('the application is ready')
})
