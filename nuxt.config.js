import tailwindcss from '@tailwindcss/vite'

const baseURL = process.env.NUXT_APP_BASE_URL || '/'

function redirectTo(path) {
  return { redirect: { to: `${baseURL.replace(/\/$/, '')}${path}`, statusCode: 302 } }
}

export default defineNuxtConfig({
  compatibilityDate: '2026-11-10',
  devtools: { enabled: false },
  css: ['~/assets/css/main.css'],
  vite: { plugins: [tailwindcss()] },
  routeRules: {
    '/virtual': { prerender: true },
    '/eip/bySkill/v2': { prerender: true },
    '/eip/bySkill/v3': { prerender: true },
    '/eip/version/v1': { prerender: true },
    '/eip/version/v2': { prerender: true },
    '/eip/version/v3': { prerender: true },
    '/': redirectTo('/irmas'),
    '/my-irmas/computers': redirectTo('/irmas/computers'),
    '/reports/service-ports': redirectTo('/irmas/reports/service-ports'),
    '/optimized': redirectTo('/irmas/bySkill'),
    '/optimized/my-irmas/computers': redirectTo('/irmas/bySkill/computers'),
    '/optimized/reports/service-ports': redirectTo('/irmas/bySkill/reports/service-ports'),
    '/eip/optimized': redirectTo('/eip/bySkill'),
  },
  app: {
    baseURL,
    head: {
      htmlAttrs: { lang: 'zh-Hant' },
      title: 'IRMAS 資訊資源管理系統',
      meta: [{ name: 'robots', content: 'noindex, nofollow' }],
    },
  },
})
