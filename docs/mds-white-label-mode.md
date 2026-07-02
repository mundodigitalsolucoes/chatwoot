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

## Sprint 2

### Arquitetura de Features

Sprint 2 adds a single feature-decision layer in `app/javascript/dashboard/helper/mdsWhiteLabelFeatures.js` on top of the Sprint 1 flag plumbing.

All future UI decisions for MDS White Label Mode should read from `mdsWhiteLabelFeatures()` instead of adding scattered checks like `if (isMdsWhiteLabelModeEnabled())` throughout the dashboard.

The current feature map is intentionally permissive in both normal mode and white label mode:

```js
{
  showCaptain: true,
  showHelpCenter: true,
  showCampaigns: true,
  showSettings: true,
  showAutomations: true,
  showBots: true,
  showIntegrations: true,
  showAuditLogs: true,
  showSLA: true,
  showCustomAttributes: true,
  showCustomFunctions: true,
  showReports: true,
}
```

This means Sprint 2 creates the architecture for future feature visibility decisions without changing the product experience now.
