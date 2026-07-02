import { isMdsWhiteLabelModeEnabled } from '../mdsWhiteLabel';

describe('mdsWhiteLabel helper', () => {
  const originalChatwootConfig = window.chatwootConfig;

  afterEach(() => {
    window.chatwootConfig = originalChatwootConfig;
  });

  it('returns false when MDS white label mode is disabled', () => {
    window.chatwootConfig = { mdsWhiteLabelMode: 'false' };

    expect(isMdsWhiteLabelModeEnabled()).toBe(false);
  });

  it('returns true when MDS white label mode is enabled', () => {
    window.chatwootConfig = { mdsWhiteLabelMode: 'true' };

    expect(isMdsWhiteLabelModeEnabled()).toBe(true);
  });

  it('returns false when chatwootConfig is missing', () => {
    window.chatwootConfig = undefined;

    expect(isMdsWhiteLabelModeEnabled()).toBe(false);
  });
});
