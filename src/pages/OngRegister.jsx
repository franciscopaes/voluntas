import { useState } from "react";
import Logo from "../assests/logo.png";

const CAUSE_AREAS = [
  "Assistência social", "Educação", "Saúde", "Meio ambiente",
  "Alimentação", "Moradia", "Infância", "Idosos", "Pessoas com deficiência",
  "Desastres naturais", "Refúgio e migração", "Violência doméstica"
];

export default function OngRegister({ navigate }) {
  const [form, setForm] = useState({
    name: "", cnpj: "", mission: "", address: "", city: "", state: "",
    phone: "", email: "", website: "", responsible: "", role: "",
    causes: [], needs: "", volunteers_needed: "", urgency: "normal",
    description: ""
  });
  const [submitted, setSubmitted] = useState(false);

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }));

  const toggleCause = (c) => {
    set("causes", form.causes.includes(c)
      ? form.causes.filter(x => x !== c)
      : [...form.causes, c]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="form-page">
      {/* NAV */}
      <nav className="nav">
        <div className="nav-logo" onClick={() => navigate("home")}>
          <img src={Logo} alt="Logo" style={{ width: 32 }} />
          <span className="logo-text">Voluntas</span>
        </div>
        <button className="nav-back" onClick={() => navigate("home")}>
          ← Voltar
        </button>
      </nav>

      <div className="form-container">
        <div className="form-header fade-up">
          <p className="form-eyebrow">Para Instituições</p>
          <h1 className="form-title">Cadastro de ONG</h1>
          <p className="form-subtitle">
            Conte-nos sobre sua instituição e necessidades. Nossa IA conectará você
            com os voluntários mais preparados para sua causa.
          </p>
        </div>

        {submitted && (
          <div className="success-banner fade-up">
            <div className="success-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5A8A6A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <div>
              <p className="success-title">Cadastro enviado com sucesso!</p>
              <p className="success-text">
                Nossa equipe analisará as informações e em breve você receberá acesso à plataforma.
                Os primeiros voluntários compatíveis serão sugeridos em até 24h.
              </p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* INSTITUTIONAL INFO */}
          <div className="form-card fade-up-1">
            <p className="form-section-title">Informações institucionais</p>

            <div className="form-group">
              <label>Nome da instituição *</label>
              <input type="text" placeholder="Ex: Associação Coração Aberto" value={form.name}
                onChange={e => set("name", e.target.value)} required />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>CNPJ *</label>
                <input type="text" placeholder="00.000.000/0001-00" value={form.cnpj}
                  onChange={e => set("cnpj", e.target.value)} required />
              </div>
              <div className="form-group">
                <label>Telefone *</label>
                <input type="tel" placeholder="(11) 99999-9999" value={form.phone}
                  onChange={e => set("phone", e.target.value)} required />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>E-mail institucional *</label>
                <input type="email" placeholder="contato@ong.org.br" value={form.email}
                  onChange={e => set("email", e.target.value)} required />
              </div>
              <div className="form-group">
                <label>Site (opcional)</label>
                <input type="url" placeholder="https://suaong.org.br" value={form.website}
                  onChange={e => set("website", e.target.value)} />
              </div>
            </div>

            <div className="form-group">
              <label>Missão da instituição *</label>
              <textarea placeholder="Descreva em poucas frases a missão e valores da sua organização..."
                value={form.mission} onChange={e => set("mission", e.target.value)} required />
            </div>
          </div>

          {/* LOCATION */}
          <div className="form-card fade-up-1">
            <p className="form-section-title">Localização</p>
            <div className="form-group">
              <label>Endereço completo *</label>
              <input type="text" placeholder="Rua, número, bairro" value={form.address}
                onChange={e => set("address", e.target.value)} required />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Cidade *</label>
                <input type="text" placeholder="São Paulo" value={form.city}
                  onChange={e => set("city", e.target.value)} required />
              </div>
              <div className="form-group">
                <label>Estado *</label>
                <select value={form.state} onChange={e => set("state", e.target.value)} required>
                  <option value="">Selecione...</option>
                  {["SP","RJ","MG","RS","PR","SC","BA","CE","PE","GO","DF","AM","PA","MT","MS","RN","PB","AL","SE","PI","MA","TO","RO","AC","AP","RR"].map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* RESPONSIBLE */}
          <div className="form-card fade-up-2">
            <p className="form-section-title">Responsável pelo cadastro</p>
            <div className="form-row">
              <div className="form-group">
                <label>Nome completo *</label>
                <input type="text" placeholder="Maria da Silva" value={form.responsible}
                  onChange={e => set("responsible", e.target.value)} required />
              </div>
              <div className="form-group">
                <label>Cargo / função *</label>
                <input type="text" placeholder="Coordenadora de voluntários" value={form.role}
                  onChange={e => set("role", e.target.value)} required />
              </div>
            </div>
          </div>

          {/* CAUSE AREAS */}
          <div className="form-card fade-up-2">
            <p className="form-section-title">Áreas de atuação</p>
            <div style={{ marginBottom: "0.75rem" }}>
              <label>Selecione as áreas que sua organização atua *</label>
            </div>
            <div className="chips-wrap">
              {CAUSE_AREAS.map(c => (
                <button key={c} type="button"
                  className={`chip ${form.causes.includes(c) ? "selected" : ""}`}
                  onClick={() => toggleCause(c)}>
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* NEEDS */}
          <div className="form-card fade-up-3">
            <p className="form-section-title">Necessidades atuais</p>

            <div className="form-group">
              <label>Descreva as necessidades de voluntariado *</label>
              <textarea
                placeholder="Quais atividades precisam de voluntários? Que habilidades são importantes? Ex: Precisamos de psicólogos para atendimento, professores para reforço escolar..."
                style={{ minHeight: "110px" }}
                value={form.needs} onChange={e => set("needs", e.target.value)} required />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Número de voluntários necessários</label>
                <input type="number" placeholder="Ex: 10" min="1" value={form.volunteers_needed}
                  onChange={e => set("volunteers_needed", e.target.value)} />
              </div>
              <div className="form-group">
                <label>Urgência da necessidade *</label>
                <select value={form.urgency} onChange={e => set("urgency", e.target.value)}>
                  <option value="baixa">Baixa — planejamento de longo prazo</option>
                  <option value="normal">Normal — dentro de alguns meses</option>
                  <option value="alta">Alta — dentro de semanas</option>
                  <option value="critica">Crítica — situação de emergência</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Informações adicionais</label>
              <textarea placeholder="Horários de funcionamento, requisitos especiais, como os voluntários devem se apresentar..."
                value={form.description} onChange={e => set("description", e.target.value)} />
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "0.5rem" }}>
            <button type="submit" className="btn-primary" disabled={submitted}>
              {submitted ? "Cadastro enviado ✓" : "Enviar cadastro →"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
