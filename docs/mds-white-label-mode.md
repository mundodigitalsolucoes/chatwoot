# MDS White Label Mode

MDS White Label Mode is controlled by the `MDS_WHITE_LABEL_MODE` environment variable.

## Sprint 1 scope

Sprint 1 only adds the base feature flag plumbing:

- `MDS_WHITE_LABEL_MODE=false` is documented in `.env.example`.
- The Rails dashboard layout exposes the value as `window.chatwootConfig.mdsWhiteLabelMode`.
- The dashboard frontend can read the flag through `isMdsWhiteLabelModeEnabled()` from `app/javascript/dashboard/helper/mdsWhiteLabel.js`.

## Usage

Keep the flag disabled by default:

```env
MDS_WHITE_LABEL_MODE=false
```

Enable it only for environments that should opt in to MDS white label behavior:

```env
MDS_WHITE_LABEL_MODE=true
```

Frontend code should use the helper instead of reading `window.chatwootConfig` directly:

```js
import { isMdsWhiteLabelModeEnabled } from 'dashboard/helper/mdsWhiteLabel';

if (isMdsWhiteLabelModeEnabled()) {
  // MDS white label behavior for future sprints.
}
```

## Out of scope for Sprint 1

This sprint intentionally does not change sidebar behavior, menus, routes, database schema, controllers, models, APIs, webhooks, SSO, workers, Sidekiq, permissions, inbox lifecycle, or branding.
