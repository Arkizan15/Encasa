import './gallery.css';
import renderNavbar from '../components/navbar.js';
import renderFooter from '../components/footer.js';

// ── KONFIGURASI ITERASI GAMBAR ──────────────────────────────────────
// Tentukan jumlah total foto yang tersimpan di dalam folder public/Image/Galery Anda
const TOTAL_FOTO = 23; 

// Melakukan looping otomatis untuk generate data file path gambar lokal
const galleryItems = Array.from({ length: TOTAL_FOTO }, (_, i) => ({
  id: i + 1,
  // Otomatis memanggil foto1.jpg, foto2.jpg, dst. Sesuaikan ekstensi (.jpg/.png/.webp) jika berbeda
  src: `/Image/Galery/foto${i + 1}.jpg`, 
  alt: `Encasa Documentation Momen ${i + 1}`
}));

// ── INJEKSI STRUKTUR UTAMA KE #APP (Mengikuti format persis join.js) ──
document.querySelector('#app').innerHTML = `
  ${renderNavbar()}
  <main>
    <section class="gallery-hero">
      <div class="gallery-hero__overlay">
        <h1 class="gallery-hero__title">Galery</h1>
      </div>
    </section>

    <section class="gallery-section">
      <div class="gallery-container">
        <div class="gallery-flex-grid">
          ${galleryItems.map(item => `
            <div class="gallery-flex-col">
              <div class="gallery-card">
                <img 
                  src="${item.src}" 
                  alt="${item.alt}" 
                  class="gallery-card__img" 
                  loading="lazy" 
                />
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  </main>
  ${renderFooter()}
`;