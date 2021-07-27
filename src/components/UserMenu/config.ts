export const USER_NAV = [
  {
    name: 'Profile',
    defaultImg: require('assets/tab-setting-active.png'),
    hoverImg: require('assets/tab-setting-inactive.png'),
    route: '/profile/bet',
  },
  {
    name: 'Settings',
    defaultImg: require('assets/tab-setting-active.png'),
    hoverImg: require('assets/tab-setting-inactive.png'),
    route: '/profile/transactions',
  },
  {
    name: 'Logout',
    clickMethod: '/profile/transactions',
  },
];
