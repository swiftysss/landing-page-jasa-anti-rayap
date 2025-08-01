// Loading Screen
window.addEventListener("load", () => {
  const loadingScreen = document.getElementById("loading-screen")
  setTimeout(() => {
    loadingScreen.style.opacity = "0"
    setTimeout(() => {
      loadingScreen.style.display = "none"
    }, 500)
  }, 2000)
})

// Fungsi untuk membuka modal artikel dengan data dinamis
function openArticleModal(title, date) {
  document.getElementById('article-title').textContent = title;
  document.getElementById('article-date').textContent = date;
  document.getElementById('article-modal').classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeArticleModal() {
  document.getElementById('article-modal').classList.add('hidden');
  document.body.style.overflow = 'auto';
}

// Contoh trigger untuk artikel di sidebar
document.querySelectorAll('.hover-glow').forEach(item => {
  item.addEventListener('click', function() {
    const title = this.querySelector('h4').textContent;
    const date = this.querySelector('p').textContent.replace(/^\s+|\s+$/g, '');
    openArticleModal(title, date);
  });
});

function openModal(service) {
  // Sembunyikan semua modal terlebih dahulu
  document.querySelectorAll('[id$="-modal"]').forEach(modal => {
    modal.classList.add('hidden');
  });
  
  // Tampilkan modal yang dipilih
  document.getElementById(`${service}-modal`).classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.querySelectorAll('[id$="-modal"]').forEach(modal => {
    modal.classList.add('hidden');
  });
  document.body.style.overflow = 'auto';
}

document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('[data-slide]');
    const prevBtn = document.querySelector('[data-prev]');
    const nextBtn = document.querySelector('[data-next]');
    const indicators = document.querySelectorAll('[data-indicator]');
    let currentIndex = 0;
    
    // Fungsi untuk menampilkan slide tertentu
    function showSlide(index) {
        // Pastikan index dalam range yang valid
        if (index < 0) index = slides.length - 1;
        if (index >= slides.length) index = 0;
        
        // Sembunyikan semua slide
        slides.forEach(slide => {
            slide.classList.add('opacity-0');
            slide.classList.remove('opacity-100');
        });
        
        // Tampilkan slide yang dipilih
        slides[index].classList.remove('opacity-0');
        slides[index].classList.add('opacity-100');
        
        // Update indicator
        indicators.forEach((indicator, i) => {
            if (i === index) {
                indicator.classList.remove('opacity-50');
                indicator.classList.add('opacity-100');
            } else {
                indicator.classList.remove('opacity-100');
                indicator.classList.add('opacity-50');
            }
        });
        
        currentIndex = index;
    }
    
    // Navigasi slide
    prevBtn.addEventListener('click', () => showSlide(currentIndex - 1));
    nextBtn.addEventListener('click', () => showSlide(currentIndex + 1));
    
    // Klik indicator
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => showSlide(index));
    });
    
    // Auto slide (opsional)
    let slideInterval = setInterval(() => showSlide(currentIndex + 1), 5000);
    
    // Hentikan auto slide saat hover
    const carousel = document.querySelector('.float');
    carousel.addEventListener('mouseenter', () => clearInterval(slideInterval));
    carousel.addEventListener('mouseleave', () => {
        slideInterval = setInterval(() => showSlide(currentIndex + 1), 5000);
    });
    
    // Tampilkan slide pertama
    showSlide(0);
})

