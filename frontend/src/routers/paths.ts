// ----------------------------------------------------------------------

function path(root: string, sublink: string): string {
  return `${root}${sublink}`;
}

const ROOTS_DASHBOARD: string = '/dashboard';
const ROOTS_HOME: string = '/';

// ----------------------------------------------------------------------

export const PATH_HOME = {
  root: ROOTS_HOME,
  login: path(ROOTS_HOME, 'login'),  
  signup: path(ROOTS_HOME, 'signup'),
};

export const PATH_PAGE = {
  comingSoon: '/coming-soon',
  maintenance: '/maintenance',
  pricing: '/pricing',
  payment: '/payment',
  about: '/about-us',
  contact: '/contact-us',
  faqs: '/faqs',
  page404: '/404',
  page500: '/500',
  components: '/components',
};


