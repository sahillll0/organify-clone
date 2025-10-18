window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    if (loader) {
        setTimeout(() => {
            loader.classList.add('hidden');
        }, 2000); // Hide after 2 seconds
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const slider = document.querySelector('.product-slider');
    const prevBtn = document.querySelector('.nav-button.prev');
    const nextBtn = document.querySelector('.nav-button.next');
    const cards = document.querySelectorAll('.product-card');
    
    // Clone products for infinite scroll
    cards.forEach(card => {
        const clone = card.cloneNode(true);
        slider.appendChild(clone);
    });

    let currentIndex = 0;
    const cardWidth = 300; // card width + gap
    const totalCards = slider.children.length;
    let isAnimating = false;

    function updateSlider(direction) {
        if (isAnimating) return;
        isAnimating = true;

        if (direction === 'next') {
            currentIndex++;
            if (currentIndex >= totalCards / 2) {
                setTimeout(() => {
                    slider.style.transition = 'none';
                    currentIndex = 0;
                    slider.style.transform = `translateX(0)`;
                    setTimeout(() => {
                        slider.style.transition = 'transform 0.5s ease';
                    }, 50);
                }, 500);
            }
        } else {
            if (currentIndex <= 0) {
                slider.style.transition = 'none';
                currentIndex = totalCards / 2;
                slider.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
                setTimeout(() => {
                    slider.style.transition = 'transform 0.5s ease';
                }, 50);
                currentIndex--;
            } else {
                currentIndex--;
            }
        }

        slider.style.transform = `translateX(-${currentIndex * cardWidth}px)`;

        setTimeout(() => {
            isAnimating = false;
        }, 500);
    }

    // Button click handlers
    nextBtn.addEventListener('click', () => updateSlider('next'));
    prevBtn.addEventListener('click', () => updateSlider('prev'));

    // Auto slide every 5 seconds
    let autoSlide = setInterval(() => {
        updateSlider('next');
    }, 5000);

    // Pause auto-slide on hover
    slider.addEventListener('mouseenter', () => clearInterval(autoSlide));
    slider.addEventListener('mouseleave', () => {
        autoSlide = setInterval(() => {
            updateSlider('next');
        }, 5000);
    });

    // Handle window resize
    window.addEventListener('resize', () => {
        slider.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
    });
});

const products = [
  {
    id: 1,
    name: "Organic Veggie Chips",
    category: "Vegan",
    price: 45.99,
    image: "https://demo.casethemes.net/organify/wp-content/uploads/2024/09/pd14-min-600x600.png",
    discount: "25%"
  },
  {
    id: 2,
    name: "Crunchy Multigrain Crackers",
    category: "Crackers",
    price: 39.50,
    image: "https://demo.casethemes.net/organify/wp-content/uploads/2024/09/pd15-min-600x600.png",
    discount: "30%"
  },
  {
    id: 3,
    name: "Fresh Apple Delight",
    category: "Fruits",
    price: 28.25,
    image: "https://demo.casethemes.net/organify/wp-content/uploads/2024/09/pd13-min-600x600.png",
    discount: "18%"
  },
  {
    id: 4,
    name: "Classic Tomato Sauce",
    category: "Sauce",
    price: 33.75,
    image: "https://demo.casethemes.net/organify/wp-content/uploads/2024/09/pd12-min-600x600.png",
    discount: "22%"
  },
  {
    id: 5,
    name: "Sweet Snacks",
    category: "Fruits",
    price: 20.75,
    image: "https://demo.casethemes.net/organify/wp-content/uploads/2024/09/pd11-min-600x600.png",
    discount: "26%"
  },
  {
    id: 6,
    name: "Spicy Vegan Curry Bowl",
    category: "Vegan Curry",
    price: 59.99,
    image: "https://demo.casethemes.net/organify/wp-content/uploads/2024/09/pd10-min-600x600.png",
    discount: "35%"
  },
  {
    id: 7,
    name: "Gluten-Free Crackers",
    category: "Crackers",
    price: 42.80,
    image: "https://demo.casethemes.net/organify/wp-content/uploads/2024/09/pd8-min-600x600.png",
    discount: "27%"
  },
  {
    id: 8,
    name: "Tropical Mixed Fruits",
    category: "Fruits",
    price: 31.40,
    image: "https://demo.casethemes.net/organify/wp-content/uploads/2024/09/pd7-min-600x600.png",
    discount: "20%"
  },
  {
    id: 9,
    name: "Organic Green Sauce",
    category: "Sauce",
    price: 49.60,
    image: "https://demo.casethemes.net/organify/wp-content/uploads/2024/09/pd5-min-600x600.png",
    discount: "32%"
  },
  {
    id: 10,
    name: "Vegan Protein Bites",
    category: "Vegan",
    price: 54.90,
    image: "https://demo.casethemes.net/organify/wp-content/uploads/2024/09/pd4-min-600x600.png",
    discount: "28%"
  },
  {
    id: 11,
    name: "Healthy Fruit Mix",
    category: "Fruits",
    price: 29.99,
    image: "https://demo.casethemes.net/organify/wp-content/uploads/2024/09/pd2-min-600x600.png",
    discount: "19%"
  },
  {
    id: 12,
    name: "Coconut Vegan Curry",
    category: "Vegan Curry",
    price: 62.50,
    image: "https://demo.casethemes.net/organify/wp-content/uploads/2024/09/pd1-min-600x600.png",
    discount: "40%"
  }
];