// Gallery Filter Functionality
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.gallery-filter');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active button
            filterButtons.forEach(btn => {
                btn.classList.remove('bg-red-600', 'text-white');
                btn.classList.add('bg-gray-100', 'text-gray-800');
            });
            this.classList.remove('bg-gray-100', 'text-gray-800');
            this.classList.add('bg-red-600', 'text-white');
            
            // Filter items
            const filterValue = this.getAttribute('data-filter');
            
            galleryItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
    
    // Simple lightbox effect
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const imgSrc = this.querySelector('img').getAttribute('src');
            const imgAlt = this.querySelector('img').getAttribute('alt');
            
            // Create lightbox
            const lightbox = document.createElement('div');
            lightbox.className = 'fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4';
            lightbox.innerHTML = `
                <div class="relative max-w-4xl w-full">
                    <img src="${imgSrc}" alt="${imgAlt}" class="w-full h-auto max-h-[80vh] object-contain rounded-lg">
                    <button class="absolute -top-12 right-0 text-white text-2xl hover:text-red-400 transition-colors">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            `;
            
            document.body.appendChild(lightbox);
            
            // Close lightbox
            lightbox.querySelector('button').addEventListener('click', function() {
                lightbox.remove();
            });
        });
    });
})

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById("mobile-menu-btn");
    const mobileMenu = document.getElementById("mobile-menu");
    let isMobileMenuOpen = false;

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener("click", (e) => {
            e.stopPropagation(); // Mencegah event bubbling
            isMobileMenuOpen = !isMobileMenuOpen;
            
            if (isMobileMenuOpen) {
                mobileMenu.classList.remove("hidden");
                mobileMenu.classList.add("block");
                mobileMenu.style.transform = "translateY(0)";
                mobileMenu.style.opacity = "1";
                mobileMenuBtn.innerHTML = '<i class="fas fa-times text-xl"></i>';
                mobileMenuBtn.classList.add("shake");
                document.body.style.overflow = "hidden";
            } else {
                mobileMenu.style.transform = "translateY(-100%)";
                mobileMenu.style.opacity = "0";
                // Tambahkan delay sebelum menyembunyikan agar animasi terlihat
                setTimeout(() => {
                    mobileMenu.classList.remove("block");
                    mobileMenu.classList.add("hidden");
                }, 300);
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars text-xl"></i>';
                mobileMenuBtn.classList.remove("shake");
                document.body.style.overflow = "auto";
            }
            
            setTimeout(() => {
                mobileMenuBtn.classList.remove("shake");
            }, 500);
        });

        // Close mobile menu when clicking on links
        document.querySelectorAll(".mobile-nav-link").forEach((link) => {
            link.addEventListener("click", () => {
                isMobileMenuOpen = false;
                mobileMenu.style.transform = "translateY(-100%)";
                mobileMenu.style.opacity = "0";
                setTimeout(() => {
                    mobileMenu.classList.remove("block");
                    mobileMenu.classList.add("hidden");
                }, 300);
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars text-xl"></i>';
                document.body.style.overflow = "auto";
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener("click", (e) => {
            if (isMobileMenuOpen && 
                !mobileMenu.contains(e.target) && 
                !mobileMenuBtn.contains(e.target)) {
                isMobileMenuOpen = false;
                mobileMenu.style.transform = "translateY(-100%)";
                mobileMenu.style.opacity = "0";
                setTimeout(() => {
                    mobileMenu.classList.remove("block");
                    mobileMenu.classList.add("hidden");
                }, 300);
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars text-xl"></i>';
                document.body.style.overflow = "auto";
            }
        });
    }

    // Responsive handling
    window.addEventListener('resize', handleResize);
    
    function handleResize() {
        if (window.innerWidth >= 1024 && isMobileMenuOpen) {
            isMobileMenuOpen = false;
            mobileMenu.style.transform = "translateY(-100%)";
            mobileMenu.style.opacity = "0";
            setTimeout(() => {
                mobileMenu.classList.remove("block");
                mobileMenu.classList.add("hidden");
            }, 300);
            if (mobileMenuBtn) {
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars text-xl"></i>';
            }
            document.body.style.overflow = "auto";
        }
    }
})

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      const headerOffset = 80
      const elementPosition = target.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
    }
  })
})

// Counter Animation
function animateCounter(element, target, duration = 2000) {
  let start = 0
  const increment = target / (duration / 16)
  function updateCounter() {
    start += increment
    if (start < target) {
      element.textContent = Math.floor(start)
      requestAnimationFrame(updateCounter)
    } else {
      element.textContent = target
    }
  }
  updateCounter()
}

// Intersection Observer for better performance
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("revealed")
      // Animate counters when they come into view
      if (entry.target.classList.contains("counter")) {
        const target = Number.parseInt(entry.target.getAttribute("data-target"))
        animateCounter(entry.target, target)
        observer.unobserve(entry.target)
      }
    }
  })
}, observerOptions)

// Observe all scroll reveal elements
document.querySelectorAll(".scroll-reveal").forEach((element) => {
  observer.observe(element)
})

