import { Separator } from "./components/ui/separator";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-8 flex items-center justify-center">
      {/* A4 size container: 210mm x 297mm = 794px x 1123px at 96 DPI */}
      <div className="w-[794px] h-[1123px] bg-white shadow-2xl p-12 overflow-hidden">
        {/* Header */}
        <header className="mb-4">
          <h1 className="mb-2 font-bold text-center">PHAISON VIEIRA SIMÕES</h1>
          <div className="text-gray-600 text-xs text-center space-y-0.5">
            <p>Belo Horizonte, Brasil | phaison.uxe@gmail.com | +55 31 99203-1320</p>
            <p>https://www.linkedin.com/in/phaisonvieiradesigner/</p>
          </div>
        </header>

        <Separator className="my-3" />

        {/* Resumo Profissional */}
        <section className="mb-4">
          <h2 className="mb-2 font-bold uppercase tracking-wide text-sm">Resumo Profissional</h2>
          <ul className="list-disc list-outside ml-4 space-y-1 text-gray-700 text-xs leading-relaxed">
            <li>UXE Designer, com +10 anos de experiência em UX/UI, Front/Back-end e CRO.</li>
            <li>Especialista em e-commerces, criação de interfaces, LPS e Aquisição CRO.</li>
            <li>Prototipagem (Figma, Framer), HTML, CSS, JS e GTM. Capaz de integrar soluções digitais com foco em performance, experiência e resultado.</li>
            <li>Especializando em AI, IDEs, Vibe Coding etc.</li>
          </ul>
        </section>

        <Separator className="my-3" />

        {/* Experiência Profissional */}
        <section className="mb-4">
          <h2 className="mb-2 font-bold uppercase tracking-wide text-sm">Experiência Profissional</h2>
          
          <div className="mb-3">
            <div className="flex justify-between items-baseline mb-1">
              <h3 className="font-bold text-xs">PO/UX/UI/Front-ender de E-commerces - Atuação Híbrida</h3>
              <span className="text-gray-600 text-xs">2020 – Até o momento</span>
            </div>
            <p className="text-gray-600 text-xs mb-1">Grupo Mysa - ABC da Construção</p>
            <ul className="list-disc list-outside ml-4 space-y-0.5 text-gray-700 text-xs leading-relaxed">
              <li>Atuei na criação e evolução de 4 e-commerce com UX/UI, Front/Back-end e CRO.</li>
              <li>Atuei como PO de integrações: backlog, prioridades e sprints, clientes e agências.</li>
              <li>Prototipei soluções no Figma focando em usabilidade e redução de atritos.</li>
              <li>Implementei melhorias, evoluções e correções de bugs de Front/Back-end na Wake e Salesforce.</li>
              <li>Executei CRO hands-on: hipóteses, testes A/B (scripts de tags) e eventos via GTM, para evoluir a conversão em páginas estratégicas.</li>
              <li>Apoiei entregas no contexto de integrações do e-commerce (APIs/ERP/Salesforce).</li>
            </ul>
          </div>

          <div className="mb-3">
            <div className="flex justify-between items-baseline mb-1">
              <h3 className="font-bold text-xs">Analista de Marketing Digital</h3>
              <span className="text-gray-600 text-xs">2020</span>
            </div>
            <p className="text-gray-600 text-xs mb-1">Grupo Buzatto's</p>
            <ul className="list-disc list-outside ml-4 space-y-0.5 text-gray-700 text-xs leading-relaxed">
              <li>Produção de peças e campanhas digitais com foco em aquisição e conversão.</li>
              <li>Apoio à estratégia e execução de marketing digital (criativos, landing pages e comunicação).</li>
              <li>Criei materiais digitais e gráficos para empresas do grupo.</li>
            </ul>
          </div>

          <div className="mb-2">
            <div className="flex justify-between items-baseline mb-1">
              <h3 className="font-bold text-xs">Coordenador de Design</h3>
              <span className="text-gray-600 text-xs">2017 – 2019</span>
            </div>
            <p className="text-gray-600 text-xs mb-1">Kickball</p>
            <ul className="list-disc list-outside ml-4 space-y-0.5 text-gray-700 text-xs leading-relaxed">
              <li>Coordenei entregas e qualidade de design com equipe (prazos, revisão e alinhamentos).</li>
              <li>Produção de materiais digitais e identidade visual para diferentes clientes.</li>
              <li>Organização de demandas e fluxo de trabalho do time.</li>
            </ul>
          </div>
        </section>

        <Separator className="my-3" />

        {/* Formação Acadêmica */}
        <section className="mb-4">
          <h2 className="mb-2 font-bold uppercase tracking-wide text-sm">Formação Acadêmica</h2>
          
          <div className="mb-2">
            <div className="flex justify-between items-baseline mb-1">
              <h3 className="font-bold text-xs">Superior em Design Gráfico</h3>
              <span className="text-gray-600 text-xs">2012 – 2015</span>
            </div>
            <p className="text-gray-600 text-xs">Centro Universitário de Belo Horizonte (UNI-BH)</p>
          </div>
        </section>

        <Separator className="my-3" />

        {/* Habilidades */}
        <section className="mb-4">
          <h2 className="mb-2 font-bold uppercase tracking-wide text-sm">Habilidades</h2>
          
          <div className="grid grid-cols-2 gap-x-4 gap-y-2">
            <div>
              <p className="text-gray-700 text-xs leading-relaxed"><span className="font-bold">•</span> UX/UI Design (Figma, Framer)</p>
            </div>
            
            <div>
              <p className="text-gray-700 text-xs leading-relaxed"><span className="font-bold">•</span> Front-End (HTML, CSS, JS, TypeScript)</p>
            </div>
            
            <div>
              <p className="text-gray-700 text-xs leading-relaxed"><span className="font-bold">•</span> CRO e testes A/B (GTM)</p>
            </div>
            
            <div>
              <p className="text-gray-700 text-xs leading-relaxed"><span className="font-bold">•</span> Motion Design (After Effects)</p>
            </div>

            <div>
              <p className="text-gray-700 text-xs leading-relaxed"><span className="font-bold">•</span> Branding & Design Gráfico (Adobe Suite)</p>
            </div>

            <div>
              <p className="text-gray-700 text-xs leading-relaxed"><span className="font-bold">•</span> Integrações Salesforce/Wake</p>
            </div>
          </div>
        </section>

        <Separator className="my-3" />

        {/* Idiomas */}
        <section>
          <h2 className="mb-2 font-bold uppercase tracking-wide text-sm">Idiomas</h2>
          <p className="text-gray-700 text-xs leading-relaxed">
            Inglês – Básico
          </p>
        </section>
      </div>
    </div>
  );
}
