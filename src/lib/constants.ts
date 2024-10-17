//Putting appName & headerItems here assuming these won't change often.

export const CONSTANTS = {
  app: 'Konnect',
  headerItems: [
    {
      id: 1,
      icon: new URL('@/assets/icons/organization.svg', import.meta.url).href,
      label: 'Organization',
      link: '/organization',
    },
    {
      id: 2,
      icon: new URL('@/assets/icons/gear.svg', import.meta.url).href,
      label: 'Settings',
      link: '/settings',

    },
    {
      id: 3,
      icon: new URL('@/assets/icons/user.svg', import.meta.url).href,
      label: 'Priyam',
      link: '/user',

    },
  ],
  paginationRecordsPerPage: 9,
  debounceTimer: 500,
  refreshButtonTimer: 10000,
  logoHeight: 26, //px
  logoWidth: 29, //px
}
