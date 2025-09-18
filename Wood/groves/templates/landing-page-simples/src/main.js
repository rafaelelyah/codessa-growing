// ========================================
// Landing Page Simples - JavaScript
// ========================================

// Importa biblioteca JS do terrain (sparks)
import '../../../../terrain/sparks/main.js';

// ========================================
// Configurações do Template
// ========================================

const CONFIG = {
  siteTitle: '{{siteTitle}}',
  siteDescription: '{{siteDescription}}',
  heroTitle: '{{heroTitle}}',
  heroSubtitle: '{{heroSubtitle}}',
  aboutTitle: '{{aboutTitle}}',
  aboutDescription: '{{aboutDescription}}',
  servicesTitle: '{{servicesTitle}}',
  contactTitle: '{{contactTitle}}',
  contactDescription: '{{contactDescription}}'
};

// ========================================
// Funções de Utilidade
// ========================================

// Smooth scroll para navegação
function smoothScroll(target) {
  const element = document.querySelector(target);
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
}

// Animação de entrada dos elementos
function animateOnScroll() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observar elementos que devem ser animados
  document.querySelectorAll('.service-card, .feature').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
}

// Validação de formulário
function validateForm(form) {
  const inputs = form.querySelectorAll('input, textarea');
  let isValid = true;

  inputs.forEach(input => {
    if (input.hasAttribute('required') && !input.value.trim()) {
      input.style.borderColor = '#EF4444';
      isValid = false;
    } else {
      input.style.borderColor = 'var(--border-primary)';
    }
  });

  return isValid;
}

// ========================================
// Event Listeners
// ========================================

document.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 Landing Page Simples carregada com Codessa Growing!');

  // ========================================
  // Navegação Suave
  // ========================================

  document.querySelectorAll('.nav-menu a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = link.getAttribute('href');
      smoothScroll(target);
    });
  });

  // ========================================
  // Animações de Scroll
  // ========================================

  animateOnScroll();

  // ========================================
  // Formulário de Contato
  // ========================================

  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      if (validateForm(contactForm)) {
        // Simulação de envio
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;

        submitBtn.textContent = 'Enviando...';
        submitBtn.disabled = true;

        // Simular delay de envio
        setTimeout(() => {
          submitBtn.textContent = 'Mensagem Enviada!';
          submitBtn.style.background = '#10B981';

          // Reset após 3 segundos
          setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            submitBtn.style.background = '';
            contactForm.reset();
          }, 3000);
        }, 2000);
      }
    });
  }

  // ========================================
  // Botões de Ação
  // ========================================

  // Botão "Saiba Mais" - scroll para about
  const saibaMaisBtn = document.querySelector('.hero-actions .btn-primary');
  if (saibaMaisBtn) {
    saibaMaisBtn.addEventListener('click', () => {
      smoothScroll('#about');
    });
  }

  // Botão "Ver Demo" - scroll para services
  const verDemoBtn = document.querySelector('.hero-actions .btn-secondary');
  if (verDemoBtn) {
    verDemoBtn.addEventListener('click', () => {
      smoothScroll('#services');
    });
  }

  // ========================================
  // Header Sticky com Background
  // ========================================

  const header = document.querySelector('.header');
  let lastScrollY = window.scrollY;

  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > 100) {
      header.style.background = 'rgba(255, 255, 255, 0.98)';
      header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
      header.style.background = 'rgba(255, 255, 255, 0.95)';
      header.style.boxShadow = 'none';
    }

    lastScrollY = currentScrollY;
  });

  // ========================================
  // Responsividade Móvel
  // ========================================

  // Menu mobile (simples - apenas esconde/mostra)
  const navMenu = document.querySelector('.nav-menu');
  const navCta = document.querySelector('.nav-cta');

  function handleResize() {
    if (window.innerWidth <= 768) {
      navCta.style.display = 'none';
    } else {
      navCta.style.display = 'block';
    }
  }

  window.addEventListener('resize', handleResize);
  handleResize(); // Executa na carga inicial

  // ========================================
  // Analytics Simples
  // ========================================

  // Tracking básico de interações
  const trackEvent = (eventName, data = {}) => {
    console.log(`📊 Event: ${eventName}`, data);

    // Aqui você poderia integrar com Google Analytics, Mixpanel, etc.
    // Exemplo:
    // gtag('event', eventName, data);
  };

  // Track form submissions
  if (contactForm) {
    contactForm.addEventListener('submit', () => {
      trackEvent('form_submit', { form: 'contact' });
    });
  }

  // Track button clicks
  document.querySelectorAll('.btn-primary, .btn-secondary').forEach(btn => {
    btn.addEventListener('click', () => {
      trackEvent('button_click', {
        text: btn.textContent.trim(),
        location: btn.closest('section')?.id || 'unknown'
      });
    });
  });

  // ========================================
  // Performance e Otimizações
  // ========================================

  // Lazy loading para imagens (se houver)
  const images = document.querySelectorAll('img[data-src]');
  if (images.length > 0) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          imageObserver.unobserve(img);
        }
      });
    });

    images.forEach(img => imageObserver.observe(img));
  }

  // ========================================
  // Tema Dark/Light (futuro)
  // ========================================

  // Placeholder para implementação futura de tema
  const themeToggle = document.querySelector('.theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark-theme');
      trackEvent('theme_toggle', {
        theme: document.body.classList.contains('dark-theme') ? 'dark' : 'light'
      });
    });
  }
});

// ========================================
// Funções Globais (disponíveis globalmente)
// ========================================

window.LandingPage = {
  // Função para customizar conteúdo dinamicamente
  customize: (config) => {
    Object.assign(CONFIG, config);

    // Aplicar customizações ao DOM
    Object.keys(config).forEach(key => {
      const elements = document.querySelectorAll(`[data-content="${key}"]`);
      elements.forEach(el => {
        el.textContent = config[key];
      });
    });
  },

  // Função para adicionar seções dinamicamente
  addSection: (sectionHTML) => {
    const main = document.querySelector('main') || document.body;
    main.insertAdjacentHTML('beforeend', sectionHTML);
  },

  // Função para tracking customizado
  track: (event, data) => {
    console.log(`📊 Custom Event: ${event}`, data);
  }
};