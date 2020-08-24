// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"core/consts.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FULL_FLEET = exports.createShip = exports.fleet = exports.Ships = exports.Orientation = exports.emptyBoard = exports.Players = exports.isShip = exports.Field = void 0;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* eslint-disable prettier/prettier */
var Field;
exports.Field = Field;

(function (Field) {
  Field["EMPTY"] = " ";
  Field["MISSED"] = "M";
  Field["HIT"] = "X";
  Field["Carrier"] = "C";
  Field["Battleship"] = "B";
  Field["Cruiser"] = "R";
  Field["Submarine"] = "S";
  Field["Destroyer"] = "D";
})(Field || (exports.Field = Field = {}));

var isShip = function isShip(f) {
  return [Field.Carrier, Field.Battleship, Field.Cruiser, Field.Submarine, Field.Destroyer].includes(f);
};

exports.isShip = isShip;
var Players;
exports.Players = Players;

(function (Players) {
  Players["HUMAN"] = "HUMAN";
  Players["AI"] = "AI";
})(Players || (exports.Players = Players = {}));

var emptyBoard = function emptyBoard(size) {
  return Array.from({
    length: size
  }, function () {
    return Array.from({
      length: size
    }, function () {
      return Field.EMPTY;
    });
  });
};

exports.emptyBoard = emptyBoard;
var Orientation;
exports.Orientation = Orientation;

(function (Orientation) {
  Orientation["VERTICAL"] = "VERTICAL";
  Orientation["HORIZONTAL"] = "HORIZONTAL";
})(Orientation || (exports.Orientation = Orientation = {}));

var Ships = {
  Carrier: {
    type: "Carrier",
    length: 5
  },
  Battleship: {
    type: "Battleship",
    length: 4
  },
  Cruiser: {
    type: "Cruiser",
    length: 3
  },
  Submarine: {
    type: "Submarine",
    length: 3
  },
  Destroyer: {
    type: "Destroyer",
    length: 2
  }
};
exports.Ships = Ships;
var fleet = Object.keys(Ships);
exports.fleet = fleet;

var createShip = function createShip(type, _ref) {
  var topLeftCorner = _ref.topLeftCorner,
      orientation = _ref.orientation;
  return _objectSpread(_objectSpread({}, Ships[type]), {}, {
    type: type,
    topLeftCorner: topLeftCorner,
    orientation: orientation
  });
};

exports.createShip = createShip;
var FULL_FLEET = 5 + 4 + 3 + 3 + 2;
exports.FULL_FLEET = FULL_FLEET;
},{}],"core/utils.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getRandomCoordGenerator = exports.codeToChar = exports.charToCode = void 0;

var charToCode = function charToCode(s) {
  return Number(s.toLowerCase().charCodeAt(0)) - 97;
};

exports.charToCode = charToCode;

var codeToChar = function codeToChar(n) {
  return String.fromCharCode(97 + n);
};

exports.codeToChar = codeToChar;

var getRandomCoordGenerator = function getRandomCoordGenerator(size) {
  return function () {
    return {
      x: Math.floor(Math.random() * size),
      y: Math.floor(Math.random() * size)
    };
  };
};

exports.getRandomCoordGenerator = getRandomCoordGenerator;
},{}],"core/core.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Battleships = void 0;

var _consts = require("./consts");

