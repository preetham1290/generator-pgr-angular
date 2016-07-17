'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var path = require('path');
var pgrUtils = require('../utils.js');
var chalk = require('chalk');
var _ = require('underscore');
var fs = require('fs');

_.str = require('underscore.string');
_.mixin(_.str.exports());

var ModuleGenerator = module.exports = function ModuleGenerator(args, options, config) {

    pgrUtils.getNameArg(this,args);

    yeoman.generators.Base.apply(this, arguments);

    this.uirouter = this.config.get('uirouter');
    this.routerModuleName = this.uirouter ? 'ui.router' : 'ngRoute';
};

util.inherits(ModuleGenerator, yeoman.generators.Base);

ModuleGenerator.prototype.askFor = function askFor() {
    var cb = this.async();
    var that = this;

    var prompts = [
        {
            name:'dir',
            message:'Where would you like to create the module?',
            default: function(data){
                return path.join(that.name || data.name,'/');
            },
            validate: function(value) {
                value = _.str.trim(value);
                if (_.isEmpty(value) || value[0] === '/' || value[0] === '\\') {
                    return 'Please enter a subdirectory.';
                }
                return true;
            }
        }
    ];

    pgrUtils.addNamePrompt(this,prompts,'module');

    this.prompt(prompts, function (props) {
        if (props.name){
            this.name = props.name.toLowerCase();
        }
        if(props.dir.endsWith(this.name+'/') || props.dir.endsWith(this.name)){
            this.dir = path.join(props.dir,'/');
        } else{
            this.dir = path.join(props.dir,this.name,'/');
        }
        cb();
    }.bind(this));
};

ModuleGenerator.prototype.askForModuleName = function askFor() {
    var cb = this.async();
    var that = this;

    var prompts = [
        {
            name:'modulename',
            message:'Enter name of module',
            validate: function(value) {
                value = _.str.trim(value);
                if (_.isEmpty(value)) {
                    return 'Please enter name of module.';
                }
                return true;
            }
        }
    ];

    this.prompt(prompts, function (props) {
        props.modulename = props.modulename.toLowerCase();
        if(props.modulename.endsWith('module')){
            this.modulename = props.modulename;
        } else{
            this.modulename = props.modulename + 'module';
        }
        cb();
    }.bind(this));
};

ModuleGenerator.prototype.askForModuleVariableName = function askFor() {
    var cb = this.async();
    var that = this;

    var prompts = [
        {
            name:'modulevarname',
            message:'Enter name of module variable',
            validate: function(value) {
                value = _.str.trim(value);
                if (_.isEmpty(value)) {
                    return 'Please enter name of module variable.';
                }
                return true;
            }
        }
    ];

    this.prompt(prompts, function (props) {
        props.modulevarname = props.modulevarname.toLowerCase();
        if(props.modulevarname.endsWith('module')){
            this.modulevarname = props.modulevarname;
        } else{
            this.modulevarname = props.modulevarname + 'module';
        }
        cb();
    }.bind(this));
};

ModuleGenerator.prototype.askForConstantsName = function askFor() {
    var cb = this.async();
    var that = this;

    var prompts = [
        {
            name:'constantsname',
            message:'Enter name for constants',
            validate: function(value) {
                value = _.str.trim(value);
                if (_.isEmpty(value)) {
                    return 'Please enter name for constants.';
                }
                return true;
            }
        }
    ];

    this.prompt(prompts, function (props) {
        this.constantsname = props.constantsname.toUpperCase();
        cb();
    }.bind(this));
};

ModuleGenerator.prototype.askForStateName = function askFor() {
    var cb = this.async();
    var that = this;

    var prompts = [
        {
            name:'statename',
            message:'Enter name of statename',
            validate: function(value) {
                value = _.str.trim(value);
                if (_.isEmpty(value)) {
                    return 'Please enter name of statename.';
                }
                return true;
            }
        }
    ];

    this.prompt(prompts, function (props) {
        this.statename = props.statename.toLowerCase();
        this.stateurl = '/'+this.statename.split('.')[this.statename.split('.').length - 1];
        cb();
    }.bind(this));
};

ModuleGenerator.prototype.askForControllerName = function askFor() {
    var cb = this.async();
    var that = this;

    var prompts = [
        {
            name:'controllername',
            message:'Enter name of controllername',
            validate: function(value) {
                value = _.str.trim(value);
                if (_.isEmpty(value)) {
                    return 'Please enter name of controllername.';
                }
                return true;
            }
        }
    ];

    this.prompt(prompts, function (props) {
        this.controllername = props.controllername;
        cb();
    }.bind(this));
};

ModuleGenerator.prototype.askForserviceName = function askFor() {
    var cb = this.async();
    var that = this;

    var prompts = [
        {
            name:'servicename',
            message:'Enter name of service',
            validate: function(value) {
                value = _.str.trim(value);
                if (_.isEmpty(value)) {
                    return 'Please enter name of service.';
                }
                return true;
            }
        }
    ];

    this.prompt(prompts, function (props) {
        this.servicename = props.servicename;
        cb();
    }.bind(this));
};

ModuleGenerator.prototype.files = function files() {

    var module = pgrUtils.getParentModule(path.join(this.dir,'..'));
    module.dependencies.modules.push(this.modulename);
    module.save();
    this.log.writeln(chalk.green(' updating') + ' %s',path.basename(module.file));

    pgrUtils.processTemplates(this.name,this.dir,'module',this,null,null,module);

    var modules = this.config.get('modules');
    if (!modules) {
        modules = [];
    }
    modules.push({name:this.name,file:path.join(this.dir,this.name + '.js')});
    this.config.set('modules',modules);
    this.config.save();
};
