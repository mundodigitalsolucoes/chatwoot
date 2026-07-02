const TRUE_VALUES = ['true', '1', 'yes', 'on'];

export const isMdsWhiteLabelModeEnabled = () =>
  TRUE_VALUES.includes(
    String(window.chatwootConfig?.mdsWhiteLabelMode || '')
      .trim()
      .toLowerCase()
  );
