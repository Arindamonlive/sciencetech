import React, { useEffect, useState } from "react";

const CurrentYear = () => {
  // ✅ ONLY reliable way without media queries
  const isMobile = window.innerWidth <= 768;

  const slides = [
    "/currentyearassests/slide1.jpeg",
    "/currentyearassests/slide2.jpeg"
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setIndex((p) => (p + 1) % slides.length);
    }, 4500);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={styles.page}>

      {/* HEADER */}
      <div style={styles.heroHeader}>
        <h1 style={styles.heroTitle}>Academic Year 2025–26</h1>
        <p style={styles.heroSubtitle}>
          Official Invitation & Academic Communication
        </p>
      </div>

      {/* HERO SECTION */}
      <section style={styles.hero}>
        <div style={styles.heroSplit}>

          {/* Brochure */}
          <div
            style={{
              ...styles.fullMedia,
              backgroundImage: "url('/currentyearassests/2026bro.jpeg')"
            }}
          />

          {/* Video */}
          <div style={styles.fullMedia}>
            <video
              style={styles.videoFill}
              autoPlay
              muted
              loop
              playsInline
            >
              <source
                src="/currentyearassests/video2026.mp4"
                type="video/mp4"
              />
            </video>
          </div>

        </div>
      </section>

      {/* GUIDELINES IMAGE */}
      <section
        style={{
          ...styles.fullImageSection,
          height: isMobile ? "60vh" : "100vh",
          backgroundImage: "url('/currentyearassests/2026guide.jpeg')"
        }}
      />

      {/* GALLERY */}
      <section
        style={{
          ...styles.fullImageSection,
          height: isMobile ? "60vh" : "100vh",
          backgroundImage: `url(${slides[index]})`
        }}
      />

      {/* FOOTER */}
      <footer style={styles.footer}>
        <p style={styles.footerText}>
          For registration and academic queries
        </p>

        <a href="tel:+918335043379" style={styles.footerPhone}>
          +91-8335043379
        </a>

        <span style={{ margin: "0 8px" }}>/</span>

        <a href="tel:+916296842998" style={styles.footerPhone}>
          +91-6296842998
        </a>
      </footer>

    </div>
  );
};

const styles = {
  page: {
    fontFamily: "'Segoe UI', Arial, sans-serif",
    margin: 0
  },

  /* HEADER */
  heroHeader: {
    textAlign: "center",
    padding: "20px",
    backgroundColor: "#ffffff"
  },

  heroTitle: {
    fontSize: "32px",
    fontWeight: "600",
    marginBottom: "6px",
    color: "#0f172a"
  },

  heroSubtitle: {
    fontSize: "16px",
    color: "#475569"
  },

  /* HERO */
  hero: {
    minHeight: "calc(100vh - 120px)",
    display: "flex",
    alignItems: "stretch",
    overflow: "hidden"
  },

  heroSplit: {
    display: "flex",
    width: "100%",
    flexWrap: "wrap"
  },

  /* IMAGE / VIDEO BLOCK */
  fullMedia: {
    flex: "1 1 50%",
    minWidth: "320px",        // desktop = 2 columns, mobile = stack
    minHeight: "50vh",
    backgroundSize: "contain",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundColor: "#000"
  },

  videoFill: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
    backgroundColor: "#000"
  },

  /* FULL IMAGE SECTIONS */
  fullImageSection: {
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat"
  },

  /* FOOTER */
  footer: {
    backgroundColor: "#0f172a",
    color: "#ffffff",
    padding: "40px 20px",
    textAlign: "center"
  },

  footerText: {
    marginBottom: "10px",
    opacity: 0.9
  },

  footerPhone: {
    fontSize: "20px",
    fontWeight: "600",
    color: "#ffffff",
    textDecoration: "none"
  }
};

export default CurrentYear;
