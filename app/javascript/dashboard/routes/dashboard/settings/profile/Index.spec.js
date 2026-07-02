import { shallowMount } from '@vue/test-utils';
import { ref } from 'vue';
import ProfileSettings from './Index.vue';

vi.mock('dashboard/composables', () => ({
  useAlert: vi.fn(),
}));

vi.mock('dashboard/composables/useUISettings', () => ({
  useUISettings: () => ({
    isEditorHotKeyEnabled: vi.fn(() => false),
    updateUISettings: vi.fn(),
  }),
}));

vi.mock('dashboard/composables/useFontSize', () => ({
  useFontSize: () => ({
    currentFontSize: ref('default'),
    updateFontSize: vi.fn(),
  }),
}));

vi.mock('shared/composables/useBranding', () => ({
  useBranding: () => ({
    replaceInstallationName: text => text,
  }),
}));

vi.mock('dashboard/store/utils/api.js', () => ({
  clearCookiesOnLogout: vi.fn(),
  parseAPIErrorResponse: vi.fn(),
}));

const currentUser = {
  id: 1,
  name: 'Agent One',
  display_name: 'Agent',
  email: 'agent@example.com',
  avatar_url: '',
  message_signature: 'Thanks',
  access_token: 'token-123',
};

const SectionLayoutStub = {
  props: ['title', 'description'],
  template:
    '<section><h2>{{ title }}</h2><p>{{ description }}</p><slot /></section>',
};

const mountProfileSettings = mdsWhiteLabelMode => {
  window.chatwootConfig = { mdsWhiteLabelMode, isMfaEnabled: false };

  return shallowMount(ProfileSettings, {
    global: {
      mocks: {
        $t: key => key,
        $store: {
          getters: {
            getCurrentUser: currentUser,
            getCurrentUserID: currentUser.id,
            'globalConfig/get': { disableUserProfileUpdate: false },
          },
          dispatch: vi.fn(),
        },
      },
      stubs: {
        BaseSettingsHeader: {
          template: '<header>PROFILE_SETTINGS.TITLE</header>',
        },
        SectionLayout: SectionLayoutStub,
        UserProfilePicture: { template: '<div>profile-picture</div>' },
        UserBasicDetails: { template: '<div>basic-details</div>' },
        FontSize: { template: '<div>font-size</div>' },
        UserLanguageSelect: { template: '<div>language-select</div>' },
        MessageSignature: { template: '<div>message-signature</div>' },
        RadioCard: { template: '<div>send-preference</div>' },
        ChangePassword: { template: '<div>change-password</div>' },
        MfaSettingsCard: { template: '<div>mfa-settings</div>' },
        ActiveSessions: { template: '<div>active-sessions</div>' },
        Policy: { template: '<div><slot /></div>' },
        AudioNotifications: { template: '<div>audio-notifications</div>' },
        NotificationPreferences: {
          template: '<div>notification-preferences</div>',
        },
        AccessToken: { template: '<div>access-token</div>' },
      },
    },
  });
};

describe('ProfileSettings', () => {
  const originalChatwootConfig = window.chatwootConfig;

  afterEach(() => {
    window.chatwootConfig = originalChatwootConfig;
  });

  it('shows password and access token blocks when white label mode is disabled', () => {
    const wrapper = mountProfileSettings('false');

    expect(wrapper.text()).toContain(
      'PROFILE_SETTINGS.FORM.PASSWORD_SECTION.TITLE'
    );
    expect(wrapper.text()).toContain('change-password');
    expect(wrapper.text()).toContain(
      'PROFILE_SETTINGS.FORM.ACCESS_TOKEN.TITLE'
    );
    expect(wrapper.text()).toContain('access-token');
  });

  it('hides password and access token blocks when white label mode is enabled', () => {
    const wrapper = mountProfileSettings('true');

    expect(wrapper.text()).not.toContain(
      'PROFILE_SETTINGS.FORM.PASSWORD_SECTION.TITLE'
    );
    expect(wrapper.text()).not.toContain('change-password');
    expect(wrapper.text()).not.toContain(
      'PROFILE_SETTINGS.FORM.ACCESS_TOKEN.TITLE'
    );
    expect(wrapper.text()).not.toContain('access-token');
  });

  it('keeps the remaining operator preferences visible when white label mode is enabled', () => {
    const wrapper = mountProfileSettings('true');

    expect(wrapper.text()).toContain('profile-picture');
    expect(wrapper.text()).toContain('basic-details');
    expect(wrapper.text()).toContain(
      'PROFILE_SETTINGS.FORM.INTERFACE_SECTION.TITLE'
    );
    expect(wrapper.text()).toContain('font-size');
    expect(wrapper.text()).toContain('language-select');
    expect(wrapper.text()).toContain(
      'PROFILE_SETTINGS.FORM.MESSAGE_SIGNATURE_SECTION.TITLE'
    );
    expect(wrapper.text()).toContain('message-signature');
    expect(wrapper.text()).toContain(
      'PROFILE_SETTINGS.FORM.SEND_MESSAGE.TITLE'
    );
    expect(wrapper.text()).toContain('send-preference');
    expect(wrapper.text()).toContain(
      'PROFILE_SETTINGS.FORM.SESSIONS_SECTION.TITLE'
    );
    expect(wrapper.text()).toContain('active-sessions');
    expect(wrapper.text()).toContain(
      'PROFILE_SETTINGS.FORM.AUDIO_NOTIFICATIONS_SECTION.TITLE'
    );
    expect(wrapper.text()).toContain('audio-notifications');
    expect(wrapper.text()).toContain(
      'PROFILE_SETTINGS.FORM.NOTIFICATIONS.TITLE'
    );
    expect(wrapper.text()).toContain('notification-preferences');
  });
});
