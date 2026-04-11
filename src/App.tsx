import * as DialogPrimitive from "@radix-ui/react-dialog";

import { useResumeAnalytics } from "@/hooks/useResumeAnalytics";
import {
  trackResumeContactClick,
  trackResumePrintClick,
  type ResumeContactMethod,
} from "@/lib/analytics";
import { ArrowUpRight, Linkedin, Mail, MapPin, Printer, X } from "lucide-react";
import { useState, type ComponentType, type SVGProps } from "react";

function WhatsAppIcon({
  size = 14,
  ...props
}: SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      height={size}
      viewBox="0 0 24 24"
      width={size}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M20.1 11.9c0 4.5-3.7 8.1-8.1 8.1-1.4 0-2.7-.4-3.9-1l-4.1 1.1 1.1-4c-.7-1.2-1.1-2.6-1.1-4.2 0-4.5 3.7-8.1 8.1-8.1s8 3.7 8 8.1Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
      <path
        d="M9.1 8.9c.2-.4.6-.7 1-.7h.7c.3 0 .6.2.7.5l1 2.2c.1.2.1.5-.1.7l-.7.8c.6 1.2 1.5 2.1 2.7 2.7l.8-.7c.2-.2.5-.2.7-.1l2.2 1c.3.1.5.4.5.7v.7c0 .4-.3.8-.7 1-1 .4-2.5.2-4.5-.8-1.9-1-4.1-3.2-5.1-5.1-1-2-1.2-3.5-.8-4.5Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function GmailBrandIcon({
  size = 18,
  ...props
}: SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      height={size}
      viewBox="0 0 24 24"
      width={size}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M4.5 7.1h15a1.8 1.8 0 0 1 1.8 1.8v8a1.8 1.8 0 0 1-1.8 1.8h-15a1.8 1.8 0 0 1-1.8-1.8v-8A1.8 1.8 0 0 1 4.5 7.1Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path
        d="M3.4 8.4 12 14.4l8.6-6"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path
        d="M3.4 8.4v8.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path
        d="M20.6 8.4v8.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function OutlookBrandIcon({
  size = 18,
  ...props
}: SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      height={size}
      viewBox="0 0 24 24"
      width={size}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M4.5 5.8h7.4A1.8 1.8 0 0 1 13.7 7.6v10.2a1.8 1.8 0 0 1-1.8 1.8H4.5a1.8 1.8 0 0 1-1.8-1.8V7.6a1.8 1.8 0 0 1 1.8-1.8Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path
        d="M11.4 7.8h6.2a1.8 1.8 0 0 1 1.8 1.8v5.3a1.8 1.8 0 0 1-1.8 1.8h-6.2a1.8 1.8 0 0 1-1.8-1.8V9.6a1.8 1.8 0 0 1 1.8-1.8Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path
        d="m11.6 9.7 4.8 3.3 4.8-3.3"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.4"
      />
      <path
        d="M12.5 12.6h4.1"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.4"
      />
    </svg>
  );
}

const summaryItems = [
  "Especialista em CRO, UX/UI, front-end e integra\u00E7\u00F5es, com mais de 11 anos de trajet\u00F3ria em design e marketing digital.",
  "Atua\u00E7\u00E3o na evolu\u00E7\u00E3o de e-commerces, landing pages e jornadas digitais, conectando experi\u00EAncia, convers\u00E3o, mensura\u00E7\u00E3o e sustenta\u00E7\u00E3o operacional.",
  "Perfil h\u00EDbrido entre prototipa\u00E7\u00E3o, testes A/B, tracking, implementa\u00E7\u00E3o front-end e integra\u00E7\u00F5es.",
  "Atua\u00E7\u00E3o em ecossistemas como Wake, Salesforce, VTEX e Shopify, com viv\u00EAncia na coordena\u00E7\u00E3o de frentes multidisciplinares, conectando design, tecnologia, opera\u00E7\u00E3o e resultado.",
];

const contactEmailAddress = "phaison.uxe@gmail.com";
const contactEmailSubject =
  "[VAGA]: Oportunidade (Insira aqui o nome da Empresa), (Insira cargo da vaga)";
