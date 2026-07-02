import { isMdsWhiteLabelModeEnabled } from './mdsWhiteLabel';

export const MDS_WHITE_LABEL_FEATURES = Object.freeze({
  FEATURES_ARCHITECTURE: 'featuresArchitecture',
});

const MDS_WHITE_LABEL_FEATURE_CONFIG = Object.freeze({
  [MDS_WHITE_LABEL_FEATURES.FEATURES_ARCHITECTURE]: true,
});

export const getMdsWhiteLabelFeatures = () => {
  if (!isMdsWhiteLabelModeEnabled()) {
    return {};
  }

  return MDS_WHITE_LABEL_FEATURE_CONFIG;
};

export const isMdsWhiteLabelFeatureEnabled = featureName =>
  Boolean(getMdsWhiteLabelFeatures()[featureName]);
