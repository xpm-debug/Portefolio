// Filtrage avec la barre de recherche
const searchBar = document.getElementById('searchBar');
searchBar.addEventListener('keyup', function() {
    let filter = searchBar.value.toLowerCase();
    let cards = document.querySelectorAll('.project-card');
    cards.forEach(card => {
        let title = card.querySelector('h5').innerText.toLowerCase();
        if (title.includes(filter)) {
            card.parentElement.style.display = "";
        } else {
            card.parentElement.style.display = "none";
        }
    });
});

// Afficher/masquer les parties
document.getElementById('showPart1').addEventListener('click', function() {
    document.getElementById('part1').style.display = "flex";
    document.getElementById('part2').style.display = "none";
});

document.getElementById('showPart2').addEventListener('click', function() {
    document.getElementById('part1').style.display = "none";
    document.getElementById('part2').style.display = "flex";
});