const contactEmailBody = [
  "Olá, Phaison.",
  "Gostaria de entrar em contato sobre uma oportunidade profissional.",
  "Aguardo seu retorno.",
].join("\r\n\r\n");
const contactEmailGmailHref = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(contactEmailAddress)}&su=${encodeURIComponent(contactEmailSubject)}&body=${encodeURIComponent(contactEmailBody)}`;
const contactEmailOutlookHref = `https://outlook.office.com/mail/deeplink/compose?to=${encodeURIComponent(contactEmailAddress)}&subject=${encodeURIComponent(contactEmailSubject)}&body=${encodeURIComponent(contactEmailBody)}`;
const contactWhatsAppMessage =
  "Olá, Phaison. Vi seu currículo e gostaria de conversar sobre uma oportunidade profissional.";
const contactWhatsAppHref = `https://wa.me/5531992031320?text=${encodeURIComponent(contactWhatsAppMessage)}`;
const printContactLine = [
  "Localiza\u00E7\u00E3o: Contagem, Brasil",
  `E-mail: ${contactEmailAddress}`,
  "WhatsApp: +55 31 99203-1320",
  "LinkedIn: linkedin.com/in/phaisonvieiradesigner",
].join(" | ");

const education = {
  title: "Superior em Design Gráfico",
  period: "2012 – 2015",
  institution: "Centro Universitário de Belo Horizonte (UNI-BH)",
};

const additionalEducation = [
  {
    title: "Google UX/UI Design",
    period: "2022 – 2023",
    helper: "UX Design Heurísticas e Pro Figma | UI Design",
  },
  {
    title: "Origamid",
    period: "2023 – 2026",
    helper:
      "Front-End & UX/UI Design, HTML, CSS, JavaScript, TypeScript, React, Redux, Node.js, SQLite e WooCommerce",
  },
] as const;

const skills = [
  {
    title: "Conversão e Mensuração",
    description:
      "CRO, testes A/B, GTM, GA4, Looker Studio, Clarity, eventos e análise de jornada",
  },
  {
    title: "UX/UI e Prototipação",
    description: "Figma, Framer e prototipação de interfaces",
  },
  {
    title: "Front-end",
    description: "HTML, CSS, JavaScript e TypeScript",
  },
  {
    title: "Integrações e Ecossistemas",
    description: "Salesforce, Wake, VTEX e Shopify",
  },
  {
    title: "Branding e Design Gráfico",
    description: "Adobe Suite",
  },
  {
    title: "Motion",
    description: "After Effects",
  },
] as const;

const printAction = {
  label: "Imprimir",
} as const;

// Atualize esta data para controlar o início da experiência atual no Grupo Mysa.
const currentExperienceStart = {
  year: 2021,
  monthIndex: 6,
  day: 5,
} as const;

const currentExperienceStartLabel = `${["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"][currentExperienceStart.monthIndex]}/${currentExperienceStart.year}`;

type EmailProvider = "gmail" | "outlook";

type EmailOptionItem = {
  provider: EmailProvider;
  title: string;
  subtitle: string;
  href: string;
  icon: ComponentType<SVGProps<SVGSVGElement> & { size?: number }>;
};

type ContactTextItem = {
  kind: "text";
  label: string;
  icon: typeof MapPin;
};

type ContactActionItem = {
  kind: "action";
  label: string;
  icon: typeof Mail;
  contactMethod: ResumeContactMethod;
};

type ContactLinkItem = {
  kind: "link";
  label: string;
  href: string;
  icon: ComponentType<SVGProps<SVGSVGElement> & { size?: number }>;
  contactMethod: ResumeContactMethod;
  target?: "_blank";
  rel?: "noreferrer";
};

type ContactItem = ContactTextItem | ContactActionItem | ContactLinkItem;

function createUtcDate(year: number, monthIndex: number, day: number) {
  return new Date(Date.UTC(year, monthIndex, day));
}

function formatDurationUnit(value: number, singular: string, plural: string) {
  return `${value} ${value === 1 ? singular : plural}`;
}

