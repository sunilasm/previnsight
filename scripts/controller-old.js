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

        if (scroll >= 80) {
            navfixed.addClass('fixed');
            $('.backbtn').addClass('highlights');
        } else {
            navfixed.removeClass('fixed');
            $('.backbtn').removeClass('highlights');
        }
    });


    angular.module('tracehive.controller', ['tracehive.controller.login', 'tracehive.controller.main', 'tracehive.controller.sensors', 'tracehive.controller.parameter', 'tracehive.controller.machinery', 'tracehive.controller.inventory', 'tracehive.controller.workorder', 'tracehive.controller.receipe', 'tracehive.controller.report', 'tracehive.controller.notification', 'tracehive.controller.location', 'tracehive.controller.ModalController'])



    angular.module('tracehive.controller.login', [])
        .controller('loginCtrl', ['$scope', '$state', function ($scope, $state) {
            $scope.login = function () {
                $state.go("home");
            };
    }]);

    angular.module('tracehive.controller.main', [])
        .controller('mainCtrl', ['$http', '$scope', '$state', 'getService', 'poollingFactory', '$window', '$sce', 'ModalService', function ($http, $scope, $state, getService, poollingFactory, $window, $sce, ModalService) {

            getService.getAllCities().then(function (response) {
                $scope.locationList = response;
            });
            $scope.graph = {}
            $scope.limit = 5;
  
            $scope.loadedData = false;

            $scope.show = function (host, timestamp) {
                /*var myString = timestamp;
                if (myString.charAt(myString.length - 1) == 'Z') {
                    myString = myString.substr(0, myString.length - 1);
                }*/
                var myString = timestamp;
                var panelID;
                if (host == 'humidity')
                    panelID = 1
                if (host == 'temperature')
                    panelID = 2

                var startUnixValue = moment(myString).subtract(2, "minutes").unix() * 1000;
                var endUnixValue = moment(myString).add(2, "minutes").unix() * 1000
                
                console.log(startUnixValue+"*"+endUnixValue);

                console.log(startUnixValue+"*"+endUnixValue);
                
                ModalService.showModal({
                    template: '<div class="modal fade"> <div class="graphModel modal-dialog" dragable> <div class="modal-content">               <div class="modal-header"> <button type="button" class="close" ng-click="close("Cancel")" data-dismiss="modal" aria-hidden="true">&times;</button><h4 class="modal-title">Metric Graph -' + host + '</h4></div><div class="modal-body"><iframe id="frameSource" width="800" height="400" frameborder="0" ng-src="http://104.236.142.108:3000/dashboard-solo/db/sensors?panelId=' + panelID + '&fullscreen&from=' + startUnixValue + '&to=' + endUnixValue + '"></iframe> </div></div></div></div>',
                    controller: "ModalController"
                }).then(function (modal) {
                    modal.element.modal();
                    modal.close.then(function (result) {
                        $scope.message = "You said " + result;
                    });
                });
                
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
                //alert(data);

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
                    
                    function add2Dots(string, limit)
                    {
                      var dots = "..";
                      if(string.length > limit)
                      {
                        // you can also use substr instead of substring
                        string = string.substring(0,limit) + dots;
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
                            fullname: add2Dots(names[names.length -1], 4),
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



                    //topology View
                    //var color = d3.scale.category10();

                    // some colour variables
                    //var tcBlack = "#130C0E";


                    // rest of vars
                   /* var w = 580,
                        h = 250,
                        maxNodeSize = 50,
                        x_browser = 20,
                        y_browser = 25,
                        root;

                    var vis;
                    var force = d3.layout.force();



                    //d3.json("http://localhost/previnsight/Development/Src/Tracehive/scripts/json/topo.json", function(json) {
                    var topo = {
                            "name": "",
                            "children": desiredOutput
                        }
                        //alert(JSON.stringify(topo));
                    console.log(JSON.stringify(topo))
                    root = topo
                    root.fixed = true;
                    root.x = w / 2;
                    root.y = h / 4;
                    //$("#topoView").html('');
                    d3.select("svg").remove();
                    //alert(JSON.stringify(root))
                    vis = d3.select("#topoView").append("svg").attr("width", w).attr("height", h);

                    // Build the path
                    var defs = vis.insert("svg:defs")
                        .data(["end"]);


                    defs.enter().append("svg:path")
                        .attr("d", "M0,-5L10,0L0,5");

                    update();
                    //});


                    function update() { //


                        //vis.selectAll("svg").remove();



                        var nodes = flatten(root),
                            links = d3.layout.tree().links(nodes);



                        // Restart the force layout.
                        force.nodes(nodes)
                            .links(links)
                            .gravity(0.05)
                            .charge(-1500)
                            .linkDistance(60)
                            .friction(0.5)
                            .linkStrength(function (l, i) {
                                return 1;
                            })
                            .size([w, h])
                            .on("tick", tick)
                            .start();




                        var path = vis.selectAll("path.link")
                            .data(links, function (d) {
                                return d.target.id;
                            });

                        path.enter().insert("svg:path")
                            .attr("class", "link")
                            .style("stroke", "#eee");

                        // Exit any old paths.
                        path.exit().remove();

                        // Update the nodesÃ¢â‚¬Â¦
                        var node = vis.selectAll("g.node")
                            .data(nodes, function (d) {
                                return d.id;
                            });


                        // Enter any new nodes.
                        var nodeEnter = node.enter().append("svg:g")
                            .attr("class", "node")
                            .attr("transform", function (d) {
                                return "translate(" + d.x + "," + d.y + ")";
                            })
                            .on("click", click)
                            .call(force.drag);

                        // Append a circle
                        nodeEnter.append("svg:circle")
                            //.attr("r", function(d) { return Math.sqrt(d.size) / 10 || 4.5; })
                            .attr("r", 14)
                            .style("fill", function (d) {
                                if (d.name == "") {
                                    return '#00AFF0'
                                } else {
                                    return "#DDD"
                                }
                            });
                        //.style("fill", "#DDD");


                        // Append images
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


                        // make the image grow a little on mouse over and add the text details on click
                        var setEvents = images
                            // Append hero text
                            .on('click', function (d) {
                                d3.select("h1").html(d.hero);
                                d3.select("h2").html(d.name);
                            })


                        // Append name on roll over next to the node as well
                        nodeEnter.append("text")
                            //.attr("class", "nodetext")
                            .attr("x", x_browser)
                            .attr("y", y_browser - 15)
                            .attr("class", "truncate")
                            .attr("text-anchor", "middle")
                            .attr("font-size", "10px")
                            .attr("fill", tcBlack)
                            .text(function (d) {
                                return d.name;
                            });
                        text.attr("transform",  function(d) {
      return "translate(" + d.x + "," + d.y + ")"; 
    });

                        // Exit any old nodes.
                        node.exit().remove();


                        // Re-select for update.
                        path = vis.selectAll("path.link");
                        node = vis.selectAll("g.node");

                        function tick() {


                            path.attr("d", function (d) {

                                var dx = d.target.x - d.source.x,
                                    dy = d.target.y - d.source.y,
                                    dr = Math.sqrt(dx * dx + dy * dy);
                                return "M" + d.source.x + "," + d.source.y + "A" + dr + "," + dr + " 0 0,1 " + d.target.x + "," + d.target.y;
                            });
                            node.attr("transform", nodeTransform);
                        }
                    }


                    
                    function nodeTransform(d) {
                        d.x = Math.max(maxNodeSize, Math.min(w - (d.imgwidth / 2 || 16), d.x));
                        d.y = Math.max(maxNodeSize, Math.min(h - (d.imgheight / 2 || 16), d.y));
                        return "translate(" + d.x + "," + d.y + ")";
                    }

                    function click(d) {
                        if (d.children) {
                            d._children = d.children;
                            d.children = null;
                        } else {
                            d.children = d._children;
                            d._children = null;
                        }

                        update();
                    }


                    function flatten(root) {
                        var nodes = [];
                        var i = 0;

                        function recurse(node) {
                            if (node.children)
                                node.children.forEach(recurse);
                            if (!node.id)
                                node.id = ++i;
                            nodes.push(node);
                        }

                        recurse(root);
                        return nodes;
                    }
                })

            }

            */
                    
            var width = 600,
                        height = 380,
                        root;

                    var force = d3.layout.force()
                        .linkDistance(60)
                        .charge(-100)
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
                                        console.log(JSON.stringify(topo))
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
                      link = link.data(links, function(d) { return d.target.id; });

                      link.exit().remove();

                      link.enter().insert("line", ".node")
                          .attr("class", "link");

                      // Update nodes.
                      node = node.data(nodes, function(d) { return d.id; });

                      node.exit().remove();

                      var nodeEnter = node.enter().append("g")
                          .attr("class", "node")
                          .on("click", click)
                          .call(force.drag);

                      nodeEnter.append("circle")
                          .attr("r", function(d) { return Math.sqrt(d.size) / 20 || 12; });

                    nodeEnter.append("title")
                        .text(function(d) {
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
                          .text(function(d) { return d.fullname; });

                      node.select("circle")
                          .style("fill", color);
                    }

                        force.on("tick", function(e) {
                          var k = 6 * e.alpha;
                        d3.layout.tree().links(flatten(root)).forEach(function(d, i) {
                          d.source.y -= k;
                          d.target.y += k;
                        });
                        link.attr("x1", function(d) { return d.source.x; })
                            .attr("y1", function(d) { return d.source.y; })
                            .attr("x2", function(d) { return d.target.x; })
                            .attr("y2", function(d) { return d.target.y; });

                        node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
                      });
                    function tick() {
                      link.attr("x1", function(d) { return d.source.x; })
                          .attr("y1", function(d) { return d.source.y; })
                          .attr("x2", function(d) { return d.target.x; })
                          .attr("y2", function(d) { return d.target.y; });

                      node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
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
                      var nodes = [], i = 0;

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





            /*getService.getAlerts().then(function (response) {
                $scope.alertsData = response.data;
                $scope.alertsCount = response.data.length;
            });*/

            poollingFactory.callFnOnInterval(function () {
                getService.getAlerts().then(function (response) {
                    $scope.sampleData = response.data;
                    $scope.sampleDataCount = response.data.length;

                });
                $scope.$watch('sampleData', function (newValue, oldValue) {
                    if (!angular.equals(newValue, oldValue)) {
                        $scope.alertsData = angular.copy($scope.sampleData);
                        console.log($scope.sampleData.length);
                        $scope.loadMore();
                    }
                });
            });
            
            var counter = 0;
              $scope.loadMore = function() {
                $scope.limit += 5;
              };

              //$scope.loadMore();

              $scope.performSearch = function(searchText) {
                    $scope.filtered = $filter('filter')($scope.items, $scope.search);
                }

                $scope.search = function (item){
                    if (!$scope.searchText)
                        return true;

                    if (item.Title.indexOf($scope.searchText)!=-1 || item.Title.indexOf($scope.searchText)!=-1) {
                            return true;
                        }
                        return false;
                    
                };

            
            $scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent) {
                //you also get the actual event object
                //do stuff, execute functions -- whatever...
                //alert('hi');
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

                /*getService.getSeries2(obj.entityname, startUnixValue, startUnixValue).then(function (response) {
                    $scope.SeriesData2 = response.points;
                });
*/

                /*$.each($scope.SeriesData1, function (i, points) {
                    $.each(points, function (j, point) {
                        if (j == 0)
                            dateArray.push(point);
                        if (j == 1)
                            valueArray.push(point);
                    });
                });
                console.log(dataArray)
                for (var i = 0; i < dateArray.length; i++) {

                    var _year = moment(dateArray[i]).format('YYYY');
                    var _month = moment(dateArray[i]).format('MM');
                    var _date = moment(dateArray[i]).format('DD');
                    var _hour = moment(dateArray[i]).format('HH');
                    var _min = moment(dateArray[i]).format('mm');
                    var _sec = moment(dateArray[i]).format('ss');
                    var completeDate = Date.UTC(_year, _month, _date, _hour, _min, _sec)
                    data1.push([completeDate, valueArray[i]]);
                }

                $.each($scope.SeriesData2, function (i, pointsData) {
                    $.each(pointsData, function (j, pointData) {
                        if (j == 0)
                            date1Array.push(pointData);
                        if (j == 1)
                            value1Array.push(pointData);
                    });
                });


                for (var i = 0; i < date1Array.length; i++) {

                    var _year = moment(date1Array[i]).format('YYYY');
                    var _month = moment(date1Array[i]).format('MM');
                    var _date = moment(date1Array[i]).format('DD');
                    var _hour = moment(date1Array[i]).format('HH');
                    var _min = moment(date1Array[i]).format('mm');
                    var _sec = moment(date1Array[i]).format('ss');
                    var completeDate1 = Date.UTC(_year, _month, _date, _hour, _min, _sec)
                    data2.push([completeDate1, value1Array[i]]);
                }


                var chart = new Highcharts.Chart({

                    chart: {
                        renderTo: metricChart,
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
                        type: 'datetime'
                    },
                    yAxis: {
                        title: {
                            text: ''
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
                            name: 'jmeterstats.DBExecutionTime',
                            data: data2,
                            "color": '#006000'
            }, {
                            name: 'anomalytukey.DBExecutionTime',
                            type: 'scatter',
                            data: data1,
                            "color": '#FFA500'

        }
            ]

                });*/

                /*chart = $('#metricChart').highcharts();
                var el = $('.chart-inner');
                el.css('width', '100%');
                chart.setSize(el.width(), el.height(), true);
*/
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
                        console.log(offsetHeight);
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
                                //	out += L.Util.template(popupTmpl,data.population[i]);
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


            }]);

    angular.module('tracehive.controller.ModalController', [])
        .controller('ModalController', function ($scope, close) {

            $scope.close = function (result) {
                close(result, 500); // close, but give 500ms for bootstrap to animate
            };

        });


    angular.module('tracehive.controller.sensors', [])

    .controller('sensorsCtrl', ['$scope', '$state', '$http', 'getService', function ($scope, $state, $http, getService) {
        getService.getAllCities().then(function (response) {
            $scope.locationList = response;
        });

        $scope.sensorslist = []
        getService.getSensorList().then(function (response) {
            $scope.sensorslist = response;
        });


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
            console.log(JSON.stringify(topo));

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
              link = link.data(links, function(d) { return d.target.id; });

              link.exit().remove();

              link.enter().insert("line", ".node")
                  .attr("class", "link");

              // Update nodes.
              node = node.data(nodes, function(d) { return d.id; });

              node.exit().remove();

              var nodeEnter = node.enter().append("g")
                  .attr("class", "node")
                  .on("click", click)
                  .call(force.drag);

              nodeEnter.append("circle")
                  .attr("r", function(d) { return Math.sqrt(d.size) / 20 || 12; });

            nodeEnter.append("title")
                .text(function(d) {
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
                  .text(function(d) { return d.name; });

              node.select("circle")
                  .style("fill", color);
            }

                force.on("tick", function(e) {
                  var k = 6 * e.alpha;
                d3.layout.tree().links(flatten(root)).forEach(function(d, i) {
                  d.source.y -= k;
                  d.target.y += k;
                });
                link.attr("x1", function(d) { return d.source.x; })
                    .attr("y1", function(d) { return d.source.y; })
                    .attr("x2", function(d) { return d.target.x; })
                    .attr("y2", function(d) { return d.target.y; });

                node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
              });
            function tick() {
              link.attr("x1", function(d) { return d.source.x; })
                  .attr("y1", function(d) { return d.source.y; })
                  .attr("x2", function(d) { return d.target.x; })
                  .attr("y2", function(d) { return d.target.y; });

              node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
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
              var nodes = [], i = 0;

              function recurse(node) {
                if (node.children) node.children.forEach(recurse);
                if (!node.id) node.id = ++i;
                nodes.push(node);
              }

              recurse(root);
              return nodes;
            }


            //topology View
            /*var color = d3.scale.category10();

            // some colour variables
            var tcBlack = "#130C0E";


            // rest of vars
            var w = 580,
                h = 250,
                maxNodeSize = 50,
                x_browser = 20,
                y_browser = 25,
                root;

            var vis;
            var force = d3.layout.force();



            //d3.json("http://localhost/previnsight/Development/Src/Tracehive/scripts/json/topo.json", function(json) {
            var topo = {
                    "name": "",
                    "children": desiredOutput
                }
                //alert(JSON.stringify(topo));
            //console.log(JSON.stringify(topo));

            root = topo
            root.fixed = true;
            root.x = w / 2;
            root.y = h / 4;
            d3.select("svg").remove();
            $("#topoView").html();
            vis = d3.select("#topoView").append("svg").attr("width", w).attr("height", h);

            // Build the path
            var defs = vis.insert("svg:defs")
                .data(["end"]);


            defs.enter().append("svg:path")
                .attr("d", "M0,-5L10,0L0,5");

            update();
            //});


            function update() { //


                //vis.selectAll("svg").remove();



                var nodes = flatten(root),
                    links = d3.layout.tree().links(nodes);

               
                // Restart the force layout.
                force.nodes(nodes)
                    .links(links)
                    .gravity(0.05)
                    .charge(-1500)
                    .linkDistance(60)
                    .friction(0.5)
                    .linkStrength(function (l, i) {
                        return 1;
                    })
                    .size([w, h])
                    //.on("tick", tick)
                    .start();

                force.on('tick', function(e) {
                  nodes.forEach(function(d) {
                    d.y += (height/2 - d.y) * e.alpha;
                  });
                })


                var path = vis.selectAll("path.link")
                    .data(links, function (d) {
                        return d.target.id;
                    });

                path.enter().insert("svg:path")
                    .attr("class", "link")
                    .style("stroke", "#eee");

                // Exit any old paths.
                path.exit().remove();

                // Update the nodesÃ¢â‚¬Â¦
                var node = vis.selectAll("g.node")
                    .data(nodes, function (d) {
                        return d.id;
                    });


                // Enter any new nodes.
                var nodeEnter = node.enter().append("svg:g")
                    .attr("class", "node")
                    .attr("transform", function (d) {
                        return "translate(" + d.x + "," + d.y + ")";
                    })
                    .on("click", click)
                    .call(force.drag);

                // Append a circle
                nodeEnter.append("svg:circle")
                    //.attr("r", function(d) { return Math.sqrt(d.size) / 10 || 4.5; })
                    .attr("r", 14)
                    .style("fill", function (d) {
                        if (d.name == "") {
                            return '#00AFF0'
                        } else {
                            return "#DDD"
                        }
                    });

                //.style("fill", "#DDD");


                // Append images
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


                // make the image grow a little on mouse over and add the text details on click
                var setEvents = images
                    // Append hero text
                    .on('click', function (d) {
                        d3.select("h1").html(d.hero);
                        d3.select("h2").html(d.name);
                    })


                // Append name on roll over next to the node as well
                nodeEnter.append("text")
                    //.attr("class", "nodetext")
                    .attr("x", x_browser)
                    .attr("y", y_browser - 15)
                    .attr("font-size", "10px")
                    .attr("fill", tcBlack)
                    .text(function (d) {
                        return d.name;
                    });


                // Exit any old nodes.
                node.exit().remove();


                // Re-select for update.
                path = vis.selectAll("path.link");
                node = vis.selectAll("g.node");

                function tick() {


                    path.attr("d", function (d) {

                        var dx = d.target.x - d.source.x,
                            dy = d.target.y - d.source.y,
                            dr = Math.sqrt(dx * dx + dy * dy);
                        return "M" + d.source.x + "," + d.source.y + "A" + dr + "," + dr + " 0 0,1 " + d.target.x + "," + d.target.y;
                    });
                    node.attr("transform", nodeTransform);
                }
            }


            function nodeTransform(d) {
                d.x = Math.max(maxNodeSize, Math.min(w - (d.imgwidth / 2 || 16), d.x));
                d.y = Math.max(maxNodeSize, Math.min(h - (d.imgheight / 2 || 16), d.y));
                return "translate(" + d.x + "," + d.y + ")";
            }

            function click(d) {
                if (d.children) {
                    d._children = d.children;
                    d.children = null;
                } else {
                    d.children = d._children;
                    d._children = null;
                }

                update();
            }

            function nodeTransform(d) {
                d.x = Math.max(maxNodeSize, Math.min(w - (d.imgwidth / 2 || 16), d.x));
                d.y = Math.max(maxNodeSize, Math.min(h - (d.imgheight / 2 || 16), d.y));
                return "translate(" + d.x + "," + d.y + ")";
            }

            function click(d) {
                if (d.children) {
                    d._children = d.children;
                    d.children = null;
                } else {
                    d.children = d._children;
                    d._children = null;
                }

                update();
            }


            function flatten(root) {
                var nodes = [];
                var i = 0;

                function recurse(node) {
                    if (node.children)
                        node.children.forEach(recurse);
                    if (!node.id)
                        node.id = ++i;
                    nodes.push(node);
                }

                recurse(root);
                return nodes;
            }*/


        }





        $scope.onGetSensorName = function (sensorName) {


            var startUnixValue = moment().subtract(2, "minutes").unix() * 1000;
            var endUnixValue = moment().unix() * 1000;



            getService.getSeries1(sensorName, startUnixValue, endUnixValue).then(function (response) {
                $scope.SeriesData1 = response.points;
                console.log($scope.SeriesData1);


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
            
            angular.forEach($scope.sensorslist, function(value, index){
                if(value.sensor_id == sensorId){
                 getService.deleteSensor(sensorId).then(function(response){
                 }); 
                $scope.sensorslist.splice(index, 1);
                }
            })
            $(".modal-backdrop").hide()
        }

}])


    .controller('addSensorCtrl', ['$scope', '$state', '$http', '$filter', 'getService', 'ngToast', function ($scope, $state, $http, $filter, getService, ngToast) {

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
                $scope.addSensorData.sensor_unique_id = response[0].sensor_unique_id;
                $scope.addSensorData.selectedManufacturer = response[0].manufacturer_id;
                $scope.addSensorData.selectedModel = response[0].model_id;
                $scope.addSensorData.upc = response[0].UPC;
                $scope.addSensorData.selectedMachinery = response[0].machinery_id;
                $scope.addSensorData.value = response[0].value;
                $scope.addSensorData.description = response[0].description;
                $scope.addSensorData.selectedParameter = response[0].parameter_id;

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
                console.log(response);
                if (response.SUB_TYPE == "Integer" || "Float")
                    $scope.addSensorData.value = response.TARGET + " " + response.UNIT;
                else
                    $scope.addSensorData.value = response.TARGET;
            });
        }

        $scope.onCancelSensor = function () {
            $state.go('sensors')
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

            //alert($scope.events)


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
                i_sensor_unique_id: $scope.addSensorData.sensor_unique_id,

            };

            console.log(JSON.stringify(data));


            if ($scope.addForm.$valid && !$scope.eventsEmptyArr) {
                getService.addSenser(data).then(function (response) {

                    $state.go('sensors');
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

    .controller('parametersCtrl', ['$scope', '$state', '$http', 'getService', function ($scope, $state, $http, getService) {

        getService.getAllCities().then(function (response) {
            $scope.locationList = response;
        });

        getService.getParameterLibrary().then(function (response) {
            $scope.parameterslist = response;
        });

        $scope.deleteParameter = function (paramId) {
            angular.forEach($scope.parameterslist, function(value, index){
                if(value.PARAMETER_ID == paramId){
                 getService.deleteParameter(paramId).then(function(response){
                 }); 
                $scope.parameterslist.splice(index, 1);
                }
            })
            $(".modal-backdrop").hide();
        }

}])

    .controller('addParameterCtrl', ['$scope', '$state', '$filter', '$http', 'getService', 'ngToast', function ($scope, $state, $filter, $http, getService, ngToast) {

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

        var date = new Date();
        var currentdate = $filter('date')(new Date(), 'yyyy-MM-dd HH:mm:ss');

        $scope.paramerterTypes = ['In Process', 'Quality', 'Quantity', 'General'];
        $scope.paramerterSubTypes = ['String', 'Float', 'Integer', 'Boolean'];
        $scope.unitValues = ['Deg C', 'PA', '%', 'RPM'];
        $scope.addParameterData = {};
        $scope.addParameterData.unit = $scope.unitValues[0];


        var parameter_id = $.urlParam('id');
        if (parameter_id) {
            getService.editParameter(parameter_id).then(function (response) {
                console.log(response[0]);
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
            console.log($scope.setValueItems);
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
            //alert($scope.target2);
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
                            //alert(index+1+" "+i)
                            if (index + 1 == i) {
                                data[key1] = valueData.value;

                            } else if (i > index + 1) {
                                data[key1] = null;

                            }
                        })



                    }
                    console.log(JSON.stringify($scope.setValueItems));
                } else if ($scope.addParameterData.selectedSubType == "Boolean") {
                    //alert($scope.addParameterData.selectedBooleanTargetValue);
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

                console.log(JSON.stringify(data));
                var config = {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
                    }
                }

                //console.log(JSON.stringify(data));

                getService.addParameter(data).then(function (response) {

                    $state.go('parameters');
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

    .controller('machineryCtrl', ['$scope', '$state', '$http', 'getService', function ($scope, $state, $http, getService) {
        getService.getAllCities().then(function (response) {
            $scope.locationList = response;
        });

        getService.getMachinaryLibrary().then(function (response) {
            $scope.machinerieslist = response;
        });
        $scope.deleteMachinery = function (machineryID) {
            angular.forEach($scope.machinerieslist, function(value, index){
                if(value.MACHINERY_ID == machineryID){
                 getService.deleteMachinery(machineryID).then(function(response){
                 }); 
                $scope.machinerieslist.splice(index, 1);
                }
            })
            $(".modal-backdrop").hide()
        }

}])

    .controller('addmachineryCtrl', ['$scope', '$state', '$q', '$timeout', '$filter', '$http', 'getService', 'ngToast', function ($scope, $state, $q, $timeout, $filter, $http, getService, ngToast) {
        getService.getAllCities().then(function (response) {
            $scope.locationList = response;
        });

        $scope.image = null;
        $scope.imageFileName = '';
        $scope.uploadme = {};
        $scope.uploadme.src = '';

        var date = new Date();
        var currentdate = $filter('date')(new Date(), 'yyyy-MM-dd HH:mm:ss');


        $scope.addMachineryData = {}


        var machinery_id = $.urlParam('id');
        getService.getSensorNameList().then(function (response) {
            $scope.sensorNames = response;
        });


        if (machinery_id) {

            getService.editMachinery(machinery_id).then(function (response) {
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
                $scope.addMachineryData.selectedSensors = $scope.selectedSensorsArray;
                $scope.addMachineryData.machinery_code = response[0].MACHINERY_CODE;
                $scope.addMachineryData.machinery_name = response[0].name;
                $scope.addMachineryData.description = response[0].description;
                $scope.uploadme.src = response[0].image;
            });

        }
        $scope.sensorNames = [];

        $scope.locationSelect = function () {
            $scope.locationSelect = false;
        }

        $scope.menu = [];
        getService.getAllLocations().then(function (response) {
            $scope.menu = {
                title: 'Locations',
                id: 'menuId',
                items: response
            };
        });

        $scope.events = [];
        $scope.rest = {};
        $scope.rest.options = {
            containersToPush: [$('#pushobj')],
            direction: 'ltr',
            collapsed: false,
            fullCollapse: true,
            onGroupItemClick: function (event, item) {
                if ($scope.events[$scope.events.length - 1] != item.name) {
                    $scope.events.push(item.name);
                } else {
                    event.preventDefault();
                }
            },
            onItemClick: function (event, item) {
                if ($scope.events[$scope.events.length - 1] != item.name) {
                    $scope.events.push(item.name);
                } else {
                    event.preventDefault();
                }
            },
        };
        $scope.locationDone = false;
        $scope.locationEditBtn = false;
        $scope.locationSelectBtn = true;
        $scope.locationSelect = function (e) {
            $scope.location = true;
        }
        $scope.locationSeleted = function (e) {
            $scope.locationDone = true;
            $scope.location = false;
            $scope.locationEditBtn = true;
            $scope.locationSelectBtn = false;
        }
        $scope.locationEdit = function (e) {
            console.log('clicked');
            $scope.events = [];
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
            var form = $scope.addForm;
            //alert($scope.target2);
            //Force the field validation
            angular.forEach(form, function (obj) {
                if (angular.isObject(obj) && angular.isDefined(obj.$setDirty))

                {

                    obj.$setDirty();
                }
            })
            if ($scope.addForm.$valid) {
                $scope.selectedSensorName = [];

                angular.forEach($scope.sensorNames, function (obj) {
                    angular.forEach($scope.addMachineryData.selectedSensors, function (senData) {
                        if (obj.sensor_id == senData)
                            $scope.selectedSensorName.push(obj.sensor_name)
                    })

                })

                var data = {
                    "i_machinery_code": $scope.addMachineryData.machinery_code,
                    "i_name": $scope.addMachineryData.machinery_name,
                    "i_country": $scope.events[0] || null,
                    "i_city": $scope.events[1] || null,
                    "i_addr1": $scope.events[2] || null,
                    "i_addr2": $scope.events[3] || null,
                    "i_addr3": $scope.events[4] || null,
                    "i_addr4": $scope.events[5] || null,
                    "i_sensor_code": $scope.selectedSensorName.toString(),
                    "i_description": $scope.addMachineryData.description,
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

                    $state.go('machinery');
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
        .controller('invetoryCtrl', ['$scope', '$state', 'getService', function ($scope, $state, getService) {

            /*$http.get("scripts/json/inventories.json").success(function (inventories) {
                $scope.inventorieslist = inventories;
            });*/

            getService.getAllCities().then(function (response) {
                $scope.locationList = response;
            });

            getService.getAllinventory().then(function (response) {
                $scope.inventorieslist = response;
                console.log(JSON.stringify(response));
            });

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
                angular.forEach($scope.inventorieslist, function(value, index){
                    if(value.INVENTORY_ID == inventoryID){
                     getService.deleteInventory(inventoryID).then(function(response){
                     }); 
                    $scope.inventorieslist.splice(index, 1);
                    }
                })
                $(".modal-backdrop").hide();
            }

}])

    .controller('addinvetoryCtrl', ['$scope', '$state', 'getService', function ($scope, $state, getService) {
        getService.getAllCities().then(function (response) {
            $scope.locationList = response;
        });

        $scope.events = [];
        $scope.eventsEmptyArr = false;
        $scope.locationSelectBtn = true;
        
        $scope.categoryTypes =['Supplements', 'Diet & Energy Dring', 'Personal Care', 'Vitamin Mixtures', 'Raw Materials', 'Excipients', 'Mixtures', 'Intermediates', 'API', 'Final Product']
        $scope.addInventoryData = {};
        $scope.machineries = [];
        getService.getMachineryList().then(function (response) {
            $scope.machineries = response
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
        var inventory_id = $.urlParam('id');
        $scope.uploadme = {};
        $scope.uploadme.src = '';

        $scope.getParameterValue = function (sensorid) {
            angular.forEach($scope.sensors, function (obj) {
                if (obj.sensor_id == sensorid)
                    $scope.addInventoryData.parameter_id = obj.parameter_name;
            });
        }
        if (inventory_id) {

            getService.editInventory(inventory_id).then(function (response) {
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
            
            
            console.log(JSON.stringify($scope.events));
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
                    "i_MACHINERY_ID": $scope.addInventoryData.machinery_id,
                    "i_SENSOR_ID": $scope.addInventoryData.sensor_id,
                    "i_PARAMETER_ID": $scope.addInventoryData.parameter_id,
                    "i_GOAL": $scope.addInventoryData.goal,
                    "i_STOCK": $scope.addInventoryData.stock,
                    "i_DESCRIPTION": $scope.addInventoryData.description,
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
                console.log(JSON.stringify(data));
                
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

         $scope.addMaterialShow = function(e) {
            e.preventDefault();
            $scope.addmaterial = true;
        }
        $scope.saveNewMaterial = function(e, name, description) {
            e.preventDefault;
            var data ={MATERIAL_NAME:name, DESCRIPTION: description}
                    getService.addMaterial(data).then(function(response){
                        if(response.status =="success"){
                            $scope.materials=[];
                            getService.getMaterialList().then(function (response) {
                                angular.forEach(response, function (obj) {
                                    $scope.materials.push(obj.MATERIAL_NAME);
                                });
                            });
                            }
            })
            $scope.addmaterial = false;
            
                
            
        }
        $scope.cancelNewMaterial = function(e) {
            e.preventDefault;
            $scope.addmaterial = false;
        }

}]);
    angular.module('tracehive.controller.workorder', [])

    .controller('workordersCtrl', ['$scope', '$state', '$http', 'getService', function ($scope, $state, $http, getService) {
        getService.getAllCities().then(function (response) {
            $scope.locationList = response;
        });

        getService.getAllWorkorder().then(function (response) {
            $scope.workorderslist = response;
            //console.log(JSON.stringify(response));
        });

        $scope.deleteWorkorder = function (workorderID) {
            angular.forEach($scope.workorderslist, function(value, index){
                    if(value.WORK_ORDER_ID == workorderID){
                     getService.deleteWorkOrder(workorderID).then(function(response){
                     }); 
                    $scope.workorderslist.splice(index, 1);
                    }
                })
            $(".modal-backdrop").hide();
        }


}])


    .controller('addworkorderCtrl', ['$scope', '$http', '$state', '$sce', '$filter', 'getService', 'ngToast', '$timeout', function ($scope, $http, $state, $sce, $filter, getService, ngToast, $timeout) {
        $scope.operators = [];
        $scope.addWorkorderData = {};
        $scope.referenceSensorItems = [];
        $scope.referenceMaterialItems = [];
        $scope.referenceMachineryItems = [];
        $scope.referenceParameterItems = [];
        $scope.refernceTargetItems = [];
        $scope.inventorieslist = [];
        $scope.actualMaterials = [];
        $scope.showInventoryName = false;
        $scope.selectActualMaterial=[];
        $scope.selectActualMachinery=[];
        $scope.selectActualParameter=[];
        $scope.selectActualTarget=[];
        $scope.selectActualSensor=[];

        getService.getAllinventory().then(function (response) {
            $scope.inventorieslist = response;
            console.log(JSON.stringify(response));
            angular.forEach(response, function (obj) {
                $scope.actualMaterials.push(obj.INVENTORY_CODE);
            })

        });
        getService.getAllCities().then(function (response) {
            $scope.locationList = response;
        });

        $scope.events = [];
        $scope.addInventoryData = {};
        $scope.machineries = [];
        getService.getMachineryList().then(function (response) {
            $scope.machineries = response
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
        var inventory_id = $.urlParam('id');
        $scope.uploadme = {};
        $scope.uploadme.src = '';

        $scope.getParameterValue = function (sensorid) {
            angular.forEach($scope.sensors, function (obj) {
                if (obj.sensor_id == sensorid)
                    $scope.addInventoryData.parameter_id = obj.parameter_name;
            });
        }
        if (inventory_id) {

            getService.editInventory(inventory_id).then(function (response) {
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
            });

        }
        $scope.OnSubmitInventory = function (obj) {
            //var form = $scope.addInventoryForm;

            //Force the field validation
            /*angular.forEach(form, function (obj) {
            if (angular.isObject(obj) && angular.isDefined(obj.$setDirty))

                    {

                        obj.$setDirty();
                    }
                })*/
            console.log(JSON.stringify($scope.events));
            //if ($scope.addInventoryForm.$valid) {
            var data = {
                "i_INVENTORY_CODE": $scope.addInventoryData.inventory_name,
                "i_INVENTORY_NAME": $scope.addInventoryData.inventory_name,
                "i_CATEGORY": $scope.addInventoryData.category,
                "i_ITEM": $scope.addInventoryData.item,
                "i_COUNTRY": $scope.events[0] || null,
                "i_CITY": $scope.events[1] || null,
                "i_ADDR1": $scope.events[2] || null,
                "i_ADDR2": $scope.events[3] || null,
                "i_ADDR3": $scope.events[4] || null,
                "i_ADDR4": $scope.events[5] || null,
                "i_MACHINERY_ID": $scope.addInventoryData.machinery_id,
                "i_SENSOR_ID": $scope.addInventoryData.sensor_id,
                "i_PARAMETER_ID": $scope.addInventoryData.parameter_id,
                "i_GOAL": $scope.addInventoryData.goal,
                "i_STOCK": $scope.addInventoryData.stock,
                "i_DESCRIPTION": $scope.addInventoryData.description,
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
            console.log(JSON.stringify(data));
            getService.addInventory(data).then(function (response) {
                //alert(JSON.stringify(data));
                $scope.showInventoryName = "true";
                //$state.go('invetory');
                //if (inventory_id) {
                //ngToast.create('Inventory Edited Successfully');
                //} else {
                //  ngToast.create('New Inventory Added Successfully');
                //}

            });
            //}
        }
        $scope.menu = [];
        getService.getAllLocations().then(function (response) {
            $scope.menu = {
                title: 'Locations',
                id: 'menuId',
                items: response
            };
        })

        $scope.rest = {};
        $scope.rest.options = {
            containersToPush: [$('#pushobj')],
            direction: 'ltr',
            collapsed: false,
            fullCollapse: true,
            onGroupItemClick: function (event, item) {
                if ($scope.events[$scope.events.length - 1] != item.name) {
                    $scope.events.push(item.name);
                } else {
                    event.preventDefault();
                }
            },
            onItemClick: function (event, item) {
                if ($scope.events[$scope.events.length - 1] != item.name) {
                    $scope.events.push(item.name);
                } else {
                    event.preventDefault();
                }
            },
        };
        $scope.locationDone = false;
        $scope.locationEditBtn = false;
        $scope.locationSelectBtn = true;
        $scope.locationSelect = function () {
            $scope.location = true;
        }
        $scope.locationSeleted = function (e) {
            e.preventDefault();
            $scope.locationDone = true;
            $scope.location = false;
            $scope.locationEditBtn = true;
            $scope.locationSelectBtn = false;

        }
        $scope.locationEdit = function (e) {
            e.preventDefault();
            console.log('clicked');
            $scope.events = [];
            $scope.rest.options.collapsed = true;
            $scope.location = true;
            $scope.locationDone = false;
        }

        $scope.locationCancel = function (e) {
            e.preventDefault();
            $scope.location = false;
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
            //alert("disable");
        }
        if (workorder_id) {
            getService.editWorkorder(workorder_id).then(function (response) {
                console.log(response);
                $scope.addWorkorderData.workorder_id = response[0].WO_NUMBER;
                $scope.addWorkorderData.selectOperatorId = response[0].OPERATOR_NAME;
                $scope.addWorkorderData.selectedRecipe = response[0].RECIPE_NAME;
                $scope.addWorkorderData.TargetValue = response[0].TARGET_MATERIAL;
                $scope.addWorkorderData.actualyield = response[0].ACTUAL_YIELD;
                $scope.addWorkorderData.actualyieldvalue = response[0].VALUE;
                $scope.addWorkorderData.description = response[0].DESCRIPTION;
                $scope.addWorkorderData.request = response[0].QUANTITY_REQUESTED;
                $scope.addWorkorderData.made = response[0].QUANTITY_MADE;
                $scope.addWorkorderData.status = 'inprogress';
                $scope.getModelData(response[0].RECIPE_NAME);
                
                if(response[0].INVENTORY_CODE != null){
                $scope.showInventoryName = true;
                    $scope.addInventoryData.inventory_name = response[0].INVENTORY_CODE;
                }
                else
                $scope.showInventoryName = false;   
            });
            
            getService.editWorkorderReferenceByID(workorder_id).then(function(response){
                console.log(response);
            })

        }
        
        $scope.redirectInventory = function(){
            
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
                console.log(response);
                $scope.addWorkorderData.TargetValue = response[0].ITEM_ID;
                $scope.recipeContentHtmlData = response[0].RECIPE_PROCESS;
                var sampleData = "<span></span>" + $scope.recipeContentHtmlData.toString();
                var str1 = sampleData.replace(/\'/g, "\"");
                //alert(str1);
                var $str1 = $(str1);

                //var getdata=$(str1).text();
                //alert(getdata);


                $(str1).each(function (index) {
                    //alert($(this).attr('class'));
                    //alert(index);
                    if ($(this).attr("class") == "highlights receipeSensor") {
                        $scope.referenceSensorItems.push($(this).text())

                    } else if ($(this).attr("class") == "highlights receipeMaterial") {
                        $scope.referenceMaterialItems.push($(this).text())
                    } else if ($(this).attr("class") == "highlights receipeMachinery") {
                        $scope.referenceMachineryItems.push($(this).text())
                    } else if ($(this).attr("class") == "highlights receipeParameter") {
                        $scope.referenceParameterItems.push($(this).text())
                    }

                    angular.forEach($scope.actualParameterDataList, function (obj) {
                        if ($scope.referenceParameterItems[0] == obj.PARAMETER_NAME)
                            $scope.refernceTargetItems.push(obj.TARGET);
                    })


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

                //alert(JSON.stringify($scope.referenceItems));


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
                //alert('hi'+$('#referenceData').html())
                $('div', $('#referenceData')).each(function () {
                    console.log($(this)); //log every element found to console output
                })

            });
            getService.editProductProfileById(recipe_id).then(function (response) {
                $scope.productProfileItems = response;
                //alert(JSON.stringify(response));
                console.log(JSON.stringify(response));


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



        // $scope.actualMaterialDatas = ['Material 01', 'Material 02', 'Material 03', 'Material 04', 'Material 05'];

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

        $scope.addTargetActualDone = function (e) {
            e.preventDefault();
            $scope.actualTargetBox0 = false;
            $scope.actualTargetBox1 = false;
            $scope.actualTargetBox2 = false;
            $scope.actualTargetBox3 = false;
        };
        $scope.addTargetActualCancel = function (e) {
            e.preventDefault();
            $scope.actualTargetBox0 = false;
            $scope.actualTargetBox1 = false;
            $scope.actualTargetBox2 = false;
            $scope.actualTargetBox3 = false;
        };

        // $scope.actualMachineryDatas = ['Machinery 01', 'Machinery 02', 'Machinery 03', 'Machinery 04', 'Machinery 05'];

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

        $scope.OnSubmitWorkorder = function (obj) {
            var form = $scope.addForm;
            var date = new Date();
            var currentdate = $filter('date')(new Date(), 'yyyy-MM-dd HH:mm:ss');

            /*angular.forEach(form, function (obj) {
                if (angular.isObject(obj) && angular.isDefined(obj.$setDirty))

                {

                    obj.$setDirty();
                }
            })*/
            // if ($scope.addForm.$valid) {
            var data = {



                "i_WO_NUMBER": $scope.addWorkorderData.workorder_id,
                "i_OPERATOR_NAME": $scope.addWorkorderData.selectOperatorId,
                "i_RECIPE_NAME": $scope.addWorkorderData.selectedRecipe,
                "i_TARGET_MATERIAL": $scope.addWorkorderData.TargetValue,
                "i_ACTUAL_YIELD": $scope.addWorkorderData.actualyield,
                "i_VALUE": $scope.addWorkorderData.actualyieldvalue,
                "i_DESCRIPTION": $scope.addWorkorderData.description,
                "i_QUANTITY_REQUESTED": $scope.addWorkorderData.request,
                "i_QUANTITY_MADE": $scope.addWorkorderData.made,
                "i_STATUS": $scope.addWorkorderData.status,
                "i_QUANTITY_UNITS": "test",
                "i_INVENTORY_CODE":	$scope.addInventoryData.inventory_name,	
                "i_CREATION_DATE": currentdate,
                "i_LAST_UPDATED_DATE": currentdate,
                "i_LAST_UPDATED_BY": "admin",
                "i_CREATED_BY": "admin"
            }
            for (var i = 1; i <= 10; i++) {
                var key1 = "i_WO_PR_ID_" + i;
                var key2 = "i_MATERIAL_" + i;
                var key3 = "i_MATERIAL_NEW_" + i;
                var key4 = "i_PARAMETER_" + i;
                var key5 = "i_PARAMETER_NEW_" + i;
                var key6 = "i_TARGET_" + i;
                var key7 = "i_TARGET_NEW_" + i;
                var key8 = "i_MACHINERY_" + i;
                var key9 = "i_MACHINERY_NEW_" + i;
                var key10 = "i_ACTUAL_" + i;
                var key11 = "i_ACTUAL_NEW_" + i;
                var key12 = "i_ACTION_" + i;
                var key13 = "i_ACTION_NEW_" + i;
                var key14 = "i_TYPE_PR_" + i;



                var dataCount = i - 1;
                var index = 0;
                //$scope.productReferenceItems.forEach(function(value, index){
                //alert(index+1+" "+i)
            //    if (index + 1 == i) {
                    //var actualMaterial = '$scope.selectActualMaterial'+i;
                
                
                    data[key1] = ""
                    data[key2] = $scope.referenceMaterialItems[i-1] || null;
                    data[key3] = $scope.selectActualMaterial[i-1] || null;
                    data[key4] = $scope.referenceParameterItems[i-1] || null;
                    data[key5] = $scope.selectActualParameter[i-1] || null ;
                    data[key6] = $scope.refernceTargetItems[i-1] || null;
                    data[key7] = $scope.selectActualTarget[i-1] || null;
                    data[key8] = $scope.referenceMachineryItems[i-1] || null;
                    data[key9] = $scope.selectActualMachinery[i-1] || null;
                    data[key10] = $scope.referenceSensorItems[i-1] || null;
                    data[key11] = $scope.selectActualSensor[i-1] || null;
                    data[key12] = "false";
                    data[key13] = "false";
                    data[key14] = "i_TYPE_PR_" + i;

               /* } else if (i > index + 1) {
                    data[key1] = null;
                    data[key2] = null;
                    data[key3] = null;
                    data[key4] = null;
                    data[key5] = null;
                    data[key6] = null;
                    data[key7] = null;
                    data[key8] = null;
                    data[key9] = null;
                    data[key10] = null;
                    data[key11] = null;
                    data[key12] = null;
                    data[key13] = null;
                    data[key14] = null;

                }*/
                //})


            }

            for (var i = 1; i <= 10; i++) {
                var key1 = "i_WO_PR_ID_" + i;
                var key2 = "i_PRODUCT_PARAMETER_" + i;
                var key3 = "i_THRESHOLD_" + i;
                var key4 = "i_TARGET_WO_1" + i;
                var key5 = "i_CRITICALITY_" + i;
                var key6 = "i_TYPE_" + i;

                $scope.productProfileItems.forEach(function (value, index) {
                    //alert(index+1+" "+i);
                    if (index + 1 == i) {
                        data[key1] = value.RECIPE_PARAM_ID;
                        data[key2] = value.PRODUCT_PARAMETER;
                        data[key3] = value.THRESHOLD;
                        data[key4] = value.TARGET;
                        data[key5] = value.CRITICALITY;
                        data[key6] = value.TYPE;
                    } else if (i > index + 1) {
                        data[key1] = null;
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
            //alert(JSON.stringify(data));
            console.log(JSON.stringify(data));

            getService.addWorkorder(data).then(function (response) {
                $state.go('workorders');
                if (workorder_id) {
                    ngToast.create('Prescription Order Edited Successfully');
                } else {
                    ngToast.create('Prescription Order Added Successfully');
                }

            });
            //}
        }


        $scope.menu = [];
        getService.getAllLocations().then(function (response) {
            $scope.menu = {
                title: 'Locations',
                id: 'menuId',
                items: response
            };
        });
        $scope.events = [];
        $scope.rest = {};
        $scope.rest.options = {
            containersToPush: [$('#pushobj')],
            direction: 'ltr',
            collapsed: false,
            fullCollapse: true,
            onGroupItemClick: function (event, item) {
                if ($scope.events[$scope.events.length - 1] != item.name) {
                    $scope.events.push(item.name);
                } else {
                    event.preventDefault();
                }
            },
            onItemClick: function (event, item) {
                if ($scope.events[$scope.events.length - 1] != item.name) {
                    $scope.events.push(item.name);
                } else {
                    event.preventDefault();
                }
            },
        };

        $scope.locationSelectBtn = true;

        $scope.locationSelect = function () {
            $scope.locationSelect = false;
        }

        $scope.locationEditBtn = false;


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
        .controller('recipesCtrl', ['$scope', '$state', '$http', 'getService', function ($scope, $state, $http, getService) {
            getService.getAllReceipes().then(function (response) {
                $scope.recipieslist = response;
                console.log(JSON.stringify(response));
            });

            getService.getAllCities().then(function (response) {
                $scope.locationList = response;
            });

            $scope.deleteRecipe = function (receipeID) {
                angular.forEach($scope.recipieslist, function(value, index){
                    if(value.RECIPE_ID == receipeID){
                     getService.deleteRecipe(receipeID).then(function(response){
                     }); 
                    $scope.recipieslist.splice(index, 1);
                    }
                })
                $(".modal-backdrop").hide();
            }


}])

    .controller('addrecipesCtrl', ['$scope', '$state', '$sce', '$filter', 'getService', function ($scope, $state, $sce, $filter, getService) {

        getService.getAllCities().then(function (response) {
            $scope.locationList = response;
        });

        $scope.machineries = [];
        $scope.uploadme = {};
        $scope.uploadme.src = '';
        $scope.addReceipeData = {};
        //$scope.setValueItems=[];
        $scope.receipeTypes = ['Process Recipe', 'Cleaning Recipe', 'General Recipe'];
        $scope.expectedYieldTypes = ['UOM', 'Kg', 'gms', 'ltr', 'ml', 'gal'];
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

            getService.editReceipe(receipe_id).then(function (response) {
                console.log(JSON.stringify(response));


                $scope.addReceipeData.name = response[0].RECIPE_NAME;
                $scope.addReceipeData.type = response[0].RECIPE_TYPE;
                $scope.addReceipeData.targetMaterial = response[0].ITEM_ID;
                $scope.addReceipeData.selectedExpectedYield = response[0].EXPECTED_UOM;
                $scope.addReceipeData.expectedYieldValue = response[0].EXPECTED_VALUE;
                $scope.addReceipeData.Description = response[0].DESCRIPTION;
                $scope.myHtmlVar = response[0].RECIPE_PROCESS;
                $scope.uploadme.src = response[0].IMAGE;



            })

            getService.editProductProfileById(receipe_id).then(function (response) {
                console.log(JSON.stringify(response));

                angular.forEach(response, function (obj) {
                    //alert(JSON.stringify(obj));
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

                    console.log(JSON.stringify($scope.productProfileItems));

                })

            })



        }

        getService.getMachineryList().then(function (response) {
            angular.forEach(response, function (obj) {
                $scope.machineries.push(obj.MACHINERY_CODE);
            })

        });

        $scope.machineryBox = false;
        $scope.machineryBox = false;
        $scope.addRecipeMachineries = function (e) {
            e.preventDefault();
            $scope.machineryBox = true;
        }

        $scope.recipeMachnieryDone = function (e) {
            e.preventDefault();
            $scope.machineryBox = false;
            $scope.textvalue = angular.element('#getrecipeuserinputvalue').html();
            $scope.myHtmlVar = $scope.textvalue + " <span class='highlights receipeMachinery' readonly>" + $scope.selectRecipeEquipemt + "</span>&nbsp;" + " ";
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
            e.preventDefault();
            $scope.materialBox = false;
            $scope.textvalue = angular.element('#getrecipeuserinputvalue').html();
            $scope.myHtmlVar = $scope.textvalue + " <span class='highlights receipeMaterial' readonly>" + $scope.selectRecipeMaterial + "</span>&nbsp;" + " ";
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
            e.preventDefault();
            $scope.parameterBox = false;
            $scope.textvalue = angular.element('#getrecipeuserinputvalue').html();
            $scope.myHtmlVar = $scope.textvalue + " <span class='highlights receipeParameter' readonly>" + $scope.selectRecipeParameter + "</span>&nbsp;" + " ";
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

        //$scope.sensors = ['Sensor1', 'Sensor2', 'Sensor3', 'Sensor4', 'Sensor5', 'Sensor6', 'Sensor7', 'Sensor8'];

        $scope.addRecipeSensor = function (e) {
            e.preventDefault();
            $scope.sensorBox = true;
        }

        $scope.recipeSensorDone = function (e) {
            e.preventDefault();
            $scope.sensorBox = false;
            $scope.textvalue = angular.element('#getrecipeuserinputvalue').html();
            $scope.myHtmlVar = $scope.textvalue + " <span class='highlights receipeSensor' readonly>" + $scope.selectRecipeSensor + "</span>&nbsp;" + " ";
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
            console.log($scope.myHtmlVar);

            var data = {
                "i_RECIPE_NAME": $scope.addReceipeData.name,
                "i_RECIPE_TYPE": $scope.addReceipeData.type,
                "i_ITEM_ID": $scope.addReceipeData.targetMaterial,
                "i_RECIPE_ID": receipe_id,
                "i_EXPECTED_UOM": $scope.addReceipeData.selectedExpectedYield,
                "i_EXPECTED_VALUE": $scope.addReceipeData.expectedYieldValue,
                "i_DESCRIPTION": $scope.addReceipeData.Description,
                "i_RECIPE_PROCESS": $scope.myHtmlVar,
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
                    //alert(index+1+" "+i);
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
            //alert($scope.target2);
            //Force the field validation
            angular.forEach(form, function (obj) {
                if (angular.isObject(obj) && angular.isDefined(obj.$setDirty))

                {

                    obj.$setDirty();
                }
            })

            if ($scope.addForm.$valid) {


                getService.addReceipe(data).then(function (response) {

                    $state.go('recipes');
                    //alert('success')

                });


            }

        }

}]);

    angular.module('tracehive.controller.report', [])
        .controller('reportsCtrl', ['$scope', '$state', '$http', function ($scope, $state, $http) {

}]);

    angular.module('tracehive.controller.notification', [])
        .controller('notificationsCtrl', ['$scope', '$state', '$sce', function ($scope, $state, $sce) {
            getService.getAllCities().then(function (response) {
                $scope.locationList = response;
            });
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
        .controller('addlocationCtrl', ['$scope', function ($scope) {
            getService.getAllCities().then(function (response) {
                $scope.locationList = response;
            });
            $scope.location = [];
            $scope.subLocation = [];
            $scope.locationBreadcrums = [];
            $scope.secondsubLocation = [];
            $scope.thirdsubLocation = [];
            $scope.fourthsubLocation = [];

            $scope.locationBox = false;
            $scope.sublocationBox = false;
            $scope.secondSublocationBox = false;
            $scope.thirdSublocationBox = false;
            $scope.fourthSublocationBox = false;

            $scope.addLocationCont = function (e) {
                e.preventDefault();
                $scope.locationBox = true;
            };

            // start First Level 
            $scope.addLocationDone = function (e) {
                e.preventDefault();
                $scope.locationBox = false;
                var obj = {};
                obj[$scope.locationName] = {
                    locationName: $scope.locationName,
                    address1: $scope.address1,
                    address2: $scope.address2,
                    country: $scope.country,
                    state: $scope.state,
                    city: $scope.city,
                    zipcode: $scope.zipcode
                };
                $scope.location.push(obj);
                console.log($scope.location);
            }
            $scope.gotoSubLocation = function (index, val) {
                $scope.locationame = $scope.location[index][val].locationName;
                $scope.locationBreadcrums.push($scope.locationame);
                console.log($scope.locationBreadcrums);
                $(".slider").diyslider("move", "forth");
            }
            $scope.backtoLocation = function (e) {
                e.preventDefault();
                $(".slider").diyslider("move", "back");
            }
            $scope.addLocationCancel = function (e) {
                e.preventDefault();
                $scope.locationBox = false;
            };

            $scope.addSubLocation = function (e) {
                    e.preventDefault();
                    $scope.sublocationBox = true;
                }
                // end First Level 

            // start sencond Level 
            $scope.subLocationDone = function (e) {
                e.preventDefault();
                $scope.sublocationBox = false;
                var obj = {};
                obj[$scope.subLocation] = {
                    subLocationName: $scope.sublocationName,
                    subLoationDescription: $scope.subLocationDescrption
                };
                $scope.subLocation.push(obj);
            }

            $scope.subLocationCancel = function (e) {
                e.preventDefault();
                $scope.sublocationBox = false;
            }


            $scope.gotoSecondSubLocation = function (index, val) {
                $scope.sublocationame = $scope.subLocation[index][val].subLocationName;
                $scope.locationBreadcrums.push($scope.sublocationame);
                $(".slider").diyslider("move", "forth");
            }

            $scope.addSecondSubLocation = function (e) {
                e.preventDefault();
                $scope.secondSublocationBox = true;
            }
            $scope.doneSecondSubLocation = function (e) {
                e.preventDefault();
                $scope.secondSublocationBox = false;
                var obj = {};
                obj[$scope.secondsubLocation] = {
                    secondsubLocationName: $scope.secondsublocationName,
                    secondsubLoationDescription: $scope.secondsubLocationDescrption
                };
                $scope.secondsubLocation.push(obj);
            }
            $scope.cancelSecondSubLocation = function (e) {
                    e.preventDefault();
                    $scope.secondSublocationBox = false;
                }
                // end second Level 


            // start Third Level 

            $scope.addThirdSubLocation = function (e) {
                e.preventDefault();
                $scope.thirdSublocationBox = true;
            }
            $scope.doneThirdSubLocation = function (e) {
                e.preventDefault();
                $scope.thirdSublocationBox = false;
                var obj = {};
                obj[$scope.thirdsubLocation] = {
                    thirdsubLocationName: $scope.thirdsublocationName,
                    thirdsubLoationDescription: $scope.thirdsubLocationDescrption
                };
                $scope.thirdsubLocation.push(obj);
            }
            $scope.cancelSecondSubLocation = function (e) {
                e.preventDefault();
                $scope.thirdSublocationBox = false;
            }

            $scope.gotoThirdSubLocation = function (index, val) {
                    $scope.thirdsublocationame = $scope.thirdsubLocation[index][val].thirdsubLocationName;
                    $scope.locationBreadcrums.push($scope.thirdsubLocationName);
                    console.log($scope.locationBreadcrums);
                    $(".slider").diyslider("move", "forth");
                }
                // end Third Level 

            // start Foruth Level 

            $scope.addFourthSubLocation = function (e) {
                e.preventDefault();
                $scope.fourthSublocationBox = true;
            }
            $scope.doneFourthSubLocation = function (e) {
                e.preventDefault();
                $scope.fourthSublocationBox = false;
                var obj = {};
                obj[$scope.fourthsubLocation] = {
                    fourthsubLocationName: $scope.fourthsublocationName,
                    fourthsubLoationDescription: $scope.fourthsubLocationDescrption
                };
                $scope.fourthsubLocation.push(obj);
            }
            $scope.cancelFourthSubLocation = function (e) {
                e.preventDefault();
                $scope.fourthSublocationBox = false;
            }

            $scope.gotoFourthSubLocation = function (index, val) {
                    $scope.fourthsublocationame = $scope.fourthsubLocation[index][val].fourthsubLocationName;
                    $scope.locationBreadcrums.push($scope.fourthsubLocationName);
                    console.log($scope.locationBreadcrums);
                    $(".slider").diyslider("move", "forth");
                }
                // end Foruth Level 


            $(".slider").diyslider({
                width: "900px", // width of the slider
                height: "500px", // height of the slider
                display: 1, // number of slides you want it to display at once
                loop: false // disable looping on slides
            }); // this is all you need!

            $scope.countries = [
                {
                    name: 'Afghanistan',
                    code: 'AF'
                },
                {
                    name: 'Ãƒâ€¦land Islands',
                    code: 'AX'
                },
                {
                    name: 'Albania',
                    code: 'AL'
                },
                {
                    name: 'Algeria',
                    code: 'DZ'
                },
                {
                    name: 'American Samoa',
                    code: 'AS'
                },
                {
                    name: 'Andorra',
                    code: 'AD'
                },
                {
                    name: 'Angola',
                    code: 'AO'
                },
                {
                    name: 'Anguilla',
                    code: 'AI'
                },
                {
                    name: 'Antarctica',
                    code: 'AQ'
                },
                {
                    name: 'Antigua and Barbuda',
                    code: 'AG'
                },
                {
                    name: 'Argentina',
                    code: 'AR'
                },
                {
                    name: 'Armenia',
                    code: 'AM'
                },
                {
                    name: 'Aruba',
                    code: 'AW'
                },
                {
                    name: 'Australia',
                    code: 'AU'
                },
                {
                    name: 'Austria',
                    code: 'AT'
                },
                {
                    name: 'Azerbaijan',
                    code: 'AZ'
                },
                {
                    name: 'Bahamas',
                    code: 'BS'
                },
                {
                    name: 'Bahrain',
                    code: 'BH'
                },
                {
                    name: 'Bangladesh',
                    code: 'BD'
                },
                {
                    name: 'Barbados',
                    code: 'BB'
                },
                {
                    name: 'Belarus',
                    code: 'BY'
                },
                {
                    name: 'Belgium',
                    code: 'BE'
                },
                {
                    name: 'Belize',
                    code: 'BZ'
                },
                {
                    name: 'Benin',
                    code: 'BJ'
                },
                {
                    name: 'Bermuda',
                    code: 'BM'
                },
                {
                    name: 'Bhutan',
                    code: 'BT'
                },
                {
                    name: 'Bolivia',
                    code: 'BO'
                },
                {
                    name: 'Bosnia and Herzegovina',
                    code: 'BA'
                },
                {
                    name: 'Botswana',
                    code: 'BW'
                },
                {
                    name: 'Bouvet Island',
                    code: 'BV'
                },
                {
                    name: 'Brazil',
                    code: 'BR'
                },
                {
                    name: 'British Indian Ocean Territory',
                    code: 'IO'
                },
                {
                    name: 'Brunei Darussalam',
                    code: 'BN'
                },
                {
                    name: 'Bulgaria',
                    code: 'BG'
                },
                {
                    name: 'Burkina Faso',
                    code: 'BF'
                },
                {
                    name: 'Burundi',
                    code: 'BI'
                },
                {
                    name: 'Cambodia',
                    code: 'KH'
                },
                {
                    name: 'Cameroon',
                    code: 'CM'
                },
                {
                    name: 'Canada',
                    code: 'CA'
                },
                {
                    name: 'Cape Verde',
                    code: 'CV'
                },
                {
                    name: 'Cayman Islands',
                    code: 'KY'
                },
                {
                    name: 'Central African Republic',
                    code: 'CF'
                },
                {
                    name: 'Chad',
                    code: 'TD'
                },
                {
                    name: 'Chile',
                    code: 'CL'
                },
                {
                    name: 'China',
                    code: 'CN'
                },
                {
                    name: 'Christmas Island',
                    code: 'CX'
                },
                {
                    name: 'Cocos (Keeling) Islands',
                    code: 'CC'
                },
                {
                    name: 'Colombia',
                    code: 'CO'
                },
                {
                    name: 'Comoros',
                    code: 'KM'
                },
                {
                    name: 'Congo',
                    code: 'CG'
                },
                {
                    name: 'Congo, The Democratic Republic of the',
                    code: 'CD'
                },
                {
                    name: 'Cook Islands',
                    code: 'CK'
                },
                {
                    name: 'Costa Rica',
                    code: 'CR'
                },
                {
                    name: 'Cote D\'Ivoire',
                    code: 'CI'
                },
                {
                    name: 'Croatia',
                    code: 'HR'
                },
                {
                    name: 'Cuba',
                    code: 'CU'
                },
                {
                    name: 'Cyprus',
                    code: 'CY'
                },
                {
                    name: 'Czech Republic',
                    code: 'CZ'
                },
                {
                    name: 'Denmark',
                    code: 'DK'
                },
                {
                    name: 'Djibouti',
                    code: 'DJ'
                },
                {
                    name: 'Dominica',
                    code: 'DM'
                },
                {
                    name: 'Dominican Republic',
                    code: 'DO'
                },
                {
                    name: 'Ecuador',
                    code: 'EC'
                },
                {
                    name: 'Egypt',
                    code: 'EG'
                },
                {
                    name: 'El Salvador',
                    code: 'SV'
                },
                {
                    name: 'Equatorial Guinea',
                    code: 'GQ'
                },
                {
                    name: 'Eritrea',
                    code: 'ER'
                },
                {
                    name: 'Estonia',
                    code: 'EE'
                },
                {
                    name: 'Ethiopia',
                    code: 'ET'
                },
                {
                    name: 'Falkland Islands (Malvinas)',
                    code: 'FK'
                },
                {
                    name: 'Faroe Islands',
                    code: 'FO'
                },
                {
                    name: 'Fiji',
                    code: 'FJ'
                },
                {
                    name: 'Finland',
                    code: 'FI'
                },
                {
                    name: 'France',
                    code: 'FR'
                },
                {
                    name: 'French Guiana',
                    code: 'GF'
                },
                {
                    name: 'French Polynesia',
                    code: 'PF'
                },
                {
                    name: 'French Southern Territories',
                    code: 'TF'
                },
                {
                    name: 'Gabon',
                    code: 'GA'
                },
                {
                    name: 'Gambia',
                    code: 'GM'
                },
                {
                    name: 'Georgia',
                    code: 'GE'
                },
                {
                    name: 'Germany',
                    code: 'DE'
                },
                {
                    name: 'Ghana',
                    code: 'GH'
                },
                {
                    name: 'Gibraltar',
                    code: 'GI'
                },
                {
                    name: 'Greece',
                    code: 'GR'
                },
                {
                    name: 'Greenland',
                    code: 'GL'
                },
                {
                    name: 'Grenada',
                    code: 'GD'
                },
                {
                    name: 'Guadeloupe',
                    code: 'GP'
                },
                {
                    name: 'Guam',
                    code: 'GU'
                },
                {
                    name: 'Guatemala',
                    code: 'GT'
                },
                {
                    name: 'Guernsey',
                    code: 'GG'
                },
                {
                    name: 'Guinea',
                    code: 'GN'
                },
                {
                    name: 'Guinea-Bissau',
                    code: 'GW'
                },
                {
                    name: 'Guyana',
                    code: 'GY'
                },
                {
                    name: 'Haiti',
                    code: 'HT'
                },
                {
                    name: 'Heard Island and Mcdonald Islands',
                    code: 'HM'
                },
                {
                    name: 'Holy See (Vatican City State)',
                    code: 'VA'
                },
                {
                    name: 'Honduras',
                    code: 'HN'
                },
                {
                    name: 'Hong Kong',
                    code: 'HK'
                },
                {
                    name: 'Hungary',
                    code: 'HU'
                },
                {
                    name: 'Iceland',
                    code: 'IS'
                },
                {
                    name: 'India',
                    code: 'IN'
                },
                {
                    name: 'Indonesia',
                    code: 'ID'
                },
                {
                    name: 'Iran, Islamic Republic Of',
                    code: 'IR'
                },
                {
                    name: 'Iraq',
                    code: 'IQ'
                },
                {
                    name: 'Ireland',
                    code: 'IE'
                },
                {
                    name: 'Isle of Man',
                    code: 'IM'
                },
                {
                    name: 'Israel',
                    code: 'IL'
                },
                {
                    name: 'Italy',
                    code: 'IT'
                },
                {
                    name: 'Jamaica',
                    code: 'JM'
                },
                {
                    name: 'Japan',
                    code: 'JP'
                },
                {
                    name: 'Jersey',
                    code: 'JE'
                },
                {
                    name: 'Jordan',
                    code: 'JO'
                },
                {
                    name: 'Kazakhstan',
                    code: 'KZ'
                },
                {
                    name: 'Kenya',
                    code: 'KE'
                },
                {
                    name: 'Kiribati',
                    code: 'KI'
                },
                {
                    name: 'Korea, Democratic People\'s Republic of',
                    code: 'KP'
                },
                {
                    name: 'Korea, Republic of',
                    code: 'KR'
                },
                {
                    name: 'Kuwait',
                    code: 'KW'
                },
                {
                    name: 'Kyrgyzstan',
                    code: 'KG'
                },
                {
                    name: 'Lao People\'s Democratic Republic',
                    code: 'LA'
                },
                {
                    name: 'Latvia',
                    code: 'LV'
                },
                {
                    name: 'Lebanon',
                    code: 'LB'
                },
                {
                    name: 'Lesotho',
                    code: 'LS'
                },
                {
                    name: 'Liberia',
                    code: 'LR'
                },
                {
                    name: 'Libyan Arab Jamahiriya',
                    code: 'LY'
                },
                {
                    name: 'Liechtenstein',
                    code: 'LI'
                },
                {
                    name: 'Lithuania',
                    code: 'LT'
                },
                {
                    name: 'Luxembourg',
                    code: 'LU'
                },
                {
                    name: 'Macao',
                    code: 'MO'
                },
                {
                    name: 'Macedonia, The Former Yugoslav Republic of',
                    code: 'MK'
                },
                {
                    name: 'Madagascar',
                    code: 'MG'
                },
                {
                    name: 'Malawi',
                    code: 'MW'
                },
                {
                    name: 'Malaysia',
                    code: 'MY'
                },
                {
                    name: 'Maldives',
                    code: 'MV'
                },
                {
                    name: 'Mali',
                    code: 'ML'
                },
                {
                    name: 'Malta',
                    code: 'MT'
                },
                {
                    name: 'Marshall Islands',
                    code: 'MH'
                },
                {
                    name: 'Martinique',
                    code: 'MQ'
                },
                {
                    name: 'Mauritania',
                    code: 'MR'
                },
                {
                    name: 'Mauritius',
                    code: 'MU'
                },
                {
                    name: 'Mayotte',
                    code: 'YT'
                },
                {
                    name: 'Mexico',
                    code: 'MX'
                },
                {
                    name: 'Micronesia, Federated States of',
                    code: 'FM'
                },
                {
                    name: 'Moldova, Republic of',
                    code: 'MD'
                },
                {
                    name: 'Monaco',
                    code: 'MC'
                },
                {
                    name: 'Mongolia',
                    code: 'MN'
                },
                {
                    name: 'Montserrat',
                    code: 'MS'
                },
                {
                    name: 'Morocco',
                    code: 'MA'
                },
                {
                    name: 'Mozambique',
                    code: 'MZ'
                },
                {
                    name: 'Myanmar',
                    code: 'MM'
                },
                {
                    name: 'Namibia',
                    code: 'NA'
                },
                {
                    name: 'Nauru',
                    code: 'NR'
                },
                {
                    name: 'Nepal',
                    code: 'NP'
                },
                {
                    name: 'Netherlands',
                    code: 'NL'
                },
                {
                    name: 'Netherlands Antilles',
                    code: 'AN'
                },
                {
                    name: 'New Caledonia',
                    code: 'NC'
                },
                {
                    name: 'New Zealand',
                    code: 'NZ'
                },
                {
                    name: 'Nicaragua',
                    code: 'NI'
                },
                {
                    name: 'Niger',
                    code: 'NE'
                },
                {
                    name: 'Nigeria',
                    code: 'NG'
                },
                {
                    name: 'Niue',
                    code: 'NU'
                },
                {
                    name: 'Norfolk Island',
                    code: 'NF'
                },
                {
                    name: 'Northern Mariana Islands',
                    code: 'MP'
                },
                {
                    name: 'Norway',
                    code: 'NO'
                },
                {
                    name: 'Oman',
                    code: 'OM'
                },
                {
                    name: 'Pakistan',
                    code: 'PK'
                },
                {
                    name: 'Palau',
                    code: 'PW'
                },
                {
                    name: 'Palestinian Territory, Occupied',
                    code: 'PS'
                },
                {
                    name: 'Panama',
                    code: 'PA'
                },
                {
                    name: 'Papua New Guinea',
                    code: 'PG'
                },
                {
                    name: 'Paraguay',
                    code: 'PY'
                },
                {
                    name: 'Peru',
                    code: 'PE'
                },
                {
                    name: 'Philippines',
                    code: 'PH'
                },
                {
                    name: 'Pitcairn',
                    code: 'PN'
                },
                {
                    name: 'Poland',
                    code: 'PL'
                },
                {
                    name: 'Portugal',
                    code: 'PT'
                },
                {
                    name: 'Puerto Rico',
                    code: 'PR'
                },
                {
                    name: 'Qatar',
                    code: 'QA'
                },
                {
                    name: 'Reunion',
                    code: 'RE'
                },
                {
                    name: 'Romania',
                    code: 'RO'
                },
                {
                    name: 'Russian Federation',
                    code: 'RU'
                },
                {
                    name: 'Rwanda',
                    code: 'RW'
                },
                {
                    name: 'Saint Helena',
                    code: 'SH'
                },
                {
                    name: 'Saint Kitts and Nevis',
                    code: 'KN'
                },
                {
                    name: 'Saint Lucia',
                    code: 'LC'
                },
                {
                    name: 'Saint Pierre and Miquelon',
                    code: 'PM'
                },
                {
                    name: 'Saint Vincent and the Grenadines',
                    code: 'VC'
                },
                {
                    name: 'Samoa',
                    code: 'WS'
                },
                {
                    name: 'San Marino',
                    code: 'SM'
                },
                {
                    name: 'Sao Tome and Principe',
                    code: 'ST'
                },
                {
                    name: 'Saudi Arabia',
                    code: 'SA'
                },
                {
                    name: 'Senegal',
                    code: 'SN'
                },
                {
                    name: 'Serbia and Montenegro',
                    code: 'CS'
                },
                {
                    name: 'Seychelles',
                    code: 'SC'
                },
                {
                    name: 'Sierra Leone',
                    code: 'SL'
                },
                {
                    name: 'Singapore',
                    code: 'SG'
                },
                {
                    name: 'Slovakia',
                    code: 'SK'
                },
                {
                    name: 'Slovenia',
                    code: 'SI'
                },
                {
                    name: 'Solomon Islands',
                    code: 'SB'
                },
                {
                    name: 'Somalia',
                    code: 'SO'
                },
                {
                    name: 'South Africa',
                    code: 'ZA'
                },
                {
                    name: 'South Georgia and the South Sandwich Islands',
                    code: 'GS'
                },
                {
                    name: 'Spain',
                    code: 'ES'
                },
                {
                    name: 'Sri Lanka',
                    code: 'LK'
                },
                {
                    name: 'Sudan',
                    code: 'SD'
                },
                {
                    name: 'Suriname',
                    code: 'SR'
                },
                {
                    name: 'Svalbard and Jan Mayen',
                    code: 'SJ'
                },
                {
                    name: 'Swaziland',
                    code: 'SZ'
                },
                {
                    name: 'Sweden',
                    code: 'SE'
                },
                {
                    name: 'Switzerland',
                    code: 'CH'
                },
                {
                    name: 'Syrian Arab Republic',
                    code: 'SY'
                },
                {
                    name: 'Taiwan, Province of China',
                    code: 'TW'
                },
                {
                    name: 'Tajikistan',
                    code: 'TJ'
                },
                {
                    name: 'Tanzania, United Republic of',
                    code: 'TZ'
                },
                {
                    name: 'Thailand',
                    code: 'TH'
                },
                {
                    name: 'Timor-Leste',
                    code: 'TL'
                },
                {
                    name: 'Togo',
                    code: 'TG'
                },
                {
                    name: 'Tokelau',
                    code: 'TK'
                },
                {
                    name: 'Tonga',
                    code: 'TO'
                },
                {
                    name: 'Trinidad and Tobago',
                    code: 'TT'
                },
                {
                    name: 'Tunisia',
                    code: 'TN'
                },
                {
                    name: 'Turkey',
                    code: 'TR'
                },
                {
                    name: 'Turkmenistan',
                    code: 'TM'
                },
                {
                    name: 'Turks and Caicos Islands',
                    code: 'TC'
                },
                {
                    name: 'Tuvalu',
                    code: 'TV'
                },
                {
                    name: 'Uganda',
                    code: 'UG'
                },
                {
                    name: 'Ukraine',
                    code: 'UA'
                },
                {
                    name: 'United Arab Emirates',
                    code: 'AE'
                },
                {
                    name: 'United Kingdom',
                    code: 'GB'
                },
                {
                    name: 'United States',
                    code: 'US'
                },
                {
                    name: 'United States Minor Outlying Islands',
                    code: 'UM'
                },
                {
                    name: 'Uruguay',
                    code: 'UY'
                },
                {
                    name: 'Uzbekistan',
                    code: 'UZ'
                },
                {
                    name: 'Vanuatu',
                    code: 'VU'
                },
                {
                    name: 'Venezuela',
                    code: 'VE'
                },
                {
                    name: 'Vietnam',
                    code: 'VN'
                },
                {
                    name: 'Virgin Islands, British',
                    code: 'VG'
                },
                {
                    name: 'Virgin Islands, U.S.',
                    code: 'VI'
                },
                {
                    name: 'Wallis and Futuna',
                    code: 'WF'
                },
                {
                    name: 'Western Sahara',
                    code: 'EH'
                },
                {
                    name: 'Yemen',
                    code: 'YE'
                },
                {
                    name: 'Zambia',
                    code: 'ZM'
                },
                {
                    name: 'Zimbabwe',
                    code: 'ZW'
                }
  ];
}]);


})();