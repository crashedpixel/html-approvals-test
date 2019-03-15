import { init as initHTMLApproval } from '../index';

describe('HTML Approval Tests', () => {
  beforeAll(() => {
    initHTMLApproval({
      path: './src/__tests__/approved/',
    });
  });

  test('Check HTML for an .approval that doesnt exist', () => {
    const html = `<html>
    <head>
        <title>Document</title>
    </head>
    <body>
        <h1>Test Page</h1>
        <p>This is a test page for testing purposes</p>
    </body>
</html>`;

    expect(html).checkHTMLApproval();
  });

  test('Check HTML for an .approval that has changed', () => {
    const html = `<html>
    <head>
        <title>Document: ${Math.random()}</title>
    </head>
    <body>
        <h1>Test Page</h1>
        <p>This is a test page for testing purposes</p>
    </body>
</html>`;

    expect(html).checkHTMLApproval();
  });
});
