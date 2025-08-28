// 导航菜单交互脚本
document.addEventListener('DOMContentLoaded', function() {
    // 获取DOM元素
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.querySelector('.navbar');

    // 汉堡菜单切换
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // 点击导航链接时关闭菜单
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (hamburger.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    });

    // 点击外部区域关闭菜单
    document.addEventListener('click', function(event) {
        if (!navbar.contains(event.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });

    // 滚动时导航栏样式变化
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 平滑滚动到锚点链接
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // 如果是外部链接，不处理
            if (href.startsWith('http') || href.startsWith('#')) {
                return;
            }

            // 如果是当前页面的锚点链接
            if (href.includes('#')) {
                e.preventDefault();
                const targetId = href.split('#')[1];
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // 设置当前页面的活动链接状态
    setActiveNavLink();
});

// 设置当前页面的活动导航链接
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        
        // 移除所有活动状态
        link.classList.remove('active');
        
        // 检查是否是当前页面
        if (href === currentPage) {
            link.classList.add('active');
        }
        
        // 特殊处理首页
        if (currentPage === 'index.html' && href === 'index.html') {
            link.classList.add('active');
        }
    });
}

// 页面加载完成后的初始化
window.addEventListener('load', function() {
    // 添加页面加载动画
    document.body.classList.add('loaded');
    
    // 初始化滚动效果
    initScrollEffects();
});

// 初始化滚动效果
function initScrollEffects() {
    // 创建Intersection Observer用于滚动动画
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // 观察需要动画的元素
    const animateElements = document.querySelectorAll('.feature-card, .skill-card, .timeline-item, .contact-card');
    animateElements.forEach(el => {
        observer.observe(el);
    });
}

// 工具函数：防抖函数
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 工具函数：节流函数
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// 响应式导航栏处理
function handleResponsiveNav() {
    const navbar = document.querySelector('.navbar');
    const navMenu = document.querySelector('.nav-menu');
    
    if (window.innerWidth <= 768) {
        // 移动端样式调整
        if (navbar) navbar.classList.add('mobile');
        if (navMenu) navMenu.classList.add('mobile');
    } else {
        // 桌面端样式调整
        if (navbar) navbar.classList.remove('mobile');
        if (navMenu) navMenu.classList.remove('mobile');
        
        // 确保移动端菜单关闭
        const hamburger = document.querySelector('.hamburger');
        if (hamburger) hamburger.classList.remove('active');
        if (navMenu) navMenu.classList.remove('active');
    }
}

// 监听窗口大小变化
window.addEventListener('resize', debounce(handleResponsiveNav, 250));

// 页面加载完成后初始化响应式导航
document.addEventListener('DOMContentLoaded', handleResponsiveNav);
