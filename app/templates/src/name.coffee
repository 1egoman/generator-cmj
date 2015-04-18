###
 * <%= props.name %>
 * <%= props.homepage %>
 *
 * Copyright (c) <%= currentYear %> <%= props.authorName %>
 * Licensed under the <%= props.license %> license.
###

'use strict';

exports.awesome = ->
  'awesome'

exports.connectToDB = ->
  require("./db") "mongodb://user:password@example.com:port/database"
