'use client';
import React, { useState, useEffect, useRef, useMemo } from 'react';
import Link from 'next/link';

// ==========================================================
// 1. THE ARCHITECT RENDERER (Supports All 7 References)
// ==========================================================
const PortfolioRenderer = ({ template, data, onEdit, onExit }) => {
 const handleExport = () => {
    // Har template ka CSS aur HTML structure alag hoga
    const templateStyles = {
      titan: "body { background: #0a0a0a; color: #f0ece4; font-family: sans-serif; }",
      aura: "body { background: #0a0a0a; color: #f0ece3; font-family: monospace; }",
      ritz: "body { background: #0d0d0d; color: #f2f0eb; font-family: 'Manrope', sans-serif; }",
      lynn: "body { background: #f4ede0; color: #1a1208; font-family: serif; }"
    };

    const fullCode = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${data.userName}'s Portfolio</title>
  <style>
    ${templateStyles[template] || ""}
    .container { padding: 50px; }
    h1 { font-size: 3rem; }
  </style>
</head>
<body>
  <div class="container">
    <h1>${data.userName}</h1>
    <p>${data.heroTagline}</p>
    <hr>
    <h2>About</h2>
    <p>${data.aboutBio}</p>
  </div>
</body>
</html>`;

    const blob = new Blob([fullCode], { type: 'text/html' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${data.userName.replace(/\s+/g, '-')}-${template}.html`;
    link.click();
  };
const FloatingTools = () => (
    <div style={{ position: 'fixed', top: '30px', right: '30px', zIndex: 4000, display: 'flex', gap: '10px' }}>
      <button onClick={onEdit} style={toolBtn}>✏️ Edit</button>
      {/* Label badal kar 'Get Code' kar diya gaya hai */}
      <button onClick={handleExport} style={{...toolBtn, background: '#6366f1'}}>📄 Get Code</button>
      <button onClick={onExit} style={{...toolBtn, background: '#fff', color: '#000'}}>✕ Exit</button>
    </div>
  );

  // --- 1. TITAN TEMPLATE (Agustin Burgos Style) ---
  if (template === 'titan') {
    return (
      <div style={{ backgroundColor: '#0a0a0a', color: '#f0ece4', fontFamily: "'DM Sans', sans-serif", minHeight: '100vh' }}>
        <FloatingTools />
        
        {/* Hero Section */}
        <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'flex-end', padding: '0 3rem 5rem', position: 'relative' }}>
          <div style={{ width: '100%', zIndex: 1 }}>
            <h1 style={{ fontSize: 'clamp(5rem, 12vw, 12rem)', fontWeight: '900', lineHeight: '0.9', margin: 0 }}>
              {data.userName.split(' ')[0]}<br />
              <span style={{ fontStyle: 'italic', color: '#d4ff5e' }}>{data.userName.split(' ')[1] || 'DEV'}</span>
            </h1>
            <p style={{ maxWidth: '500px', marginTop: '2rem', color: '#888' }}>{data.heroTagline}</p>
          </div>
        </section>

        {/* Projects Section with AI Image Support */}
        <section style={{ padding: '5rem 3rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div style={{ 
              background: data.proj1Image ? `url(${data.proj1Image})` : '#111', 
              backgroundSize: 'cover', 
              backgroundPosition: 'center',
              height: '400px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              borderRadius: '20px',
              border: '1px solid #222'
            }}>
              <h3 style={{ fontSize: '2rem', background: 'rgba(0,0,0,0.5)', padding: '10px 20px', borderRadius: '10px' }}>{data.proj1Title}</h3>
            </div>
            {/* Project 2 placeholder */}
            <div style={{ background: '#111', height: '400px', borderRadius: '20px', border: '1px solid #222' }}></div>
          </div>
        </section>
      </div>
    );
  }
