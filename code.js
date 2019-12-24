// on lance ces 2 fonctions au chargement de la page pour créer les boutons
creerFonctionSupprimer();
creerFonctionEditer();

var arrayTab = new Array({
    titre: "Deadpool",
    annee: 2016,
    realisateur: "Tim Miller"
}, {
    titre: "Spiderman",
    annee: 2002,
    realisateur: "Sam Raimi"
}, {
    titre: "Scream",
    annee: 1996,
    realisateur: "Wes Craven"
}, {
    titre: "It: chapter 1",
    annee: 2019,
    realisateur: "Andy Muschietti"
}, );

AfficherList();

function compareTitre(a, b) {
    const genreA = a.titre.toUpperCase();
    const genreB = b.titre.toUpperCase();
//opérateurs de comparaisons
    let comparison = 0;
    if (genreA > genreB) {
        comparison = 1;
    } else if (genreA < genreB) {
        comparison = -1;
    }
    return comparison;
}

function compareAnnee(a, b) {
    const genreA = a.annee;
    const genreB = b.annee;

    let comparison = 0;
    if (genreA > genreB) {
        comparison = 1;
    } else if (genreA < genreB) {
        comparison = -1;
    }
    return comparison;
}


function trieParTitre() {
    RecupereList();
    arrayTab.sort(compareTitre);
    AfficherList();
}

function trieParAnnee() {
    RecupereList();
    arrayTab.sort(compareAnnee);
    AfficherList();
}

function RecupereList() {
    arrayTab = [];

    var table = document.getElementsByTagName('table')[0];
    var j = 2;
    var tailleTableau = table.rows.length;
    while (j < tailleTableau) {
        var titre = document.getElementsByTagName('table')[0].getElementsByTagName('tr')[j].cells[0].innerHTML;
        var annee = document.getElementsByTagName('table')[0].getElementsByTagName('tr')[j].cells[1].innerHTML;
        var realisateur = document.getElementsByTagName('table')[0].getElementsByTagName('tr')[j].cells[2].innerHTML;

        arrayTab.push({
            titre: titre,
            annee: annee,
            realisateur: realisateur
        });

        j = j + 1;
    }
    j = 2;
    while (j < tailleTableau) {
        table.deleteRow(2);
        j = j + 1;
    }

}


function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function AfficherList() {

    //et on affiche tout
    var i = 0;
    while (i < arrayTab.length) {
        // On choisi bien notre table, ici on en a qu'une donc c'est forcément la 0
        var table = document.getElementsByTagName('table')[0];
        // On rajoute une ligne qui sera tout en bas grace a la taille du tableau
        var newRow = table.insertRow(table.rows.length);
        // On ajoute des cellules a cette ligne, qui sont vide pour l'instant
        var cel1 = newRow.insertCell(0);
        var cel2 = newRow.insertCell(1);
        var cel3 = newRow.insertCell(2);
        var cel4 = newRow.insertCell(3);
        var cel5 = newRow.insertCell(4);
        // On rempli les cellules
        titre = arrayTab[i].titre;
        annee = arrayTab[i].annee;
        realisateur = arrayTab[i].realisateur;
        cel1.innerHTML = titre;
        cel2.innerHTML = annee;
        cel3.innerHTML = realisateur;
        cel4.innerHTML = '<button class="Editer" >Editer</button>';
        cel5.innerHTML = '<button  class="Supprimer" >Supprimer</button>';
        i = i + 1;
    }
    // On refait les boutons.
    creerFonctionSupprimer();
    creerFonctionEditer();
}

function creerFonctionSupprimer() {
    //boucle qui parcour le tableau existant
    for (var i = 2; i < table.rows.length; i++) {
        //crée une fonction pour toute les lignes
        table.rows[i].cells[4].onclick = function () {
            // récupère le numéro de la ligne
            index = this.parentElement.rowIndex;
            //ouvre une boite pour vérifier si on veux vraiment supprimer avec un rapel de sur qui on a cliqué
            var c = confirm("Voulez vous vraiment supprimer la ligne de " + document.getElementsByTagName('table')[0].getElementsByTagName('tr')[index].cells[0].innerHTML + " " + document.getElementsByTagName('table')[0].getElementsByTagName('tr')[index].cells[1].innerHTML + "? ");
            // si oui, on supprime, si non on fait rien
            if (c === true) {
                table.deleteRow(index);
            }
        };

    }
}

