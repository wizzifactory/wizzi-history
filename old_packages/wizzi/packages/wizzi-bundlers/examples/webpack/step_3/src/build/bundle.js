/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./step_3/src/main.js.ittf");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./step_3/src/foo.js.ittf":
/*!********************************!*\
  !*** ./step_3/src/foo.js.ittf ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/*\n    artifact generator: C:\\my\\wizzi\\v5\\apps\\wizzi-bundlers\\dist\\node_modules\\wizzi-js\\lib\\artifacts\\js\\module\\gen\\main.js\n    primary source IttfDocument: c:\\my\\wizzi\\v5\\apps\\wizzi-bundlers\\dist\\examples\\webpack\\step_3\\src\\foo.js.ittf\n    utc time: Fri, 28 Dec 2018 21:55:09 GMT\n*/\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ('hello world!');\n\n//# sourceURL=webpack:///./step_3/src/foo.js.ittf?");

/***/ }),

/***/ "./step_3/src/helloWorld.js.ittf":
/*!***************************************!*\
  !*** ./step_3/src/helloWorld.js.ittf ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n!(function webpackMissingModule() { var e = new Error(\"Cannot find module 'react'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }());\n/*\n    artifact generator: C:\\my\\wizzi\\v5\\apps\\wizzi-bundlers\\dist\\node_modules\\wizzi-js\\lib\\artifacts\\js\\module\\gen\\main.js\n    primary source IttfDocument: c:\\my\\wizzi\\v5\\apps\\wizzi-bundlers\\dist\\examples\\webpack\\step_3\\src\\helloworld.js.ittf\n    utc time: Fri, 28 Dec 2018 21:55:09 GMT\n*/\n\n\nfunction _typeof(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\n\n\nvar HelloWorld =\n/*#__PURE__*/\nfunction (_React$Component) {\n  _inherits(HelloWorld, _React$Component);\n\n  function HelloWorld(props) {\n    var _this;\n\n    _classCallCheck(this, HelloWorld);\n\n    _this = _possibleConstructorReturn(this, _getPrototypeOf(HelloWorld).call(this));\n    _this = _possibleConstructorReturn(this, _getPrototypeOf(HelloWorld).call(this, props));\n    _this.state = {\n      message: \"Hello World!\"\n    };\n    return _this;\n  }\n\n  _createClass(HelloWorld, [{\n    key: \"render\",\n    value: function render() {\n      return !(function webpackMissingModule() { var e = new Error(\"Cannot find module 'react'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }()).createElement(\"div\", null, !(function webpackMissingModule() { var e = new Error(\"Cannot find module 'react'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }()).createElement(\"h1\", null, this.state.message));\n    }\n  }]);\n\n  return HelloWorld;\n}(!(function webpackMissingModule() { var e = new Error(\"Cannot find module 'react'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }()).Component);\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (HelloWorld);\n\n//# sourceURL=webpack:///./step_3/src/helloWorld.js.ittf?");

/***/ }),

/***/ "./step_3/src/main.js.ittf":
/*!*********************************!*\
  !*** ./step_3/src/main.js.ittf ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _foo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./foo */ \"./step_3/src/foo.js.ittf\");\n/* harmony import */ var _helloWorld__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./helloWorld */ \"./step_3/src/helloWorld.js.ittf\");\n/*\n    artifact generator: C:\\my\\wizzi\\v5\\apps\\wizzi-bundlers\\dist\\node_modules\\wizzi-js\\lib\\artifacts\\js\\module\\gen\\main.js\n    primary source IttfDocument: c:\\my\\wizzi\\v5\\apps\\wizzi-bundlers\\dist\\examples\\webpack\\step_3\\src\\main.js.ittf\n    utc time: Fri, 28 Dec 2018 21:55:08 GMT\n*/\n\n\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (function () {\n  console.log(_foo__WEBPACK_IMPORTED_MODULE_0__[\"default\"]);\n  ReactDOM.render(React.createElement(_helloWorld__WEBPACK_IMPORTED_MODULE_1__[\"default\"], null));\n});\n\n//# sourceURL=webpack:///./step_3/src/main.js.ittf?");

/***/ })

/******/ });