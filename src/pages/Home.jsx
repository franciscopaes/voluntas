import Logo from "../assests/Logo.png";

export default function Home({ navigate }) {
  return (
    <div className="home">
      {/* NAV */}
      <nav className="nav">
        <div className="nav-logo">
          <img src={Logo} alt="Logo" style={{ width: 36 }} />
          <span className="logo-text">Voluntas</span>
        </div>
        <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
          <span className="partner-tag">UNASP</span>
          <span className="partner-tag">IBM</span>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-bg-circle hero-bg-circle-1" />
        <div className="hero-bg-circle hero-bg-circle-2" />

        <h1 className="hero-title">
          O lugar certo,<br />
          <em>na hora certa,</em><br />
          para quem mais precisa.
        </h1>

        <p className="hero-sub">
          Conectamos voluntários e instituições através de inteligência artificial,
          transformando boa vontade em impacto real.
        </p>

        <div className="hero-cards">
          {/* ONG CARD */}
          <div className="path-card blue" onClick={() => navigate("ong")}>
            <div className="card-icon-wrap blue">
              <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
            </div>
            <p className="card-label">Instituição</p>
            <h2 className="card-title">Sou uma ONG</h2>
            <p className="card-desc">
              Cadastre sua instituição, descreva suas necessidades e conecte-se com os voluntários certos.
            </p>
            <div className="card-arrow blue">
              Começar →
            </div>
          </div>

          {/* VOLUNTEER CARD */}
          <div className="path-card green" onClick={() => navigate("volunteer")}>
            <div className="card-icon-wrap green">
              <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
              </svg>
            </div>
            <p className="card-label">Voluntário</p>
            <h2 className="card-title">Quero ajudar</h2>
            <p className="card-desc">
              Diga-nos suas habilidades e disponibilidade. A IA encontra a oportunidade ideal para você.
            </p>
            <div className="card-arrow green">
              Encontrar causa →
            </div>
          </div>
        </div>
      </section>


      {/* FOOTER */}
      <footer className="home-footer">
        <p className="footer-text">
          © 2026 Voluntas · Hackathon UNASP 2026
        </p>
        <div className="footer-partners">
          <span className="partner-tag">UNASP</span>
          <span className="partner-tag">IBM</span>
        </div>
      </footer>
    </div>
  );
}
