export const CONSTANTS = {
  app: 'Konnect',
  headerItems: [
    {
      id: 1,
      icon: new URL('@/assets/icons/organization.svg',import.meta.url).href,
      label: 'Organization',
      link: '/organization',
    },
    {
      id: 2,
      icon: new URL('@/assets/icons/gear.svg',import.meta.url).href,
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
}
