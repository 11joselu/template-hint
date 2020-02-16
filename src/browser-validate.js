let alreadyParsedTitle = false;
const ERROR_TITLE_NODE_TYPE = 'h3';
let errorText = '';
const COMMON_ERRORS = [
  {
    message: 'attributes values',
    type: 'ValueError',
  },
];

const isNodeText = nodeName => nodeName == '#text';

function checkErrorXML(node, errorObject = {}) {
  let childrenLen = node.childNodes.length;
  let { nodeName } = node;

  if (nodeName == ERROR_TITLE_NODE_TYPE) {
    if (alreadyParsedTitle) {
      return;
    }

    alreadyParsedTitle = true;
  }

  if (isNodeText(nodeName)) {
    errorText = errorText + node.nodeValue + '\n';
    if (hasLineOrColumn(node.nodeValue)) {
      const [line, column] = getLineAndColumnError(node);
      errorObject.line = line ? parseInt(line, 10) : line;
      errorObject.column = column ? parseInt(column, 10) : column;
      errorObject.errorMessage = errorText;
      const [code, message] = getErrorCodeAndMessage(getErrorMessage(node));
      errorObject.msg = message;
      errorObject.code = code;
    }
  }

  for (let i = 0; i < childrenLen; i++) {
    checkErrorXML(node.childNodes[i], errorObject);
  }

  return errorObject;
}

const hasLineOrColumn = (nodeValue = '') =>
  nodeValue.toLowerCase().includes('line') ||
  nodeValue.toLowerCase().includes('column');

const getLineAndColumnError = ({ nodeValue }) => {
  const matched = nodeValue.match(/(\d+)/g);

  return matched || ['', ''];
};

const getErrorMessage = ({ nodeValue }) => {
  return (
    nodeValue
      .split(':')
      // omit line and column message
      .filter((err, index) => index)
      .map(err => err.trim())
  );
};

const getErrorCodeAndMessage = ([code, message, ...rest]) => {
  if (!message) {
    message = code;
  }

  if (Array.isArray(rest) && rest.length) {
    message += ' ' + rest.join(' ');
  }

  if (message === code) {
    const commonError = COMMON_ERRORS.find(error => {
      return message.includes(error.message);
    });

    if (commonError) {
      code = commonError.type;
    }
  }

  return [code, message];
};

export const validate = content => {
  var parser = new DOMParser();
  var xmlDoc = parser.parseFromString(content, 'application/xml');

  if (xmlDoc.getElementsByTagName('parsererror').length > 0) {
    const [error] = xmlDoc.getElementsByTagName('parsererror');
    return checkErrorXML(error);
  }

  return true;
};
