<?php
/**
 * Plugin Name: CTF Front Branding Final (TechCorp)
 * Description: Design completo e profissional para o portal TechCorp RH com navegação e múltiplas seções
 * Version: 3.0
 */

add_action('wp_enqueue_scripts', function () {

  $css = <<<CSS
  /* Reset e base */
  * { box-sizing: border-box; }
  
  html {
    scroll-behavior: smooth;
  }
  
  /* Fundo animado profissional */
  body:before {
    content: "";
    position: fixed;
    inset: -50% -50% -50% -50%;
    background: 
      radial-gradient(800px 800px at 0% 0%, rgba(37, 99, 235, 0.12), transparent 70%),
      radial-gradient(600px 600px at 100% 0%, rgba(59, 130, 246, 0.08), transparent 60%),
      radial-gradient(700px 700px at 100% 100%, rgba(99, 102, 241, 0.10), transparent 65%),
      radial-gradient(500px 500px at 0% 100%, rgba(37, 99, 235, 0.14), transparent 55%),
      linear-gradient(135deg, rgba(249, 250, 251, 0.95) 0%, rgba(243, 244, 246, 0.98) 100%);
    filter: blur(60px);
    animation: tc-pan 60s ease-in-out infinite;
    z-index: -1;
    pointer-events: none;
  }
  
  @keyframes tc-pan {
    0%, 100% { transform: translate3d(-3%, -2%, 0) scale(1.02) rotate(0deg); }
    25% { transform: translate3d(2%, -3%, 0) scale(1.03) rotate(90deg); }
    50% { transform: translate3d(3%, 2%, 0) scale(1.02) rotate(180deg); }
    75% { transform: translate3d(-2%, 3%, 0) scale(1.03) rotate(270deg); }
  }
  
  @media (prefers-reduced-motion: reduce) {
    body:before { animation: none; }
  }

  /* Tipografia melhorada */
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    line-height: 1.6;
    color: #1f2937;
  }

  /* Navbar */
  .tc-navbar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    backdrop-filter: blur(20px);
    background: rgba(255, 255, 255, 0.95);
    border-bottom: 1px solid rgba(229, 231, 235, 0.8);
    padding: 1rem 0;
    transition: all 0.3s ease;
  }

  .tc-nav-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .tc-logo {
    font-size: 1.75rem;
    font-weight: 800;
    color: #2563eb;
    margin: 0;
    background: linear-gradient(135deg, #2563eb, #3b82f6);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .tc-nav-menu {
    display: flex;
    gap: 2rem;
    align-items: center;
  }

  .tc-nav-menu a {
    color: #374151;
    text-decoration: none;
    font-weight: 500;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    transition: all 0.3s ease;
  }

  .tc-nav-menu a:hover {
    color: #2563eb;
    background: rgba(37, 99, 235, 0.1);
  }

  .tc-btn-login .wp-block-button__link {
    background: linear-gradient(135deg, #2563eb, #3b82f6);
    color: white;
    border: none;
    border-radius: 12px;
    padding: 0.75rem 1.5rem;
    font-weight: 600;
    font-size: 0.875rem;
    text-decoration: none;
    transition: all 0.3s ease;
  }

  .tc-btn-login .wp-block-button__link:hover {
    background: linear-gradient(135deg, #1d4ed8, #2563eb);
    transform: translateY(-1px);
    box-shadow: 0 8px 20px rgba(37, 99, 235, 0.3);
  }

  /* Ajuste para compensar navbar fixa */
  .tc-hero {
    margin-top: 80px;
  }

  /* Hero section profissional */
  .tc-hero {
    padding: 8rem 2rem 6rem;
    background: linear-gradient(135deg, 
      rgba(37, 99, 235, 0.95) 0%, 
      rgba(59, 130, 246, 0.90) 50%, 
      rgba(99, 102, 241, 0.95) 100%);
    color: #ffffff;
    text-align: center;
    position: relative;
    overflow: hidden;
  }

  .tc-hero::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="0.5"/></pattern></defs><rect width="100" height="100" fill="url(%23grid)"/></svg>');
    opacity: 0.3;
  }

  .tc-hero > div {
    position: relative;
    z-index: 2;
  }

  .tc-hero h1 {
    font-size: clamp(2.5rem, 5vw, 4rem);
    font-weight: 700;
    margin: 0 0 1rem;
    letter-spacing: -0.02em;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .tc-hero p {
    font-size: clamp(1.125rem, 2vw, 1.5rem);
    max-width: 800px;
    margin: 0 auto 1.5rem;
    opacity: 0.95;
    font-weight: 300;
  }

  /* Botões CTA melhorados */
  .tc-btn-primary .wp-block-button__link {
    background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
    color: #2563eb;
    border: none;
    border-radius: 16px;
    padding: 1rem 2.5rem;
    font-weight: 600;
    font-size: 1.125rem;
    box-shadow: 
      0 10px 25px rgba(0, 0, 0, 0.15),
      0 4px 10px rgba(0, 0, 0, 0.1);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    margin: 0 0.5rem;
  }

  .tc-btn-primary .wp-block-button__link:hover {
    background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
    transform: translateY(-2px);
    box-shadow: 
      0 15px 35px rgba(0, 0, 0, 0.2),
      0 6px 15px rgba(0, 0, 0, 0.15);
  }

  .tc-btn-secondary .wp-block-button__link {
    background: transparent;
    color: #ffffff;
    border: 2px solid rgba(255, 255, 255, 0.8);
    border-radius: 16px;
    padding: 1rem 2.5rem;
    font-weight: 600;
    font-size: 1.125rem;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    margin: 0 0.5rem;
  }

  .tc-btn-secondary .wp-block-button__link:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: #ffffff;
    transform: translateY(-2px);
  }

  /* Seção de conteúdo */
  #sobre {
    padding: 6rem 0 4rem;
  }

  .section-title {
    font-size: clamp(2rem, 3vw, 2.5rem);
    font-weight: 700;
    color: #1f2937;
    margin-bottom: 3rem;
    text-align: center;
    position: relative;
  }

  .section-title::after {
    content: '';
    position: absolute;
    bottom: -1rem;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 4px;
    background: linear-gradient(90deg, #2563eb, #3b82f6);
    border-radius: 2px;
  }

  /* Cards melhorados */
  .wp-block-columns {
    gap: 2rem;
  }

  .tc-card {
    padding: 2.5rem 2rem;
    border-radius: 24px;
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(229, 231, 235, 0.5);
    box-shadow: 
      0 20px 40px rgba(0, 0, 0, 0.08),
      0 8px 16px rgba(0, 0, 0, 0.04);
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;
  }

  .tc-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #2563eb, #3b82f6, #6366f1);
    transform: scaleX(0);
    transition: transform 0.3s ease;
  }

  .tc-card:hover {
    transform: translateY(-8px);
    box-shadow: 
      0 30px 60px rgba(0, 0, 0, 0.12),
      0 12px 24px rgba(0, 0, 0, 0.08);
  }

  .tc-card:hover::before {
    transform: scaleX(1);
  }

  .tc-card h4 {
    font-size: 1.5rem;
    font-weight: 700;
    color: #1f2937;
    margin: 0 0 1rem;
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .tc-card h4::before {
    content: '';
    width: 12px;
    height: 12px;
    background: linear-gradient(135deg, #2563eb, #3b82f6);
    border-radius: 50%;
    flex-shrink: 0;
  }

  .tc-card p {
    color: #6b7280;
    font-size: 1.125rem;
    line-height: 1.7;
    margin: 0;
  }

  /* Seção de estatísticas */
  .tc-stats {
    padding: 4rem 2rem;
    background: linear-gradient(135deg, 
      rgba(249, 250, 251, 0.8) 0%, 
      rgba(243, 244, 246, 0.9) 100%);
    border-radius: 32px;
    border: 1px solid rgba(229, 231, 235, 0.6);
    backdrop-filter: blur(20px);
    margin: 4rem 0;
  }

  .tc-stats h3::after {
    width: 60px;
    height: 3px;
    background: linear-gradient(90deg, #6366f1, #8b5cf6);
  }

  .tc-stats .wp-block-column {
    padding: 1.5rem;
    transition: transform 0.3s ease;
  }

  .tc-stats .wp-block-column:hover {
    transform: translateY(-4px);
  }

  .tc-stats h2 {
    font-size: clamp(2.5rem, 4vw, 3.5rem);
    font-weight: 800;
    margin: 0 0 0.5rem;
    background: linear-gradient(135deg, #2563eb, #3b82f6);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .tc-stats p {
    color: #6b7280;
    font-size: 1rem;
    margin: 0;
    line-height: 1.5;
  }

  .tc-stats strong {
    color: #1f2937;
    font-weight: 600;
  }

  /* Seção de carreiras */
  .tc-careers-section {
    padding: 6rem 2rem;
    background: linear-gradient(135deg, 
      rgba(15, 23, 42, 0.95) 0%, 
      rgba(30, 41, 59, 0.90) 100%);
    color: #e2e8f0;
  }

  .tc-careers-section h3 {
    color: #f1f5f9;
  }

  .tc-careers-section h3::after {
    background: linear-gradient(90deg, #60a5fa, #a78bfa);
  }

  .tc-job-card {
    padding: 2rem;
    border-radius: 20px;
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    transition: all 0.3s ease;
  }

  .tc-job-card:hover {
    background: rgba(255, 255, 255, 0.08);
    transform: translateY(-4px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  }

  .tc-job-card h4 {
    color: #f1f5f9;
    font-size: 1.25rem;
    margin: 0 0 1rem;
  }

  .tc-job-location {
    color: #94a3b8;
    font-size: 0.875rem;
    margin: 0 0 1rem;
  }

  .tc-job-salary {
    color: #60a5fa;
    font-weight: 600;
    margin: 1rem 0 0;
  }

  .tc-btn-careers .wp-block-button__link {
    background: linear-gradient(135deg, #3b82f6, #6366f1);
    color: white;
    border: none;
    border-radius: 16px;
    padding: 1rem 2rem;
    font-weight: 600;
    text-decoration: none;
    transition: all 0.3s ease;
  }

  .tc-btn-careers .wp-block-button__link:hover {
    background: linear-gradient(135deg, #2563eb, #5b21b6);
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(59, 130, 246, 0.3);
  }

  /* Seção de benefícios */
  .tc-benefits-section {
    padding: 6rem 0;
  }

  .tc-benefit-card {
    padding: 2rem;
    border-radius: 20px;
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(229, 231, 235, 0.5);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.06);
    transition: all 0.3s ease;
    text-align: center;
  }

  .tc-benefit-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  }

  .tc-benefit-icon {
    font-size: 3rem;
    margin: 0 0 1rem;
  }

  .tc-benefit-card h4 {
    color: #1f2937;
    font-size: 1.25rem;
    margin: 0 0 1rem;
  }

  .tc-benefit-card p {
    color: #6b7280;
    margin: 0;
  }

  /* Seção de localizações */
  .tc-locations-section {
    padding: 6rem 2rem;
    background: linear-gradient(135deg, 
      rgba(249, 250, 251, 0.8) 0%, 
      rgba(243, 244, 246, 0.9) 100%);
  }

  .tc-location-card {
    padding: 2rem;
    border-radius: 20px;
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(229, 231, 235, 0.5);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.06);
    transition: all 0.3s ease;
  }

  .tc-location-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  }

  .tc-location-card h4 {
    color: #1f2937;
    font-size: 1.25rem;
    margin: 0 0 1rem;
  }

  .tc-location-card p {
    color: #6b7280;
    margin: 0;
    line-height: 1.6;
  }

  .tc-remote-card {
    background: linear-gradient(135deg, 
      rgba(59, 130, 246, 0.1) 0%, 
      rgba(99, 102, 241, 0.1) 100%);
    border-color: rgba(59, 130, 246, 0.2);
  }

  /* Seção de contato */
  .tc-contact-section {
    padding: 6rem 2rem;
    background: linear-gradient(135deg, 
      rgba(15, 23, 42, 0.95) 0%, 
      rgba(30, 41, 59, 0.90) 100%);
    color: #e2e8f0;
  }

  .tc-contact-section h3 {
    color: #f1f5f9;
  }

  .tc-contact-section h3::after {
    background: linear-gradient(90deg, #60a5fa, #a78bfa);
  }

  .tc-contact-card {
    padding: 2rem;
    border-radius: 20px;
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    transition: all 0.3s ease;
  }

  .tc-contact-card:hover {
    background: rgba(255, 255, 255, 0.08);
    transform: translateY(-4px);
  }

  .tc-contact-card h4 {
    color: #f1f5f9;
    font-size: 1.25rem;
    margin: 0 0 1rem;
  }

  .tc-contact-card p {
    color: #cbd5e1;
    margin: 0;
    line-height: 1.6;
  }

  .tc-contact-card strong {
    color: #e2e8f0;
  }

  /* Footer melhorado */
  .tc-footer {
    margin-top: 0;
    padding: 3rem 2rem;
    background: linear-gradient(135deg, 
      rgba(15, 23, 42, 0.98) 0%, 
      rgba(30, 41, 59, 0.95) 100%);
    color: #e2e8f0;
    position: relative;
  }

  .tc-footer::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, 
      transparent 0%, 
      rgba(148, 163, 184, 0.5) 50%, 
      transparent 100%);
  }

  .tc-footer p {
    margin: 0;
    font-size: 0.875rem;
    opacity: 0.8;
  }

  /* Responsividade melhorada */
  @media (max-width: 768px) {
    .tc-nav-container {
      padding: 0 1rem;
    }
    
    .tc-nav-menu {
      display: none;
    }
    
    .tc-hero {
      padding: 6rem 1.5rem 4rem;
      margin-top: 70px;
    }
    
    .tc-card, .tc-job-card, .tc-benefit-card, .tc-location-card, .tc-contact-card {
      padding: 1.5rem;
    }
    
    #sobre, .tc-benefits-section {
      padding: 4rem 0 3rem;
    }
    
    .tc-careers-section, .tc-locations-section, .tc-contact-section {
      padding: 4rem 1.5rem;
    }
    
    .tc-stats {
      padding: 3rem 1.5rem;
      margin: 3rem 0;
    }
    
    .wp-block-columns {
      flex-direction: column;
    }
  }

  /* Animações de entrada */
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .tc-card, .tc-job-card, .tc-benefit-card, .tc-location-card, .tc-contact-card {
    animation: fadeInUp 0.6s ease-out;
  }

  .tc-card:nth-child(1), .tc-job-card:nth-child(1), .tc-benefit-card:nth-child(1), .tc-location-card:nth-child(1), .tc-contact-card:nth-child(1) { animation-delay: 0.1s; }
  .tc-card:nth-child(2), .tc-job-card:nth-child(2), .tc-benefit-card:nth-child(2), .tc-location-card:nth-child(2), .tc-contact-card:nth-child(2) { animation-delay: 0.2s; }
  .tc-card:nth-child(3), .tc-job-card:nth-child(3), .tc-benefit-card:nth-child(3), .tc-location-card:nth-child(3), .tc-contact-card:nth-child(3) { animation-delay: 0.3s; }

  .tc-stats .wp-block-column {
    animation: fadeInUp 0.8s ease-out;
  }

  .tc-stats .wp-block-column:nth-child(1) { animation-delay: 0.2s; }
  .tc-stats .wp-block-column:nth-child(2) { animation-delay: 0.3s; }
  .tc-stats .wp-block-column:nth-child(3) { animation-delay: 0.4s; }
  .tc-stats .wp-block-column:nth-child(4) { animation-delay: 0.5s; }

  /* Melhorias de acessibilidade */
  .tc-btn-primary .wp-block-button__link:focus,
  .tc-btn-secondary .wp-block-button__link:focus,
  .tc-btn-login .wp-block-button__link:focus,
  .tc-btn-careers .wp-block-button__link:focus {
    outline: 2px solid #ffffff;
    outline-offset: 2px;
  }

  .tc-card:focus-within,
  .tc-job-card:focus-within,
  .tc-benefit-card:focus-within,
  .tc-location-card:focus-within,
  .tc-contact-card:focus-within {
    outline: 2px solid #2563eb;
    outline-offset: 2px;
  }

  /* Efeitos de hover adicionais */
  .tc-stats .wp-block-column:hover h2 {
    background: linear-gradient(135deg, #3b82f6, #6366f1);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  CSS;

  wp_register_style('ctf-front-branding-final', false);
  wp_enqueue_style('ctf-front-branding-final');
  wp_add_inline_style('ctf-front-branding-final', $css);
});