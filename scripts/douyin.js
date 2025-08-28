// 抖音页面功能 - 苹果风格设计

document.addEventListener('DOMContentLoaded', function() {
    // 初始化页面功能
    initDouyinPage();
});

// 初始化抖音页面功能
function initDouyinPage() {
    // 添加复制成功提示元素
    addCopyNotification();
    
    // 添加二维码点击放大功能
    addQRCodeZoom();
    
    // 添加页面滚动动画
    addScrollAnimations();
}

// 复制抖音号功能
function copyDouyinId() {
    const douyinId = 'dy17832byk3p4';
    
    // 使用现代浏览器的 Clipboard API
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(douyinId).then(function() {
            showCopyNotification('抖音号已复制到剪贴板！');
        }).catch(function(err) {
            console.error('复制失败:', err);
            fallbackCopy(douyinId);
        });
    } else {
        // 降级方案
        fallbackCopy(douyinId);
    }
}

// 降级复制方案
function fallbackCopy(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        const successful = document.execCommand('copy');
        if (successful) {
            showCopyNotification('抖音号已复制到剪贴板！');
        } else {
            showCopyNotification('复制失败，请手动复制：' + text);
        }
    } catch (err) {
        console.error('复制失败:', err);
        showCopyNotification('复制失败，请手动复制：' + text);
    }
    
    document.body.removeChild(textArea);
}

// 显示复制成功提示
function showCopyNotification(message) {
    const notification = document.querySelector('.copy-notification');
    if (notification) {
        notification.textContent = message;
        notification.classList.add('show');
        
        // 3秒后自动隐藏
        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    }
}

// 添加复制成功提示元素
function addCopyNotification() {
    const notification = document.createElement('div');
    notification.className = 'copy-notification';
    notification.textContent = '复制成功！';
    document.body.appendChild(notification);
}

// 添加二维码点击放大功能
function addQRCodeZoom() {
    const qrImage = document.querySelector('.qr-image');
    if (qrImage) {
        qrImage.addEventListener('click', function() {
            // 创建模态框显示大图
            showQRModal(this.src);
        });
        
        // 添加点击提示
        qrImage.style.cursor = 'pointer';
        qrImage.title = '点击查看大图';
    }
}

// 显示二维码模态框
function showQRModal(imageSrc) {
    // 创建模态框
    const modal = document.createElement('div');
    modal.className = 'qr-modal';
    modal.innerHTML = `
        <div class="modal-overlay"></div>
        <div class="modal-content">
            <button class="modal-close">&times;</button>
            <img src="${imageSrc}" alt="抖音二维码" class="modal-image">
            <p class="modal-text">扫描二维码关注我的抖音</p>
        </div>
    `;
    
    // 添加模态框样式
    const style = document.createElement('style');
    style.textContent = `
        .qr-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 2000;
            display: flex;
            align-items: center;
            justify-content: center;
            animation: fadeIn 0.3s ease;
        }
        
        .modal-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.8);
            backdrop-filter: blur(10px);
        }
        
        .modal-content {
            position: relative;
            background-color: white;
            border-radius: var(--border-radius-lg);
            padding: var(--spacing-lg);
            text-align: center;
            max-width: 90vw;
            max-height: 90vh;
            animation: scaleIn 0.3s ease;
        }
        
        .modal-close {
            position: absolute;
            top: 10px;
            right: 15px;
            background: none;
            border: none;
            font-size: 2rem;
            cursor: pointer;
            color: var(--text-secondary);
            line-height: 1;
        }
        
        .modal-close:hover {
            color: var(--text-primary);
        }
        
        .modal-image {
            max-width: 300px;
            max-height: 300px;
            border-radius: var(--border-radius-md);
            margin-bottom: var(--spacing-md);
        }
        
        .modal-text {
            color: var(--text-secondary);
            font-size: var(--font-size-small);
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes scaleIn {
            from { transform: scale(0.8); }
            to { transform: scale(1); }
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(modal);
    
    // 关闭模态框
    const closeBtn = modal.querySelector('.modal-close');
    const overlay = modal.querySelector('.modal-overlay');
    
    function closeModal() {
        modal.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(modal);
            document.head.removeChild(style);
        }, 300);
    }
    
    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', closeModal);
    
    // ESC键关闭
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
}

// 添加页面滚动动画
function addScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // 观察需要动画的元素
    const animatedElements = document.querySelectorAll('.feature-card, .follow-content');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// 页面加载完成后的额外初始化
window.addEventListener('load', function() {
    // 确保二维码图片加载完成
    const qrImage = document.querySelector('.qr-image');
    if (qrImage) {
        qrImage.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        // 如果图片已经加载完成
        if (qrImage.complete) {
            qrImage.style.opacity = '1';
        }
    }
});

