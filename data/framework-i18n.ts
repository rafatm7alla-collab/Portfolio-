import type { Locale } from '@/lib/i18n'
import { capabilities, engagements, stages, type Stage, type StageId } from '@/data/framework'

/**
 * /framework in Arabic. data/framework.ts stays the English source; this file
 * holds the Arabic copy and merges it in by id.
 *
 * Form options (project type, budget, timeline) and the engagement model name
 * are translated for display only — the value sent in the booking email stays
 * English, so the requests Rafat receives always read the same.
 *
 * DRAFT — Arabic copy written for review, not yet approved.
 */

type StageText = Pick<Stage, 'title' | 'tagline' | 'description' | 'services' | 'outcome'>

const stagesAr: Record<StageId, StageText> = {
  discover: {
    title: 'اكتشاف',
    tagline: 'الفهم قبل الإبداع.',
    description: 'فهم العمل والسوق والجمهور والتحديات للوصول إلى فرص حقيقية.',
    services: ['ورش عمل لفهم طبيعة العمل', 'أبحاث السوق', 'تحليل المنافسين', 'تحديد الجمهور', 'تقييم العلامة التجارية'],
    outcome: 'فهم واضح لموقع العلامة اليوم وإلى أين تحتاج أن تصل.',
  },
  define: {
    title: 'تحديد',
    tagline: 'الاستراتيجية قبل الشكل.',
    description: 'بناء أساس استراتيجي واضح يمنح العلامة اتجاهاً وأهمية وتميّزاً.',
    services: ['تموضع العلامة', 'هدف العلامة وقيمها', 'شخصية العلامة', 'التسمية والرسائل', 'هيكلة العلامة', 'التوجّه الاستراتيجي'],
    outcome: 'استراتيجية مركّزة توجّه كل قرار قادم.',
  },
  design: {
    title: 'تصميم',
    tagline: 'من الاستراتيجية إلى التجربة.',
    description: 'ترجمة التفكير الاستراتيجي إلى لغة بصرية مميّزة ومتّسقة يسهل تذكّرها.',
    services: ['الهوية البصرية', 'أنظمة الشعار', 'الإدارة الفنية', 'أنظمة الخطوط والألوان', 'دليل الهوية', 'تصميم التغليف', 'تجارب العلامة الرقمية'],
    outcome: 'هوية متكاملة مبنية لتتواصل وتتميّز وتكبر.',
  },
  activate: {
    title: 'تفعيل',
    tagline: 'العلامة تنبض بالحياة.',
    description: 'ربط العلامة بجمهورها عبر تواصل إبداعي متكامل ونقاط تواصل مناسبة.',
    services: ['أفكار إطلاق العلامة', 'حملات إبداعية', 'الإعلان', 'التواصل الرقمي', 'الإدارة الإبداعية لمنصات التواصل', 'أفكار الإعلانات التلفزيونية', 'تصميم البيئات والتجارب'],
    outcome: 'حضور متّسق ومؤثّر للعلامة عبر القنوات المناسبة.',
  },
  evolve: {
    title: 'تطوير',
    tagline: 'ما بعد الإطلاق.',
    description: 'مرافقة العلامة وهي تنمو وتتكيّف وتتطوّر مع الوقت.',
    services: ['إدارة إبداعية مستمرة', 'استشارات العلامة التجارية', 'إدارة اتّساق العلامة', 'تطوير الحملات', 'مراجعات الأداء الإبداعي', 'شراكات إبداعية طويلة الأمد'],
    outcome: 'علامة تبقى حاضرة ومتّسقة وقادرة على التكيّف.',
  },
}

const capabilitiesAr: Record<string, string> = {
  '01': 'تحليل العلامة',
  '02': 'استراتيجية العلامة',
  '03': 'هوية العلامة',
  '04': 'الإدارة الإبداعية',
  '05': 'تواصل العلامة',
  '06': 'تطوير العلامة',
}

