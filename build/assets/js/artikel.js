document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.querySelector(".sidebar input[type='text']");
    const articleCards = document.querySelectorAll(".articles .card");
    
    searchInput.addEventListener("input", (event) => {
        const searchTerm = event.target.value.toLowerCase();
        articleCards.forEach(card => {
            const title = card.querySelector("h4").textContent.toLowerCase();
            const description = card.querySelector("p").textContent.toLowerCase();
            if (title.includes(searchTerm) || description.includes(searchTerm)) {
                card.style.display = "block";  
            } else {
                card.style.display = "none";  
            }
        });
    });

    articleCards.forEach(card => {
        card.addEventListener("mouseenter", () => {
            card.style.transform = "scale(1.05)";
            card.style.boxShadow = "0 6px 20px rgba(0, 0, 0, 0.1)";
            card.style.transition = "all 0.3s ease";
        });
        card.addEventListener("mouseleave", () => {
            card.style.transform = "scale(1)";
            card.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
        });
    });

    const btnSecondary = document.querySelectorAll(".btn-secondary");
    btnSecondary.forEach(button => {
        button.addEventListener("mouseenter", () => {
            button.style.transform = "scale(1.1)";
            button.style.transition = "all 0.3s ease";
        });
        button.addEventListener("mouseleave", () => {
            button.style.transform = "scale(1)";
        });
    });
});
