export const styles = `
.template-hint__modal {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background:white;
  z-index: 10000;
  box-sizing: border-box;
  overflow-y: scroll;
  overflow-x: hidden;
  font-size:18px;
}

.template-hint__modal,
.template-hint__modal * {
  display: block;
  padding: 0;
  margin: 0;
  font-family: Menlo, Monaco, "Courier New", Courier, monospace;
}

.template-hint__modal span,
.template-hint__modal strong {
  display: inline-block;
}

.template-hint strong {
  font-weight: bold;
}

.template-hint__hidden {
  display: none;
}

.template-hint__modal h1 {
  font-size: 1.77em;
  color: #d53344
  font-weight: 600;
  margin-top:50px;
  margin-bottom:45px;
  position: relative;
}

.template-hint__close {
  color: black;
  font-weight: normal;
  text-decoration: none;
  position: absolute;
  top:-0.32em;
  right: 1em;
  opacity: 0.15;
  transition: all 0.25s ease-in-out;
}

.template-hint__close:hover {
  transform:scale(1.5);
  opacity: 0.25;
}

.template-hint__error {
  padding: 1.5em;
  margin: 1em 0 3em 0;
  left:0;
}

.template-hint__error-title {
  align-items: stretch;
  padding-right: 50px;
}

.template-hint__error-type {
  color: #d53344;
  margin-right: 2em;
  white-space: nowrap;
  font-size: 1.2em;
}

.template-hint__error-message {
  font-size: 1em;
  margin-top: .5em;
}

.template-hint__error-stack {
  margin-top: 1em;
  white-space: pre;
}

.template-hint__stack-entry {
  overflow: auto;
  padding: 1em;
  background-color: #fef4f4;
}

.template-hint__collapsed .template-hint__stack-entry-hidden {
  display: none;
}

.template-hint__file {
  font-weight: bold;
  margin-top: 2.5em;
  margin-bottom: 1.5em;
  color: rgb(202, 17, 63);
}

.template-hint__file strong {
  text-decoration: underline;
}

.template-hint__file:before,
.template-hint__more:before {
  content: '@ ';
  opacity: 0.5;
  margin-left: -1.25em;
}

.template-hint__more:before {
  content: '▷ ';
  opacity: 0.5;
}

.template-hint__more {
  opacity: 0.25;
  color: black;
  font-size: 0.835em;
  cursor: pointer;
  text-align: center;
  display: none;
}

.template-hint__more em {
  font-style: normal;
  font-weight: normal;
  border-bottom: 1px dashed black;
}

.template-hint__collapsed .template-hint__more {
  display: block;
}

.template-hint__lines {
  color:rgb(187, 165, 165);
  font-size: 0.835em;
  padding-bottom: .5em;
}

.template-hint__lines:not(.template-hint__no-fade) {
  width: fit-content;
}

.template-hint__line-number {
  opacity: 0.5;
  padding-left: 1em;
}

.template-hint__line-hili {
  background-color: #fccfcf;
  color: #5f4545;
  position: relative;
}

.template-hint__line-hili:before {
  content: '>';
  position: absolute;
  color: #ff0040;
}

.template-hint__stack-entry:first-child .template-hint__line-hili strong {
  text-decoration: underline wavy #ff0040;
}
`;
