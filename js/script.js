
document.addEventListener('DOMContentLoaded', function () {
    // 헤더
    const navItems = document.querySelectorAll('.nav li'); // nav 항목들
    const gnb = document.getElementById('gnb'); // gnb 드롭다운
    const header = document.getElementById('header'); // header 요소
    const searchButton = document.querySelector('.util li:first-child'); // 검색 버튼
    const searchArea = document.getElementById('search'); // #search 영역
    const closeButton = document.querySelector('#search .item a'); // 닫기 버튼
    const utilSvgs = document.querySelectorAll('.util svg'); // util 안의 모든 svg 아이콘
    const overlay = document.getElementById('overlay')
    const remove = document.querySelector('.remove')
    
    // 모바일 탭메뉴
    const mBtn = document.querySelector('.m-tab-btn');
    const mMenu = document.querySelector('#mobile-tab-menu');
    const mX = document.querySelector('.m-x');
    const body = document.body;

    // 메인 비주얼 슬라이드
    const items = document.querySelectorAll('#main-visual .item');
    let currentIndex = 0;

    // ----------------------------------------------------------------------------- //

    // 드롭다운 열기 시 스크롤 방지
    function preventScroll() {
        document.body.style.overflow = 'hidden';
    }

    // 드롭다운 닫기 시 스크롤 허용
    function allowScroll() {
        document.body.style.overflow = '';
    }

    // 스크롤 이벤트
    window.addEventListener('scroll', function () {
        if (window.scrollY >= 200) { // 스크롤 200px 이상
            // 배경색과 텍스트 색 변경
            header.style.backgroundColor = '#fff';
            header.style.color = '#000';

            navItems.forEach(function (item) {
                item.style.color = '#000'; // .nav li 텍스트 색 변경
            });

            const h1 = document.querySelector('h1 a');
            if (h1) {
                h1.style.color = '#000'; // h1 텍스트 색상 변경
            }

            utilSvgs.forEach(function (svg) {
                svg.style.fill = '#000'; // .util svg 색상 변경
            });
        } else {
            // 스크롤이 800px 미만일 경우 원상복구
            header.style.backgroundColor = 'transparent';
            header.style.color = '#fff';

            navItems.forEach(function (item) {
                item.style.color = '#fff'; // .nav li 원상복구
            });

            const h1 = document.querySelector('h1 a');
            if (h1) {
                h1.style.color = '#fff'; // h1 텍스트 색상 원상복구
            }

            utilSvgs.forEach(function (svg) {
                svg.style.fill = '#fff'; // .util svg 색상 원상복구
            });
        }
    });

    //스크롤 시 오버레이 삭제
    window.addEventListener('scroll', () => {
        overlay.classList.remove('active')
    });

    // #header에 마우스를 올리면 스타일을 변경 (기존 코드)
    header.addEventListener('mouseenter', function () {
        header.style.backgroundColor = '#fff'; // 배경색 변경
        header.style.color = '#000'; // 텍스트 색 변경

        navItems.forEach(function (item) {
            item.style.color = '#000'; // .nav li 텍스트 색 변경
        });

        const h1 = document.querySelector('h1 a');
        if (h1) {
            h1.style.color = '#000'; // h1 텍스트 색상 변경
        }

        utilSvgs.forEach(function (svg) {
            svg.style.fill = '#000'; // .util svg 색상 변경
        });
    });

    // #header에서 마우스를 떼면 원래대로 돌아옴
    header.addEventListener('mouseleave', function () {
        // gnb나 search가 열려있지 않으면 원상복구
        if (gnb.style.visibility !== 'visible' && searchArea.style.visibility !== 'visible') {
            header.style.backgroundColor = 'transparent'; // 배경색 원상복구
            header.style.color = '#fff'; // 텍스트 색 원상복구

            navItems.forEach(function (item) {
                item.style.color = '#fff'; // .nav li 원상복구
            });

            const h1 = document.querySelector('h1 a');
            if (h1) {
                h1.style.color = '#fff'; // h1 텍스트 색상 원상복구
            }

            utilSvgs.forEach(function (svg) {
                svg.style.fill = '#fff'; // .util svg 색상 원상복구
            });
        }
    });

    // 네비게이션 메뉴 (gnb) 드롭다운
    navItems.forEach(function (item) {
        item.addEventListener('mouseenter', function () {
            gnb.classList.add('show');  // 드롭다운 표시
            preventScroll(); // 드롭다운 열리면 스크롤 방지

            overlay.classList.add('active');
        });
    });

    gnb.addEventListener('mouseenter', function () {
        gnb.classList.add('show');  // gnb 계속 보이도록
        preventScroll(); // 드롭다운 열리면 스크롤 방지

        overlay.classList.add('active');
    });

    navItems.forEach(function (item) {
        item.addEventListener('mouseleave', function () {
            gnb.classList.remove('show');  // 드롭다운 숨기기
            allowScroll(); // 드롭다운 닫히면 스크롤 허용

            overlay.classList.remove('active');
        });
    });

    gnb.addEventListener('mouseleave', function () {
        gnb.classList.remove('show');  // gnb 숨기기
        allowScroll(); // 드롭다운 닫히면 스크롤 허용

        overlay.classList.remove('active');
    });

    // 검색 버튼 클릭 시 드롭다운 열기
    searchButton.addEventListener('click', function (event) {
        event.preventDefault();  // 링크 클릭 시 페이지 이동 방지
        searchArea.classList.add('show');  // #search 영역 보이기
        preventScroll(); // 검색 영역 열리면 스크롤 방지

        header.classList.add('active');
        overlay.classList.add('active');
    });

    // 닫기 버튼 클릭 시 드롭다운 닫기
    closeButton.addEventListener('click', function (event) {
        event.preventDefault();  // 링크 클릭 시 페이지 이동 방지
        searchArea.classList.remove('show');  // #search 영역 숨기기
        allowScroll(); // 검색 영역 닫히면 스크롤 허용
        header.classList.remove('active');
        overlay.classList.remove('active');
    });

    // #search 영역 밖을 클릭하면 드롭다운 닫기
    document.addEventListener('click', function (event) {
        if (!searchArea.contains(event.target) && !searchButton.contains(event.target)) {
            searchArea.classList.remove('show');  // #search 영역 숨기기
            allowScroll(); // 검색 영역 닫히면 스크롤 허용
        }
    });

    // 아이콘 클릭시 search 영역 닫기
    remove.addEventListener('click', () => {
        searchArea.classList.remove('show');  // #search 영역 숨기기
        allowScroll(); // 검색 영역 닫히면 스크롤 허용
        header.classList.remove('active');
        overlay.classList.remove('active');
    });

    // GNB 드롭다운이나 검색 영역이 열려있으면 #header의 스타일을 유지하도록 설정
    gnb.addEventListener('mouseenter', function () {
        header.style.backgroundColor = '#fff'; // 배경색 변경
        header.style.color = '#000'; // 텍스트 색 변경

        navItems.forEach(function (item) {
            item.style.color = '#000'; // .nav li 텍스트 색 변경
        });

        const h1 = document.querySelector('h1 a');
        if (h1) {
            h1.style.color = '#000'; // h1 텍스트 색상 변경
        }

        utilSvgs.forEach(function (svg) {
            svg.style.fill = '#000'; // .util svg 색상 변경
        });
    });

    gnb.addEventListener('mouseleave', function () {
        if (gnb.style.visibility !== 'visible' && searchArea.style.visibility !== 'visible') {
            header.style.backgroundColor = 'transparent'; // 배경색 원상복구
            header.style.color = '#fff'; // 텍스트 색 원상복구

            navItems.forEach(function (item) {
                item.style.color = '#fff'; // .nav li 원상복구
            });

            const h1 = document.querySelector('h1 a');
            if (h1) {
                h1.style.color = '#fff'; // h1 텍스트 색상 원상복구
            }

            utilSvgs.forEach(function (svg) {
                svg.style.fill = '#fff'; // .util svg 색상 원상복구
            });
        }
    });

    // #search가 열려 있을 때 #header의 스타일 유지
    searchArea.addEventListener('mouseenter', function () {
        header.style.backgroundColor = '#fff'; // 배경색 변경
        header.style.color = '#000'; // 텍스트 색 변경

        navItems.forEach(function (item) {
            item.style.color = '#000'; // .nav li 텍스트 색 변경
        });

        const h1 = document.querySelector('h1 a');
        if (h1) {
            h1.style.color = '#000'; // h1 텍스트 색상 변경
        }

        utilSvgs.forEach(function (svg) {
            svg.style.fill = '#000'; // .util svg 색상 변경
        });

       
    });

    searchArea.addEventListener('mouseleave', function () {
        if (gnb.style.visibility !== 'visible' && searchArea.style.visibility !== 'visible') {
            header.style.backgroundColor = 'transparent'; // 배경색 원상복구
            header.style.color = '#fff'; // 텍스트 색 원상복구

            navItems.forEach(function (item) {
                item.style.color = '#fff'; // .nav li 원상복구
            });

            const h1 = document.querySelector('h1 a');
            if (h1) {
                h1.style.color = '#fff'; // h1 텍스트 색상 원상복구
            }

            utilSvgs.forEach(function (svg) {
                svg.style.fill = '#fff'; // .util svg 색상 원상복구
            });
        }
    });

    // ----------------------------------------------------------------------------- //

    // 비주얼 슬라이드

    function showNextItem() {
        // 모든 아이템 숨기기
        items.forEach(item => {
            item.style.opacity = 0;
        });

        // 현재 아이템 표시
        items[currentIndex].style.transition = "opacity 0.8s ease-in-out";
        items[currentIndex].style.opacity = 1;

        // 다음 아이템으로 넘어가기
        currentIndex = (currentIndex + 1) % items.length;
    }

    showNextItem(); // 첫 번째 아이템을 바로 보여줌
    
    setInterval(showNextItem, 4000); // 일정 시간 간격으로 슬라이드 전환

    // ----------------------------------------------------------------------------- //

    // 모바일 탭

    mBtn.addEventListener('click', () => {
        mMenu.classList.toggle('active');
        body.classList.toggle('no-scroll');
        overlay.classList.add('active');
    });
    
    mX.addEventListener('click', () => {
        mMenu.classList.remove('active');
        body.classList.remove('no-scroll');
        overlay.classList.remove('active');
    });

    overlay.addEventListener('click', () => {
        mMenu.classList.remove('active');
        overlay.classList.remove('active');
        body.classList.remove('no-scroll');
    });
});
