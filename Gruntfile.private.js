'use strict';
var extend = require('util')._extend;
var fs = require('fs');

module.exports = function (grunt) {
	function arrayToObj(arr) {
		return typeof(arr.reduce) === 'function' ? arr.reduce(function (obj, replace) {
			if (typeof(replace.from) === 'string') {
				obj[replace.from] = replace.to;
			} else {
				obj.$$preserve.push(replace);
			}
			return obj;
		}, {$$preserve: []}) : arr;
	}

	function loadReplacements() {
		var preserve, replacements = {};
		try {
			extend(replacements, arrayToObj(require(process.cwd() + '/replace.conf.js')));
			preserve = replacements.$$preserve;
			extend(replacements, arrayToObj(require(process.cwd() + '/replace.private.conf.js')));
			replacements.$$preserve = preserve.concat(replacements.$$preserve);
		} catch (e) {
		}
		return replacements;
	}

	function removeVMFormat(sourceObj) {
		var resultObj = {};
		for (var key in sourceObj) {
			var matchResult = key.match(/^\$\{(.*)\}$/);
			if (matchResult && matchResult.length>0) {
				var strippedKey = matchResult[1];      // from {$staticBaseUrl} to staticBaseUrl
				resultObj[strippedKey] = sourceObj[key];
			}
		}
		return resultObj;
	}


	grunt.registerTask('convertToProcessVM', 'Processing the replace.conf.js and replace.private.conf.js and converting it to json that will be used by the processVM.', function () {
		// convert only if replace.conf.js exist
		if (fs.existsSync(process.cwd() + '/replace.conf.js')) {
			console.log('Converting "replace.conf.js" to "processVM.json", please remove "replace.conf.js" file to prevent the conversion');
			fs.writeFileSync('processVM.json', JSON.stringify(removeVMFormat(loadReplacements()), null, 2));
		}
	});

	grunt.loadNpmTasks('grunt-process-vm');
	grunt.config('processVM', {
		dist: {
			options: {
				jsonFile: 'processVM.json'
			},
			files: [{
				expand: true,
				cwd: 'app',
				src: 'index.vm',
				dest: '.tmp',
				ext: '.html'
			}]
		}
	});

	// Remove the old replace, and change it to be the processVM task
	grunt.modifyTask('concurrent', function () {
		var replaceIdx = this.server.indexOf('replace:dist');
		this.server[replaceIdx] = 'processVM:dist';

		this.server.unshift('convertToProcessVM');
	});

	// Add a watch for the processVM.json
	grunt.modifyTask('watch', function () {
		this.processVM = {
			files: ['processVM.json'],
			tasks: ['processVM:dist'],
			options: {reload: true}
		}
	});

	// Change the "replace" watch, to run the convertToProcessVM and processVM
	grunt.modifyTask('watch', function () {
		this.replace.tasks = ['convertToProcessVM', 'processVM:dist'];
	});

	// Change the "replaceConf" watch, to run the convertToProcessVM and processVM
	grunt.modifyTask('watch', function () {
		this.replaceConf.tasks = ['convertToProcessVM', 'processVM:dist'];
	});
};