function getCurrentExperienceDuration(now = new Date()) {
  const today = createUtcDate(now.getFullYear(), now.getMonth(), now.getDate());
  let cursor = createUtcDate(
    currentExperienceStart.year,
    currentExperienceStart.monthIndex,
    currentExperienceStart.day,
  );

  let years = 0;
  while (true) {
    const next = createUtcDate(
      cursor.getUTCFullYear() + 1,
      cursor.getUTCMonth(),
      cursor.getUTCDate(),
    );

    if (next > today) {
      break;
    }

    cursor = next;
    years += 1;
  }

  let months = 0;
  while (true) {
    const next = createUtcDate(
      cursor.getUTCFullYear(),
      cursor.getUTCMonth() + 1,
      cursor.getUTCDate(),
    );

    if (next > today) {
      break;
    }

    cursor = next;
    months += 1;
  }

  return { years, months };
}

function renderCurrentExperiencePeriod() {
  const { years, months } = getCurrentExperienceDuration();

  return (
    <span data-ui="resume-experience-period">
      <span data-ui="resume-experience-period-label">
        {currentExperienceStartLabel} – Até o momento
      </span>
      <span data-ui="resume-experience-period-duration">
        (
        <span data-ui="resume-experience-period-compact">
          {formatDurationUnit(years, "ano", "anos")},{" "}
          {formatDurationUnit(months, "mês", "meses")}
        </span>
        )
      </span>
    </span>
  );
}

function openComposeWindow(url: string) {
  window.open(url, "_blank", "noopener,noreferrer");
}

