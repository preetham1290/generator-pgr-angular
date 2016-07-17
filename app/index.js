'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var pgrUtils = require('../utils.js');

var PgrangularGenerator = module.exports = function PgrangularGenerator(args, options, config) {
    yeoman.generators.Base.apply(this, arguments);

    this.on('end', function () {
        this.config.set('partialDirectory','partial/');
        this.config.set('modalDirectory','partial/');
        this.config.set('directiveDirectory','directive/');
        this.config.set('filterDirectory','filter/');
        this.config.set('serviceDirectory','service/');
        var inject = {
            js: {
                file: 'index.html',
                marker: pgrUtils.JS_MARKER,
                template: '<script src="<%= filename %>"></script>'
            }
        };
        this.config.set('inject',inject);
        this.config.save();
        this.installDependencies({ skipInstall: options['skip-install'] });
    });

    this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(PgrangularGenerator, yeoman.generators.Base);

PgrangularGenerator.prototype.askFor = function askFor() {
    var cb = this.async();

    var prompts = [{
        name: 'appname',
        message: 'What would you like the angular app/module name to be?',
        default: path.basename(process.cwd())
    }];

    this.prompt(prompts, function (props) {
        this.appname = props.appname.toLowerCase();
        cb();
    }.bind(this));
};

PgrangularGenerator.prototype.askForUiRouter = function askFor() {
    var cb = this.async();

    var prompts = [{
        name: 'router',
        type:'list',
        message: 'UI-router will be your default router',
        default: 0,
        choices: ['Angular UI Router']
    }];

    this.prompt(prompts, function (props) {
        this.uirouter = true;
        this.routerJs = 'bower_components/angular-ui-router/release/angular-ui-router.js';
        this.routerModuleName = 'ui.router';
        this.routerViewDirective = 'ui-view';
        this.config.set('uirouter',this.uirouter);
        cb();
    }.bind(this));
};


PgrangularGenerator.prototype.app = function app() {
    this.directory('skeleton/','./');
    this.mkdir("app");
    this.mkdir("app/partials");
    this.mkdir("app-content");
    this.mkdir("app-content/js");
    this.mkdir("app-content/css");  
    this.mkdir("app-content/img");
    this.copy('app.js','app/'+this.appname+'.js');
};
