export type Lang = 'en' | 'es';

export const languages: Record<Lang, string> = {
  en: 'English',
  es: 'Español',
};

export const ui = {
  en: {
    'site.name': 'pdx taxes',
    'site.tagline': 'Local Portland taxes, in one place.',
    'home.lead': 'For most Portland residents, there are between two and three local taxes to file each year — separate from your federal and Oregon state returns. This page lists every one we know about, with the deadline and a direct link to file.',
    'home.intro_title': 'Where to start',
    'home.intro_body': 'Tap any tax to see who owes it, when it’s due, and how to file. Mark each one as you go — your progress stays in this browser only.',
    'tax.who_owes': 'Who owes this',
    'tax.rate': 'How much',
    'tax.deadline': 'When',
    'tax.filing': 'How to file',
    'tax.friendly_note': 'A heads-up',
    'tax.free_filing': 'Free filing resources',
    'tax.sources': 'Sources',
    'tax.last_verified': 'Last verified',
    'tax.report_issue': 'Report an issue with this page',
    'tax.file_button': 'File this tax',
    'tax.back': 'All taxes',
    'status.not_started': 'Not yet started',
    'status.in_progress': 'In progress',
    'status.done': 'Done',
    'status.not_applicable': 'Not applicable',
    'status.label': 'Status',
    'status.cycle_help': 'Tap to update your status. Saved only in this browser.',
    'checklist.progress': 'Your progress',
    'checklist.complete': 'All set',
    'checklist.clear': 'Clear my saved progress',
    'checklist.cleared': 'Cleared.',
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
    'site.tagline': 'Los impuestos locales de Portland, en un solo lugar.',
    'home.lead': 'Para la mayoría de los residentes de Portland, hay entre dos y tres impuestos locales que presentar cada año — además de sus declaraciones federal y del estado de Oregon. Esta página enumera todos los que conocemos, con la fecha límite y un enlace directo para presentar.',
    'home.intro_title': 'Por dónde empezar',
    'home.intro_body': 'Toque cualquier impuesto para ver quién lo debe, cuándo vence y cómo presentarlo. Marque cada uno a medida que avanza — su progreso se guarda solo en este navegador.',
    'tax.who_owes': 'Quién lo debe',
    'tax.rate': 'Cuánto',
    'tax.deadline': 'Cuándo',
    'tax.filing': 'Cómo presentar',
    'tax.friendly_note': 'Un aviso',
    'tax.free_filing': 'Recursos de presentación gratuita',
    'tax.sources': 'Fuentes',
    'tax.last_verified': 'Última verificación',
    'tax.report_issue': 'Reportar un problema con esta página',
    'tax.file_button': 'Presentar este impuesto',
    'tax.back': 'Todos los impuestos',
    'status.not_started': 'Sin empezar',
    'status.in_progress': 'En progreso',
    'status.done': 'Hecho',
    'status.not_applicable': 'No aplica',
    'status.label': 'Estado',
    'status.cycle_help': 'Toque para actualizar su estado. Guardado solo en este navegador.',
    'checklist.progress': 'Su progreso',
    'checklist.complete': 'Todo listo',
    'checklist.clear': 'Borrar mi progreso guardado',
    'checklist.cleared': 'Borrado.',
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

export function langPrefix(lang: Lang): string {
  return lang === 'en' ? '' : `/${lang}`;
}