document.addEventListener('DOMContentLoaded', () => {
    const productsContainer = document.querySelector('.products-container');
    const filterButtons = document.querySelectorAll('.filter-btn');

    // Function to create product card HTML
    function createProductCard(product) {
        return `
            <div class="product-item" data-category="${product.category.toLowerCase()}">
                ${product.discount ? `<div class="discount-badge">${product.discount}</div>` : ''}
                <div class="product-img">
                    <img src="${product.image}" alt="${product.name}">
                    <div class="hover-actions">
                        <button class="action-btn add-to-cart">
                            <i class="ri-shopping-cart-line"></i>
                        </button>
                        <button class="action-btn favorite">
                            <i class="ri-heart-line"></i>
                        </button>
                        <button class="action-btn quick-view">
                            <i class="ri-eye-line"></i>
                        </button>
                    </div>
                </div>
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p class="price">$${product.price.toFixed(2)}</p>
                </div>
            </div>
        `;
    }

    // Render products
    function renderProducts(filteredProducts) {
        productsContainer.innerHTML = filteredProducts.map(createProductCard).join('');
    }

    // Filter button functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Toggle active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter').toLowerCase();

            // Filter logic
            const filteredProducts = filterValue === 'all'
                ? products
                : products.filter(product => product.category.toLowerCase().includes(filterValue));

            renderProducts(filteredProducts);
        });
    });

    // Initial render
    renderProducts(products);
});


const page5 = document.querySelector('.page5');

window.addEventListener('scroll', () => {
  const rect = page5.getBoundingClientRect();
  const inView = rect.top < window.innerHeight && rect.bottom > 0;
  
  if (inView) {
    page5.classList.add('zoom');
  } else {
    page5.classList.remove('zoom');
  }
});

