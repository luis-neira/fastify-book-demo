'use strict'

const path = require('node:path')
const AutoLoad = require('@fastify/autoload')
const { options } = require('./configs/server-options')

module.exports = async function (fastify, opts) {
  // Place here your custom code!

  fastify.log.info('The .env file has been read %s', process.env.MONGO_URL)

  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'schemas'),
    indexPattern: /^loader.js$/i
  })

  await fastify.register(require('./configs/config'))

  fastify.log.info('Config loaded %o', fastify.config)

  // Do not touch the following lines

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    dirNameRoutePrefix: false,
    indexPattern: /^no$/i,
    ignorePattern: /.*.no-load\.js/,
    options: fastify.config
  })

  // This loads all plugins defined in routes
  // define your routes in one of these
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'routes'),
    indexPattern: /.*routes(\.js|\.cjs)$/i,
    ignorePattern: /.*\.js/,
    autoHooksPattern: /.*hooks(\.js|\.cjs)$/i,
    autoHooks: true,
    cascadeHooks: true,
    options: Object.assign({}, opts)
  })
}

module.exports.options = options
