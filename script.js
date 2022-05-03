
function toggleHidden(){
    var hidden = document.getElementById("maCarte");
    var pHidden = document.getElementById("maDescription");
    var btnHidden1 = document.getElementById("btn1");
    var btnHidden2 = document.getElementById("btn2");
    hidden.classList.toggle("hidden");
    pHidden.classList.toggle("hidden");
    btnHidden1.classList.toggle("hidden");
    btnHidden2.classList.toggle("hidden");
}



var villes = {
    "Merignac": { "lat": 44.844, "lon": -0.656358, "eventType" : "Collecte de déchets" },
    "Bordeaux": { "lat": 44.837, "lon": -0.579 , "eventType" : "Recolte de déchets" },
};

var tableauMarqueurs = [];

// On initialise la carte
var carte = L.map('maCarte').setView([44.837, -0.579], 9);

// On charge les "tuiles"
L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
    // Il est toujours bien de laisser le lien vers la source des données
    attribution: 'données © <a href="//osm.org/copyright">OpenStreetMap</a>/ODbL - rendu <a href="//openstreetmap.fr">OSM France</a>',
    minZoom: 1,
    maxZoom: 20
}).addTo(carte);

var marqueurs = L.markerClusterGroup();

// On personnalise le marqueur
var icone = L.icon({
    iconUrl: "images/icon.png",
    iconSize: [50, 50],
    iconAnchor: [25, 50],
    popupAnchor: [0, -50]
})



var ville;

// On parcourt les différentes villes
for(ville in villes){
    // On crée le marqueur et on lui attribue une popup
    var marqueur = L.marker([villes[ville].lat, villes[ville].lon], {icon: icone}); //.addTo(carte); Inutile lors de l'utilisation des clusters
    marqueur.bindPopup("<p>ville : "+ville+" <br> event : " + villes[ville].eventType + "</p>");
    marqueurs.addLayer(marqueur); // On ajoute le marqueur au groupe

    // On ajoute le marqueur au tableau
    tableauMarqueurs.push(marqueur);
}
// On regroupe les marqueurs dans un groupe Leaflet
var groupe = new L.featureGroup(tableauMarqueurs);

// On adapte le zoom au groupe
carte.fitBounds(groupe.getBounds().pad(0.5));

carte.addLayer(marqueurs);