function creerFonctionEditer() {
    //boucle qui parcour le tableau existant
    for (var i = 2; i < table.rows.length; i++) {
        //crée une fonction pour toute les lignes
        table.rows[i].cells[3].onclick = function () {
            // récupère le numéro de la ligne
            index = this.parentElement.rowIndex;
            // On récupère les valeur des champs de la ligne
            var titre = document.getElementsByTagName('table')[0].getElementsByTagName('tr')[index].cells[0].innerHTML;
            var annee = document.getElementsByTagName('table')[0].getElementsByTagName('tr')[index].cells[1].innerHTML;
            var realisateur = document.getElementsByTagName('table')[0].getElementsByTagName('tr')[index].cells[2].innerHTML;
            // On choisi bien notre table, ici on en a qu'une donc c'est forcément la 0
            var table = document.getElementsByTagName('table')[0];
            // On rajoute une ligne qui sera tout en bas grace a la taille du tableau
            var newRow = table.insertRow(index);
            // On ajoute des cellules a cette ligne, qui sont vide pour l'instant
            var cel1 = newRow.insertCell(0);
            var cel2 = newRow.insertCell(1);
            var cel3 = newRow.insertCell(2);
            var cel4 = newRow.insertCell(3);
            var cel5 = newRow.insertCell(4);
            // On rempli les cellules en imbricant l'index dans les ID pour les rendres unique et pouvoir éditer plusieur ligne par la suite sans avoir de conflit
            cel1.innerHTML = '<input type="text" id="titreUpdate' + index + '" value="' + titre + '">';
            cel2.innerHTML = '<input type="number" id="anneeUpdate' + index + '" value="' + annee + '">';
            cel3.innerHTML = '<input type="text" id="realisateurUpdate' + index + '" value="' + realisateur + '">';
            cel4.innerHTML = '';
            cel5.innerHTML = '<button class="Editer" onclick="updateRow(' + index + ')">Sauvegarder</button>';
            //on supprime la ligne qui sera édité
            table.deleteRow(index + 1);


        };

    }
}
//fonction pour ajouter une ligne
function addRow() {
    // On récupère les valeur des champ input
    var titre = document.getElementById('titre').value;
    titre = capitalizeFirstLetter(titre);
    var annee = document.getElementById('annee').value;
    var realisateur = document.getElementById('realisateur').value;
    realisateur = capitalizeFirstLetter(realisateur);
    var ajouter = true;
    var strErreur = "";

    if (titre.length > 1) {
      
    } else {
        strErreur = strErreur + "Le titre est trop court (mini 2 caractères)\n";
        ajouter = false;
    }
        if (realisateur.length > 4) {
           
        } else {
            strErreur = strErreur + "Le realisateur est trop court (mini 5 caractères)\n";
            ajouter = false;
        }
            if (annee >= 1900) {
              
            } else {
                strErreur = strErreur + "L'annee est trop petite ! ( entre 1900 et aujourd'hui )\n";
                ajouter = false;
            }

                if (annee <= 2019) {
                   
                      } else {
        strErreur = strErreur + "L'annee est trop grande ! ( entre 1900 et aujourd'hui ) \n";
        ajouter = false;
    }

    if (ajouter == true) {
        // On choisi bien notre table, ici on en a qu'une donc c'est forcément la 0
        var table = document.getElementsByTagName('table')[0];

        // On rajoute une ligne qui sera tout en bas grace a la taille du tableau
        var newRow = table.insertRow(table.rows.length);

        // On ajoute des cellules a cette ligne, qui sont vide pour l'instant
        var cel1 = newRow.insertCell(0);
        var cel2 = newRow.insertCell(1);
        var cel3 = newRow.insertCell(2);
        var cel4 = newRow.insertCell(3);
        var cel5 = newRow.insertCell(4);
        // On rempli les cellules
        cel1.innerHTML = titre;
        cel2.innerHTML = annee;
        cel3.innerHTML = realisateur;
        cel4.innerHTML = '<button class="Editer">Editer</button>';
        cel5.innerHTML = "<button  class='Supprimer' >Supprimer</button>";
        // On vide les champs des formulaires
        document.getElementById('TITRE').reset();
        document.getElementById('ANNEE').reset();
        document.getElementById('REALISATEUR').reset();
        // On refait les boutons. on aurait pu refaire que la ligne mais comme ça on évite des lignes de code. Mais si on veut optimiser il faudrait le faire.
        creerFonctionSupprimer();
        creerFonctionEditer();

        success();
    } else {
        alert("" + strErreur);
    }
    
}

