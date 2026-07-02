import { isMdsWhiteLabelModeEnabled } from './mdsWhiteLabel';

export const MDS_WHITE_LABEL_FEATURES = Object.freeze({
  FEATURES_ARCHITECTURE: 'featuresArchitecture',
  HIDE_CAPTAIN_MENU: 'hideCaptainMenu',
  HIDE_HELP_CENTER_MENU: 'hideHelpCenterMenu',
  HIDE_CAMPAIGNS_MENU: 'hideCampaignsMenu',
});

const MDS_WHITE_LABEL_FEATURE_CONFIG = Object.freeze({
  [MDS_WHITE_LABEL_FEATURES.FEATURES_ARCHITECTURE]: true,
  [MDS_WHITE_LABEL_FEATURES.HIDE_CAPTAIN_MENU]: true,
  [MDS_WHITE_LABEL_FEATURES.HIDE_HELP_CENTER_MENU]: true,
  [MDS_WHITE_LABEL_FEATURES.HIDE_CAMPAIGNS_MENU]: true,
});

export const getMdsWhiteLabelFeatures = () => {
  if (!isMdsWhiteLabelModeEnabled()) {
    return {};
  }

  return MDS_WHITE_LABEL_FEATURE_CONFIG;
};

export const mdsWhiteLabelFeatures = getMdsWhiteLabelFeatures;

export const isMdsWhiteLabelFeatureEnabled = featureName =>
  Boolean(mdsWhiteLabelFeatures()[featureName]);
