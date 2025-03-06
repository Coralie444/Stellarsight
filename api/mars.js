document.addEventListener('DOMContentLoaded', () => {
    const photosMars = document.getElementById('photosMars');
    const button = document.getElementById('button');
    const rover = document.getElementById('rover');
    const sol = document.getElementById('sol');
    const camera = document.getElementById('camera')
    const apiKey = "pfDYjjNPoZQjoxgp5HpLC6XUFkIUNPSqaZsM7W1r";


    async function fetchPhotosMars(rover, sol, camera) {
        try {
            const url = `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?sol=${sol}&camera=${camera}&api_key=${apiKey}`;
            const response = await fetch(url);
            console.log(response);

            if (!response.ok) {
                throw new Error("Erreur de récupération des photos.");
            }

            const data = await response.json();
            console.log(data);
            if (data.photos && data.photos.length > 0) {
                displayPhotos(data.photos.slice(0, 10));

            } else {
                photosMars.innerHTML =`<div class="col-12 text-center"><p class="custom-message">Pas de chance, cette date et caméra n'ont pas de photos. Pourquoi ne pas tenter une autre recherche ?</p></div>`;
            }
        } catch (error) {
            photosMars.innerHTML = `<div class="col-12 text-center"><p class="text-danger">${error.message}</p></div>`;
        }
    }

    function displayPhotos(photos) {
        photosMars.innerHTML = '';
        photos.forEach(photo => {
            photosMars.innerHTML += `
                <div class="card mx-2 my-3" style="max-width: 300px;">
                    <img src="${photo.img_src}" class="card-img-top img-fluid" alt="Photo du rover">
                </div>
            `;//ex de img_src dans l'api : "img_src": "http://mars.jpl.nasa.gov/msl-raw-images/proj/
        });
    }

    button.addEventListener('click', () => {
        const roverValue = rover.value;
        if (roverValue !== 'curiosity') {
            alert("Seul le rover Curiosity est disponible.");
            return;
        }
        const solValue = sol.value;
        const cameraValue = camera.value;

        fetchPhotosMars(roverValue, solValue, cameraValue);
    });


});