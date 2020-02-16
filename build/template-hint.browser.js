(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validate = void 0;

function _toArray(arr) { return _arrayWithHoles(arr) || _iterableToArray(arr) || _nonIterableRest(); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var alreadyParsedTitle = false;
var ERROR_TITLE_NODE_TYPE = 'h3';
var errorText = '';
var COMMON_ERRORS = [{
  message: 'attributes values',
  type: 'ValueError'
}];

var isNodeText = function isNodeText(nodeName) {
  return nodeName == '#text';
};

function checkErrorXML(node) {
  var errorObject = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var childrenLen = node.childNodes.length;
  var nodeName = node.nodeName;

  if (nodeName == ERROR_TITLE_NODE_TYPE) {
    if (alreadyParsedTitle) {
      return;
    }

    alreadyParsedTitle = true;
  }

  if (isNodeText(nodeName)) {
    errorText = errorText + node.nodeValue + '\n';

    if (hasLineOrColumn(node.nodeValue)) {
      var _getLineAndColumnErro = getLineAndColumnError(node),
          _getLineAndColumnErro2 = _slicedToArray(_getLineAndColumnErro, 2),
          line = _getLineAndColumnErro2[0],
          column = _getLineAndColumnErro2[1];

      errorObject.line = line ? parseInt(line, 10) : line;
      errorObject.column = column ? parseInt(column, 10) : column;
      errorObject.errorMessage = errorText;

      var _getErrorCodeAndMessa = getErrorCodeAndMessage(getErrorMessage(node)),
          _getErrorCodeAndMessa2 = _slicedToArray(_getErrorCodeAndMessa, 2),
          code = _getErrorCodeAndMessa2[0],
          message = _getErrorCodeAndMessa2[1];

      errorObject.msg = message;
      errorObject.code = code;
    }
  }

  for (var i = 0; i < childrenLen; i++) {
    checkErrorXML(node.childNodes[i], errorObject);
  }

  return errorObject;
}

var hasLineOrColumn = function hasLineOrColumn() {
  var nodeValue = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  return nodeValue.toLowerCase().includes('line') || nodeValue.toLowerCase().includes('column');
};

var getLineAndColumnError = function getLineAndColumnError(_ref) {
  var nodeValue = _ref.nodeValue;
  var matched = nodeValue.match(/(\d+)/g);
  return matched || ['', ''];
};

var getErrorMessage = function getErrorMessage(_ref2) {
  var nodeValue = _ref2.nodeValue;
  return nodeValue.split(':') // omit line and column message
  .filter(function (err, index) {
    return index;
  }).map(function (err) {
    return err.trim();
  });
};

var getErrorCodeAndMessage = function getErrorCodeAndMessage(_ref3) {
  var _ref4 = _toArray(_ref3),
      code = _ref4[0],
      message = _ref4[1],
      rest = _ref4.slice(2);

  if (!message) {
    message = code;
  }

  if (Array.isArray(rest) && rest.length) {
    message += ' ' + rest.join(' ');
  }

  if (message === code) {
    var commonError = COMMON_ERRORS.find(function (error) {
      return message.includes(error.message);
    });

    if (commonError) {
      code = commonError.type;
    }
  }

  return [code, message];
};

var validate = function validate(content) {
  var parser = new DOMParser();
  var xmlDoc = parser.parseFromString(content, 'application/xml');

  if (xmlDoc.getElementsByTagName('parsererror').length > 0) {
    var _xmlDoc$getElementsBy = xmlDoc.getElementsByTagName('parsererror'),
        _xmlDoc$getElementsBy2 = _slicedToArray(_xmlDoc$getElementsBy, 1),
        error = _xmlDoc$getElementsBy2[0];

    return checkErrorXML(error);
  }

  return true;
};

exports.validate = validate;

},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _toArray(arr) { return _arrayWithHoles(arr) || _iterableToArray(arr) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _default = function _default() {
  var classPrefix = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  return function createElement(tagIdClasses) {
    var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var children = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

    if (props instanceof Node || typeof props === 'string' || Array.isArray(props)) {
      children = props;
      props = {};
    }

    if (children && !Array.isArray(children)) children = [children];

    var _tagIdClasses$split = tagIdClasses.split('.'),
        _tagIdClasses$split2 = _toArray(_tagIdClasses$split),
        tagId = _tagIdClasses$split2[0],
        classes = _tagIdClasses$split2.slice(1);

    var _tagId$split = tagId.split('#'),
        _tagId$split2 = _slicedToArray(_tagId$split, 2),
        tag = _tagId$split2[0],
        id = _tagId$split2[1];

    var el = document.createElement(tag || 'div');
    if (id) el.id = id;
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = classes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var c = _step.value;
        el.classList.add(classPrefix + c);
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator["return"] != null) {
          _iterator["return"]();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = children[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var _c = _step2.value;
        if (_c) el.appendChild(typeof _c === 'string' ? document.createTextNode(_c) : _c);
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
          _iterator2["return"]();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }

    return Object.assign(el, props);
  };
};

exports["default"] = _default;

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.styles = void 0;
var styles = "\n.template-hint__modal {\n  position: fixed;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  background:white;\n  z-index: 10000;\n  box-sizing: border-box;\n  overflow-y: scroll;\n  overflow-x: hidden;\n  font-size:18px;\n}\n\n.template-hint__modal,\n.template-hint__modal * {\n  display: block;\n  padding: 0;\n  margin: 0;\n  font-family: Menlo, Monaco, \"Courier New\", Courier, monospace;\n}\n\n.template-hint__modal span,\n.template-hint__modal strong {\n  display: inline-block;\n}\n\n.template-hint strong {\n  font-weight: bold;\n}\n\n.template-hint__hidden {\n  display: none;\n}\n\n.template-hint__modal h1 {\n  font-size: 1.77em;\n  color: #d53344\n  font-weight: 600;\n  margin-top:50px;\n  margin-bottom:45px;\n  position: relative;\n}\n\n.template-hint__close {\n  color: black;\n  font-weight: normal;\n  text-decoration: none;\n  position: absolute;\n  top:-0.32em;\n  right: 1em;\n  opacity: 0.15;\n  transition: all 0.25s ease-in-out;\n}\n\n.template-hint__close:hover {\n  transform:scale(1.5);\n  opacity: 0.25;\n}\n\n.template-hint__error {\n  padding: 1.5em;\n  margin: 1em 0 3em 0;\n  left:0;\n}\n\n.template-hint__error-title {\n  align-items: stretch;\n  padding-right: 50px;\n}\n\n.template-hint__error-type {\n  color: #d53344;\n  margin-right: 2em;\n  white-space: nowrap;\n  font-size: 1.2em;\n}\n\n.template-hint__error-message {\n  font-size: 1em;\n  margin-top: .5em;\n}\n\n.template-hint__error-stack {\n  margin-top: 1em;\n  white-space: pre;\n}\n\n.template-hint__stack-entry {\n  overflow: auto;\n  padding: 1em;\n  background-color: #fef4f4;\n}\n\n.template-hint__collapsed .template-hint__stack-entry-hidden {\n  display: none;\n}\n\n.template-hint__file {\n  font-weight: bold;\n  margin-top: 2.5em;\n  margin-bottom: 1.5em;\n  color: rgb(202, 17, 63);\n}\n\n.template-hint__file strong {\n  text-decoration: underline;\n}\n\n.template-hint__file:before,\n.template-hint__more:before {\n  content: '@ ';\n  opacity: 0.5;\n  margin-left: -1.25em;\n}\n\n.template-hint__more:before {\n  content: '\u25B7 ';\n  opacity: 0.5;\n}\n\n.template-hint__more {\n  opacity: 0.25;\n  color: black;\n  font-size: 0.835em;\n  cursor: pointer;\n  text-align: center;\n  display: none;\n}\n\n.template-hint__more em {\n  font-style: normal;\n  font-weight: normal;\n  border-bottom: 1px dashed black;\n}\n\n.template-hint__collapsed .template-hint__more {\n  display: block;\n}\n\n.template-hint__lines {\n  color:rgb(187, 165, 165);\n  font-size: 0.835em;\n  padding-bottom: .5em;\n}\n\n.template-hint__lines:not(.template-hint__no-fade) {\n  width: fit-content;\n}\n\n.template-hint__line-number {\n  opacity: 0.5;\n  padding-left: 1em;\n}\n\n.template-hint__line-hili {\n  background-color: #fccfcf;\n  color: #5f4545;\n  position: relative;\n}\n\n.template-hint__line-hili:before {\n  content: '>';\n  position: absolute;\n  color: #ff0040;\n}\n\n.template-hint__stack-entry:first-child .template-hint__line-hili strong {\n  text-decoration: underline wavy #ff0040;\n}\n";
exports.styles = styles;

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _styles = require("./styles");

var _browserValidate = require("./browser-validate");

var _renderer = _interopRequireDefault(require("./renderer"));

var types = _interopRequireWildcard(require("./types"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var h = (0, _renderer["default"])('template-hint__');
var style = h('style', _styles.styles);
var errors = h('.errors');
var modal = h('.modal.hidden.collapsed', [h('h1', ['', h('a.close', {
  href: '#',
  onclick: function onclick() {
    toggle(false);
  }
}, '×')]), errors]);

function renderStackEntry(entry, i, message) {
  var _entry$sourceFile = entry.sourceFile,
      sourceFile = _entry$sourceFile === void 0 ? {
    lines: []
  } : _entry$sourceFile,
      line = entry.line,
      column = entry.column;
  var lineIndex = line - 1;
  var maxLines = sourceFile.lines.length;
  var window = 5;
  var start = lineIndex - window;
  var end = lineIndex + window + 2;

  if (start < 0) {
    end = Math.min(end - start, maxLines);
    start = 0;
  }

  if (end > maxLines) {
    start = Math.max(0, start - (end - maxLines));
    end = maxLines;
  }

  var lines = sourceFile.lines.slice(start, end);
  var lineNumberWidth = String(start + lines.length).length;
  var hiliIndex = line - start - 1;
  var hiliMsg = i === 0 ? message : '';
  var onLastLine = hiliIndex === lines.length - 1;
  var className = '.stack-entry';
  return h(className, {}, [h('.lines' + (onLastLine ? '.no-fade' : ''), lines.length ? lines.map(function (text, i) {
    return h('.line' + (i === hiliIndex ? '.line-hili' : ''), [h('span.line-number', String(start + i + 1).padStart(lineNumberWidth, ' ') + ' | '), h('span.line-text', i === hiliIndex ? renderHighlightedLine(text, column, hiliMsg) : text)]);
  }) : [h('.line', [h('span.line-number', String(line))])])]);
}

function renderHighlightedLine(text, column) {
  var _ref = [text.slice(0, column - 1), text.slice(column - 1)],
      before = _ref[0],
      after = _ref[1];
  return [before, h('strong', after)];
}

function renderError(err, content) {
  var type = err.code;
  var msg = err.msg;
  var filesLines = content.split(/\r?\n/);
  var indexText = msg;
  var stackError = Object.assign(err, {
    sourceFile: {
      lines: filesLines
    }
  });
  var stack = [stackError];
  var el = h('.error', {
    _indexText: indexText
  }, [h('.error-title', [h('p.error-type', [type]), h('p.error-message', msg)]), h('.error-stack', _toConsumableArray(stack.map(function (e, i) {
    return renderStackEntry(e, i, msg);
  })))]);
  errors.insertBefore(el, errors.firstChild);
  if (errors.childElementCount > 10) errors.lastChild.remove(); // prevents hang in case of vast number of errors

  toggle(true);
  return toggle;
}

function toggle(yes) {
  if (document.body) {
    if (yes) {
      document.head.appendChild(style);
      document.body.appendChild(modal);
    }

    document.body.classList.toggle('template-hint__visible', yes);
  }

  modal.classList.toggle('template-hint__hidden', !yes);
}

var isValidContent = function isValidContent(content) {
  var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : types.XML;

  switch (type.toLowerCase()) {
    case types.XML:
      var isValid = (0, _browserValidate.validate)(content);
      return isValid == true ? null : renderError(isValid, content);

    default:
      throw new Error("Type '".concat(type, "' not found"));
  }
};

var templateHint = {
  validate: isValidContent
};
var _default = templateHint;
exports["default"] = _default;

},{"./browser-validate":1,"./renderer":2,"./styles":3,"./types":5}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.XML = void 0;
var XML = 'xml';
exports.XML = XML;

},{}],6:[function(require,module,exports){
"use strict";

var _templateHint = _interopRequireDefault(require("./src/template-hint"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

window.templateHint = _templateHint["default"];

},{"./src/template-hint":4}]},{},[6])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYnJvd3Nlci12YWxpZGF0ZS5qcyIsInNyYy9yZW5kZXJlci5qcyIsInNyYy9zdHlsZXMuanMiLCJzcmMvdGVtcGxhdGUtaGludC5qcyIsInNyYy90eXBlcy5qcyIsInRlbXBsYXRlLWhpbnQuYnJvd3Nlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBQSxJQUFJLGtCQUFrQixHQUFHLEtBQXpCO0FBQ0EsSUFBTSxxQkFBcUIsR0FBRyxJQUE5QjtBQUNBLElBQUksU0FBUyxHQUFHLEVBQWhCO0FBQ0EsSUFBTSxhQUFhLEdBQUcsQ0FDcEI7QUFDRSxFQUFBLE9BQU8sRUFBRSxtQkFEWDtBQUVFLEVBQUEsSUFBSSxFQUFFO0FBRlIsQ0FEb0IsQ0FBdEI7O0FBT0EsSUFBTSxVQUFVLEdBQUcsU0FBYixVQUFhLENBQUEsUUFBUTtBQUFBLFNBQUksUUFBUSxJQUFJLE9BQWhCO0FBQUEsQ0FBM0I7O0FBRUEsU0FBUyxhQUFULENBQXVCLElBQXZCLEVBQStDO0FBQUEsTUFBbEIsV0FBa0IsdUVBQUosRUFBSTtBQUM3QyxNQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsVUFBTCxDQUFnQixNQUFsQztBQUQ2QyxNQUV2QyxRQUZ1QyxHQUUxQixJQUYwQixDQUV2QyxRQUZ1Qzs7QUFJN0MsTUFBSSxRQUFRLElBQUkscUJBQWhCLEVBQXVDO0FBQ3JDLFFBQUksa0JBQUosRUFBd0I7QUFDdEI7QUFDRDs7QUFFRCxJQUFBLGtCQUFrQixHQUFHLElBQXJCO0FBQ0Q7O0FBRUQsTUFBSSxVQUFVLENBQUMsUUFBRCxDQUFkLEVBQTBCO0FBQ3hCLElBQUEsU0FBUyxHQUFHLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBakIsR0FBNkIsSUFBekM7O0FBQ0EsUUFBSSxlQUFlLENBQUMsSUFBSSxDQUFDLFNBQU4sQ0FBbkIsRUFBcUM7QUFBQSxrQ0FDWixxQkFB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QUFNLFlBQVksR0FBRztBQUNuQixFQUFBLFFBQVEsRUFBRTtBQURTLENBQXJCO2VBSWUsWTs7Ozs7Ozs7OztBQ3BJUixJQUFNLEdBQUcsR0FBRyxLQUFaOzs7Ozs7QUNBUDs7OztBQUVBLE1BQU0sQ0FBQyxZQUFQLEdBQXNCLHdCQUF0QiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImxldCBhbHJlYWR5UGFyc2VkVGl0bGUgPSBmYWxzZTtcbmNvbnN0IEVSUk9SX1RJVExFX05PREVfVFlQRSA9ICdoMyc7XG5sZXQgZXJyb3JUZXh0ID0gJyc7XG5jb25zdCBDT01NT05fRVJST1JTID0gW1xuICB7XG4gICAgbWVzc2FnZTogJ2F0dHJpYnV0ZXMgdmFsdWVzJyxcbiAgICB0eXBlOiAnVmFsdWVFcnJvcicsXG4gIH0sXG5dO1xuXG5jb25zdCBpc05vZGVUZXh0ID0gbm9kZU5hbWUgPT4gbm9kZU5hbWUgPT0gJyN0ZXh0JztcblxuZnVuY3Rpb24gY2hlY2tFcnJvclhNTChub2RlLCBlcnJvck9iamVjdCA9IHt9KSB7XG4gIGxldCBjaGlsZHJlbkxlbiA9IG5vZGUuY2hpbGROb2Rlcy5sZW5ndGg7XG4gIGxldCB7IG5vZGVOYW1lIH0gPSBub2RlO1xuXG4gIGlmIChub2RlTmFtZSA9PSBFUlJPUl9USVRMRV9OT0RFX1RZUEUpIHtcbiAgICBpZiAoYWxyZWFkeVBhcnNlZFRpdGxlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgYWxyZWFkeVBhcnNlZFRpdGxlID0gdHJ1ZTtcbiAgfVxuXG4gIGlmIChpc05vZGVUZXh0KG5vZGVOYW1lKSkge1xuICAgIGVycm9yVGV4dCA9IGVycm9yVGV4dCArIG5vZGUubm9kZVZhbHVlICsgJ1xcbic7XG4gICAgaWYgKGhhc0xpbmVPckNvbHVtbihub2RlLm5vZGVWYWx1ZSkpIHtcbiAgICAgIGNvbnN0IFtsaW5lLCBjb2x1bW5dID0gZ2V0TGluZUFuZENvbHVtbkVycm9yKG5vZGUpO1xuICAgICAgZXJyb3JPYmplY3QubGluZSA9IGxpbmUgPyBwYXJzZUludChsaW5lLCAxMCkgOiBsaW5lO1xuICAgICAgZXJyb3JPYmplY3QuY29sdW1uID0gY29sdW1uID8gcGFyc2VJbnQoY29sdW1uLCAxMCkgOiBjb2x1bW47XG4gICAgICBlcnJvck9iamVjdC5lcnJvck1lc3NhZ2UgPSBlcnJvclRleHQ7XG4gICAgICBjb25zdCBbY29kZSwgbWVzc2FnZV0gPSBnZXRFcnJvckNvZGVBbmRNZXNzYWdlKGdldEVycm9yTWVzc2FnZShub2RlKSk7XG4gICAgICBlcnJvck9iamVjdC5tc2cgPSBtZXNzYWdlO1xuICAgICAgZXJyb3JPYmplY3QuY29kZSA9IGNvZGU7XG4gICAgfVxuICB9XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBjaGlsZHJlbkxlbjsgaSsrKSB7XG4gICAgY2hlY2tFcnJvclhNTChub2RlLmNoaWxkTm9kZXNbaV0sIGVycm9yT2JqZWN0KTtcbiAgfVxuXG4gIHJldHVybiBlcnJvck9iamVjdDtcbn1cblxuY29uc3QgaGFzTGluZU9yQ29sdW1uID0gKG5vZGVWYWx1ZSA9ICcnKSA9PlxuICBub2RlVmFsdWUudG9Mb3dlckNhc2UoKS5pbmNsdWRlcygnbGluZScpIHx8XG4gIG5vZGVWYWx1ZS50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKCdjb2x1bW4nKTtcblxuY29uc3QgZ2V0TGluZUFuZENvbHVtbkVycm9yID0gKHsgbm9kZVZhbHVlIH0pID0+IHtcbiAgY29uc3QgbWF0Y2hlZCA9IG5vZGVWYWx1ZS5tYXRjaCgvKFxcZCspL2cpO1xuXG4gIHJldHVybiBtYXRjaGVkIHx8IFsnJywgJyddO1xufTtcblxuY29uc3QgZ2V0RXJyb3JNZXNzYWdlID0gKHsgbm9kZVZhbHVlIH0pID0+IHtcbiAgcmV0dXJuIChcbiAgICBub2RlVmFsdWVcbiAgICAgIC5zcGxpdCgnOicpXG4gICAgICAvLyBvbWl0IGxpbmUgYW5kIGNvbHVtbiBtZXNzYWdlXG4gICAgICAuZmlsdGVyKChlcnIsIGluZGV4KSA9PiBpbmRleClcbiAgICAgIC5tYXAoZXJyID0+IGVyci50cmltKCkpXG4gICk7XG59O1xuXG5jb25zdCBnZXRFcnJvckNvZGVBbmRNZXNzYWdlID0gKFtjb2RlLCBtZXNzYWdlLCAuLi5yZXN0XSkgPT4ge1xuICBpZiAoIW1lc3NhZ2UpIHtcbiAgICBtZXNzYWdlID0gY29kZTtcbiAgfVxuXG4gIGlmIChBcnJheS5pc0FycmF5KHJlc3QpICYmIHJlc3QubGVuZ3RoKSB7XG4gICAgbWVzc2FnZSArPSAnICcgKyByZXN0LmpvaW4oJyAnKTtcbiAgfVxuXG4gIGlmIChtZXNzYWdlID09PSBjb2RlKSB7XG4gICAgY29uc3QgY29tbW9uRXJyb3IgPSBDT01NT05fRVJST1JTLmZpbmQoZXJyb3IgPT4ge1xuICAgICAgcmV0dXJuIG1lc3NhZ2UuaW5jbHVkZXMoZXJyb3IubWVzc2FnZSk7XG4gICAgfSk7XG5cbiAgICBpZiAoY29tbW9uRXJyb3IpIHtcbiAgICAgIGNvZGUgPSBjb21tb25FcnJvci50eXBlO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBbY29kZSwgbWVzc2FnZV07XG59O1xuXG5leHBvcnQgY29uc3QgdmFsaWRhdGUgPSBjb250ZW50ID0+IHtcbiAgdmFyIHBhcnNlciA9IG5ldyBET01QYXJzZXIoKTtcbiAgdmFyIHhtbERvYyA9IHBhcnNlci5wYXJzZUZyb21TdHJpbmcoY29udGVudCwgJ2FwcGxpY2F0aW9uL3htbCcpO1xuXG4gIGlmICh4bWxEb2MuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3BhcnNlcmVycm9yJykubGVuZ3RoID4gMCkge1xuICAgIGNvbnN0IFtlcnJvcl0gPSB4bWxEb2MuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3BhcnNlcmVycm9yJyk7XG4gICAgcmV0dXJuIGNoZWNrRXJyb3JYTUwoZXJyb3IpO1xuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59O1xuIiwiZXhwb3J0IGRlZmF1bHQgKGNsYXNzUHJlZml4ID0gJycpID0+XG4gIGZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnQodGFnSWRDbGFzc2VzLCBwcm9wcyA9IHt9LCBjaGlsZHJlbiA9IFtdKSB7XG4gICAgaWYgKFxuICAgICAgcHJvcHMgaW5zdGFuY2VvZiBOb2RlIHx8XG4gICAgICB0eXBlb2YgcHJvcHMgPT09ICdzdHJpbmcnIHx8XG4gICAgICBBcnJheS5pc0FycmF5KHByb3BzKVxuICAgICkge1xuICAgICAgY2hpbGRyZW4gPSBwcm9wcztcbiAgICAgIHByb3BzID0ge307XG4gICAgfVxuICAgIGlmIChjaGlsZHJlbiAmJiAhQXJyYXkuaXNBcnJheShjaGlsZHJlbikpIGNoaWxkcmVuID0gW2NoaWxkcmVuXTtcblxuICAgIGNvbnN0IFt0YWdJZCwgLi4uY2xhc3Nlc10gPSB0YWdJZENsYXNzZXMuc3BsaXQoJy4nKTtcbiAgICBjb25zdCBbdGFnLCBpZF0gPSB0YWdJZC5zcGxpdCgnIycpO1xuXG4gICAgY29uc3QgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZyB8fCAnZGl2Jyk7XG5cbiAgICBpZiAoaWQpIGVsLmlkID0gaWQ7XG5cbiAgICBmb3IgKGNvbnN0IGMgb2YgY2xhc3NlcykgZWwuY2xhc3NMaXN0LmFkZChjbGFzc1ByZWZpeCArIGMpO1xuICAgIGZvciAoY29uc3QgYyBvZiBjaGlsZHJlbilcbiAgICAgIGlmIChjKVxuICAgICAgICBlbC5hcHBlbmRDaGlsZCh0eXBlb2YgYyA9PT0gJ3N0cmluZycgPyBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjKSA6IGMpO1xuXG4gICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oZWwsIHByb3BzKTtcbiAgfTtcbiIsImV4cG9ydCBjb25zdCBzdHlsZXMgPSBgXG4udGVtcGxhdGUtaGludF9fbW9kYWwge1xuICBwb3NpdGlvbjogZml4ZWQ7XG4gIHRvcDogMDtcbiAgcmlnaHQ6IDA7XG4gIGJvdHRvbTogMDtcbiAgbGVmdDogMDtcbiAgYmFja2dyb3VuZDp3aGl0ZTtcbiAgei1pbmRleDogMTAwMDA7XG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gIG92ZXJmbG93LXk6IHNjcm9sbDtcbiAgb3ZlcmZsb3cteDogaGlkZGVuO1xuICBmb250LXNpemU6MThweDtcbn1cblxuLnRlbXBsYXRlLWhpbnRfX21vZGFsLFxuLnRlbXBsYXRlLWhpbnRfX21vZGFsICoge1xuICBkaXNwbGF5OiBibG9jaztcbiAgcGFkZGluZzogMDtcbiAgbWFyZ2luOiAwO1xuICBmb250LWZhbWlseTogTWVubG8sIE1vbmFjbywgXCJDb3VyaWVyIE5ld1wiLCBDb3VyaWVyLCBtb25vc3BhY2U7XG59XG5cbi50ZW1wbGF0ZS1oaW50X19tb2RhbCBzcGFuLFxuLnRlbXBsYXRlLWhpbnRfX21vZGFsIHN0cm9uZyB7XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbn1cblxuLnRlbXBsYXRlLWhpbnQgc3Ryb25nIHtcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XG59XG5cbi50ZW1wbGF0ZS1oaW50X19oaWRkZW4ge1xuICBkaXNwbGF5OiBub25lO1xufVxuXG4udGVtcGxhdGUtaGludF9fbW9kYWwgaDEge1xuICBmb250LXNpemU6IDEuNzdlbTtcbiAgY29sb3I6ICNkNTMzNDRcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgbWFyZ2luLXRvcDo1MHB4O1xuICBtYXJnaW4tYm90dG9tOjQ1cHg7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbn1cblxuLnRlbXBsYXRlLWhpbnRfX2Nsb3NlIHtcbiAgY29sb3I6IGJsYWNrO1xuICBmb250LXdlaWdodDogbm9ybWFsO1xuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOi0wLjMyZW07XG4gIHJpZ2h0OiAxZW07XG4gIG9wYWNpdHk6IDAuMTU7XG4gIHRyYW5zaXRpb246IGFsbCAwLjI1cyBlYXNlLWluLW91dDtcbn1cblxuLnRlbXBsYXRlLWhpbnRfX2Nsb3NlOmhvdmVyIHtcbiAgdHJhbnNmb3JtOnNjYWxlKDEuNSk7XG4gIG9wYWNpdHk6IDAuMjU7XG59XG5cbi50ZW1wbGF0ZS1oaW50X19lcnJvciB7XG4gIHBhZGRpbmc6IDEuNWVtO1xuICBtYXJnaW46IDFlbSAwIDNlbSAwO1xuICBsZWZ0OjA7XG59XG5cbi50ZW1wbGF0ZS1oaW50X19lcnJvci10aXRsZSB7XG4gIGFsaWduLWl0ZW1zOiBzdHJldGNoO1xuICBwYWRkaW5nLXJpZ2h0OiA1MHB4O1xufVxuXG4udGVtcGxhdGUtaGludF9fZXJyb3ItdHlwZSB7XG4gIGNvbG9yOiAjZDUzMzQ0O1xuICBtYXJnaW4tcmlnaHQ6IDJlbTtcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbiAgZm9udC1zaXplOiAxLjJlbTtcbn1cblxuLnRlbXBsYXRlLWhpbnRfX2Vycm9yLW1lc3NhZ2Uge1xuICBmb250LXNpemU6IDFlbTtcbiAgbWFyZ2luLXRvcDogLjVlbTtcbn1cblxuLnRlbXBsYXRlLWhpbnRfX2Vycm9yLXN0YWNrIHtcbiAgbWFyZ2luLXRvcDogMWVtO1xuICB3aGl0ZS1zcGFjZTogcHJlO1xufVxuXG4udGVtcGxhdGUtaGludF9fc3RhY2stZW50cnkge1xuICBvdmVyZmxvdzogYXV0bztcbiAgcGFkZGluZzogMWVtO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmVmNGY0O1xufVxuXG4udGVtcGxhdGUtaGludF9fY29sbGFwc2VkIC50ZW1wbGF0ZS1oaW50X19zdGFjay1lbnRyeS1oaWRkZW4ge1xuICBkaXNwbGF5OiBub25lO1xufVxuXG4udGVtcGxhdGUtaGludF9fZmlsZSB7XG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xuICBtYXJnaW4tdG9wOiAyLjVlbTtcbiAgbWFyZ2luLWJvdHRvbTogMS41ZW07XG4gIGNvbG9yOiByZ2IoMjAyLCAxNywgNjMpO1xufVxuXG4udGVtcGxhdGUtaGludF9fZmlsZSBzdHJvbmcge1xuICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTtcbn1cblxuLnRlbXBsYXRlLWhpbnRfX2ZpbGU6YmVmb3JlLFxuLnRlbXBsYXRlLWhpbnRfX21vcmU6YmVmb3JlIHtcbiAgY29udGVudDogJ0AgJztcbiAgb3BhY2l0eTogMC41O1xuICBtYXJnaW4tbGVmdDogLTEuMjVlbTtcbn1cblxuLnRlbXBsYXRlLWhpbnRfX21vcmU6YmVmb3JlIHtcbiAgY29udGVudDogJ+KWtyAnO1xuICBvcGFjaXR5OiAwLjU7XG59XG5cbi50ZW1wbGF0ZS1oaW50X19tb3JlIHtcbiAgb3BhY2l0eTogMC4yNTtcbiAgY29sb3I6IGJsYWNrO1xuICBmb250LXNpemU6IDAuODM1ZW07XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBkaXNwbGF5OiBub25lO1xufVxuXG4udGVtcGxhdGUtaGludF9fbW9yZSBlbSB7XG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcbiAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcbiAgYm9yZGVyLWJvdHRvbTogMXB4IGRhc2hlZCBibGFjaztcbn1cblxuLnRlbXBsYXRlLWhpbnRfX2NvbGxhcHNlZCAudGVtcGxhdGUtaGludF9fbW9yZSB7XG4gIGRpc3BsYXk6IGJsb2NrO1xufVxuXG4udGVtcGxhdGUtaGludF9fbGluZXMge1xuICBjb2xvcjpyZ2IoMTg3LCAxNjUsIDE2NSk7XG4gIGZvbnQtc2l6ZTogMC44MzVlbTtcbiAgcGFkZGluZy1ib3R0b206IC41ZW07XG59XG5cbi50ZW1wbGF0ZS1oaW50X19saW5lczpub3QoLnRlbXBsYXRlLWhpbnRfX25vLWZhZGUpIHtcbiAgd2lkdGg6IGZpdC1jb250ZW50O1xufVxuXG4udGVtcGxhdGUtaGludF9fbGluZS1udW1iZXIge1xuICBvcGFjaXR5OiAwLjU7XG4gIHBhZGRpbmctbGVmdDogMWVtO1xufVxuXG4udGVtcGxhdGUtaGludF9fbGluZS1oaWxpIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZjY2ZjZjtcbiAgY29sb3I6ICM1ZjQ1NDU7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbn1cblxuLnRlbXBsYXRlLWhpbnRfX2xpbmUtaGlsaTpiZWZvcmUge1xuICBjb250ZW50OiAnPic7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgY29sb3I6ICNmZjAwNDA7XG59XG5cbi50ZW1wbGF0ZS1oaW50X19zdGFjay1lbnRyeTpmaXJzdC1jaGlsZCAudGVtcGxhdGUtaGludF9fbGluZS1oaWxpIHN0cm9uZyB7XG4gIHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lIHdhdnkgI2ZmMDA0MDtcbn1cbmA7XG4iLCJpbXBvcnQgeyBzdHlsZXMgfSBmcm9tICcuL3N0eWxlcyc7XG5pbXBvcnQgeyB2YWxpZGF0ZSB9IGZyb20gJy4vYnJvd3Nlci12YWxpZGF0ZSc7XG5pbXBvcnQgcmVuZGVyIGZyb20gJy4vcmVuZGVyZXInO1xuaW1wb3J0ICogYXMgdHlwZXMgZnJvbSAnLi90eXBlcyc7XG5cbmNvbnN0IGggPSByZW5kZXIoJ3RlbXBsYXRlLWhpbnRfXycpO1xuY29uc3Qgc3R5bGUgPSBoKCdzdHlsZScsIHN0eWxlcyk7XG5jb25zdCBlcnJvcnMgPSBoKCcuZXJyb3JzJyk7XG5cbmNvbnN0IG1vZGFsID0gaCgnLm1vZGFsLmhpZGRlbi5jb2xsYXBzZWQnLCBbXG4gIGgoJ2gxJywgW1xuICAgICcnLFxuICAgIGgoXG4gICAgICAnYS5jbG9zZScsXG4gICAgICB7XG4gICAgICAgIGhyZWY6ICcjJyxcbiAgICAgICAgb25jbGljaygpIHtcbiAgICAgICAgICB0b2dnbGUoZmFsc2UpO1xuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgICfDlydcbiAgICApLFxuICBdKSxcbiAgZXJyb3JzLFxuXSk7XG5cbmZ1bmN0aW9uIHJlbmRlclN0YWNrRW50cnkoZW50cnksIGksIG1lc3NhZ2UpIHtcbiAgY29uc3QgeyBzb3VyY2VGaWxlID0geyBsaW5lczogW10gfSwgbGluZSwgY29sdW1uIH0gPSBlbnRyeTtcbiAgY29uc3QgbGluZUluZGV4ID0gbGluZSAtIDE7XG4gIGNvbnN0IG1heExpbmVzID0gc291cmNlRmlsZS5saW5lcy5sZW5ndGg7XG4gIGNvbnN0IHdpbmRvdyA9IDU7XG5cbiAgbGV0IHN0YXJ0ID0gbGluZUluZGV4IC0gd2luZG93O1xuICBsZXQgZW5kID0gbGluZUluZGV4ICsgd2luZG93ICsgMjtcblxuICBpZiAoc3RhcnQgPCAwKSB7XG4gICAgZW5kID0gTWF0aC5taW4oZW5kIC0gc3RhcnQsIG1heExpbmVzKTtcbiAgICBzdGFydCA9IDA7XG4gIH1cbiAgaWYgKGVuZCA+IG1heExpbmVzKSB7XG4gICAgc3RhcnQgPSBNYXRoLm1heCgwLCBzdGFydCAtIChlbmQgLSBtYXhMaW5lcykpO1xuICAgIGVuZCA9IG1heExpbmVzO1xuICB9XG5cbiAgY29uc3QgbGluZXMgPSBzb3VyY2VGaWxlLmxpbmVzLnNsaWNlKHN0YXJ0LCBlbmQpO1xuICBjb25zdCBsaW5lTnVtYmVyV2lkdGggPSBTdHJpbmcoc3RhcnQgKyBsaW5lcy5sZW5ndGgpLmxlbmd0aDtcbiAgY29uc3QgaGlsaUluZGV4ID0gbGluZSAtIHN0YXJ0IC0gMTtcbiAgY29uc3QgaGlsaU1zZyA9IGkgPT09IDAgPyBtZXNzYWdlIDogJyc7XG4gIGNvbnN0IG9uTGFzdExpbmUgPSBoaWxpSW5kZXggPT09IGxpbmVzLmxlbmd0aCAtIDE7XG5cbiAgY29uc3QgY2xhc3NOYW1lID0gJy5zdGFjay1lbnRyeSc7XG5cbiAgcmV0dXJuIGgoY2xhc3NOYW1lLCB7fSwgW1xuICAgIGgoXG4gICAgICAnLmxpbmVzJyArIChvbkxhc3RMaW5lID8gJy5uby1mYWRlJyA6ICcnKSxcbiAgICAgIGxpbmVzLmxlbmd0aFxuICAgICAgICA/IGxpbmVzLm1hcCgodGV4dCwgaSkgPT5cbiAgICAgICAgICAgIGgoJy5saW5lJyArIChpID09PSBoaWxpSW5kZXggPyAnLmxpbmUtaGlsaScgOiAnJyksIFtcbiAgICAgICAgICAgICAgaChcbiAgICAgICAgICAgICAgICAnc3Bhbi5saW5lLW51bWJlcicsXG4gICAgICAgICAgICAgICAgU3RyaW5nKHN0YXJ0ICsgaSArIDEpLnBhZFN0YXJ0KGxpbmVOdW1iZXJXaWR0aCwgJyAnKSArICcgfCAnXG4gICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgIGgoXG4gICAgICAgICAgICAgICAgJ3NwYW4ubGluZS10ZXh0JyxcbiAgICAgICAgICAgICAgICBpID09PSBoaWxpSW5kZXhcbiAgICAgICAgICAgICAgICAgID8gcmVuZGVySGlnaGxpZ2h0ZWRMaW5lKHRleHQsIGNvbHVtbiwgaGlsaU1zZylcbiAgICAgICAgICAgICAgICAgIDogdGV4dFxuICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgXSlcbiAgICAgICAgICApXG4gICAgICAgIDogW2goJy5saW5lJywgW2goJ3NwYW4ubGluZS1udW1iZXInLCBTdHJpbmcobGluZSkpXSldXG4gICAgKSxcbiAgXSk7XG59XG5cbmZ1bmN0aW9uIHJlbmRlckhpZ2hsaWdodGVkTGluZSh0ZXh0LCBjb2x1bW4pIHtcbiAgY29uc3QgW2JlZm9yZSwgYWZ0ZXJdID0gW3RleHQuc2xpY2UoMCwgY29sdW1uIC0gMSksIHRleHQuc2xpY2UoY29sdW1uIC0gMSldO1xuXG4gIHJldHVybiBbYmVmb3JlLCBoKCdzdHJvbmcnLCBhZnRlcildO1xufVxuZnVuY3Rpb24gcmVuZGVyRXJyb3IoZXJyLCBjb250ZW50KSB7XG4gIGNvbnN0IHR5cGUgPSBlcnIuY29kZTtcbiAgY29uc3QgbXNnID0gZXJyLm1zZztcbiAgY29uc3QgZmlsZXNMaW5lcyA9IGNvbnRlbnQuc3BsaXQoL1xccj9cXG4vKTtcbiAgbGV0IGluZGV4VGV4dCA9IG1zZztcbiAgY29uc3Qgc3RhY2tFcnJvciA9IE9iamVjdC5hc3NpZ24oZXJyLCB7XG4gICAgc291cmNlRmlsZToge1xuICAgICAgbGluZXM6IGZpbGVzTGluZXMsXG4gICAgfSxcbiAgfSk7XG4gIGNvbnN0IHN0YWNrID0gW3N0YWNrRXJyb3JdO1xuXG4gIGNvbnN0IGVsID0gaCgnLmVycm9yJywgeyBfaW5kZXhUZXh0OiBpbmRleFRleHQgfSwgW1xuICAgIGgoJy5lcnJvci10aXRsZScsIFtoKCdwLmVycm9yLXR5cGUnLCBbdHlwZV0pLCBoKCdwLmVycm9yLW1lc3NhZ2UnLCBtc2cpXSksXG4gICAgaCgnLmVycm9yLXN0YWNrJywgWy4uLnN0YWNrLm1hcCgoZSwgaSkgPT4gcmVuZGVyU3RhY2tFbnRyeShlLCBpLCBtc2cpKV0pLFxuICBdKTtcblxuICBlcnJvcnMuaW5zZXJ0QmVmb3JlKGVsLCBlcnJvcnMuZmlyc3RDaGlsZCk7XG4gIGlmIChlcnJvcnMuY2hpbGRFbGVtZW50Q291bnQgPiAxMCkgZXJyb3JzLmxhc3RDaGlsZC5yZW1vdmUoKTsgLy8gcHJldmVudHMgaGFuZyBpbiBjYXNlIG9mIHZhc3QgbnVtYmVyIG9mIGVycm9yc1xuXG4gIHRvZ2dsZSh0cnVlKTtcblxuICByZXR1cm4gdG9nZ2xlO1xufVxuXG5mdW5jdGlvbiB0b2dnbGUoeWVzKSB7XG4gIGlmIChkb2N1bWVudC5ib2R5KSB7XG4gICAgaWYgKHllcykge1xuICAgICAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzdHlsZSk7XG4gICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKG1vZGFsKTtcbiAgICB9XG4gICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QudG9nZ2xlKCd0ZW1wbGF0ZS1oaW50X192aXNpYmxlJywgeWVzKTtcbiAgfVxuXG4gIG1vZGFsLmNsYXNzTGlzdC50b2dnbGUoJ3RlbXBsYXRlLWhpbnRfX2hpZGRlbicsICF5ZXMpO1xufVxuXG5jb25zdCBpc1ZhbGlkQ29udGVudCA9IChjb250ZW50LCB0eXBlID0gdHlwZXMuWE1MKSA9PiB7XG4gIHN3aXRjaCAodHlwZS50b0xvd2VyQ2FzZSgpKSB7XG4gICAgY2FzZSB0eXBlcy5YTUw6XG4gICAgICBjb25zdCBpc1ZhbGlkID0gdmFsaWRhdGUoY29udGVudCk7XG5cbiAgICAgIHJldHVybiBpc1ZhbGlkID09IHRydWUgPyBudWxsIDogcmVuZGVyRXJyb3IoaXNWYWxpZCwgY29udGVudCk7XG4gICAgZGVmYXVsdDpcbiAgICAgIHRocm93IG5ldyBFcnJvcihgVHlwZSAnJHt0eXBlfScgbm90IGZvdW5kYCk7XG4gIH1cbn07XG5cbmNvbnN0IHRlbXBsYXRlSGludCA9IHtcbiAgdmFsaWRhdGU6IGlzVmFsaWRDb250ZW50LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgdGVtcGxhdGVIaW50O1xuIiwiZXhwb3J0IGNvbnN0IFhNTCA9ICd4bWwnO1xuIiwiaW1wb3J0IHRlbXBsYXRlSGludCBmcm9tICcuL3NyYy90ZW1wbGF0ZS1oaW50Jztcblxud2luZG93LnRlbXBsYXRlSGludCA9IHRlbXBsYXRlSGludDtcbiJdfQ==
