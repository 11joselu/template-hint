import templateHint from '../../src/template-hint';

window.templateHint = templateHint;
const xml = `<note>
<to>Tove</to>
<from>Jani</from>
<heading>Reminder</heading>
<body>Don't forget me this weekend!</body>
<from>Jani</from>
<heading>Reminder</heading>
<body>Don't forget me this weekend!</body>
<from title="<strong>asddsa</strong>>Jani</from>
<heading>Reminder</heading>
<body>Don't forget me this weekend!</body>
<from>Jani</from>
<heading>Reminder</heading>
<body>Don't forget me this weekend!</body>
<from>Jani</from>
<heading>Reminder</heading>
<body>Don't forget me this weekend!</body>
<from>(2000 mts)</from>
<body>Don't forget me this weekend!</body>
<body>Don't forget me this weekend!</body>
<body>Don't forget me this weekend!</body>
<body>Don't forget me this weekend!</body>
<body>Don't forget me this weekend!</body>
<body>Don't forget me this weekend!</body>
<body>asdsdad</body>
</note>`;

function helloWorld() {
  const toggle = templateHint.validate(xml);
}

helloWorld();
