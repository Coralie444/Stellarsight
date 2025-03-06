document.addEventListener('DOMContentLoaded',()=> {
    const imageCard = document.getElementById('imageCard');
    const seriesImages = document.getElementById('seriesImages');
    const date = document.getElementById('date');
    const btnTerreDate = document.getElementById('btnTerreDate')
    const apiKey ="pfDYjjNPoZQjoxgp5HpLC6XUFkIUNPSqaZsM7W1r";

    async function fetchAfficheImage(utilisateurDate) {
        try {
            const response = await fetch(`https://api.nasa.gov/EPIC/api/natural/date/${utilisateurDate}?api_key=${apiKey}`)
            console.log(response);
            if (!response.ok){
                throw new Error("Erreur lors du chargement de API NASA");
                
            }
            const data = await response.json();
            console.log(data);

            if (!data || data.length === 0) {
                imageCard.innerHTML = 
                `<p>L'univers garde son secret pour aujourd'hui.</p>
                <p>Essayez une autre date pour admirer la beauté de la terre !</p>`;
            }else{
            displayImagesEPIC(data);
            }
            
        } catch (error) {
            imageCard.innerHTML = `<div class="col-12 text-center"><p class="text-danger">${error.message}</p></div>`;
        }
    }


    function displayImagesEPIC(data) {

        const URL = "https://epic.gsfc.nasa.gov/archive/natural";
        const imagesAPI = data.slice(0, 9).map((image, index) => {// avec slice, l'api prends les 10 première images
        const date = new Date(image.date); // comme on a une liste comme donnée map ns permet de crée une nvlle liste avec nos éléments image
        const annees = date.getFullYear();// et image.date récupère la date de l'image
        const mois = date.getMonth() + 1;//on rajoute +1 car sinon le mois ne vont pas jusqu'à 12
        const jour = date.getDate();
        const heures = date.getHours();
        const minutes = date.getMinutes();
        const secondes = date.getSeconds();


        const moisFormate = mois < 10 ? "0" + mois : mois; //permet de gerer la situation ou la date est constitué d'un seul nombre
        const jourFormate = jour < 10 ? "0" + jour : jour;
        const heuresFormate = heures < 10 ? "0" + heures : heures;
        const minutesFormate = minutes < 10 ? "0" + minutes : minutes;
        const secondesFormate = secondes < 10 ? "0" + secondes : secondes;

        const heureComplete = `${heuresFormate}:${minutesFormate}:${secondesFormate}`;
        const newURL = `${URL}/${annees}/${moisFormate}/${jourFormate}/png/${image.image}.png`;
        console.log(newURL);

        if (index === 0){ //prend l'index de l'image soit la première (à 0)
            imageCard.innerHTML = `
                <div class="card bg-dark text-light mx-auto" style="max-width: 600px;">
                                <img src="${newURL}" class="card-img-top img-fluid" alt="Image du jour">
                                <div class="card-body">
                                    <h5 class="card-title">Image du jour</h5>
                                    <p class="card-text">${image.caption}</p>
                                    <p class="card-text"><srtong>Heure:</strong> ${heureComplete}</p>
                                    
                                </div>
                            </div>
                        `;
                    }
            return `
                        <div class="card mx-2" style="width: 400px;">
                            <img src="${newURL}" class="card-img-top" alt="Miniature NASA EPIC">
                            <div class="card-body bg-dark text-light">
                            <p class="card-text"><strong>Heure:</strong> ${heureComplete}</p>
                            </div>
                        </div>
                    `;//ici on stylise l'apparence des séries d'images

    });

    seriesImages.innerHTML = `
    <div class="d-flex flex-row overflow-auto">
    ${imagesAPI.slice(1).join("")}
    </div>
    `//va récupérer tous ce qui est après la prémière image
    //ici on récupère les images(affichent)
    

    }

    btnTerreDate.addEventListener('click', () => {
        const selectedDate = date.value;
        if (!selectedDate) {
            alert("Veuillez sélectionner une date !");
            return;
        }

        fetchAfficheImage(selectedDate);
    });


});