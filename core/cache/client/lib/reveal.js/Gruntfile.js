/* global module:false */
module.exports=function(s){var e=s.option("port")||8e3;s.initConfig({pkg:s.file.readJSON("package.json"),meta:{banner:'/*!\n * reveal.js <%= pkg.version %> (<%= grunt.template.today("yyyy-mm-dd, HH:MM") %>)\n * http://lab.hakim.se/reveal-js\n * MIT licensed\n *\n * Copyright (C) 2014 Hakim El Hattab, http://hakim.se\n */'},qunit:{files:["test/*.html"]},uglify:{options:{banner:"<%= meta.banner %>\n"},build:{src:"js/reveal.js",dest:"js/reveal.min.js"}},cssmin:{compress:{files:{"css/reveal.min.css":["css/reveal.css"]}}},sass:{main:{files:{"css/theme/default.css":"css/theme/source/default.scss","css/theme/beige.css":"css/theme/source/beige.scss","css/theme/night.css":"css/theme/source/night.scss","css/theme/serif.css":"css/theme/source/serif.scss","css/theme/simple.css":"css/theme/source/simple.scss","css/theme/sky.css":"css/theme/source/sky.scss","css/theme/moon.css":"css/theme/source/moon.scss","css/theme/solarized.css":"css/theme/source/solarized.scss","css/theme/blood.css":"css/theme/source/blood.scss"}}},jshint:{options:{curly:!1,eqeqeq:!0,immed:!0,latedef:!0,newcap:!0,noarg:!0,sub:!0,undef:!0,eqnull:!0,browser:!0,expr:!0,globals:{head:!1,module:!1,console:!1,unescape:!1}},files:["Gruntfile.js","js/reveal.js"]},connect:{server:{options:{port:e,base:"."}}},zip:{"reveal-js-presentation.zip":["index.html","css/**","js/**","lib/**","images/**","plugin/**"]},watch:{main:{files:["Gruntfile.js","js/reveal.js","css/reveal.css"],tasks:"default"},theme:{files:["css/theme/source/*.scss","css/theme/template/*.scss"],tasks:"themes"}}}),s.loadNpmTasks("grunt-contrib-qunit"),s.loadNpmTasks("grunt-contrib-jshint"),s.loadNpmTasks("grunt-contrib-cssmin"),s.loadNpmTasks("grunt-contrib-uglify"),s.loadNpmTasks("grunt-contrib-watch"),s.loadNpmTasks("grunt-contrib-sass"),s.loadNpmTasks("grunt-contrib-connect"),s.loadNpmTasks("grunt-zip"),s.registerTask("default",["jshint","cssmin","uglify","qunit"]),s.registerTask("themes",["sass"]),s.registerTask("package",["default","zip"]),s.registerTask("serve",["connect","watch"]),s.registerTask("test",["jshint","qunit"])};