const engagementsAr: Record<string, { title: string; forWhom: string; scope: string }> = {
  A: {
    title: 'أساس العلامة',
    forWhom: 'للشركات التي تطلق علامة جديدة أو تعيد تموضع علامة قائمة.',
    scope: 'الاستراتيجية والتموضع والهوية البصرية.',
  },
  B: {
    title: 'تحوّل العلامة',
    forWhom: 'للشركات القائمة التي تحتاج إلى تحوّل استراتيجي وإبداعي شامل.',
    scope: 'الاستراتيجية والهوية والإدارة الإبداعية وإطلاق العلامة في السوق.',
  },
  C: {
    title: 'شراكة إبداعية مستمرة',
    forWhom: 'للشركات التي تبحث عن قيادة إبداعية ثابتة وتطوير للعلامة على المدى الطويل.',
    scope: 'الاستشارات الإبداعية والحملات وإدارة العلامة والإدارة الإبداعية المستمرة.',
  },
}

/** Display labels for the booking form options and model names (value → label). */
const optionsAr: Record<string, string> = {
  'New brand development': 'تطوير علامة جديدة',
  Rebranding: 'إعادة بناء العلامة',
  'Brand strategy': 'استراتيجية العلامة',
  'Visual identity': 'الهوية البصرية',
  'Creative campaign': 'حملة إبداعية',
  'Ongoing creative partnership': 'شراكة إبداعية مستمرة',
  Other: 'أخرى',
  'Under €3,000': 'أقل من 3,000 €',
  '€3,000–€5,000': '3,000 – 5,000 €',
  '€5,000–€10,000': '5,000 – 10,000 €',
  '€10,000–€25,000': '10,000 – 25,000 €',
  '€25,000+': 'أكثر من 25,000 €',
  'Open to discussion': 'قابلة للنقاش',
  'As soon as possible': 'في أقرب وقت ممكن',
  'Within one month': 'خلال شهر',
  'Within three months': 'خلال ثلاثة أشهر',
  Flexible: 'مرن',
  ...Object.fromEntries(engagements.map((m) => [m.title, engagementsAr[m.index]?.title ?? m.title])),
}

