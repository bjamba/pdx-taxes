export type Lang = 'en' | 'es';

export const languages: Record<Lang, string> = {
  en: 'English',
  es: 'Español',
};

export const ui = {
  en: {
    'site.name': 'pdx taxes',
    'hero.eyebrow': 'Tax year 2025 · file by April 15',
    'hero.title_a': 'Don\'t miss',
    'hero.title_em': 'a Portland tax',
    'hero.title_b': 'this year.',
    'hero.lead': 'There are up to three local taxes Portlanders file separately from federal and Oregon state. We\'ve put them in one place — with deadlines, direct filing links, and a checklist that lives in your browser.',
    'tax.see_details': 'See details',
    'tax.who_owes': 'Who owes this',
    'tax.rate': 'Rate',
    'tax.deadline': 'Deadline',
    'tax.filing': 'How to file',
    'tax.friendly_note': 'Heads-up',
    'tax.free_filing': 'Free filing resources',
    'tax.sources': 'Sources',
    'tax.last_verified': 'Last verified',
    'tax.report_issue': 'Report an issue with this page',
    'tax.file_button': 'File this tax',
    'tax.back': 'All taxes',
    'status.not_started': 'Not yet',
    'status.in_progress': 'Doing',
    'status.done': 'Done',
    'status.not_applicable': 'Doesn\'t apply to me',
    'status.label': 'Your status',
    'status.cycle_help': 'Tap to update your status. Saved only in this browser.',
    'status.undo_na': 'change',
    'checklist.progress': 'Your progress',
    'checklist.title': 'Your checklist',
    'checklist.complete': 'You\'re all set.',
    'checklist.clear': 'Clear my saved progress',
    'checklist.cleared': 'Cleared',
    'lang.switcher_label': 'Language',
    'disclaimer.short': 'This is not legal, tax, or financial advice. Always check the official rules before filing.',
    'footer.disclaimer': 'This site is an unofficial community resource. It is not affiliated with the City of Portland, Multnomah County, or Metro. The information here is provided for general guidance only and is not legal, tax, or financial advice.',
    'footer.source': 'Source code',
    'footer.last_updated': 'Last updated April 2026',
    'jurisdiction.city-of-portland': 'City of Portland',
    'jurisdiction.multnomah-county': 'Multnomah County',
    'jurisdiction.metro': 'Metro',
  },
  es: {
    'site.name': 'pdx taxes',
    'hero.eyebrow': 'Año fiscal 2025 · presentar antes del 15 de abril',
    'hero.title_a': 'No olvides',
    'hero.title_em': 'ningún impuesto',
    'hero.title_b': 'local este año.',
    'hero.lead': 'Hay hasta tres impuestos locales que los residentes de Portland presentan por separado del impuesto federal y del estado de Oregon. Los hemos puesto todos en un solo lugar — con fechas límite, enlaces directos para presentar y una lista de tareas que vive en su navegador.',
    'tax.see_details': 'Ver detalles',
    'tax.who_owes': 'Quién lo debe',
    'tax.rate': 'Tarifa',
    'tax.deadline': 'Fecha límite',
    'tax.filing': 'Cómo presentar',
    'tax.friendly_note': 'Aviso',
    'tax.free_filing': 'Recursos de presentación gratuita',
    'tax.sources': 'Fuentes',
    'tax.last_verified': 'Última verificación',
    'tax.report_issue': 'Reportar un problema con esta página',
    'tax.file_button': 'Presentar este impuesto',
    'tax.back': 'Todos los impuestos',
    'status.not_started': 'Aún no',
    'status.in_progress': 'En proceso',
    'status.done': 'Hecho',
    'status.not_applicable': 'No me aplica',
    'status.label': 'Su estado',
    'status.cycle_help': 'Toque para actualizar su estado. Guardado solo en este navegador.',
    'status.undo_na': 'cambiar',
    'checklist.progress': 'Su progreso',
    'checklist.title': 'Su lista',
    'checklist.complete': 'Todo listo.',
    'checklist.clear': 'Borrar mi progreso guardado',
    'checklist.cleared': 'Borrado',
    'lang.switcher_label': 'Idioma',
    'disclaimer.short': 'Esto no es asesoramiento legal, fiscal ni financiero. Siempre revise las reglas oficiales antes de presentar.',
    'footer.disclaimer': 'Este sitio es un recurso comunitario no oficial. No está afiliado con la Ciudad de Portland, el Condado de Multnomah ni Metro. La información aquí se proporciona solo como guía general y no es asesoramiento legal, fiscal ni financiero.',
    'footer.source': 'Código fuente',
    'footer.last_updated': 'Última actualización: abril de 2026',
    'jurisdiction.city-of-portland': 'Ciudad de Portland',
    'jurisdiction.multnomah-county': 'Condado de Multnomah',
    'jurisdiction.metro': 'Metro',
  },
} as const;

export type UIKey = keyof typeof ui.en;

export function t(lang: Lang, key: UIKey): string {
  return ui[lang][key] ?? ui.en[key];
}

/**
 * Prefix a path with Astro's configured base (e.g. '/pdx-taxes' on GH Pages).
 * `path` should start with '/' or be empty (for the locale home).
 */
export function url(path: string = ''): string {
  const base = import.meta.env.BASE_URL.replace(/\/+$/, '');
  const result = `${base}${path}`;
  return result || '/';
}

/** URL for a locale's home page. */
export function localeHome(lang: Lang): string {
  return url(lang === 'en' ? '' : `/${lang}`);
}

/** URL for a tax detail page within a locale. */
export function taxUrl(lang: Lang, slug: string): string {
  return url(lang === 'en' ? `/${slug}` : `/${lang}/${slug}`);
}
