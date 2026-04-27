import { useState } from "react";
import Logo from "../assests/logo.png";


const SKILLS = [
  "Medicina", "Enfermagem", "Psicologia", "Assistência social",
  "Educação / Pedagogia", "Engenharia", "TI / Programação",
  "Arquitetura", "Direito", "Nutrição", "Fisioterapia",
  "Comunicação / Marketing", "Design", "Fotografia",
  "Música / Artes", "Culinária", "Idiomas", "Motorista / Logística",
  "Construção civil", "Gestão de projetos"
];

const AVAILABILITY = [
  "Fins de semana", "Manhãs", "Tardes", "Noites",
  "Meio período", "Período integral", "Eventual / sob demanda"
];

const INTERESTS = [
  "Crianças e adolescentes", "Idosos", "Famílias em situação de rua",
  "Vítimas de desastres", "Animais", "Meio ambiente",
  "Pessoas com deficiência", "Saúde mental", "Educação",
  "Combate à fome", "Refugiados"
];

// Simulated recommendation data
const MOCK_RECS = [
  {
    id: 1,
    name: "Casa do Pão de Santo Antônio",
    area: "Combate à fome & alimentação",
    desc: "Distribuição de refeições diárias.",
    location: "São Paulo - SP",
    schedule: "Manhãs e fins de semana",
    social: {
      instagram: "@casadopao",
      website: "www.casadopao.org"
    }
  },
  {
    id: 2,
    name: "Centro Comunitário São Francisco",
    area: "Educação & cultura",
    desc: "Reforço escolar e oficinas.",
    location: "Campinas - SP",
    schedule: "Tardes (segunda a sexta)",
    social: {
      instagram: "@ccsf",
      website: "www.ccsf.org"
    }
  },
  {
    id: 3,
    name: "Rede Solidária Caritas",
    area: "Assistência social & saúde",
    desc: "Apoio psicossocial e distribuição.",
    location: "São Paulo - SP",
    schedule: "Período integral",
    social: {
      instagram: "@caritas",
      website: "www.caritas.org"
    }
  }
];

