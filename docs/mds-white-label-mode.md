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

## Sprint 2 — Arquitetura de Features

Sprint 2 adds a frontend-only feature registry for future MDS white label behavior without changing the base Sprint 1 flag plumbing.

- Feature keys live in `MDS_WHITE_LABEL_FEATURES` from `app/javascript/dashboard/helper/mdsWhiteLabelFeatures.js`.
- `getMdsWhiteLabelFeatures()` returns the enabled MDS feature registry only when `isMdsWhiteLabelModeEnabled()` is enabled.
- `isMdsWhiteLabelFeatureEnabled(featureName)` checks one registered feature and returns `false` when MDS White Label Mode is disabled or the feature key is not registered.

Frontend code that needs Sprint 2 feature checks should import the feature helper instead of reading the registry directly:

```js
import {
  isMdsWhiteLabelFeatureEnabled,
  MDS_WHITE_LABEL_FEATURES,
} from 'dashboard/helper/mdsWhiteLabelFeatures';

if (
  isMdsWhiteLabelFeatureEnabled(MDS_WHITE_LABEL_FEATURES.FEATURES_ARCHITECTURE)
) {
  // MDS white label feature behavior for future sprints.
}
```

## Sprint 3 — Ocultar Capitão

Sprint 3 hides only the Captain entry from the dashboard sidebar when MDS White Label Mode is enabled.

- The sidebar keeps the normal Captain menu unchanged when `MDS_WHITE_LABEL_MODE=false`.
- When `MDS_WHITE_LABEL_MODE=true`, the `HIDE_CAPTAIN_MENU` feature is enabled through `mdsWhiteLabelFeatures.js`, and the sidebar omits only the top-level Captain navigation entry.
- Captain routes, components, permissions, backend APIs, workers, Sidekiq, SSO, inboxes, conversations, messages, and databases are unchanged.
- Other sidebar sections such as Conversations, Inbox, Contacts, Reports, Campaigns, Help Center, and Settings are not affected.

## Sprint 4 — Ocultar Central de Ajuda

Sprint 4 hides only the Help Center entry from the dashboard sidebar when MDS White Label Mode is enabled.

- The sidebar keeps the normal Help Center menu unchanged when `MDS_WHITE_LABEL_MODE=false`.
- When `MDS_WHITE_LABEL_MODE=true`, the `HIDE_HELP_CENTER_MENU` feature is enabled through `mdsWhiteLabelFeatures.js`, and the sidebar omits only the top-level Help Center navigation entry.
- Help Center routes, components, permissions, backend APIs, workers, Sidekiq, SSO, inboxes, conversations, messages, and databases are unchanged.
- Captain remains controlled by the Sprint 3 `HIDE_CAPTAIN_MENU` feature, and no other sidebar sections are affected by this sprint.
