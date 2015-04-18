###
 * <%= props.name %>
 * <%= props.homepage %>
 *
 * Copyright (c) <%= currentYear %> <%= props.authorName %>
 * Licensed under the <%= props.license %> license.
###

mongoose = require 'mongoose'

schema = mongoose.Schema
  name: String

module.exports = mongoose.model 'Schema', schema