// Observe all counters
document.querySelectorAll(".counter").forEach((element) => {
  observer.observe(element)
})

// Scroll to Top Button
const scrollTopBtn = document.getElementById("scroll-top")
let scrollTimeout

window.addEventListener("scroll", () => {
  clearTimeout(scrollTimeout)
  scrollTimeout = setTimeout(() => {
    if (window.pageYOffset > 300) {
      scrollTopBtn.style.opacity = "1"
      scrollTopBtn.style.pointerEvents = "auto"
    } else {
      scrollTopBtn.style.opacity = "0"
      scrollTopBtn.style.pointerEvents = "none"
    }
  }, 10)
})

scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  })
  scrollTopBtn.classList.add("bounce-slow")
  setTimeout(() => {
    scrollTopBtn.classList.remove("bounce-slow")
  }, 1000)
})

// Floating Action Buttons
const whatsappFloat = document.getElementById("whatsapp-float")
const phoneFloat = document.getElementById("phone-float")

whatsappFloat.addEventListener("click", function () {
  this.classList.add("shake")
  setTimeout(() => {
    this.classList.remove("shake")
  }, 500)
  // Open WhatsApp
  window.open("https://wa.link/3n2v21")
})

phoneFloat.addEventListener("click", function () {
  this.classList.add("bounce-slow")
  setTimeout(() => {
    this.classList.remove("bounce-slow")
  }, 1000)
  // Make phone call
  window.location.href = "tel:+6281563450004"
})

// Service Cards Hover Effects
document.querySelectorAll(".service-card").forEach((card) => {
  card.addEventListener("mouseenter", function () {
    if (window.innerWidth > 768) {
      this.style.transform = "translateY(-10px) scale(1.02)"
      this.style.boxShadow = "0 20px 40px rgba(0,0,0,0.15)"
    }
  })
  card.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) scale(1)"
    this.style.boxShadow = "0 4px 6px rgba(0,0,0,0.1)"
  })
})

// Testimonial Cards Animation
document.querySelectorAll(".testimonial-card").forEach((card) => {
  card.addEventListener("mouseenter", function () {
    if (window.innerWidth > 768) {
      this.style.transform = "translateY(-5px) rotateY(5deg)"
      this.style.boxShadow = "0 15px 30px rgba(0,0,0,0.2)"
    }
  })
  card.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) rotateY(0deg)"
    this.style.boxShadow = "0 4px 6px rgba(0,0,0,0.1)"
  })
})

// CTA Buttons Animation
document.querySelectorAll(".cta-btn").forEach((btn) => {
  btn.addEventListener("click", function () {
    this.classList.add("pulse-glow")
    // Create ripple effect
    const ripple = document.createElement("span")
    ripple.style.position = "absolute"
    ripple.style.borderRadius = "50%"
    ripple.style.background = "rgba(255,255,255,0.6)"
    ripple.style.transform = "scale(0)"
    ripple.style.animation = "ripple 0.6s linear"
    ripple.style.left = "50%"
    ripple.style.top = "50%"
    ripple.style.width = "20px"
    ripple.style.height = "20px"
    ripple.style.marginLeft = "-10px"
    ripple.style.marginTop = "-10px"
    this.style.position = "relative"
    this.appendChild(ripple)
    setTimeout(() => {
      ripple.remove()
      this.classList.remove("pulse-glow")
    }, 600)
  })
})

// Improved Search Functionality
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('article-search');
    
    if (searchInput) {
        // Focus and styling effects
        searchInput.addEventListener('focus', function() {
            this.style.borderColor = "#dc2626";
            this.style.boxShadow = "0 0 0 3px rgba(220, 38, 38, 0.1)";
        });

        searchInput.addEventListener('blur', function() {
            this.style.borderColor = "#d1d5db";
            this.style.boxShadow = "none";
        });

        // Search functionality
        searchInput.addEventListener('keyup', function(e) {
            if (e.key === 'Enter') {
                performSearch(this.value.trim());
            }
        });

        // Click on search icon to search
        const searchIcon = searchInput.previousElementSibling;
        if (searchIcon) {
            searchIcon.addEventListener('click', function() {
                performSearch(searchInput.value.trim());
            });
        }
    }

    function performSearch(query) {
        if (query.length > 0) {
            // Here you would typically make an AJAX request or filter content
            console.log('Searching for:', query);
            // Example: window.location.href = '/search?q=' + encodeURIComponent(query);
            
            // For demo purposes - show an alert
            alert('Akan mencari: ' + query);
            
            // In a real implementation, you would:
            // 1. Make an AJAX request to your search endpoint
            // 2. Update the page content with search results
            // 3. Or redirect to a search results page
        }
    }
})

