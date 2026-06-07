/**
 * Gusmão Moda Feminina - Interatividade e Elegância
 * Script principal contendo funcionalidades para menu responsivo, 
 * scroll suave, animações e o botão flutuante de contatos (FAB).
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- INICIALIZAÇÃO DE ANIMAÇÕES DE REVELAÇÃO (Scroll Reveal) ---
  const revealElements = document.querySelectorAll('.reveal');
  
  const revealOnScroll = () => {
    const triggerBottom = (window.innerHeight / 10) * 8.5; // revela um pouco antes de chegar no meio da tela
    revealElements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      if (elementTop < triggerBottom) {
        element.classList.add('active');
      }
    });
  };

  // Executa uma vez no início para checar elementos já visíveis e depois no scroll
  revealOnScroll();
  window.addEventListener('scroll', revealOnScroll);


  // --- MENU RESPONSIVO MOBILE ---
  const menuBtn = document.getElementById('menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuIconOpen = document.getElementById('menu-icon-open');
  const menuIconClose = document.getElementById('menu-icon-close');

  const toggleMobileMenu = () => {
    const isOpen = mobileMenu.classList.contains('translate-x-0');
    
    if (isOpen) {
      // Fecha o menu
      mobileMenu.classList.remove('translate-x-0');
      mobileMenu.classList.add('translate-x-full');
      menuIconOpen.classList.remove('hidden');
      menuIconClose.classList.add('hidden');
    } else {
      // Abre o menu
      mobileMenu.classList.remove('translate-x-full');
      mobileMenu.classList.add('translate-x-0');
      menuIconOpen.classList.add('hidden');
      menuIconClose.classList.remove('hidden');
    }
  };

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMobileMenu();
    });
  }

  // Fecha o menu mobile clicando em qualquer link
  const mobileLinks = document.querySelectorAll('#mobile-menu a');
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('translate-x-0');
      mobileMenu.classList.add('translate-x-full');
      menuIconOpen.classList.remove('hidden');
      menuIconClose.classList.add('hidden');
    });
  });


  // --- ROLAGEM SUAVE (Smooth Scroll) ---
  const allLinks = document.querySelectorAll('a[href^="#"]');
  allLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return; // ignora links vazios
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        
        // Compensação do Header Fixo
        const headerExpanded = document.querySelector('header');
        const headerHeight = headerExpanded ? headerExpanded.offsetHeight : 80;
        const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });


  // --- BOTÃO FLUTUANTE MULTIFUNCIONAL (FAB) ---
  const fabMainBtn = document.getElementById('fab-main-btn');
  const fabMenu = document.getElementById('fab-menu');
  const fabIconDefault = document.getElementById('fab-icon-default');
  const fabIconClose = document.getElementById('fab-icon-close');

  const toggleFabMenu = () => {
    const isHidden = fabMenu.classList.contains('hidden-fab');
    
    if (isHidden) {
      // Abre as opções adicionais de contato
      fabMenu.classList.remove('hidden-fab');
      fabMenu.classList.add('visible-fab');
      fabIconDefault.classList.add('hidden');
      fabIconClose.classList.remove('hidden');
    } else {
      // Fecha as opções adicionais
      fabMenu.classList.add('hidden-fab');
      fabMenu.classList.remove('visible-fab');
      fabIconDefault.classList.remove('hidden');
      fabIconClose.classList.add('hidden');
    }
  };

  if (fabMainBtn && fabMenu) {
    fabMainBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleFabMenu();
    });
  }


  // --- COMPORTAMENTO DE CLIQUE FORA (Para fechar menus abertos) ---
  document.addEventListener('click', (e) => {
    // Se clicar fora do FAB, fecha o menu de opções do FAB
    if (fabMenu && !fabMenu.classList.contains('hidden-fab')) {
      if (!fabMenu.contains(e.target) && e.target !== fabMainBtn && !fabMainBtn.contains(e.target)) {
        fabMenu.classList.add('hidden-fab');
        fabMenu.classList.remove('visible-fab');
        fabIconDefault.classList.remove('hidden');
        fabIconClose.classList.add('hidden');
      }
    }

    // Se clicar fora do menu mobile, fecha o menu mobile
    if (mobileMenu && mobileMenu.classList.contains('translate-x-0')) {
      if (!mobileMenu.contains(e.target) && e.target !== menuBtn && !menuBtn.contains(e.target)) {
        mobileMenu.classList.remove('translate-x-0');
        mobileMenu.classList.add('translate-x-full');
        menuIconOpen.classList.remove('hidden');
        menuIconClose.classList.add('hidden');
      }
    }
  });


  // --- BOTÃO VOLTAR AO TOPO (No submenu do FAB) ---
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      // Fecha o FAB depois de clicar
      if (fabMenu) {
        fabMenu.classList.add('hidden-fab');
        fabMenu.classList.remove('visible-fab');
        fabIconDefault.classList.remove('hidden');
        fabIconClose.classList.add('hidden');
      }
    });

    // Controla se exibe ou oculta o botão Voltar ao Topo do menu flutuante dependendo do scroll
    const toggleBackToTopVisibility = () => {
      if (window.scrollY > 400) {
        backToTopBtn.classList.remove('opacity-50', 'pointer-events-none');
        backToTopBtn.classList.add('opacity-100');
      } else {
        backToTopBtn.classList.add('opacity-50', 'pointer-events-none');
        backToTopBtn.classList.remove('opacity-100');
      }
    };
    
    toggleBackToTopVisibility();
    window.addEventListener('scroll', toggleBackToTopVisibility);
  }
});
