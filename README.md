# HTML Approvals Test

Compare HTML responses with *.approval.html files.

## Config Setup

Import HTMLApprovalTest init function in order to config the approval folder path. The default is `./src/__tests__/approved/` but can be configured easily.

```
import { init as initHTMLApproval } from '../htmlapprovaltest';

initHTMLApproval({
    "path": "./src/__tests__/approved/"
});

expect(html).checkHTMLApproval();
```
