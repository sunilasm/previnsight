(function() {
  var module;

  module = angular.module('wxy.components', []);

  module.directive('recursive', [
    '$compile', function($compile) {
      return {
        restrict: 'EACM',
        priority: 100000,
        compile: function(tElement, tAttr) {
          var compiledContents, contents;
          contents = tElement.contents().remove();
          compiledContents = null;
          return function(scope, iElement, iAttr) {
            if (!compiledContents) {
              compiledContents = $compile(contents);
            }
            compiledContents(scope, function(clone, scope) {
              return iElement.append(clone);
            });
          };
        }
      };
    }
  ]);

}).call(this);

(function() {
  var module;

  module = angular.module('wxy.pushmenu', ['ngAnimate', 'wxy.components']);

  module.directive('wxyPushMenu', [
    'wxyOptions', 'wxyUtils', function(wxyOptions, wxyUtils) {
      return {
        scope: {
          menu: '=',
          options: '='
        },
        controller: ['$scope', '$element', '$attrs', function($scope, $element, $attrs) {
          var options, width;
          $scope.options = options = angular.extend(wxyOptions, $scope.options);
          $scope.level = 0;
          $scope.visible = true;
          width = options.menuWidth || 265;
          $element.find('nav').width(width + options.overlapWidth * wxyUtils.DepthOf($scope.menu));
          this.GetBaseWidth = function() {
            return width;
          };
          this.GetOptions = function() {
            return options;
          };
        }],
        templateUrl: 'views/locations/mainLocations.html',
        restrict: 'E',
        replace: true
      };
    }
  ]);

  module.directive('wxySubmenu', [
    '$animate', 'wxyUtils', function($animate, wxyUtils) {
      return {
        scope: {
          menu: '=',
          level: '=',
          visible: '='
        },
        link: function(scope, element, attr, ctrl) {
          var collapse, marginCollapsed, onOpen, options;
          scope.options = options = ctrl.GetOptions();
          scope.childrenLevel = scope.level + 1;
          onOpen = function() {
            element.width(ctrl.GetBaseWidth());
            if (!scope.collapsed) {
              scope.inactive = false;
            }
            scope.$emit('submenuOpened', scope.level);
          };
          if (scope.level === 0) {
            scope.collasped = false;
            marginCollapsed = options.overlapWidth - ctrl.GetBaseWidth();
            if (options.collapsed) {
              scope.collapsed = true;
              scope.inactive = true;
              element.css({
                marginLeft: marginCollapsed
              });
            }
            collapse = function() {
              var animatePromise;
              scope.collapsed = !scope.collapsed;
              scope.inactive = scope.collapsed;
              if (scope.collapsed) {
                options.onCollapseMenuStart();
              } else {
                options.onExpandMenuStart();
              }
              animatePromise = $animate.addClass(element, 'slide', {
                fromMargin: scope.collapsed ? 0 : marginCollapsed,
                toMargin: scope.collapsed ? marginCollapsed : 0
              });
              animatePromise.then(function() {
                scope.$apply(function() {
                  if (scope.collapsed) {
                    return options.onCollapseMenuEnd();
                  } else {
                    return options.onExpandMenuEnd();
                  }
                });
                return;
              });
              wxyUtils.PushContainers(options.containersToPush, scope.collapsed ? marginCollapsed : 0);
            };
          }
          scope.openMenu = function(event, menu) {
            wxyUtils.StopEventPropagation(event);
            scope.$broadcast('menuOpened', scope.level);
            options.onTitleItemClick(event, menu);
            if (scope.level === 0 && !scope.inactive || scope.collapsed) {
              collapse();
            } else {
              onOpen();
            }
          };
          scope.onSubmenuClicked = function(item, $event) {
            if (item.menu) {
              item.visible = true;
              scope.inactive = true;
              options.onGroupItemClick($event, item);
            } else {
              options.onItemClick($event, item);
            }
          };
          scope.goBack = function(event, menu) {
            options.onBackItemClick(event, menu);
            scope.visible = false;
            return scope.$emit('submenuClosed', scope.level);
          };
          scope.$watch('visible', (function(_this) {
            return function(visible) {
              var animatePromise;
              if (visible) {
                if (scope.level > 0) {
                  options.onExpandMenuStart();
                  animatePromise = $animate.addClass(element, 'slide', {
                    fromMargin: -ctrl.GetBaseWidth(),
                    toMargin: 0
                  });
                  animatePromise.then(function() {
                    //scope.$apply(function() {
                      options.onExpandMenuEnd();
                    //});
                  });
                }
                onOpen();
              }
            };
          })(this));
          scope.$on('submenuOpened', (function(_this) {
            return function(event, level) {
              var correction, correctionWidth;
              correction = level - scope.level;
              correctionWidth = options.overlapWidth * correction;
              element.width(ctrl.GetBaseWidth() + correctionWidth);
              if (scope.level === 0) {
                wxyUtils.PushContainers(options.containersToPush, correctionWidth);
              }
            };
          })(this));
          scope.$on('submenuClosed', (function(_this) {
            return function(event, level) {
              if (level - scope.level === 1) {
                onOpen();
                wxyUtils.StopEventPropagation(event);
              }
            };
          })(this));
          scope.$on('menuOpened', (function(_this) {
            return function(event, level) {
              if (scope.level - level > 0) {
                scope.visible = false;
              }
            };
          })(this));
        },
        templateUrl: 'views/locations/subLocations.html',
        require: '^wxyPushMenu',
        restrict: 'EA',
        replace: true
      };
    }
  ]);

  module.factory('wxyUtils', function() {
    var DepthOf, PushContainers, StopEventPropagation;
    StopEventPropagation = function(e) {
      if (e.stopPropagation && e.preventDefault) {
        e.stopPropagation();
        e.preventDefault();
      } else {
        e.cancelBubble = true;
        e.returnValue = false;
      }
    };
    DepthOf = function(menu) {
      var depth, item, maxDepth, _i, _len, _ref;
      maxDepth = 0;
      if (menu.items) {
        _ref = menu.items;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          item = _ref[_i];
          if (item.menu) {
            depth = DepthOf(item.menu) + 1;
          }
          if (depth > maxDepth) {
            maxDepth = depth;
          }
        }
      }
      return maxDepth;
    };
    PushContainers = function(containersToPush, absoluteDistance) {
      if (!containersToPush) {
        return;
      }
      return $.each(containersToPush, function() {
        return $(this).stop().animate({
          marginLeft: absoluteDistance
        });
      });
    };
    return {
      StopEventPropagation: StopEventPropagation,
      DepthOf: DepthOf,
      PushContainers: PushContainers
    };
  });

  module.animation('.slide', function() {
    return {
      addClass: function(element, className, onAnimationCompleted, options) {
        element.removeClass('slide');
        element.css({
          marginLeft: options.fromMargin + 'px'
        });
        element.animate({
          marginLeft: options.toMargin + 'px'
        }, onAnimationCompleted);
      }
    };
  });

  module.value('wxyOptions', {
    containersToPush: null,
    wrapperClass: 'multilevelpushmenu_wrapper',
    menuInactiveClass: 'multilevelpushmenu_inactive',
    menuWidth: 0,
    menuHeight: 0,
    collapsed: false,
    fullCollapse: true,
    direction: 'ltr',
    backItemClass: 'backItemClass',
    backItemIcon: 'fa fa-angle-left',
    groupIcon: 'fa fa-angle-right',
    mode: 'overlap',
    overlapWidth: 40,
    preventItemClick: true,
    preventGroupItemClick: true,
    swipe: 'both',
    onCollapseMenuStart: function() {},
    onCollapseMenuEnd: function() {},
    onExpandMenuStart: function() {},
    onExpandMenuEnd: function() {},
    onGroupItemClick: function() {},
    onItemClick: function() {},
    onTitleItemClick: function() {},
    onBackItemClick: function() {},
    onMenuReady: function() {}
  });

}).call(this);
