document.addEventListener("DOMContentLoaded", function() {
    
    // --- 1. Fade-in 动画逻辑 ---
    const observerOptions = {
        root: null, // 视口
        rootMargin: '0px',
        threshold: 0.1 // 元素出现 10% 时触发
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible'); // 添加 .visible 类触发 CSS 动画
                observer.unobserve(entry.target); // 只需要触发一次，之后不再监听
            }
        });
    }, observerOptions);

    // 选取所有带有 .fade-in 类的元素
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });


    // --- 2. 返回顶部按钮逻辑 ---
    const backToTopBtn = document.getElementById("backToTopBtn");

    if (backToTopBtn) {
        // 监听窗口滚动事件
        window.onscroll = function() {
            // 如果向下滚动超过 300px，显示按钮
            if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
                backToTopBtn.style.display = "flex"; // 使用 flex 保持居中布局
            } else {
                backToTopBtn.style.display = "none";
            }
        };

        // 监听按钮点击事件
        backToTopBtn.addEventListener("click", function() {
            // 平滑滚动回顶部
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

    // --- 3. 语言切换逻辑 ---
    const langToggleBtn = document.getElementById('langToggle');
    const STORAGE_KEY = 'mira_lang';

    if (langToggleBtn) {
        let currentLang = localStorage.getItem(STORAGE_KEY) || 'en';

        function applyLang(lang) {
            currentLang = lang;
            document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
            localStorage.setItem(STORAGE_KEY, lang);
            langToggleBtn.textContent = lang === 'zh' ? 'EN' : '中文';

            document.querySelectorAll('[data-en],[data-zh]').forEach(el => {
                const text = el.getAttribute('data-' + lang);
                if (text !== null) {
                    el.innerHTML = text;
                }
            });
        }

        applyLang(currentLang);

        langToggleBtn.addEventListener('click', function() {
            applyLang(currentLang === 'en' ? 'zh' : 'en');
        });
    }

});