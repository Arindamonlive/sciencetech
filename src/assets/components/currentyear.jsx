import React, { useEffect, useState } from "react";

const CurrentYear = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

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

      {/* EVENT TEXT */}
<section style={styles.infoSection}>
  <p>
    <strong>ScienceTech Academy</strong>, in association with{" "}
    <strong>Swami Vivekananda Institute of Science & Technology</strong>,
    proudly presents <strong>ScienceTech 2026</strong> — an exciting
    Inter-School <strong>Science Exhibition</strong> &{" "}
    <strong>Technical Debate</strong> designed to ignite curiosity,
    creativity, and scientific temperament among young minds.
  </p>

  <p>
    📅 <strong>Event Date:</strong> 18 April 2026 (Saturday)<br />
    📍 <strong>Venue:</strong> SVIST Campus, Dakshin Gobindapur,
    Sonarpur, Kolkata – 700145
  </p>

  <p><strong>Participants are requested to carefully follow the registration process mentioned below:</strong></p>

  <p>
    🔬 <strong>SCIENCE EXHIBITION</strong><br />
    Students may participate individually or as a team.<br />
    <strong>Registration Details Required:</strong><br />
    • Project Title<br />
    • Team Member 1 (Name & Class)<br />
    • Team Member 2 (Name & Class)<br />
    • Team Member 3 (Optional)<br />
    • Team Member 4 (Optional)<br />
    <em>(Maximum 4 members per team)</em>
  </p>

  <p>
    🎤 <strong>TECHNICAL DEBATE</strong><br />
    Participants may register individually or in a team of two.<br />
    <strong>Registration Details Required:</strong><br />
    • Member 1 (Name & Class)<br />
    • Member 2 (Optional)
  </p>

  <p>
    📲 <strong>Submission of Registration Details</strong><br />
    Kindly send the above details via WhatsApp to:<br />
    📞 8335043379<br />
    📞 6296842998
  </p>

  <p>
    🏆 <strong>Attractive Cash Prizes</strong> | 🆓 <strong>Free Registration</strong><br />
    👩‍🔬👨‍💻 Open for students of <strong>Classes VIII–XII</strong>
  </p>

  <p>
    📞 <strong>WhatsApp / Call for Registration:</strong><br />
    8335043379 | 6296842998 | 9851078629
  </p>

  <p>
    🌐 <strong>Website:</strong> www.sciencetechacademy.in<br />
    📧 <strong>Email:</strong> academysciencetech4@gmail.com
  </p>

  <p style={{ color: "#b91c1c", fontWeight: 600 }}>
    Last Date of Registration: 01 April 2026
  </p>

  <p style={{ fontWeight: 600 }}>
    Join us in celebrating innovation, knowledge, and the spirit of scientific excellence! 🚀
  </p>
</section>


      {/* ROW 1 : VIDEO + INVITATION */}
{/* VIDEO SECTION */}
<section
  style={{
    ...styles.singleImage,
    height: isMobile ? "32vh" : "50vh"
  }}
>
  <video
    style={styles.videoFill}
    autoPlay
    muted
    loop
    playsInline
  >
    <source src="/currentyearassests/video2026.mp4" type="video/mp4" />
  </video>
</section>

{/* INVITATION IMAGE SECTION */}
<section
  style={{
    ...styles.singleImage,
    height: isMobile ? "38vh" : "80vh",
    backgroundImage:
      "url('/currentyearassests/Invitation_Letter.jpg')"
  }}
/>


      {/* GUIDE IMAGE */}
      <section
        style={{
          ...styles.singleImage,
          height: isMobile ? "40vh" : "80vh",
          backgroundImage: "url('/currentyearassests/2026guide.jpeg')"
        }}
      />

      {/* SLIDESHOW */}
      <section
        style={{
          ...styles.singleImage,
          height: isMobile ? "40vh" : "80vh",
          backgroundImage: `url(${slides[index]})`
        }}
      />

      {/* FOOTER */}
      <footer style={styles.footer}>
        <p>For registration and academic queries</p>
        <a href="tel:+918335043379" style={styles.footerPhone}>
          +91-8335043379
        </a>
        <span> / </span>
        <a href="tel:+916296842998" style={styles.footerPhone}>
          +91-6296842998
        </a>
      </footer>

    </div>
  );
};

const styles = {
  page: {
    fontFamily: "'Segoe UI', Arial, sans-serif"
  },

  heroHeader: {
    textAlign: "center",
    padding: "20px"
  },

  heroTitle: {
    fontSize: "32px",
    color: "#0f172a"
  },

  heroSubtitle: {
    color: "#475569"
  },

  infoSection: {
    maxWidth: "1000px",
    margin: "auto",
    padding: "20px",
    lineHeight: "1.7",
    fontSize: "16px",
    color: "#1f2937"
  },

  row: {
    display: "flex",
    width: "100%"
  },

  mediaBlock: {
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundColor: "#ffffff"
  },

  videoFill: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
    backgroundColor: "#ffffff"
  },

  singleImage: {
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundColor: "#f8fafc"
  },

  footer: {
    backgroundColor: "#0f172a",
    color: "#fff",
    padding: "30px",
    textAlign: "center"
  },

  footerPhone: {
    color: "#fff",
    fontWeight: "600",
    textDecoration: "none"
  }
};

export default CurrentYear;