// Data artikel (bisa juga diambil dari API)
const articlesData = [
    {
        id: 1,
        title: "Jasa Basmi Rayap di Jakarta | Jasa Anti Rayap - Pest Control",
        date: "Maret 19, 2025",
        excerpt: "Solusi terbaik untuk masalah rayap di properti Anda dengan teknologi terbaru.",
        image: "galeri4.jpg",
        category: "Anti Rayap"
    },
    {
        id: 2,
        title: "Jasa Pest Control Terbaik Jakarta | Jasa Pengendalian Hama",
        date: "Maret 18, 2025",
        excerpt: "Layanan profesional untuk mengendalikan berbagai jenis hama di rumah dan bisnis Anda.",
        image: "galeri40.jpg",
        category: "Pest Control"
    },
];

// Fungsi untuk menampilkan artikel
function displayArticles(articles) {
    const container = document.getElementById('articles-container');
    if (!container) return;
    
    container.innerHTML = '';
    
    articles.forEach(article => {
        const articleEl = document.createElement('div');
        articleEl.className = 'flex gap-3 group cursor-pointer hover-glow p-2 rounded-lg article-item';
        articleEl.innerHTML = `
            <img src="${article.image}" alt="${article.title}"
                 class="w-12 h-12 xl:w-16 xl:h-16 rounded-lg object-cover group-hover:scale-105 transition-transform duration-200">
            <div class="flex-1 min-w-0">
                <h4 class="text-xs xl:text-sm font-medium text-gray-800 leading-tight group-hover:text-red-600 transition-colors duration-200">
                    ${article.title}
                </h4>
                <p class="text-xs text-gray-500 mt-1 xl:mt-2 flex items-center gap-1">
                    <i class="fas fa-calendar w-3 h-3"></i>
                    ${article.date}
                </p>
            </div>
        `;
        articleEl.addEventListener('click', () => openArticleModal(article.id));
        container.appendChild(articleEl);
    });
}

