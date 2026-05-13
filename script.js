document.addEventListener('DOMContentLoaded', () => {
    // 导航栏滚动效果
    const navbar = document.getElementById('navbar');
    const navLinks = document.getElementById('navLinks');
    const menuToggle = document.getElementById('menuToggle');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 响应式菜单切换
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = menuToggle.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // 点击导航链接时关闭菜单
    const navItems = navLinks.querySelectorAll('a');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });

    // 平滑滚动到锚点
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 滚动动画效果
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

    // 为各个区域添加动画
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    // 为卡片添加动画
    const cards = document.querySelectorAll('.pain-card, .solution-card, .feature-item');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
        observer.observe(card);
    });

    // 按钮点击效果
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .btn-outline');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // 创建涟漪效果
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // 文档预览动画
    const docLines = document.querySelectorAll('.doc-line');
    docLines.forEach((line, index) => {
        line.style.opacity = '0';
        line.style.transform = 'translateX(-20px)';
        line.style.transition = `opacity 0.5s ease ${index * 0.2}s, transform 0.5s ease ${index * 0.2}s`;
    });

    setTimeout(() => {
        docLines.forEach(line => {
            line.style.opacity = '1';
            line.style.transform = 'translateX(0)';
        });
    }, 500);

    // 数字动画
    const animateNumbers = () => {
        const numbers = document.querySelectorAll('.stat-number');
        numbers.forEach(number => {
            const target = parseInt(number.textContent.replace(/[^0-9]/g, ''));
            const suffix = number.textContent.replace(/[0-9]/g, '');
            let current = 0;
            const increment = target / 60;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    number.textContent = target + suffix;
                    clearInterval(timer);
                } else {
                    number.textContent = Math.floor(current) + suffix;
                }
            }, 16);
        });
    };

    // 当用户滚动到Hero区域时触发数字动画
    const heroSection = document.getElementById('hero');
    let numbersAnimated = false;
    
    const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !numbersAnimated) {
                animateNumbers();
                numbersAnimated = true;
            }
        });
    }, { threshold: 0.5 });
    
    heroObserver.observe(heroSection);

    // 安全徽章浮动动画
    const securityBadge = document.querySelector('.security-badge');
    if (securityBadge) {
        securityBadge.addEventListener('mouseenter', () => {
            securityBadge.style.animation = 'none';
        });
        securityBadge.addEventListener('mouseleave', () => {
            securityBadge.style.animation = 'float 3s ease-in-out infinite';
        });
    }

    // 对比表格悬停效果
    const tableRows = document.querySelectorAll('.table-row');
    tableRows.forEach(row => {
        row.addEventListener('mouseenter', () => {
            row.style.transform = 'scale(1.02)';
        });
        row.addEventListener('mouseleave', () => {
            row.style.transform = 'scale(1)';
        });
    });
});

// 添加涟漪效果样式
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }

    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }

    .btn-primary, .btn-secondary, .btn-outline {
        position: relative;
        overflow: hidden;
    }

    .table-row {
        transition: transform 0.3s ease, background 0.3s ease;
    }
`;
document.head.appendChild(style);