function initTestimonialSlider() {
    const wrapper = document.getElementById('testimonialWrapper');
    const slides = document.querySelectorAll('.testimonial-slide');
    let currentIndex = 0;
    let isAnimating = false;

    // Clone slides for infinite loop
    slides.forEach(slide => {
        const clone = slide.cloneNode(true);
        wrapper.appendChild(clone);
    });

    function updateSlider() {
        wrapper.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    function nextSlide() {
        if (isAnimating) return;
        isAnimating = true;

        currentIndex++;
        wrapper.style.transition = 'transform 0.5s ease';
        updateSlider();

        // Reset to first slide when reaching the end
        if (currentIndex >= slides.length) {
            setTimeout(() => {
                wrapper.style.transition = 'none';
                currentIndex = 0;
                updateSlider();
                setTimeout(() => {
                    wrapper.style.transition = 'transform 0.5s ease';
                }, 50);
            }, 500);
        }

        setTimeout(() => {
            isAnimating = false;
        }, 500);
    }

    function prevSlide() {
        if (isAnimating) return;
        isAnimating = true;

        if (currentIndex === 0) {
            wrapper.style.transition = 'none';
            currentIndex = slides.length;
            updateSlider();
            setTimeout(() => {
                wrapper.style.transition = 'transform 0.5s ease';
                currentIndex--;
                updateSlider();
            }, 50);
        } else {
            currentIndex--;
            updateSlider();
        }

        setTimeout(() => {
            isAnimating = false;
        }, 500);
    }

    // Add event listeners for navigation buttons
    document.querySelector('.prev-btn').addEventListener('click', prevSlide);
    document.querySelector('.next-btn').addEventListener('click', nextSlide);

    // Auto slide every 3 seconds
    let autoSlide = setInterval(nextSlide, 3000);

    // Pause auto-slide on hover
    wrapper.addEventListener('mouseenter', () => clearInterval(autoSlide));
    wrapper.addEventListener('mouseleave', () => {
        autoSlide = setInterval(nextSlide, 3000);
    });
}

// Initialize the slider when DOM is loaded
document.addEventListener('DOMContentLoaded', initTestimonialSlider);

document.addEventListener('DOMContentLoaded', () => {
    // Animate elements on scroll
    const animatedElements = document.querySelectorAll('.page2-text, .page4-content h2, .page5 .page5-content h2, .page6-top h1, .page7 .page7-content h2, .mall-content h2');

    // Add the class for initial state
    animatedElements.forEach(el => el.classList.add('animate-on-scroll'));

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                // Stop observing once animated
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2 // Trigger when 20% of the element is visible
    });

    animatedElements.forEach(el => {
        observer.observe(el);
    });
});

let currentSlide = 0;
    const slides = document.querySelectorAll('#slider-card-1 .slider-image');
    const totalSlides = slides.length;

    /**
     * Changes the currently visible slide in the carousel.
     * @param {number} n - The direction to move: 1 for next, -1 for previous.
     */
    function changeSlide(n) {
        // Hide the current slide
        slides[currentSlide].classList.remove('active');

        // Calculate the new slide index, ensuring it wraps around
        currentSlide = (currentSlide + n + totalSlides) % totalSlides;

        // Show the new slide
        slides[currentSlide].classList.add('active');
    }

    // Initialize: Ensure only the first slide is visible when the page loads
    document.addEventListener('DOMContentLoaded', () => {
        if (slides.length > 0) {
            slides.forEach((slide, index) => {
                slide.classList.remove('active');
            });
            slides[0].classList.add('active');
        }
    });


// --- Post Card Slider (Page 7) ---
let currentPostSlide = 0;
const postSlides = document.querySelectorAll('#post-card-slider .slider-image');
const totalPostSlides = postSlides.length;

/**
 * Changes the currently visible slide in the post card carousel.
 * @param {number} n - The direction to move: 1 for next, -1 for previous.
 */
function changePostSlide(n) {
    if (totalPostSlides === 0) return;

    // Hide the current slide
    postSlides[currentPostSlide].classList.remove('active');

    // Calculate the new slide index, ensuring it wraps around
    currentPostSlide = (currentPostSlide + n + totalPostSlides) % totalPostSlides;

    // Show the new slide
    postSlides[currentPostSlide].classList.add('active');
}

// Add a style rule to hide inactive slides
const style = document.createElement('style');
style.innerHTML = `
    #post-card-slider .slider-image:not(.active) { display: none; }
`;
document.head.appendChild(style);