var _utils = require("./utils");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Battleships = /*#__PURE__*/function () {
  function Battleships(size) {
    _classCallCheck(this, Battleships);

    this.turn = _consts.Players.HUMAN;
    this.inProgress = false;
    this.size = size;
    this.turn = _consts.Players.HUMAN;
    this[_consts.Players.HUMAN] = {
      board: (0, _consts.emptyBoard)(size),
      view: (0, _consts.emptyBoard)(size)
    };
    this[_consts.Players.AI] = {
      board: (0, _consts.emptyBoard)(size),
      view: (0, _consts.emptyBoard)(size)
    };
    this.randomCoord = (0, _utils.getRandomCoordGenerator)(size);
  }

  _createClass(Battleships, [{
    key: "canPlace",
    value: function canPlace(player, _ref) {
      var topLeftCorner = _ref.topLeftCorner,
          orientation = _ref.orientation,
          length = _ref.length;
      var x = topLeftCorner.x,
          y = topLeftCorner.y;
      var squares = this[player].board.map(function (row, i) {
        return row.filter(function (_, j) {
          if (orientation === _consts.Orientation.HORIZONTAL) {
            return i === y && j - x < length && j - x >= 0;
          } else {
            return j === x && i - y < length && i - y >= 0;
          }
        });
      }).flat().filter(function (el) {
        return el;
      });
      return squares.every(function (el) {
        return el === _consts.Field.EMPTY;
      }) && squares.length === length;
    }
  }, {
    key: "placeShip",
    value: function placeShip(player, ship) {
      if (this.canPlace(player, ship)) {
        var topLeftCorner = ship.topLeftCorner,
            orientation = ship.orientation,
            length = ship.length,
            type = ship.type;
        var x = topLeftCorner.x,
            y = topLeftCorner.y;
        this[player].board = this[player].board.map(function (row, i) {
          return row.map(function (field, j) {
            if (orientation === _consts.Orientation.HORIZONTAL) {
              if (i === y && j - x < length && j - x >= 0) {
                return _consts.Field[type];
              }

              return field;
            } else {
              if (j === x && i - y < length && i - y >= 0) {
                return _consts.Field[type];
              }

              return field;
            }
          });
        });
        return true;
      } else {
        return false;
      }
    }
  }, {
    key: "isBoardReady",
    value: function isBoardReady(player) {
      return this[player].board.flat().reduce(function (counter, field) {
        return (0, _consts.isShip)(field) ? counter + 1 : counter;
      }, 0) === _consts.FULL_FLEET;
    }
  }, {
    key: "isGameOver",
    value: function isGameOver() {
      var countHUMAN = this[_consts.Players.HUMAN].board.flat().reduce(function (counter, field) {
        return (0, _consts.isShip)(field) ? counter + 1 : counter;
      }, 0);

      var countAI = this[_consts.Players.AI].board.flat().reduce(function (counter, field) {
        return (0, _consts.isShip)(field) ? counter + 1 : counter;
      }, 0);

      if (countHUMAN === 0) return {
        isOver: true,
        winner: _consts.Players.AI
      };
      if (countAI === 0) return {
        isOver: true,
        winner: _consts.Players.HUMAN
      };else return {
        isOver: false
      };
    }
  }, {
    key: "randomFullBoard",
    value: function randomFullBoard(player) {
      var _iterator = _createForOfIteratorHelper(_consts.fleet),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var shipType = _step.value;
          var ship = void 0;

          do {
            var _this$randomCoord = this.randomCoord(),
                x = _this$randomCoord.x,
                y = _this$randomCoord.y;

            var orientation = [_consts.Orientation.HORIZONTAL, _consts.Orientation.VERTICAL][Math.round(Math.random())];
            ship = (0, _consts.createShip)(shipType, {
              orientation: orientation,
              topLeftCorner: {
                x: x,
                y: y
              }
            });
          } while (!this.placeShip(player, ship));
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  }, {
    key: "oppositePlayer",
    value: function oppositePlayer(p) {
      if (p === _consts.Players.AI) return _consts.Players.HUMAN;else return _consts.Players.AI;
    }
  }, {
    key: "getAIShoot",
    value: function getAIShoot() {
      var fieldsToUse = this[_consts.Players.HUMAN].board.flatMap(function (row, i) {
        return row.map(function (field, j) {
          return {
            x: j,
            y: i,
            field: field
          };
        }).filter(function (withCoord) {
          return (0, _consts.isShip)(withCoord.field) || withCoord.field === _consts.Field.EMPTY;
        });
      });

      var l = fieldsToUse.length;
      var _fieldsToUse$Math$flo = fieldsToUse[Math.floor(Math.random() * l)],
          x = _fieldsToUse$Math$flo.x,
          y = _fieldsToUse$Math$flo.y;
      return "".concat((0, _utils.codeToChar)(y)).concat(x + 1);
    }
  }, {
    key: "shoot",
    value: function shoot(shooter) {
      var position = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.getAIShoot();
      console.log(position);
      if (this.turn !== shooter) return;

      var _position = _slicedToArray(position, 2),
          r = _position[0],
          c = _position[1];

      var row = (0, _utils.charToCode)(r);
      var column = Number(c) - 1;
      var shooterView = this[shooter].view;
      var battlefield = this[this.oppositePlayer(shooter)].board;
      var field = battlefield[row][column];
      console.log(field);

      if ((0, _consts.isShip)(field)) {
        shooterView[row][column] = _consts.Field.HIT;
        battlefield[row][column] = _consts.Field.HIT;
      } else {
        shooterView[row][column] = _consts.Field.MISSED;
        battlefield[row][column] = _consts.Field.MISSED;
        this.turn = this.oppositePlayer(this.turn);
      }
    }
  }, {
    key: "reset",
    value: function reset() {
      this[_consts.Players.HUMAN];
    }
  }]);

  return Battleships;
}();

exports.Battleships = Battleships;
_consts.Players.HUMAN, _consts.Players.AI;
},{"./consts":"core/consts.ts","./utils":"core/utils.ts"}],"index.ts":[function(require,module,exports) {
"use strict";

var _core = require("./core/core");

var _consts = require("./core/consts");

var _console;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var b = new _core.Battleships(10);
b.AI.board = [[" ", "B", " ", " ", " ", " ", " ", " ", " ", " "], [" ", "B", " ", " ", " ", " ", "S", " ", " ", " "], [" ", "B", " ", " ", " ", " ", "S", " ", " ", " "], ["D", "B", " ", " ", " ", " ", "S", " ", " ", " "], ["D", " ", " ", " ", " ", " ", " ", " ", " ", " "], [" ", " ", "C", "C", "C", "C", "C", " ", " ", " "], [" ", "R", "R", "R", " ", " ", " ", " ", " ", " "], [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "], [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "], [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "]];
b.HUMAN.board = [[" ", "X", " ", " ", " ", " ", " ", " ", " ", " "], [" ", "B", " ", " ", " ", " ", "S", " ", " ", " "], [" ", "B", "M", " ", " ", " ", "S", " ", " ", " "], ["D", "B", " ", " ", " ", " ", "S", " ", " ", " "], ["D", " ", " ", " ", " ", " ", " ", " ", " ", " "], [" ", " ", "C", "C", "C", "C", "C", " ", " ", " "], [" ", "R", "R", "R", " ", " ", " ", " ", " ", " "], [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "], [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "], [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "]];
b.shoot(_consts.Players.HUMAN, "A2");
b.shoot(_consts.Players.HUMAN, "A1");
b.shoot(_consts.Players.AI);

(_console = console).log.apply(_console, _toConsumableArray(b.AI.board));
},{"./core/core":"core/core.ts","./core/consts":"core/consts.ts"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "36585" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.ts"], null)
//# sourceMappingURL=/src.77de5100.js.map