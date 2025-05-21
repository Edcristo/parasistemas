// JavaScript para o site da Pará Sistemas

// Preloader
window.addEventListener('load', function() {
  const preloader = document.querySelector('.preloader');
  preloader.classList.add('fade-out');
  
  // Ativar animações após o carregamento
  setTimeout(() => {
    document.querySelectorAll('.animate').forEach(item => {
      item.style.opacity = '1';
    });
  }, 300);
});

// Header fixo com mudança ao rolar
window.addEventListener('scroll', function() {
  const header = document.querySelector('header');
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// Menu mobile
document.addEventListener('DOMContentLoaded', function() {
  const mobileToggle = document.querySelector('.mobile-toggle');
  const nav = document.querySelector('nav');
  
  if (mobileToggle) {
    mobileToggle.addEventListener('click', function() {
      nav.classList.toggle('active');
      mobileToggle.classList.toggle('active');
    });
  }
  
  // Fechar menu ao clicar em um link
  const navLinks = document.querySelectorAll('nav ul li a');
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      nav.classList.remove('active');
      mobileToggle.classList.remove('active');
    });
  });
  
  // Filtros do portfólio
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');
  
  filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      // Remover classe ativa de todos os botões
      filterBtns.forEach(btn => btn.classList.remove('active'));
      // Adicionar classe ativa ao botão clicado
      this.classList.add('active');
      
      const filter = this.getAttribute('data-filter');
      
      portfolioItems.forEach(item => {
        if (filter === 'all') {
          item.style.display = 'block';
        } else if (item.classList.contains(filter)) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
  
  // Validação do formulário de contato
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Validação básica
      let valid = true;
      const name = document.getElementById('name');
      const email = document.getElementById('email');
      const message = document.getElementById('message');
      
      if (name.value.trim() === '') {
        valid = false;
        showError(name, 'Por favor, informe seu nome');
      } else {
        removeError(name);
      }
      
      if (email.value.trim() === '') {
        valid = false;
        showError(email, 'Por favor, informe seu email');
      } else if (!isValidEmail(email.value)) {
        valid = false;
        showError(email, 'Por favor, informe um email válido');
      } else {
        removeError(email);
      }
      
      if (message.value.trim() === '') {
        valid = false;
        showError(message, 'Por favor, escreva sua mensagem');
      } else {
        removeError(message);
      }
      
      if (valid) {
        // Aqui seria a lógica para enviar o formulário
        // Como é apenas demonstrativo, vamos mostrar uma mensagem de sucesso
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.textContent = 'Mensagem enviada com sucesso! Entraremos em contato em breve.';
        
        contactForm.innerHTML = '';
        contactForm.appendChild(successMessage);
      }
    });
  }
  
  // Funções auxiliares para validação
  function showError(input, message) {
    const formGroup = input.parentElement;
    const errorMessage = document.createElement('div');
    errorMessage.className = 'error-message';
    errorMessage.textContent = message;
    
    // Remover mensagem de erro existente, se houver
    const existingError = formGroup.querySelector('.error-message');
    if (existingError) {
      formGroup.removeChild(existingError);
    }
    
    formGroup.appendChild(errorMessage);
    input.classList.add('error');
  }
  
  function removeError(input) {
    const formGroup = input.parentElement;
    const existingError = formGroup.querySelector('.error-message');
    if (existingError) {
      formGroup.removeChild(existingError);
    }
    input.classList.remove('error');
  }
  
  function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email.toLowerCase());
  }
  
  // Animação ao scroll
  const animateElements = document.querySelectorAll('.animate-on-scroll');
  
  function checkIfInView() {
    animateElements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const elementVisible = 150;
      
      if (elementTop < window.innerHeight - elementVisible) {
        element.classList.add('animate');
      }
    });
  }
  
  window.addEventListener('scroll', checkIfInView);
  checkIfInView(); // Verificar elementos visíveis no carregamento inicial
});

// Contador de números
function startCounter() {
  const counters = document.querySelectorAll('.counter');
  
  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-target'));
    const duration = 2000; // 2 segundos
    const step = target / (duration / 16); // 60fps
    
    let current = 0;
    const updateCounter = () => {
      current += step;
      if (current < target) {
        counter.textContent = Math.ceil(current);
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target;
      }
    };
    
    updateCounter();
  });
}

// Iniciar contador quando a seção estiver visível
const statsSection = document.querySelector('.stats');
if (statsSection) {
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      startCounter();
      observer.disconnect();
    }
  });
  
  observer.observe(statsSection);
}
