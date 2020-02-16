import { styles } from './styles';
import { validate } from './browser-validate';
import render from './renderer';
import * as types from './types';

const h = render('template-hint__');
const style = h('style', styles);
const errors = h('.errors');

const modal = h('.modal.hidden.collapsed', [
  h('h1', [
    '',
    h(
      'a.close',
      {
        href: '#',
        onclick() {
          toggle(false);
        },
      },
      '×'
    ),
  ]),
  errors,
]);

function renderStackEntry(entry, i, message) {
  const { sourceFile = { lines: [] }, line, column } = entry;
  const lineIndex = line - 1;
  const maxLines = sourceFile.lines.length;
  const window = 5;

  let start = lineIndex - window;
  let end = lineIndex + window + 2;

  if (start < 0) {
    end = Math.min(end - start, maxLines);
    start = 0;
  }
  if (end > maxLines) {
    start = Math.max(0, start - (end - maxLines));
    end = maxLines;
  }

  const lines = sourceFile.lines.slice(start, end);
  const lineNumberWidth = String(start + lines.length).length;
  const hiliIndex = line - start - 1;
  const hiliMsg = i === 0 ? message : '';
  const onLastLine = hiliIndex === lines.length - 1;

  const className = '.stack-entry';

  return h(className, {}, [
    h(
      '.lines' + (onLastLine ? '.no-fade' : ''),
      lines.length
        ? lines.map((text, i) =>
            h('.line' + (i === hiliIndex ? '.line-hili' : ''), [
              h(
                'span.line-number',
                String(start + i + 1).padStart(lineNumberWidth, ' ') + ' | '
              ),
              h(
                'span.line-text',
                i === hiliIndex
                  ? renderHighlightedLine(text, column, hiliMsg)
                  : text
              ),
            ])
          )
        : [h('.line', [h('span.line-number', String(line))])]
    ),
  ]);
}

function renderHighlightedLine(text, column) {
  const [before, after] = [text.slice(0, column - 1), text.slice(column - 1)];

  return [before, h('strong', after)];
}
function renderError(err, content) {
  const type = err.code;
  const msg = err.msg;
  const filesLines = content.split(/\r?\n/);
  let indexText = msg;
  const stackError = Object.assign(err, {
    sourceFile: {
      lines: filesLines,
    },
  });
  const stack = [stackError];

  const el = h('.error', { _indexText: indexText }, [
    h('.error-title', [h('p.error-type', [type]), h('p.error-message', msg)]),
    h('.error-stack', [...stack.map((e, i) => renderStackEntry(e, i, msg))]),
  ]);

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

const isValidContent = (content, type = types.XML) => {
  switch (type.toLowerCase()) {
    case types.XML:
      const isValid = validate(content);

      return isValid == true ? null : renderError(isValid, content);
    default:
      throw new Error(`Type '${type}' not found`);
  }
};

const templateHint = {
  validate: isValidContent,
};

export default templateHint;
