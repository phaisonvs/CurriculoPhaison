import { Linkedin, Mail, MapPin, Printer } from "lucide-react";
import type { SVGProps } from "react";

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

const summaryItems = [
  "Especialista em CRO, UX/UI, front-end e integrações, com mais de 11 anos de trajetória em design e marketing digital.",
  "Atuação na evolução de e-commerces, landing pages e jornadas digitais, conectando experiência, conversão, mensuração e sustentação operacional.",
  "Perfil híbrido entre prototipação, testes A/B, tracking, implementação front-end e integrações.",
  "Atuação em ecossistemas como Wake, Salesforce, VTEX e Shopify.",
  "Vivência na coordenação de frentes multidisciplinares, conectando design, tecnologia, operação e resultado.",
];

const contactEmailSubject = "Contato sobre oportunidade profissional";
const contactEmailBody = [
  "Olá, Phaison.",
  "Gostaria de entrar em contato sobre uma oportunidade profissional.",
  "Aguardo seu retorno.",
].join("\r\n");
const contactEmailHref = `mailto:phaison.uxe@gmail.com?subject=${encodeURIComponent(contactEmailSubject)}&body=${encodeURIComponent(contactEmailBody)}`;
const contactWhatsAppMessage = "Olá, Phaison. Vi seu currículo e gostaria de conversar sobre uma oportunidade profissional.";
const contactWhatsAppHref = `https://wa.me/5531992031320?text=${encodeURIComponent(contactWhatsAppMessage)}`;

const contactItems = [
  {
    kind: "text",
    label: "Contagem, Brasil",
    icon: MapPin,
  },
  {
    kind: "link",
    label: "phaison.uxe@gmail.com",
    href: contactEmailHref,
    icon: Mail,
  },
  {
    kind: "link",
    label: "+55 31 99203-1320",
    href: contactWhatsAppHref,
    icon: WhatsAppIcon,
    target: "_blank",
    rel: "noreferrer",
  },
  {
    kind: "link",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/phaisonvieiradesigner/",
    icon: Linkedin,
    target: "_blank",
    rel: "noreferrer",
  },
] as const;

const printAction = {
  label: "Imprimir",
} as const;

const experiences = [
  {
    title: "UX/UI Designer | CRO | Front-end e Integrações",
    period: "2020 – Até o momento",
    company: "Grupo Mysa - ABC da Construção",
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
    bullets: [
      "Coordenei entregas e a qualidade do design com a equipe, incluindo prazos, revisão e alinhamentos.",
      "Produção de materiais digitais e identidade visual para diferentes clientes.",
      "Organização de demandas e fluxo de trabalho do time.",
    ],
  },
] as const;

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
    helper: "Front-End & UX/UI Design, HTML, CSS, JavaScript, TypeScript, React, Redux, Node.js, SQLite e WooCommerce",
  },
] as const;

const skills = [
  {
    title: "Conversão e Mensuração",
    description: "CRO, testes A/B, GTM, eventos e análise de jornada",
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

export default function App() {
  const handlePrint = () => {
    window.print();
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
                  >
                    <Icon aria-hidden="true" size={14} />
                    <span>{item.label}</span>
                  </a>
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

        <section data-ui="resume-section" aria-labelledby="summary-title">
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

        <section data-ui="resume-section" aria-labelledby="experience-title">
          <h2 id="experience-title" data-ui="resume-section-title">
            Experiência Profissional
          </h2>

          {experiences.map((experience) => (
            <article
              key={experience.title}
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

        <section data-ui="resume-section" aria-labelledby="education-title">
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
          aria-labelledby="additional-education-title"
        >
          <h2 id="additional-education-title" data-ui="resume-section-title">
            Formação Complementar
          </h2>

          {additionalEducation.map((item) => (
            <article key={item.title} data-ui="resume-entry">
              <div data-ui="resume-entry-header">
                <h3 data-ui="resume-entry-title">{item.title}</h3>
                <span data-ui="resume-metadata">{item.period}</span>
              </div>
              <p data-ui="resume-helper">{item.helper}</p>
            </article>
          ))}
        </section>

        <div data-ui="resume-divider" aria-hidden="true" />

        <section data-ui="resume-section" aria-labelledby="skills-title">
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

      <div data-ui="resume-floating-actions" aria-label="Imprimir currículo em PDF">
        <button type="button"
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
