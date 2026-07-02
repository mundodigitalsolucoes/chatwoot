import { mount } from '@vue/test-utils';
import { ref } from 'vue';
import SidebarProfileMenu from '../SidebarProfileMenu.vue';

const getterValues = {
  getCurrentUser: {
    available_name: 'Agent One',
    email: 'agent@example.com',
    avatar_url: '',
    type: 'Agent',
  },
  getCurrentUserAvailability: 'online',
  getCurrentAccountId: 1,
  'globalConfig/get': { chatwootInboxToken: '' },
  'accounts/isFeatureEnabledonAccount': () => false,
};

vi.mock('dashboard/composables/store', () => ({
  useMapGetter: key => ref(getterValues[key]),
  useStore: () => ({ dispatch: vi.fn() }),
}));

vi.mock('vue-i18n', () => ({
  useI18n: () => ({ t: key => key }),
}));

vi.mock('dashboard/api/auth', () => ({
  default: { logout: vi.fn() },
}));

vi.mock('dashboard/composables/useImpersonation', () => ({
  useImpersonation: () => ({ isImpersonating: ref(false) }),
}));

vi.mock('dashboard/composables', () => ({
  useAlert: vi.fn(),
}));

const DropdownContainerStub = {
  template:
    '<div><slot name="trigger" :toggle="() => {}" :is-open="true" /><slot /></div>',
};

const DropdownBodyStub = {
  template: '<div><slot /></div>',
};

const DropdownSeparatorStub = {
  template: '<hr />',
};

const DropdownItemStub = {
  props: ['label'],
  template: '<div class="dropdown-item"><slot>{{ label }}</slot></div>',
};

const mountProfileMenu = mdsWhiteLabelMode => {
  window.chatwootConfig = { mdsWhiteLabelMode };

  return mount(SidebarProfileMenu, {
    global: {
      mocks: { $t: key => key },
      stubs: {
        Avatar: true,
        SidebarProfileMenuStatus: {
          template:
            '<div><span>SIDEBAR.SET_YOUR_AVAILABILITY</span><span>SIDEBAR.SET_AUTO_OFFLINE.TEXT</span></div>',
        },
        CustomBrandPolicyWrapper: { template: '<div><slot /></div>' },
        DropdownContainer: DropdownContainerStub,
        DropdownBody: DropdownBodyStub,
        DropdownSeparator: DropdownSeparatorStub,
        DropdownItem: DropdownItemStub,
      },
    },
  });
};

describe('SidebarProfileMenu', () => {
  const originalChatwootConfig = window.chatwootConfig;

  afterEach(() => {
    window.chatwootConfig = originalChatwootConfig;
  });

  it('keeps the user menu unchanged when the white label feature is disabled', () => {
    const wrapper = mountProfileMenu('false');

    expect(wrapper.text()).toContain('SIDEBAR_ITEMS.PROFILE_SETTINGS');
    expect(wrapper.text()).toContain('SIDEBAR_ITEMS.DOCS');
    expect(wrapper.text()).toContain('SIDEBAR_ITEMS.CHANGELOG');
    expect(wrapper.text()).toContain('SIDEBAR_ITEMS.LOGOUT');
  });

  it('hides only Chatwoot and authentication menu items when the white label feature is enabled', () => {
    const wrapper = mountProfileMenu('true');

    expect(wrapper.text()).not.toContain('SIDEBAR_ITEMS.PROFILE_SETTINGS');
    expect(wrapper.text()).not.toContain('SIDEBAR_ITEMS.DOCS');
    expect(wrapper.text()).not.toContain('SIDEBAR_ITEMS.CHANGELOG');
    expect(wrapper.text()).not.toContain('SIDEBAR_ITEMS.LOGOUT');
  });

  it('keeps availability, auto offline, keyboard shortcuts, and appearance available when white label is enabled', () => {
    const wrapper = mountProfileMenu('true');

    expect(wrapper.text()).toContain('SIDEBAR.SET_YOUR_AVAILABILITY');
    expect(wrapper.text()).toContain('SIDEBAR.SET_AUTO_OFFLINE.TEXT');
    expect(wrapper.text()).toContain('SIDEBAR_ITEMS.KEYBOARD_SHORTCUTS');
    expect(wrapper.text()).toContain('SIDEBAR_ITEMS.APPEARANCE');
  });
});
