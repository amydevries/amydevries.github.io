var firstTranslationString = ""; 
var secondTranslationString = ""; 
var appid = "b649b8a3f2004b6e926dec975e88d95b";
var language1 = ""; 
var language2 = ""; 
var translated = ""; 

function issueToken(callback){ 
    var url = "https://api.cognitive.microsoft.com/sts/v1.0/issueToken"; 
    var xmlHttp = new XMLHttpRequest(); 
    xmlHttp.open("POST", url, true); 
    xmlHttp.setRequestHeader("Content-Type", "application/json"); 
    xmlHttp.setRequestHeader("Accept", "application/jwt"); 
    xmlHttp.setRequestHeader("Ocp-Apim-Subscription-Key", appid); 
    xmlHttp.onreadystatechange = function() {//Call a function when the state changes.
        if(xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            var token = xmlHttp.responseText; 
            callback(token);
        }
    }
    xmlHttp.send();  
}

function translator(time){
    language1 = document.getElementById("languageOne").value; 
    language2 = document.getElementById("twoLanguage").value; 
    if(language1 === 'Select Language 1' || language2 === 'Select Language 2'){
        alert("Select Language(s) for translation."); 
        return 0; 
    }
    if(time === 'first'){
        language1 = document.getElementById("languageOne").value; 
        language2 = document.getElementById("twoLanguage").value; 
        translationString = document.getElementById("textbox1").value; 
    }
    else if(time === 'second'){
        language1 = document.getElementById("twoLanguage").value; 
        language2 = document.getElementById("languageOne").value; 
        translationString = document.getElementById("textbox3").value; 
    }
    var url = "https://api.microsofttranslator.com/v2/http.svc/Translate?appid=Bearer ";
    var theToken; 
    issueToken(function(newToken){
        theToken = newToken; 
        url += theToken; 
        url += "&text=" + translationString; 
        url += "&from=" + language1; 
        url += "&to=" + language2; 
        var xmlHttp = new XMLHttpRequest();
    
        xmlHttp.open("GET", url, true); 
        xmlHttp.setRequestHeader("Accept", "application/xml");
        xmlHttp.onreadystatechange = function() {//Call a function when the state changes.
        if(xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            var xmlTrans = xmlHttp.responseText; 
            parser = new DOMParser(); 
            xmlDoc = parser.parseFromString(xmlTrans, "text/xml"); 
            if(time === 'first'){
                document.getElementById("textbox2").innerHTML = xmlDoc.getElementsByTagName("string")[0].childNodes[0].nodeValue;
            }
            else if(time === 'second'){
                document.getElementById("textbox4").innerHTML = xmlDoc.getElementsByTagName("string")[0].childNodes[0].nodeValue;
            }
            
        }
    }
    xmlHttp.send(null);
    });    
}

function initMap() {
    console.log('initializing map'); 
    var hide1 = document.getElementById('ufImages');
    hide1.style.display = 'none'; 
    var hide2 = document.getElementById('foodImages'); 
    hide2.style.display = 'none'; 
    var uf = {lat: 29.6436, lng: -82.3549};
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 16,
      center: uf
    });
}

function showMap(){
    console.log('showMap'); 
    var hide1 = document.getElementById('ufImages');
    hide1.style.display = 'none'; 
    var hide2 = document.getElementById('foodImages'); 
    hide2.style.display = 'none'; 
    var show = document.getElementById('map'); 
    show.style.display = 'block'; 
    show.style.visibility = 'visible'; 
}

function showUfImages(){
    console.log('showUfImages'); 
    var hide1 = document.getElementById('map');
    hide1.style.display = 'none'; 
    var hide2 = document.getElementById('foodImages'); 
    hide2.style.display = 'none'; 
    var hide3 = document.getElementById('secondPageUfImages'); 
    hide3.style.display = 'none'; 
    var show = document.getElementById('ufImages');
    show.style.display = 'block'; 
    show.style.visibility = 'visible'; 
    var show2 = document.getElementById('firstPageUfImages');
    show2.style.display = 'block'; 
    show2.style.visibility = 'visible'; 
}

function showFoodImages(){
    console.log('showFoodImages'); 
    var hide1 = document.getElementById('map');
    hide1.style.display = 'none'; 
    var hide2 = document.getElementById('ufImages'); 
    hide2.style.display = 'none'; 
    var hide3 = document.getElementById('secondPageFoodImages'); 
    hide3.style.display = 'none'; 
    var show = document.getElementById('foodImages');
    show.style.display = 'block'; 
    show.style.visibility = 'visible'; 
    var show2 = document.getElementById('firstPageFoodImages');
    show2.style.display = 'block'; 
    show2.style.visibility = 'visible'; 
}

