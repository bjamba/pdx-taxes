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

    /* Welcome / survey */
    'welcome.eyebrow': 'A friendlier way to start',
    'welcome.title': 'Hey — let\'s figure this out together.',
    'welcome.body': 'Answer three quick questions and we\'ll show you which local taxes likely apply to you. Your answers never leave this browser, and you can change them anytime.',
    'welcome.cta_start': 'Let\'s do it',
    'welcome.cta_skip': 'Just show me everything',

    'survey.q1_label': 'Where do you live?',
    'survey.q1_portland': 'Portland (the city)',
    'survey.q1_multnomah': 'Elsewhere in Multnomah County',
    'survey.q1_metro': 'Elsewhere in the Metro region',
    'survey.q1_metro_hint': 'Washington or Clackamas County',
    'survey.q1_outside': 'Somewhere else entirely',
    'survey.q1_unsure': 'I\'m not sure',

    'survey.q2_label': 'Are you filing single or jointly?',
    'survey.q2_single': 'Single (or filing separately)',
    'survey.q2_joint': 'Jointly with a spouse',
    'survey.q2_unsure': 'I\'m not sure yet',

    'survey.q3_label': 'Roughly, what\'s your taxable income?',
    'survey.q3_low': 'Under $125k (or $200k if filing jointly)',
    'survey.q3_mid': '$125k–$250k (or $200k–$400k jointly)',
    'survey.q3_high': 'Over $250k (or over $400k jointly)',
    'survey.q3_unsure': 'I\'d rather not say',

    'survey.privacy_note': 'Your answers stay only in this browser. We never see them.',
    'survey.submit': 'Show me my list',
    'survey.back': 'Never mind, show me everything',

    /* Result framing */
    'result.eyebrow': 'Tailored for you',
    'result.title_some': 'Looks like {n} of {total} likely apply to you.',
    'result.title_all': 'Looks like all {n} likely apply to you.',
    'result.title_none': 'Nothing local for you this year.',
    'result.body_none': 'Based on your answers, none of the three local taxes apply. (Federal and Oregon state taxes still do!)',
    'result.show_all': 'Show me all {total} anyway',
    'result.edit': 'Edit my answers',

    /* Skipped state */
    'skipped.eyebrow': 'Showing all taxes',
    'skipped.cta': 'Want a personalized list?',

    /* View toggle */
    'view.label': 'Showing',
    'view.for_me': 'For me',
    'view.all': 'All taxes',

    /* Tax card / detail */
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

    /* Status */
    'status.not_started': 'Not yet',
    'status.in_progress': 'Doing',
    'status.done': 'Done',
    'status.not_applicable': 'Doesn\'t apply to me',
    'status.label': 'Your status',
    'status.cycle_help': 'Tap to update your status. Saved only in this browser.',
    'status.undo_na': 'change',

    /* Progress + celebration */
    'checklist.progress': 'Your progress',
    'checklist.title': 'Your checklist',
    'checklist.complete': 'You\'re all set.',
    'checklist.clear': 'Clear my saved progress',
    'checklist.cleared': 'Cleared',

    'celebration.title': 'You\'re all set for tax year 2025.',
    'celebration.body': 'Every local tax is handled. Nice work — that\'s genuinely a hard part of life in Portland.',

    /* Misc */
    'lang.switcher_label': 'Language',
    'disclaimer.short': 'This is not legal, tax, or financial advice. Always check the official rules before filing.',
    'footer.disclaimer': 'This site is an unofficial community resource. It is not affiliated with the City of Portland, Multnomah County, or Metro. The information here is provided for general guidance only and is not legal, tax, or financial advice.',
    'footer.source': 'Source code',
    'footer.last_updated': 'Last updated April 2026',
    'jurisdiction.city-of-portland': 'City of Portland',
    'jurisdiction.multnomah-county': 'Multnomah County',
    'jurisdiction.metro': 'Metro',

    /* Estimator (shared calc panel) */
    'calc.eyebrow': 'Estimator',
    'calc.title': 'Want to know what you\'ll owe?',
    'calc.lead': 'Enter your income once. We\'ll show what each tax estimates and add it up.',
    'calc.filing_label': 'Filing as',
    'calc.income_label': 'Your taxable income',
    'calc.privacy': 'Stays in this browser. We never see this.',
    'card_est.empty': 'Enter your income above to see an estimate',
    'card_est.below': 'Below the threshold — you don\'t owe this',
    'card_est.label': 'Your estimate',
    'card_est.na': 'You marked this as not applicable',

    /* Aggregate */
    'aggregate.title': 'Estimated total',
    'aggregate.subtitle': 'across the taxes that apply',
    'aggregate.contributing': 'Contributing',
    'aggregate.empty': 'Add your income above to see your total.',

    /* Calendar */
    'calendar.add': 'Add deadline to calendar',
    'calendar.add_all': 'Add every deadline to my calendar',
    'calendar.added': 'Downloaded',
    'calendar.reminder_note': 'Includes 14-day and 1-day reminders.',

    /* Deadlines page */
    'deadlines.title': 'Deadlines for tax year 2025',
    'deadlines.lead': 'Forms you should expect to receive, and the deadlines that follow. Add any of them to your calendar with a single click.',
    'deadlines.section_forms': 'Forms you may receive',
    'deadlines.section_filing': 'Filing deadlines',
    'deadlines.nav_label': 'Deadlines',
  },
  es: {
    'site.name': 'pdx taxes',

    'hero.eyebrow': 'Año fiscal 2025 · presentar antes del 15 de abril',
    'hero.title_a': 'No olvides',
    'hero.title_em': 'ningún impuesto',
    'hero.title_b': 'local este año.',
    'hero.lead': 'Hay hasta tres impuestos locales que los residentes de Portland presentan por separado del impuesto federal y del estado de Oregon. Los hemos puesto todos en un solo lugar — con fechas límite, enlaces directos para presentar y una lista que vive en su navegador.',

    'welcome.eyebrow': 'Una forma más amable de empezar',
    'welcome.title': 'Hola — resolvamos esto juntos.',
    'welcome.body': 'Responda tres preguntas rápidas y le mostraremos qué impuestos locales le aplican. Sus respuestas nunca salen de este navegador, y puede cambiarlas cuando quiera.',
    'welcome.cta_start': 'Vamos a empezar',
    'welcome.cta_skip': 'Solo muéstrame todo',

    'survey.q1_label': '¿Dónde vive?',
    'survey.q1_portland': 'Portland (la ciudad)',
    'survey.q1_multnomah': 'En otra parte del Condado de Multnomah',
    'survey.q1_metro': 'En otra parte de la región Metro',
    'survey.q1_metro_hint': 'Condado de Washington o Clackamas',
    'survey.q1_outside': 'Otro lugar fuera de Metro',
    'survey.q1_unsure': 'No estoy seguro',

    'survey.q2_label': '¿Presenta como individual o conjunta?',
    'survey.q2_single': 'Individual (o por separado)',
    'survey.q2_joint': 'Conjunta con cónyuge',
    'survey.q2_unsure': 'Aún no estoy seguro',

    'survey.q3_label': 'Aproximadamente, ¿cuál es su ingreso imponible?',
    'survey.q3_low': 'Menos de $125k (o $200k si es conjunta)',
    'survey.q3_mid': 'Entre $125k–$250k (o $200k–$400k conjunta)',
    'survey.q3_high': 'Más de $250k (o más de $400k conjunta)',
    'survey.q3_unsure': 'Prefiero no decir',

    'survey.privacy_note': 'Sus respuestas se guardan solo en este navegador. Nunca las vemos.',
    'survey.submit': 'Mostrarme mi lista',
    'survey.back': 'Mejor muéstrame todos',

    'result.eyebrow': 'Personalizado para usted',
    'result.title_some': 'Parece que {n} de {total} le aplican.',
    'result.title_all': 'Parece que los {n} le aplican.',
    'result.title_none': 'No hay impuestos locales para usted este año.',
    'result.body_none': 'Según sus respuestas, ninguno de los tres impuestos locales le aplica. (¡Los impuestos federal y estatal de Oregon sí!)',
    'result.show_all': 'Mostrar los {total} de todos modos',
    'result.edit': 'Editar mis respuestas',

    'skipped.eyebrow': 'Mostrando todos los impuestos',
    'skipped.cta': '¿Quiere una lista personalizada?',

    'view.label': 'Mostrando',
    'view.for_me': 'Para mí',
    'view.all': 'Todos',

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

    'celebration.title': 'Todo listo para el año fiscal 2025.',
    'celebration.body': 'Cada impuesto local manejado. Buen trabajo — esta es una parte genuinamente difícil de vivir en Portland.',

    'lang.switcher_label': 'Idioma',
    'disclaimer.short': 'Esto no es asesoramiento legal, fiscal ni financiero. Siempre revise las reglas oficiales antes de presentar.',
    'footer.disclaimer': 'Este sitio es un recurso comunitario no oficial. No está afiliado con la Ciudad de Portland, el Condado de Multnomah ni Metro. La información aquí se proporciona solo como guía general y no es asesoramiento legal, fiscal ni financiero.',
    'footer.source': 'Código fuente',
    'footer.last_updated': 'Última actualización: abril de 2026',
    'jurisdiction.city-of-portland': 'Ciudad de Portland',
    'jurisdiction.multnomah-county': 'Condado de Multnomah',
    'jurisdiction.metro': 'Metro',

    'calc.eyebrow': 'Calculadora',
    'calc.title': '¿Quiere saber cuánto deberá?',
    'calc.lead': 'Ingrese sus datos una vez. Le mostraremos lo que cada impuesto estima y lo sumaremos.',
    'calc.filing_label': 'Presentando como',
    'calc.income_label': 'Su ingreso imponible',
    'calc.privacy': 'Se queda en este navegador. Nunca lo vemos.',
    'card_est.empty': 'Ingrese su ingreso arriba para ver un estimado',
    'card_est.below': 'Por debajo del umbral — no debe esto',
    'card_est.label': 'Su estimado',
    'card_est.na': 'Lo marcó como no aplicable',

    'aggregate.title': 'Total estimado',
    'aggregate.subtitle': 'entre los impuestos que le aplican',
    'aggregate.contributing': 'Contribuyen',
    'aggregate.empty': 'Añada su ingreso arriba para ver su total.',

    'calendar.add': 'Añadir fecha límite al calendario',
    'calendar.add_all': 'Añadir todas las fechas a mi calendario',
    'calendar.added': 'Descargado',
    'calendar.reminder_note': 'Incluye recordatorios de 14 días y 1 día antes.',

    'deadlines.title': 'Fechas límite para el año fiscal 2025',
    'deadlines.lead': 'Formularios que debe esperar recibir, y las fechas límite que siguen. Añada cualquiera a su calendario con un solo clic.',
    'deadlines.section_forms': 'Formularios que puede recibir',
    'deadlines.section_filing': 'Fechas de presentación',
    'deadlines.nav_label': 'Fechas límite',
  },
} as const;

export type UIKey = keyof typeof ui.en;

export function t(lang: Lang, key: UIKey): string {
  return ui[lang][key] ?? ui.en[key];
}

export function url(path: string = ''): string {
  const base = import.meta.env.BASE_URL.replace(/\/+$/, '');
  const result = `${base}${path}`;
  return result || '/';
}

export function localeHome(lang: Lang): string {
  return url(lang === 'en' ? '' : `/${lang}`);
}

export function taxUrl(lang: Lang, slug: string): string {
  return url(lang === 'en' ? `/${slug}` : `/${lang}/${slug}`);
}
