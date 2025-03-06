document.addEventListener('DOMContentLoaded', () => {
    const results = document.getElementById('results');
    const date = document.getElementById('date');
    const btnObjetsDate = document.getElementById('btnObjetsDate');
    const apiKey = "pfDYjjNPoZQjoxgp5HpLC6XUFkIUNPSqaZsM7W1r";

    async function fetchObjetsParDate() {
        

        try {
            const dateSelected = date.value;//on veut que l'utilisateur sélectionne une date avent de faire un appel api
        
            if (!dateSelected) {
                results.innerHTML = `<p class='text-danger'>Veuillez sélectionner une date.</p>`;
            }
            const response = await fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${dateSelected}&end_date=${dateSelected}&api_key=${apiKey}`);
            if (!response.ok) {
                throw new Error("Erreur lors du chargement des données des astéroïdes");
            }
            const data = await response.json();
            const objetsProches = data.near_earth_objects[dateSelected];

            if (objetsProches && objetsProches.length > 0) {
                //avec le slice, on prend les 5 premiers objet de notre api (asteroid)
                const objetsFirst = objetsProches.slice(0, 5);
                displayObjetProchesDeTerre(objetsFirst);
            } else {
                results.innerHTML = `<p>Aucun astéroïde trouvé pour cette date.</p>`;
            }
        } catch (error) {
            results.innerHTML = `<div class="col-12 text-center"><p class="text-danger">${error.message}</p></div>`;
        }
    }

    function displayObjetProchesDeTerre(objets) {
        results.innerHTML = "";

        objets.forEach(objet => {
        const nom = objet.name;
        const taille = objet.estimated_diameter.kilometers.estimated_diameter_max;
        const distance = objet.close_approach_data[0].miss_distance.kilometers;
        const dateHeure = objet.close_approach_data[0].close_approach_date_full; // ce qu'on trouve ds l'api => "close_approach_date_full": "2015-Sep-08 20:28",
        const heure = dateHeure ? dateHeure.split(" ")[1] : "Non spécifiée";//avec split on coupe à l'espace pour récupérer l'heure + gestion si l'heure n'apparait pas

        results.innerHTML += `
            <div class="card mb-3">
                <div class="card-body bg-dark text-light">
                    <h5 class="card-title"><strong>Nom :</strong> ${nom}</h5>
                    <p class="card-text"><strong>Taille estimée :</strong> ${taille} km</p>
                    <p class="card-text"><strong>Distance avec la Terre :</strong> ${distance} km</p>
                    <p class="card-text"><strong>Heure de l'approche :</strong> ${heure}</p>
                    </div>
            </div>
        `;
            
        });

    }

    btnObjetsDate.addEventListener('click',()=>{
    fetchObjetsParDate();


    });

});
