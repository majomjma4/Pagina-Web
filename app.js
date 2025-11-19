document.addEventListener('DOMContentLoaded', () => {

  // Actualizar año en footer
  document.getElementById('year').textContent = new Date().getFullYear();

  // Toggle menú móvil
  const btnMenu = document.getElementById('btnMenu');
  const mainNav = document.getElementById('mainNav');
  btnMenu.addEventListener('click', () => {
    mainNav.classList.toggle('open');
    if (mainNav.style.display === 'flex') mainNav.style.display = '';
    else mainNav.style.display = (window.innerWidth < 980) ? 'flex' : '';
  });

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const tgt = document.querySelector(a.getAttribute('href'));
      if (tgt) {
        e.preventDefault();
        tgt.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Filtrar galería
  const filters = document.querySelectorAll('.filter');
  const thumbs = document.querySelectorAll('.thumb');
  filters.forEach(f => {
    f.addEventListener('click', () => {
      filters.forEach(x => x.classList.remove('active'));
      f.classList.add('active');
      const type = f.dataset.filter;
      thumbs.forEach(t => {
        t.style.display = (type === 'all' || t.dataset.type === type) ? '' : 'none';
      });
    });
  });

  // ---------------- LIGHTBOX ----------------
  const lightbox = document.getElementById('lightbox');
  const lbImg = document.getElementById('lbImg');
  const lbVideo = document.getElementById('lbVideo');
  const lbClose = document.getElementById('lbClose');

  function openLightbox(el) {
    const type = el.dataset.type;

    if (type === 'video') {
  lbImg.style.display = 'none';
  lbVideo.style.display = 'block';

  lbVideo.pause();
  lbVideo.removeAttribute('src');

  const videoEl = el.querySelector('video');
  let videoSrc = '';
  if (videoEl) {
    const source = videoEl.querySelector('source');
    videoSrc = source ? source.src : videoEl.src;
  }

  lbVideo.src = videoSrc;
  lbVideo.currentTime = 0;
  lbVideo.play();

} else { // foto o gif
  lbVideo.pause();
  lbVideo.removeAttribute('src');
  lbVideo.style.display = 'none';
  lbImg.style.display = 'block';

  const imgEl = el.querySelector('img'); // solo img
  lbImg.src = imgEl ? imgEl.src : '';

  // Ajustar tamaño según tipo
  if(el.classList.contains('hero-media')) {
    lbImg.style.width = '60%';
  } else {
    lbImg.style.width = '90%';
  }

  // Limitar altura al 90% del viewport
  lbImg.style.maxHeight = '90vh';
  lbImg.style.height = 'auto'; // mantener proporciones
}


    lightbox.classList.add('show');
    lightbox.setAttribute('aria-hidden', 'false');
  }

  function closeLightbox() {
    lightbox.classList.remove('show');
    lbVideo.pause();
    lbVideo.src = '';
    lbImg.src = '';
    lightbox.setAttribute('aria-hidden', 'true');
  }

  // Abrir lightbox desde la galería o hero-media
  // Abrir lightbox desde la galería, hero-media o logo
  document.querySelectorAll('.thumb.card, .hero-media.card, .logo-box.card').forEach(el => {
  el.addEventListener('click', () => openLightbox(el));
});


  lbClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });

  // Parallax sutil
  window.addEventListener('scroll', () => {
    const y = Math.round(window.scrollY * 0.18);
    document.documentElement.style.setProperty('--parallax-y', `${y}px`);
  });

});



//GALLERY
document.addEventListener("DOMContentLoaded", () => {
  const filterBtns = document.querySelectorAll('.gallery-filters button');
  const items = document.querySelectorAll('.thumb');

  if (!filterBtns.length || !items.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // quitar active de todos
      filterBtns.forEach(b => b.classList.remove('active'));

      // activar el botón presionado
      btn.classList.add('active');

      const filter = btn.dataset.filter; // all | foto | video | gif

      items.forEach(item => {
        const type = item.dataset.type;

        if (filter === "all" || filter === type) {
          item.style.display = "";
        } else {
          item.style.display = "none";
        }
      });
    });
  });
});




