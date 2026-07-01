// script.js
document.addEventListener('DOMContentLoaded', function() {
  // Кнопка "Наверх"
  const btnTop = document.getElementById('btnTop');
  if (btnTop) {
      window.addEventListener('scroll', () => {
          if (window.scrollY > 300) {
              btnTop.classList.add('visible');
          } else {
              btnTop.classList.remove('visible');
          }
      });
      btnTop.addEventListener('click', () => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
      });
  }

  // Плавный скролл для якорей
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
          const target = document.querySelector(this.getAttribute('href'));
          if (target) {
              e.preventDefault();
              target.scrollIntoView({ behavior: 'smooth' });
          }
      });
  });

  // Фильтрация галереи
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  
  filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
          filterBtns.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          
          const filter = btn.getAttribute('data-filter');
          
          galleryItems.forEach(item => {
              if (filter === 'all' || item.getAttribute('data-category') === filter) {
                  item.style.display = 'block';
              } else {
                  item.style.display = 'none';
              }
          });
      });
  });

  // Лайтбокс галереи
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.querySelector('.lightbox-image');
  const lightboxCaption = document.querySelector('.lightbox-caption');
  const lightboxClose = document.querySelector('.lightbox-close');
  
  if (lightbox) {
      galleryItems.forEach(item => {
          item.addEventListener('click', () => {
              const img = item.querySelector('img');
              const caption = item.querySelector('.image-caption');
              lightboxImage.src = img.src;
              lightboxImage.alt = img.alt;
              lightboxCaption.textContent = caption ? caption.textContent : '';
              lightbox.classList.add('active');
          });
      });
      
      lightboxClose.addEventListener('click', () => {
          lightbox.classList.remove('active');
      });
      
      lightbox.addEventListener('click', (e) => {
          if (e.target === lightbox) {
              lightbox.classList.remove('active');
          }
      });
      
      document.addEventListener('keydown', (e) => {
          if (e.key === 'Escape' && lightbox.classList.contains('active')) {
              lightbox.classList.remove('active');
          }
      });
  }

  // Выбор путевки и программы
  const packageButtons = document.querySelectorAll('.select-package');
  const programButtons = document.querySelectorAll('.select-program');
  const selectedOptions = document.getElementById('selectedOptions');
  const selectedPackage = document.getElementById('selectedPackage');
  const selectedPrograms = document.getElementById('selectedPrograms');
  const proceedBtn = document.getElementById('proceedToBooking');
  const bookingFormWrapper = document.getElementById('bookingFormWrapper');
  
  let chosenPackage = null;
  let chosenPrograms = [];
  
  if (packageButtons.length > 0) {
      packageButtons.forEach(btn => {
          btn.addEventListener('click', () => {
              const packageName = btn.getAttribute('data-package');
              const card = btn.closest('.price-card');
              
              document.querySelectorAll('.price-card').forEach(c => c.classList.remove('selected'));
              card.classList.add('selected');
              
              chosenPackage = packageName;
              updateSelection();
          });
      });
  }
  
  if (programButtons.length > 0) {
      programButtons.forEach(btn => {
          btn.addEventListener('click', () => {
              const programName = btn.getAttribute('data-program');
              const card = btn.closest('.program-card');
              
              if (chosenPrograms.includes(programName)) {
                  chosenPrograms = chosenPrograms.filter(p => p !== programName);
                  card.classList.remove('selected');
                  btn.textContent = 'Добавить';
              } else {
                  chosenPrograms.push(programName);
                  card.classList.add('selected');
                  btn.textContent = 'Убрать';
              }
              updateSelection();
          });
      });
  }
  
  function updateSelection() {
      if (chosenPackage || chosenPrograms.length > 0) {
          selectedOptions.style.display = 'block';
          selectedPackage.textContent = chosenPackage || 'Не выбрано';
          selectedPrograms.textContent = chosenPrograms.length > 0 ? chosenPrograms.join(', ') : 'Не выбрано';
      }
  }
  
  if (proceedBtn) {
      proceedBtn.addEventListener('click', () => {
          bookingFormWrapper.style.display = 'block';
          bookingFormWrapper.scrollIntoView({ behavior: 'smooth' });
      });
  }

  console.log('Сайт геокурорта Янган Тау загружен');
});