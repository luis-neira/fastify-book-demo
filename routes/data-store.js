'use strict'

// This file exists only for mock testing purposes

const registered = []

module.exports = {
  async store (user) {
    registered.push(user)
  },
  data () {
    return registered
  }
}
