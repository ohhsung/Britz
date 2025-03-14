document.addEventListener("DOMContentLoaded", function () {
    const rightDiv = document.querySelector(".right");
    const heart0 = document.querySelector(".heart0");
    const heart1 = document.querySelector(".heart1");

    // 하트 클릭시 이벤트
    let isHeart1Visible = false;

    rightDiv.addEventListener("click", function () {
        if (isHeart1Visible) {
            heart0.style.opacity = "1";
            heart1.style.opacity = "0";
        } else {
            heart0.style.opacity = "0";
            heart1.style.opacity = "1";
        }
        isHeart1Visible = !isHeart1Visible;
    });

    rightDiv.addEventListener("mouseenter", function () {
        heart1.style.opacity = "1";
    });

    rightDiv.addEventListener("mouseleave", function () {
        if (!isHeart1Visible) {
            heart1.style.opacity = "0";
        }
    });

    document.querySelectorAll('.tab').forEach(tab => {
        tab.addEventListener('click', () => {
            const tabId = tab.dataset.tab;
    
            document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    
            tab.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });
});