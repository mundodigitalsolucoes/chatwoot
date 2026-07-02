import {
  getMdsWhiteLabelFeatures,
  mdsWhiteLabelFeatures,
  isMdsWhiteLabelFeatureEnabled,
  MDS_WHITE_LABEL_FEATURES,
} from '../mdsWhiteLabelFeatures';

describe('mdsWhiteLabelFeatures helper', () => {
  const originalChatwootConfig = window.chatwootConfig;

  afterEach(() => {
    window.chatwootConfig = originalChatwootConfig;
  });

  it('returns no enabled features when MDS white label mode is disabled', () => {
    window.chatwootConfig = { mdsWhiteLabelMode: 'false' };

    expect(getMdsWhiteLabelFeatures()).toEqual({});
  });

  it('returns the Sprint 2 feature architecture when MDS white label mode is enabled', () => {
    window.chatwootConfig = { mdsWhiteLabelMode: 'true' };

    expect(getMdsWhiteLabelFeatures()).toEqual({
      [MDS_WHITE_LABEL_FEATURES.FEATURES_ARCHITECTURE]: true,
      [MDS_WHITE_LABEL_FEATURES.HIDE_CAPTAIN_MENU]: true,
    });
  });

  it('keeps mdsWhiteLabelFeatures as the visual decision helper', () => {
    window.chatwootConfig = { mdsWhiteLabelMode: 'true' };

    expect(mdsWhiteLabelFeatures()).toEqual(getMdsWhiteLabelFeatures());
  });

  it('checks whether a known feature is enabled', () => {
    window.chatwootConfig = { mdsWhiteLabelMode: 'true' };

    expect(
      isMdsWhiteLabelFeatureEnabled(
        MDS_WHITE_LABEL_FEATURES.FEATURES_ARCHITECTURE
      )
    ).toBe(true);
  });

  it('checks whether the Captain menu should be hidden', () => {
    window.chatwootConfig = { mdsWhiteLabelMode: 'true' };

    expect(
      isMdsWhiteLabelFeatureEnabled(MDS_WHITE_LABEL_FEATURES.HIDE_CAPTAIN_MENU)
    ).toBe(true);
  });

  it('returns false for unknown features', () => {
    window.chatwootConfig = { mdsWhiteLabelMode: 'true' };

    expect(isMdsWhiteLabelFeatureEnabled('unknownFeature')).toBe(false);
  });
});