else if (template === 'aura') {
    return (
      <div className="aura-wrapper" style={{ 
        '--bg': '#0a0a0a', '--fg': '#f0ece3', '--accent': '#e8d5b0', '--muted': '#555',
        backgroundColor: 'var(--bg)', color: 'var(--fg)', fontFamily: "'DM Mono', monospace",
        minHeight: '100vh', overflowX: 'hidden', position: 'relative'
      }}>
        <FloatingTools />
        
        {/* The Particle Canvas and Cursor from your code */}
        <AuraInteractiveLayer />

        {/* Noise Overlay */}
        <div style={{
          position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 999, opacity: 0.04,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`
        }} />

        <div style={{ position: 'relative', zIndex: 10 }}>
          {/* HERO SECTION */}
          <section style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '5vw 6vw 6vw' }}>
            <div>
              <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(80px, 17vw, 220px)', lineHeight: '0.88', display: 'block' }}>
                {data.userName.split(' ')[0].toUpperCase()}
              </span>
              <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(80px, 17vw, 220px)', lineHeight: '0.88', display: 'block' }}>
                {data.userName.split(' ')[1]?.toUpperCase() || 'CREATIVE'}
              </span>
            </div>
            <div style={{ marginTop: '32px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px 40px', maxWidth: '600px' }}>
              <span style={{ fontSize: '11px', letterSpacing: '0.15em', color: 'var(--muted)', textTransform: 'lowercase' }}>{data.role}</span>
              <a href={`mailto:${data.email}`} style={{ fontSize: '11px', letterSpacing: '0.15em', color: 'var(--accent)', textDecoration: 'none' }}>{data.email}</a>
            </div>
          </section>

          {/* PROJECTS SECTION */}
          <section style={{ padding: '10vw 6vw', borderTop: '1px solid #1a1a1a' }}>
            <div style={{ fontSize: '10px', letterSpacing: '0.3em', color: 'var(--muted)', textTransform: 'uppercase', marginBottom: '80px' }}>Selected Work</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '40px', padding: '48px 0', borderTop: '1px solid #1c1c1c' }}>
              <div style={{ fontSize: '10px', color: 'var(--muted)' }}>01</div>
              <div>
                <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(28px, 4vw, 52px)', color: 'var(--fg)', marginBottom: '16px' }}>{data.proj1Title.toUpperCase()}</h2>
                <p style={{ fontSize: '12px', lineHeight: '1.8', color: 'var(--muted)', maxWidth: '520px' }}>{data.proj1Desc}</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }
  // --- 2. FUTURE TEMPLATES (Aura, Tech etc.) ---
  // Yahan hum else if karke naye templates add karenge

// --- 3. MORGAN TEMPLATE (Agency / High-Contrast Style) ---
  else if (template === 'morgan') {
    return (
      <div style={{ 
        backgroundColor: '#0d0d0d', color: '#f2f0eb', fontFamily: "'Manrope', sans-serif",
        minHeight: '100vh', position: 'relative', overflowX: 'hidden'
      }}>
        <FloatingTools />
        
        {/* Custom Lerp Cursor & Counters logic */}
        <MorganInteractiveLayer />

        {/* Noise Overlay from your code */}
        <div style={{
          position: 'fixed', inset: 0, opacity: 0.035, pointerEvents: 'none', zIndex: 9998,
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`
        }} />

        {/* HERO SECTION */}
        <section style={{ minHeight: '100vh', padding: '160px 40px 80px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', borderBottom: '1px solid #1e1e1e' }}>
          <div id="hero-counter" style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(80px, 20vw, 240px)', fontWeight: 800, color: '#f2f0eb', opacity: 0.1, position: 'absolute', top: '50%', transform: 'translateY(-50%)', zIndex: 0 }}>000</div>
          
          <div style={{ position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', alignItems: 'end' }}>
            <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(42px, 7vw, 92px)', fontWeight: 800, lineHeight: 0.9 }}>
              {data.userName.split(' ')[0]}<br/>{data.userName.split(' ')[1]}
            </h1>
            <p style={{ fontSize: '15px', color: '#666', maxWidth: '440px', lineHeight: 1.75 }}>
              {data.heroTagline}
            </p>
          </div>
        </section>

        {/* MARQUEE SECTION */}
        <div style={{ overflow: 'hidden', background: '#111', padding: '18px 0', borderBottom: '1px solid #1e1e1e' }}>
          <div className="marquee-track" style={{ display: 'flex', gap: '40px', whiteSpace: 'nowrap' }}>
             {/* We repeat the skills here for the marquee effect */}
             {["UX", "Shopify", "React", "Next.js", "UI", "SEO"].map((skill, i) => (
               <span key={i} style={{ fontFamily: "'Syne', sans-serif", fontSize: '13px', fontWeight: 600, letterSpacing: '0.25em', color: '#666' }}>{skill.toUpperCase()}</span>
             ))}
          </div>
        </div>

        {/* PROJECT SECTION */}
        <section style={{ padding: '120px 40px' }}>
           <p style={{ color: '#c8ff47', fontSize: '11px', letterSpacing: '0.3em', fontWeight: 600 }}>PORTFOLIO</p>
           <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 800 }}>Featured Work</h2>
           
           <div style={{ marginTop: '64px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div style={{ background: '#141414', border: '1px solid #1e1e1e', height: '400px', padding: '40px', position: 'relative' }}>
                <span style={{ color: '#c8ff47', position: 'absolute', top: '20px', right: '20px' }}>01</span>
                <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: '22px' }}>{data.proj1Title}</h3>
                <p style={{ color: '#666', marginTop: '10px' }}>{data.proj1Desc}</p>
              </div>
           </div>
        </section>
      </div>
    );
  }
  // --- 4. TECH TEMPLATE (Carl Gordon Style) ---
  else if (template === 'tech') {
    return (
      <div style={{ backgroundColor: '#fff', color: '#000', fontFamily: "'Inter', sans-serif", minHeight: '100vh' }}>
        <FloatingTools />
        
        <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '40px 60px', borderBottom: '1px solid #eee' }}>
          <span style={{ fontWeight: '700' }}>{data.userName.toUpperCase()}</span>
          <span>{data.role}</span>
        </nav>

        <section style={{ padding: '120px 60px', maxWidth: '1200px' }}>
          <h1 style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', fontWeight: '800', lineHeight: '1.1', letterSpacing: '-0.04em' }}>
            {data.heroTagline}
          </h1>
          <p style={{ fontSize: '1.5rem', color: '#666', marginTop: '40px' }}>{data.aboutBio}</p>
        </section>

        <section style={{ padding: '0 60px 100px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px' }}>
            <div style={{ borderTop: '2px solid #000', paddingTop: '30px' }}>
              <h3 style={{ fontSize: '2.5rem' }}>{data.proj1Title}</h3>
              <p style={{ color: '#444' }}>{data.proj1Desc}</p>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // --- 5. RITZ TEMPLATE (Ryan Style + Your Original Effects) ---
  else if (template === 'ritz') {
    return (
      <div style={{ 
        backgroundColor: '#0d0d0d', color: '#f2f0eb', fontFamily: "'Manrope', sans-serif",
        minHeight: '100vh', position: 'relative', overflowX: 'hidden'
      }}>
        <FloatingTools />
        
        {/* 1. YOUR CUSTOM CURSOR (Dot + Ring) */}
        <MorganInteractiveLayer />

        {/* 2. YOUR NOISE OVERLAY */}
        <div style={{
          position: 'fixed', inset: 0, opacity: 0.035, pointerEvents: 'none', zIndex: 9998,
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`
        }} />

        {/* 3. HERO WITH COUNTER EFFECT */}
        <section style={{ minHeight: '100vh', padding: '160px 40px 80px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', borderBottom: '1px solid #1e1e1e', position: 'relative' }}>
          <div id="hero-counter" style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(80px, 20vw, 240px)', fontWeight: 800, color: '#f2f0eb', opacity: 0.05, position: 'absolute', top: '50%', left: '40px', transform: 'translateY(-50%)', zIndex: 0, pointerEvents: 'none' }}>000</div>
          
          <div style={{ position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', alignItems: 'end' }}>
            <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(42px, 7vw, 92px)', fontWeight: 800, lineHeight: 0.9, letterSpacing: '-0.03em' }}>
              {data.userName.split(' ')[0]}<br/>
              <span style={{ color: 'transparent', WebkitTextStroke: '1px #f2f0eb' }}>{data.userName.split(' ')[1] || 'CREATIVE'}</span>
            </h1>
            <p style={{ fontSize: '15px', color: '#666', maxWidth: '440px', lineHeight: 1.75 }}>
              {data.heroTagline}
            </p>
          </div>
        </section>

        {/* 4. YOUR MARQUEE TRACK */}
        <div style={{ overflow: 'hidden', background: '#111', padding: '18px 0', borderBottom: '1px solid #1e1e1e' }}>
          <div style={{ display: 'flex', gap: '40px', animation: 'marquee 20s linear infinite' }}>
            {["UX", "Shopify", "Next.js", "React", "UI", "API"].map((tag, i) => (
              <span key={i} style={{ fontFamily: "'Syne', sans-serif", fontSize: '13px', fontWeight: 600, letterSpacing: '0.25em', color: '#666', textTransform: 'uppercase' }}>{tag}</span>
            ))}
          </div>
        </div>

        {/* 5. YOUR CARDS & HOVER EFFECTS */}
        <section style={{ padding: '120px 40px' }}>
          <div style={{ fontSize: '11px', letterSpacing: '0.3em', color: '#c8ff47', fontWeight: 600, marginBottom: '16px' }}>SELECTED WORK</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '40px', padding: '48px 0', borderTop: '1px solid #1c1c1c' }}>
             <div style={{ fontSize: '10px', color: '#555' }}>01</div>
             <div className="project-card-ritz" style={{ cursor: 'pointer' }}>
                <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(28px, 4vw, 52px)', marginBottom: '16px', transition: 'color 0.3s' }}>{data.proj1Title.toUpperCase()}</h2>
                <p style={{ fontSize: '14px', lineHeight: '1.8', color: '#666', maxWidth: '520px' }}>{data.proj1Desc}</p>
             </div>
          </div>
        </section>

        {/* CSS for animations (Paste in global styles or jsx) */}
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .project-card-ritz:hover h2 { color: #c8ff47 !important; }
        `}} />
      </div>
    );
  }
  // --- 6. LYNN TEMPLATE (Editorial / Paper Style) ---
  else if (template === 'lynn') {
    return (
      <div className="lynn-app" style={{ 
        backgroundColor: '#f4ede0', color: '#1a1208', fontFamily: "'EB Garamond', serif",
        minHeight: '100vh', position: 'relative', overflowX: 'hidden'
      }}>
        <FloatingTools />
        
        {/* Paper / dust noise texture overlay */}
        <div style={{
          position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 9999, opacity: 0.06,
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`
        }} />

        <div style={{ width: '436px', margin: '0 auto', padding: '0 24px', display: 'flex', flexDirection: 'column' }}>
          {/* Chapter header */}
          <header style={{ padding: '2.8rem 0 1.8rem', borderBottom: '1px solid #c8b89a', marginBottom: '2.2rem' }}>
            <span style={{ fontSize: '0.72rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#b8a080', display: 'block' }}>CH. I</span>
            <h1 style={{ fontFamily: "'Cormorant SC', serif", fontSize: '3rem', fontWeight: 700, margin: 0 }}>{data.userName.split(' ')[0]}</h1>
          </header>

          {/* Bio Section */}
          <section style={{ marginBottom: '2.2rem' }}>
            <p style={{ fontSize: '1.05rem', lineHeight: '1.8', marginBottom: '1.1em' }}>{data.aboutBio}</p>
          </section>

          {/* Project Section */}
          <section style={{ marginBottom: '2.8rem' }}>
            <h2 style={{ fontFamily: "'Cormorant SC', serif", fontSize: '1.35rem', borderBottom: '1px solid #c8b89a', paddingBottom: '0.45rem', marginBottom: '1.1rem' }}>Selected Work</h2>
            <div style={{ padding: '0.48rem 0', borderBottom: '1px dotted #c8b89a' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: '500' }}>{data.proj1Title}</h3>
              <p style={{ fontSize: '0.9rem', color: '#6b5c45', marginTop: '5px' }}>{data.proj1Desc}</p>
            </div>
          </section>

          {/* Social Footer */}
          <footer style={{ padding: '1.8rem 0', borderTop: '1px solid #c8b89a', marginTop: 'auto' }}>
            <div style={{ display: 'flex', gap: '20px' }}>
              <a href={`mailto:${data.email}`} style={{ color: '#8b1a1a', fontSize: '0.9rem' }}>Email</a>
              <a href={data.Linkdeln} style={{ color: '#8b1a1a', fontSize: '0.9rem' }}>LinkedIn</a>
            </div>
          </footer>
        </div>

        {/* CSS for Google Fonts specific to this template */}
        <style dangerouslySetInnerHTML={{ __html: `
          @import url('https://fonts.googleapis.com/css2?family=Cormorant+SC:wght@600;700&family=EB+Garamond:wght@400;500&display=swap');
        `}} />
      </div>
    );
  }

  return (
    <div style={{ padding: '100px', textAlign: 'center' }}>
      <FloatingTools />
      <h2>Template not found. Please select Titan.</h2>
    </div>
  );
};

// ==========================================================
// 2. MAIN PLATFORM (Landing Page + Master AI Editor)
// ==========================================================
export default function PortfolioLAB() {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [typewriter, setTypewriter] = useState("");
  const [index, setIndex] = useState(0);
  const fullText = "Build your own portfolio";

  const [userData, setUserData] = useState({
    userName: "Lakshita Nahar",
    role: "Product Designer & CSE Student",
    heroTagline: "Designing meaningful digital experiences and building innovative tech-driven projects.",
    aboutBio: "I am a Computer Science Engineering student with a strong interest in Product Design and UI/UX.",
    proj1Title: "Portfolio Builder Website",
    proj1Desc: "A modern platform that allows users to create professional portfolios effortlessly.",
    proj1Process: "Initial research and wireframing followed by high-fidelity prototyping in Figma.",
proj1Tools: ["Figma", "Spline", "React"],
    proj2Title: "Godzilla Perfume UI",
    proj2Desc: "Branding and UI/UX project focused on premium visual design.",
    contactHeading: "Let's collaborate and create something impactful.",
    email: "lakshitanahar193@gmail.com",
    Linkdeln:"https://www.linkedin.com/in/lakshita-nahar-0916002b6",
    footerText: "© 2026 PortfolioLAB by Lakshita Nahar."
  });

  useEffect(() => {
    if (index < fullText.length) {
      const timer = setTimeout(() => {
        setTypewriter((prev) => prev + fullText[index]);
        setIndex(index + 1);
      }, 80);
      return () => clearTimeout(timer);
    }
  }, [index]);
  


  const enhanceWithAI = () => {
    setAiLoading(true);
    setTimeout(() => {
      setUserData(prev => ({
        ...prev,
        aboutBio: "A visionary Product Designer and CSE student focused on bridging high-scale automation with aesthetic UI systems, dedicated to transforming complex engineering problems into elegant digital narratives."
      }));
      setAiLoading(false);
    }, 1200);
  };

  

  const generateAiImage = () => {
    setAiLoading(true);
    setTimeout(() => {
      const randomId = Math.floor(Math.random() * 1000);
      const aiGeneratedUrl = `https://picsum.photos/seed/${randomId}/800/600`;
      
      setUserData(prev => ({
        ...prev,
        proj1Image: aiGeneratedUrl 
      }));
      
      setAiLoading(false);
    }, 1200);
  };
  //for live 
  const [isPublished, setIsPublished] = useState(false);

const handlePublish = () => {
  setIsPublished(true);
  alert(`Congrats! Your portfolio is live at: portfolio-lab.com/${userData.userName.replace(/\s+/g, '-').toLowerCase()}`);
};

  if (selectedTemplate) {
    return (
      <>
        {isEditing && (
          <div style={sidebarStyle}>
             <h2 style={{ marginBottom: '20px' }}>Master Editor ✨</h2>
             <div style={{ overflowY: 'auto', height: '75vh', paddingRight: '10px' }}>
                <label style={labelStyle}>User Name</label>
                <input style={inputStyle} value={userData.userName} onChange={(e) => setUserData({...userData, userName: e.target.value})} />
                
                <label style={labelStyle}>Role</label>
                <input style={inputStyle} value={userData.role} onChange={(e) => setUserData({...userData, role: e.target.value})} />

                <label style={labelStyle}>Hero Tagline</label>
                <textarea style={inputStyle} value={userData.heroTagline} onChange={(e) => setUserData({...userData, heroTagline: e.target.value})} />

                <label style={labelStyle}>Bio Summary</label>
                <div style={{position:'relative'}}>
                   <textarea style={{...inputStyle, height:'120px'}} value={userData.aboutBio} onChange={(e) => setUserData({...userData, aboutBio: e.target.value})} />
                   <button onClick={enhanceWithAI} style={aiActionBtn}>{aiLoading ? "Thinking..." : "✨ AI Enhance"}</button>
                </div>
                {/* ✨ AI IMAGE GENERATOR SECTION */}
<div style={{ marginTop: '25px', borderTop: '1px solid #eee', paddingTop: '20px' }}>
  <label style={labelStyle}>✨ Generate Project Image (AI)</label>
  <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
    <input 
      placeholder="e.g. 3D perfume bottle, neon glass..." 
      style={{ ...inputStyle, marginBottom: 0, flex: 1 }} 
      id="ai-image-prompt"
    />
    <button 
      onClick={() =>("PortfolioLAB AI: Generating your custom 3D visual...")}
      style={{ 
        padding: '0 15px', 
        background: '#6366f1', 
        color: '#fff', 
        border: 'none', 
        borderRadius: '10px', 
        cursor: 'pointer',
        fontSize: '1.2rem' 
      }}
    >
      🪄
    </button>
  </div>
  <p style={{ fontSize: '0.65rem', color: '#888', marginTop: '8px', lineHeight: '1.4' }}>
    Describe any object or style to generate unique high-end graphics for your project cards.
  </p>
</div>

                <label style={labelStyle}>Project 1 Title</label>
                <input style={inputStyle} value={userData.proj1Title} onChange={(e) => setUserData({...userData, proj1Title: e.target.value})} />

                <label style={labelStyle}>Footer Text</label>
                <input style={inputStyle} value={userData.footerText} onChange={(e) => setUserData({...userData, footerText: e.target.value})} />
             </div>
             <button onClick={() => setIsEditing(false)} style={saveBtn}>Save & Apply Changes</button>
             {/* Sidebar ke bilkul niche "Publish" button */}
<button onClick={() => setIsEditing(false)} style={saveBtn}>Save & Apply Changes</button>

<button 
  onClick={handlePublish} 
  style={{ ...saveBtn, marginTop: '10px', background: '#000', border: '1px solid #333' }}
>
  🚀 Publish Live
</button>
          </div>
          
        )}
        <PortfolioRenderer template={selectedTemplate} data={userData} onEdit={() => setIsEditing(true)} onExit={() => setSelectedTemplate(null)} />
      </>
    );
  }

  return (
    <div style={{ backgroundColor: '#000', color: '#fff', fontFamily: 'sans-serif' }}>
      
      {/* NAVBAR */}
      <nav style={navStyle}>
        <div style={{ fontWeight: 'bold', fontSize: '1.4rem' }}>Portfolio<span style={{ color: '#10b981' }}>LAB</span></div>
        <div style={{ display: 'flex', gap: '30px' }}>
          <a href="#home" style={navLink}>Home</a>
          <a href="#about" style={navLink}>About</a>
          <a href="#services" style={navLink}>Services</a>
          <a href="#contact" style={navLink}>Contact</a>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section id="home" style={{ height: '80vh', display: 'flex', flexDirection:'column', justifyContent: 'center', alignItems: 'center', textAlign:'center', padding:'0 20px' }}>
        <h1 style={{ fontSize: '5rem', fontWeight: 'bold', marginBottom:'20px' }}>{typewriter}
         <span className="cursor-blink">|</span> </h1>
        <p className="glitch-text"
    style={{
      fontSize: '1.125rem',
      color: '#d1d5db',
      margin: '1.5rem auto 0',
      cursor: 'pointer',
      transition: 'all 0.3s' ,
  maxWidth: '1000px', 
  lineHeight: '1.85', 
  fontWeight: '1000',
  marginTop: '20px' 
}}>
  Create, customize, and publish a powerful digital portfolio that showcases 
  your projects, skills, and creativity in a modern, user-friendly, and 
  visually engaging way all in one seamless platform.
</p>
      </section>

      {/* AI PROMPT GEN */}
      <section style={{ padding: '0 50px 100px', maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
        <div style={{ background: '#111', padding: '40px', borderRadius: '30px', border: '1px solid #333' }}>
          <h2 style={{ marginBottom: '20px' }}>Build with AI ✨</h2>
          <div style={{ display: 'flex', gap: '10px' }}>
            <input placeholder="e.g. A minimalist designer portfolio" style={{ flex: 1, padding: '15px', borderRadius: '12px', background: '#000', border: '1px solid #444', color: '#fff' }} />
            <button onClick={() => setSelectedTemplate('titan')} style={{ padding: '15px 30px', background: '#10b981', border: 'none', borderRadius: '12px', color: '#fff', fontWeight: 'bold', cursor:'pointer' }}>Generate</button>
          </div>
        </div>
      </section>
      

      {/* ABOUT PLATFORM */}
      <section id="about" style={sectionPadding}>
        <h2 style={{ color: '#10b981', fontSize: '3rem', marginBottom: '30px' }}>About Our Platform</h2>
        <p style={{ fontSize: '1.2rem', color: '#ccc', lineHeight: '1.8', maxWidth: '900px' }}>
          Our Portfolio Builder is a modern platform designed to help students, designers, and developers create professional and visually engaging portfolios with ease. We understand that building a portfolio from scratch can be time-consuming and technically challenging, especially for beginners. This platform simplifies the entire process by providing customizable layouts, structured project sections, and an intuitive interface that allows users to showcase their work, skills, and achievements in a clear and impactful way. By combining simplicity, creativity, and functionality, the goal is to empower creators to build a strong digital presence and present their journey confidently in today’s competitive world. </p>
      </section>

      {/* SERVICES */}
<section id="services" style={sectionPadding}>
  <h2 style={{ fontSize: '3rem', marginBottom: '50px' }}>What We Offer</h2>
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
    
    <ServiceCard 
      title="Easy Portfolio Creation" 
      desc="Create stunning portfolios without coding complexity." 
    />
    
    <ServiceCard 
      title="Modern Templates" 
      desc="Access clean designs for creators and students." 
    />
    
    <ServiceCard 
      title="Quick Publishing" 
      desc="Launch and share instantly with a unique link." 
    />

  </div>
</section>

      {/* GALLERY GRID */}
      <section style={sectionPadding}>
        <h2 style={{ fontSize: '3rem', textAlign: 'center', marginBottom: '60px' }}>Choose a Persona</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px' }}>
          <TemplateCard name="Titan (Agustin Burgos)" color="#111" onSelect={() => setSelectedTemplate('titan')} />
          <TemplateCard name="Aura (Cory Hughart)" color="#0e1111" onSelect={() => setSelectedTemplate('aura')} />
          <TemplateCard name="Tech (Carl Gordon)" color="#fff" onSelect={() => setSelectedTemplate('tech')} />
            <TemplateCard name="Ritz (Ryan Style)" color="#0d0d0d" onSelect={() => setSelectedTemplate('ritz')} />
              <TemplateCard 
  name="Lynn (Editorial Style)" 
  color="#f4ede0" 
  onSelect={() => setSelectedTemplate('lynn')} 
/>
        </div>
      </section>
      <AestheticShowcase /> {/* ✨ Sirf ye line yahan rahegi */}

      {/* CONTACT */}
      <section id="contact" style={sectionPadding}>
        <h2 style={{ fontSize: '3rem', marginBottom: '40px' }}>Get in Touch</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px' }}>
           <div>
             <p>Have questions? We’d love to hear from you.</p>
             <p style={{marginTop:'20px'}}><strong>Email:</strong> lakshitanahar193@gmail.com</p>
             <div style={{marginTop:'30px'}}>
               <a href="https://www.linkedin.com/in/lakshita-nahar-0916002b6" style={{color:'#10b981', textDecoration:'none', marginRight:'20px'}}>LinkedIn</a>
               <a href="https://github.com/lakshitanahar" style={{color:'#10b981', textDecoration:'none'}}>GitHub</a>
             </div>
           </div>
           <form style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <input placeholder="Name" style={inputStyle} />
              <input placeholder="Email" style={inputStyle} />
              <textarea placeholder="Message" style={{...inputStyle, height: '120px'}} />
              <button type="button" style={saveBtn}>Send Message</button>
           </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={footerStyle}>
        <div>
          <h3>PortfolioLAB</h3>
          <p style={{color:'#666'}}>Turn your projects into a powerful portfolio.</p>
        </div>
        <div style={{textAlign:'right'}}>
          <p>© 2026 Portfolio Builder by Lakshita Nahar.</p>
        </div>
      </footer>

      <style jsx global>{`
      .cursor-blink {
    color: #10b981;
    margin-left: 4px;
    animation: blink 1s step-end infinite;
        @keyframes glow {
          0%, 100% { text-shadow: 0 0 10px #10b981, 0 0 20px #10b981; }
          50% { text-shadow: 0 0 5px #10b981, 0 0 10px #10b981; }
        }
        /* ✨ Glitch Effect Styles */
 .glitch-text:hover {
      animation: glitch-anim 0.2s infinite linear;
      text-shadow: 2px 0 #00ffea, -2px 0 #ff0055;
      color: #fff;
    }
    @keyframes glitch-anim {
      0% { transform: translate(0); }
      20% { transform: translate(-2px, 2px); }
      40% { transform: translate(-2px, -2px); }
      60% { transform: translate(2px, 2px); }
      80% { transform: translate(2px, -2px); }
      100% { transform: translate(0); }
    }
      `}</style>
    </div>
  );
}

// HELPER STYLES
const navStyle = { display: 'flex', justifyContent: 'space-between', padding: '25px 50px', position: 'fixed', width: '100%', top: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(10px)', zIndex: 1000, boxSizing: 'border-box' };
const navLink = { color: '#888', textDecoration: 'none', fontSize: '0.9rem' };
const subheadingStyle = { fontSize: '1.2rem', color: '#10b981', maxWidth: '800px', lineHeight: '1.6', fontWeight: '500' };
const sectionPadding = { padding: '100px 50px', maxWidth: '1200px', margin: '0 auto' };
const sidebarStyle = { position: 'fixed', right: 0, top: 0, width: '380px', height: '100vh', background: '#fff', color: '#000', padding: '40px', zIndex: 5000, boxShadow: '-10px 0 30px rgba(0,0,0,0.1)' };
const inputStyle = { width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '10px', marginBottom: '15px' };
const labelStyle = { display: 'block', fontSize: '0.7rem', fontWeight: 'bold', color: '#999', marginBottom: '5px' };
const saveBtn = { width: '100%', padding: '15px', background: '#10b981', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer' };
const cardStyle = { padding: '40px', background: '#111', borderRadius: '25px', border: '1px solid #222' };
const toolBtn = { padding: '10px 20px', background: '#10b981', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' };
const projCard = { padding: '40px', border: '1px solid #333', borderRadius: '20px' };
const aiActionBtn = { position: 'absolute', bottom: '10px', right: '10px', background: '#000', color: '#10b981', border: '1px solid #10b981', padding: '5px 10px', borderRadius: '6px', fontSize: '0.7rem', cursor: 'pointer' };
const primaryBtn = { padding: '15px 35px', background: '#10b981', color: '#fff', border: 'none', borderRadius: '50px', fontWeight: 'bold' };
const secondaryBtn = { padding: '15px 35px', background: 'transparent', color: '#fff', border: '1px solid #444', borderRadius: '50px' };
const footerStyle = { padding: '80px 50px', borderTop: '1px solid #222', display: 'flex', justifyContent: 'space-between', alignItems: 'center' };

function TemplateCard({ name, color, onSelect }) {
  return (
    <div style={{ background: '#0d0d0d', padding: '30px', borderRadius: '30px', border: '1px solid #222' }}>
      <div style={{ height: '200px', background: color, borderRadius: '15px', marginBottom: '20px', border: '1px solid #333' }}></div>
      <h3>{name}</h3>
      <button onClick={onSelect} style={{ width: '100%', marginTop: '20px', padding: '12px', background: '#10b981', color: '#fff', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold' }}>Use Template</button>
    </div>
  );
}
// Is function ko file ke bilkul niche paste karein
function ServiceCard({ title, desc }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        padding: '40px',
        background: isHovered ? 'rgba(16, 185, 129, 0.08)' : '#0d0d0d',
        borderRadius: '25px',
        border: isHovered ? '1px solid #10b981' : '1px solid #222',
        transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        transform: isHovered ? 'translateY(-15px) scale(1.03)' : 'translateY(0)',
        boxShadow: isHovered ? '0 20px 40px rgba(16, 185, 129, 0.25)' : 'none',
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <h3 style={{ color: '#10b981', marginBottom: '15px' }}>{title}</h3>
      <p style={{ color: '#aaa' }}>{desc}</p>
      
      {/* Lumetra Glow Background Effect */}
      {isHovered && (
        <div style={{
          position: 'absolute',
          top: 0, left: 0, width: '100%', height: '100%',
          background: 'radial-gradient(circle at center, rgba(16, 185, 129, 0.15) 0%, transparent 80%)',
          zIndex: -1
        }} />
      )}
    </div>
  );
}
function AuraInteractiveLayer() {
  const canvasRef = React.useRef(null);
  const cursorRef = React.useRef(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const cursor = cursorRef.current;
    let W, H, dots = [], raf, mx = -100, my = -100;

    const DOT_SPACING = 28, DOT_RADIUS = 1.3, INFLUENCE = 140, STRENGTH = 60, SPRING = 0.08, DAMPING = 0.78;

    const handleMouseMove = (e) => {
      mx = e.clientX; my = e.clientY;
      if (cursor) {
        cursor.style.left = `${mx}px`;
        cursor.style.top = `${my}px`;
      }
    };

    const resize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
      dots = [];
      for (let r = 0; r < Math.ceil(H / DOT_SPACING) + 1; r++) {
        for (let c = 0; c < Math.ceil(W / DOT_SPACING) + 1; c++) {
          const ox = c * DOT_SPACING, oy = r * DOT_SPACING;
          dots.push({ ox, oy, x: ox, y: oy, vx: 0, vy: 0 });
        }
      }
    };

    const tick = () => {
      ctx.clearRect(0, 0, W, H);
      dots.forEach(d => {
        const dx = mx - d.ox, dy = my - d.oy, dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < INFLUENCE && dist > 0) {
          const force = (1 - dist / INFLUENCE) * STRENGTH;
          d.vx -= (dx / dist) * force * 0.12; d.vy -= (dy / dist) * force * 0.12;
        }
        d.vx += (d.ox - d.x) * SPRING; d.vy += (d.oy - d.y) * SPRING;
        d.vx *= DAMPING; d.vy *= DAMPING;
        d.x += d.vx; d.y += d.vy;
        const curDist = Math.sqrt((mx - d.x) ** 2 + (my - d.y) ** 2);
        const alpha = curDist < INFLUENCE ? 0.08 + 0.22 * (curDist / INFLUENCE) : 0.3;
        ctx.beginPath();
        ctx.arc(d.x, d.y, DOT_RADIUS + Math.sqrt(d.vx ** 2 + d.vy ** 2) * 0.3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(240, 236, 227, ${alpha})`;
        ctx.fill();
      });
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', resize);
    resize(); tick();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} style={{
        position: 'fixed', width: '10px', height: '10px', background: '#e8d5b0', borderRadius: '50%',
        pointerEvents: 'none', zIndex: 9999, transform: 'translate(-50%, -50%)', transition: 'transform 0.08s ease', mixBlendMode: 'difference'
      }} />
      <canvas ref={canvasRef} style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }} />
    </>
  );
}
function MorganInteractiveLayer() {
  const dotRef = React.useRef(null);
  const ringRef = React.useRef(null);

  React.useEffect(() => {
    let cx = 0, cy = 0, rx = 0, ry = 0;
    
    // Smooth Ring Lerp
    const moveCursor = (e) => {
      cx = e.clientX; cy = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.left = `${cx}px`;
        dotRef.current.style.top = `${cy}px`;
      }
    };

    const animateRing = () => {
      rx += (cx - rx) * 0.12; ry += (cy - ry) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.left = `${rx}px`;
        ringRef.current.style.top = `${ry}px`;
      }
      requestAnimationFrame(animateRing);
    };

    // Hero Counter Logic
    const counter = document.getElementById('hero-counter');
    let currentCount = 0;
    const target = 342;
    const interval = setInterval(() => {
      currentCount += Math.ceil((target - currentCount) * 0.07) || 1;
      if (counter) counter.textContent = currentCount.toString().padStart(3, '0');
      if (currentCount >= target) clearInterval(interval);
    }, 30);

    window.addEventListener('mousemove', moveCursor);
    animateRing();
    return () => {
      window.removeEventListener('mousemove', moveCursor);
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} style={{ position: 'fixed', width: '6px', height: '6px', background: '#c8ff47', borderRadius: '50%', pointerEvents: 'none', zIndex: 9999, transform: 'translate(-50%, -50%)' }} />
      <div ref={ringRef} style={{ position: 'fixed', width: '36px', height: '36px', border: '1px solid rgba(200,255,71,0.35)', borderRadius: '50%', pointerEvents: 'none', zIndex: 9999, transform: 'translate(-50%, -50%)' }} />
    </>
  );
}

// --- YEH SAB KUCH FILE KE BAHAR/NICHE RAHEGA ---

const AestheticShowcase = () => {
  const [isHovered, setIsHovered] = useState(false);
  const noisePositions = useMemo(() => Array.from({ length: 4 }).map(() => `${Math.random()*100}% ${Math.random()*100}%`), []);

  return (
    <section style={showcaseContainer}>
      <div style={{ ...noiseMesh, backgroundPosition: isHovered ? noisePositions[1] : noisePositions[0], opacity: isHovered ? 0.08 : 0.04 }} />
      <div 
        onMouseEnter={() => setIsHovered(true)} 
        onMouseLeave={() => setIsHovered(false)}
        style={{ ...imageWrapper, transform: isHovered ? 'perspective(1000px) scale(1.05) rotateX(1deg)' : 'none' }}
      >
        <img src="https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=2070" style={showcaseImage} />
        <div style={{ ...rotatingText, animation: isHovered ? 'rotateText 6s linear infinite' : 'rotateText 12s linear infinite' }}>
          <svg viewBox="0 0 100 100" style={{ width: '120px', height: '120px' }}><path id="circlePath" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="none" /><text style={{ fill: '#c8ff47', fontSize: '10px', fontWeight: 'bold' }}><textPath href="#circlePath">✨ AI VISUAL / AESTHETIC / KHATARNAAK ✨</textPath></text></svg>
        </div>
      </div>
      <style dangerouslySetInnerHTML={{ __html: `@keyframes rotateText { from { transform: translate(-50%, -50%) rotate(0deg); } to { transform: translate(-50%, -50%) rotate(360deg); } }` }} />
    </section>
  );
};

// Styles
const showcaseContainer = { padding: '100px 20px', textAlign: 'center', position: 'relative', minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#000' };
const imageWrapper = { position: 'relative', width: '100%', maxWidth: '900px', height: '500px', borderRadius: '30px', overflow: 'hidden', transition: 'all 0.6s ease' };
const showcaseImage = { width: '100%', height: '100%', objectFit: 'cover' };
const rotatingText = { position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', pointerEvents: 'none' };
const noiseMesh = { position: 'absolute', inset: 0, backgroundImage: "url('data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27/%3E')", zIndex: 1 };