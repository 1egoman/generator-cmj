'use strict';

var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');

var NodeCoffeeGenerator = module.exports = function NodeCoffeeGenerator(args, options) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({
      bower: false,
      skipInstall: options['skip-install']
    });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));

};
util.inherits(NodeCoffeeGenerator, yeoman.generators.NamedBase);

NodeCoffeeGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  console.log(
    this.yeoman +
    '\nThe name of your project shouldn\'t contain "node" or "js" and' +
    '\nshould be a unique ID not already in use at search.npmjs.org.');

  var prompts = [{
    name: 'name',
    message: 'Module Name',
    default: path.basename(process.cwd())
  }, {
    name: 'description',
    message: 'Description',
    default: 'The best module ever.'
  }, {
    name: 'homepage',
    message: 'Homepage'
  }, {
    name: 'license',
    message: 'License',
    default: 'MIT'
  }, {
    name: "frontend",
    message: "Scaffold Frontend?",
    default: "y"
  }, {
    name: 'githubUsername',
    message: 'GitHub username',
    default: '1egoman'
  }, {
    name: 'authorName',
    message: 'Author\'s Name',
    default: "Ryan Gaus"
  }, {
    name: 'authorEmail',
    message: 'Author\'s Email'
  }, {
    name: 'authorUrl',
    message: 'Author\'s Homepage'
  }];

  this.currentYear = (new Date()).getFullYear();

  this.prompt(prompts, function (props) {
    this.slugname = this._.slugify(props.name);
    this.camelname = this._.camelize(this.slugname);

    this.repoUrl = 'https://github.com/' + props.githubUsername + '/' + this.slugname;

    if (!props.homepage) {
      props.homepage = this.repoUrl;
    }

    this.props = props;
    var that = this;

    if (this.props.frontend === "y" || this.props.frontend === "Y") {
      this.props.frontend = true;

      // ask frontend specific questions
      this.prompt([{
        name: 'bodyparser',
        message: "Which bodyparser should I use? (form, json, or none)",
        default: "json"
      }], function(frontendProps) {
        console.log(props)
        that.props.bodyparser = frontendProps.bodyparser;
        cb();
      });

    } else {
      this.props.frontend = false;
      cb();
    }

  }.bind(this));
};

NodeCoffeeGenerator.prototype.lib = function lib() {
  this.mkdir('src');
  this.template('src/name.coffee', 'src/' + this.slugname + '.coffee');
  this.template('src/db.coffee', 'src/db.coffee');
  this.template('src/models/model.coffee', 'src/models/model.coffee');
};

NodeCoffeeGenerator.prototype.models = function models() {
  this.mkdir('src/models');
  this.template('src/models/model.coffee', 'src/models/schema.coffee');
};

NodeCoffeeGenerator.prototype.test = function test() {
  this.mkdir('test');
  this.mkdir('test/src');
  this.mkdir('test/support');

  this.copy('test/support/globals.js', 'test/support/globals.js');
  this.copy('test/support/runner.js', 'test/support/runner.js');

  this.template('test/src/specs/name.spec.coffee', 'test/src/specs/' + this.slugname + '.spec.coffee');
};

NodeCoffeeGenerator.prototype.projectfiles = function projectfiles() {
  this.copy('jshintrc', '.jshintrc');
  this.copy('gitignore', '.gitignore');
  this.copy('travis.yml', '.travis.yml');

  this.template('README.md');
  this.template('Gruntfile.js');
  this.template('_package.json', 'package.json');
};

NodeCoffeeGenerator.prototype.frontend = function frontend() {
  if (!this.props.frontend) return;

  this.mkdir('public');
  this.mkdir('public/sass');

  // sass templates
  this.template('public/index.scss', 'public/sass/index.scss');
  this.directory('public/bootstrap', 'public/sass/bootstrap');
  this.copy('public/_bootstrap.scss', 'public/sass/_bootstrap.scss');
};
