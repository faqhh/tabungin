document.addEventListener("DOMContentLoaded", () => {
    const tabunganSelectButton = document.querySelector('.tabungan-select button');
    const tabunganJenis = document.querySelector('.tabungan-jenis');
    const editButtons = document.querySelectorAll('.edit, .edit-btn');
    const profileButton = document.querySelector('.profile');
    const starButtons = document.querySelectorAll('.star');
    const activeTabunganItem = document.querySelectorAll('.tabungan-item');

    tabunganSelectButton.addEventListener('click', () => {
        const types = ['Pribadi', 'Holiday', 'Birthday Party']; 
        let currentTypeIndex = types.indexOf(tabunganJenis.textContent);
        currentTypeIndex = (currentTypeIndex + 1) % types.length;
        tabunganJenis.textContent = types[currentTypeIndex];
    });

    editButtons.forEach((button) => {
        button.addEventListener('click', (event) => {
            const itemTitle = event.target.closest('.tabungan-header')?.querySelector('h2')?.textContent || 
                              event.target.closest('.item-name')?.textContent;
            const action = event.target.closest('.tabungan-header') ? 'Tabungan' : 'Target Item';
            const type = event.target.closest('.tabungan-header') ? 'tabungan' : 'target';

            alert(`Editing ${action}: ${itemTitle} (${type})`);
        });
    });

    starButtons.forEach((button) => {
        button.addEventListener('click', (event) => {
            const itemTitle = event.target.closest('.tabungan-header')?.querySelector('h2')?.textContent;
            const isFavorited = event.target.classList.contains('favorited');

            if (isFavorited) {
                event.target.classList.remove('favorited');
                alert(`${itemTitle} is no longer a favorite.`);
            } else {
                event.target.classList.add('favorited');
                alert(`${itemTitle} added to favorites.`);
            }
        });
    });

    profileButton.addEventListener('click', () => {
        alert("Navigating to your profile...");
    });

    addHoverEffect(tabunganSelectButton);
    addHoverEffect(profileButton);

    function addHoverEffect(element) {
        element.addEventListener('mouseenter', () => {
            element.style.transform = 'scale(1.05)';
            element.style.transition = 'transform 0.2s ease-in-out';
        });
        element.addEventListener('mouseleave', () => {
            element.style.transform = 'scale(1)';
        });
    }
});
