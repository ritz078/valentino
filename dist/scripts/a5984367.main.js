"use strict";angular.module("valentinoApp",["ngNotify","angucomplete-alt","ngAnimate","chart.js","btford.socket-io","mentio","ngSanitize","angularMoment","ngNanoscroller","ngEmoticons","ngRoute"]),console.log("▄████████  ▄██████▄  ███▄▄▄▄   ███▄▄▄▄      ▄████████  ▄████████     ███        ▄████████ ████████▄   ▄█   ▄█\n███    ███ ███    ███ ███▀▀▀██▄ ███▀▀▀██▄   ███    ███ ███    ███ ▀█████████▄   ███    ███ ███   ▀███ ███  ███\n███    █▀  ███    ███ ███   ███ ███   ███   ███    █▀  ███    █▀     ▀███▀▀██   ███    █▀  ███    ███ ███▌ ███\n███        ███    ███ ███   ███ ███   ███  ▄███▄▄▄     ███            ███   ▀  ▄███▄▄▄     ███    ███ ███▌ ███\n███        ███    ███ ███   ███ ███   ███ ▀▀███▀▀▀     ███            ███     ▀▀███▀▀▀     ███    ███ ███▌ ███\n███    █▄  ███    ███ ███   ███ ███   ███   ███    █▄  ███    █▄      ███       ███    █▄  ███    ███ ███  ███\n███    ███ ███    ███ ███   ███ ███   ███   ███    ███ ███    ███     ███       ███    ███ ███   ▄███ ███  ███▌    ▄\n████████▀   ▀██████▀   ▀█   █▀   ▀█   █▀    ██████████ ████████▀     ▄████▀     ██████████ ████████▀  █▀   █████▄▄██\n▀");var resolve={delay:function($q,$timeout){var delay=$q.defer();return $timeout(delay.resolve,50,!1),delay.promise}},app=angular.module("valentinoApp");app.config(["$routeProvider","$locationProvider",function($routeProvider,$locationProvider){$routeProvider.when("/",{templateUrl:"../views/home.html",controller:"HomeController",resolve:resolve}).when("/rules",{templateUrl:"../views/rules.html",controller:"RulesController",resolve:resolve}).when("/shout/:id",{templateUrl:"../views/shout.html",controller:"ShoutController",resolve:resolve}).when("/user/:enrolmentNo",{templateUrl:"../views/user.html",controller:"UserController",resolve:resolve}).when("/leaderboard",{templateUrl:"../views/leaderboard.html",controller:"LeaderboardController",resolve:resolve}).when("/love-guru",{templateUrl:"../views/loveGuru.html",controller:"LoveguruController",resolve:resolve}).otherwise({redirectTo:"/"}),$locationProvider.html5Mode(!0).hashPrefix("!")}]),Chart.defaults.global.scaleLineColor="rgba(255,255,255,.1)",Chart.defaults.global.scaleFontColor="rgba(255,255,255,0.8)",Chart.defaults.global.scaleFontFamily="latoregular,sans-serif",Chart.defaults.global.animationSteps=150,Chart.defaults.global.tooltipFillColor="rgba(131, 76, 196, 0.95)",Chart.defaults.global.tooltipFontFamily="latoregular,sans-serif",Chart.defaults.global.tooltipTitleFontFamily="latoregular,sans-serif";var app=angular.module("valentinoApp");app.filter("reverse",function(){return function(items){return void 0!==items?items.slice().reverse():void 0}}),app.filter("leaderBfilter",function(){return function(items,input){function capitaliseFirstLetter(string){return string.charAt(0).toUpperCase()+string.slice(1)}var filtered=[];return void 0===input||""===input?items:(angular.forEach(items,function(item){0===item.name.indexOf(capitaliseFirstLetter(input))&&filtered.push(item)}),filtered)}}),app.filter("profanity",function(){var words=["sex","fuck"];return function(input){return input?(console.log(input),angular.forEach(words,function(word){var x=word,len=word.length;String.prototype.repeat=function(num){return new Array(num+1).join(this)};var re=new RegExp(x,"g");input=input.replace(re,"*".repeat(len))}),input):void 0}}),app.filter("numberSuffix",function(){return function(input){return 1===input?input+"st":2===input?input+"nd":3===input?input+"rd":input+"th"}});var app=angular.module("valentinoApp");app.controller("ValentinoController",["ngNotify","$scope","$http","dataLeaderboard","dataShoutbox","mySocket",function(ngNotify,$scope,$http,dataLeaderboard,dataShoutbox,mySocket){$scope.shouts=[];var promiseShoutbox=dataShoutbox.getShoutbox();promiseShoutbox.then(function(d){$scope.shouts=d}),$scope.clb=[];var promiseLeaderboard=dataLeaderboard.getCombinedLeaderboard();promiseLeaderboard.then(function(d){$scope.clb=d}),$scope.user={name:"Ritesh Kumar",enrolmentNo:"11115078"},$scope.submitShout=function(e){(13===e.keyCode||$("mentio-menu").is(":visible"))&&(13!==e.keyCode||e.shiftKey||$("mentio-menu").is(":visible")||!$scope.user.content||(e.preventDefault(),$scope.user.time=new Date,$scope.shouts.push($scope.user),mySocket.emit("chat message",$scope.user.content),$scope.user={name:"Ritesh Kumar"},console.log($scope.user.content),$scope.user.content="",mySocket.on("rfh",function(m){console.log(m),ngNotify.set(m,"error")})))},$scope.loadShout=function(){$http.get("http://beta.json-generator.com/api/json/get/FR1rX3L").success(function(ds){angular.forEach(ds,function(d){$scope.shouts.push(d)})})},$("#shoutInput").focus(function(){$(this).animate({height:"80px"})}),$("#shoutInput").blur(function(){$(this).animate({height:"40px"})}),$scope.people=[{label:"Joe"},{label:"Mike"},{label:"Diane"},{label:"Ritesh"},{label:"Pulkit"},{label:"Punit"}]}]),app.controller("HomeController",["$scope","ngNotify","messages","dashboardData",function($scope,ngNotify,messages,dashboardData){$scope.message={anon:!0},console.log($scope.message),$scope.sendMessage=function(){if($scope.selectedReceiver.originalObject)if($scope.message.to=$scope.selectedReceiver.originalObject.enrolmentNo,console.log($scope.message),$scope.message.anon&&$scope.message.message)ngNotify.set("Anonymous ? Really ? Why ? Why ? Why ?","error");else{var sendMsgPromise=messages.sendMsg($scope.message);sendMsgPromise.then(function(d){console.log(d)})}};var dashPromise=dashboardData.getdashData();dashPromise.then(function(d){console.log(d),d.error_code?ngNotify.set("Alert","error"):$scope.dash=d})}]),app.controller("RulesController",["$scope","dataRules",function($scope,dataRules){$scope.rules={};var valPromise=dataRules.getRules();valPromise.then(function(data){$scope.rules=data.data.rules})}]),app.controller("ShoutController",["$scope","$http","$sce","embed","$routeParams","dataSingleShout",function($scope,$http,$sce,embed,$routeParams,dataSingleShout){console.log($routeParams.id);var shPromise=dataSingleShout.getShoutData($routeParams.id);shPromise.then(function(d){$scope.shout=d,console.log(d),String.prototype.truncate=function(n){return this.substr(0,n-1)+(this.length>n?"...":"")},$scope.shout.youtube={};var embedPromise=embed.getVideo($scope.shout.content);embedPromise.then(function(e){console.log(e),$scope.shout.youtube.id=e.items[0].id,$scope.shout.youtube.title=e.items[0].snippet.channelTitle,$scope.shout.youtube.desc=e.items[0].snippet.description.truncate(250),$scope.shout.youtube.videoUrl=$sce.trustAsResourceUrl("https://www.youtube.com/embed/"+e.items[0].id+"?autoplay=1&theme=light&rel=0")});var width=$(".center").width()-100,height=.5625*width;$scope.videoDimensions={height:height,width:width};var imgRegex=/((?:https?):\/\/\S*\.(?:gif|jpg|jpeg|tiff|png|svg|webp))/gi,img=$scope.shout.content.match(imgRegex);img&&($scope.shout.imageUrl=img[0]),console.log($scope.shout)})}]),app.controller("UserController",["$scope","$http","$routeParams","dataUser",function($scope,$http,$routeParams,dataUser){var promise=dataUser.getUser($routeParams.enrolmentNo);promise.then(function(d){console.log(d),$scope.wall=d,$scope.pieChart1={labels:["Bande","Bandiyan"],data:[d.male_roses,d.female_roses]},$scope.pieChart2={labels:["Red Roses","Yellow Roses"],data:[d.red_roses,d.yellow_roses]};var daily={red_roses:[0,0,0,0,0,0,0,0],yellow_roses:[0,0,0,0,0,0,0,0]};angular.forEach(d.rr_daywise,function(x){daily.red_roses[x.day-1]=x.count}),angular.forEach(d.yr_daywise,function(x){daily.yellow_roses[x.day-1]=x.count,console.log(x)}),console.log(daily),$scope.lineChart={labels:["8th","9th","10th","11th","12th","13th","14th","15th"],series:["Red Roses","Yellow Roses"],data:[daily.red_roses,daily.yellow_roses],options:{scaleGridLineColor:"rgba(255,255,255,.05)",bezierCurve:!1}}}),$scope.pieChart={colors:[{fillColor:"rgba(255,255,255,0.3)",strokeColor:"rgba(255,255,255,0.3)",pointColor:"rgba(255,255,255,0.3)",pointStrokeColor:"rgba(255,255,255,0.3)",pointHighlightFill:"rgba(255,255,255,0.3)",pointHighlightStroke:"rgba(255,255,255,0.3)"},{fillColor:"rgba(255,255,255,0.7)",strokeColor:"rgba(255,255,255,0.7)",pointColor:"rgba(255,255,255,0.7)",pointStrokeColor:"rgba(255,255,255,0.7)",pointHighlightFill:"rgba(255,255,255,0.7)",pointHighlightStroke:"rgba(255,255,255,0.7)"}],options:{segmentShowStroke:!1}}}]),app.controller("LeaderboardController",["$scope","$http","dataLeaderboard",function($scope,$http,dataLeaderboard){var promise=dataLeaderboard.getLeaderboard(1,30,"M");promise.then(function(d){$scope.users=d}),$scope.addtoLeaderboard=function(l){console.log(l);var add_promise=dataLeaderboard.getLeaderboard(l,5,"M");add_promise.then(function(ds){angular.forEach(ds,function(d){$scope.users.push(d)})})},$scope.selectedGender={male:!1,female:!1,getGender:function(){return this.male&&!this.female?"Male":this.female&&!this.male?"Female":"All"}}}]),app.controller("LoveguruController",["$scope",function(){}]);