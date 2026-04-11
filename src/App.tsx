import { Download, Linkedin, Mail, MapPin, Phone } from "lucide-react";

const summaryItems = [
  "Especialista em e-commerce, CRO | UX/UI, Front-end, Acquisition e Integrações, com +11 anos de trajetória em design e marketing digital.",
  "Idealizo e direciono experiências digitais orientadas a funil de conversão, KPIs e evolução contínua de resultado.",
  "Conecto tracking, front-end e sustentação operacional na evolução de e-commerces, LPs e jornadas de negócio.",
  "Atuo com UX/UI para e-commerce, LPs e produtos digitais, prototipação em Figma e Framer, GTM, testes A/B, integrações como Salesforce, Wake, VTEX e Shopify, e evolução com AI, IDEs e Vibe Coding.",
];

const contactItems = [
  {
    kind: "text",
    label: "Contagem, Brasil",
    icon: MapPin,
  },
  {
    kind: "link",
    label: "phaison.uxe@gmail.com",
    href: "mailto:phaison.uxe@gmail.com",
    icon: Mail,
  },
  {
    kind: "link",
    label: "+55 31 99203-1320",
    href: "https://wa.me/5531992031320?text=Olá%2C%20vi%20seu%20currículo",
    icon: Phone,
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

const downloadActions = [
  {
    label: "PDF",
    href: "/curriculo-phaison.pdf",
    download: "Curriculo Phaison.pdf",
  },
  {
    label: "Word",
    href: "/curriculo-phaison.docx",
    download: "Curriculo Phaison.docx",
  },
] as const;

const experiences = [
  {
    title: "PO/UX/UI/Front-ender de E-commerces - Atuação Híbrida",
    period: "2020 – Até o momento",
    company: "Grupo Mysa - ABC da Construção",
    current: true,
    bullets: [
      "Atuei na criação e evolução de 4 e-commerce com UX/UI, Front/Back-end e CRO.",
      "Atuei como PO de integrações: backlog, prioridades e sprints, clientes e agências.",
      "Prototipei soluções no Figma focando em usabilidade e redução de atritos.",
      "Implementei melhorias, evoluções e correções de bugs de Front/Back-end na Wake e Salesforce.",
      "Executei CRO hands-on: hipóteses, testes A/B (scripts de tags) e eventos via GTM, para evoluir a conversão em páginas estratégicas.",
      "Apoiei entregas no contexto de integrações do e-commerce (APIs/ERP/Salesforce).",
    ],
  },
  {
    title: "Analista de Marketing Digital",
    period: "2020",
    company: "Grupo Buzatto's",
    bullets: [
      "Produção de peças e campanhas digitais com foco em aquisição e conversão.",
      "Apoio à estratégia e execução de marketing digital (criativos, landing pages e comunicação).",
      "Criei materiais digitais e gráficos para empresas do grupo.",
    ],
  },
  {
    title: "Coordenador de Design",
    period: "2017 – 2019",
    company: "Kickball",
    bullets: [
      "Coordenei entregas e qualidade de design com equipe (prazos, revisão e alinhamentos).",
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

const skills = [
  "UX/UI Design (Figma, Framer)",
  "Front-End (HTML, CSS, JS, TypeScript)",
  "CRO e testes A/B (GTM)",
  "Motion Design (After Effects)",
  "Branding & Design Gráfico (Adobe Suite)",
  "Integrações Salesforce/Wake",
];

export default function App() {
  return (
    <main data-ui="resume-page">
      <article data-ui="resume-sheet">
        <header data-ui="resume-header">
          <h1 data-ui="resume-title-large">PHAISON VIEIRA SIMÕES</h1>
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
              <p data-ui="resume-helper">{experience.company}</p>
              <ul data-ui="resume-list" data-variant="entry">
                {experience.bullets.map((bullet) => (
                  <li key={bullet} data-ui="resume-list-item">
                    {bullet}
                  </li>
                ))}
              </ul>
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

        <section data-ui="resume-section" aria-labelledby="skills-title">
          <h2 id="skills-title" data-ui="resume-section-title">
            Habilidades
          </h2>

          <div data-ui="resume-skills-grid">
            {skills.map((skill) => (
              <div key={skill} data-ui="resume-skill-item">
                <p data-ui="resume-paragraph">
                  <span aria-hidden="true">•</span>
                  {skill}
                </p>
              </div>
            ))}
          </div>
        </section>

        <div data-ui="resume-divider" aria-hidden="true" />

        <section data-ui="resume-section" aria-labelledby="languages-title">
          <h2 id="languages-title" data-ui="resume-section-title">
            Idiomas
          </h2>
          <p data-ui="resume-paragraph">Inglês – Básico</p>
        </section>
      </article>

      <div data-ui="resume-floating-actions" aria-label="Baixar currículo">
        {downloadActions.map((action) => (
          <a
            key={action.label}
            data-ui="resume-floating-action"
            href={action.href}
            download={action.download}
          >
            <Download aria-hidden="true" size={14} />
            <span>{action.label}</span>
          </a>
        ))}
      </div>
    </main>
  );
}
