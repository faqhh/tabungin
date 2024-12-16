document.addEventListener("DOMContentLoaded", () => {
    const backButton = document.querySelector(".back-button");
    backButton.addEventListener("click", () => {
        window.history.back();
    });

    const searchBox = document.querySelector(".search-box input");
    searchBox.addEventListener("input", (e) => {
        const searchText = e.target.value.toLowerCase();
        const trendingLinks = document.querySelectorAll(".trending a");

        trendingLinks.forEach(link => {
            const text = link.textContent.toLowerCase();
            link.style.display = text.includes(searchText) ? "inline-block" : "none";
        });
    });

    const scrollToTopButton = document.createElement("button");
    scrollToTopButton.textContent = "↑";
    scrollToTopButton.classList.add("scroll-to-top");
    document.body.appendChild(scrollToTopButton);

    scrollToTopButton.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        display: none;
        padding: 10px 15px;
        font-size: 18px;
        background-color: #1e3a8a;
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    `;

    scrollToTopButton.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

    window.addEventListener("scroll", () => {
        if (window.scrollY > 200) {
            scrollToTopButton.style.display = "block";
        } else {
            scrollToTopButton.style.display = "none";
        }
    });

    const trendingLinks = document.querySelectorAll(".trending a");
    trendingLinks.forEach(link => {
        link.addEventListener("mouseenter", () => {
            link.style.color = "#e74c3c";
            link.style.fontWeight = "bold";
        });
        link.addEventListener("mouseleave", () => {
            link.style.color = "#333";
            link.style.fontWeight = "normal";
        });
    });
});