var languages = {"Afrikaans":"af", "Arabic":"ar", "Bosnian (Latin)":"bs-Latn", "Bulgarian":"bg", "Catalan":"ca", "Chinese Simplified":"zh-CHS", "Chinese Traditional":"zh-CHT", "Croatian":"hr", "Czech":"cs", "Danish":"da", "Dutch":"nl", "English":"en", "Estonian":"et", "Finnish":"fi", "French":"fr", "German":"de", "Greek":"el", "Haitian Creole":"ht", "Hebrew":"he", "Hindi":"hi", "Hmong Daw":"mww", "Hungarian":"hu", "Indonesian":"id", "Italian":"it", "Japanese":"ja", "Kiswahili":"sw", "Klingon":"tlh", "Klingon (plqaD)":"tlh-Qaak", "Korean":"ko", "Latvian":"lv", "Lithuanian":"lt", "Malay":"ms", "Maltese":"mt", "Norwegian":"no", "Persian":"fa", "Polish":"pl", "Portuguese":"pt", "Queretaro Otomi":"otq", "Romanian":"ro", "Russian":"ru", "Serbian (Cyrillic)":"sr-Cyrl", "Serbian (Latin)":"sr-Latn", "Slovak":"sk", "Slovenian":"sl", "Spanish":"es", "Swedish":"sv", "Thai":"th", "Turkish":"tr", "Ukrainian":"uk", "Urdu":"ur", "Vietnamese":"vi", "Welsh":"cy", "Yucatec Maya":"yua"}
for(var country in languages){
    var val = languages[country]; 
    $('<option/>').val(val).text(country).appendTo($('#languageOne'));
    $('<option/>').val(val).text(country).appendTo($('#twoLanguage'));
};

function finish(){
    window.open('https://ufl.qualtrics.com/jfe/form/SV_5pCjJoTpGLQjztH');
    location.reload(); 
}

var typeTimer; 
var typingInterval = 250; 

$('#textbox1').keyup(function() {
    clearTimeout(typeTimer); 
    if($('#textbox1').val()){
        typeTimer = setTimeout(doneTyping1, typingInterval);
    }
});

function doneTyping1(){
    translator('first');
}

$('#textbox3').keyup(function() {
    clearTimeout(typeTimer); 
    if($('#textbox3').val()){
        typeTimer = setTimeout(doneTyping2, typingInterval);
    }
});

function doneTyping2(){
    translator('second');
}

function goToPage2UfImages(){
    var hide1 = document.getElementById('firstPageUfImages');
    hide1.style.display = 'none'; 
    var show = document.getElementById('secondPageUfImages');
    show.style.display = 'block'; 
    show.style.visibility = 'visible'; 
}

function goToPage1UfImages(){
    var hide1 = document.getElementById('secondPageUfImages');
    hide1.style.display = 'none'; 
    var show = document.getElementById('firstPageUfImages');
    show.style.display = 'block'; 
    show.style.visibility = 'visible'; 
}

function goToPage2FoodImages(){
    var hide1 = document.getElementById('firstPageFoodImages');
    hide1.style.display = 'none'; 
    var show = document.getElementById('secondPageFoodImages');
    show.style.display = 'block'; 
    show.style.visibility = 'visible'; 
}

function goToPage1FoodImages(){
    var hide1 = document.getElementById('secondPageFoodImages');
    hide1.style.display = 'none'; 
    var show = document.getElementById('firstPageFoodImages');
    show.style.display = 'block'; 
    show.style.visibility = 'visible'; 
}

function updateLang2(){
    var field1 = document.getElementById('textbox1'); 
    if(field1.value === ''){
        return 0; 
    }
    else{
        translator('first'); 
    }
}

function updateLang1(){
    var field3 = document.getElementById('textbox3'); 
    if(field3.value === ''){
        return 0; 
    }
    else{
        translator('second'); 
    }
}

function messagePopup(){
    var message = document.getElementById('popupAlert'); 
    message.style.display = 'block'; 
    message.style.visibility = 'visible'; 
}

function closeMessage(){
    var message = document.getElementById('popupAlert'); 
    message.style.display = 'none'; 
}