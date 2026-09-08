#!/usr/bin/env bash
set -euo pipefail

fail() {
  echo "[MDS white-label] ERRO: $1" >&2
  exit 1
}

require_text() {
  local file="$1"
  local text="$2"
  grep -Fq "$text" "$file" || fail "esperado '$text' em $file"
}

require_text "app/views/layouts/vueapp.html.erb" "MDS_WHITE_LABEL_MODE"
require_text "app/views/layouts/vueapp.html.erb" "Atendimento MDS"
require_text "app/javascript/dashboard/helper/mdsWhiteLabelFeatures.js" "HIDE_UPDATE_BANNER"
require_text "app/javascript/dashboard/helper/mdsWhiteLabelFeatures.js" "HIDE_CHATWOOT_METADATA"
require_text "app/javascript/dashboard/components/app/UpdateBanner.vue" "HIDE_UPDATE_BANNER"
require_text "app/javascript/dashboard/components-next/icon/Logo.vue" "HIDE_CHATWOOT_LOGO"
require_text "app/javascript/dashboard/components-next/sidebar/provider.js" "HIDE_CAPTAIN_MENU"
require_text "app/javascript/dashboard/components-next/sidebar/provider.js" "HIDE_CAMPAIGNS_MENU"
require_text "app/javascript/dashboard/components-next/sidebar/provider.js" "HIDE_HELP_CENTER_MENU"
require_text "app/javascript/dashboard/components-next/sidebar/provider.js" "HIDE_SETTINGS_MENU"
require_text "app/javascript/dashboard/components-next/sidebar/SidebarProfileMenu.vue" "HIDE_USER_MENU_ITEMS"
require_text "app/javascript/dashboard/routes/dashboard/settings/profile/Index.vue" "HIDE_PROFILE_SECURITY"
require_text "docs/mds-white-label-mode.md" "v4.17.0"
require_text "docs/mds-white-label-mode.md" "v4.12.1-mds"

echo "[MDS white-label] Contrato mínimo validado."