const ui = {
  en: {
    heroEyebrow: 'Brand Framework — 01',
    heroTitle: ['Beyond Design.', 'Building Brands', 'with Purpose.'],
    heroLede:
      'I combine strategic thinking, creative direction and integrated execution to build distinctive brands that create meaningful value for people, businesses and long-term growth.',
    heroBody:
      'From the first strategic conversation to the final brand experience, every creative decision is connected to a bigger purpose.',
    explore: 'Explore the Framework',
    stagesBold: 'The Framework.',
    stagesLight: 'Five stages, one journey.',
    expandAll: 'Expand all services',
    collapseAll: 'Collapse all services',
    services: 'Services',
    outcome: 'Client outcome',
    stagesLabel: 'Stages',
    visionBold: 'One Vision.',
    visionLight: 'One Creative Direction.',
    visionLede:
      'An integrated creative partnership connecting brand strategy, identity, communication and long-term development. One cohesive vision across every stage of your brand’s journey.',
    waysBold: 'Ways to',
    waysLight: 'work together.',
    model: 'Model',
    discuss: 'Discuss this model',
    workBold: 'Strategy',
    workLight: 'in Action.',
    finalLight: 'Let’s Build',
    finalBold: 'Something Meaningful.',
    finalLede:
      'Whether you’re launching a new brand, transforming an existing business or looking for a long-term creative partner, let’s start with a conversation.',
    book: 'Book a Discovery Call',
    // booking dialog
    callTitle: (m: number) => `Discovery call · ${m} min`,
    close: 'Close',
    steps: ['About you', 'Your project', 'Schedule'],
    stepOf: (n: number, name: string) => `Step ${n} of 3: ${name}`,
    stepLabel: 'Step',
    titleAbout: 'Let’s Get to Know Each Other.',
    titleProject: 'What Are We Building?',
    titleSchedule: 'Let’s Find a Time to Talk.',
    titleDone: 'The Conversation Starts Here.',
    fullName: 'Full name',
    email: 'Email address',
    company: 'Company or brand name',
    website: 'Company website',
    country: 'Country',
    optional: 'optional',
    errName: 'Please add your full name.',
    errEmail: 'Please add a valid email address.',
    errCompany: 'Please add your company or brand name.',
    errTypes: 'Choose at least one project type.',
    errBudget: 'Choose an estimated budget.',
    errTimeline: 'Choose a preferred timeline.',
    errSlot: 'Choose a date and time.',
    interested: 'Interested in:',
    projectType: 'Project type',
    selectAll: 'Select all that apply',
    budget: 'Estimated project budget',
    timeline: 'Preferred project timeline',
    notes: 'Additional information',
    notesPh: 'Tell me briefly about your business, your challenges and what you would like to achieve.',
    thanks: (name: string) => `Thank you, ${name}. Your request has been sent.`,
    confirmNote: (email: string) =>
      `I’ll confirm this time by email at ${email} and send you the Google Meet invitation.`,
    backToSite: 'Back to Website',
    sendFailed: (why: string) => `Your request could not be sent (${why}). Nothing you typed is lost: try again, or write to`,
    back: '← Back',
    next: 'Continue →',
    sending: 'Sending…',
    confirm: 'Confirm Discovery Call',
    duration: 'Duration',
    minutes: (m: number) => `${m} minutes`,
    platform: 'Platform',
    timeZone: 'Your time zone',
    requestNote: 'Your chosen time is sent as a request. I confirm by email with the Google Meet invitation.',
    prevMonth: 'Previous month',
    nextMonth: 'Next month',
    prevArrow: '←',
    nextArrow: '→',
    chooseDate: 'Choose a date',
    dows: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
    timesAvailable: (n: number) => `, ${n} times available`,
    unavailable: ', unavailable',
    availableTimes: 'Available times',
    dateLocale: undefined as string | undefined,
  },
  ar: {
    heroEyebrow: 'منهجية العلامة التجارية — 01',
    heroTitle: ['أبعد من التصميم.', 'أبني علامات تجارية', 'لها هدف.'],
    heroLede:
      'أجمع بين التفكير الاستراتيجي والإدارة الإبداعية والتنفيذ المتكامل لبناء علامات تجارية مميّزة، تصنع قيمة حقيقية للناس وللأعمال وللنمو على المدى الطويل.',
    heroBody: 'من أول حوار استراتيجي حتى آخر تجربة للعلامة، كل قرار إبداعي مرتبط بهدف أكبر.',
    explore: 'اكتشف المنهجية',
    stagesBold: 'المنهجية.',
    stagesLight: 'خمس مراحل، رحلة واحدة.',
    expandAll: 'عرض كل الخدمات',
    collapseAll: 'إخفاء كل الخدمات',
    services: 'الخدمات',
    outcome: 'النتيجة للعميل',
    stagesLabel: 'المراحل',
    visionBold: 'رؤية واحدة.',
    visionLight: 'إدارة إبداعية واحدة.',
    visionLede:
      'شراكة إبداعية متكاملة تربط استراتيجية العلامة وهويتها وتواصلها وتطويرها على المدى الطويل. رؤية واحدة متماسكة في كل مرحلة من رحلة علامتك.',
    waysBold: 'طرق',
    waysLight: 'العمل معاً.',
    model: 'النموذج',
    discuss: 'ناقش هذا النموذج',
    workBold: 'الاستراتيجية',
    workLight: 'على أرض الواقع.',
    finalLight: 'لنبنِ معاً',
    finalBold: 'شيئاً له معنى.',
    finalLede:
      'سواء كنت تطلق علامة جديدة، أو تعيد بناء عمل قائم، أو تبحث عن شريك إبداعي طويل الأمد، لنبدأ بمحادثة.',
    book: 'احجز مكالمة تعارف',
    callTitle: (m: number) => `مكالمة تعارف · ${m} دقيقة`,
    close: 'إغلاق',
    steps: ['عنك', 'مشروعك', 'الموعد'],
    stepOf: (n: number, name: string) => `الخطوة ${n} من 3: ${name}`,
    stepLabel: 'الخطوة',
    titleAbout: 'لنتعرّف على بعض.',
    titleProject: 'ماذا سنبني؟',
    titleSchedule: 'لنختر وقتاً للحديث.',
    titleDone: 'هنا تبدأ المحادثة.',
    fullName: 'الاسم الكامل',
    email: 'البريد الإلكتروني',
    company: 'اسم الشركة أو العلامة',
    website: 'موقع الشركة',
    country: 'الدولة',
    optional: 'اختياري',
    errName: 'يرجى كتابة اسمك الكامل.',
    errEmail: 'يرجى كتابة بريد إلكتروني صحيح.',
    errCompany: 'يرجى كتابة اسم الشركة أو العلامة.',
    errTypes: 'اختر نوع مشروع واحداً على الأقل.',
    errBudget: 'اختر الميزانية التقديرية.',
    errTimeline: 'اختر الإطار الزمني المفضّل.',
    errSlot: 'اختر التاريخ والوقت.',
    interested: 'مهتم بـ:',
    projectType: 'نوع المشروع',
    selectAll: 'اختر كل ما ينطبق',
    budget: 'الميزانية التقديرية للمشروع',
    timeline: 'الإطار الزمني المفضّل',
    notes: 'معلومات إضافية',
    notesPh: 'حدّثني باختصار عن عملك وتحدياتك وما تريد تحقيقه.',
    thanks: (name: string) => `شكراً لك، ${name}. تم إرسال طلبك.`,
    confirmNote: (email: string) =>
      `سأؤكد هذا الموعد عبر البريد الإلكتروني على ${email} وأرسل لك دعوة Google Meet.`,
    backToSite: 'العودة إلى الموقع',
    sendFailed: (why: string) => `تعذّر إرسال طلبك (${why}). لم يضِع شيء مما كتبته: حاول مرة أخرى، أو راسلني على`,
    back: '→ رجوع',
    next: 'متابعة ←',
    sending: 'جارٍ الإرسال…',
    confirm: 'تأكيد مكالمة التعارف',
    duration: 'المدة',
    minutes: (m: number) => `${m} دقيقة`,
    platform: 'المنصة',
    timeZone: 'منطقتك الزمنية',
    requestNote: 'يُرسَل الوقت الذي تختاره كطلب، وأؤكده عبر البريد الإلكتروني مع دعوة Google Meet.',
    prevMonth: 'الشهر السابق',
    nextMonth: 'الشهر التالي',
    prevArrow: '→',
    nextArrow: '←',
    chooseDate: 'اختر تاريخاً',
    // Monday first, like the English grid
    dows: ['ن', 'ث', 'ر', 'خ', 'ج', 'س', 'ح'],
    timesAvailable: (n: number) => `، ${n} أوقات متاحة`,
    unavailable: '، غير متاح',
    availableTimes: 'الأوقات المتاحة',
    // Arabic month/day names with Western digits, matching the rest of the site
    dateLocale: 'ar-u-nu-latn' as string | undefined,
  },
}

export type FrameworkText = (typeof ui)['en']

export function frameworkText(locale: Locale): FrameworkText {
  return ui[locale]
}

export function localStages(locale: Locale): Stage[] {
  if (locale === 'en') return stages
  return stages.map((s) => ({ ...s, ...stagesAr[s.id] }))
}

export function localCapabilities(locale: Locale) {
  if (locale === 'en') return capabilities
  return capabilities.map((c) => ({ ...c, title: capabilitiesAr[c.index] ?? c.title }))
}

/** `title` is localised for display; `value` keeps the English name for the booking email. */
export function localEngagements(locale: Locale) {
  return engagements.map((m) => ({
    ...m,
    value: m.title,
    ...(locale === 'ar' ? engagementsAr[m.index] : {}),
  }))
}

export function optionLabel(value: string, locale: Locale) {
  return locale === 'ar' ? optionsAr[value] ?? value : value
}