// Fungsi untuk mencari artikel
function searchArticles(keyword) {
    const container = document.getElementById('articles-container');
    if (!container) return;
    
    if (!keyword) {
        // Jika pencarian kosong, tampilkan semua artikel
        displayArticles(articlesData);
        return;
    }
    
    const lowerKeyword = keyword.toLowerCase();
    const filteredArticles = articlesData.filter(article => 
        article.title.toLowerCase().includes(lowerKeyword)
    );
    
    if (filteredArticles.length === 0) {
        container.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search mb-2 text-2xl"></i>
                <p>Tidak ditemukan artikel dengan kata kunci "${keyword}"</p>
            </div>
        `;
    } else {
        displayArticles(filteredArticles);
        
        // Highlight kata kunci di judul
        document.querySelectorAll('.article-item h4').forEach(title => {
            const text = title.textContent;
            const regex = new RegExp(keyword, 'gi');
            const newText = text.replace(regex, match => 
                `<span class="search-highlight">${match}</span>`
            );
            title.innerHTML = newText;
        });
    }
}

// Fungsi untuk membuka modal artikel
function openArticleModal(articleId) {
    const article = articlesData.find(a => a.id === articleId);
    if (!article) return;
    
    const modal = document.getElementById('article-modal');
    if (!modal) return;
    
    // Isi modal dengan data artikel
    document.getElementById('article-title').textContent = article.title;
    document.getElementById('article-date').textContent = article.date;
    // ... isi konten lainnya sesuai kebutuhan
    
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

// Setup pencarian saat dokumen siap
document.addEventListener('DOMContentLoaded', function() {
    // Tampilkan semua artikel saat pertama kali load
    displayArticles(articlesData);
    
    // Setup event listener untuk pencarian
    const searchInput = document.getElementById('article-search');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            searchArticles(this.value.trim());
        });
        
        // Tambahkan tombol clear search
        const clearBtn = document.createElement('span');
        clearBtn.className = 'absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer hidden';
        clearBtn.innerHTML = '<i class="fas fa-times text-gray-400 hover:text-red-500"></i>';
        
        searchInput.parentNode.appendChild(clearBtn);
        
        searchInput.addEventListener('input', function() {
            if (this.value.length > 0) {
                clearBtn.classList.remove('hidden');
            } else {
                clearBtn.classList.add('hidden');
            }
        });
        
        clearBtn.addEventListener('click', function() {
            searchInput.value = '';
            searchArticles('');
            this.classList.add('hidden');
        });
    }
})

document.addEventListener('DOMContentLoaded', function() {
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const mobileToggle = document.getElementById('mobile-sidebar-toggle');
    const toggleIcon = document.getElementById('toggle-icon');
    
    let isSidebarOpen = false;
    
    // Function to toggle sidebar
    function toggleSidebar() {
        isSidebarOpen = !isSidebarOpen;
        
        if (window.innerWidth < 1024) {
            // Mobile behavior
            sidebar.classList.toggle('translate-x-0', isSidebarOpen);
            sidebar.classList.toggle('translate-x-full', !isSidebarOpen);
        } else {
            // Desktop behavior
            if (isSidebarOpen) {
                sidebar.classList.remove('translate-x-[calc(100%-40px)]');
                sidebar.classList.add('translate-x-0');
                toggleIcon.classList.replace('fa-chevron-left', 'fa-chevron-right');
            } else {
                sidebar.classList.remove('translate-x-0');
                sidebar.classList.add('translate-x-[calc(100%-40px)]');
                toggleIcon.classList.replace('fa-chevron-right', 'fa-chevron-left');
            }
        }
    }
    
    // Desktop behavior
    if (sidebarToggle) {
        sidebar.addEventListener('mouseenter', function() {
            if (window.innerWidth >= 1024 && !isSidebarOpen) {
                sidebar.classList.remove('translate-x-[calc(100%-40px)]');
                sidebar.classList.add('translate-x-0');
            }
        });
        
        sidebar.addEventListener('mouseleave', function() {
            if (window.innerWidth >= 1024 && !isSidebarOpen) {
                sidebar.classList.remove('translate-x-0');
                sidebar.classList.add('translate-x-[calc(100%-40px)]');
            }
        });
        
        sidebarToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleSidebar();
        });
    }
    
    // Mobile toggle
    if (mobileToggle) {
        mobileToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleSidebar();
        });
    }
    
    // Close sidebar when clicking outside
    document.addEventListener('click', function(e) {
        if (isSidebarOpen && !sidebar.contains(e.target) && 
            (!sidebarToggle || !sidebarToggle.contains(e.target)) &&
            (!mobileToggle || !mobileToggle.contains(e.target))) {
            toggleSidebar();
        }
    });
    
    // Responsive adjustments
    function handleResize() {
        if (window.innerWidth < 1024) {
            // Mobile behavior
            sidebar.classList.remove('translate-x-[calc(100%-40px)]', 'translate-x-0');
            sidebar.classList.add('translate-x-full');
            if (sidebarToggle) sidebarToggle.style.display = 'none';
            if (mobileToggle) mobileToggle.style.display = 'flex';
            isSidebarOpen = false;
        } else {
            // Desktop behavior
            sidebar.classList.remove('translate-x-full');
            if (!isSidebarOpen) {
                sidebar.classList.remove('translate-x-0');
                sidebar.classList.add('translate-x-[calc(100%-40px)]');
            }
            if (sidebarToggle) sidebarToggle.style.display = 'flex';
            if (mobileToggle) mobileToggle.style.display = 'none';
        }
    }
    
    window.addEventListener('resize', handleResize);
    handleResize(); // Initialize
})

// Navigation Active State
function updateActiveNav() {
  const sections = document.querySelectorAll("section[id]")
  const navLinks = document.querySelectorAll(".nav-link")
  let current = ""

  sections.forEach((section) => {
    const sectionTop = section.getBoundingClientRect().top
    if (sectionTop <= 100) {
      current = section.getAttribute("id")
    }
  })

  navLinks.forEach((link) => {
    link.classList.remove("text-red-600", "bg-red-50")
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("text-red-600", "bg-red-50")
    }
  })
}

// Particle Animation Enhancement
function createParticle() {
  const particle = document.createElement("div")
  particle.className = "particle"
  particle.style.left = Math.random() * 100 + "%"
  particle.style.width = Math.random() * 5 + 2 + "px"
  particle.style.height = particle.style.width
  particle.style.animationDuration = Math.random() * 10 + 10 + "s"
  particle.style.animationDelay = Math.random() * 5 + "s"
  return particle
}

// Add more particles dynamically
document.querySelectorAll(".particles").forEach((container) => {
  for (let i = 0; i < 3; i++) {
    setTimeout(() => {
      container.appendChild(createParticle())
    }, i * 2000)
  }
})

// Form Validation and Animation
document.querySelectorAll("input, textarea").forEach((input) => {
  input.addEventListener("focus", function () {
    if (this.parentElement) {
      this.parentElement.classList.add("focused")
    }
    this.style.transform = "scale(1.02)"
  })

  input.addEventListener("blur", function () {
    if (this.parentElement) {
      this.parentElement.classList.remove("focused")
    }
    this.style.transform = "scale(1)"
    if (this.value.trim() !== "") {
      this.classList.add("has-value")
    } else {
      this.classList.remove("has-value")
    }
  })
})

// Newsletter Subscription
const newsletterForm = document.querySelector("footer .flex")
if (newsletterForm) {
  const emailInput = newsletterForm.querySelector('input[type="email"]')
  const submitBtn = newsletterForm.querySelector("button")

  submitBtn.addEventListener("click", function (e) {
    e.preventDefault()
    if (emailInput.value.trim() === "") {
      emailInput.style.borderColor = "#ef4444"
      emailInput.classList.add("shake")
      setTimeout(() => {
        emailInput.classList.remove("shake")
        emailInput.style.borderColor = "#374151"
      }, 500)
      return
    }

    // Success animation
    this.innerHTML = '<i class="fas fa-check"></i>'
    this.style.backgroundColor = "#10b981"
    setTimeout(() => {
      this.innerHTML = '<i class="fas fa-paper-plane"></i>'
      this.style.backgroundColor = "#dc2626"
      emailInput.value = ""
    }, 2000)
  })
}

// Performance Optimization
let ticking = false
function updateAnimations() {
  updateActiveNav()
  ticking = false
}

window.addEventListener("scroll", () => {
  if (!ticking) {
    requestAnimationFrame(updateAnimations)
    ticking = true
  }
})

// Initialize all animations when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Add entrance animations to elements
  setTimeout(() => {
    document.querySelectorAll(".slide-in-left").forEach((el, index) => {
      setTimeout(() => {
        el.style.opacity = "1"
        el.style.transform = "translateX(0)"
      }, index * 100)
    })

    document.querySelectorAll(".slide-in-right").forEach((el, index) => {
      setTimeout(() => {
        el.style.opacity = "1"
        el.style.transform = "translateX(0)"
      }, index * 100)
    })

    document.querySelectorAll(".fade-in-up").forEach((el, index) => {
      setTimeout(() => {
        el.style.opacity = "1"
        el.style.transform = "translateY(0)"
      }, index * 100)
    })
  }, 500)
})

// Easter Egg - Konami Code
let konamiCode = []
const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]

document.addEventListener("keydown", (e) => {
  konamiCode.push(e.keyCode)
  if (konamiCode.length > konamiSequence.length) {
    konamiCode.shift()
  }
  if (konamiCode.join(",") === konamiSequence.join(",")) {
    // Easter egg activated!
    document.body.style.animation = "rainbow 2s infinite"
    setTimeout(() => {
      document.body.style.animation = ""
    }, 5000)
    konamiCode = []
  }
})

// Touch events for mobile
let touchStartY = 0
let touchEndY = 0

document.addEventListener("touchstart", (e) => {
  touchStartY = e.changedTouches[0].screenY
})

document.addEventListener("touchend", (e) => {
  touchEndY = e.changedTouches[0].screenY
  handleSwipe()
})

function handleSwipe() {
  if (touchEndY < touchStartY - 50) {
    // Swipe up - could trigger some action
  }
  if (touchEndY > touchStartY + 50) {
    // Swipe down - could trigger some action
  }
}