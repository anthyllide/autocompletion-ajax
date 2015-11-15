
    var input = document.getElementById('search'),
    divResults = document.getElementById('results'),
    selectedResult = -1, // position du curseur dans le champs input(0 représente la 1ere dic resultat, 1 la deuxième, 2 la troisième ...)
    initValue ='',
    previousValue,
    previousRequest;

function addEvent (element, event, func){
    
    if(element.addEventListener){
        
        element.addEventListener(event, func, false);
        
    } else {
        
        element.attachEvent('on'+event, func);
    }
}

//ouvre une requête et l'envoie
function getResponse (letters){
    
    var xhr = new XMLHttpRequest();
    var firstLetters = encodeURIComponent(letters);
    xhr.open('GET', 'ajax.php?s='+firstLetters);
    
        addEvent(xhr, 'readystatechange', function (){
        
            if(xhr.readyState == 4 && xhr.status == 200){
            
                displayResponse(xhr.responseText);
                             
            }                      
        }); 
    
    xhr.send();
    
    return xhr;       
}

// affiche les résultats
function displayResponse(response){
    
    divResults.style.display = response.length ? 'block' : 'none';
      
        if(response.length){
        
            response = response.split('|');
        
            divResults.innerHTML = ''; // On vide les résultats
    
                // on crée les div résultats, puis on ajoute le texte
                for(var i = 0; i < response.length; i++){
                    
                    var divs = document.createElement ('div');
    
                    divResults.appendChild(divs);
                    
                    divs.innerHTML = response[i]; 
                    
                    // evénement click pour afficher un résultat sélectionné
                    addEvent(divs,'click', function(e) {

                        chooseResult(e.target);

                    });

                }
        }
}
    

 // choisit le résultat    
function chooseResult (result){
    
    input.value = previousValue = result.innerHTML;//input value vaut "previous value" et le HTML de la div choisie
    divResults.style.display='none';//on cache les résultats
    selectedResult = -1;// on remet le pointeur sur le champs input
}      

// navigation dans la div de résultats
function navigation (){  
    
    addEvent(input,'keyup',function(e){
    
        var divs = divResults.getElementsByTagName('div');
        
            //si la touche flêche haut est relâchée et le pointer doit être positionné sur un div résultat
            if(e.keyCode == 38 && selectedResult > -1){
            
                divs[selectedResult--].className = '';
                
                    if(selectedResult > -1){
                        
                        divs[selectedResult].className = 'result_focus';
                    }
                
            //si la touche flêche bas est relâchée et le pointer doit être positionné au moins dans le champs input   
            } else if (e.keyCode == 40 && selectedResult >= - 1 ){
                
                divResults.style.display = 'block';
            
                if(selectedResult > -1){// ne s'applique qu'on div résultats 
                    divs[selectedResult].className ='';//on retire le focus au résultat en cours
                }
            
                divs[++selectedResult].className = 'result_focus'; //on ajoute le focus à la div résultat suivante
        
        // si la touche entrée est relâchée
        } else if (e.keyCode == 13 && selectedResult > - 1 ){
            
            chooseResult(divs[selectedResult]);
        
        // si la valeur du champ input change
        } else if (input.value != initValue || input.value != previousValue){

            previousValue = input.value;
            
                // si la précédente requête n'est pas terminé, on l'annule
                if(previousRequest && previousRequest.readystate < 4){
                    
                    previousRequest.abort();
                }
            
            previousRequest = displayResponse(getResponse(previousValue)); 
        
            selectedResult = -1 ;  // position du curseur dans le champs input                        
        }
});
    
}



navigation();