export default function VolunteerForm({ navigate }) {
  const [selectedONG, setSelectedONG] = useState(null);
  const [step, setStep] = useState(1); // 1 = form, 2 = loading, 3 = results
  const [form, setForm] = useState({
    name: "", email: "", phone: "", city: "", state: "",
    skills: [], availability: [], interests: [],
    motivation: "", experience: "", maxDistance: "25"
  });

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }));
  const toggleArr = (key, val) => set(key, form[key].includes(val)
    ? form[key].filter(x => x !== val)
    : [...form[key], val]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setStep(2);
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => {
      setStep(3);
    }, 2800);
  };

  return (
    <div className="form-page">
      {/* NAV */}
      <nav className="nav">
        <div className="nav-logo" onClick={() => navigate("home")}>
          <img src={Logo} alt="Logo" style={{ width: 32 }} />
          <span className="logo-text">Voluntas</span>
        </div>
        <button className="nav-back" onClick={() => step === 3 ? setStep(1) : navigate("home")}>
          {step === 3 ? "← Editar perfil" : "← Voltar"}
        </button>
      </nav>

      <div className="form-container">

        {/* STEP 1: FORM */}
        {step === 1 && (
          <>
            <div className="form-header fade-up">
              <p className="form-eyebrow">Para Voluntários</p>
              <h1 className="form-title">Encontre sua causa</h1>
              <p className="form-subtitle">
                Compartilhe suas habilidades e disponibilidade. Nossa IA encontrará
                as oportunidades de maior impacto para o seu perfil.
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              {/* PERSONAL */}
              <div className="form-card fade-up-1">
                <p className="form-section-title">Sobre você</p>

                <div className="form-row">
                  <div className="form-group">
                    <label>Nome completo *</label>
                    <input type="text" placeholder="João da Silva" value={form.name}
                      onChange={e => set("name", e.target.value)} required />
                  </div>
                  <div className="form-group">
                    <label>E-mail *</label>
                    <input type="email" placeholder="joao@email.com" value={form.email}
                      onChange={e => set("email", e.target.value)} required />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Telefone</label>
                    <input type="tel" placeholder="(11) 99999-9999" value={form.phone}
                      onChange={e => set("phone", e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label>Cidade *</label>
                    <input type="text" placeholder="São Paulo" value={form.city}
                      onChange={e => set("city", e.target.value)} required />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Estado *</label>
                    <select value={form.state} onChange={e => set("state", e.target.value)} required>
                      <option value="">Selecione...</option>
                      {["SP", "RJ", "MG", "RS", "PR", "SC", "BA", "CE", "PE", "GO", "DF", "AM", "PA", "MT", "MS", "RN", "PB", "AL", "SE", "PI", "MA", "TO", "RO", "AC", "AP", "RR"].map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Distância máxima (km)</label>
                    <select value={form.maxDistance} onChange={e => set("maxDistance", e.target.value)}>
                      <option value="5">Até 5 km</option>
                      <option value="15">Até 15 km</option>
                      <option value="25">Até 25 km</option>
                      <option value="50">Até 50 km</option>
                      <option value="100">Até 100 km</option>
                      <option value="online">Online / remoto</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* SKILLS */}
              <div className="form-card fade-up-1">
                <p className="form-section-title">Suas habilidades</p>
                <label style={{ marginBottom: "0.75rem", display: "block" }}>
                  Selecione as áreas em que você tem experiência ou formação *
                </label>
                <div className="chips-wrap">
                  {SKILLS.map(s => (
                    <button key={s} type="button"
                      className={`chip ${form.skills.includes(s) ? "selected" : ""}`}
                      onClick={() => toggleArr("skills", s)}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* AVAILABILITY */}
              <div className="form-card fade-up-2">
                <p className="form-section-title">Disponibilidade</p>
                <label style={{ marginBottom: "0.75rem", display: "block" }}>
                  Quando você está disponível para voluntariar?
                </label>
                <div className="chips-wrap">
                  {AVAILABILITY.map(a => (
                    <button key={a} type="button"
                      className={`chip ${form.availability.includes(a) ? "selected-green chip" : ""}`}
                      style={form.availability.includes(a) ? {
                        background: "var(--green-gentle)",
                        borderColor: "var(--green-gentle)",
                        color: "var(--white)"
                      } : {}}
                      onClick={() => toggleArr("availability", a)}>
                      {a}
                    </button>
                  ))}
                </div>
              </div>

              {/* INTERESTS */}
              <div className="form-card fade-up-2">
                <p className="form-section-title">Causas de interesse</p>
                <label style={{ marginBottom: "0.75rem", display: "block" }}>
                  Com quais causas você se identifica?
                </label>
                <div className="chips-wrap">
                  {INTERESTS.map(i => (
                    <button key={i} type="button"
                      className={`chip ${form.interests.includes(i) ? "selected" : ""}`}
                      onClick={() => toggleArr("interests", i)}>
                      {i}
                    </button>
                  ))}
                </div>
              </div>

              {/* MOTIVATION */}
              <div className="form-card fade-up-3">
                <p className="form-section-title">Contexto pessoal</p>

                <div className="form-group">
                  <label>O que te motiva a ser voluntário? *</label>
                  <textarea placeholder="Conte um pouco sobre por que você quer ajudar, o que te move a contribuir com a comunidade..."
                    value={form.motivation} onChange={e => set("motivation", e.target.value)} required />
                </div>

                <div className="form-group">
                  <label>Experiência prévia em voluntariado</label>
                  <textarea placeholder="Já foi voluntário antes? Em quais organizações? O que aprendeu com essa experiência?"
                    value={form.experience} onChange={e => set("experience", e.target.value)} />
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "0.5rem" }}>
                <button type="submit" className="btn-primary"
                  disabled={!form.name || !form.email || form.skills.length === 0}>
                  Avançar →
                </button>
              </div>
            </form>
          </>
        )}

        {/* STEP 2: LOADING */}
        {step === 2 && (
          <div className="loading-state fade-up" style={{ paddingTop: "4rem" }}>
            <div className="loading-dots">
              <div className="dot" />
              <div className="dot" />
              <div className="dot" />
            </div>
            <p className="loading-text">Carregando...</p>
          </div>
        )}

        {/* STEP 3: VOLUNTEER PORTAL */}
        {step === 3 && (
          <div className="portal fade-up">

            {/* HEADER */}
            <div className="portal-header">
              <div>
                <h1>Bem-vindo, {form.name.split(" ")[0]}</h1>
                <p>Explore oportunidades de voluntariado perto de você</p>
              </div>

              <button className="btn-secondary" onClick={() => setStep(1)}>
                Editar perfil
              </button>
            </div>

            {/* ONG GRID */}
            <div className="portal-grid">
              {MOCK_RECS.concat([
                {
                  id: 4,
                  name: "Amigos do Bem",
                  area: "Assistência social",
                  desc: "Projetos educacionais e distribuição de alimentos."
                },
                {
                  id: 5,
                  name: "SOS Mata Atlântica",
                  area: "Meio ambiente",
                  desc: "Ações de preservação ambiental e reflorestamento."
                },
                {
                  id: 6,
                  name: "Projeto Viver",
                  area: "Saúde mental",
                  desc: "Apoio psicológico gratuito para jovens e adultos."
                }
              ]).map((ong) => (
                <div key={ong.id} className="portal-card">
                  <div className="portal-card-header">
                    <h3>{ong.name}</h3>
                  </div>

                  <p className="portal-area">{ong.area}</p>
                  <p className="portal-desc">{ong.desc}</p>

                  <button
                    className="btn-primary small"
                    onClick={() => setSelectedONG(ong)}
                  >
                    Ver detalhes
                  </button>
                </div>
              ))}
            </div>

            {/* MODAL DETALHES ONG */}
            {selectedONG && (
              <div className="modal-overlay" onClick={() => setSelectedONG(null)}>
                <div className="modal" onClick={(e) => e.stopPropagation()}>

                  <h2>{selectedONG.name}</h2>
                  <p className="modal-area">{selectedONG.area}</p>

                  <p style={{ marginTop: "0.5rem" }}>{selectedONG.desc}</p>

                  <div className="modal-info">
                    {selectedONG.location && (
                      <p><strong> Local:</strong> {selectedONG.location}</p>
                    )}
                    {selectedONG.schedule && (
                      <p><strong>Disponibilidade:</strong> {selectedONG.schedule}</p>
                    )}
                  </div>

                  <div className="modal-social">
                    {selectedONG.social?.website && (
                      <a
                        href={
                          selectedONG.social.website.startsWith("http")
                            ? selectedONG.social.website
                            : `https://${selectedONG.social.website}`
                        }
                        target="_blank"
                        rel="noreferrer"
                      >
                         Website
                      </a>
                    )}

                    {selectedONG.social?.instagram && (
                      <a
                        href={`https://instagram.com/${selectedONG.social.instagram.replace("@", "")}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                         Instagram
                      </a>
                    )}
                  </div>

                  <button
                    className="btn-secondary"
                    onClick={() => setSelectedONG(null)}
                  >
                    Fechar
                  </button>

                </div>
              </div>
            )}

          </div>
        )}
      </div>
    </div>
  );
}
