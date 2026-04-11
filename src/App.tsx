import { Download, Linkedin, Mail, MapPin, Phone } from "lucide-react";

const summaryItems = [
  "Especialista em CRO, UX/UI, front-end e integrações, com mais de 11 anos de trajetória em design e marketing digital.",
  "Atuação na evolução de e-commerces, landing pages e jornadas digitais, conectando experiência, conversão, mensuração e sustentação operacional.",
  "Perfil híbrido entre prototipação, front-end, testes A/B, tracking, acionamentos e integrações com ecossistemas como Wake, Salesforce, VTEX e Shopify.",
  "Vivência na conexão entre design, tecnologia e resultado, com foco em reduzir atritos e sustentar a evolução contínua de experiências digitais.",
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
    title: "UX/UI Designer | CRO | Front-end e Integrações",
    period: "2020 – Até o momento",
    company: "Grupo Mysa - ABC da Construção",
    current: true,
    bullets: [
      "Liderei a criação e evolução de 4 operações de e-commerce, conectando UX/UI, front-end, CRO e integrações.",
      "Conduzi backlog, prioridades e sprints em frentes que envolviam clientes, agências e times técnicos.",
      "Estruturei soluções em Figma com foco em usabilidade, redução de atritos e melhoria da experiência.",
      "Implementei melhorias, evoluções e correções em fluxos e páginas no contexto de Wake e Salesforce.",
      "Direcionei hipóteses de CRO, testes A/B, scripts de tags, eventos e acionamentos via GTM para evolução de páginas e fluxos estratégicos.",
      "Atuei em entregas ligadas a integrações de e-commerce e ecossistemas conectados, incluindo APIs, ERP e Salesforce.",
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

const skills = [
  "Conversão e Mensuração: CRO, testes A/B, GTM, eventos e análise de jornada",
  "UX/UI e Prototipação: Figma, Framer e prototipação de interfaces",
  "Front-end: HTML, CSS, JavaScript e TypeScript",
  "Integrações e Ecossistemas: Salesforce, Wake, VTEX e Shopify",
  "Branding e Design Gráfico: Adobe Suite",
  "Motion: After Effects",
];

export default function App() {
  return (
    <main data-ui="resume-page">
      <article data-ui="resume-sheet">
        <header data-ui="resume-header">
          <h1 data-ui="resume-title-large">PHAISON VIEIRA SIMÕES</h1>
          <p data-ui="resume-metadata">CRO | UX/UI, Front-end e Integrações</p>
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
