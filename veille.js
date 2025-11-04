document.addEventListener('DOMContentLoaded', function() {
    // Fonction pour ajouter une ligne
    document.getElementById('addInfoButton').addEventListener('click', function() {
        const dateInput = document.querySelector('#addInfoModal input[type="date"]');
        const sujetInput = document.querySelector('#addInfoModal input[type="text"]');
        const descriptionInput = document.querySelector('#addInfoModal textarea');
        const categorieSelect = document.querySelector('#addInfoModal select');
        const sourceInput = document.querySelector('#addInfoModal input[type="url"]');

        const date = dateInput.value;
        const sujet = sujetInput.value;
        const description = descriptionInput.value;
        const categorie = categorieSelect.value;
        const source = sourceInput.value;

        if (!date || !sujet || !description) {
            alert("Veuillez remplir tous les champs obligatoires (Date, Sujet, Description).");
            return;
        }

        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td>${date}</td>
            <td>${sujet}</td>
            <td>${description}</td>
            <td><span class="tag tag-${categorie}">${getEmoji(categorie)} ${getLabel(categorie)}</span></td>
            <td><a href="${source}" target="_blank">Lien</a></td>
            <td>
                <button class="btn btn-sm btn-outline-danger delete-btn"><i class="fas fa-trash"></i></button>
            </td>
        `;

        document.getElementById('veilleTableBody').appendChild(newRow);

        // Réinitialiser le formulaire
        document.getElementById('addInfoForm').reset();

        // Fermer la modal
        const modal = bootstrap.Modal.getInstance(document.getElementById('addInfoModal'));
        modal.hide();
    });

    // Fonction pour supprimer une ligne
    document.getElementById('veilleTableBody').addEventListener('click', function(e) {
        if (e.target.closest('.delete-btn')) {
            e.target.closest('tr').remove();
        }
    });

    // Fonctionnalité de recherche
    document.getElementById('searchVeille').addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const rows = document.querySelectorAll('#veilleTableBody tr');
        rows.forEach(row => {
            const text = row.textContent.toLowerCase();
            row.style.display = text.includes(searchTerm) ? '' : 'none';
        });
    });

    // Fonctions utilitaires
    function getEmoji(categorie) {
        const emojis = {
            'ia': '🤖',
            'cyber': '🔒',
            'dev': '💻',
            'reseau': '🌐'
        };
        return emojis[categorie];
    }

    function getLabel(categorie) {
        const labels = {
            'ia': 'IA',
            'cyber': 'Cybersécurité',
            'dev': 'Développement',
            'reseau': 'Réseau'
        };
        return labels[categorie];
    }
});
