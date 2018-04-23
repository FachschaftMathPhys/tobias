const { environment } = require('@rails/webpacker')
const vue =  require('./loaders/vue')
const slim =  require('./loaders/slim')
const erb =  require('./loaders/erb')
const coffee =  require('./loaders/coffee')

environment.loaders.append('coffee', coffee)
environment.loaders.append('erb', erb)
environment.loaders.append('slim', slim)
environment.loaders.append('vue', vue)
module.exports = environment
