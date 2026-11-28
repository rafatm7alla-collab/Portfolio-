import type { Locale } from '@/lib/i18n'
import { profile } from '@/data/profile'
import { services } from '@/data/services'
import { categories } from '@/data/work'

/**
 * Every piece of interface text that changes with the language.
 *
 * Project designs (images, banners, case-study content) stay in English on
 * purpose; only the site's own text is translated. Brand names, the email
 * address and Rafat's name stay Latin in both.
 *
 * DRAFT — Arabic copy written for review, not yet approved.
 */

const en = {
  nav: {
    projects: 'Projects',
    framework: 'Framework',
    about: 'About',
    contact: 'Contact',
    menu: 'Menu',
    close: 'Close',
    skip: 'Skip to content',
    switchTo: 'العربية',
    switchLabel: 'View the site in Arabic',
  },
  arrow: '→',
  hero: {
    role: 'Creative Director · Art Director',
    lede: 'I shape brands, campaigns, and visual systems — connecting ambitious ideas with thoughtful creative execution.',
    meta: 'BASED IN BELGRADE · WORKING INTERNATIONALLY · OPEN FOR COLLABORATIONS',
    years: (n: number) => `(${n}+ Years)`,
  },
  home: {
    selectedBold: 'Selected',
    selectedLight: 'projects',
    aboutStrong: 'Over twelve years',
    aboutRest: ' of shaping brand identities, integrated campaigns, and digital experiences.',
    readMore: 'Read more',
    allProjects: 'All projects',
    clients: 'Selected clients',
  },
  contactStatement: { light: "Let's make something", bold: 'worth remembering.' },
  title: 'Creative Director / Art Director',
  contact: {
    eyebrow: 'Contact',
    status: 'Open for collaborations',
    headline: 'Every strong brand starts with one conversation.',
    formLabel: 'Or write it here',
    formSub: 'A commission, a brand build, or an idea that has not started yet. A few lines are enough — I’ll reply within a day or two.',
    basedIn: 'Based in',
    cities: ['Belgrade, Serbia', 'Erbil, Iraq'],
    availableFor: 'Available for',
    services: ['Creative Direction', 'Art Direction', 'Brand Identity', 'Remote collaboration'],
    elsewhere: 'Elsewhere',
  },
  form: {
    name: 'Name',
    namePh: 'Your name',
    email: 'Email',
    subject: 'Subject',
    subjectPh: 'Choose a subject…',
    /** Values stay English so the email Rafat receives reads the same. */
    subjects: { Commission: 'Commission', Collaboration: 'Collaboration', General: 'General' } as Record<string, string>,
    message: 'Message',
    messagePh: 'Tell me about your project…',
    send: 'Send message',
    sending: 'Sending…',
    required: 'Required',
    badEmail: 'Not a valid address',
    sent: 'Message sent.',
    thanks: 'Thank you — I’ll come back to you shortly.',
    another: 'Send another',
    failed: 'Something went wrong.',
    offline: 'Could not reach the server.',
  },
  about: {
    title: 'About',
    body: [...profile.aboutBody] as string[],
    whatBold: 'What',
    whatLight: 'I do',
    services: services.map((x) => ({ title: x.title as string, description: x.description as string })),
    brandsBold: 'Brands',
    brandsLight: 'I worked with',
    brandsAlt: 'Brands I worked with',
  },
  work: {
    bold: 'Project',
    light: 'categories',
    selected: 'Selected projects',
    scrollHint: 'Scroll to browse',
    swipeHint: 'Swipe to browse',
    view: 'VIEW',
    empty: 'No projects yet.',
    projectOne: 'PROJECT',
    projectMany: 'PROJECTS',
    /** Category id → [label, descriptor] */
    categories: Object.fromEntries(categories.map((c) => [c.id, [c.label, c.descriptor]])) as Record<string, [string, string]>,
  },
  float: { email: 'Email', whatsapp: 'WhatsApp', emailLabel: 'Send Email', whatsappLabel: 'Chat on WhatsApp' },
}

type Dict = typeof en