export default function App() {
  useResumeAnalytics();

  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);

  const emailOptions: readonly EmailOptionItem[] = [
    {
      provider: "gmail",
      title: "Gmail",
      subtitle: "Abrir o compose no Gmail",
      href: contactEmailGmailHref,
      icon: GmailBrandIcon,
    },
    {
      provider: "outlook",
      title: "Outlook",
      subtitle: "Abrir o compose no Outlook Web",
      href: contactEmailOutlookHref,
      icon: OutlookBrandIcon,
    },
  ];

  const contactItems: readonly ContactItem[] = [
    {
      kind: "text",
      label: "Contagem, Brasil",
      icon: MapPin,
    },
    {
      kind: "action",
      label: contactEmailAddress,
      icon: Mail,
      contactMethod: "email",
    },
    {
      kind: "link",
      label: "+55 31 99203-1320",
      href: contactWhatsAppHref,
      icon: WhatsAppIcon,
      contactMethod: "whatsapp",
      target: "_blank",
      rel: "noreferrer",
    },
    {
      kind: "link",
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/phaisonvieiradesigner/",
      icon: Linkedin,
      contactMethod: "linkedin",
      target: "_blank",
      rel: "noreferrer",
    },
  ];

  const experiences = [
    {
      title: "UX/UI Designer | CRO | Front-end e Integrações",
      period: renderCurrentExperiencePeriod(),
      company:
        "Grupo Mysa: ABC da Construção | ABC Prime | Casa Dexco | ImperMix | Granvilla",
      current: true,
      bullets: [
        "Liderei a criação e evolução de 4 operações de e-commerce, conectando UX/UI, front-end, CRO e integrações.",
        "Coordenei prioridades, backlog e entregas entre clientes, agências e times técnicos em frentes de e-commerce, CRO e integrações.",
        "Estruturei soluções em Figma com foco em usabilidade, redução de atritos e melhoria da experiência.",
        "Implementei melhorias, evoluções e correções em fluxos e páginas no contexto de Wake e Salesforce.",
        "Direcionei hipóteses de CRO, testes A/B, eventos, tags e acionamentos via GTM em páginas e fluxos estratégicos.",
        "Conduzi entregas ligadas a integrações de e-commerce e ecossistemas conectados, incluindo APIs, ERP e Salesforce.",
      ],
    },
    {
      title: "Analista de Marketing Digital",
      period: "2020",
      company: "Grupo Buzatto's",
      current: false,
      bullets: [
        "Produção de peças e campanhas digitais com foco em aquisição e conversão.",
        "Apoio à estratégia e à execução de marketing digital, incluindo criativos, landing pages e comunicação.",
        "Criação de materiais digitais e gráficos para empresas do grupo.",
      ],
    },
    {
      title: "Coordenador de Design",
      period: "2017 – 2019",
      company: "Kickball",
      current: false,
      bullets: [
        "Coordenei entregas e a qualidade do design com a equipe, incluindo prazos, revisão e alinhamentos.",
        "Produção de materiais digitais e identidade visual para diferentes clientes.",
        "Organização de demandas e fluxo de trabalho do time.",
      ],
    },
  ] as const;

  const handlePrint = () => {
    trackResumePrintClick();
    window.print();
  };

  const handleOpenEmailModal = () => {
    trackResumeContactClick("email", "email_modal_open");
    setIsEmailModalOpen(true);
  };

  const handleEmailProviderClick = (provider: EmailProvider) => {
    const option = emailOptions.find((item) => item.provider === provider);

    if (!option) {
      return;
    }

    const placement =
      provider === "gmail" ? "email_modal_gmail" : "email_modal_outlook";

    trackResumeContactClick("email", placement);
    openComposeWindow(option.href);
    setIsEmailModalOpen(false);
  };

  return (
    <main data-ui="resume-page">
      <article data-ui="resume-sheet">
        <header data-ui="resume-header">
          <div data-ui="resume-title-group">
            <h1 data-ui="resume-title-large">PHAISON VIEIRA SIMÕES</h1>
            <p data-ui="resume-metadata">
              Atuação em coordenação de CRO, UX/UI, Front-end e Integrações
            </p>
          </div>
          <p data-ui="resume-contact-plain">{printContactLine}</p>
          <div data-ui="resume-contact-group">
            {contactItems.map((item) => {
              const Icon = item.icon;

              if (item.kind === "link") {
                return (
                  <a
                    key={item.label}
                    data-ui="resume-contact-link"
                    href={item.href}
                    rel={item.rel}
                    target={item.target}
                    onClick={() => {
                      trackResumeContactClick(
                        item.contactMethod as ResumeContactMethod,
                      );
                    }}
                  >
                    <Icon aria-hidden="true" size={14} />
                    <span>{item.label}</span>
                  </a>
                );
              }

              if (item.kind === "action") {
                return (
                  <button
                    key={item.label}
                    type="button"
                    data-ui="resume-contact-action"
                    onClick={handleOpenEmailModal}
                  >
                    <Icon aria-hidden="true" size={14} />
                    <span>{item.label}</span>
                  </button>
                );
              }

              return (
                <span key={item.label} data-ui="resume-contact-text">
                  <Icon aria-hidden="true" size={14} />
                  <span>{item.label}</span>
                </span>
              );
            })}
          </div>
        </header>

        <div data-ui="resume-divider" aria-hidden="true" />

        <section
          data-ui="resume-section"
          data-analytics-section="summary"
          aria-labelledby="summary-title"
        >
          <h2 id="summary-title" data-ui="resume-section-title">
            Resumo Profissional
          </h2>
          <ul data-ui="resume-list" data-variant="summary">
            {summaryItems.map((item) => (
              <li key={item} data-ui="resume-list-item">
                {item}
              </li>
            ))}
          </ul>
        </section>

        <div data-ui="resume-divider" aria-hidden="true" />

        <section
          data-ui="resume-section"
          data-analytics-section="experience"
          aria-labelledby="experience-title"
        >
          <h2 id="experience-title" data-ui="resume-section-title">
            Experiência Profissional
          </h2>

          {experiences.map((experience) => (
            <article
              key={`${experience.title}-${experience.company}`}
              data-current={experience.current ? "true" : undefined}
              data-ui="resume-entry"
            >
              <div data-ui="resume-entry-header">
                <h3 data-ui="resume-entry-title">{experience.title}</h3>
                <span data-ui="resume-metadata">{experience.period}</span>
              </div>
              <div data-ui="resume-entry-body">
                <p data-ui="resume-helper">{experience.company}</p>
                <ul data-ui="resume-list" data-variant="entry">
                  {experience.bullets.map((bullet) => (
                    <li key={bullet} data-ui="resume-list-item">
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </section>

        <div data-ui="resume-divider" aria-hidden="true" />

        <section
          data-ui="resume-section"
          data-analytics-section="education"
          aria-labelledby="education-title"
        >
          <h2 id="education-title" data-ui="resume-section-title">
            Formação Acadêmica
          </h2>

          <article data-ui="resume-entry">
            <div data-ui="resume-entry-header">
              <h3 data-ui="resume-entry-title">{education.title}</h3>
              <span data-ui="resume-metadata">{education.period}</span>
            </div>
            <p data-ui="resume-helper">{education.institution}</p>
          </article>
        </section>

        <div data-ui="resume-divider" aria-hidden="true" />

        <section
          data-ui="resume-section"
          data-analytics-section="additional_education"
          aria-labelledby="additional-education-title"
        >
          <h2 id="additional-education-title" data-ui="resume-section-title">
            Formação Complementar
          </h2>

          <div data-ui="resume-additional-education-grid">
            {additionalEducation.map((item) => (
              <article key={item.title} data-ui="resume-entry">
                <div data-ui="resume-entry-header">
                  <h3 data-ui="resume-entry-title">{item.title}</h3>
                  <span data-ui="resume-metadata">{item.period}</span>
                </div>
                <p data-ui="resume-helper">{item.helper}</p>
              </article>
            ))}
          </div>
        </section>

        <div data-ui="resume-divider" aria-hidden="true" />

        <section
          data-ui="resume-section"
          data-analytics-section="skills"
          aria-labelledby="skills-title"
        >
          <h2 id="skills-title" data-ui="resume-section-title">
            Habilidades
          </h2>

          <div data-ui="resume-skills-grid">
            {skills.map((skill) => (
              <div key={skill.title} data-ui="resume-skill-item">
                <p data-ui="resume-paragraph" data-variant="skill">
                  <span data-ui="resume-skill-title">{skill.title}</span>
                  <span data-ui="resume-skill-description">
                    {skill.description}
                  </span>
                </p>
              </div>
            ))}
          </div>
        </section>
      </article>

      <DialogPrimitive.Root
        open={isEmailModalOpen}
        onOpenChange={setIsEmailModalOpen}
      >
        <DialogPrimitive.Portal>
          <DialogPrimitive.Overlay data-ui="email-modal-overlay" />
          <DialogPrimitive.Content
            data-ui="email-modal-content"
            aria-describedby={undefined}
          >
            <DialogPrimitive.Close
              type="button"
              data-ui="email-modal-close"
              aria-label="Fechar opções de e-mail"
            >
              <X aria-hidden="true" size={16} />
            </DialogPrimitive.Close>

            <div data-ui="email-modal-panel">
              <div data-ui="email-modal-header">
                <DialogPrimitive.Title data-ui="email-modal-title">
                  Enviar e-mail usando:
                </DialogPrimitive.Title>
              </div>

              <div data-ui="email-modal-actions">
                {emailOptions.map((option) => {
                  const Icon = option.icon;

                  return (
                    <button
                      key={option.provider}
                      type="button"
                      data-ui="email-modal-option"
                      onClick={() => handleEmailProviderClick(option.provider)}
                    >
                      <div data-ui="email-modal-option-icon">
                        <Icon aria-hidden="true" size={16} />
                      </div>
                      <div data-ui="email-modal-option-content">
                        <div data-ui="email-modal-option-copy">
                          <strong>{option.title}</strong>
                          <span>{option.subtitle}</span>
                        </div>
                      </div>
                      <div data-ui="email-modal-option-action">
                        <ArrowUpRight aria-hidden="true" size={13} />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>

      <div
        data-ui="resume-floating-actions"
        aria-label="Imprimir currículo em PDF"
      >
        <button
          type="button"
          data-ui="resume-floating-action"
          onClick={handlePrint}
        >
          <Printer aria-hidden="true" size={14} />
          <span>{printAction.label}</span>
        </button>
      </div>
    </main>
  );
}

