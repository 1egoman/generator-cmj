###
 * <%= props.name %>
 * <%= props.homepage %>
 *
 * Copyright (c) <%= currentYear %> <%= props.authorName %>
 * Licensed under the <%= props.license %> license.
###

'use strict';

app = require("express")()
chalk = require "chalk"
path = require "path"
bodyParser = require "body-parser"


exports.main = ->

  # connect to database
  <% if (props.models) { %>
  exports.connectToDB()
  <% } %>

  # set ejs as view engine
  app.set "view engine", "ejs"

  # include all the required middleware
  exports.middleware app

  # some sample routes
  <% if (props.views) { %>
  app.get "/", (req, res) ->
      res.render "index"
  <% } else { %>
  app.get "/", (req, res) ->
    res.send "'Allo, World!"
  <% } %>

  # listen for requests
  PORT = process.argv.port or 8000
  app.listen PORT, ->
    console.log chalk.blue "-> :#{PORT}"

exports.middleware = (app) ->

  <% if (props.bodyparser === "form") { %>
  # form body parser
  app.use bodyParser.urlencoded
    extended: true
  <% } else if (props.bodyparser === "json") { %>
  # json body parser
  app.use bodyParser.json()
  <% } %>

  <% if (props.frontend) { %>
  # include sass middleware to auto-compile sass stylesheets
  node_sass = require "node-sass-middleware"
  app.use node_sass
    src: path.join(__dirname, "../public"),
    dest: path.join(__dirname, "../public"),
    debug: true
  <% } %>

  # serve static assets
  app.use require("express-static") path.join(__dirname, '../public')

<% if (props.models) { %>
exports.connectToDB = ->
  require("./db") module.exports.mongouri or module.exports.db or "mongodb://user:password@example.com:port/database"
<% } %>

exports.main()
