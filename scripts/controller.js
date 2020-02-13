(function () {

    $.urlParam = function (name) {
        var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
        if (results == null) {
            return null;
        } else {
            return results[1] || 0;
        }
    }

    $(window).scroll(function () {
        var navfixed = $('.navfixed');
        scroll = $(window).scrollTop();

        /*if (scroll >= 80) {
            navfixed.addClass('fixed');
            $('.backbtn').addClass('highlights');
            $('.sidebar').css('top', '51px');
        } else {
            navfixed.removeClass('fixed');
            $('.backbtn').removeClass('highlights');
            $('.sidebar').css('top', '108px');
        }*/
    });

    angular.module('tracehive.controller', ['tracehive.controller.login', 'tracehive.controller.nav', 'tracehive.controller.main', 'tracehive.controller.sensors', 'tracehive.controller.parameter', 'tracehive.controller.machinery', 'tracehive.controller.inventory', 'tracehive.controller.workorder', 'tracehive.controller.receipe', 'tracehive.controller.report', 'tracehive.controller.notification', 'tracehive.controller.location', 'tracehive.controller.ModalController', 'tracehive.controller.mastermaterial', 'tracehive.controller.masteruom', 'tracehive.controller.mastermanufature', 'tracehive.controller.mastermodel', 'tracehive.controller.masterlocation', 'tracehive.controller.users', 'tracehive.controller.adduser', 'tracehive.controller.machinerylogactivities', 'tracehive.controller.machineryaddqualification', 'tracehive.controller.supplier', 'tracehive.controller.masteraddsupplier', 'tracehive.controller.createsample', 'tracehive.controller.profile', 'tracehive.controller.adduserprofile', 'tracehive.controller.badgeinfo', 'tracehive.controller.addbadgeinfo', 'tracehive.controller.samplelist'])

    angular.module('tracehive.controller.login', [])
        .controller('loginCtrl', ['$scope', '$state', '$rootScope', 'getService', 'LoginService', function ($scope, $state, $rootScope, getService, LoginService) {
            $scope.loginData = {}
            $rootScope.isLoggedIn = false;
            $rootScope.loggedInUserName ="";
            $rootScope.logginName="";
            $rootScope.loggedInUserID =0;
			$rootScope.topLocationDropdown =[];
            $scope.login = function () {


                var data = {
                    username: $scope.loginData.username,
                    password: $scope.loginData.password
                };
                getService.login(data).then(function (data) {
                   // console.log(JSON.stringify(data));
                    if (data.status == "success") {
                        $rootScope.isLoggedIn = true;
                        $rootScope.loggedInUserID = data.response.USER_ID;
                        $rootScope.loggedInUserName = data.response.USERNAME;
                        $rootScope.loggedInUserRole = data.response.USER_ROLE;
                        $rootScope.loggedInUserFirstName = data.response.FIRST_NAME;
                        $rootScope.loggedInUserLastName = data.response.LAST_NAME;
                        $rootScope.loggedInName = data.response.FIRST_NAME +" "+ data.response.LAST_NAME;
                        LoginService.setLogin(data.response);
						
						
                        $state.go("nav.home");
                    } else {
                        alert("Invalid User or Wrong Password")
                    }
                });
            }
            
            /***********************************************
				@Created By:- 5838
				@Created date :- 12-12-2016
				@get password when forgot passwod from this function 
			**************************************************/
			$scope.fData = {}
			$scope.forgotpass=	function(){
				
				 var data = {
                    email: $scope.fData.email
                };
				getService.forgotpassword(data).then(function(data){
					
					if(data.status=="success"){
						//alert("Success");
						 $("#forgotmessage").html("");
						 $("#forgotmessage").html('<p><font color="red">Password sent successfully to your email.</font></p>');

					}else{
						alert("Email address is not registered");
					}
				});	
			}
			/******** end ******/

    }]);
    
    angular.module('tracehive.controller.nav', [])
        .controller('navCtrl', ['$scope', '$rootScope', '$state', 'getService', function ($scope, $rootScope, $state, getService ) {
            $scope.navHome = function() {
                $scope.isNavHome = true;
                $scope.isNavEquipment = false;
                $scope.isNavAdmin = false;
                
                //alert($state.current.name)
                
                if($state.current.name == 'nav.sensors' )
                    $state.go('nav.home');

                if(($state.current.name === 'nav.machinery') || ($state.current.name === 'nav.parameters') ) {
                    $state.go('nav.sensors');
                    $scope.isNavHome = false;
                    $scope.isNavEquipment = true;
                    $scope.isNavAdmin = false;
                }
                
                if(($state.current.name === 'nav.machinerylogactivities') || ($state.current.name === 'nav.machineryaddqualification')) {
                    $state.go('nav.machinery');
                    $scope.isNavHome = false;
                    $scope.isNavEquipment = true;
                    $scope.isNavAdmin = false;
                }
                
                if($state.current.name == 'nav.users' )
                    $state.go('nav.home');

                
                if(($state.current.name === 'nav.profile') || ($state.current.name === 'nav.badgeinfo') 
                     || ($state.current.name === 'nav.mastermaterial')  || ($state.current.name === 'nav.masteruom') 
                     || ($state.current.name === 'nav.mastermanufature')  || ($state.current.name === 'nav.mastermodel') 
                      || ($state.current.name === 'nav.masterlocation')  || ($state.current.name === 'nav.supplier') ) {
                    $state.go('nav.users');
                    $scope.isNavHome = false;
                    $scope.isNavEquipment = false;
                    $scope.isNavAdmin = true;
                }
            getService.getUserProfileById($rootScope.loggedInUserRole).then(function (response) {
                
                console.log(response.workorderRead);
                $scope.workorderRead = response.workorderRead;
                $scope.qualityRead = response.qualityRead;
                $scope.inventoryRead = response.inventoryRead;
                $scope.invqualityRead = response.invqualityRead;
                $scope.recipeRead = response.recipeRead;
                $scope.equipmentRead = response.equipmentRead;
                $scope.sensorRead = response.sensorRead;
                $scope.machineryRead = response.machineryRead;
                $scope.logactivityRead = response.logactivityRead;
                $scope.qualificationRead = response.qualificationRead;
                $scope.parameterRead = response.parameterRead;
                $scope.reportRead = response.reportRead;
                $scope.adminRead = response.adminRead;
                $scope.userRead = response.userRead;
                $scope.roleRead = response.roleRead;
                $scope.masterRead = response.masterRead;
                $scope.materialRead = response.materialRead;
                $scope.uomRead = response.uomRead;
                $scope.manufacturerRead = response.manufacturerRead;
                $scope.modelRead = response.modelRead;
                $scope.locationRead = response.locationRead;
                $scope.supplierRead = response.supplierRead;
                $scope.otherFeatureChat = response.SHOWCHAT_SETTINGS;
				$scope.dashboardAlerts = response.SHOWALERTS_SETTINGS;
				$scope.dashboardLocationMap = response.SHOWLOCATIONMAP_SETTINGS;
                
                
            });    
                

            }
            $scope.navEquipment = function() {
                $scope.isNavHome = false;
                $scope.isNavEquipment = true;
                $scope.isNavAdmin = false;
            }
            $scope.navAdmin = function() {
                $scope.isNavHome = false;
                $scope.isNavEquipment = false;
                $scope.isNavAdmin = true;
				
            }
            $scope.navHome();
            
			/* Created by :- 5838 , get all location in drop down at top*/
				getService.getAllLocationList().then(function(response){
					$rootScope.topLocationDropdown=response
					//console.log(response);
				})
				/*end */
			
            //alert($rootScope.loggedInUserID);
			
			$rootScope.selectedCityMenu="All Locations";
            $scope.topdropdownitemselected = function (item) {
 
                $rootScope.selectedCityMenu = item;
                $scope.$broadcast('locationName',{name:item});
                
                //applyFilter();
            }
			
            
    }]);

    angular.module('tracehive.controller.main', [])
        .controller('mainCtrl', ['$http', '$scope', '$rootScope', '$state', 'getService', 'poollingFactory', '$window', '$sce', 'ModalService', function ($http, $scope, $rootScope, $state, getService, poollingFactory, $window, $sce, ModalService) {
            
            getService.getAllCities().then(function (response) {
                $scope.locationList = response;
            });
            $scope.graph = {}
            $scope.limit = 5;

            $scope.loadedData = false;
            
            $scope.showChat = function()
            {
                ModalService.showModal({
                    template: '<div class="modal fade bs-example-modal-lg chatmodal" tabindex="-1" role="dialog"   aria-labelledby="myLargeModalLabel"> <div class="modal-dialog modal-lg" role="document"> <button type="button" class="close" data-dismiss="modal" style="position:absolute; top:6px; right:10px;"><span aria-hidden="true">&times;</span></button> <iframe src="http://demo.calsoftlabs.com:5000/?username='+$rootScope.loggedInUserName+'" width="100%" style="min-height:600px;" frameborder="0"></iframe> </div> </div>',
                    controller: "ModalController"
                }).then(function (modal) {
                    modal.element.modal();
                    modal.close.then(function (result) {
                        $scope.message = "You said " + result;
                    });
                });

            }
            
            $scope.show = function (host, entityname, timestamp) {
                /*var myString = timestamp;
                if (myString.charAt(myString.length - 1) == 'Z') {
                    myString = myString.substr(0, myString.length - 1);
                }*/
                var myString = timestamp;
                var startUnixValue = moment(myString).subtract(2, "minutes").unix() * 1000;
                var endUnixValue = moment(myString).add(2, "minutes").unix() * 1000;

                var panelID;
                /*if (host == 'humidity'){
                    panelID = 'http://104.236.142.108:3000/dashboard-solo/db/sensors?panelId=1&fullscreen&from=' + startUnixValue + '&to=' + endUnixValue;
                }
                else if (host == 'temperature'){
                    panelID = 'http://104.236.142.108:3000/dashboard-solo/db/sensors?panelId=2&fullscreen&from=' + startUnixValue + '&to=' + endUnixValue;
                }
                else{
                    panelID = 'http://107.170.194.248:3000/dashboard-solo/db/usecase1?panelId=2&fullscreen&from='+ startUnixValue + '&to=' + endUnixValue;
                }*/



                console.log(startUnixValue + " " + endUnixValue);

                ModalService.showModal({
                    template: '<div class="modal fade"> <div class="graphModel modal-dialog" dragable> <div class="modal-content">               <div class="modal-header"> <button type="button" class="close" ng-click="close("Cancel")" data-dismiss="modal" aria-hidden="true">&times;</button><h4 class="modal-title">Metric Graph -' + host + '</h4></div><div class="modal-body"><iframe id="frameSource" frameborder="0" height="450" width="850" ng-src="http://198.199.116.245/api/0.1/graph?name=' + host + '&start=' + startUnixValue + '&end=' + endUnixValue + '&tags=entityname%3D' + entityname + '"></iframe> </div></div></div></div>',
                    controller: "ModalController"
                }).then(function (modal) {
                    modal.element.modal();
                    modal.close.then(function (result) {
                        $scope.message = "You said " + result;
                    });
                });




                /*ModalService.showModal({
                    template: '<div class="modal fade"> <div class="graphModel modal-dialog" dragable> <div class="modal-content">               <div class="modal-header"> <button type="button" class="close" ng-click="close("Cancel")" data-dismiss="modal" aria-hidden="true">&times;</button><h4 class="modal-title">Metric Graph -' + host + '</h4></div><div class="modal-body"><iframe id="frameSource" width="800" height="400" frameborder="0" ng-src="http://104.236.142.108:3000/dashboard-solo/db/sensors?panelId=' + panelID + '&fullscreen&from=' + startUnixValue + '&to=' + endUnixValue + '"></iframe> </div></div></div></div>',
                    controller: "ModalController"
                }).then(function (modal) {
                    modal.element.modal();
                    modal.close.then(function (result) {
                        $scope.message = "You said " + result;
                    });
                });
                */
                /*ModalService.showModal({
                    template: '<div class="modal fade"> <div class="graphModel modal-dialog" dragable> <div class="modal-content">               <div class="modal-header"> <button type="button" class="close" ng-click="close("Cancel")" data-dismiss="modal" aria-hidden="true">&times;</button><h4 class="modal-title">Metric Graph -' + host + '</h4></div><div class="modal-body"><iframe id="frameSource" width="800" height="400" frameborder="0" ng-src="http://198.199.116.245/api/0.1/graph?name=humidity&start='+ startUnixValue + '&end=' + endUnixValue + '"></iframe> </div></div></div></div>',
                    controller: "ModalController"
                }).then(function (modal) {
                    modal.element.modal();
                    modal.close.then(function (result) {
                        $scope.message = "You said " + result;
                    });
                });*/


            };

            $scope.alertsData = [];
            $scope.sampleData = [];
            $scope.SeriesData1 = [];
            $scope.SeriesData2 = [];

            $scope.alertsCount;
            $scope.sampleDataCount;

            $scope.topologyInit = function (data) {
                    
                    var input = [];
                    getService.getSensorList().then(function (response) {
                        input = [];
                        angular.forEach(response, function (obj) {
                            if (data == "All") {
                                if (obj.city !== null)
                                    input.push({
                                        'name': obj.city,
                                        img: 'images/location.svg'
                                    })
                                if (obj.address_line1 !== null) {
                                    var cityAddress1Data = obj.city + '.' + obj.address_line1
                                    input.push({
                                        'name': cityAddress1Data,
                                        img: 'images/building.svg'
                                    })
                                }
                                if (obj.address_line2 !== null) {
                                    var cityAddress2Data = obj.city + '.' + obj.address_line1 + '.' + obj.address_line2
                                    input.push({
                                        'name': cityAddress2Data,
                                        img: 'images/room.svg'
                                    })
                                }
                                if (obj.sensor_name !== null) {
                                    var sensor = obj.city + '.' + obj.address_line1 + '.' + obj.address_line2 + '.' + obj.sensor_name;
                                    input.push({
                                        'name': sensor,
                                        img: 'images/sensor.svg'
                                    })
                                }
                                if (obj.machinery_code !== 'Not Available') {
                                    var machinery = obj.city + '.' + obj.address_line1 + '.' + obj.address_line2 + '.' + obj.sensor_name + '.' + obj.machinery_code;
                                    input.push({
                                        'name': machinery,
                                        img: 'images/machinery.svg'
                                    })
                                }
                            } else {
                                if (obj.sensor_name == angular.lowercase(data)) {

                                    if (obj.city !== null)
                                        input.push({
                                            'name': obj.city,
                                            img: 'images/location.svg'
                                        })
                                    if (obj.address_line1 !== null) {
                                        var cityAddress1Data = obj.city + '.' + obj.address_line1
                                        input.push({
                                            'name': cityAddress1Data,
                                            img: 'images/building.svg'
                                        })
                                    }
                                    if (obj.address_line2 !== null) {
                                        var cityAddress2Data = obj.city + '.' + obj.address_line1 + '.' + obj.address_line2
                                        input.push({
                                            'name': cityAddress2Data,
                                            img: 'images/room.svg'
                                        })
                                    }
                                    if (obj.sensor_name !== null) {
                                        var sensor = obj.city + '.' + obj.address_line1 + '.' + obj.address_line2 + '.' + obj.sensor_name;
                                        input.push({
                                            'name': sensor,
                                            img: 'images/sensor.svg'
                                        })
                                    }
                                    if (obj.machinery_code !== 'Not Available') {
                                        var machinery = obj.city + '.' + obj.address_line1 + '.' + obj.address_line2 + '.' + obj.sensor_name + '.' + obj.machinery_code;
                                        input.push({
                                            'name': machinery,
                                            img: 'images/machinery.svg'
                                        })

                                    }
                                }
                            }

                        })


                        input = input.reduce(function (field, e1) {
                            var matches = field.filter(function (e2) {
                                return e1.name == e2.name
                            });
                            if (matches.length == 0) {
                                field.push(e1);
                            }
                            return field;
                        }, []);

                        function add2Dots(string, limit) {
                            var dots = "..";
                            if (string.length > limit) {
                                // you can also use substr instead of substring
                                string = string.substring(0, limit) + dots;
                            }

                            return string;
                        }


                        // Iterate over input array elements
                        var desiredOutput = input.reduce(function createOuput(arr, obj) {
                            var names = obj.name.split('.');
                            // Copy input element object as not to modify original input
                            var newObj = Object.keys(obj).filter(function skipName(key) {
                                return key !== 'name';
                            }).reduce(function copyObject(tempObj, key) {
                                if (key.match(/url$/i)) {
                                    tempObj[key] = obj[key];
                                } else {
                                    tempObj[key] = obj[key];
                                }

                                return tempObj;
                            }, {
                                fullname: add2Dots(names[names.length - 1], 4),
                                name: names[names.length - 1],
                                data: {}
                            });

                            // Build new output array with possible recursion
                            buildArray(arr, names, newObj);

                            return arr;
                        }, []);

                        //document.write('<pre>' + JSON.stringify(desiredOutput, null, 4) + '</pre>');

                        // Helper function to search array element objects by name property
                        function findIndexByName(arr, name) {
                            for (var i = 0, len = arr.length; i < len; i++) {
                                if (arr[i].name === name) {
                                    return i;
                                }
                            }

                            return -1;
                        }

                        // Recursive function that builds output array
                        function buildArray(arr, paths, obj) {
                            var path = paths.shift();
                            var index = findIndexByName(arr, path);

                            if (paths.length) {
                                if (index === -1) {
                                    arr.push({
                                        name: path,
                                        children: []
                                    });

                                    index = arr.length - 1;
                                }

                                if (!Array.isArray(arr[index].children)) {
                                    arr[index].children = [];
                                }

                                buildArray(arr[index].children, paths, obj);
                            } else {
                                arr.push(obj);
                            }

                            return arr;
                        }


                        var width = 600,
                            height = 500,
                            root;

                        var force = d3.layout.force()
                            .linkDistance(80)
                            .charge(-150)
                            .gravity(.08)
                            .size([width, height]);
                        //.on("tick", tick);
                        $("#topoView").html('');
                        var svg = d3.select("#topoView").append("svg")
                            .attr("width", width)
                            .attr("height", height);

                        var link = svg.selectAll(".link"),
                            node = svg.selectAll(".node");

                        var topo = {
                                "name": "",
                                "children": desiredOutput
                            }
                           // console.log(JSON.stringify(topo))
                        root = topo
                        update();
                        //});

                        function update() {
                            var nodes = flatten(root),
                                links = d3.layout.tree().links(nodes);

                            // Restart the force layout.
                            force
                                .nodes(nodes)
                                .links(links)
                                .start();

                            // Update links.
                            link = link.data(links, function (d) {
                                return d.target.id;
                            });

                            link.exit().remove();

                            link.enter().insert("line", ".node")
                                .attr("class", "link");

                            // Update nodes.
                            node = node.data(nodes, function (d) {
                                return d.id;
                            });

                            node.exit().remove();

                            var nodeEnter = node.enter().append("g")
                                .attr("class", "node")
                                .on("click", click)
                                .call(force.drag);

                            nodeEnter.append("circle")
                                .attr("r", function (d) {
                                    return Math.sqrt(d.size) / 20 || 12;
                                });

                            nodeEnter.append("title")
                                .text(function (d) {
                                    return d.name;
                                });

                            var images = nodeEnter.append("svg:image")
                                .attr("xlink:href", function (d) {
                                    return d.img;
                                })
                                .attr("x", function (d) {
                                    return -8;
                                })
                                .attr("y", function (d) {
                                    return -8;
                                })
                                .attr("color", function (d) {
                                    return d.color
                                })
                                .attr("height", 16)
                                .attr("width", 16);


                            nodeEnter.append("text")
                                .attr("dy", "2.5em")
                                .attr("dx", "0.5em")
                                .text(function (d) {
                                    return d.fullname;
                                });

                            node.select("circle")
                                .style("fill", color);
                        }

                        force.on("tick", function (e) {
                            var k = 6 * e.alpha;
                            d3.layout.tree().links(flatten(root)).forEach(function (d, i) {
                                d.source.y -= k;
                                d.target.y += k;
                            });
                            link.attr("x1", function (d) {
                                    return d.source.x;
                                })
                                .attr("y1", function (d) {
                                    return d.source.y;
                                })
                                .attr("x2", function (d) {
                                    return d.target.x;
                                })
                                .attr("y2", function (d) {
                                    return d.target.y;
                                });

                            node.attr("transform", function (d) {
                                return "translate(" + d.x + "," + d.y + ")";
                            });
                        });

                        function tick() {
                            link.attr("x1", function (d) {
                                    return d.source.x;
                                })
                                .attr("y1", function (d) {
                                    return d.source.y;
                                })
                                .attr("x2", function (d) {
                                    return d.target.x;
                                })
                                .attr("y2", function (d) {
                                    return d.target.y;
                                });

                            node.attr("transform", function (d) {
                                return "translate(" + d.x + "," + d.y + ")";
                            });
                        }

                        function color(d) {
                            return d._children ? "#3182bd" // collapsed package
                                : d.children ? "#c6dbef" // expanded package
                                : "#fd8d3c"; // leaf node
                        }

                        // Toggle children on click.
                        function click(d) {
                            if (d3.event.defaultPrevented) return; // ignore drag
                            if (d.children) {
                                d._children = d.children;
                                d.children = null;
                            } else {
                                d.children = d._children;
                                d._children = null;
                            }
                            update();
                        }

                        // Returns a list of all nodes under the root.
                        function flatten(root) {
                            var nodes = [],
                                i = 0;

                            function recurse(node) {
                                if (node.children) node.children.forEach(recurse);
                                if (!node.id) node.id = ++i;
                                nodes.push(node);
                            }

                            recurse(root);
                            return nodes;
                        }
                    })
                }
                //topology View

            $scope.topologyInit("All");
            function getContent(timestamp)
			{
				var queryString = {'timestamp' : timestamp};

				$.ajax(
					{
					type: 'GET',
					/*url: document.location.origin+"/previnsight/phase2/restPhp/long-polling/server/server.php",*/
					url: document.location.origin+"/admin/restPhp/long-polling/server/server.php",
					data: queryString,
					success: function(data){
					var obj = jQuery.parseJSON(data);
					// put result data into "obj"
					//console.log("testing"+obj.data);
					// put the data_from_file into #response
					$scope.alertsData = obj.data;
                	$scope.loadMore();
                    $scope.$apply();
					//exit;
					// call the function again, this time with the timestamp we just got from server.php
					//console.log(obj.data);
					//console.log(obj.timestamp+"coming here");
					//exit;
					getContent(obj.timestamp);
					
				}
			}
			);
			}
			$scope.alertsData = getContent();
            
            //poollingFactory.callFnOnInterval(function () {
                //getService.getAlerts().then(function (response) {
                    //$scope.sampleData = response.data;
                    //$scope.sampleDataCount = response.data.length;
                    //$scope.alertsData = response.data;
                    //$scope.loadMore();

                //});
                /*$scope.$watch('sampleData', function (newValue, oldValue) {
                    if (!angular.equals(newValue, oldValue)) {
                        $scope.alertsData = angular.copy($scope.sampleData);
                        //console.log($scope.sampleData.length);
                        $scope.loadMore();
                    }
                });
            });*/

            var counter = 0;
            $scope.loadMore = function () {
                $scope.limit += 5;
            };

            //$scope.loadMore();

            $scope.performSearch = function (searchText) {
                $scope.filtered = $filter('filter')($scope.items, $scope.search);
            }

            $scope.search = function (item) {
                if (!$scope.searchText)
                    return true;

                if (item.Title.indexOf($scope.searchText) != -1 || item.Title.indexOf($scope.searchText) != -1) {
                    return true;
                }
                return false;

            };


            $scope.$on('ngRepeatFinished', function (ngRepeatFinishedEvent) {
                $scope.loadedData = true;
            });



            $scope.mapview = false;
            $scope.fullContent = false;
            $scope.graphShow = true;
            $scope.contentShow = false;
            $scope.insightText = true;
            $scope.meritsText = false;
            //$scope.insightContent = false;

            $scope.graphCotainerShow = function (e) {
                e.preventDefault();
                $scope.graphShow = false;
                $scope.contentShow = true;
                $scope.insightText = false;
                $scope.topologyText = true;
                $scope.meritsText = false;

            };
            $scope.metricsShow = function (obj) {
                // e.preventDefault();



                $scope.graphShow = false;
                $scope.contentShow = false;
                $scope.insightText = false;
                $scope.topologyText = false;
                $scope.meritsText = true;
                $scope.metricShow = true;

                var myString = obj.timestamp;
                /*if (myString.charAt(myString.length - 1) == 'Z') {
                    myString = myString.substr(0, myString.length - 1);
                } */
                var startUnixValue = moment(myString).subtract(2, "minutes").unix() * 1000;
                var endUnixValue = moment(myString).add(2, "minutes").unix() * 1000


                getService.getSeries1(obj.entityname, startUnixValue, endUnixValue).then(function (response) {
                    $scope.SeriesData1 = response.points;
                    var dateArray = [];
                    var valueArray = [];
                    var date1Array = [];
                    var value1Array = [];
                    var data1 = [];
                    var data2 = [];

                    $.each($scope.SeriesData1, function (i, points) {
                        $.each(points, function (j, point) {
                            if (j == 0)
                                dateArray.push(point);
                            if (j == 1)
                                valueArray.push(point);
                        });
                    });
                    for (var i = 0; i < dateArray.length; i++) {

                        data1.push([dateArray[i], valueArray[i]]);
                    }
                    Highcharts.setOptions({
                        global: {
                            useUTC: false
                        }
                    });

                    var chart = $('#metricChart').highcharts({

                        chart: {
                            //renderTo: metricChart,
                            spacingTop: 3,
                            spacingRight: 0,
                            spacingBottom: 3,
                            spacingLeft: 0,
                            zoomType: 'x'
                        },

                        title: {
                            text: ''
                        },
                        subtitle: {
                            text: document.ontouchstart === undefined ?
                                'Click and drag in the plot area to zoom in' : 'Pinch the chart to zoom in'
                        },
                        xAxis: {
                            type: 'datetime',
                            title: {
                                text: ''
                            }
                        },
                        yAxis: {
                            title: {
                                text: 'Celsius'
                            }
                        },
                        credits: {
                            enabled: false
                        },
                        exporting: {
                            enabled: false
                        },
                        legend: {
                            enabled: true
                        },
                        plotOptions: {
                            area: {
                                fillColor: {
                                    linearGradient: {
                                        x1: 0,
                                        y1: 0,
                                        x2: 0,
                                        y2: 1
                                    },
                                    stops: [
                            [0, Highcharts.getOptions().colors[0]],
                            [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                        ]
                                },
                                marker: {
                                    radius: 2
                                },
                                lineWidth: 1,
                                states: {
                                    hover: {
                                        lineWidth: 1
                                    }
                                },
                                threshold: null
                            }
                        },

                        series: [{
                                type: 'spline',
                                name: obj.entityname,
                                data: data1,
                                "color": '#006000'
                            }
                            ]

                    });


                });

            }

            $scope.backtoInsight = function (e) {
                e.preventDefault();
                $scope.insightText = true;
                $scope.meritsText = false;
                $scope.graphShow = true;
                $scope.contentShow = false;
                $scope.topologyText = false;
                $scope.metricShow = false;
            };


            $scope.insightExpand = function (e) {
                e.preventDefault();

            };

            $scope.expand = function () {
                x = $window.innerWidth
                y = $window.innerHeight

                if ($scope.fullContent) {
                    $scope.fullContent = false;
                    setTimeout(function () {

                        var scrollCon = document.getElementsByClassName('custom-scrollbar')[0];
                        scrollCon.setAttribute("style", "height:400px");
                        //var topoview = document.getElementById('topoView');
                        //topoview.setAttribute("style", "height:400px");
                    }, 500)
                } else {
                    $scope.fullContent = true;
                    setTimeout(function () {
                        var offsetHeight = document.getElementById('tabheight').offsetHeight;
                        offsetHeight = parseInt(offsetHeight) - 110;
                        //console.log(offsetHeight);
                        var scrollCon = document.getElementsByClassName('custom-scrollbar')[0];
                        scrollCon.setAttribute("style", "height:" + offsetHeight + "px");
                        //var topoview = document.getElementById('topoView');
                        //topoview.setAttribute("style", "height:520px");
                    }, 500)
                }
            }

            $scope.backtoInsight = function (e) {
                e.preventDefault();
                $scope.insightText = true;
                $scope.meritsText = false;
                $scope.graphShow = true;
                $scope.contentShow = false;
                $scope.topologyText = false;
                $scope.metricShow = false;
            };

            $scope.insightExpand = function (e) {
                e.preventDefault();

            };

            $scope.locationDetails = [];
            getService.getAllCities().then(function (response) {
                angular.forEach(response, function (obj) {
                    $http.get('http://maps.google.com/maps/api/geocode/json?address=' + obj.CITY + '&sensor=false').success(function (mapData) {
                        var lat = mapData.results[0].geometry.location.lat;
                        var long = mapData.results[0].geometry.location.lng;
                        var formattedAddress = mapData.results[0].formatted_address
                        var name = obj.CITY
                        $scope.locationDetails.push({
                            "name": name,
                            "region": formattedAddress,
                            "latitude": lat,
                            "longitude": long
                        })

                    });
                });
            });
            var map = L.map('map', {
                    zoom: 11,
                    center: L.latLng(0, 0),
                    layers: L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png')
                }),
                popupTmpl =
                '<h5>{module_type}</h5>' +
                '{value} people<br />' +
                '{households} households<br />' +
                '<br /><a style="float:right" href="{url}">UNHCR page</a><br />' +
                '<br />';

            L.layerJSON({
                    url: "scripts/json/location.json",
                    propertyLoc: ['latitude', 'longitude'],
                    propertyTitle: 'name',
                    minShift: Infinity,
                    caching: true,
                    buildPopup: function (data) {
                        //return L.Util.template("<h3>{name}</h3> <p><a href='#/sensors'> No of Sensors <span class='badge'>{sensor}</span></a></p><p><a href='#/sensors'> No of Alerts <span class='badge'>{alert}</span></a></p> {data}", {
                        return L.Util.template("<h3>{name}</h3> <p><a href='#/sensors'> No of Sensors <span class='badge'>{sensor}</span></a></p><p></p> {data}", {

                            name: data.name,
                            sensor: data.sensors,
                            alert: data.alerts,
                            data: (function () {
                                var out = '';
                                //for(var i=0;i<data.population.length;i++)
                                //  out += L.Util.template(popupTmpl,data.population[i]);
                                return out;
                            }())
                        });
                    }
                })
                .on('dataloaded', function (e) {
                    setTimeout(function () {
                        map.fitBounds(e.target.getBounds()); //zoom to all data
                    }, 100);
                })
                .addTo(map);

            $scope.meesageheight = angular.element('.applicationContainer').height() - 70;

            $scope.equipments = ['Equipments TP 123456', 'Equipments TP 454542', 'Equipments TP 767532', 'Equipments TP 642311', 'Equipments TP 963233', 'Equipments TP 7531215', 'Equipments TP 233478', 'Equipments TP 5432672'];

            $scope.selectEquipemt;
            $scope.addNotifyEquipment = function (e) {
                e.preventDefault();
                $scope.equipmentBox = true;
            }

            $scope.equipmentAddDone = function (e) {
                e.preventDefault();
                $scope.equipmentBox = false;

                $scope.textvalue = angular.element('#getuserinputvalue').html();
                $scope.myHtmlVar = $scope.textvalue + " <span class='highlights' readonly>" + $scope.selectEquipemt + "</span>&nbsp;" + " ";
            }

            $scope.equipmentAddCancel = function (e) {
                e.preventDefault();
                $scope.equipmentBox = false;
            }

            $scope.materials = ['Material M2345', 'Material M76576', 'Material M97876', 'Material M45453', 'Material M7542', 'Material M42342', 'Material M23232', 'Material M97662'];

            $scope.addNotifyMaterial = function (e) {
                e.preventDefault();
                $scope.materialBox = true;
            }

            $scope.materialAddDone = function (e) {
                e.preventDefault();
                $scope.materialBox = false;

                $scope.textvalue = angular.element('#getuserinputvalue').html();
                $scope.myHtmlVar = $scope.textvalue + " <span class='highlights' readonly>" + $scope.selectmaterial + "</span>&nbsp;" + " ";

            }

            $scope.materialAddCancel = function (e) {
                e.preventDefault();
                $scope.materialBox = false;
            }

            $scope.workorders = ['WO75345', 'WO343423', 'WO43322', 'WO23232', 'WO66553', 'WO234343', 'WO12345', 'WO74232'];

            $scope.addNotifyWorkorder = function (e) {
                e.preventDefault();
                $scope.workorderBox = true;
            }

            $scope.workorderAddDone = function (e) {
                e.preventDefault();
                $scope.workorderBox = false;
                $scope.textvalue = angular.element('#getuserinputvalue').html();
                $scope.myHtmlVar = $scope.textvalue + " <span class='highlights' readonly>" + $scope.selectworkorder + "</span>&nbsp;" + " ";
            }

            $scope.workorderAddCancel = function (e) {
                e.preventDefault();
                $scope.workorderBox = false;
            }

            $scope.publishUserEntery = function () {

            }

            }]);

    angular.module('tracehive.controller.ModalController', [])
        .controller('ModalController', function ($scope, $rootScope, close) {

            $scope.close = function (result) {
                close(result, 500); // close, but give 500ms for bootstrap to animate
            };

        });


    angular.module('tracehive.controller.sensors', [])
        .controller('sensorsCtrl', ['$scope', '$rootScope', '$state', '$http', '$filter', 'PagerService', 'getService', function ($scope, $rootScope, $state, $http, $filter, PagerService, getService) {
            $scope.selectedCityMenu=$rootScope.selectedCityMenu;
            $scope.$on('locationName', function (event, args) {
                 $scope.selectedCityMenu = args.name;
                 console.log($scope.selectedCityMenu);
                 applyFilter();
                 });
                 
            getService.getAllCities().then(function (response) {
                $scope.locationList = response;
            });

            $scope.sensorslist = []
            getService.getSensorList().then(function (response) {
               // $scope.sensorslist = response;
				
				/***************************************
				 @created by: 5838
				 @Message:- get notification count of each sensor by host 
				 ************************************/
				angular.forEach(response, function (obj) {
					var seonsorName=obj.sensor_name;
					getService.getAlertsCount(seonsorName,'sensor').then(function (response) {
						obj["notificationCount"] = response.totalcount;
					});	
				$scope.sensorslist.push(obj);	
                })
						
				console.log($scope.sensorslist);
				
			   /*****end *****/
                applyFilter();
            });

            var filteredSensorslist = [], filteredSensorslistOrderBy = [],filteredUserByTopLocation = [];
            $scope.fpSensorslist = [];
            $scope.search = function ($event) {
                if ($event.keyCode === 27) {
                    $scope.searchText = '';
                }
                applyFilter();
				//console.log(applyFilter());
            }
			
			//console.log($scope.search);
			function applyFilter() {
                console.log($scope.selectedCityMenu);
                filteredSensorslist = $filter('filter')($scope.sensorslist, $scope.searchText);
                filteredUserByTopLocation = $filter('filter')(filteredSensorslist, ($scope.selectedCityMenu==='All Locations' ? undefined : {city: $scope.selectedCityMenu }));
                filteredSensorslistOrderBy = $filter('orderBy')(filteredSensorslist, 'last_updated_date', true);
                applyPagination();
            }

            function applyPagination() {
                $scope.pager = {};
                $scope.setPage = setPage;

                initPager();
                function initPager() {
                    $scope.setPage(1);
                }

                function setPage(page) {
                    if (page < 1 || page > $scope.pager.totalPages) {
                        return;
                    }
                    
                    $scope.pager = PagerService.GetPager(Object.keys(filteredUserByTopLocation).length, page, 12);
                    $scope.fpSensorslist = filteredUserByTopLocation.slice($scope.pager.startIndex, $scope.pager.endIndex + 1);
                }
            }

            $scope.onDrawTopology = function (sensorName) {
                var input = [];
                angular.forEach($scope.sensorslist, function (obj) {
                    if (obj.sensor_name == sensorName) {

                        if (obj.city !== null)
                            input.push({
                                'name': obj.city,
                                img: 'images/location.svg'
                            })
                        if (obj.address_line1 !== null) {
                            var cityAddress1Data = obj.city + '.' + obj.address_line1
                            input.push({
                                'name': cityAddress1Data,
                                img: 'images/building.svg'
                            })
                        }
                        if (obj.address_line2 !== null) {
                            var cityAddress2Data = obj.city + '.' + obj.address_line1 + '.' + obj.address_line2
                            input.push({
                                'name': cityAddress2Data,
                                img: 'images/room.svg'
                            })
                        }
                        if (obj.sensor_name !== null) {
                            var sensor = obj.city + '.' + obj.address_line1 + '.' + obj.address_line2 + '.' + obj.sensor_name;
                            input.push({
                                'name': sensor,
                                img: 'images/sensor.svg'
                            })
                        }
                        if (obj.machinery_code !== 'Not Available') {
                            var machinery = obj.city + '.' + obj.address_line1 + '.' + obj.address_line2 + '.' + obj.sensor_name + '.' + obj.machinery_code;
                            input.push({
                                'name': machinery,
                                img: 'images/machinery.svg'
                            })

                        }
                    }


                })


                input = input.reduce(function (field, e1) {
                    var matches = field.filter(function (e2) {
                        return e1.name == e2.name
                    });
                    if (matches.length == 0) {
                        field.push(e1);
                    }
                    return field;
                }, []);


                // Iterate over input array elements
                var desiredOutput = input.reduce(function createOuput(arr, obj) {
                    var names = obj.name.split('.');
                    // Copy input element object as not to modify original input
                    var newObj = Object.keys(obj).filter(function skipName(key) {
                        return key !== 'name';
                    }).reduce(function copyObject(tempObj, key) {
                        if (key.match(/url$/i)) {
                            tempObj[key] = obj[key];
                        } else {
                            tempObj[key] = obj[key];
                        }

                        return tempObj;
                    }, {
                        name: names[names.length - 1],
                        data: {}
                    });

                    // Build new output array with possible recursion
                    buildArray(arr, names, newObj);

                    return arr;
                }, []);

                //document.write('<pre>' + JSON.stringify(desiredOutput, null, 4) + '</pre>');

                // Helper function to search array element objects by name property
                function findIndexByName(arr, name) {
                    for (var i = 0, len = arr.length; i < len; i++) {
                        if (arr[i].name === name) {
                            return i;
                        }
                    }

                    return -1;
                }

                // Recursive function that builds output array
                function buildArray(arr, paths, obj) {
                    var path = paths.shift();
                    var index = findIndexByName(arr, path);

                    if (paths.length) {
                        if (index === -1) {
                            arr.push({
                                name: path,
                                children: []
                            });

                            index = arr.length - 1;
                        }

                        if (!Array.isArray(arr[index].children)) {
                            arr[index].children = [];
                        }

                        buildArray(arr[index].children, paths, obj);
                    } else {
                        arr.push(obj);
                    }

                    return arr;
                }

                var width = 600,
                    height = 350,
                    root;

                var force = d3.layout.force()
                    .linkDistance(80)
                    .charge(-300)
                    .gravity(.08)
                    .size([width, height]);
                //.on("tick", tick);
                $("#topoView").html('');
                var svg = d3.select("#topoView").append("svg")
                    .attr("width", width)
                    .attr("height", height);

                var link = svg.selectAll(".link"),
                    node = svg.selectAll(".node");


                var topo = {
                        "name": "",
                        "children": desiredOutput
                    }
                    //console.log(JSON.stringify(topo));

                root = topo
                update();
                //});

                function update() {
                    var nodes = flatten(root),
                        links = d3.layout.tree().links(nodes);

                    // Restart the force layout.
                    force
                        .nodes(nodes)
                        .links(links)
                        .start();

                    // Update links.
                    link = link.data(links, function (d) {
                        return d.target.id;
                    });

                    link.exit().remove();

                    link.enter().insert("line", ".node")
                        .attr("class", "link");

                    // Update nodes.
                    node = node.data(nodes, function (d) {
                        return d.id;
                    });

                    node.exit().remove();

                    var nodeEnter = node.enter().append("g")
                        .attr("class", "node")
                        .on("click", click)
                        .call(force.drag);

                    nodeEnter.append("circle")
                        .attr("r", function (d) {
                            return Math.sqrt(d.size) / 20 || 12;
                        });

                    nodeEnter.append("title")
                        .text(function (d) {
                            return d.name;
                        });



                    var images = nodeEnter.append("svg:image")
                        .attr("xlink:href", function (d) {
                            return d.img;
                        })
                        .attr("x", function (d) {
                            return -8;
                        })
                        .attr("y", function (d) {
                            return -8;
                        })
                        .attr("color", function (d) {
                            return d.color
                        })
                        .attr("height", 16)
                        .attr("width", 16);


                    nodeEnter.append("text")
                        .attr("dy", "2.5em")
                        .style("text-overflow", "ellipsis")
                        .attr("dx", "0.5em")
                        .text(function (d) {
                            return d.name;
                        });

                    node.select("circle")
                        .style("fill", color);
                }

                force.on("tick", function (e) {
                    var k = 6 * e.alpha;
                    d3.layout.tree().links(flatten(root)).forEach(function (d, i) {
                        d.source.y -= k;
                        d.target.y += k;
                    });
                    link.attr("x1", function (d) {
                            return d.source.x;
                        })
                        .attr("y1", function (d) {
                            return d.source.y;
                        })
                        .attr("x2", function (d) {
                            return d.target.x;
                        })
                        .attr("y2", function (d) {
                            return d.target.y;
                        });

                    node.attr("transform", function (d) {
                        return "translate(" + d.x + "," + d.y + ")";
                    });
                });

                function tick() {
                    link.attr("x1", function (d) {
                            return d.source.x;
                        })
                        .attr("y1", function (d) {
                            return d.source.y;
                        })
                        .attr("x2", function (d) {
                            return d.target.x;
                        })
                        .attr("y2", function (d) {
                            return d.target.y;
                        });

                    node.attr("transform", function (d) {
                        return "translate(" + d.x + "," + d.y + ")";
                    });
                }

                function color(d) {
                    return d._children ? "#3182bd" // collapsed package
                        : d.children ? "#c6dbef" // expanded package
                        : "#fd8d3c"; // leaf node
                }

                // Toggle children on click.
                function click(d) {
                    if (d3.event.defaultPrevented) return; // ignore drag
                    if (d.children) {
                        d._children = d.children;
                        d.children = null;
                    } else {
                        d.children = d._children;
                        d._children = null;
                    }
                    update();
                }

                // Returns a list of all nodes under the root.
                function flatten(root) {
                    var nodes = [],
                        i = 0;

                    function recurse(node) {
                        if (node.children) node.children.forEach(recurse);
                        if (!node.id) node.id = ++i;
                        nodes.push(node);
                    }

                    recurse(root);
                    return nodes;
                }

            }
            $scope.onGetSensorName = function (sensorName) {


                var startUnixValue = moment().subtract(2, "minutes").unix() * 1000;
                var endUnixValue = moment().unix() * 1000;



                getService.getSeries1(sensorName, startUnixValue, endUnixValue).then(function (response) {
                    $scope.SeriesData1 = response.points;
                    //console.log($scope.SeriesData1);


                    var dateArray = [];
                    var valueArray = [];
                    var data1 = [];

                    $.each($scope.SeriesData1, function (i, points) {
                        $.each(points, function (j, point) {
                            if (j == 0)
                                dateArray.push(point);
                            if (j == 1)
                                valueArray.push(point);
                        });
                    });
                    for (var i = 0; i < dateArray.length; i++) {

                        data1.push([dateArray[i], valueArray[i]]);
                    }
                    Highcharts.setOptions({
                        global: {
                            useUTC: false
                        }
                    });

                    //var chart = new Highcharts.Chart({
                    var chart = $('#metricChart').highcharts({


                        chart: {
                            //renderTo: metricChart,
                            spacingTop: 3,
                            spacingRight: 0,
                            spacingBottom: 3,
                            spacingLeft: 0,
                            zoomType: 'x'
                        },

                        title: {
                            text: ''
                        },
                        subtitle: {
                            text: document.ontouchstart === undefined ?
                                'Click and drag in the plot area to zoom in' : 'Pinch the chart to zoom in'
                        },
                        xAxis: {
                            type: 'datetime',
                            title: {
                                text: ''
                            }
                        },
                        yAxis: {
                            title: {
                                text: 'Celsius'
                            }
                        },
                        credits: {
                            enabled: false
                        },
                        exporting: {
                            enabled: false
                        },
                        legend: {
                            enabled: true
                        },
                        plotOptions: {
                            area: {
                                fillColor: {
                                    linearGradient: {
                                        x1: 0,
                                        y1: 0,
                                        x2: 0,
                                        y2: 1
                                    },
                                    stops: [
                            [0, Highcharts.getOptions().colors[0]],
                            [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                        ]
                                },
                                marker: {
                                    radius: 2
                                },
                                lineWidth: 1,
                                states: {
                                    hover: {
                                        lineWidth: 1
                                    }
                                },
                                threshold: null
                            }
                        },

                        series: [{
                                type: 'spline',
                                name: sensorName,
                                data: data1,
                                "color": '#006000'
                            }
                            ]

                    });

                });

            }

            //$scope.criticalAlerts =function(sensorName)
            //{

            $scope.humAlerts = [];
            $scope.alertsData = [];
            getService.getAlerts().then(function (response) {
                angular.forEach(response.data, function (obj) {
                    if (angular.lowercase(obj.entityname) == 'dht1_humidity') {
                        $scope.humAlerts.push(obj)
                    }
                })

            });
            $scope.tempAlerts = []
            getService.getAlerts().then(function (response) {
                angular.forEach(response.data, function (obj) {
                    if (angular.lowercase(obj.entityname) == 'dht1_temperature') {
                        $scope.tempAlerts.push(obj)
                    }
                })

            });

            $scope.deleteSen = function (sensorId) {

                angular.forEach($scope.sensorslist, function (value, index) {
                    if (value.sensor_id == sensorId) {
                        getService.deleteSensor(sensorId).then(function (response) {});
                        $scope.sensorslist.splice(index, 1);
                    }
                })
                $(".modal-backdrop").hide();
                applyFilter();
            }
            
            getService.getUserProfileById($rootScope.loggedInUserRole).then(function (response) {
                $scope.sensorCreate = response.sensorCreate;
				$scope.sensorRead = response.sensorRead;
				$scope.sensorUpdate = response.sensorUpdate;
				$scope.sensorDelete = response.sensorDelete;

            });
       

}])

    .controller('addSensorCtrl', ['$scope', '$rootScope', '$state', '$http', '$filter', 'getService', 'ngToast', function ($scope, $rootScope, $state, $http, $filter, getService, ngToast) {

        getService.getAllCities().then(function (response) {
            $scope.locationList = response;
        });
        $scope.events = [];
        $scope.eventsEmptyArr = false;
        $scope.locationSelectBtn = true;

        $scope.addSensorData = {};
        var date = new Date();
        var currentdate = $filter('date')(new Date(), 'yyyy-MM-dd HH:mm:ss');
        $scope.addSensorData.selectedMachinery = "null";
        $scope.menu = [];
        getService.getAllLocations().then(function (response) {
            $scope.menu = {
                title: 'Locations',
                id: 'menuId',
                items: response
            };
        })
        var editSenorId = $.urlParam('id');
        if (editSenorId) {
            getService.editSenser(editSenorId).then(function (response) {
                 console.log(JSON.stringify(response));

                $scope.getModelData(response[0].manufacturer_id);
                $scope.addSensorData.sensor_code = response[0].sensor_code;
                $scope.addSensorData.sensor_name = response[0].sensor_name;
                $scope.addSensorData.sensor_unique_id = response[0].sensor_id;
                $scope.addSensorData.selectedManufacturer = response[0].manufacturer_id;
                $scope.addSensorData.selectedModel = response[0].model_id;
                $scope.addSensorData.upc = response[0].UPC;
                $scope.addSensorData.selectedMachinery = response[0].machinery_id;
                $scope.addSensorData.value = response[0].value;
                $scope.addSensorData.description = response[0].description;
                $scope.addSensorData.selectedParameter = response[0].parameter_id;
                $scope.events[0] = response[0].country;
                $scope.events[1] = response[0].city;
                if (response[0].address_line1)
                    $scope.events[2] = response[0].address_line1;
                if (response[0].address_line2)
                    $scope.events[3] = response[0].address_line2;
                if (response[0].address_line3)
                    $scope.events[4] = response[0].address_line3;

            })

        }

        if (!editSenorId) {
            getService.getSenserCode().then(function (response) {
                $scope.addSensorData.sensor_code = "SEN" + response[0].Sensor_id;
            });
        }


        getService.getManufacturerList().then(function (response) {
            $scope.manufacturers = response;
        });

        getService.getMachineryList().then(function (response) {
            $scope.machinerys = response;
        });

        getService.getParameterList().then(function (response) {
            $scope.parameters = response;
            angular.forEach($scope.parameters, function (obj) {
                if (obj.Parameter_code == $scope.selectedParameterValue) {
                    $scope.addSensorData.selectedParameter = obj.Parameter_ID;
                }
            });
        });


        $scope.sensors = ['Sensor1', 'Sensor2', 'Sensor3', 'Sensor4', 'Sensor5', 'Sensor6', 'Sensor7', 'Sensor8'];

        $scope.getModelData = function (manufacturer) {
            var manufac_id = manufacturer;
            getService.getModelList(manufac_id).then(function (response) {
                $scope.models = response;
            });
        }

        $scope.getTargetValue = function (parameter) {
            getService.getParameterTargetValue(parameter).then(function (response) {
                // console.log(response);
                if (response.SUB_TYPE == "Integer" || "Float")
                    $scope.addSensorData.value = response.TARGET + " " + response.UNIT;
                else
                    $scope.addSensorData.value = response.TARGET;
            });
        }

        $scope.onCancelSensor = function () {
            $state.go('nav.sensors')
        }

        $scope.OnSubmitSensor = function () {

            if ($scope.events.length == 0)
                $scope.eventsEmptyArr = true;
            else
                $scope.eventsEmptyArr = false;

            angular.forEach($scope.parameters, function (obj) {

                if (obj.Parameter_ID == $scope.addSensorData.selectedParameter) {

                    $scope.selectedParameterValue = obj.PARAMETER_NAME;

                }
            });

            


            var data = {
                i_sensor_code: $scope.addSensorData.sensor_code,
                i_sensor_name: $scope.addSensorData.sensor_name,
                i_manufacturer_id: $scope.addSensorData.selectedManufacturer,
                i_model_id: $scope.addSensorData.selectedModel,
                i_upc: $scope.addSensorData.upc,
                i_country: $scope.events[0] || null,
                i_city: $scope.events[1] || null,
                i_addr1: $scope.events[2] || null,
                i_addr2: $scope.events[3] || null,
                i_addr3: $scope.events[4] || null,
                i_addr4: $scope.events[5] || null,
                i_machinary_id: $scope.addSensorData.selectedMachinery,
                i_parameter_id: $scope.addSensorData.selectedParameter,
                i_parameter_name: $scope.selectedParameterValue,
                i_value_range: $scope.addSensorData.value_range | '',
                i_value: $scope.addSensorData.value,
                i_value_measure: $scope.addSensorData.value_measure | '',
                i_description: $scope.addSensorData.description,
                i_last_updated_by: "admin",
                i_last_updated_date: currentdate,
                i_sensor_unique_id: $scope.addSensorData.sensor_unique_id||0,

            };



            if ($scope.addForm.$valid && !$scope.eventsEmptyArr) {
                getService.addSenser(data).then(function (response) {

                    $state.go('nav.sensors');
                    if (editSenorId) {
                        ngToast.create('Sensor Edited Successfully');
                    } else {
                        ngToast.create('New Sensor Added Successfully');
                    }
                });

            }
            var form = $scope.addForm;
            //Force the field validation
            angular.forEach(form, function (obj) {
                if (angular.isObject(obj) && angular.isDefined(obj.$setDirty)) {
                    obj.$setDirty();
                }
            })
        }



        $scope.select = function (selected) {
            $scope.selected = selected
        }
        $scope.locationSelect = function () {
            $scope.locationSelect = false;
        }
        $scope.rest = {};
        $scope.rest.options = {
            containersToPush: [$('#pushobj')],
            direction: 'ltr',
            collapsed: false,
            fullCollapse: true,

            onGroupItemClick: function (event, item) {
                $scope.eventsEmptyArr = false;
                if ($scope.events[$scope.events.length - 1] != item.name) {
                    $scope.events.push(item.name);
                } else {
                    event.preventDefault();
                }
            },
            onItemClick: function (event, item) {
                $scope.eventsEmptyArr = false;

                if ($scope.events[$scope.events.length - 1] != item.name) {
                    $scope.events.push(item.name);
                } else {
                    event.preventDefault();
                }
            },
            onBackItemClick: function (event, item) {
                return $scope.events.pop();
            }
        };
        $scope.locationDone = false;
        $scope.locationEditBtn = false;
        $scope.addmaterial = false;

        $scope.locationSelect = function () {
            $scope.location = true;
        }
        $scope.getlocation = '';
        $scope.locationSeleted = function (e) {
            e.preventDefault();
            $scope.locationDone = true;
            $scope.location = false;
            $scope.locationEditBtn = true;
            $scope.locationSelectBtn = false;

        }
        $scope.locationEdit = function (e) {
            e.preventDefault();
            $scope.rest.options.collapsed = true;
            $scope.location = true;
            $scope.locationDone = false;
        }

        $scope.locationCancel = function (e) {
            e.preventDefault();
            $scope.location = false;
        }



}])


    angular.module('tracehive.controller.parameter', [])
        .controller('parametersCtrl', ['$scope', '$rootScope', '$state', '$http', '$filter', 'PagerService', 'getService', function ($scope, $rootScope, $state, $http, $filter, PagerService, getService) {

            $scope.parameterAlertNotificationCount=0;
            getService.getAllCities().then(function (response) {
                $scope.locationList = response;
            });
			$scope.parameterslist =[];
            getService.getParameterLibrary().then(function (response) {
                //$scope.parameterslist = response;
				
				/***************************************
				 @created by: 5838
				 @Message:- get notification count of each parameter 
				 ************************************/
				angular.forEach(response, function (obj) {
					var metricTypeValue=obj.parameter_name;
					getService.getAlertsCount(metricTypeValue,'parameter').then(function (response) {
						obj["notificationCount"] = response.totalcount;
					});	
				$scope.parameterslist.push(obj);	
                })
						
				//console.log($scope.parameterslist);
				
			/*****end *****/
                applyFilter();
            });
            var filteredParameterslist = [], filteredMachinerieslistOrderBy = [];
            $scope.fpParameterslist = [];
            $scope.search = function ($event) {
                if ($event.keyCode === 27) {
                    $scope.searchText = '';
                }
                applyFilter();
            }

            function applyFilter() {
                filteredParameterslist = $filter('filter')($scope.parameterslist, $scope.searchText);
                filteredMachinerieslistOrderBy = $filter('orderBy')(filteredParameterslist, 'last_updated_date', true);
                applyPagination();
            }

            function applyPagination() {
                $scope.pager = {};
                $scope.setPage = setPage;

                initPager();
                function initPager() {
                    $scope.setPage(1);
                }

                function setPage(page) {
                    if (page < 1 || page > $scope.pager.totalPages) {
                        return;
                    }
                    $scope.pager = PagerService.GetPager(Object.keys(filteredMachinerieslistOrderBy).length, page, 12);
                    $scope.fpParameterslist = filteredMachinerieslistOrderBy.slice($scope.pager.startIndex, $scope.pager.endIndex + 1);
                }
            }
            
            $scope.deleteParameter = function (paramId) {
                angular.forEach($scope.parameterslist, function (value, index) {
                    if (value.PARAMETER_ID == paramId) {
                        getService.deleteParameter(paramId).then(function (response) {});
                        $scope.parameterslist.splice(index, 1);
                    }
                })
                $(".modal-backdrop").hide();
                applyFilter();
            }
            
             getService.getUserProfileById($rootScope.loggedInUserRole).then(function (response) {
                $scope.parameterCreate = response.parameterCreate;
				$scope.parameterRead = response.parameterRead;
				$scope.parameterUpdate = response.parameterUpdate;
				$scope.parameterDelete = response.parameterDelete;

            });
       


}])

    .controller('addParameterCtrl', ['$scope', '$rootScope', '$state', '$filter', '$http', 'getService', 'ngToast', function ($scope, $rootScope, $state, $filter, $http, getService, ngToast) {

        getService.getAllCities().then(function (response) {
            $scope.locationList = response;
        });

        $scope.setValueItems = [{
            value: ''
        }, {
            value: ''
        }];
        $scope.setTargetItems = [{
            label: 'Value1',
            value: ''
        }, {
            label: 'Value2',
            value: ''
        }];
        
        $scope.uomList=[];
        $scope.unitValues =[];
        
        getService.getUom().then(function(response){
             $scope.uomList = response;
             angular.forEach(response, function (obj) {
                        $scope.unitValues.push(obj.NAME);
             })

             //console.log(JSON.stringify($scope.uomList));
        })
        
        //console.log(JSON.stringify($scope.unitValues));
            

        var date = new Date();
        var currentdate = $filter('date')(new Date(), 'yyyy-MM-dd HH:mm:ss');

        $scope.paramerterTypes = ['In Process', 'Quality', 'Quantity', 'General'];
        $scope.paramerterSubTypes = ['String', 'Float', 'Integer', 'Boolean'];
        //$scope.unitValues = ['Deg C', 'PA', '%', 'RPM'];
        $scope.addParameterData = {};
        $scope.addParameterData.unit = $scope.unitValues[0];


        var parameter_id = $.urlParam('id');
        if (parameter_id) {
            getService.editParameter(parameter_id).then(function (response) {
                $scope.addParameterData.parameter_code = response[0].parameter_code;
                $scope.addParameterData.parameter_name = response[0].parameter_name;
                $scope.addParameterData.selectedType = response[0].type;
                $scope.addParameterData.selectedSubType = response[0].sub_type;
                $scope.addParameterData.description = response[0].description;
                //if(response[0].sub_type=="String")

                if (response[0].sub_type == "Integer" || response[0].sub_type == "Float") {
                    $scope.addParameterData.unit = response[0].unit;
                    $scope.addParameterData.min = response[0].min;
                    $scope.addParameterData.max = response[0].max;
                    $scope.addParameterData.target = response[0].target;
                } else if (response[0].sub_type == "Boolean") {
                    $scope.setTargetItems = [{
                        label: 'Value1',
                        value: response[0].attribute_value1
                    }, {
                        label: 'Value2',
                        value: response[0].attribute_value2
                    }];
                    angular.forEach($scope.setTargetItems, function (obj) {
                        if (response[0].target == obj.value)
                            $scope.addParameterData.selectedBooleanTargetValue = obj;
                    })

                } else if (response[0].sub_type == "String") {
                    $scope.setValueItems = [];
                    if (response[0].attribute_value1 != null) $scope.setValueItems.push({
                        value: response[0].attribute_value1
                    })
                    if (response[0].attribute_value2 != null) $scope.setValueItems.push({
                        value: response[0].attribute_value2
                    })
                    if (response[0].attribute_value3 != null) $scope.setValueItems.push({
                        value: response[0].attribute_value3
                    })
                    if (response[0].attribute_value4 != null) $scope.setValueItems.push({
                        value: response[0].attribute_value4
                    })
                    if (response[0].attribute_value5 != null) $scope.setValueItems.push({
                        value: response[0].attribute_value5
                    })
                    if (response[0].attribute_value6 != null) $scope.setValueItems.push({
                        value: response[0].attribute_value6
                    })
                    if (response[0].attribute_value7 != null) $scope.setValueItems.push({
                        value: response[0].attribute_value7
                    })
                    if (response[0].attribute_value8 != null) $scope.setValueItems.push({
                        value: response[0].attribute_value8
                    })
                    if (response[0].attribute_value9 != null) $scope.setValueItems.push({
                        value: response[0].attribute_value9
                    })
                    if (response[0].attribute_value10 != null) $scope.setValueItems.push({
                        value: response[0].attribute_value10
                    })
                    if (response[0].attribute_value11 != null) $scope.setValueItems.push({
                        value: response[0].attribute_value11
                    })
                    if (response[0].attribute_value12 != null) $scope.setValueItems.push({
                        value: response[0].attribute_value12
                    })
                    if (response[0].attribute_value13 != null) $scope.setValueItems.push({
                        value: response[0].attribute_value13
                    })
                    if (response[0].attribute_value14 != null) $scope.setValueItems.push({
                        value: response[0].attribute_value14
                    })
                    if (response[0].attribute_value15 != null) $scope.setValueItems.push({
                        value: response[0].attribute_value15
                    })
                    if (response[0].attribute_value16 != null) $scope.setValueItems.push({
                        value: response[0].attribute_value16
                    })
                    if (response[0].attribute_value17 != null) $scope.setValueItems.push({
                        value: response[0].attribute_value17
                    })
                    if (response[0].attribute_value18 != null) $scope.setValueItems.push({
                        value: response[0].attribute_value18
                    })
                    if (response[0].attribute_value19 != null) $scope.setValueItems.push({
                        value: response[0].attribute_value19
                    })
                    if (response[0].attribute_value20 != null) $scope.setValueItems.push({
                        value: response[0].attribute_value20
                    })
                    $scope.addParameterData.selectedStringTargetValue = response[0].target;
                }
            });
        }

        if (!parameter_id) {
            getService.getParameterCode().then(function (response) {
                $scope.addParameterData.parameter_code = "PARAM" + response[0].PARAMETER_ID;
            });
        }



        $scope.addValueBox = function () {
            $scope.setValueItems.push({
                value: ''
            });

        };

        $scope.removeItem = function (index) {
            $scope.setValueItems.splice(index, 1);
        };

        $scope.getStringValues = function ($value) {
            $scope.setValueItems.push({
                value: $scope.value
            });
        };
        $scope.onSubmitAddParameter = function (obj) {
            var form = $scope.addForm;
            //Force the field validation
            angular.forEach(form, function (obj) {
                if (angular.isObject(obj) && angular.isDefined(obj.$setDirty))

                {

                    obj.$setDirty();
                }
            })
            var date = new Date();
            var currentdate = $filter('date')(new Date(), 'dd/MM/yyyy');

            if ($scope.addForm.$valid) {


                if ($scope.addParameterData.selectedSubType == "String") {
                    var data = {
                        "i_parameter_code": $scope.addParameterData.parameter_code,
                        "i_Name": $scope.addParameterData.parameter_name,
                        "i_Type": $scope.addParameterData.selectedType,
                        "i_SUB_TYPE": $scope.addParameterData.selectedSubType,
                        "i_UNIT": '',
                        "i_MIN": '',
                        "i_MAX": '',
                        "i_TARGET": $scope.addParameterData.selectedStringTargetValue.value,
                        "i_LAST_UPDATED_BY": "admin",
                        "i_LAST_UPDATED_DATE": currentdate,
                        "i_SENSOR_CODE": "",
                        "i_THRESHOLD": "THR101SDSDS",
                        "i_DESCRIPTION": $scope.addParameterData.description
                    }

                    for (var i = 1; i <= 20; i++) {
                        var key1 = "i_DEFINITION_ATTRIBUTE" + i;

                        $scope.setValueItems.forEach(function (valueData, index) {
                            if (index + 1 == i) {
                                data[key1] = valueData.value;

                            } else if (i > index + 1) {
                                data[key1] = null;

                            }
                        })



                    }

                } else if ($scope.addParameterData.selectedSubType == "Boolean") {
                    var data = {
                        "i_parameter_code": $scope.addParameterData.parameter_code,
                        "i_Name": $scope.addParameterData.parameter_name,
                        "i_Type": $scope.addParameterData.selectedType,
                        "i_SUB_TYPE": $scope.addParameterData.selectedSubType,
                        "i_UNIT": '',
                        "i_MIN": '',
                        "i_MAX": '',
                        "i_TARGET": $scope.addParameterData.selectedBooleanTargetValue.value,
                        "i_DEFINITION_ATTRIBUTE1": $scope.setTargetItems[0].value,
                        "i_DEFINITION_ATTRIBUTE2": $scope.setTargetItems[1].value,
                        "i_DEFINITION_ATTRIBUTE3": '',
                        "i_DEFINITION_ATTRIBUTE4": '',
                        "i_DEFINITION_ATTRIBUTE5": '',
                        "i_DEFINITION_ATTRIBUTE6": '',
                        "i_DEFINITION_ATTRIBUTE7": '',
                        "i_DEFINITION_ATTRIBUTE8": '',
                        "i_DEFINITION_ATTRIBUTE9": '',
                        "i_DEFINITION_ATTRIBUTE10": '',
                        "i_DEFINITION_ATTRIBUTE11": '',
                        "i_DEFINITION_ATTRIBUTE12": '',
                        "i_DEFINITION_ATTRIBUTE13": '',
                        "i_DEFINITION_ATTRIBUTE14": '',
                        "i_DEFINITION_ATTRIBUTE15": '',
                        "i_DEFINITION_ATTRIBUTE16": '',
                        "i_DEFINITION_ATTRIBUTE17": '',
                        "i_DEFINITION_ATTRIBUTE18": '',
                        "i_DEFINITION_ATTRIBUTE19": '',
                        "i_DEFINITION_ATTRIBUTE20": '',
                        "i_LAST_UPDATED_BY": "admin",
                        "i_LAST_UPDATED_DATE": currentdate,
                        "i_SENSOR_CODE": "",
                        "i_THRESHOLD": "THR101SDSDS",
                        "i_DESCRIPTION": $scope.addParameterData.description
                    }
                } else if ($scope.addParameterData.selectedSubType == "Integer" || $scope.addParameterData.selectedSubType == "Float") {
                    var data = {
                        "i_parameter_code": $scope.addParameterData.parameter_code,
                        "i_Name": $scope.addParameterData.parameter_name,
                        "i_Type": $scope.addParameterData.selectedType,
                        "i_SUB_TYPE": $scope.addParameterData.selectedSubType,
                        "i_UNIT": $scope.addParameterData.unit,
                        "i_MIN": $scope.addParameterData.min,
                        "i_MAX": $scope.addParameterData.max,
                        "i_TARGET": $scope.addParameterData.target,
                        "i_DEFINITION_ATTRIBUTE1": '',
                        "i_DEFINITION_ATTRIBUTE2": '',
                        "i_DEFINITION_ATTRIBUTE3": '',
                        "i_DEFINITION_ATTRIBUTE4": '',
                        "i_DEFINITION_ATTRIBUTE5": '',
                        "i_DEFINITION_ATTRIBUTE6": '',
                        "i_DEFINITION_ATTRIBUTE7": '',
                        "i_DEFINITION_ATTRIBUTE8": '',
                        "i_DEFINITION_ATTRIBUTE9": '',
                        "i_DEFINITION_ATTRIBUTE10": '',
                        "i_DEFINITION_ATTRIBUTE11": '',
                        "i_DEFINITION_ATTRIBUTE12": '',
                        "i_DEFINITION_ATTRIBUTE13": '',
                        "i_DEFINITION_ATTRIBUTE14": '',
                        "i_DEFINITION_ATTRIBUTE15": '',
                        "i_DEFINITION_ATTRIBUTE16": '',
                        "i_DEFINITION_ATTRIBUTE17": '',
                        "i_DEFINITION_ATTRIBUTE18": '',
                        "i_DEFINITION_ATTRIBUTE19": '',
                        "i_DEFINITION_ATTRIBUTE20": '',
                        "i_LAST_UPDATED_BY": "admin",
                        "i_LAST_UPDATED_DATE": currentdate,
                        "i_SENSOR_CODE": "",
                        "i_THRESHOLD": "THR101SDSDS",
                        "i_DESCRIPTION": $scope.addParameterData.description
                    }
                }


                var config = {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
                    }
                }

                //console.log(JSON.stringify(data));

                getService.addParameter(data).then(function (response) {

                    $state.go('nav.parameters');
                    if (parameter_id) {
                        ngToast.create('Parameter Edited Successfully');
                    } else {
                        ngToast.create('New Parameter Added Successfully');
                    }
                });

            }
        }

}]);


    angular.module('tracehive.controller.machinery', [])
        .controller('machineryCtrl', ['$scope', '$rootScope', '$state', '$http', '$filter', 'PagerService', 'getService', function ($scope, $rootScope, $state, $http, $filter, PagerService, getService) {
           
		$scope.selectedCityMenu=$rootScope.selectedCityMenu;
            $scope.$on('locationName', function (event, args) {
                 $scope.selectedCityMenu = args.name;
                 console.log($scope.selectedCityMenu);
                 applyFilter();
                 });

		   getService.getAllCities().then(function (response) {
                $scope.locationList = response;
            });

            getService.getMachinaryLibrary().then(function (response) {
                $scope.machinerieslist = response;
                //console.log(JSON.stringify($scope.machinerieslist));
                applyFilter();
            });
            
            var filteredMachinerieslist = [], filteredMachinerieslistOrderBy = [],filteredUserByTopLocation=[];
            $scope.fpMachinerieslist = [];
            $scope.search = function ($event) {
                if ($event.keyCode === 27) {
                    $scope.searchText = '';
                }
                applyFilter();
            }

            function applyFilter() {
                filteredMachinerieslist = $filter('filter')($scope.machinerieslist, $scope.searchText);
				console.log(JSON.stringify(filteredMachinerieslist));
				filteredUserByTopLocation = $filter('filter')(filteredMachinerieslist, ($scope.selectedCityMenu==='All Locations' ? undefined : {city: $scope.selectedCityMenu }));
                filteredMachinerieslistOrderBy = $filter('orderBy')(filteredUserByTopLocation, 'last_updated_date', true);
                applyPagination();
            }

            function applyPagination() {
                $scope.pager = {};
                $scope.setPage = setPage;

                initPager();
                function initPager() {
                    $scope.setPage(1);
                }

                function setPage(page) {
                    if (page < 1 || page > $scope.pager.totalPages) {
                        return;
                    }
                    $scope.pager = PagerService.GetPager(Object.keys(filteredMachinerieslistOrderBy).length, page);
                    $scope.fpMachinerieslist = filteredMachinerieslistOrderBy.slice($scope.pager.startIndex, $scope.pager.endIndex + 1);
                }
            }
            
            $scope.deleteMachinery = function (machineryID) {
                angular.forEach($scope.machinerieslist, function (value, index) {
                    if (value.MACHINERY_ID == machineryID) {
                        getService.deleteMachinery(machineryID).then(function (response) {});
                        $scope.machinerieslist.splice(index, 1);
                    }
                })
                $(".modal-backdrop").hide();
                applyFilter();
            }

            $scope.viewQualificationData = {};
            $scope.viewLogActivityData ={};

            
            $scope.viewData = function (machinery_Id) {
                
				//console.log(machinery_Id);
				
                getService.getLogActivityLibrary(machinery_Id).then(function (data) {
				
				//console.log(data);
				
                if (data.status == "success") {
                    $scope.viewLogActivityData.acivityid = data.response[0].ACTIVITY_ID;
                    $scope.viewLogActivityData.activityType = data.response[0].TYPE_OF_ACTIVITY;
                    $scope.viewLogActivityData.performedBy = data.response[0].PERFORMED_BY;
                    $scope.viewLogActivityData.checkedBy = data.response[0].CHECKED_BY;
                    $scope.viewLogActivityData.cleanedAfterWorkOrderId = data.response[0].CLEANING_UP_AFTER_WO;
                    $scope.viewLogActivityData.startDatetime = data.response[0].START_DATE;
                    $scope.viewLogActivityData.endDatetime = data.response[0].END_DATE;
                    $scope.viewLogActivityData.boiledOut = data.response[0].BOILED_OUT;
                    $scope.viewLogActivityData.rinsed = data.response[0].RINSED;
                    $scope.viewLogActivityData.availablityStatus = data.response[0].AVAILABLITY_STATUS;
                    $scope.viewLogActivityData.comments = data.response[0].COMMENTS;
                    
                    getService.getLogActivityMaterialById(data.response[0].ACTIVITY_ID).then(function(materialData){
                        $scope.viewLogActivityData.material1  = materialData.response[0].MATERIAL_NAME;
                        $scope.viewLogActivityData.qty1 = materialData.response[0].QUANTITY;
                        $scope.viewLogActivityData.actualyield1 = materialData.response[0].UOM;
                        $scope.viewLogActivityData.material2 = materialData.response[1].MATERIAL_NAME;
                        $scope.viewLogActivityData.qty2 = materialData.response[1].QUANTITY;
                        $scope.viewLogActivityData.actualyield2 = materialData.response[1].UOM;
                    });
                    
                    
                } else {
                    $scope.viewLogActivityData.acivityid = null; //equipmentID;
                   
                }
                
                });

                getService.getQualificationDetailsLibrary(machinery_Id).then(function (data) {
                    if (data.status == "success") {
                        console.log(JSON.stringify(data.response));
                        $scope.viewQualificationData.qualificationID = data.response[0].QUALIFICATION_ID;
                        $scope.viewQualificationData.eqipment_Name = data.response[0].EQUIPMENT_NAME;
                        $scope.viewQualificationData.selectedQualificationType = data.response[0].TYPE_OF_QUALIFACATION;
                        $scope.viewQualificationData.performedBy = data.response[0].PERFORMED_BY;
                        $scope.viewQualificationData.dateRangeStart = data.response[0].START_DATE;
                        $scope.viewQualificationData.dateRangeEnd = data.response[0].END_DATE;
                        $scope.viewQualificationData.containinventory = data.response[0].CAN_CONTAIN_INVENTORY;
                        $scope.viewQualificationData.qualifiedStatus = data.response[0].QUALIFIED_STATUS;
                        $scope.viewQualificationData.description = data.response[0].DESCRIPTION;
                        
                    } else {
                        $scope.viewQualificationData.qualificationID = null;
                    }

                });

            }



            jQuery(function () {
                jQuery('#myTab a:last').tab('show')
            });
            
             getService.getUserProfileById($rootScope.loggedInUserRole).then(function (response) {
                $scope.machineryCreate = response.machineryCreate;
				$scope.machineryRead = response.machineryRead;
				$scope.machineryUpdate = response.machineryUpdate;
				$scope.machineryDelete = response.machineryDelete;
                $scope.logactivityCreate = response.logactivityCreate;
                $scope.logactivityRead = response.logactivityRead;
                $scope.logactivityUpdate = response.logactivityUpdate;
                $scope.logactivityDelete = response.logactivityDelete;
                $scope.qualificationCreate = response.qualificationCreate;
                $scope.qualificationRead = response.qualificationRead;
                $scope.qualificationUpdate = response.qualificationUpdate;
                $scope.qualificationDelete = response.qualificationDelete;
                 
            });
       
}])

    .controller('addmachineryCtrl', ['$scope', '$rootScope', '$state', '$q', '$timeout', '$filter', '$http', 'getService', 'ngToast', function ($scope, $rootScope, $state, $q, $timeout, $filter, $http, getService, ngToast) {
        getService.getAllCities().then(function (response) {
            $scope.locationList = response;
        });

        $scope.image = null;
        $scope.imageFileName = '';
        $scope.uploadme = {};
        $scope.uploadme.src = '';

        var date = new Date();
        var currentdate = $filter('date')(new Date(), 'yyyy-MM-dd HH:mm:ss');
        $scope.events = [];
        $scope.eventsEmptyArr = false;
        $scope.locationSelectBtn = true;


        $scope.addMachineryData = {}
        $scope.showRequiredselectedSensorName = false;


        var machinery_id = $.urlParam('id');
        getService.getSensorNameList().then(function (response) {
            $scope.sensorNames = response;
        });


        if (machinery_id) {

            getService.editMachinery(machinery_id).then(function (response) {
                console.log(JSON.stringify(response));
                var sensorString = null;
                sensorString = response[0].SENSOR_CODE;
                $scope.selectedSensorsData = [];
                $scope.selectedSensorsData = sensorString.split(",");
                $scope.selectedSensorsArray = [];

                angular.forEach($scope.sensorNames, function (obj) {
                    angular.forEach($scope.selectedSensorsData, function (senData) {
                        if (obj.sensor_name == senData) {
                            $scope.selectedSensorsArray.push(obj.sensor_id)
                        }
                    })
                })
                $scope.addMachineryData.machinery_id = response[0].MACHINERY_ID;
                $scope.addMachineryData.selectedSensors = $scope.selectedSensorsArray;
                //$scope.addMachineryData.machinery_code = response[0].MACHINERY_CODE;
                $scope.addMachineryData.machinery_name = response[0].name;
                $scope.addMachineryData.description = response[0].description;
                $scope.uploadme.src = response[0].image;
                $scope.events[0] = response[0].country;
                $scope.events[1] = response[0].city;
                if (response[0].address_line1)
                    $scope.events[2] = response[0].address_line1;
                if (response[0].address_line2)
                    $scope.events[3] = response[0].address_line2;
                if (response[0].address_line3)
                    $scope.events[4] = response[0].address_line3;

            });

        }
        $scope.sensorNames = [];

        
        $scope.menu = [];
        getService.getAllLocations().then(function (response) {
            $scope.menu = {
                title: 'Locations',
                id: 'menuId',
                items: response
            };
        });

        $scope.select = function (selected) {
            $scope.selected = selected
        }
        $scope.locationSelect = function () {
            $scope.locationSelect = false;
        }
        $scope.rest = {};
        $scope.rest.options = {
            containersToPush: [$('#pushobj')],
            direction: 'ltr',
            collapsed: false,
            fullCollapse: true,

            onGroupItemClick: function (event, item) {
                $scope.eventsEmptyArr = false;
                if ($scope.events[$scope.events.length - 1] != item.name) {
                    $scope.events.push(item.name);
                } else {
                    event.preventDefault();
                }
            },
            onItemClick: function (event, item) {
                $scope.eventsEmptyArr = false;

                if ($scope.events[$scope.events.length - 1] != item.name) {
                    $scope.events.push(item.name);
                } else {
                    event.preventDefault();
                }
            },
            onBackItemClick: function (event, item) {
                return $scope.events.pop();
            }
        };
        $scope.locationDone = false;
        $scope.locationEditBtn = false;
        $scope.addmaterial = false;

        $scope.locationSelect = function () {
            $scope.location = true;
        }
        $scope.getlocation = '';
        $scope.locationSeleted = function (e) {
            e.preventDefault();
            $scope.locationDone = true;
            $scope.location = false;
            $scope.locationEditBtn = true;
            $scope.locationSelectBtn = false;

        }
        $scope.locationEdit = function (e) {
            e.preventDefault();
            $scope.rest.options.collapsed = true;
            $scope.location = true;
            $scope.locationDone = false;
        }

        $scope.locationCancel = function (e) {
            e.preventDefault();
            $scope.location = false;
        }

        $scope.parameterList = ['Temperature', 'Pressure', 'Humidity', 'Paddle Speed'];
        $scope.onSaveAddMachinery = function (obj) {
            
            if ($scope.events.length == 0)
                $scope.eventsEmptyArr = true;
            else
                $scope.eventsEmptyArr = false;

            
            var form = $scope.addForm;
            //Force the field validation
            angular.forEach(form, function (obj) {
                if (angular.isObject(obj) && angular.isDefined(obj.$setDirty))

                {

                    obj.$setDirty();
                }
            })
            if ($scope.addForm.$valid && !$scope.eventsEmptyArr) {
                $scope.selectedSensorName = [];

                angular.forEach($scope.sensorNames, function (obj) {
                    angular.forEach($scope.addMachineryData.selectedSensors, function (senData) {
                        if (obj.sensor_id == senData)
                            $scope.selectedSensorName.push(obj.sensor_name)
                    })

                })

                var data = {
                    "i_machinery_id": $scope.addMachineryData.machinery_id||null,
					"i_machinery_code": $scope.addMachineryData.machinery_id||null,
                    "i_name": $scope.addMachineryData.machinery_name,
                    "i_country": $scope.events[0] || null,
                    "i_city": $scope.events[1] || null,
                    "i_addr1": $scope.events[2] || null,
                    "i_addr2": $scope.events[3] || null,
                    "i_addr3": $scope.events[4] || null,
                    "i_addr4": $scope.events[5] || null,
                    "i_sensor_code": $scope.selectedSensorName.toString(),
                    "i_description": $scope.addMachineryData.description||null,
                    "i_last_updated_by": "admin",
                    "i_last_updated_date": currentdate,
                    "i_last_cleaned": currentdate,
                    "i_last_calibrated": currentdate,
                    "i_image": $scope.uploadme.src
                }

                var config = {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
                    }
                }
                getService.addMachinery(data).then(function (response) {

                    $state.go('nav.machinery');
                    if (machinery_id) {
                        ngToast.create('Machinery Edited Successfully');
                    } else {
                        ngToast.create('New Machinery Added Successfully');
                    }

                });
            }
        }


}]);

    angular.module('tracehive.controller.inventory', [])
        .controller('invetoryCtrl', ['$scope', '$rootScope', '$state', '$filter', 'PagerService', 'getService', function ($scope, $rootScope, $state, $filter, PagerService, getService) {

           /*Added by 5838*/
			$scope.selectedCityMenu=$rootScope.selectedCityMenu;
            $scope.$on('locationName', function (event, args) {
                 $scope.selectedCityMenu = args.name;
                 console.log($scope.selectedCityMenu);
                 applyFilter();
                 });
			

		   
            $scope.samplesList =[];
            
            $scope.parametersList=[];
            $scope.onGetParamtersList = function(sampleId)
            {
                $scope.parametersList=[];
                getService.getInventoryParameterSamplesById(sampleId).then(function(response){
                $scope.parametersList = response;
                   // console.log(JSON.stringify(response));
            })
            
            }
            
            $scope.selectedTab=1;

            getService.getAllCities().then(function (response) {
                $scope.locationList = response;
            });
            $scope.inventorieslist=[];
            $scope.selectedCategoryCount= 0;
            getService.getAllinventory().then(function (response) {
                $scope.inventorieslist = response;
                console.log(JSON.stringify(response));
                //console.log(response.length)
                $scope.selectedCategoryCount = response.length;
				applyFilter();
            });
            
            $scope.selectedCategoryInfo="All Inventory";
            $scope.dropboxitemselected = function (item, count) {
 
                $scope.selectedCategoryInfo = item;
                $scope.selectedCategoryCount = count;
                
                applyFilter();
            }
			
			/*******************************************************
				@Created by: 5838
				@Message :- getting category count from inventory table 
				*******************************************************/
				$scope.inventoryCategoryListcount =[];
				getService.getInventoryCategoryCount().then(function (response) {
					
					$scope.inventoryCategoryListcount = response;
					
				});
			
            var filteredInventorieslist = [], filteredInventoriesByCategory = [] , filteredUserByTopLocation =[];
            $scope.fpInventorieslist = [];
            $scope.search = function ($event) {
                if ($event.keyCode === 27) {
                    $scope.searchText = '';
                }
                applyFilter();
            }

            function applyFilter() {
                filteredInventorieslist = $filter('filter')($scope.inventorieslist, $scope.searchText);
                filteredInventoriesByCategory = $filter('filter')(filteredInventorieslist, ($scope.selectedCategoryInfo==='All Inventory' ? undefined : { CATEGORY: $scope.selectedCategoryInfo }));
				filteredUserByTopLocation = $filter('filter')(filteredInventoriesByCategory, ($scope.selectedCityMenu==='All Locations' ? undefined : {CITY: $scope.selectedCityMenu }));
                applyPagination();
            }


            function applyPagination() {
                $scope.pager = {};
                $scope.setPage = setPage;

                initPager();
                function initPager() {
                    $scope.setPage(1);
                }

                function setPage(page) {
                    if (page < 1 || page > $scope.pager.totalPages) {
                        return;
                    }
					
                    $scope.pager = PagerService.GetPager(Object.keys(filteredUserByTopLocation).length, page, 12);
                    $scope.fpInventorieslist = filteredUserByTopLocation.slice($scope.pager.startIndex, $scope.pager.endIndex + 1);
                }
            }
            
            // Close the dropdown menu if the user clicks outside of it
            window.onclick = function (event) {
                if (!event.target.matches('.invetoryddContent, .inventoryTitle')) {

                    var dropdowns = document.getElementsByClassName("inventoryMenu");
                    var i;
                    for (i = 0; i < dropdowns.length; i++) {
                        var openDropdown = dropdowns[i];
                        if (openDropdown.classList.contains('show')) {
                            openDropdown.classList.remove('show');
                        }
                    }
                }
            };
            $scope.deleteInvetory = function (inventoryID) {
                angular.forEach($scope.inventorieslist, function (value, index) {
                    if (value.INVENTORY_ID == inventoryID) {
                        getService.deleteInventory(inventoryID).then(function (response) {});
                        $scope.inventorieslist.splice(index, 1);
                    }
                })
                $(".modal-backdrop").hide();
                applyFilter();
            }
            
            jQuery(function () {
                jQuery('#myTab a:last').tab('show')
            });
            $scope.ViewInventory ={}
           $scope.isActive3 = false;
            $scope.viewinventory = function (index) {
                getService.getInventorySamplesById(index).then(function(response){
                $scope.samplesList = response;
                console.log(JSON.stringify(response));
            })
            
                
                angular.forEach($scope.inventorieslist, function (obj) {
                    if(obj.INVENTORY_ID == index)
                      $scope.ViewInventory = obj;  
                });
                $scope.isActive3 = !$scope.isActive3;
            };
            
            $scope.selectedSampleID='';
            
            $scope.onDeleteSample = function(sampleID){
               $scope.selectedSampleID = sampleID;
            }
            
            
            $scope.deleteInventorySample = function () {
                angular.forEach($scope.samplesList, function (value, index) {
                    if (value.SAMPLE_ID == $scope.selectedSampleID) {
                        getService.deleteInvSampleById($scope.selectedSampleID).then(function (response) {});
                        $scope.samplesList.splice(index, 1);
                    }
                })
                $(".modal-backdrop").hide()
             }
            
            
             getService.getUserProfileById($rootScope.loggedInUserRole).then(function (response) {
                $scope.inventoryCreate = response.inventoryCreate;
				$scope.inventoryRead = response.inventoryRead;
				$scope.inventoryUpdate = response.inventoryUpdate;
				$scope.inventoryDelete = response.inventoryDelete;
                $scope.invqualityCreate = response.invqualityCreate;
                $scope.invqualityRead = response.invqualityRead;
                $scope.invqualityUpdate = response.invqualityUpdate;
                $scope.inventoryDelete = response.inventoryDelete;

            });
       

}])

    .controller('addinvetoryCtrl', ['$scope', '$rootScope', '$state', '$filter', 'getService', function ($scope, $rootScope, $state, $filter, getService) {
        getService.getAllCities().then(function (response) {
            $scope.locationList = response;
        });

        var date = new Date();
        var currentdate = $filter('date')(new Date(), 'yyyy-MM-dd HH:mm:ss');


        $scope.events = [];
        $scope.eventsEmptyArr = false;
        $scope.locationSelectBtn = true;

        $scope.categoryTypes = ['Supplements', 'Diet & Energy Dring', 'Personal Care', 'Vitamin Mixtures', 'Raw Materials', 'Excipients', 'Mixtures', 'Intermediates', 'API', 'Final Product']
        $scope.addInventoryData = {};
        $scope.machineries = [];
        getService.getMachineryList().then(function (response) {
            $scope.machineries = response
        });
        $scope.sensors = [];
        $scope.parameters=[];
        
        getService.getParameterLibrary().then(function(response){
            $scope.parameters = response;
            //console.log(JSON.stringify(response));
        })
        

        getService.getSensorList().then(function (response) {
            $scope.sensors = response;
        });
        $scope.materials = [];
        getService.getMaterialList().then(function (response) {
            angular.forEach(response, function (obj) {
                $scope.materials.push(obj.MATERIAL_NAME);
            });
        });
        $scope.suppliers = [];
        getService.getAllSupplier().then(function (response) {
            angular.forEach(response, function (obj) {
                $scope.suppliers.push(obj.SUPPLIER_NAME);
            });
        });


        var inventory_id = $.urlParam('id');
        $scope.uploadme = {};
        $scope.uploadme.src = '';

        $scope.getParameterValue = function (sensorid) {
            angular.forEach($scope.sensors, function (obj) {
                if (obj.sensor_id == sensorid){
                    $scope.addInventoryData.parameter_name = obj.parameter_name;
                }
                    
            });
        }
        if (inventory_id) {

            getService.editInventory(inventory_id).then(function (response) {
				console.log(response);
                $scope.addInventoryData.inventory_code = response[0].INVENTORY_CODE;
                $scope.addInventoryData.inventory_name = response[0].INVENTORY_NAME;
                $scope.addInventoryData.category = response[0].CATEGORY;
                $scope.addInventoryData.item = response[0].ITEM;
                $scope.addInventoryData.machinery_id = response[0].MACHINERY_ID;
                $scope.addInventoryData.sensor_id = response[0].SENSOR_ID;
                $scope.addInventoryData.parameter_id = response[0].PARAMETER_ID;
                $scope.addInventoryData.goal = response[0].GOAL;
                $scope.addInventoryData.stock = response[0].STOCK;
                $scope.addInventoryData.supplierName = response[0].SUPPLIER_NAME;
                $scope.addInventoryData.description = response[0].DESCRIPTION;
                $scope.uploadme.src = response[0].IMAGE;
                $scope.events[0] = response[0].COUNTRY;
                $scope.events[1] = response[0].CITY;
                if (response[0].ADDRESS_LINE1)
                    $scope.events[2] = response[0].ADDRESS_LINE1;
                if (response[0].ADDRESS_LINE2)
                    $scope.events[3] = response[0].ADDRESS_LINE2;
                if (response[0].ADDRESS_LINE3)
                    $scope.events[4] = response[0].ADDRESS_LINE3;
                angular.forEach($scope.parameters, function (obj) {
                //console.log(JSON.stringify(obj));
                if (obj.PARAMETER_ID == response[0].PARAMETER_ID){
                    $scope.addInventoryData.parameter_name = obj.parameter_name;
                }
            });
            
                
            });

        }
        if (!inventory_id) {
            getService.getinventoryCode().then(function (response) {
                $scope.addInventoryData.inventory_code = "INV" + response[0].INVENTORY_ID + (1);
            });
        }
        $scope.OnSubmitInventory = function (obj) {
            var form = $scope.addInventoryForm;
            //Force the field validation
            angular.forEach(form, function (obj) {
                if (angular.isObject(obj) && angular.isDefined(obj.$setDirty)) {
                    obj.$setDirty();
                }
            })

            if ($scope.events.length == 0)
                $scope.eventsEmptyArr = true;
            else
                $scope.eventsEmptyArr = false;
            
            angular.forEach($scope.parameters, function (obj) {
                if (obj.parameter_name == $scope.addInventoryData.parameter_name){
                    $scope.addInventoryData.parameter_id = obj.PARAMETER_ID;
                }
            });
            

            if ($scope.addInventoryForm.$valid) {
                var data = {
                    "i_INVENTORY_CODE": $scope.addInventoryData.inventory_code,
                    "i_INVENTORY_NAME": $scope.addInventoryData.inventory_name,
                    "i_CATEGORY": $scope.addInventoryData.category,
                    "i_ITEM": $scope.addInventoryData.item,
                    "i_COUNTRY": $scope.events[0] || null,
                    "i_CITY": $scope.events[1] || null,
                    "i_ADDR1": $scope.events[2] || null,
                    "i_ADDR2": $scope.events[3] || null,
                    "i_ADDR3": $scope.events[4] || null,
                    "i_ADDR4": $scope.events[5] || null,
                    "i_MACHINERY_ID": $scope.addInventoryData.machinery_id||'',
                    "i_SENSOR_ID": $scope.addInventoryData.sensor_id||'',
                    "i_PARAMETER_ID": $scope.addInventoryData.parameter_id||'',
                    "i_GOAL": $scope.addInventoryData.goal||'',
                    "i_STOCK": $scope.addInventoryData.stock||'',
                    "i_DESCRIPTION": $scope.addInventoryData.description||null,
                    "i_SUPPLIER": $scope.addInventoryData.supplierName,
                    "i_IMAGE": $scope.uploadme.src,
                    "i_CREATED_BY": $rootScope.loggedInUserID || "1001", //admin
                    "i_LAST_UPDATED_BY": $rootScope.loggedInUserID || "1001"
                }
                
                console.log(JSON.stringify(data));

                var config = {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
                    }
                }

                if ($scope.addInventoryForm.$valid && !$scope.eventsEmptyArr) {
                    getService.addInventory(data).then(function (response) {

                        $state.go('nav.inventory');
                        if (inventory_id) {
                            ngToast.create('Inventory Edited Successfully');
                        } else {
                            ngToast.create('New Inventory Added Successfully');
                        }

                    });


                }

            }
        }

        $scope.OnSubmitSupplier = function (obj) {

            var data = {
                "i_SUPPLIER_CODE": obj.supplier_id || "NULL",
                "i_SUPPLIER_NAME": obj.supplier_name || "NULL",
                "i_ADDRESS_LINE1": obj.addressline1 || "NULL",
                "i_ADDRESS_LINE2": obj.addressline2 || "NULL",
                "i_ADDRESS_LINE3": obj.addressline3 || "NULL",
                "i_ADDRESS_LINE4": "NULL",
                "i_CITY": obj.city || "NULL",
                "i_COUNTRY": obj.country || "NULL",
                "i_PHONE_NUMBER": obj.mobileNumber || "NULL",
                "i_EMAIL_ADDRESS": obj.email || "NULL",
                "i_CONTACT_PERSON": obj.contact_person || "NULL",
                "i_ATTRIBUTE1": "NULL",
                "i_ATTRIBUTE2": "NULL",
                "i_ATTRIBUTE3": "NULL",
                "i_ATTRIBUTE4": "NULL",
                "i_ATTRIBUTE5": "NULL",
                "i_ATTRIBUTE6": "NULL",
                "i_ATTRIBUTE7": "NULL",
                "i_ATTRIBUTE8": "NULL",
                "i_ATTRIBUTE9": "NULL",
                "i_CREATION_DATE": currentdate,
                "i_CREATED_BY": "admin",
                "i_LAST_UPDATE_DATE": currentdate,
                "i_LAST_UPDATED_BY": "admin"
            }
            var config = {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
                }
            }
            getService.addSupplier(data).then(function (response) {
                $scope.suppliers = [];
                getService.getAllSupplier().then(function (response) {
                    angular.forEach(response, function (obj) {
                        $scope.suppliers.push(obj.SUPPLIER_NAME);
                    });
                });

            });
        }

        $scope.menu = [];
        getService.getAllLocations().then(function (response) {
            $scope.menu = {
                title: 'Locations',
                id: 'menuId',
                items: response
            };
        });

        $scope.select = function (selected) {
            $scope.selected = selected
        }
        $scope.locationSelect = function () {
            $scope.locationSelect = false;
        }
        $scope.rest = {};
        $scope.rest.options = {
            containersToPush: [$('#pushobj')],
            direction: 'ltr',
            collapsed: false,
            fullCollapse: true,

            onGroupItemClick: function (event, item) {
                $scope.eventsEmptyArr = false;
                if ($scope.events[$scope.events.length - 1] != item.name) {
                    $scope.events.push(item.name);
                } else {
                    event.preventDefault();
                }
            },
            onItemClick: function (event, item) {
                $scope.eventsEmptyArr = false;

                if ($scope.events[$scope.events.length - 1] != item.name) {
                    $scope.events.push(item.name);
                } else {
                    event.preventDefault();
                }
            },
            onBackItemClick: function (event, item) {
                return $scope.events.pop();
            }
        };
        $scope.locationDone = false;
        $scope.locationEditBtn = false;

        $scope.locationSelect = function () {
            $scope.location = true;
        }
        $scope.getlocation = '';
        $scope.locationSeleted = function (e) {
            e.preventDefault();
            $scope.locationDone = true;
            $scope.location = false;
            $scope.locationEditBtn = true;
            $scope.locationSelectBtn = false;

        }
        $scope.locationEdit = function (e) {
            e.preventDefault();
            $scope.rest.options.collapsed = true;
            $scope.location = true;
            $scope.locationDone = false;
        }

        $scope.locationCancel = function (e) {
            e.preventDefault();
            $scope.location = false;
        }

        $scope.addMaterialShow = function (e) {
            e.preventDefault();
            $scope.addmaterial = true;
        }
        $scope.addSupplierShow = function (e) {
            e.preventDefault();
            $scope.addsupplier = true;
        }
        $scope.saveNewMaterial = function (e, name, description) {
            alert(name);
            e.preventDefault;
            var data = {
                MATERIAL_NAME: name,
                DESCRIPTION: description
            }
            
            getService.addMaterial(data).then(function (response) {
                if (response.status == "success") {
                    $scope.materials = [];
                    getService.getMaterialList().then(function (response) {
                        angular.forEach(response, function (obj) {
                            $scope.materials.push(obj.MATERIAL_NAME);
                        });
                    });
                }
            })
            
            $scope.addmaterial = false;



        }
        $scope.cancelNewMaterial = function (e) {
            e.preventDefault;
            $scope.addmaterial = false;
        }
        $scope.cancelNewSupplier = function (e) {
            e.preventDefault;
            $scope.addsupplier = false;
        }
}]);

    angular.module('tracehive.controller.workorder', [])
        .controller('workordersCtrl', ['$scope', '$rootScope', '$state', '$http', '$filter', 'PagerService', 'getService', function ($scope, $rootScope, $state, $http, $filter, PagerService, getService) {
            getService.getAllCities().then(function (response) {
                $scope.locationList = response;
            });
            
            $scope.recipieslist =[];
            getService.getAllReceipes().then(function (response) {
                $scope.recipieslist = response;

            });

            $scope.events = [];
            $scope.eventsEmptyArr = false;
            $scope.locationSelectBtn = true;
            $scope.menu = [];
            getService.getAllLocations().then(function (response) {
                $scope.menu = {
                    title: 'Locations',
                    id: 'menuId',
                    items: response
                };
            });

            $scope.select = function (selected) {
                $scope.selected = selected
            }
            $scope.locationSelect = function () {
                $scope.locationSelect = false;
            }
            $scope.rest = {};
            $scope.rest.options = {
                containersToPush: [$('#pushobj')],
                direction: 'ltr',
                collapsed: false,
                fullCollapse: true,

                onGroupItemClick: function (event, item) {
                    $scope.eventsEmptyArr = false;
                    if ($scope.events[$scope.events.length - 1] != item.name) {
                        $scope.events.push(item.name);
                    } else {
                        event.preventDefault();
                    }
                },
                onItemClick: function (event, item) {
                    $scope.eventsEmptyArr = false;

                    if ($scope.events[$scope.events.length - 1] != item.name) {
                        $scope.events.push(item.name);
                    } else {
                        event.preventDefault();
                    }
                },
                onBackItemClick: function (event, item) {
                    return $scope.events.pop();
                }
            };
            $scope.locationDone = false;
            $scope.locationEditBtn = false;
            $scope.addmaterial = false;

            $scope.locationSelect = function () {
                $scope.location = true;
            }
            $scope.getlocation = '';
            $scope.locationSeleted = function (e) {
                e.preventDefault();
                $scope.locationDone = true;
                $scope.location = false;
                $scope.locationEditBtn = true;
                $scope.locationSelectBtn = false;

            }
            $scope.locationEdit = function (e) {
                e.preventDefault();
                $scope.rest.options.collapsed = true;
                $scope.location = true;
                $scope.locationDone = false;
            }

            $scope.locationCancel = function (e) {
                e.preventDefault();
                $scope.location = false;
            }

            getService.getAllWorkorder().then(function (response) {
                $scope.workorderslist = response;
                console.log(JSON.stringify(response));
                
                applyFilter();
            });

                        var filteredWorkorderslist = [];
            $scope.fpWorkorderslist = [];
            $scope.search = function ($event) {
                if ($event.keyCode === 27) {
                    $scope.searchText = '';
                }
                applyFilter();
            }

            function applyFilter() {
                filteredWorkorderslist = $filter('filter')($scope.workorderslist, $scope.searchText);
                applyPagination();
            }

            function applyPagination() {
                $scope.pager = {};
                $scope.setPage = setPage;

                initPager();
                function initPager() {
                    $scope.setPage(1);
                }

                function setPage(page) {
                    if (page < 1 || page > $scope.pager.totalPages) {
                        return;
                    }
                    $scope.pager = PagerService.GetPager(Object.keys(filteredWorkorderslist).length, page);
                    $scope.fpWorkorderslist = filteredWorkorderslist.slice($scope.pager.startIndex, $scope.pager.endIndex + 1);
                }
            }
            
            $scope.deleteWorkorder = function (workorderID) {
                angular.forEach($scope.workorderslist, function (value, index) {
                    if (value.WORK_ORDER_ID == workorderID) {
                        getService.deleteWorkOrder(workorderID).then(function (response) {});
                        $scope.workorderslist.splice(index, 1);
                    }
                })
                $(".modal-backdrop").hide();
                applyFilter();
            }
            
            getService.getUserProfileById($rootScope.loggedInUserRole).then(function (response) {
                $scope.workorderCreate = response.workorderCreate;
				$scope.workorderRead = response.workorderRead;
				$scope.workorderUpdate = response.workorderUpdate;
				$scope.workorderDelete = response.workorderDelete;
                $scope.qualityCreate = response.qualityCreate;
				$scope.qualityRead = response.qualityRead;
				$scope.qualityUpdate = response.qualityUpdate;
				$scope.qualityDelete = response.qualityDelete;
            });
       


}])

    .controller('addworkorderCtrl', ['$scope', '$rootScope', '$http', '$state', '$sce', '$filter', 'getService', 'ngToast', '$timeout', function ($scope, $rootScope, $http, $state, $sce, $filter, getService, ngToast, $timeout) {
        
        
        $scope.operators = [];
        $scope.addWorkorderData = {};
        $scope.addWorkorderData.operatorName = $rootScope.loggedInUserName;
        $scope.referenceDateTime = "";
        $scope.referenceOperator = "";
        $scope.referenceSensorItems = [];
        $scope.referenceMaterialItems = [];
        $scope.referenceMachineryItems = [];
        $scope.referenceParameterItems = [];
        $scope.refernceTargetItems = [];
        $scope.inventorieslist = [];
        $scope.actualMaterials = [];
        $scope.showInventoryName = false;
        $scope.inventory_id=0;
        
        
        
        $scope.selectActualAmount=[]
        $scope.selectActualUOM=[]
        $scope.selectActualValue=[]

        $scope.selectActualMaterial = [];
        $scope.selectActualMachinery = [];
        $scope.selectActualParameter = [];
        $scope.selectActualTarget = [];
        $scope.selectActualSensor = [];
        $scope.referenceID = [];
        $scope.actualTargetDatas0 = [];
        $scope.actualTargetDatasType0 = [];
        $scope.actualTargetDatas1 = [];
        $scope.actualTargetDatasType1 = [];
        $scope.actualTargetDatas2 = [];
        $scope.actualTargetDatasType2 = [];
        $scope.actualTargetDatas3 = [];
        $scope.actualTargetDatasType3 = [];
        $scope.actualTargetDatas4 = [];
        $scope.actualTargetDatasType4 = [];
        $scope.actualTargetDatas5 = [];
        $scope.actualTargetDatasType5 = [];
        $scope.actualTargetDatas6 = [];
        $scope.actualTargetDatasType6 = [];
        $scope.actualTargetDatas7 = [];
        $scope.actualTargetDatasType7 = [];
        $scope.actualTargetDatas8 = [];
        $scope.actualTargetDatasType8 = [];
        $scope.actualTargetDatas9 = [];
        $scope.actualTargetDatasType9 = [];
        
         $scope.selectedTab=1;
        /*jQuery(function () {
                jQuery('#myTab a:last').tab('show')
            });*/
        
        
        $scope.expectedYieldTypes =[];
        
        getService.getUom().then(function(response){
             angular.forEach(response, function (obj) {
                        $scope.expectedYieldTypes.push(obj.NAME);
             })

             //console.log(JSON.stringify($scope.uomList));
        })
        

         $scope.suppliers = [];
        getService.getAllSupplier().then(function (response) {
            angular.forEach(response, function (obj) {
                $scope.suppliers.push(obj.SUPPLIER_NAME);
            });
        });




        getService.getAllinventory().then(function (response) {
            $scope.inventorieslist = response;
            angular.forEach(response, function (obj) {
                $scope.actualMaterials.push(obj.INVENTORY_NAME);
            })

        });
        getService.getAllCities().then(function (response) {
            $scope.locationList = response;
        });
        
        $scope.parameters=[];
        getService.getParameterLibrary().then(function (response) {
                $scope.parameters = response;
            });


        $scope.events = [];
        $scope.eventsEmptyArr = false;
        $scope.locationSelectBtn = true;

        $scope.addInventoryData = {};
        $scope.machineries = [];
        getService.getMachineryList().then(function (response) {
            $scope.machineries = response;
            console.log(JSON.stringify(response));
        });
        $scope.sensors = [];

        getService.getSensorList().then(function (response) {
            $scope.sensors = response;
        });
        $scope.materials = [];
        getService.getMaterialList().then(function (response) {
            angular.forEach(response, function (obj) {
                $scope.materials.push(obj.MATERIAL_NAME);
            });
        });
        
       

        $scope.uploadme = {};
        $scope.uploadme.src = '';
//workorder inventory
        $scope.getParameterValue = function (sensorid) {
            angular.forEach($scope.sensors, function (obj) {
                if (obj.sensor_id == sensorid){
                    $scope.addInventoryData.parameter_name = obj.parameter_name;
                }
            });
        }
        
            $scope.ViewInventory ={}
            $scope.samplesList =[];
           $scope.isActive3 = false;
        
        $scope.onClose = function()
        {
           $scope.isActive3 =  !$scope.isActive3;
        }
        
        $scope.samplesList =[];
            
            $scope.parametersList=[];
            $scope.onGetParamtersList = function(sampleId)
            {
                $scope.parametersList=[];
                getService.getInventoryParameterSamplesById(sampleId).then(function(response){
                $scope.parametersList = response;
                    console.log(JSON.stringify(response));
            })
            
            }
            
            $scope.viewInventory = function(inventoryName){
            angular.forEach($scope.inventorieslist, function (obj) {
                if(inventoryName == obj.INVENTORY_NAME){
                    $scope.ViewInventory =obj;
                    getService.getInventorySamplesById(obj.INVENTORY_ID).then(function(response){
                    $scope.samplesList = response;
                    console.log(JSON.stringify(response));
                    })
                    
                }
            })
            $scope.isActive3 = !$scope.isActive3;
            
        }

             $scope.categoryTypes = ['Supplements', 'Diet & Energy Dring', 'Personal Care', 'Vitamin Mixtures', 'Raw Materials', 'Excipients', 'Mixtures', 'Intermediates', 'API', 'Final Product']
        
        $scope.OnSubmitInventory = function (obj) {
            var form = $scope.addInventoryForm;

            //Force the field validation
            angular.forEach(form, function (obj) {
            if (angular.isObject(obj) && angular.isDefined(obj.$setDirty))

                    {

                        obj.$setDirty();
                    }
                })
            
            if ($scope.events.length == 0)
                $scope.eventsEmptyArr = true;
            else
                $scope.eventsEmptyArr = false;
            
            
            
            angular.forEach($scope.parameters, function (obj) {
                if (obj.parameter_name == $scope.addInventoryData.parameter_name){
                    $scope.addInventoryData.parameter_id = obj.PARAMETER_ID;
                }
            });
            var data = {
                "i_INVENTORY_CODE": $scope.addInventoryData.inventory_code,
                "i_INVENTORY_NAME": $scope.addInventoryData.inventory_name,
                "i_CATEGORY": $scope.addInventoryData.category,
                "i_ITEM": $scope.addInventoryData.item,
                "i_COUNTRY": $scope.events[0] || null,
                "i_CITY": $scope.events[1] || null,
                "i_ADDR1": $scope.events[2] || null,
                "i_ADDR2": $scope.events[3] || null,
                "i_ADDR3": $scope.events[4] || null,
                "i_ADDR4": $scope.events[5] || null,
                "i_MACHINERY_ID": $scope.addInventoryData.machinery_id||'',
                "i_SENSOR_ID": $scope.addInventoryData.sensor_id||'',
                "i_PARAMETER_ID": $scope.addInventoryData.parameter_id||'',
                "i_GOAL": $scope.addInventoryData.goal||'',
                "i_STOCK": $scope.addInventoryData.stock||'',
                "i_DESCRIPTION": $scope.addInventoryData.description||null,
                "i_SUPPLIER": $scope.addInventoryData.supplierName,
                "i_IMAGE": $scope.uploadme.src,
                "i_CREATED_BY": "admin",
                "i_LAST_UPDATED_BY": "admin"
            }

            var config = {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
                }
            }
            if ($scope.addInventoryForm.$valid && !$scope.eventsEmptyArr) {
            getService.addInventory(data).then(function (response) {
                console.log(JSON.stringify(response));
                if(response.status="success")
                    {
                        $scope.inventory_id = response.inventory_id;
                        $scope.dismiss();
                    }
                getService.getAllinventory().then(function (response) {
            $scope.inventorieslist = response;
            

        });
        
                $scope.showInventoryName = "true";
                
                
            });
            }
        }
        



        /*$scope.actualMaterials = [];
        getService.getMaterialList().then(function (response) {
            //console.log(response);
            angular.forEach(response, function (obj) {
                $scope.actualMaterials.push(obj.MATERIAL_NAME);
            })

        });

*/
        $scope.actualMachineries = [];
        getService.getMachineryList().then(function (response) {
            angular.forEach(response, function (obj) {
                $scope.actualMachineries.push(obj.MACHINERY_CODE);
            })

        });
        $scope.actualSensors = [];
        getService.getSensorNameList().then(function (response) {
            angular.forEach(response, function (obj) {
                $scope.actualSensors.push(obj.sensor_name);
            })
        });

        $scope.actualParameterList = [];
        $scope.actualParameterDataList = [];

        getService.getParameterList().then(function (response) {
            //console.log(JSON.stringify(response));
            $scope.actualParameterDataList = response;
            angular.forEach(response, function (obj) {
                $scope.actualParameterList.push(obj.PARAMETER_NAME);
            })
        });
        
       
        

        var workorder_id = $.urlParam('id');
        var workorder_view = $.urlParam('action');
        if (workorder_view == "view") {
        }
        if (workorder_id) {
            getService.editWorkorder(workorder_id).then(function (response) {
                console.log(JSON.stringify(response));
                $scope.addWorkorderData.workorder_id = response[0].WORK_ORDER_ID;
                $scope.addWorkorderData.wonumber = response[0].WO_NUMBER;
                $scope.addWorkorderData.operatorName = response[0].OPERATOR_NAME;
                $scope.addWorkorderData.selectedRecipe = response[0].RECIPE_ID;
                $scope.addWorkorderData.TargetValue = response[0].TARGET_MATERIAL;
                $scope.addWorkorderData.actualyield = response[0].ACTUAL_YIELD;
                $scope.addWorkorderData.actualyieldvalue = response[0].VALUE;
                $scope.addWorkorderData.description = response[0].DESCRIPTION;
                $scope.addWorkorderData.request = response[0].QUANTITY_REQUESTED;
                $scope.addWorkorderData.made = response[0].QUANTITY_MADE;
                $scope.addWorkorderData.status = response[0].STATUS;
                $scope.getModelData(response[0].RECIPE_ID);

                if (response[0].INVENTORY_CODE != null) {
                    $scope.showInventoryName = true;
                    $scope.addInventoryData.inventory_name = response[0].INVENTORY_CODE;
                    $scope.inventory_id = response[0].INVENTORY_ID;
                } else
                    $scope.showInventoryName = false;
            });
            
            

            getService.editWorkorderReferenceByID(workorder_id).then(function (response) {
                console.log(JSON.stringify(response));
                //alert(response[0].ACTUAL_NEW+'***'+response[0].MATERIAL_NEW)
                //alert(response[1].ACTUAL_NEW+'***'+response[1].MATERIAL_NEW)
                if (response[0].WO_PR_ID != null) $scope.referenceID[0] = response[0].WO_PR_ID;
                if (response[0].INVENTORY != null) $scope.selectActualMaterial[0] = response[0].INVENTORY;
                if (response[0].QUANTITY != null) $scope.selectActualAmount[0] = response[0].QUANTITY;
                if (response[0].METRIC != null) $scope.selectActualUOM[0] = response[0].METRIC;
                if (response[0].PARAMETER_NEW != null) $scope.selectActualParameter[0] = response[0].PARAMETER_NEW;
                if (response[0].TARGET_NEW != null) $scope.selectActualTarget[0] = response[0].TARGET_NEW;
                if (response[0].MACHINERY_NEW != null) $scope.selectActualMachinery[0] = response[0].MACHINERY_NEW;
                if (response[0].SENSOR_NEW != null) $scope.selectActualSensor[0] = response[0].SENSOR_NEW;
                if (response[0].SENSOR_AMOUNT != null) $scope.selectActualValue[0] = response[0].SENSOR_AMOUNT;
                if (response[1].WO_PR_ID != null) $scope.referenceID[1] = response[1].WO_PR_ID;
                if (response[1].INVENTORY != null) $scope.selectActualMaterial[1] = response[1].INVENTORY;
                if (response[1].QUANTITY != null) $scope.selectActualAmount[1] = response[1].QUANTITY;
                if (response[1].METRIC != null) $scope.selectActualUOM[1] = response[1].METRIC;
                if (response[1].PARAMETER_NEW != null) $scope.selectActualParameter[1] = response[1].PARAMETER_NEW;
                if (response[1].TARGET_NEW != null) $scope.selectActualTarget[1] = response[1].TARGET_NEW;
                if (response[1].MACHINERY_NEW != null) $scope.selectActualMachinery[1] = response[1].MACHINERY_NEW;
                if (response[1].SENSOR_NEW != null) $scope.selectActualSensor[1] = response[1].SENSOR_NEW;
                if (response[1].SENSOR_AMOUNT != null) $scope.selectActualValue[1] = response[1].SENSOR_AMOUNT;
                if (response[2].WO_PR_ID != null) $scope.referenceID[2] = response[2].WO_PR_ID;
                if (response[2].INVENTORY != null) $scope.selectActualMaterial[2] = response[2].INVENTORY;
                if (response[2].QUANTITY != null) $scope.selectActualAmount[2] = response[2].QUANTITY;
                if (response[2].METRIC != null) $scope.selectActualUOM[2] = response[2].METRIC;
                if (response[2].PARAMETER_NEW != null) $scope.selectActualParameter[2] = response[2].PARAMETER_NEW;
                if (response[2].TARGET_NEW != null) $scope.selectActualTarget[2] = response[2].TARGET_NEW;
                if (response[2].MACHINERY_NEW != null) $scope.selectActualMachinery[2] = response[2].MACHINERY_NEW;
                if (response[2].SENSOR_NEW != null) $scope.selectActualSensor[2] = response[2].SENSOR_NEW;
                if (response[2].SENSOR_AMOUNT != null) $scope.selectActualValue[2] = response[2].SENSOR_AMOUNT;
                if (response[3].WO_PR_ID != null) $scope.referenceID[3] = response[3].WO_PR_ID;
                if (response[3].INVENTORY != null) $scope.selectActualMaterial[3] = response[3].INVENTORY;
                if (response[3].QUANTITY != null) $scope.selectActualAmount[3] = response[3].QUANTITY;
                if (response[3].METRIC != null) $scope.selectActualUOM[3] = response[3].METRIC;
                if (response[3].PARAMETER_NEW != null) $scope.selectActualParameter[3] = response[3].PARAMETER_NEW;
                if (response[3].TARGET_NEW != null) $scope.selectActualTarget[3] = response[3].TARGET_NEW;
                if (response[3].MACHINERY_NEW != null) $scope.selectActualMachinery[3] = response[3].MACHINERY_NEW;
                if (response[3].SENSOR_NEW != null) $scope.selectActualSensor[3] = response[3].SENSOR_NEW;
                if (response[3].SENSOR_AMOUNT != null) $scope.selectActualValue[3] = response[3].SENSOR_AMOUNT;
                if (response[4].WO_PR_ID != null) $scope.referenceID[4] = response[4].WO_PR_ID;
                if (response[4].INVENTORY != null) $scope.selectActualMaterial[4] = response[4].INVENTORY;
                if (response[4].QUANTITY != null) $scope.selectActualAmount[4] = response[4].QUANTITY;
                if (response[4].METRIC != null) $scope.selectActualUOM[4] = response[4].METRIC;
                if (response[4].PARAMETER_NEW != null) $scope.selectActualParameter[4] = response[4].PARAMETER_NEW;
                if (response[4].TARGET_NEW != null) $scope.selectActualTarget[4] = response[4].TARGET_NEW;
                if (response[4].MACHINERY_NEW != null) $scope.selectActualMachinery[4] = response[4].MACHINERY_NEW;
                if (response[4].SENSOR_NEW != null) $scope.selectActualSensor[4] = response[4].SENSOR_NEW;
                if (response[4].SENSOR_AMOUNT != null) $scope.selectActualValue[4] = response[4].SENSOR_AMOUNT;
                if (response[5].WO_PR_ID != null) $scope.referenceID[5] = response[5].WO_PR_ID;
                if (response[5].INVENTORY != null) $scope.selectActualMaterial[5] = response[5].INVENTORY;
                if (response[5].QUANTITY != null) $scope.selectActualAmount[5] = response[5].QUANTITY;
                if (response[5].METRIC != null) $scope.selectActualUOM[5] = response[5].METRIC;
                if (response[5].PARAMETER_NEW != null) $scope.selectActualParameter[5] = response[5].PARAMETER_NEW;
                if (response[5].TARGET_NEW != null) $scope.selectActualTarget[5] = response[5].TARGET_NEW;
                if (response[5].MACHINERY_NEW != null) $scope.selectActualMachinery[5] = response[5].MACHINERY_NEW;
                if (response[5].SENSOR_NEW != null) $scope.selectActualSensor[5] = response[5].SENSOR_NEW;
                if (response[5].SENSOR_AMOUNT != null) $scope.selectActualValue[5] = response[5].SENSOR_AMOUNT;
                if (response[6].WO_PR_ID != null) $scope.referenceID[6] = response[6].WO_PR_ID;
                if (response[6].INVENTORY != null) $scope.selectActualMaterial[6] = response[6].INVENTORY;
                if (response[6].QUANTITY != null) $scope.selectActualAmount[6] = response[6].QUANTITY;
                if (response[6].METRIC != null) $scope.selectActualUOM[6] = response[6].METRIC;
                if (response[6].PARAMETER_NEW != null) $scope.selectActualParameter[6] = response[6].PARAMETER_NEW;
                if (response[6].TARGET_NEW != null) $scope.selectActualTarget[6] = response[6].TARGET_NEW;
                if (response[6].MACHINERY_NEW != null) $scope.selectActualMachinery[6] = response[6].MACHINERY_NEW;
                if (response[6].SENSOR_NEW != null) $scope.selectActualSensor[6] = response[6].SENSOR_NEW;
                if (response[6].SENSOR_AMOUNT != null) $scope.selectActualValue[6] = response[6].SENSOR_AMOUNT;
                if (response[7].WO_PR_ID != null) $scope.referenceID[7] = response[7].WO_PR_ID;
                if (response[7].INVENTORY != null) $scope.selectActualMaterial[7] = response[7].INVENTORY;
                if (response[7].QUANTITY != null) $scope.selectActualAmount[7] = response[7].QUANTITY;
                if (response[7].METRIC != null) $scope.selectActualUOM[7] = response[7].METRIC;
                if (response[7].PARAMETER_NEW != null) $scope.selectActualParameter[7] = response[7].PARAMETER_NEW;
                if (response[7].TARGET_NEW != null) $scope.selectActualTarget[7] = response[7].TARGET_NEW;
                if (response[7].MACHINERY_NEW != null) $scope.selectActualMachinery[7] = response[7].MACHINERY_NEW;
                if (response[7].SENSOR_NEW != null) $scope.selectActualSensor[7] = response[7].SENSOR_NEW;
                if (response[7].SENSOR_AMOUNT != null) $scope.selectActualValue[7] = response[7].SENSOR_AMOUNT;
                if (response[8].WO_PR_ID != null) $scope.referenceID[8] = response[8].WO_PR_ID;
                if (response[8].INVENTORY != null) $scope.selectActualMaterial[8] = response[8].INVENTORY;
                if (response[8].QUANTITY != null) $scope.selectActualAmount[8] = response[8].QUANTITY;
                if (response[8].METRIC != null) $scope.selectActualUOM[8] = response[8].METRIC;
                if (response[8].PARAMETER_NEW != null) $scope.selectActualParameter[8] = response[8].PARAMETER_NEW;
                if (response[8].TARGET_NEW != null) $scope.selectActualTarget[8] = response[8].TARGET_NEW;
                if (response[8].MACHINERY_NEW != null) $scope.selectActualMachinery[8] = response[8].MACHINERY_NEW;
                if (response[8].SENSOR_NEW != null) $scope.selectActualSensor[8] = response[8].SENSOR_NEW;
                if (response[8].SENSOR_AMOUNT != null) $scope.selectActualValue[8] = response[8].SENSOR_AMOUNT;
                if (response[9].WO_PR_ID != null) $scope.referenceID[9] = response[9].WO_PR_ID;
                if (response[9].INVENTORY != null) $scope.selectActualMaterial[9] = response[9].INVENTORY;
                if (response[9].QUANTITY != null) $scope.selectActualAmount[9] = response[9].QUANTITY;
                if (response[9].METRIC != null) $scope.selectActualUOM[9] = response[9].METRIC;
                if (response[9].PARAMETER_NEW != null) $scope.selectActualParameter[9] = response[9].PARAMETER_NEW;
                if (response[9].TARGET_NEW != null) $scope.selectActualTarget[9] = response[9].TARGET_NEW;
                if (response[9].MACHINERY_NEW != null) $scope.selectActualMachinery[9] = response[9].MACHINERY_NEW;
                if (response[9].SENSOR_NEW != null) $scope.selectActualSensor[9] = response[9].SENSOR_NEW;
                if (response[9].SENSOR_AMOUNT != null) $scope.selectActualValue[9] = response[9].SENSOR_AMOUNT;

                
                
            })

        }

        $scope.redirectInventory = function () {

        }
        getService.getWorkorderOperators().then(function (response) {
            angular.forEach(response, function (obj) {
                $scope.operators.push(obj.OP_NAME);
            })
        });


        $scope.productProfileItems = [];
        $scope.referenceItems = [];
        $scope.recipes = "";
        getService.getAllReceipes().then(function (response) {
            $scope.recipes = response;
            //console.log($scope.recipes);
        });
        $scope.getModelData = function (recipe) {
            var recipe_id = recipe;
            $scope.referenceSensorItems = [];
            $scope.referenceMaterialItems = [];
            $scope.referenceMachineryItems = [];
            $scope.referenceParameterItems = [];
            $scope.refernceTargetItems = [];

            //var globalVar;
            getService.editReceipe(recipe_id).then(function (response) {
                console.log(JSON.stringify(response))
                $scope.addWorkorderData.selectedRecipeName = response[0].RECIPE_NAME;
                $scope.addWorkorderData.TargetValue = response[0].TARGET_MATERIAL;
                $scope.recipeContentHtmlData = response[0].RECIPE_PROCESS;
                $scope.referenceDateTime = response[0].LAST_UPDATED_DATE;
                $scope.referenceOperator = response[0].LAST_UPDATED_BY;
                
                
                var tempData = $scope.recipeContentHtmlData;
                var removeData = tempData.replace(/<\/div><\/div>/g, "</div>")
                var formattedData = removeData.replace(/<div>/g, "");
                //console.log(formattedData);

                
                var htmlData = $.parseHTML(formattedData);
                
                //return txt;
                
                
                
                $.each( htmlData, function( i, el ) {
                
                if(el.nodeType == 1)
                  {
                        if(el.className == "label label-success" )
                        $scope.referenceSensorItems.push(el.innerHTML);
                        if(el.className == "label label-primary")
                        $scope.referenceParameterItems.push(el.innerHTML);
                        if(el.className == "label label-warning" )
                        $scope.referenceMaterialItems.push(el.innerHTML);
                        if(el.className == "label label-info")
                        $scope.referenceMachineryItems.push(el.innerHTML);
                        /*else{
                            if(el.childElementCount>0)
                                {
                                    for(var j=0; j<=el.childElementCount;j++){
                                        console.log(j+el.children[j].innerHTML);
                                    if(el.children[j].className == "label label-success" )
                                    $scope.referenceSensorItems.push(el.children[j].innerHTML);
                                    else if(el.children[j].className == "label label-primary")
                                    $scope.referenceParameterItems.push(el.children[j].innerHTML);
                                    else if(el.children[j].className == "label label-warning" )
                                    $scope.referenceMaterialItems.push(el.children[j].innerHTML);
                                    else if(el.children[j].className == "label label-info")
                                    $scope.referenceMachineryItems.push(el.children[j].innerHTML);
                                    }

                                }
                            
                            console.log(el.innerHTML+'-------'+el.childElementCount+'*'+el.children[0].className+'**'+el.children[0].innerHTML);
                        }*/
                      //if(el.hasChildNodes)
                          
                        
                }
                

                //var sampleData = "<span></span>" + $scope.recipeContentHtmlData.toString();
                //var str1 = sampleData.replace(/\'/g, "\"");
                //alert(str1);
                //var $str1 = $(str1);


               // $(str1).each(function (index) {
                    //alert($(this).attr('class'));
                    //alert(index);
                   // if ($(this).attr("class") == "label label-success") {
                     //   alert($(this).text())
                       // $scope.referenceSensorItems.push($(this).text())

                    //} else if ($(this).attr("class") == "label label-warning") {
                      //  $scope.referenceMaterialItems.push($(this).text())
                    //} else if ($(this).attr("class") == "label label-info") {
                      //  $scope.referenceMachineryItems.push($(this).text())
                    //} else if ($(this).attr("class") == "label label-primary") {
                      //  $scope.referenceParameterItems.push($(this).text())
                //    }

                    /* angular.forEach($scope.actualParameterDataList, function (obj) {
                         if ($scope.referenceParameterItems[0] == obj.PARAMETER_NAME)
                             $scope.refernceTargetItems.push(obj.TARGET);
                     })*/


                });

                

                $scope.referenceItems = [{
                        'Sensor': $scope.referenceSensorItems
                    }, {
                        'Material': $scope.referenceMaterialItems
                    },
                    {
                        'Machinery': $scope.referenceMachineryItems
                    }, {
                        'Parameter': $scope.referenceParameterItems
                    }]

                //$('#referenceData').html();
                //$('#referenceData').append(sampleData);
                $('div', $('#referenceData')).each(function () {
                   // console.log($(this)); //log every element found to console output
                })

                // $scope.actualTargetDatas = ['Material 01', 'Material 02', 'Material 03', 'Material 04', 'Material 05'];

                angular.forEach($scope.actualParameterDataList, function (obj) {
                    if ($scope.referenceParameterItems[0] == obj.PARAMETER_NAME) {
                        if (obj.SUB_TYPE == "String" || obj.SUB_TYPE == "Boolean") {
                            $scope.actualTargetDatasType0.push(obj.SUB_TYPE)
                            $scope.actualTargetDatas0.push(obj.TARGET)
                            $scope.refernceTargetItems[0] =obj.TARGET;
                            if (obj.ATTRIBUTE_VALUE1 != null) $scope.actualTargetDatas0.push(obj.ATTRIBUTE_VALUE1);
                            if (obj.ATTRIBUTE_VALUE2 != null) $scope.actualTargetDatas0.push(obj.ATTRIBUTE_VALUE2);
                            if (obj.ATTRIBUTE_VALUE3 != null) $scope.actualTargetDatas0.push(obj.ATTRIBUTE_VALUE3)
                            if (obj.ATTRIBUTE_VALUE4 != null) $scope.actualTargetDatas0.push(obj.ATTRIBUTE_VALUE4)
                            if (obj.ATTRIBUTE_VALUE5 != null) $scope.actualTargetDatas0.push(obj.ATTRIBUTE_VALUE5)
                            if (obj.ATTRIBUTE_VALUE6 != null) $scope.actualTargetDatas0.push(obj.ATTRIBUTE_VALUE6)
                            if (obj.ATTRIBUTE_VALUE7 != null) $scope.actualTargetDatas0.push(obj.ATTRIBUTE_VALUE7)
                            if (obj.ATTRIBUTE_VALUE8 != null) $scope.actualTargetDatas0.push(obj.ATTRIBUTE_VALUE8)
                            if (obj.ATTRIBUTE_VALUE9 != null) $scope.actualTargetDatas0.push(obj.ATTRIBUTE_VALUE9)
                            if (obj.ATTRIBUTE_VALUE10 != null) $scope.actualTargetDatas0.push(obj.ATTRIBUTE_VALUE10)
                            if (obj.ATTRIBUTE_VALUE11 != null) $scope.actualTargetDatas0.push(obj.ATTRIBUTE_VALUE11)
                            if (obj.ATTRIBUTE_VALUE12 != null) $scope.actualTargetDatas0.push(obj.ATTRIBUTE_VALUE12)
                            if (obj.ATTRIBUTE_VALUE13 != null) $scope.actualTargetDatas0.push(obj.ATTRIBUTE_VALUE13)
                            if (obj.ATTRIBUTE_VALUE14 != null) $scope.actualTargetDatas0.push(obj.ATTRIBUTE_VALUE14)
                            if (obj.ATTRIBUTE_VALUE15 != null) $scope.actualTargetDatas0.push(obj.ATTRIBUTE_VALUE15)
                            if (obj.ATTRIBUTE_VALUE16 != null) $scope.actualTargetDatas0.push(obj.ATTRIBUTE_VALUE16)
                            if (obj.ATTRIBUTE_VALUE17 != null) $scope.actualTargetDatas0.push(obj.ATTRIBUTE_VALUE17)
                            if (obj.ATTRIBUTE_VALUE18 != null) $scope.actualTargetDatas0.push(obj.ATTRIBUTE_VALUE18)
                            if (obj.ATTRIBUTE_VALUE19 != null) $scope.actualTargetDatas0.push(obj.ATTRIBUTE_VALUE19)
                            if (obj.ATTRIBUTE_VALUE20 != null) $scope.actualTargetDatas0.push(obj.ATTRIBUTE_VALUE20)

                        } else {
                            $scope.actualTargetDatasType0.push(obj.SUB_TYPE)
                            $scope.actualTargetDatas0.push(obj.TARGET+ ' ' + obj.UNIT)
                            $scope.refernceTargetItems[0]= obj.TARGET + ' ' + obj.UNIT;
                        }
                    }
                    if ($scope.referenceParameterItems[1] == obj.PARAMETER_NAME) {
                        if (obj.SUB_TYPE == "String" || obj.SUB_TYPE == "Boolean") {
                            $scope.actualTargetDatasType1.push(obj.SUB_TYPE)
                            $scope.actualTargetDatas1.push(obj.TARGET)
                            $scope.refernceTargetItems[1]=(obj.TARGET);
                            if (obj.ATTRIBUTE_VALUE1 != null) $scope.actualTargetDatas1.push(obj.ATTRIBUTE_VALUE1);
                            if (obj.ATTRIBUTE_VALUE2 != null) $scope.actualTargetDatas1.push(obj.ATTRIBUTE_VALUE2);
                            if (obj.ATTRIBUTE_VALUE3 != null) $scope.actualTargetDatas1.push(obj.ATTRIBUTE_VALUE3)
                            if (obj.ATTRIBUTE_VALUE4 != null) $scope.actualTargetDatas1.push(obj.ATTRIBUTE_VALUE4)
                            if (obj.ATTRIBUTE_VALUE5 != null) $scope.actualTargetDatas1.push(obj.ATTRIBUTE_VALUE5)
                            if (obj.ATTRIBUTE_VALUE6 != null) $scope.actualTargetDatas1.push(obj.ATTRIBUTE_VALUE6)
                            if (obj.ATTRIBUTE_VALUE7 != null) $scope.actualTargetDatas1.push(obj.ATTRIBUTE_VALUE7)
                            if (obj.ATTRIBUTE_VALUE8 != null) $scope.actualTargetDatas1.push(obj.ATTRIBUTE_VALUE8)
                            if (obj.ATTRIBUTE_VALUE9 != null) $scope.actualTargetDatas1.push(obj.ATTRIBUTE_VALUE9)
                            if (obj.ATTRIBUTE_VALUE10 != null) $scope.actualTargetDatas1.push(obj.ATTRIBUTE_VALUE10)
                            if (obj.ATTRIBUTE_VALUE11 != null) $scope.actualTargetDatas1.push(obj.ATTRIBUTE_VALUE11)
                            if (obj.ATTRIBUTE_VALUE12 != null) $scope.actualTargetDatas1.push(obj.ATTRIBUTE_VALUE12)
                            if (obj.ATTRIBUTE_VALUE13 != null) $scope.actualTargetDatas1.push(obj.ATTRIBUTE_VALUE13)
                            if (obj.ATTRIBUTE_VALUE14 != null) $scope.actualTargetDatas1.push(obj.ATTRIBUTE_VALUE14)
                            if (obj.ATTRIBUTE_VALUE15 != null) $scope.actualTargetDatas1.push(obj.ATTRIBUTE_VALUE15)
                            if (obj.ATTRIBUTE_VALUE16 != null) $scope.actualTargetDatas1.push(obj.ATTRIBUTE_VALUE16)
                            if (obj.ATTRIBUTE_VALUE17 != null) $scope.actualTargetDatas1.push(obj.ATTRIBUTE_VALUE17)
                            if (obj.ATTRIBUTE_VALUE18 != null) $scope.actualTargetDatas1.push(obj.ATTRIBUTE_VALUE18)
                            if (obj.ATTRIBUTE_VALUE19 != null) $scope.actualTargetDatas1.push(obj.ATTRIBUTE_VALUE19)
                            if (obj.ATTRIBUTE_VALUE20 != null) $scope.actualTargetDatas1.push(obj.ATTRIBUTE_VALUE20)

                        } else {
                            $scope.actualTargetDatasType1.push(obj.SUB_TYPE)
                            $scope.actualTargetDatas1.push(obj.TARGET+ ' ' + obj.UNIT)
                            $scope.refernceTargetItems[1]=obj.TARGET + ' ' + obj.UNIT;
                        }
                    }
                    if ($scope.referenceParameterItems[2] == obj.PARAMETER_NAME) {
                        if (obj.SUB_TYPE == "String" || obj.SUB_TYPE == "Boolean") {
                            $scope.actualTargetDatasType2.push(obj.SUB_TYPE)
                            $scope.refernceTargetItems[2] =obj.TARGET;
                            if (obj.ATTRIBUTE_VALUE1 != null) $scope.actualTargetDatas2.push(obj.ATTRIBUTE_VALUE1);
                            if (obj.ATTRIBUTE_VALUE2 != null) $scope.actualTargetDatas2.push(obj.ATTRIBUTE_VALUE2);
                            if (obj.ATTRIBUTE_VALUE3 != null) $scope.actualTargetDatas2.push(obj.ATTRIBUTE_VALUE3)
                            if (obj.ATTRIBUTE_VALUE4 != null) $scope.actualTargetDatas2.push(obj.ATTRIBUTE_VALUE4)
                            if (obj.ATTRIBUTE_VALUE5 != null) $scope.actualTargetDatas2.push(obj.ATTRIBUTE_VALUE5)
                            if (obj.ATTRIBUTE_VALUE6 != null) $scope.actualTargetDatas2.push(obj.ATTRIBUTE_VALUE6)
                            if (obj.ATTRIBUTE_VALUE7 != null) $scope.actualTargetDatas2.push(obj.ATTRIBUTE_VALUE7)
                            if (obj.ATTRIBUTE_VALUE8 != null) $scope.actualTargetDatas2.push(obj.ATTRIBUTE_VALUE8)
                            if (obj.ATTRIBUTE_VALUE9 != null) $scope.actualTargetDatas2.push(obj.ATTRIBUTE_VALUE9)
                            if (obj.ATTRIBUTE_VALUE10 != null) $scope.actualTargetDatas2.push(obj.ATTRIBUTE_VALUE10)
                            if (obj.ATTRIBUTE_VALUE11 != null) $scope.actualTargetDatas2.push(obj.ATTRIBUTE_VALUE11)
                            if (obj.ATTRIBUTE_VALUE12 != null) $scope.actualTargetDatas2.push(obj.ATTRIBUTE_VALUE12)
                            if (obj.ATTRIBUTE_VALUE13 != null) $scope.actualTargetDatas2.push(obj.ATTRIBUTE_VALUE13)
                            if (obj.ATTRIBUTE_VALUE14 != null) $scope.actualTargetDatas2.push(obj.ATTRIBUTE_VALUE14)
                            if (obj.ATTRIBUTE_VALUE15 != null) $scope.actualTargetDatas2.push(obj.ATTRIBUTE_VALUE15)
                            if (obj.ATTRIBUTE_VALUE16 != null) $scope.actualTargetDatas2.push(obj.ATTRIBUTE_VALUE16)
                            if (obj.ATTRIBUTE_VALUE17 != null) $scope.actualTargetDatas2.push(obj.ATTRIBUTE_VALUE17)
                            if (obj.ATTRIBUTE_VALUE18 != null) $scope.actualTargetDatas2.push(obj.ATTRIBUTE_VALUE18)
                            if (obj.ATTRIBUTE_VALUE19 != null) $scope.actualTargetDatas2.push(obj.ATTRIBUTE_VALUE19)
                            if (obj.ATTRIBUTE_VALUE20 != null) $scope.actualTargetDatas2.push(obj.ATTRIBUTE_VALUE20)

                        } else {
                            $scope.actualTargetDatasType2.push(obj.SUB_TYPE)
                            $scope.actualTargetDatas2.push(obj.TARGET + ' ' + obj.UNIT)
                            $scope.refernceTargetItems[2]=obj.TARGET + ' ' + obj.UNIT;
                        }
                    }

                    if ($scope.referenceParameterItems[3] == obj.PARAMETER_NAME) {
                        if (obj.SUB_TYPE == "String" || obj.SUB_TYPE == "Boolean") {
                            $scope.actualTargetDatasType3.push(obj.SUB_TYPE)
                            $scope.refernceTargetItems[3]= obj.TARGET;
                            if (obj.ATTRIBUTE_VALUE1 != null) $scope.actualTargetDatas3.push(obj.ATTRIBUTE_VALUE1);
                            if (obj.ATTRIBUTE_VALUE2 != null) $scope.actualTargetDatas3.push(obj.ATTRIBUTE_VALUE2);
                            if (obj.ATTRIBUTE_VALUE3 != null) $scope.actualTargetDatas3.push(obj.ATTRIBUTE_VALUE3)
                            if (obj.ATTRIBUTE_VALUE4 != null) $scope.actualTargetDatas3.push(obj.ATTRIBUTE_VALUE4)
                            if (obj.ATTRIBUTE_VALUE5 != null) $scope.actualTargetDatas3.push(obj.ATTRIBUTE_VALUE5)
                            if (obj.ATTRIBUTE_VALUE6 != null) $scope.actualTargetDatas3.push(obj.ATTRIBUTE_VALUE6)
                            if (obj.ATTRIBUTE_VALUE7 != null) $scope.actualTargetDatas3.push(obj.ATTRIBUTE_VALUE7)
                            if (obj.ATTRIBUTE_VALUE8 != null) $scope.actualTargetDatas3.push(obj.ATTRIBUTE_VALUE8)
                            if (obj.ATTRIBUTE_VALUE9 != null) $scope.actualTargetDatas3.push(obj.ATTRIBUTE_VALUE9)
                            if (obj.ATTRIBUTE_VALUE10 != null) $scope.actualTargetDatas3.push(obj.ATTRIBUTE_VALUE10)
                            if (obj.ATTRIBUTE_VALUE11 != null) $scope.actualTargetDatas3.push(obj.ATTRIBUTE_VALUE11)
                            if (obj.ATTRIBUTE_VALUE12 != null) $scope.actualTargetDatas3.push(obj.ATTRIBUTE_VALUE12)
                            if (obj.ATTRIBUTE_VALUE13 != null) $scope.actualTargetDatas3.push(obj.ATTRIBUTE_VALUE13)
                            if (obj.ATTRIBUTE_VALUE14 != null) $scope.actualTargetDatas3.push(obj.ATTRIBUTE_VALUE14)
                            if (obj.ATTRIBUTE_VALUE15 != null) $scope.actualTargetDatas3.push(obj.ATTRIBUTE_VALUE15)
                            if (obj.ATTRIBUTE_VALUE16 != null) $scope.actualTargetDatas3.push(obj.ATTRIBUTE_VALUE16)
                            if (obj.ATTRIBUTE_VALUE17 != null) $scope.actualTargetDatas3.push(obj.ATTRIBUTE_VALUE17)
                            if (obj.ATTRIBUTE_VALUE18 != null) $scope.actualTargetDatas3.push(obj.ATTRIBUTE_VALUE18)
                            if (obj.ATTRIBUTE_VALUE19 != null) $scope.actualTargetDatas3.push(obj.ATTRIBUTE_VALUE19)
                            if (obj.ATTRIBUTE_VALUE20 != null) $scope.actualTargetDatas3.push(obj.ATTRIBUTE_VALUE20)

                        } else {
                            $scope.actualTargetDatasType3.push(obj.SUB_TYPE)
                            $scope.actualTargetDatas3.push(obj.TARGET + ' ' + obj.UNIT)
                            $scope.refernceTargetItems[3]=obj.TARGET + ' ' + obj.UNIT;
                        }
                    }

                    if ($scope.referenceParameterItems[4] == obj.PARAMETER_NAME) {
                        if (obj.SUB_TYPE == "String" || obj.SUB_TYPE == "Boolean") {
                            $scope.actualTargetDatasType4.push(obj.SUB_TYPE)
                            $scope.refernceTargetItems[4]=obj.TARGET;
                            if (obj.ATTRIBUTE_VALUE1 != null) $scope.actualTargetDatas4.push(obj.ATTRIBUTE_VALUE1);
                            if (obj.ATTRIBUTE_VALUE2 != null) $scope.actualTargetDatas4.push(obj.ATTRIBUTE_VALUE2);
                            if (obj.ATTRIBUTE_VALUE3 != null) $scope.actualTargetDatas4.push(obj.ATTRIBUTE_VALUE3)
                            if (obj.ATTRIBUTE_VALUE4 != null) $scope.actualTargetDatas4.push(obj.ATTRIBUTE_VALUE4)
                            if (obj.ATTRIBUTE_VALUE5 != null) $scope.actualTargetDatas4.push(obj.ATTRIBUTE_VALUE5)
                            if (obj.ATTRIBUTE_VALUE6 != null) $scope.actualTargetDatas4.push(obj.ATTRIBUTE_VALUE6)
                            if (obj.ATTRIBUTE_VALUE7 != null) $scope.actualTargetDatas4.push(obj.ATTRIBUTE_VALUE7)
                            if (obj.ATTRIBUTE_VALUE8 != null) $scope.actualTargetDatas4.push(obj.ATTRIBUTE_VALUE8)
                            if (obj.ATTRIBUTE_VALUE9 != null) $scope.actualTargetDatas4.push(obj.ATTRIBUTE_VALUE9)
                            if (obj.ATTRIBUTE_VALUE10 != null) $scope.actualTargetDatas4.push(obj.ATTRIBUTE_VALUE10)
                            if (obj.ATTRIBUTE_VALUE11 != null) $scope.actualTargetDatas4.push(obj.ATTRIBUTE_VALUE11)
                            if (obj.ATTRIBUTE_VALUE12 != null) $scope.actualTargetDatas4.push(obj.ATTRIBUTE_VALUE12)
                            if (obj.ATTRIBUTE_VALUE13 != null) $scope.actualTargetDatas4.push(obj.ATTRIBUTE_VALUE13)
                            if (obj.ATTRIBUTE_VALUE14 != null) $scope.actualTargetDatas4.push(obj.ATTRIBUTE_VALUE14)
                            if (obj.ATTRIBUTE_VALUE15 != null) $scope.actualTargetDatas4.push(obj.ATTRIBUTE_VALUE15)
                            if (obj.ATTRIBUTE_VALUE16 != null) $scope.actualTargetDatas4.push(obj.ATTRIBUTE_VALUE16)
                            if (obj.ATTRIBUTE_VALUE17 != null) $scope.actualTargetDatas4.push(obj.ATTRIBUTE_VALUE17)
                            if (obj.ATTRIBUTE_VALUE18 != null) $scope.actualTargetDatas4.push(obj.ATTRIBUTE_VALUE18)
                            if (obj.ATTRIBUTE_VALUE19 != null) $scope.actualTargetDatas4.push(obj.ATTRIBUTE_VALUE19)
                            if (obj.ATTRIBUTE_VALUE20 != null) $scope.actualTargetDatas4.push(obj.ATTRIBUTE_VALUE20)

                        } else {
                            $scope.actualTargetDatasType4.push(obj.SUB_TYPE)
                            $scope.actualTargetDatas4.push(obj.TARGET + ' ' + obj.UNIT)
                            $scope.refernceTargetItems[4]=obj.TARGET + ' ' + obj.UNIT;
                            
                        }
                    }
                    if ($scope.referenceParameterItems[5] == obj.PARAMETER_NAME) {
                        if (obj.SUB_TYPE == "String" || obj.SUB_TYPE == "Boolean") {
                            $scope.actualTargetDatasType5.push(obj.SUB_TYPE)
                            $scope.refernceTargetItems[5]=obj.TARGET;
                            if (obj.ATTRIBUTE_VALUE1 != null) $scope.actualTargetDatas5.push(obj.ATTRIBUTE_VALUE1);
                            if (obj.ATTRIBUTE_VALUE2 != null) $scope.actualTargetDatas5.push(obj.ATTRIBUTE_VALUE2);
                            if (obj.ATTRIBUTE_VALUE3 != null) $scope.actualTargetDatas5.push(obj.ATTRIBUTE_VALUE3)
                            if (obj.ATTRIBUTE_VALUE4 != null) $scope.actualTargetDatas5.push(obj.ATTRIBUTE_VALUE4)
                            if (obj.ATTRIBUTE_VALUE5 != null) $scope.actualTargetDatas5.push(obj.ATTRIBUTE_VALUE5)
                            if (obj.ATTRIBUTE_VALUE6 != null) $scope.actualTargetDatas5.push(obj.ATTRIBUTE_VALUE6)
                            if (obj.ATTRIBUTE_VALUE7 != null) $scope.actualTargetDatas5.push(obj.ATTRIBUTE_VALUE7)
                            if (obj.ATTRIBUTE_VALUE8 != null) $scope.actualTargetDatas5.push(obj.ATTRIBUTE_VALUE8)
                            if (obj.ATTRIBUTE_VALUE9 != null) $scope.actualTargetDatas5.push(obj.ATTRIBUTE_VALUE9)
                            if (obj.ATTRIBUTE_VALUE10 != null) $scope.actualTargetDatas5.push(obj.ATTRIBUTE_VALUE10)
                            if (obj.ATTRIBUTE_VALUE11 != null) $scope.actualTargetDatas5.push(obj.ATTRIBUTE_VALUE11)
                            if (obj.ATTRIBUTE_VALUE12 != null) $scope.actualTargetDatas5.push(obj.ATTRIBUTE_VALUE12)
                            if (obj.ATTRIBUTE_VALUE13 != null) $scope.actualTargetDatas5.push(obj.ATTRIBUTE_VALUE13)
                            if (obj.ATTRIBUTE_VALUE14 != null) $scope.actualTargetDatas5.push(obj.ATTRIBUTE_VALUE14)
                            if (obj.ATTRIBUTE_VALUE15 != null) $scope.actualTargetDatas5.push(obj.ATTRIBUTE_VALUE15)
                            if (obj.ATTRIBUTE_VALUE16 != null) $scope.actualTargetDatas5.push(obj.ATTRIBUTE_VALUE16)
                            if (obj.ATTRIBUTE_VALUE17 != null) $scope.actualTargetDatas5.push(obj.ATTRIBUTE_VALUE17)
                            if (obj.ATTRIBUTE_VALUE18 != null) $scope.actualTargetDatas5.push(obj.ATTRIBUTE_VALUE18)
                            if (obj.ATTRIBUTE_VALUE19 != null) $scope.actualTargetDatas5.push(obj.ATTRIBUTE_VALUE19)
                            if (obj.ATTRIBUTE_VALUE20 != null) $scope.actualTargetDatas5.push(obj.ATTRIBUTE_VALUE20)

                        } else {
                            $scope.actualTargetDatasType5.push(obj.SUB_TYPE)
                            $scope.actualTargetDatas5.push(obj.TARGET + ' ' + obj.UNIT)
                            $scope.refernceTargetItems[5]=obj.TARGET + ' ' + obj.UNIT;
                        }
                    }
                    if ($scope.referenceParameterItems[6] == obj.PARAMETER_NAME) {
                        if (obj.SUB_TYPE == "String" || obj.SUB_TYPE == "Boolean") {
                            $scope.actualTargetDatasType6.push(obj.SUB_TYPE)
                            $scope.refernceTargetItems[6]=obj.TARGET;
                            if (obj.ATTRIBUTE_VALUE1 != null) $scope.actualTargetDatas6.push(obj.ATTRIBUTE_VALUE1);
                            if (obj.ATTRIBUTE_VALUE2 != null) $scope.actualTargetDatas6.push(obj.ATTRIBUTE_VALUE2);
                            if (obj.ATTRIBUTE_VALUE3 != null) $scope.actualTargetDatas6.push(obj.ATTRIBUTE_VALUE3)
                            if (obj.ATTRIBUTE_VALUE4 != null) $scope.actualTargetDatas6.push(obj.ATTRIBUTE_VALUE4)
                            if (obj.ATTRIBUTE_VALUE5 != null) $scope.actualTargetDatas6.push(obj.ATTRIBUTE_VALUE5)
                            if (obj.ATTRIBUTE_VALUE6 != null) $scope.actualTargetDatas6.push(obj.ATTRIBUTE_VALUE6)
                            if (obj.ATTRIBUTE_VALUE7 != null) $scope.actualTargetDatas6.push(obj.ATTRIBUTE_VALUE7)
                            if (obj.ATTRIBUTE_VALUE8 != null) $scope.actualTargetDatas6.push(obj.ATTRIBUTE_VALUE8)
                            if (obj.ATTRIBUTE_VALUE9 != null) $scope.actualTargetDatas6.push(obj.ATTRIBUTE_VALUE9)
                            if (obj.ATTRIBUTE_VALUE10 != null) $scope.actualTargetDatas6.push(obj.ATTRIBUTE_VALUE10)
                            if (obj.ATTRIBUTE_VALUE11 != null) $scope.actualTargetDatas6.push(obj.ATTRIBUTE_VALUE11)
                            if (obj.ATTRIBUTE_VALUE12 != null) $scope.actualTargetDatas6.push(obj.ATTRIBUTE_VALUE12)
                            if (obj.ATTRIBUTE_VALUE13 != null) $scope.actualTargetDatas6.push(obj.ATTRIBUTE_VALUE13)
                            if (obj.ATTRIBUTE_VALUE14 != null) $scope.actualTargetDatas6.push(obj.ATTRIBUTE_VALUE14)
                            if (obj.ATTRIBUTE_VALUE15 != null) $scope.actualTargetDatas6.push(obj.ATTRIBUTE_VALUE15)
                            if (obj.ATTRIBUTE_VALUE16 != null) $scope.actualTargetDatas6.push(obj.ATTRIBUTE_VALUE16)
                            if (obj.ATTRIBUTE_VALUE17 != null) $scope.actualTargetDatas6.push(obj.ATTRIBUTE_VALUE17)
                            if (obj.ATTRIBUTE_VALUE17 != null) $scope.actualTargetDatas6.push(obj.ATTRIBUTE_VALUE17)
                            if (obj.ATTRIBUTE_VALUE18 != null) $scope.actualTargetDatas6.push(obj.ATTRIBUTE_VALUE18)
                            if (obj.ATTRIBUTE_VALUE19 != null) $scope.actualTargetDatas6.push(obj.ATTRIBUTE_VALUE19)
                            if (obj.ATTRIBUTE_VALUE20 != null) $scope.actualTargetDatas6.push(obj.ATTRIBUTE_VALUE20)

                        } else {
                            $scope.actualTargetDatasType6.push(obj.SUB_TYPE)
                            $scope.actualTargetDatas6.push(obj.TARGET + ' ' + obj.UNIT)
                            $scope.refernceTargetItems[6]=obj.TARGET + ' ' + obj.UNIT
                        }
                    }
                    if ($scope.referenceParameterItems[7] == obj.PARAMETER_NAME) {
                        if (obj.SUB_TYPE == "String" || obj.SUB_TYPE == "Boolean") {
                            $scope.actualTargetDatasType7.push(obj.SUB_TYPE)
                            $scope.refernceTargetItems[7]=obj.TARGET;
                            if (obj.ATTRIBUTE_VALUE1 != null) $scope.actualTargetDatas7.push(obj.ATTRIBUTE_VALUE1);
                            if (obj.ATTRIBUTE_VALUE2 != null) $scope.actualTargetDatas7.push(obj.ATTRIBUTE_VALUE2);
                            if (obj.ATTRIBUTE_VALUE3 != null) $scope.actualTargetDatas7.push(obj.ATTRIBUTE_VALUE3)
                            if (obj.ATTRIBUTE_VALUE4 != null) $scope.actualTargetDatas7.push(obj.ATTRIBUTE_VALUE4)
                            if (obj.ATTRIBUTE_VALUE5 != null) $scope.actualTargetDatas7.push(obj.ATTRIBUTE_VALUE5)
                            if (obj.ATTRIBUTE_VALUE6 != null) $scope.actualTargetDatas7.push(obj.ATTRIBUTE_VALUE6)
                            if (obj.ATTRIBUTE_VALUE7 != null) $scope.actualTargetDatas7.push(obj.ATTRIBUTE_VALUE7)
                            if (obj.ATTRIBUTE_VALUE8 != null) $scope.actualTargetDatas7.push(obj.ATTRIBUTE_VALUE8)
                            if (obj.ATTRIBUTE_VALUE9 != null) $scope.actualTargetDatas7.push(obj.ATTRIBUTE_VALUE9)
                            if (obj.ATTRIBUTE_VALUE10 != null) $scope.actualTargetDatas7.push(obj.ATTRIBUTE_VALUE10)
                            if (obj.ATTRIBUTE_VALUE11 != null) $scope.actualTargetDatas7.push(obj.ATTRIBUTE_VALUE11)
                            if (obj.ATTRIBUTE_VALUE12 != null) $scope.actualTargetDatas7.push(obj.ATTRIBUTE_VALUE12)
                            if (obj.ATTRIBUTE_VALUE13 != null) $scope.actualTargetDatas7.push(obj.ATTRIBUTE_VALUE13)
                            if (obj.ATTRIBUTE_VALUE14 != null) $scope.actualTargetDatas7.push(obj.ATTRIBUTE_VALUE14)
                            if (obj.ATTRIBUTE_VALUE15 != null) $scope.actualTargetDatas7.push(obj.ATTRIBUTE_VALUE15)
                            if (obj.ATTRIBUTE_VALUE16 != null) $scope.actualTargetDatas7.push(obj.ATTRIBUTE_VALUE16)
                            if (obj.ATTRIBUTE_VALUE17 != null) $scope.actualTargetDatas7.push(obj.ATTRIBUTE_VALUE17)
                            if (obj.ATTRIBUTE_VALUE18 != null) $scope.actualTargetDatas7.push(obj.ATTRIBUTE_VALUE18)
                            if (obj.ATTRIBUTE_VALUE19 != null) $scope.actualTargetDatas7.push(obj.ATTRIBUTE_VALUE19)
                            if (obj.ATTRIBUTE_VALUE20 != null) $scope.actualTargetDatas7.push(obj.ATTRIBUTE_VALUE20)

                        } else {
                            $scope.actualTargetDatasType7.push(obj.SUB_TYPE)
                            $scope.actualTargetDatas7.push(obj.TARGET+ ' ' + obj.UNIT)
                            $scope.refernceTargetItems[7]=obj.TARGET + ' ' + obj.UNIT;
                        }
                    }
                    if ($scope.referenceParameterItems[8] == obj.PARAMETER_NAME) {
                        if (obj.SUB_TYPE == "String" || obj.SUB_TYPE == "Boolean") {
                            $scope.actualTargetDatasType8.push(obj.SUB_TYPE)
                            $scope.refernceTargetItems[8]=obj.TARGET;
                            if (obj.ATTRIBUTE_VALUE1 != null) $scope.actualTargetDatas8.push(obj.ATTRIBUTE_VALUE1);
                            if (obj.ATTRIBUTE_VALUE2 != null) $scope.actualTargetDatas8.push(obj.ATTRIBUTE_VALUE2);
                            if (obj.ATTRIBUTE_VALUE3 != null) $scope.actualTargetDatas8.push(obj.ATTRIBUTE_VALUE3)
                            if (obj.ATTRIBUTE_VALUE4 != null) $scope.actualTargetDatas8.push(obj.ATTRIBUTE_VALUE4)
                            if (obj.ATTRIBUTE_VALUE5 != null) $scope.actualTargetDatas8.push(obj.ATTRIBUTE_VALUE5)
                            if (obj.ATTRIBUTE_VALUE6 != null) $scope.actualTargetDatas8.push(obj.ATTRIBUTE_VALUE6)
                            if (obj.ATTRIBUTE_VALUE7 != null) $scope.actualTargetDatas8.push(obj.ATTRIBUTE_VALUE7)
                            if (obj.ATTRIBUTE_VALUE8 != null) $scope.actualTargetDatas8.push(obj.ATTRIBUTE_VALUE8)
                            if (obj.ATTRIBUTE_VALUE9 != null) $scope.actualTargetDatas8.push(obj.ATTRIBUTE_VALUE9)
                            if (obj.ATTRIBUTE_VALUE10 != null) $scope.actualTargetDatas8.push(obj.ATTRIBUTE_VALUE10)
                            if (obj.ATTRIBUTE_VALUE11 != null) $scope.actualTargetDatas8.push(obj.ATTRIBUTE_VALUE11)
                            if (obj.ATTRIBUTE_VALUE12 != null) $scope.actualTargetDatas8.push(obj.ATTRIBUTE_VALUE12)
                            if (obj.ATTRIBUTE_VALUE13 != null) $scope.actualTargetDatas8.push(obj.ATTRIBUTE_VALUE13)
                            if (obj.ATTRIBUTE_VALUE14 != null) $scope.actualTargetDatas8.push(obj.ATTRIBUTE_VALUE14)
                            if (obj.ATTRIBUTE_VALUE15 != null) $scope.actualTargetDatas8.push(obj.ATTRIBUTE_VALUE15)
                            if (obj.ATTRIBUTE_VALUE16 != null) $scope.actualTargetDatas8.push(obj.ATTRIBUTE_VALUE16)
                            if (obj.ATTRIBUTE_VALUE17 != null) $scope.actualTargetDatas8.push(obj.ATTRIBUTE_VALUE17)
                            if (obj.ATTRIBUTE_VALUE18 != null) $scope.actualTargetDatas8.push(obj.ATTRIBUTE_VALUE18)
                            if (obj.ATTRIBUTE_VALUE19 != null) $scope.actualTargetDatas8.push(obj.ATTRIBUTE_VALUE19)
                            if (obj.ATTRIBUTE_VALUE20 != null) $scope.actualTargetDatas8.push(obj.ATTRIBUTE_VALUE20)

                        } else {
                            $scope.actualTargetDatasType8.push(obj.SUB_TYPE)
                            $scope.actualTargetDatas8.push(obj.TARGET+ ' ' + obj.UNIT)
                            $scope.refernceTargetItems[8]=obj.TARGET + ' ' + obj.UNIT;
                        }
                    }
                    if ($scope.referenceParameterItems[9] == obj.PARAMETER_NAME) {
                        if (obj.SUB_TYPE == "String" || obj.SUB_TYPE == "Boolean") {
                            $scope.actualTargetDatasType9.push(obj.SUB_TYPE)
                            $scope.refernceTargetItems[9]=obj.TARGET;
                            if (obj.ATTRIBUTE_VALUE1 != null) $scope.actualTargetDatas9.push(obj.ATTRIBUTE_VALUE1);
                            if (obj.ATTRIBUTE_VALUE2 != null) $scope.actualTargetDatas9.push(obj.ATTRIBUTE_VALUE2);
                            if (obj.ATTRIBUTE_VALUE3 != null) $scope.actualTargetDatas9.push(obj.ATTRIBUTE_VALUE3)
                            if (obj.ATTRIBUTE_VALUE4 != null) $scope.actualTargetDatas9.push(obj.ATTRIBUTE_VALUE4)
                            if (obj.ATTRIBUTE_VALUE5 != null) $scope.actualTargetDatas9.push(obj.ATTRIBUTE_VALUE5)
                            if (obj.ATTRIBUTE_VALUE6 != null) $scope.actualTargetDatas9.push(obj.ATTRIBUTE_VALUE6)
                            if (obj.ATTRIBUTE_VALUE7 != null) $scope.actualTargetDatas9.push(obj.ATTRIBUTE_VALUE7)
                            if (obj.ATTRIBUTE_VALUE8 != null) $scope.actualTargetDatas9.push(obj.ATTRIBUTE_VALUE8)
                            if (obj.ATTRIBUTE_VALUE9 != null) $scope.actualTargetDatas9.push(obj.ATTRIBUTE_VALUE9)
                            if (obj.ATTRIBUTE_VALUE10 != null) $scope.actualTargetDatas9.push(obj.ATTRIBUTE_VALUE10)
                            if (obj.ATTRIBUTE_VALUE11 != null) $scope.actualTargetDatas9.push(obj.ATTRIBUTE_VALUE11)
                            if (obj.ATTRIBUTE_VALUE12 != null) $scope.actualTargetDatas9.push(obj.ATTRIBUTE_VALUE12)
                            if (obj.ATTRIBUTE_VALUE13 != null) $scope.actualTargetDatas9.push(obj.ATTRIBUTE_VALUE13)
                            if (obj.ATTRIBUTE_VALUE14 != null) $scope.actualTargetDatas9.push(obj.ATTRIBUTE_VALUE14)
                            if (obj.ATTRIBUTE_VALUE15 != null) $scope.actualTargetDatas9.push(obj.ATTRIBUTE_VALUE15)
                            if (obj.ATTRIBUTE_VALUE16 != null) $scope.actualTargetDatas9.push(obj.ATTRIBUTE_VALUE16)
                            if (obj.ATTRIBUTE_VALUE17 != null) $scope.actualTargetDatas9.push(obj.ATTRIBUTE_VALUE17)
                            if (obj.ATTRIBUTE_VALUE18 != null) $scope.actualTargetDatas9.push(obj.ATTRIBUTE_VALUE18)
                            if (obj.ATTRIBUTE_VALUE19 != null) $scope.actualTargetDatas9.push(obj.ATTRIBUTE_VALUE19)
                            if (obj.ATTRIBUTE_VALUE20 != null) $scope.actualTargetDatas9.push(obj.ATTRIBUTE_VALUE20)

                        } else {
                            $scope.actualTargetDatasType9.push(obj.SUB_TYPE)
                            $scope.actualTargetDatas9.push(obj.TARGET + ' ' + obj.UNIT)
                            $scope.refernceTargetItems[9]=obj.TARGET + ' ' + obj.UNIT;
                        }
                    }




                })



            });
            getService.editProductProfileById(recipe_id).then(function (response) {
                $scope.productProfileItems = response;
                

            })


        }



        $scope.actualSensorBox0 = false;
        $scope.actualMaterialBox0 = false;
        $scope.actualTargetBox0 = false;
        $scope.actualMachineryBox0 = false;
        $scope.actualParameterBox0 = false;
        $scope.actualProfileTargetBox0 = false;
        $scope.actualSensorBox1 = false;
        $scope.actualMaterialBox1 = false;
        $scope.actualTargetBox1 = false;
        $scope.actualMachineryBox1 = false;
        $scope.actualParameterBox1 = false;
        $scope.actualProfileTargetBox1 = false;
        $scope.actualSensorBox2 = false;
        $scope.actualMaterialBox2 = false;
        $scope.actualTargetBox2 = false;
        $scope.actualMachineryBox2 = false;
        $scope.actualParameterBox2 = false;
        $scope.actualProfileTargetBox2 = false;
        $scope.actualSensorBox3 = false;
        $scope.actualMaterialBox3 = false;
        $scope.actualTargetBox3 = false;
        $scope.actualMachineryBox3 = false;
        $scope.actualParameterBox3 = false;
        $scope.actualProfileTargetBox3 = false;
        $scope.actualSensorBox4 = false;
        $scope.actualMaterialBox4 = false;
        $scope.actualTargetBox4 = false;
        $scope.actualMachineryBox4 = false;
        $scope.actualParameterBox4 = false;
        $scope.actualProfileTargetBox4 = false;

        $scope.actualSensorBox5 = false;
        $scope.actualMaterialBox5 = false;
        $scope.actualTargetBox5 = false;
        $scope.actualMachineryBox5 = false;
        $scope.actualParameterBox5 = false;
        $scope.actualProfileTargetBox5 = false;

        $scope.actualSensorBox6 = false;
        $scope.actualMaterialBox6 = false;
        $scope.actualTargetBox6 = false;
        $scope.actualMachineryBox6 = false;
        $scope.actualParameterBox6 = false;
        $scope.actualProfileTargetBox6 = false;

        $scope.actualSensorBox7 = false;
        $scope.actualMaterialBox7 = false;
        $scope.actualTargetBox7 = false;
        $scope.actualMachineryBox7 = false;
        $scope.actualParameterBox7 = false;
        $scope.actualProfileTargetBox7 = false;

        $scope.actualSensorBox8 = false;
        $scope.actualMaterialBox8 = false;
        $scope.actualTargetBox8 = false;
        $scope.actualMachineryBox8 = false;
        $scope.actualParameterBox8 = false;
        $scope.actualProfileTargetBox8 = false;


        $scope.actualSensorBox9 = false;
        $scope.actualMaterialBox9 = false;
        $scope.actualTargetBox9 = false;
        $scope.actualMachineryBox9 = false;
        $scope.actualParameterBox9 = false;
        $scope.actualProfileTargetBox9 = false;





        $scope.actualSensor0 = function (e, index) {
            e.preventDefault();
            $scope.actualSensorBox0 = true;
        };
        $scope.actualSensor1 = function (e, index) {
            e.preventDefault();
            $scope.actualSensorBox1 = true;
        };
        $scope.actualSensor2 = function (e, index) {
            e.preventDefault();
            $scope.actualSensorBox2 = true;
        };
        $scope.actualSensor3 = function (e, index) {
            e.preventDefault();
            $scope.actualSensorBox3 = true;
        };
        $scope.actualSensor4 = function (e, index) {
            e.preventDefault();
            $scope.actualSensorBox4 = true;
        };
        $scope.actualSensor5 = function (e, index) {
            e.preventDefault();
            $scope.actualSensorBox5 = true;
        };
        $scope.actualSensor6 = function (e, index) {
            e.preventDefault();
            $scope.actualSensorBox6 = true;
        };
        $scope.actualSensor7 = function (e, index) {
            e.preventDefault();
            $scope.actualSensorBox7 = true;
        };
        $scope.actualSensor8 = function (e, index) {
            e.preventDefault();
            $scope.actualSensorBox8 = true;
        };
        $scope.actualSensor9 = function (e, index) {
            e.preventDefault();
            $scope.actualSensorBox9 = true;
        };

        $scope.addSensorActualDone = function (e) {
            e.preventDefault();
            $scope.actualSensorBox0 = false;
            $scope.actualSensorBox1 = false;
            $scope.actualSensorBox2 = false;
            $scope.actualSensorBox3 = false;
            $scope.actualSensorBox4 = false;
            $scope.actualSensorBox5 = false;
            $scope.actualSensorBox6 = false;
            $scope.actualSensorBox7 = false;
            $scope.actualSensorBox8 = false;
            $scope.actualSensorBox9 = false;


        };
        $scope.addSensorActualCancel = function (e) {
            e.preventDefault();
            $scope.actualSensorBox0 = false;
            $scope.actualSensorBox1 = false;
            $scope.actualSensorBox2 = false;
            $scope.actualSensorBox3 = false;
            $scope.actualSensorBox4 = false;
            $scope.actualSensorBox5 = false;
            $scope.actualSensorBox6 = false;
            $scope.actualSensorBox7 = false;
            $scope.actualSensorBox8 = false;
            $scope.actualSensorBox9 = false;

        };



        $scope.actualMaterial0 = function (e, index) {
            e.preventDefault();
            $scope.actualMaterialBox0 = true;
        };
        $scope.actualMaterial1 = function (e, index) {
            e.preventDefault();
            $scope.actualMaterialBox1 = true;
        };
        $scope.actualMaterial2 = function (e, index) {
            e.preventDefault();
            $scope.actualMaterialBox2 = true;
        };
        $scope.actualMaterial3 = function (e, index) {
            e.preventDefault();
            $scope.actualMaterialBox3 = true;
        };
        $scope.actualMaterial4 = function (e, index) {
            e.preventDefault();
            $scope.actualMaterialBox4 = true;
        };

        $scope.actualMaterial4 = function (e, index) {
            e.preventDefault();
            $scope.actualMaterialBox4 = true;
        };

        $scope.actualMaterial5 = function (e, index) {
            e.preventDefault();
            $scope.actualMaterialBox5 = true;
        };

        $scope.actualMaterial6 = function (e, index) {
            e.preventDefault();
            $scope.actualMaterialBox6 = true;
        };

        $scope.actualMaterial7 = function (e, index) {
            e.preventDefault();
            $scope.actualMaterialBox7 = true;
        };

        $scope.actualMaterial8 = function (e, index) {
            e.preventDefault();
            $scope.actualMaterialBox8 = true;
        };

        $scope.actualMaterial9 = function (e, index) {
            e.preventDefault();
            $scope.actualMaterialBox9 = true;
        };


        $scope.addMaterialActualDone = function (e) {
            e.preventDefault();
            $scope.actualMaterialBox0 = false;
            $scope.actualMaterialBox1 = false;
            $scope.actualMaterialBox2 = false;
            $scope.actualMaterialBox3 = false;
            $scope.actualMaterialBox4 = false;
            $scope.actualMaterialBox5 = false;
            $scope.actualMaterialBox6 = false;
            $scope.actualMaterialBox7 = false;
            $scope.actualMaterialBox8 = false;
            $scope.actualMaterialBox9 = false;

        };
        $scope.addMaterialActualCancel = function (e) {
            e.preventDefault();
            $scope.actualMaterialBox0 = false;
            $scope.actualMaterialBox1 = false;
            $scope.actualMaterialBox2 = false;
            $scope.actualMaterialBox3 = false;
            $scope.actualMaterialBox4 = false;
            $scope.actualMaterialBox5 = false;
            $scope.actualMaterialBox6 = false;
            $scope.actualMaterialBox7 = false;
            $scope.actualMaterialBox8 = false;
            $scope.actualMaterialBox9 = false;

        };

        //$scope.actualTargetDatas = ['Sweet', 'Spicy', 'Sour', 'Salty'];

        $scope.actualParameter0 = function (e, index) {
            e.preventDefault();
            $scope.actualParameterBox0 = true;
        };
        $scope.actualParameter1 = function (e, index) {
            e.preventDefault();
            $scope.actualParameterBox1 = true;
        };
        $scope.actualParameter2 = function (e, index) {
            e.preventDefault();
            $scope.actualParameterBox2 = true;
        };
        $scope.actualParameter3 = function (e, index) {
            e.preventDefault();
            $scope.actualParameterBox3 = true;
        };
        $scope.actualParameter4 = function (e, index) {
            e.preventDefault();
            $scope.actualParameterBox4 = true;
        };

        $scope.actualParameter5 = function (e, index) {
            e.preventDefault();
            $scope.actualParameterBox5 = true;
        };

        $scope.actualParameter6 = function (e, index) {
            e.preventDefault();
            $scope.actualParameterBox6 = true;
        };

        $scope.actualParameter7 = function (e, index) {
            e.preventDefault();
            $scope.actualParameterBox7 = true;
        };

        $scope.actualParameter8 = function (e, index) {
            e.preventDefault();
            $scope.actualParameterBox8 = true;
        };

        $scope.actualParameter9 = function (e, index) {
            e.preventDefault();
            $scope.actualParameterBox9 = true;
        };



        $scope.addParameterActualDone = function (e) {
            e.preventDefault();
            $scope.actualParameterBox0 = false;
            $scope.actualParameterBox1 = false;
            $scope.actualParameterBox2 = false;
            $scope.actualParameterBox3 = false;
            $scope.actualParameterBox4 = false;
            $scope.actualParameterBox5 = false;
            $scope.actualParameterBox6 = false;
            $scope.actualParameterBox7 = false;
            $scope.actualParameterBox8 = false;
            $scope.actualParameterBox9 = false;
        };
        $scope.addParameterActualCancel = function (e) {
            e.preventDefault();
            $scope.actualParameterBox0 = false;
            $scope.actualParameterBox1 = false;
            $scope.actualParameterBox2 = false;
            $scope.actualParameterBox3 = false;
            $scope.actualParameterBox4 = false;
            $scope.actualParameterBox5 = false;
            $scope.actualParameterBox6 = false;
            $scope.actualParameterBox7 = false;
            $scope.actualParameterBox8 = false;
            $scope.actualParameterBox9 = false;
        };
        $scope.actualTarget0 = function (e, index) {
            e.preventDefault();
            $scope.actualTargetBox0 = true;
        };
        $scope.actualTarget1 = function (e, index) {
            e.preventDefault();
            $scope.actualTargetBox1 = true;
        };
        $scope.actualTarget2 = function (e, index) {
            e.preventDefault();
            $scope.actualTargetBox2 = true;
        };
        $scope.actualTarget3 = function (e, index) {
            e.preventDefault();
            $scope.actualTargetBox3 = true;
        };
        $scope.actualTarget4 = function (e, index) {
            e.preventDefault();
            $scope.actualTargetBox4 = true;
        };
        $scope.actualTarget5 = function (e, index) {
            e.preventDefault();
            $scope.actualTargetBox5 = true;
        };

        $scope.addTargetActualDone = function (e) {
            e.preventDefault();
            $scope.actualTargetBox0 = false;
            $scope.actualTargetBox1 = false;
            $scope.actualTargetBox2 = false;
            $scope.actualTargetBox3 = false;
            $scope.actualTargetBox4 = false;
            $scope.actualTargetBox4 = false;
        };
        $scope.addTargetActualCancel = function (e) {
            e.preventDefault();
            $scope.actualTargetBox0 = false;
            $scope.actualTargetBox1 = false;
            $scope.actualTargetBox2 = false;
            $scope.actualTargetBox3 = false;
            $scope.actualTargetBox4 = false;
            $scope.actualTargetBox4 = false;
        };

        $scope.actualMachineryDatas = ['Machinery 01', 'Machinery 02', 'Machinery 03', 'Machinery 04', 'Machinery 05'];

        $scope.actualMachinery0 = function (e, index) {
            e.preventDefault();
            $scope.actualMachineryBox0 = true;
        };
        $scope.actualMachinery1 = function (e, index) {
            e.preventDefault();
            $scope.actualMachineryBox1 = true;
        };
        $scope.actualMachinery2 = function (e, index) {
            e.preventDefault();
            $scope.actualMachineryBox2 = true;
        };
        $scope.actualMachinery3 = function (e, index) {
            e.preventDefault();
            $scope.actualMachineryBox3 = true;
        };
        $scope.actualMachinery4 = function (e, index) {
            e.preventDefault();
            $scope.actualMachineryBox4 = true;
        };
        $scope.actualMachinery5 = function (e, index) {
            e.preventDefault();
            $scope.actualMachineryBox5 = true;
        };
        $scope.actualMachinery6 = function (e, index) {
            e.preventDefault();
            $scope.actualMachineryBox6 = true;
        };
        $scope.actualMachinery7 = function (e, index) {
            e.preventDefault();
            $scope.actualMachineryBox7 = true;
        };
        $scope.actualMachinery8 = function (e, index) {
            e.preventDefault();
            $scope.actualMachineryBox8 = true;
        };
        $scope.actualMachinery9 = function (e, index) {
            e.preventDefault();
            $scope.actualMachineryBox9 = true;
        };

        $scope.addMachineryActualDone = function (e) {
            e.preventDefault();
            $scope.actualMachineryBox0 = false;
            $scope.actualMachineryBox1 = false;
            $scope.actualMachineryBox2 = false;
            $scope.actualMachineryBox3 = false;
            $scope.actualMachineryBox4 = false;
            $scope.actualMachineryBox5 = false;
            $scope.actualMachineryBox6 = false;
            $scope.actualMachineryBox7 = false;
            $scope.actualMachineryBox8 = false;
            $scope.actualMachineryBox9 = false;
        };
        $scope.addMachineryActualCancel = function (e) {
            e.preventDefault();
            $scope.actualMachineryBox0 = false;
            $scope.actualMachineryBox1 = false;
            $scope.actualMachineryBox2 = false;
            $scope.actualMachineryBox3 = false;
            $scope.actualMachineryBox4 = false;
            $scope.actualMachineryBox5 = false;
            $scope.actualMachineryBox6 = false;
            $scope.actualMachineryBox7 = false;
            $scope.actualMachineryBox8 = false;
            $scope.actualMachineryBox9 = false;
        };

        $scope.actualProfileTargetDatas = ['Sweet', 'Spicy', 'Sour', 'Salty'];
        $scope.actualProfileTargetDatas = ['Sweet', 'Spicy', 'Sour', 'Salty'];

        /* $scope.actualProfileTarget = function(e, index) {
             e.preventDefault();
             $scope.actualProfileTargetBox = true;
         };
         $scope.addProfileTargetActualDone = function(e) {
             e.preventDefault();
             $scope.actualProfileTargetBox = false;
         };
         $scope.addProfileTargetActualCancel = function(e) {
             e.preventDefault();
             $scope.actualProfileTargetBox = false;
         };
        */
        $scope.actualProfileTarget = function (e, index, product) {
            e.preventDefault();
            product.showthis = true;
            // $scope.productProfileItems[index].showthis = true;
        };
        $scope.addProfileTargetActualDone = function (e, index, product) {
            e.preventDefault();
            product.showthis = false;
        };
        $scope.addProfileTargetActualCancel = function (e, index, product) {
            e.preventDefault();
            product.showthis = false;
            // $scope.productProfileItems[index].showthis = false;
        };

        $scope.actualsDone = function (e) {
            e.preventDefault();
            $scope.actualEnterDone = true;
        }
        $scope.showSelectedRecipevalueempty =false;
        $scope.showactualyieldvalueempty =false;
        $scope.OnSubmitWorkorder = function (obj) {
            
            var date = new Date();
            var currentdate = $filter('date')(new Date(), 'yyyy-MM-dd HH:mm:ss');

            if($scope.addWorkorderData.selectedRecipe == undefined)
                $scope.showSelectedRecipevalueempty =true;
            else
                $scope.showSelectedRecipevalueempty =false;
                
            if($scope.addWorkorderData.actualyield== undefined)
               $scope.showactualyieldvalueempty =true; 
            else
               $scope.showactualyieldvalueempty =false;  
                
                if(!$scope.showInventoryName)
                    $scope.addInventoryData.inventory_name=null;
            
            
            var data = {



                "i_WO_NUMBER": $scope.addWorkorderData.wonumber||null,
                "i_OPERATOR_NAME": $scope.addWorkorderData.operatorName,
                "i_RECIPE_NAME": $scope.addWorkorderData.selectedRecipeName,
                "i_RECIPE_ID":$scope.addWorkorderData.selectedRecipe,
                "i_TARGET_MATERIAL": $scope.addWorkorderData.TargetValue,
                "i_ACTUAL_YIELD": $scope.addWorkorderData.actualyield,
                "i_VALUE": $scope.addWorkorderData.actualyieldvalue,
                "i_DESCRIPTION": $scope.addWorkorderData.description,
                "i_QUANTITY_REQUESTED": $scope.addWorkorderData.request,
                "i_QUANTITY_MADE": $scope.addWorkorderData.made,
                "i_STATUS": $scope.addWorkorderData.status,
                "i_QUANTITY_UNITS": "test",
                "i_INVENTORY_CODE": $scope.addInventoryData.inventory_code,
                "i_INVENTORY_ID": $scope.inventory_id,
                "i_CREATION_DATE": currentdate,
                "i_LAST_UPDATED_DATE": currentdate,
                "i_LAST_UPDATED_BY": $scope.addWorkorderData.operatorName,
                "i_CREATED_BY": $scope.addWorkorderData.operatorName,
                
            }
            for (var i = 1; i <= 10; i++) {
                var key1 = "i_WO_PR_ID_" + i;
                var key2 = "i_MATERIAL_" + i;
                var key3 = "i_INVENTORY_" + i;
                var key4 = "i_QUANTITY_" + i;
                var key5 = "i_METRIC_" + i;
                var key6 = "i_PARAMETER_" + i;
                var key7 = "i_PARAMETER_NEW_" + i;
                var key8 = "i_TARGET_" + i;
                var key9 = "i_TARGET_NEW_" + i;
                var key10 = "i_MACHINERY_" + i;
                var key11 = "i_MACHINERY_NEW_" + i;
                var key12 = "i_SENSOR_" + i;
                var key13 = "i_SENSOR_NEW_" + i;
                var key14 = "i_SENSOR_AMOUNT_" + i;
                var key15 = "i_ACTION_" + i;
                var key16 = "i_ACTION_NEW_" + i;
                var key17 = "i_TYPE_PR_" + i;



                var dataCount = i - 1;
                var index = 0;
                
                if (workorder_id) {
                    data[key1] = $scope.referenceID[i - 1] || null;
                } else {
                    data[key1] = null;
                }
                
                data[key2] = $scope.referenceMaterialItems[i - 1] || null;
                data[key3] = $scope.selectActualMaterial[i - 1] || null;
                data[key4] = $scope.selectActualAmount[i-1] || null;
                data[key5] = $scope.selectActualUOM[i-1] || null;
                data[key6] = $scope.referenceParameterItems[i - 1] || null;
                data[key7] = $scope.selectActualParameter[i - 1] || null;
                data[key8] = $scope.refernceTargetItems[i - 1] || null;
                data[key9] = $scope.selectActualTarget[i - 1] || null;
                data[key10] = $scope.referenceMachineryItems[i - 1] || null;
                data[key11] = $scope.selectActualMachinery[i - 1] || null;
                data[key12] = $scope.referenceSensorItems[i - 1] || null;
                data[key13] = $scope.selectActualSensor[i - 1] || null;
                data[key14] = $scope.selectActualValue[i - 1] || null;
                data[key15] = "false";
                data[key16] = "false";
                data[key17] = "i_TYPE_PR_" + i;

                

            }

            for (var i = 1; i <= 10; i++) {
                //var key1 = "i_WO_PR_ID_" + i;
                var key2 = "i_PRODUCT_PARAMETER_" + i;
                var key3 = "i_THRESHOLD_" + i;
                var key4 = "i_TARGET_WO_1" + i;
                var key5 = "i_CRITICALITY_" + i;
                var key6 = "i_TYPE_" + i;

                $scope.productProfileItems.forEach(function (value, index) {
                    if (index + 1 == i) {
                        //data[key1] = value.RECIPE_PARAM_ID;
                        data[key2] = value.PRODUCT_PARAMETER;
                        data[key3] = value.THRESHOLD;
                        data[key4] = value.TARGET;
                        data[key5] = value.CRITICALITY;
                        data[key6] = value.TYPE;
                    } else if (i > index + 1) {
                        //data[key1] = null;
                        data[key2] = null;
                        data[key3] = null;
                        data[key4] = null;
                        data[key5] = null;
                        data[key6] = null;
                    }
                })

                //})


            }



            var config = {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
                    }
                }
                console.log(JSON.stringify(data));
            
            var workform = $scope.addWorkorderForm;
            //Force the field validation
            angular.forEach(workform, function (obj) {
                if (angular.isObject(obj) && angular.isDefined(obj.$setDirty))

                {

                    obj.$setDirty();
                }
            })

            
            console.log($scope.addWorkorderForm.$valid);
            if ( $scope.addWorkorderForm.$valid)
              {
                getService.addWorkorder(data).then(function (response) {
                    $state.go('nav.workorders');
                });
            }
            
            
            
        }

         $scope.menu = [];
        getService.getAllLocations().then(function (response) {
            $scope.menu = {
                title: 'Locations',
                id: 'menuId',
                items: response
            };
        });

        $scope.select = function (selected) {
            $scope.selected = selected
        }
        $scope.locationSelect = function () {
            $scope.locationSelect = false;
        }
        $scope.rest = {};
        $scope.rest.options = {
            containersToPush: [$('#pushobj')],
            direction: 'ltr',
            collapsed: false,
            fullCollapse: true,

            onGroupItemClick: function (event, item) {
                $scope.eventsEmptyArr = false;
                if ($scope.events[$scope.events.length - 1] != item.name) {
                    $scope.events.push(item.name);
                } else {
                    event.preventDefault();
                }
            },
            onItemClick: function (event, item) {
                $scope.eventsEmptyArr = false;

                if ($scope.events[$scope.events.length - 1] != item.name) {
                    $scope.events.push(item.name);
                } else {
                    event.preventDefault();
                }
            },
            onBackItemClick: function (event, item) {
                return $scope.events.pop();
            }
        };
        
        $scope.locationDone = false;
        $scope.locationEditBtn = false;

        $scope.locationSelect = function () {
            $scope.location = true;
        }
        $scope.getlocation = '';
        $scope.locationSeleted = function (e) {
            e.preventDefault();
            $scope.locationDone = true;
            $scope.location = false;
            $scope.locationEditBtn = true;
            $scope.locationSelectBtn = false;

        }
        $scope.locationEdit = function (e) {
            e.preventDefault();
            $scope.rest.options.collapsed = true;
            $scope.location = true;
            $scope.locationDone = false;
        }

        $scope.locationCancel = function (e) {
            e.preventDefault();
            $scope.location = false;
        }

        
        

}]);

    angular.module('tracehive.controller.receipe', [])
        .controller('recipesCtrl', ['$scope', '$rootScope', '$state', '$http', '$filter', 'PagerService', 'getService', function ($scope, $rootScope, $state, $http, $filter, PagerService, getService) {
            getService.getAllReceipes().then(function (response) {
                $scope.recipieslist = response;
                applyFilter();
            });

            var filteredRecipieslist = [];
            $scope.fpRecipieslist = [];
            $scope.search = function ($event) {
                if ($event.keyCode === 27) {
                    $scope.searchText = '';
                }
                applyFilter();
            }

            function applyFilter() {
                filteredRecipieslist = $filter('filter')($scope.recipieslist, $scope.searchText);
                applyPagination();
            }

            function applyPagination() {
                $scope.pager = {};
                $scope.setPage = setPage;

                initPager();
                function initPager() {
                    $scope.setPage(1);
                }

                function setPage(page) {
                    if (page < 1 || page > $scope.pager.totalPages) {
                        return;
                    }
                    $scope.pager = PagerService.GetPager(Object.keys(filteredRecipieslist).length, page);
                    $scope.fpRecipieslist = filteredRecipieslist.slice($scope.pager.startIndex, $scope.pager.endIndex + 1);
                }
            }

            getService.getAllCities().then(function (response) {
                $scope.locationList = response;
            });

            $scope.deleteRecipe = function (receipeID) {
                angular.forEach($scope.recipieslist, function (value, index) {
                    if (value.RECIPE_ID == receipeID) {
                        getService.deleteRecipe(receipeID).then(function (response) {});
                        $scope.recipieslist.splice(index, 1);
                    }
                })
                $(".modal-backdrop").hide();
                applyFilter();
            }
            
           getService.getUserProfileById($rootScope.loggedInUserRole).then(function (response) {
                $scope.recipeCreate = response.recipeCreate;
				$scope.recipeRead = response.recipeRead;
				$scope.recipeUpdate = response.recipeUpdate;
				$scope.recipeDelete = response.recipeDelete;

            });



}])

    .controller('addrecipesCtrl', ['$scope', '$rootScope', '$state', '$sce', '$filter', 'getService', function ($scope, $rootScope, $state, $sce, $filter, getService) {

        getService.getAllCities().then(function (response) {
            $scope.locationList = response;
        });

        $scope.machineries = [];
        $scope.uploadme = {};
        $scope.uploadme.src = '';
        $scope.addReceipeData = {};
        //$scope.setValueItems=[];
        $scope.receipeTypes = ['Process Recipe', 'Cleaning Recipe', 'General Recipe'];
        $scope.uomList=[];
        $scope.expectedYieldTypes =[];
        
        getService.getUom().then(function(response){
             $scope.uomList = response;
             angular.forEach(response, function (obj) {
                        $scope.expectedYieldTypes.push(obj.NAME);
             })

             //console.log(JSON.stringify($scope.uomList));
        })
        
        //$scope.expectedYieldTypes = ['UOM', 'Kg', 'gms', 'ltr', 'ml', 'gal'];
        $scope.addReceipeData.selectedExpectedYield = $scope.expectedYieldTypes[0];

        $scope.tempProductProfileItems = [];

        $scope.parameterList = [];
        $scope.parameterDataList = [];
        getService.getParameterList().then(function (response) {
            //console.log(JSON.stringify(response));
            $scope.parameterDataList = response;
            angular.forEach(response, function (obj) {
                $scope.parameterList.push(obj.PARAMETER_NAME);
            })
        });


        var date = new Date();
        var currentdate = $filter('date')(new Date(), 'yyyy-MM-dd HH:mm:ss');

        var receipe_id = $.urlParam('id');
        if (!receipe_id) {
            receipe_id = '';
            $scope.productProfileItems = []
                /*{
                id: '',
                selectedParameter: '',
                subType: '',
                thresholdValue: '',
                target: '',
                criticality: '',
                uom: 'UOM'
            }*/
        }
        
        function pasteHtmlAtCaret(html, selectPastedContent) {
    var sel, range;
    if (window.getSelection) {
        // IE9 and non-IE
        //console.log(window.getSelection())
        sel = window.getSelection();
        if (sel.getRangeAt && sel.rangeCount) {
            range = sel.getRangeAt(0);
            range.deleteContents();

            // Range.createContextualFragment() would be useful here but is
            // only relatively recently standardized and is not supported in
            // some browsers (IE9, for one)
            var el = document.createElement("div");
            el.innerHTML = html;
            var frag = document.createDocumentFragment(), node, lastNode;
            while ( (node = el.firstChild) ) {
                lastNode = frag.appendChild(node);
            }
            var firstNode = frag.firstChild;
            range.insertNode(frag);
            
            // Preserve the selection
            if (lastNode) {
                range = range.cloneRange();
                range.setStartAfter(lastNode);
                if (selectPastedContent) {
                    range.setStartBefore(firstNode);
                } else {
                    range.collapse(true);
                }
                sel.removeAllRanges();
                sel.addRange(range);
            }
        }
    } else if ( (sel = document.selection) && sel.type != "Control") {
        // IE < 9
        var originalRange = sel.createRange();
        originalRange.collapse(true);
        sel.createRange().pasteHTML(html);
        var range = sel.createRange();
        range.setEndPoint("StartToStart", originalRange);
        range.select();
    }
}
        $('#getrecipeuserinputvalue').bind('focusout', function(e) {
        //if(!isValid($(this).val())) {
            e.preventDefault();
            $(this).focus();
        
        });
    
    

        if (receipe_id) {
            $scope.productProfileItems = [{
                id: '',
                selectedParameter: '',
                subType: '',
                thresholdValue: '',
                target: '',
                criticality: '',
                uom: 'UOM',
                setValueItems: []
            }]

            $scope.productProfileItems = [];
            $scope.myHtmlVar ='';

            getService.editReceipe(receipe_id).then(function (response) {
                console.log(JSON.stringify(response));
                $scope.addReceipeData.name = response[0].RECIPE_NAME;
                $scope.addReceipeData.type = response[0].RECIPE_TYPE;
                $scope.addReceipeData.targetMaterial = response[0].TARGET_MATERIAL;
                $scope.addReceipeData.selectedExpectedYield = response[0].EXPECTED_UOM;
                $scope.addReceipeData.expectedYieldValue = response[0].EXPECTED_VALUE;
                $scope.addReceipeData.Description = response[0].DESCRIPTION;
                $scope.myHtmlVar = response[0].RECIPE_PROCESS;
                $scope.uploadme.src = response[0].IMAGE;

            })

            getService.editProductProfileById(receipe_id).then(function (response) {

                angular.forEach(response, function (obj) {
                    var valueItems = [];
                    angular.forEach($scope.parameterDataList, function (paramObj) {
                        if (paramObj.PARAMETER_NAME == obj.PRODUCT_PARAMETER && paramObj.SUB_TYPE == "String" || paramObj.SUB_TYPE == "Boolean") {
                            if (paramObj.ATTRIBUTE_VALUE1 != null) valueItems.push(paramObj.ATTRIBUTE_VALUE1)
                            if (paramObj.ATTRIBUTE_VALUE2 != null) valueItems.push(paramObj.ATTRIBUTE_VALUE2)
                            if (paramObj.ATTRIBUTE_VALUE3 != null) valueItems.push(paramObj.ATTRIBUTE_VALUE3)
                            if (paramObj.ATTRIBUTE_VALUE4 != null) valueItems.push(paramObj.ATTRIBUTE_VALUE4)
                            if (paramObj.ATTRIBUTE_VALUE5 != null) valueItems.push(paramObj.ATTRIBUTE_VALUE5)
                            if (paramObj.ATTRIBUTE_VALUE6 != null) valueItems.push(paramObj.ATTRIBUTE_VALUE6)
                            if (paramObj.ATTRIBUTE_VALUE7 != null) valueItems.push(paramObj.ATTRIBUTE_VALUE7)
                            if (paramObj.ATTRIBUTE_VALUE8 != null) valueItems.push(paramObj.ATTRIBUTE_VALUE8)
                            if (paramObj.ATTRIBUTE_VALUE9 != null) valueItems.push(paramObj.ATTRIBUTE_VALUE9)
                            if (paramObj.ATTRIBUTE_VALUE10 != null) valueItems.push(paramObj.ATTRIBUTE_VALUE10)
                            if (paramObj.ATTRIBUTE_VALUE11 != null) valueItems.push(paramObj.ATTRIBUTE_VALUE11)
                            if (paramObj.ATTRIBUTE_VALUE12 != null) valueItems.push(paramObj.ATTRIBUTE_VALUE12)
                            if (paramObj.ATTRIBUTE_VALUE13 != null) valueItems.push(paramObj.ATTRIBUTE_VALUE13)
                            if (paramObj.ATTRIBUTE_VALUE14 != null) valueItems.push(paramObj.ATTRIBUTE_VALUE14)
                            if (paramObj.ATTRIBUTE_VALUE15 != null) valueItems.push(paramObj.ATTRIBUTE_VALUE15)
                            if (paramObj.ATTRIBUTE_VALUE16 != null) valueItems.push(paramObj.ATTRIBUTE_VALUE16)
                            if (paramObj.ATTRIBUTE_VALUE17 != null) valueItems.push(paramObj.ATTRIBUTE_VALUE17)
                            if (paramObj.ATTRIBUTE_VALUE18 != null) valueItems.push(paramObj.ATTRIBUTE_VALUE18)
                            if (paramObj.ATTRIBUTE_VALUE19 != null) valueItems.push(paramObj.ATTRIBUTE_VALUE19)
                            if (paramObj.ATTRIBUTE_VALUE20 != null) valueItems.push(paramObj.ATTRIBUTE_VALUE20)

                        }
                    })

                    $scope.selectedParamData = obj.PRODUCT_PARAMETER;
                    $scope.productProfileItems.push({
                        id: obj.RECIPE_PARAM_ID,
                        selectedParameter: obj.PRODUCT_PARAMETER,
                        subType: obj.TYPE,
                        thresholdValue: obj.THRESHOLD,
                        target: obj.TARGET,
                        criticality: obj.CRITICALITY,
                        uom: 'UOM',
                        setValueItems: valueItems
                    })



                })

            })

        }

        getService.getMachineryList().then(function (response) {
            angular.forEach(response, function (obj) {
                $scope.machineries.push(obj.MACHINERY_CODE);
            })

        });
        $scope.editor = '';


        $scope.machineries = [];
        $scope.sensorBox = false;
        $scope.machineryBox = false;
        $scope.sensorBox = false;

        $scope.addRecipeMachineries = function (e) {
            e.preventDefault();
            $scope.machineryBox = true;
        }

        $scope.recipeMachnieryDone = function (e) {
            if($scope.selectRecipeEquipemt!=undefined){
                pasteHtmlAtCaret("<div class='label label-info' readonly>"+$scope.selectRecipeEquipemt+"</div>&nbsp;", false);
            }
            e.preventDefault();
            $scope.machineryBox = false;
            //$scope.textvalue = angular.element('.simditor-body').html();
            //$scope.textvalue = angular.element('#getrecipeuserinputvalue').html();
            /*$scope.editor = $scope.editor + " <span class='highlights receipeMachinery' readonly>" + $scope.selectRecipeEquipemt + "</span>&nbsp;" + " ";*/
            //$scope.myHtmlVar = $scope.textvalue + "<span class='label label-info receipeMachinery' readonly>" + $scope.selectRecipeEquipemt + "</span>&nbsp;" + " ";
            
        }
        $scope.recipeMachnieryCancel = function (e) {
            e.preventDefault();
            $scope.machineryBox = false;
        }

        $scope.materials = [];

        getService.getMaterialList().then(function (response) {
            //console.log(response);
            angular.forEach(response, function (obj) {
                $scope.materials.push(obj.MATERIAL_NAME);
            })

        });

        //$scope.materials = ['Material1', 'Material2', 'Material3', 'Material4', 'Material5', 'Material6', 'Material7', 'Material8'];

        $scope.addRecipeMaterial = function (e) {
            e.preventDefault();
            $scope.materialBox = true;
        }

        $scope.recipeMaterialDone = function (e) {
            if($scope.selectRecipeMaterial!=undefined){
                pasteHtmlAtCaret("<div class='label label-warning' readonly>"+$scope.selectRecipeMaterial+"</div>&nbsp;", false);
            }
            
            e.preventDefault();
            $scope.materialBox = false;
            //$scope.textvalue = angular.element('.simditor-body').html();
            //$scope.textvalue = angular.element('#getrecipeuserinputvalue').html();
           /* $scope.editor = $scope.editor + " <span class='highlights receipeMaterial' readonly>" + $scope.selectRecipeMaterial + "</span>&nbsp;" + " ";*/
            //$scope.myHtmlVar = $scope.textvalue + " <span class='label label-warning receipeMaterial' readonly>" + $scope.selectRecipeMaterial + "</span>&nbsp;" + " ";
        }

        $scope.recipeMaterialCancel = function (e) {
            e.preventDefault();
            $scope.materialBox = false;
        }

        $scope.getThresholdData = function (data, item) {

            angular.forEach($scope.parameterDataList, function (obj) {
                if (obj.PARAMETER_NAME == data) {
                    item.selectedParameter = obj.PARAMETER_NAME;
                    item.thresholdValue = obj.MIN + " - " + obj.MAX + " " + obj.UNIT;
                    item.target = obj.TARGET;
                    item.subType = obj.SUB_TYPE;
                    item.criticality = "";
                    item.uom = "uom";
                    item.setValueItems = [];
                    if (obj.SUB_TYPE == "String" || obj.SUB_TYPE == "Boolean") {
                        item.setValueItems = [];
                        if (obj.ATTRIBUTE_VALUE1 != null) item.setValueItems.push(obj.ATTRIBUTE_VALUE1)
                        if (obj.ATTRIBUTE_VALUE2 != null) item.setValueItems.push(obj.ATTRIBUTE_VALUE2)
                        if (obj.ATTRIBUTE_VALUE3 != null) item.setValueItems.push(obj.ATTRIBUTE_VALUE3)
                        if (obj.ATTRIBUTE_VALUE4 != null) item.setValueItems.push(obj.ATTRIBUTE_VALUE4)
                        if (obj.ATTRIBUTE_VALUE5 != null) item.setValueItems.push(obj.ATTRIBUTE_VALUE5)
                        if (obj.ATTRIBUTE_VALUE6 != null) item.setValueItems.push(obj.ATTRIBUTE_VALUE6)
                        if (obj.ATTRIBUTE_VALUE7 != null) item.setValueItems.push(obj.ATTRIBUTE_VALUE7)
                        if (obj.ATTRIBUTE_VALUE8 != null) item.setValueItems.push(obj.ATTRIBUTE_VALUE8)
                        if (obj.ATTRIBUTE_VALUE9 != null) item.setValueItems.push(obj.ATTRIBUTE_VALUE9)
                        if (obj.ATTRIBUTE_VALUE10 != null) item.setValueItems.push(obj.ATTRIBUTE_VALUE10)
                        if (obj.ATTRIBUTE_VALUE11 != null) item.setValueItems.push(obj.ATTRIBUTE_VALUE11)
                        if (obj.ATTRIBUTE_VALUE12 != null) item.setValueItems.push(obj.ATTRIBUTE_VALUE12)
                        if (obj.ATTRIBUTE_VALUE13 != null) item.setValueItems.push(obj.ATTRIBUTE_VALUE13)
                        if (obj.ATTRIBUTE_VALUE14 != null) item.setValueItems.push(obj.ATTRIBUTE_VALUE14)
                        if (obj.ATTRIBUTE_VALUE15 != null) item.setValueItems.push(obj.ATTRIBUTE_VALUE15)
                        if (obj.ATTRIBUTE_VALUE16 != null) item.setValueItems.push(obj.ATTRIBUTE_VALUE16)
                        if (obj.ATTRIBUTE_VALUE17 != null) item.setValueItems.push(obj.ATTRIBUTE_VALUE17)
                        if (obj.ATTRIBUTE_VALUE18 != null) item.setValueItems.push(obj.ATTRIBUTE_VALUE18)
                        if (obj.ATTRIBUTE_VALUE19 != null) item.setValueItems.push(obj.ATTRIBUTE_VALUE19)
                        if (obj.ATTRIBUTE_VALUE20 != null) item.setValueItems.push(obj.ATTRIBUTE_VALUE20)

                    }
                }
            })
        }
        
        
        
        
        
        //$scope.parameterList = ['Temperature', 'Pressure', 'Humidity', 'Paddle Speed'];

        $scope.addRecipeParameter = function (e) {
            e.preventDefault();
            $scope.parameterBox = true;
        }

        $scope.recipeParameterDone = function (e) {
            if($scope.selectRecipeParameter!=undefined){
                pasteHtmlAtCaret("<div class='label label-primary' readonly>"+$scope.selectRecipeParameter+"</div>&nbsp;", false);
            }
            
            e.preventDefault();
            $scope.parameterBox = false;
            //$scope.textvalue = angular.element('.simditor-body').html();
           //$scope.textvalue = angular.element('#getrecipeuserinputvalue').html();
            /*$scope.editor = $scope.editor + " <span class='highlights receipeParameter' readonly>" + $scope.selectRecipeParameter + "</span>&nbsp;" + " ";*/
            //$scope.myHtmlVar = $scope.textvalue + " <span class='label label-primary receipeParameter'>" + $scope.selectRecipeParameter + "</span>&nbsp;" + " ";
            //insertAtCursor('<span class="highlights receipeParameter" readonly>' + $scope.selectRecipeParameter + '</span>&nbsp;');
            
            
            
            
            
        }

        $scope.recipeParameterCancel = function (e) {
            e.preventDefault();
            $scope.parameterBox = false;
        }

        $scope.sensors = [];
        getService.getSensorNameList().then(function (response) {
            angular.forEach(response, function (obj) {
                $scope.sensors.push(obj.sensor_name);
            })
        });

        $scope.addRecipeSensor = function (e) {
            e.preventDefault();
            $scope.sensorBox = true;
        }

        $scope.recipeSensorDone = function (e) {
            if($scope.selectRecipeSensor!=undefined){
                pasteHtmlAtCaret("<div class='label label-success' readonly>"+$scope.selectRecipeSensor+"</div>&nbsp;", false);
            }
            
            e.preventDefault();
            $scope.sensorBox = false;
            //$scope.textvalue = angular.element('.simditor-body').html();
            //$scope.textvalue = angular.element('#getrecipeuserinputvalue').html();
           /* $scope.editor = $scope.editor + " <span class='label label-success receipeSensor' readonly>" + $scope.selectRecipeSensor + "</span>&nbsp;" + " ";*/
            //$scope.myHtmlVar = $scope.textvalue + " <span class='label label-success receipeParameter' readonly>" + $scope.selectRecipeSensor + "</span>&nbsp;" + " ";
        }

        $scope.recipeSensorCancel = function (e) {
            e.preventDefault();
            $scope.sensorBox = false;
        }



        //$scope.parameterList = ['Temperature', 'Pressure', 'Humidity', 'Paddle Speed'];

        $scope.addProductItem = function () {
            $scope.productProfileItems.push({
                id: null,
                selectedParameter: '',
                subType: '',
                thresholdValue: '',
                target: '',
                criticality: '',
                uom: 'UOM'
            })
        }

        $scope.removeProductItem = function (index) {
            $scope.productProfileItems.splice(index, 1);
        }

        $scope.onSubmitAddReceipe = function () {

            var htmldata = angular.element('#getrecipeuserinputvalue').html();
            var data = {
                "i_RECIPE_NAME": $scope.addReceipeData.name,
                "i_RECIPE_TYPE": $scope.addReceipeData.type,
                "i_ITEM_ID": $scope.addReceipeData.targetMaterial,
                "i_TARGET_MATERIAL":$scope.addReceipeData.targetMaterial,
                "i_RECIPE_ID": receipe_id,
                "i_EXPECTED_UOM": $scope.addReceipeData.selectedExpectedYield,
                "i_EXPECTED_VALUE": $scope.addReceipeData.expectedYieldValue,
                "i_DESCRIPTION": $scope.addReceipeData.Description,
                "i_RECIPE_PROCESS": htmldata,
                "i_CREATED_BY": "admin",
                "i_CREATION_DATE": currentdate,
                "i_LAST_UPDATED_DATE": currentdate,
                "i_LAST_UPDATED_BY": "admin",
                "i_IMAGE": $scope.uploadme.src
            }
            for (var i = 1; i <= 30; i++) {
                var key1 = "i_RECIPE_PARAM_ID_" + i;
                var key2 = "i_PRODUCT_PARAMETER_" + i;
                var key3 = "i_THRESHOLD_" + i;
                var key4 = "i_TARGET_" + i;
                var key5 = "i_CRITICALITY_" + i;
                var key6 = "i_UOM_" + i;
                var key7 = "i_TYPE_" + i;
                var dataCount = i - 1;

                $scope.productProfileItems.forEach(function (value, index) {
                    if (index + 1 == i) {
                        data[key1] = value.id;
                        data[key2] = value.selectedParameter;
                        data[key3] = value.thresholdValue;
                        data[key4] = value.target;
                        data[key5] = value.criticality;
                        data[key6] = value.uom;
                        data[key7] = value.subType;
                    } else if (i > index + 1) {
                        data[key1] = "";
                        data[key2] = "";
                        data[key3] = "";
                        data[key4] = "";
                        data[key5] = "";
                        data[key6] = "";
                        data[key7] = "";
                    }
                })


            }

            console.log(JSON.stringify(data));
            var form = $scope.addForm;
            //Force the field validation
            angular.forEach(form, function (obj) {
                if (angular.isObject(obj) && angular.isDefined(obj.$setDirty))

                {

                    obj.$setDirty();
                }
            })

            if ($scope.addForm.$valid) {


                getService.addReceipe(data).then(function (response) {

                    $state.go('nav.recipes');
                    
                });


            }

        }

}]);

    angular.module('tracehive.controller.report', [])
        .controller('reportsCtrl', ['$scope', '$rootScope', '$state', 'getService', '$http', '$window', function ($scope, $rootScope, $state, getService, $http, $window) {
     
            $scope.isActive = false;
            $scope.expandReport = function () {
                $scope.isActive = !$scope.isActive;
            }
            
            $scope.expandReport2 = function () {
                $scope.isActive2 = !$scope.isActive2;
            }
            
            $scope.expandReport3 = function () {
                $scope.isActive3 = !$scope.isActive3;
            }
            
            $scope.userslist = []; 
            $scope.badgelist = [];
            $scope.dateObjects=[];
            $scope.samplesObjects=[];
            $scope.weekendSampleObjects=[];
            
            
            getService.getAllUser().then(function (data) {
                $scope.userslist = data.response;
                $scope.selectedUser = data.response[0].USER_ID;
                
                
            getService.getBadgeGraphData($scope.selectedUser).then(function (data) {
                $scope.badgelist = data.response;
                console.log(JSON.stringify($scope.badgelist));
                angular.forEach(data.response, function (obj) {
                    $scope.dateObjects.push(obj.DATE);
                    if(obj.DAY == 'Saturday' || obj.DAY == 'Sunday')
                        {
                            var weekendCount = parseInt(obj.inventory_sample_count)+parseInt(obj.workorder_sample_count);
                            $scope.weekendSampleObjects.push(weekendCount);
                        }
                    else
                        {
                            var weekdaysCount = parseInt(obj.inventory_sample_count)+parseInt(obj.workorder_sample_count);
                            $scope.samplesObjects.push(weekdaysCount);
                        }
                })
                
                
                console.log(JSON.stringify($scope.dateObjects));
                console.log(JSON.stringify($scope.samplesObjects));
                
                    $('#badgeChart').highcharts({
                chart: {
                    type: 'column'
                },
                title: {
                    text: ''
                },
                subtitle: {
                    text: ''
                },
                xAxis: {
                    categories:$scope.dateObjects,
                    title: 'Badge in/out Normal shift time slots'

                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'No of samples tested'
                    }
                },
                //tooltip: { enabled: false },
                /*plotOptions: {
                    column: {
                        pointPadding: 0.2,
                        borderWidth: 0
                    }
                },*/
                series: [{
                    name: 'Weekend Shifts',
                    data: $scope.weekendSampleObjects,
                    color:'#f96168'

                }, {
                    name: 'Normal Shifts',
                    data: $scope.samplesObjects,
                    color:'#1a69f4'

                }]
            });

            });
            
                //console.log(JSON.stringify($scope.userslist));

            });
            
            $scope.getBadgeData = function(user){
                $scope.badgelist = [];
                $scope.dateObjects=[];
                $scope.samplesObjects=[]
                $scope.weekendSampleObjects=[];
            
               getService.getBadgeGraphData(user).then(function (data) {
                $scope.badgelist = data.response;
                angular.forEach(data.response, function (obj) {
                    $scope.dateObjects.push(obj.DATE);
                     if(obj.DAY == 'Saturday' || obj.DAY == 'Sunday')
                        {
                            var weekendCount = parseInt(obj.inventory_sample_count)+parseInt(obj.workorder_sample_count);
                            $scope.weekendSampleObjects.push(weekendCount);
                        }
                    else
                        {
                            var weekdaysCount = parseInt(obj.inventory_sample_count)+parseInt(obj.workorder_sample_count);
                            $scope.samplesObjects.push(weekdaysCount);
                        }
                })
                
                
                console.log(JSON.stringify($scope.badgelist));
                console.log(JSON.stringify($scope.dateObjects));
                
                    $('#badgeChart').highcharts({
                chart: {
                    type: 'column'
                },
                title: {
                    text: ''
                },
                subtitle: {
                    text: ''
                },
                xAxis: {
                    categories:$scope.dateObjects,
                    crosshair: true,
                    title: 'Badge in/out Normal shift time slots'

                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'No of samples tested'
                    }
                },
                //tooltip: { enabled: false },
                /*plotOptions: {
                    column: {
                        pointPadding: 0.2,
                        borderWidth: 0
                    }
                },
                */series: [{
                    name: 'Weekend Shifts',
                    data: $scope.weekendSampleObjects,
                    color:'#f96168'

                }, {
                    name: 'Normal Shifts',
                    data: $scope.samplesObjects,
                    color:'#1a69f4'

                }]
            });

            });
             
            }
            
            
            $scope.SelectedSensor="Touch Sensor";
            
            
            
                var data =  [/* 2016-06-01 */[1464739200000, 11.3, 17.9],[1464825600000, 11.4, 21.3],[1464912000000, 9.7, 25.9],
[1464998400000, 9.5, 25.2],[1465084800000, 7.3, 24.3],[1465171200000, 9.2, 25.8],[1465257600000, 10.2, 23.2],
[1465344000000, 8.5, 21.5],[1465430400000, 2.8, 19.4],[1465516800000, 5.0, 20.1],[1465603200000, 4.2, 18.8],[1465689600000, 6.0, 19.7],
[1465776000000, 5.3, 21.2],[1465862400000, 6.0, 24.9],[1465948800000, 7.3, 24.2],[1466035200000, 10.0, 21.2],[1466121600000, 10.0, 18.5],
[1466208000000, 9.7, 21.6],[1466294400000, 6.7, 19.0],[1466380800000, 3.6, 17.0],[1466467200000, 11.1, 18.2],[1466553600000, 11.3, 16.3],
[1466640000000, 11.9, 21.0],[1466726400000, 9.3, 17.9],[1466812800000, 13.7, 17.6],[1466899200000, 11.4, 15.2],[1466985600000, 11.8, 15.6],
[1467072000000, 8.8, 15.8],[1467158400000, 6.1, 17.4],[1467244800000, 11.4, 18.3],/* 2016-07-01 */[1467331200000, 10.4, 17.0],
[1467417600000, 10.2, 16.7],[1467504000000, 8.7, 15.5],[1467590400000, 9.5, 16.5],[1467676800000, 9.6, 18.4],[1467763200000, 11.0, 13.7],
[1467849600000, 8.7, 16.6],[1467936000000, 10.4, 18.9],[1468022400000, 11.9, 15.6],[1468108800000, 6.2, 16.9],[1468195200000, 12.8, 17.5],
[1468281600000, 13.8, 18.4],[1468368000000, 14.0, 21.1],[1468454400000, 11.9, 19.9],[1468540800000, 13.4, 19.5],[1468627200000, 10.7, 16.7],
[1468713600000, 9.8, 12.8],[1468800000000, 10.7, 16.7],[1468886400000, 8.7, 13.6],[1468972800000, 12.7, 24.5],[1469059200000, 12.9, 27.1],
[1469145600000, 16.0, 22.5],[1469232000000, 13.8, 24.9],[1469318400000, 14.6, 23.7],[1469404800000, 14.5, 20.7],[1469491200000, 13.8, 19.0],
[1469577600000, 12.7, 16.6],[1469664000000, 10.7, 16.3],[1469750400000, 11.4, 15.9],[1469836800000, 11.7, 16.2],[1469923200000, 10.9, 15.2],
/* 2016-08-01 */[1470009600000, 10.5, 16.3],[1470096000000, 11.1, 15.4],[1470182400000, 10.5, 18.9],[1470268800000, 12.2, 18.4],
[1470355200000, 11.6, 19.2],[1470441600000, 11.3, 15.1],[1470528000000, 8.3, 15.0],[1470614400000, 11.4, 16.0],[1470700800000, 10.7, 13.6],
[1470787200000, 7.1, 11.6],[1470873600000, 6.0, 15.3],[1470960000000, 4.7, 10.4],[1471046400000, 10.4, 13.7],[1471132800000, 11.7, 16.5],
[1471219200000, 10.3, 18.5],[1471305600000, 8.7, 20.6],[1471392000000, 9.6, 21.3],[1471478400000, 10.3, 22.0],[1471564800000, 11.2, 19.9],
[1471651200000, 9.2, 20.0],[1471737600000, 11.8, 21.7],[1471824000000, 10.4, 20.9],[1471910400000, 14.7, 20.5],[1471996800000, 14.6, 16.0],
[1472083200000, 13.8, 19.7],[1472169600000, 12.6, 17.6],[1472256000000, 11.4, 15.3],[1472342400000, 9.7, 16.8],
[1472428800000, 10.3, 16.3],[1472515200000, 10.3, 15.2],[1472601600000, 12.7, 19.0],/* 2016-09-01 */[1472688000000, 12.2, 15.4],
[1472774400000, 10.9, 13.8],[1472860800000, 10.4, 14.4],[1472947200000, 7.0, 17.0],[1473033600000, 6.1, 19.4],[1473120000000, 15.0, 21.6],
[1473206400000, 12.3, 17.4],[1473292800000, 11.6, 18.3],[1473379200000, 13.5, 18.9],[1473465600000, 12.4, 18.8],[1473552000000, 10.4, 17.4],
[1473638400000, 6.9, 17.1],[1473724800000, 10.3, 19.3],[1473811200000, 12.3, 15.7],[1473897600000, 13.2, 19.8],[1473984000000, 11.8, 20.4],
[1474070400000, 14.7, 18.1],[1474156800000, 11.5, 18.7],[1474243200000, 10.8, 18.4],[1474329600000, 9.4, 17.0],
[1474416000000, 11.5, 16.4],[1474502400000, 12.1, 15.1],[1474588800000, 7.7, 16.1],[1474675200000, 7.4, 11.8],[1474761600000, 10.2, 18.4],
[1474848000000, 8.8, 16.7],[1474934400000, 9.0, 12.1],[1475020800000, 7.8, 12.0],[1475107200000, 8.1, 12.4],[1475193600000, 6.2, 9.9],
/* 2016-10-01 */[1475280000000, 4.7, 10.3],[1475366400000, 2.5, 11.2],[1475452800000, 0.4, 11.1],[1475539200000, 0.6, 11.4],[1475625600000, 0.4, 10.8],[1475712000000, -0.4, 10.6],[1475798400000, 1.9, 13.8],[1475884800000, 1.2, 11.3],[1475971200000, -1.2, 9.3],[1476057600000, 0.7, 10.1],
[1476144000000, -0.3, 9.5],[1476230400000, -2.3, 8.0],[1476316800000, -2.6, 6.6],[1476403200000, -1.8, 8.2],[1476489600000, -0.1, 9.2],
[1476576000000, 2.1, 9.4],[1476662400000, 1.1, 11.0],[1476748800000, 5.4, 13.8],[1476835200000, 1.7, 10.7],[1476921600000, 0.4, 8.7],
[1477008000000, -1.5, 8.2],[1477094400000, -1.8, 8.6],[1477180800000, 3.5, 7.7],[1477267200000, 2.3, 9.8]]
                    
                var data2 =  [[1456794000000, -0.6, 2.7],[1456880400000, -2.0, 4.0],[1456966800000, -2.6, 1.1],[1457053200000, -0.7, 4.1],
[1457139600000, -2.1, 3.8],[1457226000000, -3.2, 3.2],[1457312400000, -5.0, 2.6],[1457398800000, -7.2, 2.5],[1457485200000, -3.7, 1.6],
[1457571600000, -2.5, 4.1],[1457658000000, -3.6, 3.8],[1457744400000, -2.8, 2.9],[1457830800000, 0.4, 2.5],[1457917200000, 1.9, 4.4],
[1458003600000, 1.6, 5.6],[1458090000000, -0.2, 5.5],[1458176400000, 0.2, 8.3],[1458262800000, 3.9, 7.1],[1458349200000, 4.4, 7.4],
[1458435600000, 4.5, 6.7],[1458522000000, 1.9, 8.0],[1458608400000, 3.6, 6.0],[1458694800000, -0.8, 6.9],[1459123200000, 4.7, 10.9],
[1459209600000, 4.0, 10.5],[1459296000000, -2.1, 7.7],[1459382400000, -0.3, 4.7],/* 2016-04-01 */[1459468800000, 1.5, 5.6],[1459555200000, 1.5, 7.2],[1459641600000, 0.5, 8.9],[1459728000000, 4.2, 13.0],[1459814400000, 5.3, 7.9],[1459900800000, 3.6, 7.3],[1459987200000, 3.6, 10.3],
[1460073600000, -0.2, 9.8],[1460160000000, -2.2, 9.3],[1460246400000, -2.6, 10.3],[1460332800000, -0.5, 11.3],[1460419200000, -0.6, 10.7],
[1460505600000, -1.1, 10.6],[1460592000000, 3.4, 10.8],[1460678400000, 1.9, 6.4],[1460764800000, 0.3, 9.6],[1460851200000, -1.9, 9.5],
[1460937600000, 3.5, 7.6],[1461024000000, 3.4, 8.8],[1461110400000, 5.0, 8.9],[1461196800000, 5.1, 7.4],[1461283200000, 3.9, 6.7],
[1461369600000, -0.9, 5.9],[1461456000000, -3.6, 7.8],[1461542400000, -3.3, 6.0],[1461628800000, -1.5, 9.1],[1461715200000, -2.4, 10.8],
[1461801600000, -0.3, 10.7],[1461888000000, 2.9, 11.7],[1461974400000, 1.5, 13.4],/* 2016-05-01 */[1462060800000, 2.8, 10.5],
[1462147200000, 5.2, 10.6],[1462233600000, 6.2, 10.1],[1462320000000, 7.0, 13.8],[1462406400000, 8.1, 15.2],[1462492800000, 8.8, 14.2],
[1462579200000, 7.4, 16.3],[1462665600000, 8.7, 21.1],[1462752000000, 5.5, 21.3],[1462838400000, 6.8, 19.4],[1462924800000, 5.3, 20.0],
[1463011200000, 5.1, 15.2],[1463097600000, 2.8, 11.1],[1463184000000, 1.5, 11.6],[1463270400000, 0.2, 14.7],[1463356800000, -0.3, 13.5],
[1463443200000, 6.3, 12.5],[1463529600000, 5.3, 9.1],[1463616000000, 6.2, 14.8],[1463702400000, 8.3, 10.3],[1463788800000, 6.6, 14.8],
[1463875200000, 9.1, 11.5],[1463961600000, 10.0, 14.0],[1464048000000, 4.3, 17.8],[1464134400000, 4.3, 20.3],[1464220800000, 3.4, 20.4],
[1464307200000, 3.8, 23.1],[1464393600000, 5.6, 14.7],[1464480000000, 5.2, 15.8],[1464566400000, 8.3, 15.9],[1464652800000, 11.9, 23.1],
/* 2016-06-01 */[1464739200000, 11.3, 17.9],[1464825600000, 11.4, 21.3],[1464912000000, 9.7, 25.9],[1464998400000, 9.5, 25.2],
[1465084800000, 7.3, 24.3],[1465171200000, 9.2, 25.8],[1465257600000, 10.2, 23.2],[1465344000000, 8.5, 21.5],[1465430400000, 2.8, 19.4],
[1465516800000, 5.0, 20.1],[1465603200000, 4.2, 18.8],[1465689600000, 6.0, 19.7],[1465776000000, 5.3, 21.2],[1465862400000, 6.0, 24.9],
[1465948800000, 7.3, 24.2],[1466035200000, 10.0, 21.2],[1466121600000, 10.0, 18.5],[1466208000000, 9.7, 21.6],[1466294400000, 6.7, 19.0],
[1466380800000, 3.6, 17.0],[1466467200000, 11.1, 18.2],[1466553600000, 11.3, 16.3],[1466640000000, 11.9, 21.0],[1466726400000, 9.3, 17.9],
[1466812800000, 13.7, 17.6],[1466899200000, 11.4, 15.2],[1466985600000, 11.8, 15.6],[1467072000000, 8.8, 15.8],[1467158400000, 6.1, 17.4],
[1467244800000, 11.4, 18.3],/* 2016-07-01 */[1467331200000, 10.4, 17.0],[1467417600000, 10.2, 16.7],[1467504000000, 8.7, 15.5],[1467590400000, 9.5, 16.5],[1467676800000, 9.6, 18.4],[1467763200000, 11.0, 13.7],[1467849600000, 8.7, 16.6],[1467936000000, 10.4, 18.9],[1468022400000, 11.9, 15.6],[1468108800000, 6.2, 16.9],[1468195200000, 12.8, 17.5],[1468281600000, 13.8, 18.4],[1468368000000, 14.0, 21.1],[1468454400000, 11.9, 19.9],
[1468540800000, 13.4, 19.5],[1468627200000, 10.7, 16.7],[1468713600000, 9.8, 12.8],[1468800000000, 10.7, 16.7],[1468886400000, 8.7, 13.6],
[1468972800000, 12.7, 24.5],[1469059200000, 12.9, 27.1],[1469145600000, 16.0, 22.5],[1469232000000, 13.8, 24.9],[1469318400000, 14.6, 23.7],
[1469404800000, 14.5, 20.7],[1469491200000, 13.8, 19.0],[1469577600000, 12.7, 16.6],[1469664000000, 10.7, 16.3],[1469750400000, 11.4, 15.9],
[1469836800000, 11.7, 16.2],[1469923200000, 10.9, 15.2]]
                
                //https://www.highcharts.com/samples/data/jsonp.php?filename=range.json&callback=?
                    var data1 = [[1467244800000, 6.6, 10.3], [1471046400000, 6.9, 10.1], [1474243200000, 8.5, 23.2], [1476489600000, -0.1, 6.0]]
                    var data3 = [[1459728000000, 6.6, 10.3]]
                    $('#chart1').highcharts({

                        chart: {
                            type: 'arearange',
                            zoomType: 'x'
                        },

                        title: {
                            text: ''
                        },

                        xAxis: {
                            type: 'datetime'
                        },

                        yAxis: {
                            title: {
                                text: null
                            }
                        },

                        tooltip: {
                            crosshairs: true,
                            shared: true,
                            valueSuffix: '°C'
                        },

                        legend: {
                            enabled: false
                        },

                        series: [{
                                name: 'Temperatures',
                                data: data
                        },
                            {
                                name: 'sensor',
                                type: 'scatter',
                                data: data1,
                                "color": '#FFA500'

        }]

                    });
 $scope.OnChange= function(sensor){
     
     if(sensor == "Touch Sensor"){
           
                    $('#chart1').highcharts({

                        chart: {
                            type: 'arearange',
                            zoomType: 'x'
                        },

                        title: {
                            text: ''
                        },

                        xAxis: {
                            type: 'datetime'
                        },

                        yAxis: {
                            title: {
                                text: null
                            }
                        },

                        tooltip: {
                            crosshairs: true,
                            shared: true,
                            valueSuffix: '°C'
                        },

                        legend: {
                            enabled: false
                        },

                        series: [{
                                name: 'Temperatures',
                                data: data
                        },
                            {
                                name: 'sensor',
                                type: 'scatter',
                                data: data1,
                                "color": '#FFA500'

        }]

                    });
     }else
         {
             $('#chart1').highcharts({

                        chart: {
                            type: 'arearange',
                            zoomType: 'x'
                        },

                        title: {
                            text: ''
                        },

                        xAxis: {
                            type: 'datetime'
                        },

                        yAxis: {
                            title: {
                                text: null
                            }
                        },

                        tooltip: {
                            crosshairs: true,
                            shared: true,
                            valueSuffix: '°C'
                        },

                        legend: {
                            enabled: false
                        },

                        series: [{
                                name: 'Temperatures',
                                data: data2
                        },
                            {
                                name: 'sensor',
                                type: 'scatter',
                                data: data3,
                                "color": '#FFA500'

        }]

                    });
         }

 }

            $(function () {
                $('#chart2').highcharts({
                    xAxis: {
                        min: -0.5,
                        max: 5.5
                    },
                    yAxis: {
                        min: 0
                    },
                    title: {
                        text: ''
                    },
                    series: [{
                        type: 'line',
                        name: '',
                        data: [[0, 1.11]],
                        marker: {
                            enabled: false
                        },
                        states: {
                            hover: {
                                lineWidth: 0
                            }
                        },
                        enableMouseTracking: false
        }, {
                        type: 'spline',
                        name: '',
                        data: [1, 1.5, 2.8, 3.5, 3.9, 4.2],
                        marker: {
                            radius: 4
                        }
        }]
                });
            });
            
        //    $(function () {
                
                
            
                
                
                
                
            /*    $('#badgeChart').highcharts({
        chart: {
            type: 'column'
        },
        title: {
            text: ''
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            categories:$scope.dateObjects,
            crosshair: true,
            title: 'Badge in/out Normal shift time slots'
            
        },
        yAxis: {
            min: 0,
            title: {
                text: 'No of samples tested'
            }
        },
        tooltip: { enabled: false },*/
       /*tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}&nbsp;-John</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },*/
        /*tooltip: {
        formatter: function() {
                    
                    if(this.series.name == 'Weekend Shifts' && this.y == 10 ){
                        return '<b>'+'John' +'</b><br/>'+
                        this.x +': '+ this.y + 'Samples';
                    }
                    if(this.series.name == 'Weekend Shifts' && this.y == 25 ){
                        return '<b>'+'Mark' +'</b><br/>'+
                        this.x +': '+ this.y + 'Samples';
                    } 
                }
            },*/
       /* plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: [{
            name: 'Weekend Shifts',
            data: [0,0],
            color:'#f96168'

        }, {
            name: 'Normal Shifts',
            data: $scope.samplesObjects,
            color:'#1a69f4'

        }]
    });*/
            //});

            $scope.expand = function () {
                x = $window.innerWidth
                y = $window.innerHeight

                if ($scope.fullContent) {
                    $scope.fullContent = false;
                    setTimeout(function () {

                        var scrollCon = document.getElementsByClassName('custom-scrollbar')[0];
                        scrollCon.setAttribute("style", "height:400px");
                        //var topoview = document.getElementById('topoView');
                        //topoview.setAttribute("style", "height:400px");
                    }, 500)
                } else {
                    $scope.fullContent = true;
                    setTimeout(function () {
                        var offsetHeight = document.getElementById('tabheight').offsetHeight;
                        offsetHeight = parseInt(offsetHeight) - 110;

                        var scrollCon = document.getElementsByClassName('custom-scrollbar')[0];
                        scrollCon.setAttribute("style", "height:" + offsetHeight + "px");
                        //var topoview = document.getElementById('topoView');
                        //topoview.setAttribute("style", "height:520px");
                    }, 500)
                }
            }


        }]);

    angular.module('tracehive.controller.notification', [])
        .controller('notificationsCtrl', ['$scope', '$rootScope', '$state', '$sce', function ($scope,  $rootScope, $state, $sce) {

            $scope.meesageheight = angular.element('.applicationContainer').height() - 70;

            $scope.equipments = ['Equipments TP 123456', 'Equipments TP 454542', 'Equipments TP 767532', 'Equipments TP 642311', 'Equipments TP 963233', 'Equipments TP 7531215', 'Equipments TP 233478', 'Equipments TP 5432672'];


            $scope.selectEquipemt;
            $scope.addNotifyEquipment = function (e) {
                e.preventDefault();
                $scope.equipmentBox = true;
            }

            $scope.equipmentAddDone = function (e) {
                e.preventDefault();
                $scope.equipmentBox = false;

                $scope.textvalue = angular.element('#getuserinputvalue').html();
                $scope.myHtmlVar = $scope.textvalue + " <span class='highlights' readonly>" + $scope.selectEquipemt + "</span>&nbsp;" + " ";
            }

            $scope.equipmentAddCancel = function (e) {
                e.preventDefault();
                $scope.equipmentBox = false;
            }

            $scope.materials = ['Material M2345', 'Material M76576', 'Material M97876', 'Material M45453', 'Material M7542', 'Material M42342', 'Material M23232', 'Material M97662'];

            $scope.addNotifyMaterial = function (e) {
                e.preventDefault();
                $scope.materialBox = true;
            }

            $scope.materialAddDone = function (e) {
                e.preventDefault();
                $scope.materialBox = false;

                $scope.textvalue = angular.element('#getuserinputvalue').html();
                $scope.myHtmlVar = $scope.textvalue + " <span class='highlights' readonly>" + $scope.selectmaterial + "</span>&nbsp;" + " ";

            }

            $scope.materialAddCancel = function (e) {
                e.preventDefault();
                $scope.materialBox = false;
            }

            $scope.workorders = ['WO75345', 'WO343423', 'WO43322', 'WO23232', 'WO66553', 'WO234343', 'WO12345', 'WO74232'];

            $scope.addNotifyWorkorder = function (e) {
                e.preventDefault();
                $scope.workorderBox = true;
            }

            $scope.workorderAddDone = function (e) {
                e.preventDefault();
                $scope.workorderBox = false;
                $scope.textvalue = angular.element('#getuserinputvalue').html();
                $scope.myHtmlVar = $scope.textvalue + " <span class='highlights' readonly>" + $scope.selectworkorder + "</span>&nbsp;" + " ";
            }

            $scope.workorderAddCancel = function (e) {
                e.preventDefault();
                $scope.workorderBox = false;
            }

            $scope.publishUserEntery = function () {

            }

}]);

    angular.module('tracehive.controller.location', [])
        .controller('addlocationCtrl', ['$scope', '$rootScope', 'getService', function ($scope, $rootScope, getService) {
            
    
}]);

    angular.module('tracehive.controller.mastermaterial', [])
        .controller('masterMaterialCtrl', ['$scope', '$rootScope', '$state', 'getService',  function ($scope, $rootScope, $state, getService) {

            $scope.addMatrialRow = false;
            $scope.actionBtn = false;
            $scope.afterEditMaterial = false;
            $scope.materialdetails = true;
            
            $scope.materialList=[];
            $scope.materialname = '';
            $scope.materialDesc = '';
            
            
            getService.getMaterial().then(function(response){
             $scope.materialList = response;
                //console.log(JSON.stringify($scope.materialList));
            })


            $scope.showAction = function (item) {
                item.loading = true;
            }
            $scope.hideAction = function (item) {
                item.loading = false;
            }

            $scope.addNewMaterial = function () {
                $scope.addMatrialRow = true;
            }
            $scope.closeAddMaterial = function () {
                $scope.addMatrialRow = false;
            }
            
            $scope.addItem = function () {
                if($scope.materialname != ''){
                    var data ={MATERIAL_NAME:$scope.materialname, DESCRIPTION: $scope.materialDesc}
                    if($scope.innerForm.$valid){
                    getService.addMaterial(data).then(function(response){
                        if(response.status =="success"){
                              $scope.materialList.push(data);
                              $scope.materialname = '';
                              $scope.materialDesc = '';
 
                            }
                    })
                    }
                }
                
            };
            $scope.getRandomSpan = function () {
                return Math.round((Math.random() * 10) * 1000);
            }
            //console.log($scope.getRandomSpan());

            $scope.editMaterial = function (index) {
                index.materialdetails = false;
            }
            $scope.saveEditMaterial = function (index) {
                index.materialdetails = true;
                if(index.MATERIAL_NAME != ''){
                var data ={MATERIAL_NAME:index.MATERIAL_NAME, DESCRIPTION: index.DESCRIPTION}
                    getService.editMaterial(index.MATERIAL_ID, data).then(function(response){
                        if(response.status =="success"){
                            }
                    })
                }
                    
            }
            $scope.removeMaterial = function (materialID) {
                angular.forEach($scope.materialList, function (value, index) {
                    if (value.MATERIAL_ID == materialID) {
                        getService.deleteMaterial(materialID).then(function (response) {});
                        $scope.materialList.splice(index, 1);
                    }
                })
                
                //$scope.materialList.items.splice(index, 1);
            }
            
             getService.getUserProfileById($rootScope.loggedInUserRole).then(function (response) {
                $scope.materialCreate = response.materialCreate;
				$scope.materialRead = response.materialRead;
				$scope.materialUpdate = response.materialUpdate;
				$scope.materialDelete = response.materialDelete;

            });


            
}]);


    angular.module('tracehive.controller.masteruom', [])
        .controller('masterUomCtrl', ['$scope', '$rootScope', '$state', 'getService',  function ($scope, $rootScope, $state, getService) {
            $scope.addUOMRow = false;
            $scope.edituom = true;
            $scope.datauom = false;

            $scope.addNewUom = function () {
                $scope.addUOMRow = true;
            }

            $scope.closeAddUom = function () {
                $scope.addUOMRow = false;
            }
            
            $scope.uomList=[];
            $scope.uomName = '';
            $scope.uomDesc = '';
            
            getService.getUom().then(function(response){
             $scope.uomList = response;
                //console.log(JSON.stringify($scope.uomList));
            })
            
            
            $scope.addUomItem = function () {
                if($scope.uomName != ''){
                    var data ={NAME:$scope.uomName, DESCRIPTION: $scope.uomDesc}
					if($scope.innerForm.$valid){
                    getService.addUom(data).then(function(response){
                        if(response.status =="success"){
                              $scope.uomList.push(data);
                              $scope.uomName = '';
                              $scope.uomDesc = '';
 
                            }
                    })
					}
                }
            }
 
               

            $scope.editUomItem = function () {
                $scope.edituom = false;
                $scope.datauom = true;
            }
            $scope.closeAddUom = function (index) {
                $scope.addUOMRow = false;
            }
            $scope.showAction = function (item) {
                item.loading = true;
            }
            $scope.hideAction = function (item) {
                item.loading = false;
            }
            $scope.editUomItem = function (index) {
                index.uomdetails = false;
            }
            $scope.saveEditUom = function (index) {
                
                if(index.NAME != ''){
                var data ={NAME:index.NAME, DESCRIPTION: index.DESCRIPTION}
                    getService.editUom(index.UOM_ID, data).then(function(response){
                        if(response.status =="success"){
                            }
                    })
                }
                index.uomdetails = true;
                
            }
            $scope.removeAddUom = function (uomID) {
                //$scope.uomList.items.splice(index, 1);
                angular.forEach($scope.uomList, function (value, index) {
                    if (value.UOM_ID == uomID) {
                        getService.deleteUom(uomID).then(function (response) {});
                        $scope.uomList.splice(index, 1);
                    }
                })

            }
            
            getService.getUserProfileById($rootScope.loggedInUserRole).then(function (response) {
                $scope.uomCreate = response.uomCreate;
				$scope.uomRead = response.uomRead;
				$scope.uomUpdate = response.uomUpdate;
				$scope.uomDelete = response.uomDelete;

            });

}]);

    angular.module('tracehive.controller.mastermanufature', [])
        .controller('masterManufatureCtrl', ['$scope', '$rootScope', '$state', 'getService', function ($scope, $rootScope, $state, getService) {
            $scope.addManufaturerRow = false;

            $scope.addNewManufaturer = function () {
                $scope.addManufaturerRow = true;
            }

            $scope.closeAddmanufaturer = function () {
                $scope.addManufaturerRow = false;
            }
            
            $scope.manufacturerList=[];
            $scope.manufaturername='';
            $scope.manufaturercode='';
            $scope.manufaturerdescription='';
            
            getService.getManufacturer().then(function(response){
             $scope.manufacturerList = response;
                //console.log(JSON.stringify($scope.manufacturerList));
            })
            
            
            $scope.addmanufaturerItem = function () {
                
                if($scope.manufaturername != '' && $scope.manufaturercode !=''){
                    var data ={MANUFACTURER_CODE:$scope.manufaturercode,MANUFACTURER_NAME:$scope.manufaturername, DESCRIPTION: $scope.manufaturerdescription}
                    if($scope.innerForm.$valid){
					getService.addManufacturer(data).then(function(response){
                        //alert(JSON.stringify(response))
                        if(response.status =="success"){
                              $scope.manufacturerList.push(data);
                                $scope.manufaturername='';
                                $scope.manufaturercode='';
                                $scope.manufaturerdescription='';
            
                            }
                    })
					}
                }
                
            };
            $scope.showAction = function (item) {
                item.loading = true;
            }
            $scope.hideAction = function (item) {
                item.loading = false;
            }
            $scope.closeAddManufaturer = function (index) {
                $scope.addManufaturerRow = false;
            }
            $scope.editManufaturerItem = function (index) {
                index.manufacturerdetails = false;
            }
            $scope.saveEditManufaturer = function (index) {
                //alert(JSON.stringify(index));
                if(index.MANUFACTURER_NAME != '' && index.MANUFACTURER_CODE != ''){
                    var data ={MANUFACTURER_CODE:index.MANUFACTURER_CODE,MANUFACTURER_NAME:index.MANUFACTURER_NAME, DESCRIPTION: index.DESCRIPTION}
                    getService.editManufacturer(index.MANUFACTURER_ID, data).then(function(response){
                        //alert(JSON.stringify(response))
                        if(response.status =="success"){
                               
                            }
                    })
                }
                index.manufacturerdetails = true;
            }
            $scope.removeAddManufaturer = function (manuID) {
                angular.forEach($scope.manufacturerList, function (value, index) {
                    if (value.MANUFACTURER_ID == manuID) {
                        getService.deleteManufacturer(manuID).then(function (response) {});
                        $scope.manufacturerList.splice(index, 1);
                    }
                })

                //$scope.manufacturerList.items.splice(index, 1);
            }
            
            getService.getUserProfileById($rootScope.loggedInUserRole).then(function (response) {
                $scope.manufacturerCreate = response.manufacturerCreate;
				$scope.manufacturerRead = response.manufacturerRead;
				$scope.manufacturerUpdate = response.manufacturerUpdate;
				$scope.manufacturerDelete = response.manufacturerDelete;

            });

    }]);

    angular.module('tracehive.controller.mastermodel', [])
        .controller('masterModelCtrl', ['$scope', '$rootScope', '$state', 'getService', function ($scope, $rootScope, $state, getService) {
            $scope.addModelRow = false;

            $scope.addNewModel = function () {
                $scope.addModelRow = true;
            }

            $scope.closeAddmodel = function () {
                $scope.addModelRow = false;
            }
            
            $scope.manufacturerList=[];
            
            getService.getManufacturer().then(function(response){
             $scope.manufacturerList = response;
                //console.log(JSON.stringify($scope.manufacturerList));
            })
            
                   
            
            $scope.modelList = [];
            $scope.selectedManufactureItemvalue ='';
            $scope.modelnumber='';
            $scope.modelname='';
            
            getService.getModel().then(function(response){
             $scope.modelList = response;
                //console.log(JSON.stringify($scope.modelList));
            })
            
            
            
            $scope.addmodelItem = function () {
                
                if($scope.modelnumber != '' && $scope.modelname !='' && $scope.selectedManufactureItemvalue!=''){
                    var data ={MODEL_NUMBER:$scope.modelnumber,MODEL_NAME:$scope.modelname, MANUFACTURER_ID: $scope.selectedManufactureItemvalue}
				   if($scope.innerForm.$valid){
				   getService.addModel(data).then(function(response){
                        //alert(JSON.stringify(response))
                        if(response.status =="success"){
                              $scope.modelList.push(data);
                                $scope.selectedManufactureItemvalue = '';
                                $scope.modelname = '';
                                $scope.modelnumber = '';
                            }
                    })
					}
                }
                

                
            };
            $scope.showAction = function (item) {
                item.loading = true;
            }
            $scope.hideAction = function (item) {
                item.loading = false;
            }
            $scope.closeAddModel = function (index) {
                $scope.addModelRow = false;
            }
            $scope.editModelItem = function (index) {
                index.modeldetails = false;
            }
            $scope.saveEditModel = function (index) {
                if(index.MODEL_NUMBER != '' && index.MODEL_NAME !='' && index.MANUFACTURER_ID !=''){
                    var data ={MODEL_NUMBER:$scope.modelnumber,MODEL_NAME:$scope.modelname, MANUFACTURER_ID: $scope.selectedManufactureItemvalue}
                    getService.editModel(index.MODEL_ID, data).then(function(response){
                        //alert(JSON.stringify(response))
                        if(response.status =="success"){
                              
                            }
                    })
                }
                
                index.modeldetails = true;
            }
            $scope.removeAddModel = function (modelID) {
                //$scope.modelList.items.splice(index, 1);
                angular.forEach($scope.modelList, function (value, index) {
                    if (value.MODEL_ID == modelID) {
                        getService.deleteModel(modelID).then(function (response) {});
                        $scope.modelList.splice(index, 1);
                    }
                })

            }
            
            getService.getUserProfileById($rootScope.loggedInUserRole).then(function (response) {
                $scope.modelCreate = response.modelCreate;
				$scope.modelRead = response.modelRead;
				$scope.modelUpdate = response.modelUpdate;
				$scope.modelDelete = response.modelDelete;

            });

        }]);

    angular.module('tracehive.controller.masterlocation', [])
        .controller('masterlocationCtrl', ['$scope', '$rootScope', 'getService', function ($scope, $rootScope, getService) {
            
            
            $scope.addLocationRow = false;

            $scope.addNewLocation = function () {
                $scope.addLocationRow = true;
            }

            $scope.closeAddLocation = function () {
                $scope.addLocationRow = false;
            }
            
            $scope.locationList=[];
            $scope.countryname='';
            $scope.cityname='';
            $scope.address1='';
            $scope.address2='';
            $scope.address3='';
            $scope.address4='';
            
            getService.getLocation().then(function(response){
             $scope.locationList = response;
                //console.log(JSON.stringify($scope.locationList));
            })
            
            
            $scope.addLocationItem = function () {
                
                if($scope.address1 != '' && $scope.cityname !='' && $scope.countryname !=''){
                    var data ={ADDRESS_LINE1:$scope.address1,ADDRESS_LINE2:$scope.address2, ADDRESS_LINE3: $scope.address3, ADDRESS_LINE4: $scope.address4, CITY:$scope.cityname, COUNTRY:$scope.countryname }
                    getService.addLocation(data).then(function(response){
                        //alert(JSON.stringify(response))
                        if(response.status =="success"){
                              $scope.locationList.push(data);
                                $scope.countryname='';
                                $scope.cityname='';
                                $scope.address1='';
                                $scope.address2='';
                                $scope.address3='';
                                $scope.address4='';

                            }
                    })
                }
                
            };
            $scope.showAction = function (item) {
                item.loading = true;
            }
            $scope.hideAction = function (item) {
                item.loading = false;
            }
            $scope.closeAddLocation = function (index) {
                $scope.addLocationRow = false;
            }
            $scope.editLocationItem = function (index) {
                index.locationdetails = false;
            }
            $scope.saveEditLocation = function (index) {
                if(index.ADDRESS_LINE1 != '' && index.CITY != '' && index.COUNTRY != ''){
                    var data ={ADDRESS_LINE1:index.ADDRESS_LINE1,ADDRESS_LINE2:index.ADDRESS_LINE2, ADDRESS_LINE3: index.ADDRESS_LINE3, ADDRESS_LINE4: index.ADDRESS_LINE4, CITY:index.CITY, COUNTRY:index.COUNTRY }
                    getService.editLocation(index.LOCATION_ID, data).then(function(response){
                        if(response.status =="success"){
                               
                            }
                    })
                }
                index.locationdetails = true;
            }
            $scope.removeAddLocation = function (locationID) {
                angular.forEach($scope.locationList, function (value, index) {
                    if (value.LOCATION_ID == locationID) {
                        getService.deleteLocation(locationID).then(function (response) {});
                        $scope.locationList.splice(index, 1);
                    }
                })

                //$scope.manufacturerList.items.splice(index, 1);
            }
            
            getService.getUserProfileById($rootScope.loggedInUserRole).then(function (response) {
                $scope.locationCreate = response.locationCreate;
				$scope.locationRead = response.locationRead;
				$scope.locationUpdate = response.locationUpdate;
				$scope.locationDelete = response.locationDelete;

            });
            
     
}]);

    angular.module('tracehive.controller.users', [])
        .controller('usersCtrl', ['$scope', '$rootScope', '$state', '$filter', 'PagerService', 'getService', function ($scope, $rootScope, $state, $filter, PagerService, getService) {
			/*Added by 5838*/
			$scope.selectedCityMenu=$rootScope.selectedCityMenu;
            $scope.$on('locationName', function (event, args) {
                 $scope.selectedCityMenu = args.name;
                 console.log($scope.selectedCityMenu);
                 applyFilter();
                 });
		
            $scope.userslist = []
            getService.getAllUser().then(function (data) {
                $scope.userslist = data.response;
                //console.log(JSON.stringify($scope.userslist));
                applyFilter();
            }); 
            
            var filteredUserslist = [], filteredUserByTopLocation = [];
            $scope.fpUserslist = [];
            $scope.search = function ($event) {
                if ($event.keyCode === 27) {
                    $scope.searchText = '';
                }
                applyFilter();
            }

            function applyFilter() {
                filteredUserslist = $filter('filter')($scope.userslist, $scope.searchText);
				filteredUserByTopLocation = $filter('filter')(filteredUserslist, ($scope.selectedCityMenu==='All Locations' ? undefined : {CITY: $scope.selectedCityMenu }));
				
                applyPagination();
            }

            function applyPagination() {
                $scope.pager = {};
                $scope.setPage = setPage;

                initPager();
                function initPager() {
                    $scope.setPage(1);
                }

                function setPage(page) {
                    if (page < 1 || page > $scope.pager.totalPages) {
                        return;
                    }
                    $scope.pager = PagerService.GetPager(Object.keys(filteredUserByTopLocation).length, page, 12);
                    $scope.fpUserslist = filteredUserByTopLocation.slice($scope.pager.startIndex, $scope.pager.endIndex + 1);
                }
            }
    
            getService.getUserProfileById($rootScope.loggedInUserRole).then(function (response) {
                $scope.userCreate = response.userCreate;
				$scope.userRead = response.userRead;
				$scope.userUpdate = response.userUpdate;
				$scope.userDelete = response.userDelete;

            });

    }]);

    angular.module('tracehive.controller.adduser', [])
        .controller('adduserCtrl', ['$scope', '$rootScope', '$state', 'getService', function ($scope, $rootScope, $state, getService) {
            $scope.uploadme = {};
            $scope.uploadme.src = '';


            getService.getAllCities().then(function (response) {
                $scope.locationList = response;
            });
            $scope.events = [];
            $scope.eventsEmptyArr = false;
            $scope.passwordCheck = false;
            $scope.locationSelectBtn = true;
            
            $scope.profileList =[];
            
            getService.getProfileData().then(function(response){
				console.log(JSON.stringify(response));
                $scope.profileList = response;
                
            })
            console.log(JSON.stringify($scope.profileList));


            $scope.addUserData = {};

            $scope.menu = [];
            getService.getAllLocations().then(function (response) {
                $scope.menu = {
                    title: 'Locations',
                    id: 'menuId',
                    items: response
                };
            })
            var editUserId = $.urlParam('id');
            if (editUserId) {
                getService.getUserById(editUserId).then(function(data){
                    console.log(JSON.stringify(data));
                     $scope.addUserData.first_name=data.response[0].FIRST_NAME;
                     $scope.addUserData.last_name =data.response[0].LAST_NAME;
                     $scope.addUserData.designation =data.response[0].DESIGNATION;
                     $scope.addUserData.email_id = data.response[0].PRIMARY_EMAIL_ID;
                     $scope.addUserData.work_phone =data.response[0].WORK_PHONE;
                     $scope.addUserData.cell_phone = data.response[0].CELL_PHONE;
                     $scope.addUserData.user_role = data.response[0].USER_ROLE;
                     $scope.addUserData.badge_id = data.response[0].BADGE_ID;
                     $scope.addUserData.is_active = data.response[0].IS_ACTIVE;
                     $scope.addUserData.user_name = data.response[0].USERNAME;
                     $scope.addUserData.password = data.response[0].PASSWORD;
                     $scope.addUserData.confirm_password = data.response[0].PASSWORD;
                     $scope.uploadme.src = data.response[0].IMAGE;
                    $scope.events[0] = data.response[0].COUNTRY;
                    $scope.events[1] = data.response[0].CITY;
                    if (data.response[0].ADDRESS_LINE1)
                        $scope.events[2] = data.response[0].ADDRESS_LINE1;
                    if (data.response[0].ADDRESS_LINE2)
                        $scope.events[3] = data.response[0].ADDRESS_LINE2;
                    if (data.response[0].ADDRESS_LINE3)
                        $scope.events[4] = data.response[0].ADDRESS_LINE3;

                    
                })
            }


            $scope.OnSubmitUser = function () {

                if ($scope.events.length == 0)
                    $scope.eventsEmptyArr = true;
                else
                    $scope.eventsEmptyArr = false;


                var data = {
                    i_FIRST_NAME: $scope.addUserData.first_name,
                    i_LAST_NAME: $scope.addUserData.last_name,
                    i_DESIGNATION: $scope.addUserData.designation,
                    i_PRIMARY_EMAIL_ID: $scope.addUserData.email_id,
                    i_WORK_PHONE: $scope.addUserData.work_phone,
                    i_CELL_PHONE: $scope.addUserData.cell_phone,
                    i_USER_ROLE: $scope.addUserData.user_role,
                    i_BADGE_ID:$scope.addUserData.badge_id,
                    i_COUNTRY: $scope.events[0] || null,
                    i_CITY: $scope.events[1] || null,
                    i_ADDR1: $scope.events[2] || null,
                    i_ADDR2: $scope.events[3] || null,
                    i_ADDR3: $scope.events[4] || null,
                    i_ADDR4: $scope.events[5] || null,
                    i_IS_ACTIVE: $scope.addUserData.is_active,
                    i_USERNAME: $scope.addUserData.user_name,
                    i_PASSWORD: $scope.addUserData.password,
                    i_CONFIRM_PWD: $scope.addUserData.confirm_password,
                    i_IMAGE: $scope.uploadme.src || '',
                    i_CREATED_BY: "admin",
                    i_LAST_UPDATED_BY: "admin",
                };




                if ($scope.addUserForm.$valid && !$scope.eventsEmptyArr) {
                    getService.addUser(data).then(function (response) {

                        $state.go('nav.users');
                        
                    });
                    
                }
                var form = $scope.addUserForm;
                //Force the field validation
                angular.forEach(form, function (obj) {
                    if (angular.isObject(obj) && angular.isDefined(obj.$setDirty)) {
                        obj.$setDirty();
                    }
                })
            }





            $scope.menu = [];
            getService.getAllLocations().then(function (response) {
                $scope.menu = {
                    title: 'Locations',
                    id: 'menuId',
                    items: response
                };
            });
            $scope.select = function (selected) {
                $scope.selected = selected
            }
            $scope.locationSelect = function () {
                $scope.locationSelect = false;
            }
            $scope.rest = {};
            $scope.rest.options = {
                containersToPush: [$('#pushobj')],
                direction: 'ltr',
                collapsed: false,
                fullCollapse: true,

                onGroupItemClick: function (event, item) {
                    $scope.eventsEmptyArr = false;
                    if ($scope.events[$scope.events.length - 1] != item.name) {
                        $scope.events.push(item.name);
                    } else {
                        event.preventDefault();
                    }
                },
                onItemClick: function (event, item) {
                    $scope.eventsEmptyArr = false;

                    if ($scope.events[$scope.events.length - 1] != item.name) {
                        $scope.events.push(item.name);
                    } else {
                        event.preventDefault();
                    }
                },
                onBackItemClick: function (event, item) {
                    return $scope.events.pop();
                }
            };

            $scope.locationDone = false;
            $scope.locationEditBtn = false;
            $scope.addmaterial = false;

            $scope.locationSelect = function () {
                $scope.location = true;
            }
            $scope.getlocation = '';
            $scope.locationSeleted = function (e) {
                e.preventDefault();
                $scope.locationDone = true;
                $scope.location = false;
                $scope.locationEditBtn = true;
                $scope.locationSelectBtn = false;

            }
            $scope.locationEdit = function (e) {
                e.preventDefault();
                $scope.rest.options.collapsed = true;
                $scope.location = true;
                $scope.locationDone = false;
            }

            $scope.locationCancel = function (e) {
                e.preventDefault();
                $scope.location = false;
            }





        }]);


    angular.module('tracehive.controller.machinerylogactivities', [])
        .controller('machinerylogactivitiesCtrl', ['$scope', '$rootScope', '$state', 'getService', function ($scope, $rootScope, $state, getService) {
            $scope.addLogActivity = {};
            var equipmentID = $.urlParam('id');
            var equipmentName = $.urlParam('name');
            
             $scope.UsersLists = []
            
            getService.getAllUser().then(function (data) {
                angular.forEach(data.response, function (obj) {
                    $scope.UsersLists.push(obj.USERNAME);
                })
            });

            $scope.workorderslist =[];
            getService.getAllWorkorder().then(function (response) {
                $scope.workorderslist = response;
                //console.log(JSON.stringify(response));
                
                
            });
            
            $scope.materials = [];
            getService.getMaterialList().then(function (response) {
                angular.forEach(response, function (obj) {
                    $scope.materials.push(obj.MATERIAL_NAME);
                });
            });
            
            
            $scope.events=[];
            getService.editMachinery(equipmentID).then(function (response) {
               // console.log(JSON.stringify(response));
                $scope.events[0] = response[0].country;
                $scope.events[1] = response[0].city;
                if (response[0].address_line1)
                    $scope.events[2] = response[0].address_line1;
                if (response[0].address_line2)
                    $scope.events[3] = response[0].address_line2;
                if (response[0].address_line3)
                    $scope.events[4] = response[0].address_line3;
               
            });

            $scope.expectedYieldTypes =[];
        
            getService.getUom().then(function(response){
                 angular.forEach(response, function (obj) {
                            $scope.expectedYieldTypes.push(obj.NAME);
                 })

                 //console.log(JSON.stringify($scope.uomList));
            })
            $scope.logActivityMaterialId1='';
			$scope.logActivityMaterialId2='';
            getService.getLogActivityLibrary(equipmentID).then(function (data) {

			//console.log(data);
                if (data.status == "success") {
                    $scope.addLogActivity.acivityid = data.response[0].ACTIVITY_ID;
                    $scope.addLogActivity.activityType = data.response[0].TYPE_OF_ACTIVITY;
                    $scope.addLogActivity.performedBy = data.response[0].PERFORMED_BY;
                    $scope.addLogActivity.checkedBy = data.response[0].CHECKED_BY;
                    $scope.addLogActivity.cleanedAfterWorkOrderId = data.response[0].CLEANING_UP_AFTER_WO;
                    $scope.addLogActivity.startDatetime = data.response[0].START_DATE;
                    $scope.addLogActivity.endDatetime = data.response[0].END_DATE;
                    $scope.addLogActivity.boiledOut = data.response[0].BOILED_OUT;
                    $scope.addLogActivity.rinsed = data.response[0].RINSED;
                    $scope.addLogActivity.availablityStatus = data.response[0].AVAILABLITY_STATUS;
                    $scope.addLogActivity.comments = data.response[0].COMMENTS;
                    
                    getService.getLogActivityMaterialById(data.response[0].ACTIVITY_ID).then(function(materialData){
						
						console.log(materialData);
						
                        $scope.addLogActivity.material1  = materialData.response[0].MATERIAL_NAME;
                        $scope.addLogActivity.qty1 = materialData.response[0].QUANTITY;
                        $scope.addLogActivity.actualyield1 = materialData.response[0].UOM;
                        $scope.addLogActivity.material2 = materialData.response[1].MATERIAL_NAME;
                        $scope.addLogActivity.qty2 = materialData.response[1].QUANTITY;
                        $scope.addLogActivity.actualyield2 = materialData.response[1].UOM;
						
						$scope.logActivityMaterialId1	= materialData.response[0].LOG_ACTIVITY_MATERIAL_ID;
						$scope.logActivityMaterialId2	= materialData.response[1].LOG_ACTIVITY_MATERIAL_ID;
                    });
                    
                    
                } /*else {
                    $scope.addQualificationData.eqipment_ID = equipmentID;
                   
                }*/
            });

            
            $scope.onSaveLogActivity = function(){
                console.log(JSON.stringify($scope.addLogActivity)); //
				
				var logActivityId=$scope.addLogActivity.acivityid;
				
				if(logActivityId){
					var i_activity_id=logActivityId;
					var i_activity_material_id1=$scope.logActivityMaterialId1;
					var i_activity_material_id2=$scope.logActivityMaterialId2;
				}else{
					var i_activity_id="";
					var i_activity_material_id1="NULL";
					var i_activity_material_id2="NULL";
				}
                var data ={
					"i_ACTIVITY_ID" : i_activity_id,
				   "i_ACTIVITY_CODE" : "",
                    "i_TYPE_OF_ACTIVITY" : $scope.addLogActivity.activityType,
                    "i_COUNTRY" : $scope.events[0], 
                    "i_CITY" : $scope.events[1],
                    "i_ADDR1" : $scope.events[2]||null, 
                    "i_ADDR2" : $scope.events[3]||null, 
                    "i_ADDR3" : $scope.events[4]||null,
                    "i_ADDR4" : $scope.events[5]||null,
                    "i_MACHINERY_ID":equipmentID,
                    "i_PERFORMED_BY" : $scope.addLogActivity.performedBy,
                    "i_CHECKED_BY" : $scope.addLogActivity.checkedBy,
                    "i_CLEANING_UP_AFTER_WO" : $scope.addLogActivity.cleanedAfterWorkOrderId,
                    "i_START_DATE" : moment($scope.addLogActivity.startDatetime).format('YYYY-MM-DD hh:mm:ss'),
                    "i_END_DATE" : moment($scope.addLogActivity.endDatetime).format('YYYY-MM-DD hh:mm:ss'),
                    "i_BOILED_OUT" : $scope.addLogActivity.boiledOut,
                    "i_RINSED" : $scope.addLogActivity.rinsed,
                    "i_AVAILABLITY_STATUS" : $scope.addLogActivity.availablityStatus,
                    "i_COMMENTS" : $scope.addLogActivity.comments,
                    "i_LOG_ACTIVITY_MATERIAL_ID1" : i_activity_material_id1,
                    "i_ACTIVITY_ID1" : "NULL",
                    "i_ACTIVITY_CODE1" : "",
                    "i_MATERIAL_NAME1" : $scope.addLogActivity.material1,
                    "i_QUANTITY1" : $scope.addLogActivity.qty1,
                    "i_UOM1" : $scope.addLogActivity.actualyield1,
                    "i_LOG_ACTIVITY_MATERIAL_ID2" : i_activity_material_id2,
                    "i_ACTIVITY_ID2" : "NULL",
                    "i_ACTIVITY_CODE2" : "",
                    "i_MATERIAL_NAME2" : $scope.addLogActivity.material2,
                    "i_QUANTITY2" : $scope.addLogActivity.qty2,
                    "i_UOM2" : $scope.addLogActivity.actualyield2
                    }
                
                
                    getService.addMachineryLogActivity(data).then(function (response) {
                        //alert(JSON.stringify(response));
                        $state.go('nav.machinery');
                        
                    });
                    
                   
                    
                }
   }]);

    angular.module('tracehive.controller.machineryaddqualification', [])
        .controller('machineryaddqualificationCtrl', ['$scope', '$rootScope', '$state', '$stateParams', 'getService', function ($scope, $rootScope, $state, $stateParams, getService) {

            var equipmentID = $.urlParam('id');
            var equipmentName = $.urlParam('name');

            $scope.addQualificationData = {};
            $scope.qualificationTypes = ['Installation', 'Operational', 'Performance'];
            $scope.UsersLists = [];

            getService.getAllUser().then(function (data) {
                angular.forEach(data.response, function (obj) {
                    $scope.UsersLists.push(obj.USERNAME);
                })
            });




            $scope.events=[];
            getService.editMachinery(equipmentID).then(function (response) {
               // console.log(JSON.stringify(response));
                $scope.events[0] = response[0].country;
                $scope.events[1] = response[0].city;
                if (response[0].address_line1)
                    $scope.events[2] = response[0].address_line1;
                if (response[0].address_line2)
                    $scope.events[3] = response[0].address_line2;
                if (response[0].address_line3)
                    $scope.events[4] = response[0].address_line3;
               
            });


            getService.getQualificationDetailsLibrary(equipmentID).then(function (data) {


                if (data.status == "success") {
                    $scope.addQualificationData.eqipment_ID = data.response[0].MACHINERY_ID;
                    $scope.addQualificationData.eqipment_Name = data.response[0].EQUIPMENT_NAME;
                    $scope.addQualificationData.qualification_Id = data.response[0].QUALIFICATION_ID;
                    $scope.addQualificationData.selectedQualificationType = data.response[0].TYPE_OF_QUALIFACATION;
                    $scope.addQualificationData.performedBy = data.response[0].PERFORMED_BY;
                    $scope.addQualificationData.startDatetime = data.response[0].START_DATE;
                    $scope.addQualificationData.endDatetime = data.response[0].END_DATE;
                    $scope.addQualificationData.containinventory = data.response[0].CAN_CONTAIN_INVENTORY;
                    $scope.addQualificationData.qualifiedStatus = data.response[0].QUALIFIED_STATUS;
                    $scope.addQualificationData.description = data.response[0].DESCRIPTION;
                } else {
                    $scope.addQualificationData.eqipment_ID = equipmentID;
                    $scope.addQualificationData.eqipment_Name = equipmentName;
                    $scope.addQualificationData.qualification_Id = " ";

                }
            });


            $scope.onSaveAddQualification = function () {
                if ($scope.events.length == 0)
                    $scope.eventsEmptyArr = true;
                else
                    $scope.eventsEmptyArr = false;



                var data = {
                    i_QUALIFICATION_ID:$scope.addQualificationData.qualification_Id||"",
                    i_EQUIPMENT_NAME: $scope.addQualificationData.eqipment_Name,
                    i_TYPE_OF_QUALIFACATION: $scope.addQualificationData.selectedQualificationType,
                    i_COUNTRY: $scope.events[0] || "",
                    i_CITY: $scope.events[1] || "",
                    i_ADDR1: $scope.events[2] || "",
                    i_ADDR2: $scope.events[3] || "",
                    i_ADDR3: $scope.events[4] || "",
                    i_ADDR4: $scope.events[5] || "",
                    i_PERFORMED_BY: $scope.addQualificationData.performedBy,
                    i_CAN_CONTAIN_INVENTORY: $scope.addQualificationData.containinventory,
                    i_START_DATE: moment($scope.addQualificationData.startDatetime).format('YYYY-MM-DD hh:mm:ss'),
                    i_END_DATE: moment($scope.addQualificationData.startDatetime).format('YYYY-MM-DD hh:mm:ss'),
                    i_QUALIFIED_STATUS: $scope.addQualificationData.qualifiedStatus,
                    i_DESCRIPTION: $scope.addQualificationData.description,
                    i_CREATED_BY: $rootScope.loggedInUserName,
                    i_LAST_UPDATED_BY: $rootScope.loggedInUserName,
                    i_MACHINERY_ID: $scope.addQualificationData.eqipment_ID
                }

                if (!$scope.eventsEmptyArr) {
                    getService.addMachineryQualification(data).then(function (response) {
                        
                        $state.go('nav.machinery');
                       
                    });
                    
                }

            }
   }]);


    angular.module('tracehive.controller.supplier', [])
        .controller('supplierCtrl', ['$scope', '$rootScope', '$state', 'getService', function ($scope, $rootScope, $state, getService) {
            $scope.suppliers = [];
            getService.getAllSupplier().then(function (response) {
                $scope.suppliers  = response;
               //console.log(JSON.stringify($scope.suppliers));
            });
            getService.getUserProfileById($rootScope.loggedInUserRole).then(function (response) {
                $scope.supplierCreate = response.supplierCreate;
				$scope.supplierRead = response.supplierRead;
				$scope.supplierUpdate = response.supplierUpdate;
				$scope.supplierDelete = response.supplierDelete;

            });
            
    }]);

    angular.module('tracehive.controller.masteraddsupplier', [])
        .controller('masteraddsupplierCtrl', ['$scope', '$rootScope', '$state', 'getService', '$filter', function ($scope, $rootScope, $state, getService, $filter) {
            
            var date = new Date();
            var currentdate = $filter('date')(new Date(), 'yyyy-MM-dd HH:mm:ss');
        
            
            $scope.OnSubmitSupplier = function (obj) {

            var data = {
                "i_SUPPLIER_CODE": obj.supplier_id || "NULL",
                "i_SUPPLIER_NAME": obj.supplier_name || "NULL",
                "i_ADDRESS_LINE1": obj.addressline1 || "NULL",
                "i_ADDRESS_LINE2": obj.addressline2 || "NULL",
                "i_ADDRESS_LINE3": obj.addressline3 || "NULL",
                "i_ADDRESS_LINE4": "NULL",
                "i_CITY": obj.city || "NULL",
                "i_COUNTRY": obj.country || "NULL",
                "i_PHONE_NUMBER": obj.mobileNumber || "NULL",
                "i_EMAIL_ADDRESS": obj.email || "NULL",
                "i_CONTACT_PERSON": obj.contact_person || "NULL",
                "i_ATTRIBUTE1": "NULL",
                "i_ATTRIBUTE2": "NULL",
                "i_ATTRIBUTE3": "NULL",
                "i_ATTRIBUTE4": "NULL",
                "i_ATTRIBUTE5": "NULL",
                "i_ATTRIBUTE6": "NULL",
                "i_ATTRIBUTE7": "NULL",
                "i_ATTRIBUTE8": "NULL",
                "i_ATTRIBUTE9": "NULL",
                "i_CREATION_DATE": currentdate,
                "i_CREATED_BY": "admin",
                "i_LAST_UPDATE_DATE": currentdate,
                "i_LAST_UPDATED_BY": "admin"
            }
            var config = {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
                }
            }
            getService.addSupplier(data).then(function (response) {
                $state.go('nav.supplier')
            });
                
                
        }
            $scope.onCancelSupplier = function(){
              $state.go('nav.supplier')  
            }

    }]);
    
    angular.module('tracehive.controller.samplelist', [])
        .controller('samplelistCtrl', ['$scope', '$rootScope', '$state', 'getService', function ($scope, $rootScope, $state, getService) {
            $scope.workorderID = $.urlParam('id');
            $scope.samplesList =[];
            $scope.parametersList =[];
            getService.getWorkorderSamplesById($scope.workorderID).then(function(response){
                $scope.samplesList = response;
            })
            
            $scope.parametersList=[];
            $scope.onGetParamtersList = function(sampleId)
            {
                $scope.parametersList=[];
                getService.getWorkorderParameterSamplesById(sampleId).then(function(response){
                $scope.parametersList = response;
                    console.log(JSON.stringify(response));
            })
            }
            
             $scope.deleteWorkorderSample = function (sampleID) {
                angular.forEach($scope.samplesList, function (value, index) {
                    if (value.SAMPLE_ID == sampleID) {
                        getService.deleteWoSampleById(sampleID).then(function (response) {});
                        $scope.samplesList.splice(index, 1);
                    }
                })
                $(".modal-backdrop").hide()
             }
             
             getService.getUserProfileById($rootScope.loggedInUserRole).then(function (response) {
                $scope.qualityCreate = response.qualityCreate;
				$scope.qualityRead = response.qualityRead;
				$scope.qualityUpdate = response.qualityUpdate;
				$scope.qualityDelete = response.qualityDelete;
            });
       

    }]);

    angular.module('tracehive.controller.createsample', [])
    
        .controller('createsampleinvCtrl', ['$scope', '$rootScope', '$state', '$filter', 'getService', function ($scope, $rootScope, $state, $filter, getService) {
            $scope.inventoryID = $.urlParam('id');
            $scope.SampleID    = $.urlParam('sampleid')||null;
            $scope.containerLocation ="";
            var date = new Date();
            var currentdate = $filter('date')(new Date(), 'yyyy-MM-dd HH:mm:ss');

            $scope.addSampleData={}
            $scope.addSampleData.operatorName = $rootScope.loggedInUserName;
            console.log($state);
            $scope.onCancelSample = function () {
                $state.go('nav.inventory')
            }


            getService.getAllCities().then(function (response) {
                $scope.locationList = response;
            });
            $scope.parameterList = [];
        $scope.parameterDataList = [];
        getService.getParameterList().then(function (response) {
            //console.log(JSON.stringify(response));
            $scope.parameterDataList = response;
            angular.forEach(response, function (obj) {
                $scope.parameterList.push(obj.PARAMETER_NAME);
            })
        });
            $scope.machineryList = [];
            $scope.MachineryDataList = [];
            getService.getMachinaryLibrary().then(function (response) {
                $scope.MachineryDataList = response;
                //console.log(JSON.stringify(response));
                angular.forEach(response, function (obj) {
                $scope.machineryList.push(obj.name);
            })
            });

            $scope.productProfileItems = [];
            $scope.addProductItem = function () {
                $scope.productProfileItems.push({
                    id: null,
                    selectedParameter: '',
                    subType: '',
                    thresholdValue: '',
                    target: '',
                    uom: '',
                    created_date:'',
                    updated_date:''
                })
            }
             $scope.removeProductItem = function (index) {
            $scope.productProfileItems.splice(index, 1);
        }
             $scope.getLocation = function(item)
             {
                 angular.forEach($scope.MachineryDataList, function (obj) {
                     if(obj.name == item)
                         {
                             
                             $scope.containerLocation = obj.country+ " "+ obj.city;
                         }
                     
                 });
             }

            $scope.getThresholdData = function (data, item) {

            angular.forEach($scope.parameterDataList, function (obj) {
                if (obj.PARAMETER_NAME == data) {
                    console.log(JSON.stringify(obj));
                    //item.id =1022;
                    item.selectedParameter = obj.PARAMETER_NAME;
                    item.thresholdValue = obj.MIN + " - " + obj.MAX + " " + obj.UNIT;
                    item.target = obj.TARGET;
                    item.subType = obj.SUB_TYPE;
                    item.uom = obj.UNIT;
                    //item.created_date = obj.CREATION_DATE;
                    //item.updated_date = obj.LAST_UPDATED_DATE;
                    item.setValueItems = [];
                    if (obj.SUB_TYPE == "String" || obj.SUB_TYPE == "Boolean") {
                        item.setValueItems = [];
                        if (obj.ATTRIBUTE_VALUE1 != null) item.setValueItems.push(obj.ATTRIBUTE_VALUE1)
                        if (obj.ATTRIBUTE_VALUE2 != null) item.setValueItems.push(obj.ATTRIBUTE_VALUE2)
                        if (obj.ATTRIBUTE_VALUE3 != null) item.setValueItems.push(obj.ATTRIBUTE_VALUE3)
                        if (obj.ATTRIBUTE_VALUE4 != null) item.setValueItems.push(obj.ATTRIBUTE_VALUE4)
                        if (obj.ATTRIBUTE_VALUE5 != null) item.setValueItems.push(obj.ATTRIBUTE_VALUE5)
                        if (obj.ATTRIBUTE_VALUE6 != null) item.setValueItems.push(obj.ATTRIBUTE_VALUE6)
                        if (obj.ATTRIBUTE_VALUE7 != null) item.setValueItems.push(obj.ATTRIBUTE_VALUE7)
                        if (obj.ATTRIBUTE_VALUE8 != null) item.setValueItems.push(obj.ATTRIBUTE_VALUE8)
                        if (obj.ATTRIBUTE_VALUE9 != null) item.setValueItems.push(obj.ATTRIBUTE_VALUE9)
                        if (obj.ATTRIBUTE_VALUE10 != null) item.setValueItems.push(obj.ATTRIBUTE_VALUE10)
                        if (obj.ATTRIBUTE_VALUE11 != null) item.setValueItems.push(obj.ATTRIBUTE_VALUE11)
                        if (obj.ATTRIBUTE_VALUE12 != null) item.setValueItems.push(obj.ATTRIBUTE_VALUE12)
                        if (obj.ATTRIBUTE_VALUE13 != null) item.setValueItems.push(obj.ATTRIBUTE_VALUE13)
                        if (obj.ATTRIBUTE_VALUE14 != null) item.setValueItems.push(obj.ATTRIBUTE_VALUE14)
                        if (obj.ATTRIBUTE_VALUE15 != null) item.setValueItems.push(obj.ATTRIBUTE_VALUE15)
                        if (obj.ATTRIBUTE_VALUE16 != null) item.setValueItems.push(obj.ATTRIBUTE_VALUE16)
                        if (obj.ATTRIBUTE_VALUE17 != null) item.setValueItems.push(obj.ATTRIBUTE_VALUE17)
                        if (obj.ATTRIBUTE_VALUE18 != null) item.setValueItems.push(obj.ATTRIBUTE_VALUE18)
                        if (obj.ATTRIBUTE_VALUE19 != null) item.setValueItems.push(obj.ATTRIBUTE_VALUE19)
                        if (obj.ATTRIBUTE_VALUE20 != null) item.setValueItems.push(obj.ATTRIBUTE_VALUE20)

                    }
                }
            })
        }
            
            if($scope.SampleID)
                {
                    getService.getInventoryParameterSamplesById($scope.SampleID).then(function (reponse){
                        angular.forEach(reponse, function (obj) {
                        $scope.productProfileItems.push({
                            id: obj.SAMPLE_INV_ID,
                            selectedParameter: obj.PARAMTERS,
                            subType: '',
                            thresholdValue: '',
                            target: obj.VALUE,
                            uom: obj.UOM,
                            created_date:obj.CREATION_DATE,
                            updated_date:obj.LAST_UPDATED_DATE                       
                            
                        })      
                        })
                    })
                    
                    getService.getInventorySampleDataById($scope.SampleID).then(function (response) {
                        
                        $scope.addSampleData.sampleName = response[0].SAMPLE_NAME;
                        $scope.addSampleData.sampleAmount = response[0].AMOUNT;
                        $scope.addSampleData.sampleUOM = response[0].UOM;
                        $scope.addSampleData.selectedContainer = response[0].CONTAINER_NAME;
                        $scope.containerLocation = response[0].CAONTAINER_LOCATION;
                        $scope.badgedatetime = response[0].ENTERED_DATE;
						$scope.addSampleData.status = response[0].STATUS;
                       
                    });
                }
            
            
            $scope.OnSubmitSample = function(){
                
                console.log(JSON.stringify($scope.productProfileItems));
                
                var data ={
                "i_INVENTORY_ID" : $scope.inventoryID,
                "i_SAMPLE_NAME" : $scope.addSampleData.sampleName,
                "i_SAMPLE_ID" : $scope.SampleID,
                "i_AMOUNT" : $scope.addSampleData.sampleAmount,
                "i_UOM" : $scope.addSampleData.sampleUOM,
                "i_ENTERED_DATE" :moment($scope.badgedatetime).format('YYYY-MM-DD hh:mm:ss'),
                "i_OPERATOR" : $scope.addSampleData.operatorName,
                "i_USER_ID":$rootScope.loggedInUserID,
                "i_USER_NAME":$scope.addSampleData.operatorName,
                "i_VALUE" : '',
                "i_CONTAINER_ID" : $scope.addSampleData.selectedContainer,
                "i_CONTAINER_NAME" : $scope.addSampleData.selectedContainer,
                "i_CAONTAINER_LOCATION" : $scope.containerLocation,
                "i_CREATION_DATE" : currentdate,
                "i_LAST_UPDATED_DATE" : currentdate, 
                "i_LAST_UPDATED_BY" : $scope.addSampleData.operatorName,
                "i_CREATED_BY" : $scope.addSampleData.operatorName,
				"i_STATUS" : $scope.addSampleData.status
                }
                
                for (var i = 1; i <= 10; i++) {
                var key1 = "i_SAMPLE_ID_" + i;
                var key2 = "i_SAMPLE_INV_ID_"  + i;
                var key3 = "i_PARAMTERS_" + i;
                //var key4 = "i_PARAMTERS_NEW_" + i;
                var key5 = "i_VALUE_" + i;
                //var key6 = "i_VALUE_NEW_" + i;
                var key7 = "i_UOM_" + i;
                //var key8 = "i_UOM_NEW_" + i;
                var key9 = "i_ENTERED_DATE_" + i;
                //var key10 = "i_ENTERED_DATE_NEW" + i;
                    

                $scope.productProfileItems.forEach(function (value, index) {
                    if (index + 1 == i) {
                        data[key1] = $scope.SampleID;
                        data[key2] = value.id||null;
                        data[key3] = value.selectedParameter;
                  //      data[key4] = 'NULL';
                        data[key5] = value.target;
                    //    data[key6] = 'NULL';
                        data[key7] = value.uom;
                      //  data[key8] = 'NULL';
                        data[key9] = value.created_date;
                        //data[key10] = value.updated_date;
                        
                    } else if (i > index + 1) {
                        data[key1] = 'NULL';
                        data[key2] = 'NULL';
                        data[key3] = 'NULL';
                        //data[key4] = 'NULL';
                        data[key5] = 'NULL';
                        //data[key6] = 'NULL';
                        data[key7] = 'NULL';
                        //data[key8] = 'NULL';
                        data[key9] = 'NULL';
                        //data[key10] = 'NULL';
                    }
                })

                //})


            }
                console.log(JSON.stringify(data));
                getService.CreateSampleInventory(data).then(function (response) {
                    $state.go('nav.inventory')
                });

            }


            
            
    }])
        .controller('createsampleCtrl', ['$scope', '$rootScope', '$state', '$filter', 'getService', function ($scope, $rootScope, $state, $filter, getService) {
            $scope.workorderID = $.urlParam('id');
            $scope.SampleID    = $.urlParam('sampleid')||null;
            $scope.containerLocation="";
            var date = new Date();
            var currentdate = $filter('date')(new Date(), 'yyyy-MM-dd HH:mm:ss');

            $scope.addSampleData={}
            $scope.addSampleData.operatorName = $rootScope.loggedInUserName;
            console.log($state);
            $scope.onCancelSample = function () {
                $state.go('nav.samplelist')
            }


            getService.getAllCities().then(function (response) {
                $scope.locationList = response;
            });
            $scope.parameterList = [];
        $scope.parameterDataList = [];
        getService.getParameterList().then(function (response) {
            //console.log(JSON.stringify(response));
            $scope.parameterDataList = response;
            angular.forEach(response, function (obj) {
                $scope.parameterList.push(obj.PARAMETER_NAME);
            })
        });
            $scope.machineryList = [];
            $scope.MachineryDataList = [];
            getService.getMachinaryLibrary().then(function (response) {
                $scope.MachineryDataList = response;
                //console.log(JSON.stringify(response));
                angular.forEach(response, function (obj) {
                $scope.machineryList.push(obj.name);
            })
            });

            $scope.productProfileItems = [];
            $scope.addProductItem = function () {
                $scope.productProfileItems.push({
                    id: null,
                    selectedParameter: '',
                    subType: '',
                    thresholdValue: '',
                    target: '',
                    uom: '',
                    created_date:'',
                    updated_date:''
                })
            }
             $scope.removeProductItem = function (index) {
            $scope.productProfileItems.splice(index, 1);
        }
             $scope.getLocation = function(item)
             {
                 angular.forEach($scope.MachineryDataList, function (obj) {
                     if(obj.name == item)
                         {
                             
                             $scope.containerLocation = obj.country+ " "+ obj.city;
                         }
                     
                 });
             }

            $scope.getThresholdData = function (data, item) {

            angular.forEach($scope.parameterDataList, function (obj) {
                if (obj.PARAMETER_NAME == data) {
                    console.log(JSON.stringify(obj));
                    //item.id =null;
                    item.selectedParameter = obj.PARAMETER_NAME;
                    item.thresholdValue = obj.MIN + " - " + obj.MAX + " " + obj.UNIT;
                    item.target = obj.TARGET;
                    item.subType = obj.SUB_TYPE;
                    item.uom = obj.UNIT;
                   // item.created_date = obj.CREATION_DATE;
                    //item.updated_date = obj.LAST_UPDATED_DATE;
                    item.setValueItems = [];
                    if (obj.SUB_TYPE == "String" || obj.SUB_TYPE == "Boolean") {
                        item.setValueItems = [];
                        if (obj.ATTRIBUTE_VALUE1 != null) item.setValueItems.push(obj.ATTRIBUTE_VALUE1)
                        if (obj.ATTRIBUTE_VALUE2 != null) item.setValueItems.push(obj.ATTRIBUTE_VALUE2)
                        if (obj.ATTRIBUTE_VALUE3 != null) item.setValueItems.push(obj.ATTRIBUTE_VALUE3)
                        if (obj.ATTRIBUTE_VALUE4 != null) item.setValueItems.push(obj.ATTRIBUTE_VALUE4)
                        if (obj.ATTRIBUTE_VALUE5 != null) item.setValueItems.push(obj.ATTRIBUTE_VALUE5)
                        if (obj.ATTRIBUTE_VALUE6 != null) item.setValueItems.push(obj.ATTRIBUTE_VALUE6)
                        if (obj.ATTRIBUTE_VALUE7 != null) item.setValueItems.push(obj.ATTRIBUTE_VALUE7)
                        if (obj.ATTRIBUTE_VALUE8 != null) item.setValueItems.push(obj.ATTRIBUTE_VALUE8)
                        if (obj.ATTRIBUTE_VALUE9 != null) item.setValueItems.push(obj.ATTRIBUTE_VALUE9)
                        if (obj.ATTRIBUTE_VALUE10 != null) item.setValueItems.push(obj.ATTRIBUTE_VALUE10)
                        if (obj.ATTRIBUTE_VALUE11 != null) item.setValueItems.push(obj.ATTRIBUTE_VALUE11)
                        if (obj.ATTRIBUTE_VALUE12 != null) item.setValueItems.push(obj.ATTRIBUTE_VALUE12)
                        if (obj.ATTRIBUTE_VALUE13 != null) item.setValueItems.push(obj.ATTRIBUTE_VALUE13)
                        if (obj.ATTRIBUTE_VALUE14 != null) item.setValueItems.push(obj.ATTRIBUTE_VALUE14)
                        if (obj.ATTRIBUTE_VALUE15 != null) item.setValueItems.push(obj.ATTRIBUTE_VALUE15)
                        if (obj.ATTRIBUTE_VALUE16 != null) item.setValueItems.push(obj.ATTRIBUTE_VALUE16)
                        if (obj.ATTRIBUTE_VALUE17 != null) item.setValueItems.push(obj.ATTRIBUTE_VALUE17)
                        if (obj.ATTRIBUTE_VALUE18 != null) item.setValueItems.push(obj.ATTRIBUTE_VALUE18)
                        if (obj.ATTRIBUTE_VALUE19 != null) item.setValueItems.push(obj.ATTRIBUTE_VALUE19)
                        if (obj.ATTRIBUTE_VALUE20 != null) item.setValueItems.push(obj.ATTRIBUTE_VALUE20)

                    }
                }
            })
        }
            
            
            if($scope.SampleID)
                {
                    getService.getWorkorderParameterSamplesById($scope.SampleID).then(function (reponse){
                        angular.forEach(reponse, function (obj) {
                        $scope.productProfileItems.push({
                            id: obj.SAMPLE_PARAM_ID,
                            selectedParameter: obj.PARAMTERS,
                            subType: '',
                            thresholdValue: '',
                            target: obj.VALUE,
                            uom: obj.UOM,
                            created_date:obj.CREATION_DATE,
                            updated_date:obj.LAST_UPDATED_DATE                       
                        })      
                        })
                    })
                    
                    getService.getSampleDataById($scope.SampleID).then(function (response) {
                        
                        $scope.addSampleData.sampleName = response[0].SAMPLE_NAME;
                        $scope.addSampleData.sampleAmount = response[0].AMOUNT;
                        $scope.addSampleData.sampleUOM = response[0].UOM;
                        $scope.addSampleData.selectedContainer = response[0].CONTAINER_NAME;
						$scope.addSampleData.status = response[0].STATUS;
                        $scope.containerLocation = response[0].CAONTAINER_LOCATION;
                        $scope.badgedatetime = response[0].ENTERED_DATE;
                        

                
                        
                    
                    });

                    
                }
            
            $scope.OnSubmitSample = function(){
                
                //console.log(JSON.stringify($scope.productProfileItems));
                
                var data ={
                "i_WORK_ORDER_ID" : $scope.workorderID,
                "i_SAMPLE_NAME" : $scope.addSampleData.sampleName,
                "i_SAMPLE_ID":$scope.SampleID,
                "i_AMOUNT" : $scope.addSampleData.sampleAmount,
                "i_UOM" : $scope.addSampleData.sampleUOM,
                "i_ENTERED_DATE" :moment($scope.badgedatetime).format('YYYY-MM-DD hh:mm:ss'),
                "i_OPERATOR" : $scope.addSampleData.operatorName,
                "i_USER_ID":$rootScope.loggedInUserID,
                "i_USER_NAME":$scope.addSampleData.operatorName,
                "i_VALUE" : '',
                "i_CONTAINER_ID" : $scope.addSampleData.selectedContainer,
                "i_CONTAINER_NAME" : $scope.addSampleData.selectedContainer,
                "i_CAONTAINER_LOCATION" : $scope.containerLocation,
                "i_CREATION_DATE" : currentdate,
                "i_LAST_UPDATED_DATE" : currentdate,
				"i_STATUS" : $scope.addSampleData.status,
                "i_LAST_UPDATED_BY" : $scope.addSampleData.operatorName,
                "i_CREATED_BY" : $scope.addSampleData.operatorName
                }
                
                for (var i = 1; i <= 10; i++) {
                var key1 = "i_SAMPLE_ID_" + i;
                var key2 = "i_SAMPLE_PARAM_ID_"  + i;
                var key3 = "i_PARAMTERS_" + i;
                //var key4 = "i_PARAMTERS_NEW_" + i;
                var key5 = "i_VALUE_" + i;
                //var key6 = "i_VALUE_NEW_" + i;
                var key7 = "i_UOM_" + i;
                //var key8 = "i_UOM_NEW_" + i;
                var key9 = "i_ENTERED_DATE_" + i;
                //var key10 = "i_ENTERED_DATE_NEW" + i;
                    

                $scope.productProfileItems.forEach(function (value, index) {
                    
                    if (index + 1 == i) {
                        data[key1] = $scope.SampleID;
                        data[key2] = value.id||null;
                        data[key3] = value.selectedParameter;
                        //data[key4] = 'NULL';
                        data[key5] = value.target;
                        //data[key6] = 'NULL';
                        data[key7] = value.uom;
                        //data[key8] = 'NULL';
                        data[key9] = value.created_date;
                        //data[key10] = value.updated_date;
                        
                    } else if (i > index + 1) {
                        data[key1] = 'NULL';
                        data[key2] = 'NULL';
                        data[key3] = 'NULL';
                        //data[key4] = 'NULL';
                        data[key5] = 'NULL';
                        //data[key6] = 'NULL';
                        data[key7] = 'NULL';
                        //data[key8] = 'NULL';
                        data[key9] = 'NULL';
                        //data[key10] = 'NULL';
                    }
                })

                //})


            }
                console.log(JSON.stringify(data));
                getService.CreateSampleWorkorder(data).then(function (response) {
                    $state.go('nav.samplelist')
                });

            }


            
            
    }]);

    angular.module('tracehive.controller.profile', [])
        .controller('profileCtrl', ['$scope', '$rootScope', '$state', '$filter','getService', function ($scope,$rootScope, $state, $filter, getService) {
            $scope.addRoleRow = false;
            $scope.editrole = true;
            $scope.datarole = false;

            $scope.addNewRole = function () {
                $scope.addRoleRow = true;
            }

            $scope.closeAddRole = function () {
                $scope.addRoleRow = false;
            }
			/***Created By : 5838 **/
            $scope.rolename = '';
            $scope.description = '';
			
            $scope.rolesList =[];
			var date = new Date();
            var currentdate = $filter('date')(new Date(), 'yyyy-MM-dd HH:mm:ss');
			
			/**********************************************
				@Created By : 5838
				@Created at : 14-12-2016
				@ Display profile list and profile creation.
				********************************************/		
			getService.getProfileData().then(function(response){
				angular.forEach(response, function (obj) {
                        $scope.rolesList.push({
                            user_profile_id:obj.USER_PROFILE_ID,
							name: obj.NAME,
                            description: obj.DESCRIPTION,                     
                        })      
                        })
				 console.log(JSON.stringify($scope.rolesList));
            })

            $scope.addRoleItem = function () {
				if($scope.rolename != ''){
                    var data ={name:$scope.rolename, description: $scope.roledescription, CREATION_DATE:currentdate,CREATED_BY:$rootScope.loggedInUserID}
                    if($scope.innerForm.$valid){
					getService.addProfileRecord(data).then(function(response){
                        if(response.status =="success"){
                             $scope.rolesList.push({
                             user_profile_id:response[0].USER_PROFILE_ID,
                             name: response[0].NAME,
                            description: response[0].DESCRIPTION,                    
                            })  
                              $scope.rolename = '';
                              $scope.roledescription = '';
                            }
                    })
					}
                }	
            };
		

            
		/*end */
            $scope.editRoleItem = function () {
                $scope.editrole = false;
                $scope.datarole = true;
            }
            $scope.closeAddRole = function (index) {
                $scope.addRoleRow = false;
            }
            $scope.showAction = function (item) {
                item.loading = true;
            }
            $scope.hideAction = function (item) {
                item.loading = false;
            }
            
            $scope.deleteProfile = function (userProfileId) {
                angular.forEach($scope.rolesList, function (value, index) {
                    if (value.user_profile_id == userProfileId) {
                        getService.removeUserProfile(userProfileId).then(function(response){
                        $scope.rolesList.splice(index, 1);
                        });
                    }
                })
                $(".modal-backdrop").hide();
                
            }
                
            getService.getUserProfileById($rootScope.loggedInUserRole).then(function (response) {
                $scope.roleCreate = response.roleCreate;
				$scope.roleRead = response.roleRead;
				$scope.roleUpdate = response.roleUpdate;
				$scope.roleDelete = response.roleDelete;


            });

            
                
				
            
            
            
			
    }]);

    angular.module('tracehive.controller.adduserprofile', [])
      .controller('adduserprofileCtrl', ['$scope', '$rootScope', '$state', '$filter','getService', function ($scope, $rootScope, $state, $filter, getService) {
			
				/*****************************************
					@Created By : 5838
					@Message:- Update user profile setting   
					**************************************/
			var date = new Date();
            var currentdate = $filter('date')(new Date(), 'yyyy-MM-dd HH:mm:ss');	
				
			$scope.addprofileData = {
				workorderCreate:0,workorderRead:0,workorderUpdate:0,workorderDelete:0,
				qualityCreate:0,qualityRead:0,qualityUpdate:0,qualityDelete:0,
				inventoryCreate:0,inventoryRead:0,inventoryUpdate:0,inventoryDelete:0,
				invqualityCreate:0,invqualityRead:0,invqualityUpdate:0,invqualityDelete:0,
				recipeCreate:0,recipeRead:0,recipeUpdate:0,recipeDelete:0,
				equipmentCreate:0,equipmentRead:0,equipmentUpdate:0,equipmentDelete:0,
				sensorCreate:0,sensorRead:0,sensorUpdate:0,sensorDelete:0,
				machineryCreate:0,machineryRead:0,machineryUpdate:0,machineryDelete:0,	
				logactivityCreate:0,logactivityRead:0,logactivityUpdate:0,logactivityDelete:0,
				qualificationCreate:0,qualificationRead:0,qualificationUpdate:0,qualificationDelete:0,
				parameterCreate:0,parameterRead:0,parameterUpdate:0,parameterDelete:0,
				reportCreate:0,reportRead:0,reportUpdate:0,reportDelete:0,
				adminCreate:0,adminRead:0,adminUpdate:0,adminDelete:0,
				userCreate:0,userRead:0,userUpdate:0,userDelete:0,
				roleCreate:0,roleRead:0,roleUpdate:0,roleDelete:0,
				masterCreate:0,masterRead:0,masterUpdate:0,masterDelete:0,
				materialCreate:0,materialRead:0,materialUpdate:0,materialDelete:0,
				uomCreate:0,uomRead:0,uomUpdate:0,uomDelete:0,
				manufacturerCreate:0,manufacturerRead:0,manufacturerUpdate:0,manufacturerDelete:0,
				modelCreate:0,modelRead:0,modelUpdate:0,modelDelete:0,
				locationCreate:0,locationRead:0,locationUpdate:0,locationDelete:0,
				supplierCreate:0,supplierRead:0,supplierUpdate:0,supplierDelete:0
			}
			
    $scope.checkAll = function () {
		var checkdata=$scope.addprofileData;
        if ($scope.selectedAll) {
           $scope.selectedAll = true;
		   //$scope.addprofileData.insightCreate = 1;
		   
		   $scope.addprofileData = {
				workorderCreate:1,workorderRead:1,workorderUpdate:1,workorderDelete:1,
				qualityCreate:1,qualityRead:1,qualityUpdate:1,qualityDelete:1,
				inventoryCreate:1,inventoryRead:1,inventoryUpdate:1,inventoryDelete:1,
				invqualityCreate:1,invqualityRead:1,invqualityUpdate:1,invqualityDelete:1,
				recipeCreate:1,recipeRead:1,recipeUpdate:1,recipeDelete:1,
				equipmentCreate:1,equipmentRead:1,equipmentUpdate:1,equipmentDelete:1,
				sensorCreate:1,sensorRead:1,sensorUpdate:1,sensorDelete:1,
				machineryCreate:1,machineryRead:1,machineryUpdate:1,machineryDelete:1,	
				logactivityCreate:1,logactivityRead:1,logactivityUpdate:1,logactivityDelete:1,
				qualificationCreate:1,qualificationRead:1,qualificationUpdate:1,qualificationDelete:1,
				parameterCreate:1,parameterRead:1,parameterUpdate:1,parameterDelete:1,
				reportCreate:1,reportRead:1,reportUpdate:1,reportDelete:1,
				adminCreate:1,adminRead:1,adminUpdate:1,adminDelete:1,
				userCreate:1,userRead:1,userUpdate:1,userDelete:1,
				roleCreate:1,roleRead:1,roleUpdate:1,roleDelete:1,
				masterCreate:1,masterRead:1,masterUpdate:1,masterDelete:1,
				materialCreate:1,materialRead:1,materialUpdate:1,materialDelete:1,
				uomCreate:1,uomRead:1,uomUpdate:1,uomDelete:1,
				manufacturerCreate:1,manufacturerRead:1,manufacturerUpdate:1,manufacturerDelete:1,
				modelCreate:1,modelRead:1,modelUpdate:1,modelDelete:1,
				locationCreate:1,locationRead:1,locationUpdate:1,locationDelete:1,
				supplierCreate:1,supplierRead:1,supplierUpdate:1,supplierDelete:1
			}
		   
        } else {
            $scope.selectedAll = false;
			$scope.addprofileData = {
				workorderCreate:0,workorderRead:0,workorderUpdate:0,workorderDelete:0,
				qualityCreate:0,qualityRead:0,qualityUpdate:0,qualityDelete:0,
				inventoryCreate:0,inventoryRead:0,inventoryUpdate:0,inventoryDelete:0,
				invqualityCreate:0,invqualityRead:0,invqualityUpdate:0,invqualityDelete:0,
				recipeCreate:0,recipeRead:0,recipeUpdate:0,recipeDelete:0,
				equipmentCreate:0,equipmentRead:0,equipmentUpdate:0,equipmentDelete:0,
				sensorCreate:0,sensorRead:0,sensorUpdate:0,sensorDelete:0,
				machineryCreate:0,machineryRead:0,machineryUpdate:0,machineryDelete:0,	
				logactivityCreate:0,logactivityRead:0,logactivityUpdate:0,logactivityDelete:0,
				qualificationCreate:0,qualificationRead:0,qualificationUpdate:0,qualificationDelete:0,
				parameterCreate:0,parameterRead:0,parameterUpdate:0,parameterDelete:0,
				reportCreate:0,reportRead:0,reportUpdate:0,reportDelete:0,
				adminCreate:0,adminRead:0,adminUpdate:0,adminDelete:0,
				userCreate:0,userRead:0,userUpdate:0,userDelete:0,
				roleCreate:0,roleRead:0,roleUpdate:0,roleDelete:0,
				masterCreate:0,masterRead:0,masterUpdate:0,masterDelete:0,
				materialCreate:0,materialRead:0,materialUpdate:0,materialDelete:0,
				uomCreate:0,uomRead:0,uomUpdate:0,uomDelete:0,
				manufacturerCreate:0,manufacturerRead:0,manufacturerUpdate:0,manufacturerDelete:0,
				modelCreate:0,modelRead:0,modelUpdate:0,modelDelete:0,
				locationCreate:0,locationRead:0,locationUpdate:0,locationDelete:0,
				supplierCreate:0,supplierRead:0,supplierUpdate:0,supplierDelete:0
			}
        }
       /* angular.forEach($scope.addprofileData, function (value,key) {
            
			//console.log(value+"key="+key+"="+$scope.selectedAll);
			checkdata.key = $scope.selectedAll;
        });*/
		//alert($scope.selectedAll);
    };

			var editUserProfileId = $.urlParam('id');
			if(editUserProfileId!=""){
			 getService.getUserProfileById(editUserProfileId).then(function (response) {
                
				console.log(JSON.stringify(response));

				
				$scope.addprofileData.workorderCreate = response.workorderCreate;
				$scope.addprofileData.workorderRead = response.workorderRead;
				$scope.addprofileData.workorderUpdate = response.workorderUpdate;
				$scope.addprofileData.workorderDelete = response.workorderDelete;


				$scope.addprofileData.qualityCreate = response.qualityCreate;
				$scope.addprofileData.qualityRead = response.qualityRead;
				$scope.addprofileData.qualityUpdate = response.qualityUpdate;
				$scope.addprofileData.qualityDelete = response.qualityDelete;


				$scope.addprofileData.inventoryCreate = response.inventoryCreate;
				$scope.addprofileData.inventoryRead = response.inventoryRead;
				$scope.addprofileData.inventoryUpdate = response.inventoryUpdate;
				$scope.addprofileData.inventoryDelete = response.inventoryDelete;

				$scope.addprofileData.invqualityCreate = response.invqualityCreate;
				$scope.addprofileData.invqualityRead = response.invqualityRead;
				$scope.addprofileData.invqualityUpdate = response.invqualityUpdate;
				$scope.addprofileData.invqualityDelete = response.invqualityDelete;

				$scope.addprofileData.recipeCreate = response.recipeCreate;
				$scope.addprofileData.recipeRead = response.recipeRead;
				$scope.addprofileData.recipeUpdate = response.recipeUpdate;
				$scope.addprofileData.recipeDelete = response.recipeDelete;


				$scope.addprofileData.equipmentCreate = response.equipmentCreate;
				$scope.addprofileData.equipmentRead = response.equipmentRead;
				$scope.addprofileData.equipmentUpdate = response.equipmentUpdate;
				$scope.addprofileData.equipmentDelete = response.equipmentDelete;


				$scope.addprofileData.sensorCreate = response.sensorCreate;
				$scope.addprofileData.sensorRead = response.sensorRead;
				$scope.addprofileData.sensorUpdate = response.sensorUpdate;
				$scope.addprofileData.sensorDelete = response.sensorDelete;


				$scope.addprofileData.machineryCreate = response.machineryCreate;
				$scope.addprofileData.machineryRead = response.machineryRead;
				$scope.addprofileData.machineryUpdate = response.machineryUpdate;
				$scope.addprofileData.machineryDelete = response.machineryDelete;


				$scope.addprofileData.logactivityCreate = response.logactivityCreate;
				$scope.addprofileData.logactivityRead = response.logactivityRead;
				$scope.addprofileData.logactivityUpdate = response.logactivityUpdate;
				$scope.addprofileData.logactivityDelete = response.logactivityDelete;


				$scope.addprofileData.qualificationCreate = response.qualificationCreate;
				$scope.addprofileData.qualificationRead = response.qualificationRead;
				$scope.addprofileData.qualificationUpdate = response.qualificationUpdate;
				$scope.addprofileData.qualificationDelete = response.qualificationDelete;

				$scope.addprofileData.parameterCreate = response.parameterCreate;
				$scope.addprofileData.parameterRead = response.parameterRead;
				$scope.addprofileData.parameterUpdate = response.parameterUpdate;
				$scope.addprofileData.parameterDelete = response.parameterDelete;

				$scope.addprofileData.reportCreate = response.reportCreate;
				$scope.addprofileData.reportRead = response.reportRead;
				$scope.addprofileData.reportUpdate = response.reportUpdate;
				$scope.addprofileData.reportDelete = response.reportDelete;

				$scope.addprofileData.adminCreate = response.adminCreate;
				$scope.addprofileData.adminRead = response.adminRead;
				$scope.addprofileData.adminUpdate = response.adminUpdate;
				$scope.addprofileData.adminDelete = response.adminDelete;

				$scope.addprofileData.userCreate = response.userCreate;
				$scope.addprofileData.userRead = response.userRead;
				$scope.addprofileData.userUpdate = response.userUpdate;
				$scope.addprofileData.userDelete = response.userDelete;

				$scope.addprofileData.roleCreate = response.roleCreate;
				$scope.addprofileData.roleRead = response.roleRead;
				$scope.addprofileData.roleUpdate = response.roleUpdate;
				$scope.addprofileData.roleDelete = response.roleDelete;

				$scope.addprofileData.masterCreate = response.masterCreate;
				$scope.addprofileData.masterRead = response.masterRead;
				$scope.addprofileData.masterUpdate = response.masterUpdate;
				$scope.addprofileData.masterDelete = response.masterDelete;

				$scope.addprofileData.materialCreate = response.materialCreate;
				$scope.addprofileData.materialRead = response.materialRead;
				$scope.addprofileData.materialUpdate = response.materialUpdate;
				$scope.addprofileData.materialDelete = response.materialDelete;

				$scope.addprofileData.uomCreate = response.uomCreate;
				$scope.addprofileData.uomRead = response.uomRead;
				$scope.addprofileData.uomUpdate = response.uomUpdate;
				$scope.addprofileData.uomDelete = response.uomDelete;

				$scope.addprofileData.manufacturerCreate = response.manufacturerCreate;
				$scope.addprofileData.manufacturerRead = response.manufacturerRead;
				$scope.addprofileData.manufacturerUpdate = response.manufacturerUpdate;
				$scope.addprofileData.manufacturerDelete = response.manufacturerDelete;

				$scope.addprofileData.modelCreate = response.modelCreate;
				$scope.addprofileData.modelRead = response.modelRead;
				$scope.addprofileData.modelUpdate = response.modelUpdate;
				$scope.addprofileData.modelDelete = response.modelDelete;

				$scope.addprofileData.locationCreate = response.locationCreate;
				$scope.addprofileData.locationRead = response.locationRead;
				$scope.addprofileData.locationUpdate = response.locationUpdate;
				$scope.addprofileData.locationDelete = response.locationDelete;

				$scope.addprofileData.supplierCreate = response.supplierCreate;
				$scope.addprofileData.supplierRead = response.supplierRead;
				$scope.addprofileData.supplierUpdate = response.supplierUpdate;
				$scope.addprofileData.supplierDelete = response.supplierDelete;
				
				$scope.otherFeatureChat = response.SHOWCHAT_SETTINGS;
				$scope.dashboardAlerts = response.SHOWALERTS_SETTINGS;
				$scope.dashboardLocationMap = response.SHOWLOCATIONMAP_SETTINGS;
            });
            
			
			$scope.OnSubmitUserProfile = function (obj){

			//console.log(obj);
				
			var workorder	= obj.workorderCreate+','+obj.workorderRead+','+obj.workorderUpdate+','+obj.workorderDelete;
			var quality		= obj.qualityCreate+','+obj.qualityRead+','+obj.qualityUpdate+','+obj.qualityDelete;
			var inventory	= obj.inventoryCreate+','+obj.inventoryRead+','+obj.inventoryUpdate+','+obj.inventoryDelete;
			var invQuality	= obj.invqualityCreate+','+obj.invqualityRead+','+obj.invqualityUpdate+','+obj.invqualityDelete;
			var recipe		= obj.recipeCreate+','+obj.recipeRead+','+obj.recipeUpdate+','+obj.recipeDelete;
			var equipment	= obj.equipmentCreate+','+obj.equipmentRead+','+obj.equipmentUpdate+','+obj.equipmentDelete;
			var sensor		= obj.sensorCreate+','+obj.sensorRead+','+obj.sensorUpdate+','+obj.sensorDelete;
			var machinery	= obj.machineryCreate+','+obj.machineryRead+','+obj.machineryUpdate+','+obj.machineryDelete;
			var logactivity	= obj.logactivityCreate+','+obj.logactivityRead+','+obj.logactivityUpdate+','+obj.logactivityDelete;
			var qualification= obj.qualificationCreate+','+obj.qualificationRead+','+obj.qualificationUpdate+','+obj.qualificationDelete;
			var parameter	= obj.parameterCreate+','+obj.parameterRead+','+obj.parameterUpdate+','+obj.parameterDelete;
			var report		= obj.reportCreate+','+obj.reportRead+','+obj.reportUpdate+','+obj.reportDelete; 
			var admin		= obj.adminCreate+','+obj.adminRead+','+obj.adminUpdate+','+obj.adminDelete;
			var user		= obj.userCreate+','+obj.userRead+','+obj.userUpdate+','+obj.userDelete;
			var role		= obj.roleCreate+','+obj.roleRead+','+obj.roleUpdate+','+obj.roleDelete;
			var master		= obj.masterCreate+','+obj.masterRead+','+obj.masterUpdate+','+obj.masterDelete;
			var material	= obj.materialCreate+','+obj.materialRead+','+obj.materialUpdate+','+obj.materialDelete;
			var uom			= obj. uomCreate+','+obj. uomRead+','+obj. uomUpdate+','+obj. uomDelete;
			var manufacturer= obj. manufacturerCreate+','+obj. manufacturerRead+','+obj. manufacturerUpdate+','+obj. manufacturerDelete;
			var model		= obj. modelCreate+','+obj. modelRead+','+obj. modelUpdate+','+obj. modelDelete;
			var locations	= obj. locationCreate+','+obj. locationRead+','+obj. locationUpdate+','+obj. locationDelete;
			var supplier	= obj. supplierCreate+','+obj. supplierRead+','+obj. supplierUpdate+','+obj. supplierDelete;
			
			var data={
				'WORKORDER_SETTINGS':workorder,
				'QUALITY_SETTINGS':quality,
				'INVENTORY_SETTINGS':inventory,
				'INVQUALITY_SETTINGS':invQuality,
				'RECEIPE_SETTINGS':recipe,
				'EQUIPMENTMENU_SETTINGS':equipment,
				'SENSOR_SETTINGS':sensor,
				'MACHINERY_SETTINGS':machinery,
				'LOGACTIVITY_SETTINGS':logactivity,
				'ADDQUALIFICATION_SETTINGS':qualification,
				'PARAMETER_SETTINGS':parameter,
				'REPORTSMENU_SETTINGSF':report,
				'ADMIN_SETTINGS':admin,
				'USER_SETTINGS':user,
				'ROLES_SETTINGS':role,
				'MASTER_SETTINGS':master,
				'MATERIALS_SETTINGS':material,
				'UOM_SETTINGS':uom,
				'MANUFACTURER_SETTINGS':manufacturer,
				'MODEL_SETTINGS':model,
				'LOCATION_SETTINGS':locations,
				'SUPPILER_SETTINGS':supplier,
				'SHOWCHAT_SETTINGS':$scope.otherFeatureChat,
				'SHOWALERTS_SETTINGS':$scope.dashboardAlerts,
				'SHOWLOCATIONMAP_SETTINGS':$scope.dashboardLocationMap,
				'LAST_UPDATED_DATE':currentdate,
				'LAST_UPDATED_BY':$rootScope.loggedInUserID,
			}
			// console.log(data);
			getService.editProfileData(editUserProfileId,data).then(function (response) {
                // console.log(JSON.stringify(response));
				  $state.go('nav.profile');
			  })
		}

		}
            
    }]);

    angular.module('tracehive.controller.badgeinfo', [])
        .controller('badgeinfoCtrl', ['$scope', '$rootScope', '$state', 'getService', function ($scope, $rootScope, $state, getService) {

             $scope.BadgeInfoByDate=[];
            // getService.getBadgeInfo('2016-10-13').then(function(data){
            //     if(data.status="success")
            //      $scope.BadgeInfoByDate =  data.response;
            // });
            
            getService.getBadgeInfo().then(function(data){
                        console.log(JSON.stringify(data));
                        if(data.status="success"){
                            $scope.BadgeInfoByDate = data.response;
                            angular.forEach($scope.BadgeInfoByDate, function(value, key) {
                                var fullName = value.FIRST_NAME + ' ' + value.LAST_NAME;
                                $scope.BadgeInfoByDate[key].FULL_NAME = fullName;
                            });
                        }
                    });
            
            $scope.submitted = false; 
            $scope.getBadgeInfo = function(date) {
                /*if ($scope.badgeinfoSearchForm.$valid) { 
                    var formatedDate = moment(date).format('YYYY-MM-DD');
                    getService.getBadgeInfo(formatedDate).then(function(data){
                        console.log(JSON.stringify(data));
                        if(data.status="success"){
                            $scope.BadgeInfoByDate = data.response;
                            angular.forEach($scope.BadgeInfoByDate, function(value, key) {
                                var fullName = value.FIRST_NAME + ' ' + value.LAST_NAME;
                                $scope.BadgeInfoByDate[key].FULL_NAME = fullName;
                            });
                        }
                    });
                } else { 
                    $scope.badgeinfoSearchForm.submitted = true; 
                } */
            }

    }]);

    angular.module('tracehive.controller.addbadgeinfo', [])
        .controller('addbadgeinfoCtrl', ['$scope', '$rootScope', '$state', 'getService', function ($scope, $rootScope, $state, getService) {
            
            $scope.addBadgeInfoData ={};
            
            getService.getAllCities().then(function (response) {
                $scope.locationList = response;
            });
            
            $scope.userslist = []
            getService.getAllUser().then(function (data) {
                $scope.userslist = data.response;
                //console.log(JSON.stringify($scope.userslist));

            });
            
            $scope.getModelData = function(userid)
            {
                angular.forEach($scope.userslist, function(obj) {
                  if(obj.USER_ID == userid){
                      $scope.addBadgeInfoData.selecteduserid = obj.USER_ID;
                      $scope.addBadgeInfoData.selecteduserName = obj.USERNAME;
                      $scope.addBadgeInfoData.badgeID = obj.BADGE_ID;
                      $scope.addBadgeInfoData.swipSensorName = obj.ADDRESS_LINE1;
                      $scope.addBadgeInfoData.addressline2 = obj.ADDRESS_LINE2;
                      $scope.addBadgeInfoData.addressline3 = obj.ADDRESS_LINE3;
                      $scope.addBadgeInfoData.addressline4 = obj.ADDRESS_LINE4;
                      $scope.addBadgeInfoData.city = obj.CITY;
                      $scope.addBadgeInfoData.country = obj.COUNTRY;
                      
                  }
                });
            }
            
            $scope.onAddBadgeInfo = function(){
                //console.log($scope.dataRangeStart)
                var punchin= moment($scope.badgedatetime).format('YYYY-MM-DD hh:mm:ss');
                //console.log(punchin);
                var data ={
                    i_USER_ID:$scope.addBadgeInfoData.selecteduserid,
                    i_USERNAME:$scope.addBadgeInfoData.selecteduserName,
                    i_BADGE_ID:$scope.addBadgeInfoData.badgeID,
                    i_STATUS:$scope.addBadgeInfoData.selectedStatus,
                    i_PUNCH_IN_OUT:punchin,
                    i_COUNTRY : $scope.addBadgeInfoData.country,
                    i_CITY : $scope.addBadgeInfoData.city,
                    i_ADDR1 : $scope.addBadgeInfoData.swipSensorName,
                    i_ADDR2 : $scope.addBadgeInfoData.addressline2||'',
                    i_ADDR3 : $scope.addBadgeInfoData.addressline3||'', 
                    i_ADDR4 : $scope.addBadgeInfoData.addressline4||'',
                    i_LOCATION_CODE:"",
                    i_ATTRIBUTE1:"NULL",
                    i_ATTRIBUTE2:"NULL",
                    i_ATTRIBUTE3:"NULL",
                    i_ATTRIBUTE4:"NULL",
                    i_ATTRIBUTE5:"NULL",
                    i_CREATION_DATE:"NULL",
                    i_LAST_UPDATED_DATE:"NULL",
                    i_CREATED_BY:"admin",
                    i_LAST_UPDATED_BY:"admin"
                    }
                
                //console.log(JSON.stringify(data));
                
                getService.addBadge(data).then(function (response) {

                    $state.go('nav.badgeinfo');
                });

                
                }
            

            $scope.events = [];
            $scope.eventsEmptyArr = false;
            $scope.locationSelectBtn = true;
            $scope.menu = [];
            getService.getAllLocations().then(function (response) {
                $scope.menu = {
                    title: 'Locations',
                    id: 'menuId',
                    items: response
                };
            });

            $scope.select = function (selected) {
                $scope.selected = selected
            }
            $scope.locationSelect = function () {
                $scope.locationSelect = false;
            }
            $scope.rest = {};
            $scope.rest.options = {
                containersToPush: [$('#pushobj')],
                direction: 'ltr',
                collapsed: false,
                fullCollapse: true,

                onGroupItemClick: function (event, item) {
                    $scope.eventsEmptyArr = false;
                    if ($scope.events[$scope.events.length - 1] != item.name) {
                        $scope.events.push(item.name);
                    } else {
                        event.preventDefault();
                    }
                },
                onItemClick: function (event, item) {
                    $scope.eventsEmptyArr = false;

                    if ($scope.events[$scope.events.length - 1] != item.name) {
                        $scope.events.push(item.name);
                    } else {
                        event.preventDefault();
                    }
                },
                onBackItemClick: function (event, item) {
                    return $scope.events.pop();
                }
            };
            $scope.locationDone = false;
            $scope.locationEditBtn = false;
            $scope.addmaterial = false;

            $scope.locationSelect = function () {
                $scope.location = true;
            }
            $scope.getlocation = '';
            $scope.locationSeleted = function (e) {
                e.preventDefault();
                $scope.locationDone = true;
                $scope.location = false;
                $scope.locationEditBtn = true;
                $scope.locationSelectBtn = false;

            }
            $scope.locationEdit = function (e) {
                e.preventDefault();
                $scope.rest.options.collapsed = true;
                $scope.location = true;
                $scope.locationDone = false;
            }

            $scope.locationCancel = function (e) {
                e.preventDefault();
                $scope.location = false;
            }
    }]);

})();