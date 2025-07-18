const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      // Home page that lists stories
      { path: '', component: () => import('pages/StoryList.vue') },

      // Reader page for individual story and page number
      { path: 'story/:storyId/page/:pageNumber', component: () => import('pages/StoryReader.vue') },
    ],
  },

  // Error fallback (keep this as-is)
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