const ar: Dict = {
  nav: {
    projects: 'المشاريع',
    framework: 'منهجية العمل',
    about: 'عنّي',
    contact: 'تواصل',
    menu: 'القائمة',
    close: 'إغلاق',
    skip: 'انتقل إلى المحتوى',
    switchTo: 'EN',
    switchLabel: 'View the site in English',
  },
  arrow: '←',
  hero: {
    role: 'مدير إبداعي · مدير فني',
    lede: 'أبني العلامات التجارية والحملات والأنظمة البصرية، وأحوّل الأفكار الطموحة إلى تنفيذ إبداعي مدروس.',
    meta: 'مقيم في بلغراد · أعمل دولياً · متاح للتعاون',
    years: (n: number) => `(+${n} عاماً)`,
  },
  home: {
    selectedBold: 'مشاريع',
    selectedLight: 'مختارة',
    aboutStrong: 'أكثر من اثني عشر عاماً',
    aboutRest: ' في بناء هويات العلامات التجارية والحملات المتكاملة والتجارب الرقمية.',
    readMore: 'اقرأ المزيد',
    allProjects: 'كل المشاريع',
    clients: 'عملاء مختارون',
  },
  contactStatement: { light: 'لنصنع معاً', bold: 'ما يستحق أن يُذكر.' },
  title: 'مدير إبداعي / مدير فني',
  contact: {
    eyebrow: 'تواصل',
    status: 'متاح للتعاون',
    headline: 'كل علامة تجارية قوية تبدأ بمحادثة واحدة.',
    formLabel: 'أو اكتب رسالتك هنا',
    formSub: 'مشروع جديد، أو بناء علامة تجارية، أو فكرة لم تبدأ بعد. بضعة أسطر تكفي، وسأردّ عليك خلال يوم أو يومين.',
    basedIn: 'مقيم في',
    cities: ['بلغراد، صربيا', 'أربيل، العراق'],
    availableFor: 'مجالات العمل',
    services: ['الإدارة الإبداعية', 'الإدارة الفنية', 'الهوية البصرية', 'التعاون عن بُعد'],
    elsewhere: 'تابعني',
  },
  form: {
    name: 'الاسم',
    namePh: 'اسمك',
    email: 'البريد الإلكتروني',
    subject: 'الموضوع',
    subjectPh: 'اختر الموضوع…',
    subjects: { Commission: 'مشروع جديد', Collaboration: 'تعاون', General: 'استفسار عام' },
    message: 'الرسالة',
    messagePh: 'حدّثني عن مشروعك…',
    send: 'أرسل الرسالة',
    sending: 'جارٍ الإرسال…',
    required: 'هذا الحقل مطلوب',
    badEmail: 'البريد الإلكتروني غير صحيح',
    sent: 'وصلت رسالتك.',
    thanks: 'شكراً لك، سأعود إليك قريباً.',
    another: 'أرسل رسالة أخرى',
    failed: 'حدث خطأ ما.',
    offline: 'تعذّر الاتصال بالخادم.',
  },
  about: {
    title: 'عنّي',
    body: [
      'مدير إبداعي ومدير فني مقيم في بلغراد، صربيا، بخبرة تتجاوز اثني عشر عاماً في العلامات التجارية والهوية البصرية والإعلان والحملات والتجارب الرقمية.',
      'يجمع عملي بين التفكير الاستراتيجي والتنفيذ البصري المميّز. من الفكرة الأولى حتى آخر تفصيل في الإنتاج، أطوّر أفكاراً إبداعية وأنظمة بصرية تمنح العلامات التجارية هوية واضحة وحضوراً لا يُنسى.',
      'تعاونت خلال مسيرتي مع علامات رائدة في قطاعات السيارات والمصارف والعقارات والضيافة والسلع الاستهلاكية، وقدت فرقاً إبداعية متعددة التخصصات في التصميم الجرافيكي والموشن والإنتاج الرقمي، جامعاً بين الإدارة الإبداعية والعمل الفني المباشر.',
      'أؤمن بأن العمل الإبداعي القوي يولد من التوازن بين وضوح الاستراتيجية ودقة التصميم وإتقان التنفيذ.',
      'أتعاون اليوم مع علامات تجارية ووكالات وفرق إبداعية في أسواق دولية متعددة.',
    ],
    whatBold: 'ما',
    whatLight: 'أقدّمه',
    services: [
      { title: 'الإدارة الإبداعية', description: 'تحديد الفكرة والحفاظ على مستواها، من أول سؤال استراتيجي حتى آخر لقطة تُسلَّم.' },
      { title: 'الإدارة الفنية', description: 'الشكل والتكوين والمونتاج. أوجّه التصوير والرسم والموشن ليتحدث العمل عن نفسه.' },
      { title: 'الهوية البصرية', description: 'الشعارات والخطوط والألوان والقواعد التي تحكمها. أنظمة مبنية لتصمد عقداً من الزمن، لا لحملة إطلاق واحدة.' },
      { title: 'الحملات الإعلانية', description: 'من الفكرة إلى التنفيذ عبر الأفلام والمطبوعات والإعلانات الخارجية ومنصات التواصل. فكرة واحدة تتكيّف دون أن تفقد قوتها.' },
      { title: 'التصميم الرقمي', description: 'مواقع ومنتجات رقمية تُدار بالدقة نفسها التي تُدار بها المطبوعات. تصميم يصمد أمام التنفيذ البرمجي.' },
      { title: 'الأنظمة البصرية', description: 'البنية التي تقوم عليها العلامة التجارية: الشبكات والمقاييس ومكتبات الأصول والإرشادات التي تُبقي الفرق على خط واحد.' },
    ],
    brandsBold: 'علامات',
    brandsLight: 'عملت معها',
    brandsAlt: 'علامات تجارية عملت معها',
  },
  work: {
    bold: 'تصنيفات',
    light: 'المشاريع',
    selected: 'مشاريع مختارة',
    scrollHint: 'مرّر للتصفح',
    swipeHint: 'اسحب للتصفح',
    view: 'عرض',
    empty: 'لا توجد مشاريع بعد.',
    projectOne: 'مشروع',
    projectMany: 'مشاريع',
    categories: {
      'brand-identity-guidelines': ['الهوية البصرية والإرشادات', 'شعارات وأنظمة، والقواعد التي تحافظ عليها.'],
      campaigns: ['الحملات الإعلانية', 'فكرة واحدة تصل إلى كل مكان تحتاج أن تعيش فيه.'],
      logofolio: ['الشعارات', 'مجموعة من الشعارات في مكان واحد.'],
      packaging: ['تصميم المنتجات والتغليف', 'الهوية حين تُمسك باليد.'],
      tvc: ['الإعلانات التلفزيونية', 'أفلام وإخراج ومونتاج.'],
      art: ['فن', 'أعمال صُنعت لذاتها.'],
    },
  },
  float: { email: 'البريد', whatsapp: 'واتساب', emailLabel: 'أرسل بريداً إلكترونياً', whatsappLabel: 'تواصل عبر واتساب' },
}

export const dictionaries: Record<Locale, Dict> = { en, ar }

export function t(locale: Locale): Dict {
  return dictionaries[locale]
}
