document.addEventListener('DOMContentLoaded',()=> {
    const imageContainer = document.getElementById('imageContainer');
    const apiKey ="pfDYjjNPoZQjoxgp5HpLC6XUFkIUNPSqaZsM7W1r";
    const date = document.getElementById('date');
    const btnDate = document.getElementById('btnDate')

    async function fetchImagesEspace() {
        try {
            const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}`);
            console.log(response);
            if (!response.ok){
                throw new Error("Erreur lors du chargement de API NASA");
                
            }
            const data = await response.json();
            console.log(data); //pourquoi pas lenght ? Car l'api etourne un objet JSON, pas un tableau(qui s'utilise avec lenght normalement)
            if(data.media_type === "image"){ //Ds la doc media_type = le format choisi (soit vidéos ou images)
                displayImageDuJour(data);
            }else{
                imageContainer.innerHTML = `<div class="col-12 text-center"><p class="text-danger">Aucunes images trouvé</p></div>`;
            }

        } catch (error) {
            imageContainer.innerHTML = `<div class="col-12 text-center"><p class="text-danger">${error.message}</p></div>`;
        }
    }
    
    
    function displayImageDuJour(data) {
        imageContainer.innerHTML = `
    <div class="row justify-content-center mb-4">
        <div class="col-md-5">
            <div class="card bg-dark text-light">
                <img src="${data.url}" alt="${data.title}" class="card-img-top img-fluid" style="max-width: 100%;">
            </div>
        </div>
        <div class="col-md-5">
            <div class="card bg-dark text-light">
                <div class="card-body">
                    <h4 class="card-title mb-2">${data.title}</h5>
                    <p class="card-text">${data.explanation}</p>
                </div>
            </div>
        </div>
    </div>`

    };



    async function fetchDatesImagesEspace(date) {
        try {
            const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${date}`);
            console.log(response);
            if (!response.ok){
                throw new Error("Erreur lors du chargement de l'image en fonction de la date");
                
            }
            const data = await response.json();
            console.log(data); 
            if(data.media_type === "image"){
                displayImageDuJour(data);
            }else{
                imageContainer.innerHTML = `<div class="col-12 text-center"><p class="custom-message">Pas d'images enregistrées pour cette date. Réassayer avec une autre date !</p></div>`;
            }

        } catch (error) {
            imageContainer.innerHTML = `<div class="col-12 text-center"><p class="text-danger">${error.message}</p></div>`;
        }

    }

    btnDate.addEventListener('click', () => {
        if (date.value) {
            fetchDatesImagesEspace(date.value); //la date choisit est stocké dans .value
        } else {
            alert("Veuillez sélectionner une date.");
        }
    });

    

fetchImagesEspace();

});