function updateRow(index) {
    // On récupère les valeur des champ input
    console.log("titre");
    var titre = document.getElementById('titreUpdate' + index).value;
    console.log(titre);
    var annee = document.getElementById('anneeUpdate' + index).value;
    var realisateur = document.getElementById('realisateurUpdate' + index).value;

    var ajouter = false;
    var strErreur = "";

    if (titre.length > 1) {
        ajouter = true;
        if (realisateur.length > 4) {
            ajouter = true;
            if (annee >= 1900) {
                ajouter = true;
                if (annee <= 2019) {
                    ajouter = true;
                } else {
                    strErreur = strErreur + "L'annee est trop grande ! ( entre 1900 et aujourd'hui)\n";
                    ajouter = false;
                }
            } else {
                strErreur = strErreur + " L'annee est trop petite ! ( entre 1900 et aujourd'hui)\n";
                ajouter = false;
            }
        } else {
            strErreur = strErreur + " Le realisateur est trop court (mini 5 caractere)\n";
            ajouter = false;
        }
    } else {
        strErreur = strErreur + " Le titre est trop court (mini 2 caractaire) \n";
        ajouter = false;
    }

    if (ajouter == true) {
        // On choisi bien notre table, ici on en a qu'une donc c'est forcément la 0
        var table = document.getElementsByTagName('table')[0];
        // On rajoute une ligne qui sera au meme emplacement
        var newRow = table.insertRow(index);
        // On ajoute des cellules a cette ligne, qui sont vide pour l'instant
        var cel1 = newRow.insertCell(0);
        var cel2 = newRow.insertCell(1);
        var cel3 = newRow.insertCell(2);
        var cel4 = newRow.insertCell(3);
        var cel5 = newRow.insertCell(4);
        // On rempli les cellules
        cel1.innerHTML = titre;
        cel2.innerHTML = annee;
        cel3.innerHTML = realisateur;
        cel4.innerHTML = '<button class="Editer">Editer</button>';
        cel5.innerHTML = "<button  class='Supprimer' >Supprimer</button>";
        //on supprime la ligne qui sera édité
        table.deleteRow(index + 1);
        // On refait les boutons. on aurait pu refaire que la ligne mais comme ça on évite des lignes de code. Mais si on veut optimiser il faudrait le faire.
        creerFonctionSupprimer();
        creerFonctionEditer();
    } else {
        alert(strErreur);
    }
}
var saisie = document.getElementById("zonesaisie")
var btnaffiche = document.getElementById("btnaffiche")
//Rendre visible et invisible le bouton ajouter
function affichesaisie() {

    saisie.style.visibility = "visible"

    btnaffiche.style.visibility = "hidden"
}
var btnValider = document.getElementById('btnValider');

btnValider.addEventListener('click', valider)

function valider() {

    saisie.style.visibility = "hidden"

    btnaffiche.style.visibility = "visible"


}
// Alerte Box
function success() {
    document.getElementById('alert').innerHTML = "Film ajouté avec succès";
    setTimeout(function () {
        document.getElementById('alert').innerHTML = " ";
    }, 3000);
}
function alert(str) {
    document.getElementById('alert').innerHTML = "Erreur dans le formulaire : " + str;
    setTimeout(function () {
        document.getElementById('alert').innerHTML = " ";
    }, 3000);
}