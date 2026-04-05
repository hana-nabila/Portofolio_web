// Sticky Navbar & Active Link
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top >= offset && top < offset + height) {
            navLinks.forEach(link => link.classList.remove('active'));
            const activeLink = document.querySelector('header nav a[href*=' + id + ']');
            if (activeLink) {
                activeLink.classList.add('active');
                const nav = document.querySelector('header nav');
                const linkRect = activeLink.getBoundingClientRect();
                const navRect = nav.getBoundingClientRect();
                nav.style.setProperty('--marker-left', `${linkRect.left - navRect.left}px`);
                nav.style.setProperty('--marker-width', `${linkRect.width}px`);
            }
        }
    });
};

const updateNavMarker = () => {
    const activeLink = document.querySelector('header nav a.active');
    const nav = document.querySelector('header nav');
    if (activeLink && nav) {
        const linkRect = activeLink.getBoundingClientRect();
        const navRect = nav.getBoundingClientRect();
        nav.style.setProperty('--marker-left', `${linkRect.left - navRect.left}px`);
        nav.style.setProperty('--marker-width', `${linkRect.width}px`);
    }
};

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.forEach(item => item.classList.remove('active'));
        link.classList.add('active');
        updateNavMarker();
    });
});

window.addEventListener('load', () => {
    updateNavMarker();
    const aboutDetailBtn = document.querySelector('#about-detail-btn');
    const aboutDetail = document.querySelector('#about-detail');
    if (aboutDetailBtn && aboutDetail) {
        aboutDetailBtn.addEventListener('click', (event) => {
            event.preventDefault();
            aboutDetail.classList.toggle('show');
            if (aboutDetail.classList.contains('show')) {
                aboutDetail.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    }

    // Toggle detail content for kompetensi buttons
    document.querySelectorAll('.service-toggle').forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            const serviceBox = button.closest('.services-box');
            const detail = serviceBox.querySelector('.service-detail');
            if (detail) {
                detail.classList.toggle('show');
                if (detail.classList.contains('show')) {
                    detail.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });

    // Toggle detail content for project detail buttons
    document.querySelectorAll('.project-detail-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            const projectCard = button.closest('.project-card');
            const detail = projectCard.querySelector('.project-detail');
            if (detail) {
                detail.classList.toggle('show');
                if (detail.classList.contains('show')) {
                    detail.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }
            }
        });
    });
});
window.addEventListener('resize', updateNavMarker);

// Skills Animation on Scroll
window.addEventListener('scroll', () => {
    const skillsSection = document.querySelector('#skills');
    const skillsTop = skillsSection.offsetTop;
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;

    if (scrollY + windowHeight > skillsTop + 100) {
        // Animate progress bars
        document.querySelectorAll('.bar span').forEach(span => {
            if (!span.classList.contains('animated')) {
                span.classList.add('animated');
                const targetWidth = span.style.width;
                span.style.width = '0';
                setTimeout(() => {
                    span.style.width = targetWidth;
                }, 100);
            }
        });

        // Animate circles
        document.querySelectorAll('.circle-skill').forEach(circle => {
            if (!circle.classList.contains('animated')) {
                circle.classList.add('animated');
                circle.style.animation = 'circlePulse 2s ease-out forwards';
                const span = circle.querySelector('span');
                if (span) {
                    span.style.animation = 'countUp 2s ease-out forwards';
                }
            }
        });
    }
});

// General Scroll Animations for All Sections
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

