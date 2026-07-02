import { mdsWhiteLabelFeatures } from '../mdsWhiteLabelFeatures';

const allFeaturesEnabled = {
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
};

describe('mdsWhiteLabelFeatures helper', () => {
  const originalChatwootConfig = window.chatwootConfig;

  afterEach(() => {
    window.chatwootConfig = originalChatwootConfig;
  });

  it('keeps every feature enabled in normal mode', () => {
    window.chatwootConfig = { mdsWhiteLabelMode: 'false' };

    expect(mdsWhiteLabelFeatures()).toEqual(allFeaturesEnabled);
  });

  it('keeps every feature enabled in white label mode', () => {
    window.chatwootConfig = { mdsWhiteLabelMode: 'true' };

    expect(mdsWhiteLabelFeatures()).toEqual(allFeaturesEnabled);
  });
});
