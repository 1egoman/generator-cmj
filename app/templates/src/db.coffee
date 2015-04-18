###
 * <%= props.name %>
 * <%= props.homepage %>
 *
 * Copyright (c) <%= currentYear %> <%= props.authorName %>
 * Licensed under the <%= props.license %> license.
###
mongoose = require "mongoose"

module.exports = (host) ->
  # connect to mongo database
  mongoose.connect host
  # error?
  mongoose.connection.on 'error', console.error.bind(console, 'db error:')
  # success
  mongoose.connection.once 'open', ->
    console.log 'Connected To Mongo instance:', host
    return
  return
