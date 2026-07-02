import { isMdsWhiteLabelModeEnabled } from './mdsWhiteLabel';

const ENABLED_FEATURES = Object.freeze({
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
});

const WHITE_LABEL_FEATURES = Object.freeze({
  ...ENABLED_FEATURES,
});

export const mdsWhiteLabelFeatures = () => {
  if (isMdsWhiteLabelModeEnabled()) {
    return WHITE_LABEL_FEATURES;
  }

  return ENABLED_FEATURES;
};
