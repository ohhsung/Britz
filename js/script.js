document.addEventListener('DOMContentLoaded', () => {
    const navItems = document.querySelectorAll('.nav li');
    const gnb = document.getElementById('gnb');
    const header = document.getElementById('header');
    const searchButton = document.querySelector('.util li:first-child');
    const searchArea = document.getElementById('search');
    const closeButton = document.querySelector('#search .item a');
    const utilSvgs = document.querySelectorAll('.util svg');
    const overlay = document.getElementById('overlay');
    const remove = document.querySelector('.remove');
    const mBtn = document.querySelector('.m-tab-btn');
    const mMenu = document.querySelector('#mobile-tab-menu');
    const mX = document.querySelector('.m-x');
    const body = document.body;
    const items = document.querySelectorAll('#main-visual .item');

    let currentIndex = 0;

    function setHeaderStyle({ bgColor, textColor, svgFill, borderBottom = 'none' }) {
        header.style.backgroundColor = bgColor;
        header.style.color = textColor;
        header.style.borderBottom = borderBottom;

        navItems.forEach(item => item.style.color = textColor);
        const h1 = document.querySelector('h1 a');
        if (h1) h1.style.color = textColor;
        utilSvgs.forEach(svg => svg.style.fill = svgFill);
    }

    function preventScroll() {
        body.style.overflow = 'hidden';
    }
    function allowScroll() {
        body.style.overflow = '';
    }

    function updateHeaderOnScroll() {
        if (window.scrollY >= 200) {
            setHeaderStyle({
                bgColor: '#fff',
                textColor: '#000',
                svgFill: '#000',
                borderBottom: '1px solid #ddd'
            });
        } else {
            setHeaderStyle({
                bgColor: 'transparent',
                textColor: '#fff',
                svgFill: '#fff',
                borderBottom: 'none'
            });
        }
    }

    updateHeaderOnScroll();

    window.addEventListener('scroll', () => {
        updateHeaderOnScroll();
        overlay.classList.remove('active');
    });

    header.addEventListener('mouseenter', () => {
        setHeaderStyle({ bgColor: '#fff', textColor: '#000', svgFill: '#000', borderBottom: '1px solid #ddd' });
    });

    header.addEventListener('mouseleave', () => {
        if (gnb.style.visibility !== 'visible' && searchArea.style.visibility !== 'visible') {
            if (window.scrollY >= 200) {
                setHeaderStyle({ bgColor: '#fff', textColor: '#000', svgFill: '#000', borderBottom: '1px solid #ddd' });
            } else {
                setHeaderStyle({ bgColor: 'transparent', textColor: '#fff', svgFill: '#fff', borderBottom: 'none' });
            }
        }
    });

    function openGnb() {
        gnb.classList.add('show');
        preventScroll();
        overlay.classList.add('active');
        setHeaderStyle({ bgColor: '#fff', textColor: '#000', svgFill: '#000', borderBottom: '1px solid #ddd' });
    }

    function closeGnb() {
        gnb.classList.remove('show');
        allowScroll();
        overlay.classList.remove('active');
        if (gnb.style.visibility !== 'visible' && searchArea.style.visibility !== 'visible') {
            if (window.scrollY >= 200) {
                setHeaderStyle({ bgColor: '#fff', textColor: '#000', svgFill: '#000', borderBottom: '1px solid #ddd' });
            } else {
                setHeaderStyle({ bgColor: 'transparent', textColor: '#fff', svgFill: '#fff', borderBottom: 'none' });
            }
        }
    }

    navItems.forEach(item => {
        item.addEventListener('mouseenter', openGnb);
        item.addEventListener('mouseleave', closeGnb);
    });

    gnb.addEventListener('mouseenter', openGnb);
    gnb.addEventListener('mouseleave', closeGnb);

    function openSearch() {
        searchArea.classList.add('show');
        preventScroll();
        header.classList.add('active');
        overlay.classList.add('active');
        setHeaderStyle({ bgColor: '#fff', textColor: '#000', svgFill: '#000', borderBottom: '1px solid #ddd' });
    }

    function closeSearch() {
        searchArea.classList.remove('show');
        allowScroll();
        header.classList.remove('active');
        overlay.classList.remove('active');
        if (gnb.style.visibility !== 'visible' && searchArea.style.visibility !== 'visible') {
            if (window.scrollY >= 200) {
                setHeaderStyle({ bgColor: '#fff', textColor: '#000', svgFill: '#000', borderBottom: '1px solid #ddd' });
            } else {
                setHeaderStyle({ bgColor: 'transparent', textColor: '#fff', svgFill: '#fff', borderBottom: 'none' });
            }
        }
    }

    searchButton.addEventListener('click', e => {
        e.preventDefault();
        openSearch();
    });

    closeButton.addEventListener('click', e => {
        e.preventDefault();
        closeSearch();
    });

    remove.addEventListener('click', closeSearch);

    document.addEventListener('click', e => {
        if (!searchArea.contains(e.target) && !searchButton.contains(e.target)) {
            closeSearch();
        }
    });

    searchArea.addEventListener('mouseenter', () => {
        setHeaderStyle({ bgColor: '#fff', textColor: '#000', svgFill: '#000', borderBottom: '1px solid #ddd' });
    });

    searchArea.addEventListener('mouseleave', () => {
        if (gnb.style.visibility !== 'visible' && searchArea.style.visibility !== 'visible') {
            if (window.scrollY >= 200) {
                setHeaderStyle({ bgColor: '#fff', textColor: '#000', svgFill: '#000', borderBottom: '1px solid #ddd' });
            } else {
                setHeaderStyle({ bgColor: 'transparent', textColor: '#fff', svgFill: '#fff', borderBottom: 'none' });
            }
        }
    });

    function showNextItem() {
        items.forEach(item => item.style.opacity = 0);
        items[currentIndex].style.transition = "opacity 0.8s ease-in-out";
        items[currentIndex].style.opacity = 1;
        currentIndex = (currentIndex + 1) % items.length;
    }

    showNextItem();
    setInterval(showNextItem, 4000);

    mBtn.addEventListener('click', () => {
        mMenu.classList.toggle('active');
        body.classList.toggle('no-scroll');
        overlay.classList.add('active');
    });

    function closeMobileMenu() {
        mMenu.classList.remove('active');
        body.classList.remove('no-scroll');
        overlay.classList.remove('active');
    }

    mX.addEventListener('click', closeMobileMenu);
    overlay.addEventListener('click', closeMobileMenu);
});
