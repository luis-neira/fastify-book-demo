const t = require('tap')
const fcli = require('fastify-cli/helper')

// t.todo('the application should start', async (t) => {})
// t.todo('the alive route is online', async (t) => {})
// t.todo('the application should not start', async (t) => {})

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

async function buildApp (t, env, serverOptions) {
  const app = await fcli.build(startArgs,
    { configData: env },
    serverOptions
  )
  t.teardown(() => { app.close() })
  return app
}

t.test('the alive route is online', async (t) => {
  const app = await buildApp(t)
  const response = await app.inject({
    method: 'GET',
    url: '/'
  })
  t.same(response.json(), { root: true })
})

t.test('the application should not start', async mainTest => {
  mainTest.test('if there are missing ENV vars', async t => {
    try {
      await buildApp(t, {
        NODE_ENV: 'test',
        MONGO_URL: undefined
      })
      t.fail('the server must not start')
    } catch (error) {
      t.ok(error, 'error must be set')
      t.match(error.message, "required property 'MONGO_URL'")
    }
  })

  mainTest.test('when mongodb is unreachable', async t => {
    try {
      await buildApp(t, {
        NODE_ENV: 'test',
        MONGO_URL: 'mongodb://localhost:27099/test'
      })
      t.fail('the server must not start')
    } catch (error) {
      t.ok(error, 'error must be set')
      t.match(error.message, 'connect ECONNREFUSED')
    }
  })
})
