import ASSETS from '../assets.js';
import '../home.css';

function getCurrentPage() {
  const pathname = window.location.pathname;
  const filename = pathname.split('/').pop() || 'index.html';
  return filename;
}

function isActiveLink(href) {
  const currentPage = getCurrentPage();
  
  if (href.startsWith('#')) {
    return false;
  }
  
  if (href === 'index.html') {
    return currentPage === 'index.html' || currentPage === '';
  }
  
  if (href === 'management.html') {
    return currentPage === 'management.html';
  }

  if (href === 'gallery.html') {
    return currentPage === 'gallery.html';
  }

  if (href === 'join.html') {
    return currentPage === 'join.html';
  }
  
  return false;
}

// ── UTILITY FUNGSIONAL UNTUK HAMBURGER & SCROLL EFFECT ────────────────
// Fungsi ini akan dijalankan otomatis sesaat setelah string HTML diinjeksikan ke DOM
function initNavbarLogic() {
  // Menggunakan setTimeout 0 agar browser selesai merender HTML navbar terlebih dahulu
  setTimeout(() => {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');

    // 1. Efek Scroll Navbar
    window.addEventListener('scroll', () => {
      navbar?.classList.toggle('scrolled', window.scrollY > 10);
    });

    // 2. Tombol Hamburger Buka/Tutup
    if (hamburger && navLinks) {
      // Hapus listener lama jika ada untuk mencegah penumpukan fungsi (double click event)
      hamburger.replaceWith(hamburger.cloneNode(true));
      const newHamburger = document.getElementById('hamburger');

      newHamburger.addEventListener('click', (e) => {
        e.stopPropagation(); // Mencegah event merembet
        navLinks.classList.toggle('open');
        newHamburger.classList.toggle('open');
      });

      // 3. Menutup menu otomatis jika salah satu link di klik
      navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          navLinks.classList.remove('open');
          newHamburger.classList.remove('open');
        });
      });

      // 4. Menutup menu jika pengguna mengklik area luar navbar
      document.addEventListener('click', (e) => {
        if (!navbar.contains(e.target)) {
          navLinks.classList.remove('open');
          newHamburger.classList.remove('open');
        }
      });
    }
  }, 0);
}

function renderNavbar() {
  // Panggil fungsi logika di atas secara otomatis setiap kali navbar dirender
  initNavbarLogic();

  return `
    <nav class="navbar" id="navbar">
      <img src="${ASSETS.logoEncasaSquare}" alt="Encasa Logo" class="navbar__logo" />
      <button class="navbar__hamburger" id="hamburger" aria-label="Toggle menu">
        <span></span><span></span><span></span>
      </button>
      <ul class="navbar__links" id="nav-links">
        <li><a href="index.html" class="${isActiveLink('index.html') ? 'active' : ''}">Home</a></li>
        <li><a href="gallery.html" class="${isActiveLink('gallery.html') ? 'active' : ''}">Galery</a></li>
        <li><a href="management.html" class="${isActiveLink('management.html') ? 'active' : ''}">Management</a></li>
        <li><a href="join.html" class="${isActiveLink('join.html') ? 'active' : ''}">Join us</a></li>
      </ul>
    </nav>
  `;
}

export default renderNavbar;