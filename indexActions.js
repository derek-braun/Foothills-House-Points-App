var scoreCount;

setInterval(getCurrentScores, 500);

function setHouseText(text){
    document.getElementById("houseText").value = text;
}

function success(){
    console.log("Completed Entry");
}

function error(){
    console.log("Could not complete entry");
}

function updateDatabase(){
    firebase.database().ref().child('scores').set(scoreCount += 1);
}

function saveToFirebase() {
    var selectedHouse = document.getElementById("houseText").value;
    var addedValue = parseInt(document.getElementById("points").value);
    
    if(!isNaN(addedValue) && selectedHouse != ""){
        var scoreToSet;
        firebase.database().ref(selectedHouse).once('value').then(function(dataSnapshot) {
            scoreToSet = dataSnapshot.val();
            firebase.database().ref(selectedHouse).set(scoreToSet + addedValue)
            .then(function(snapshot) {
                success(); // some success method
            }, function(error) {
                console.log('error' + error);
                error(); // some error method
            });
        });
    }
    
    getCurrentScores();
}

function getCurrentScores(){
    var house1;
    var house2;
    var house3;
    var house4;
    firebase.database().ref('House 1').once('value').then(function(dataSnapshot) {
        house1 = dataSnapshot.val();
        document.getElementById("h1Score").innerHTML = house1;
    });
    firebase.database().ref('House 2').once('value').then(function(dataSnapshot) {
        house2 = dataSnapshot.val();
        document.getElementById("h2Score").innerHTML = house2;
    });
    firebase.database().ref('House 3').once('value').then(function(dataSnapshot) {
        house3 = dataSnapshot.val();
        document.getElementById("h3Score").innerHTML = house3;
    });
    firebase.database().ref('House 4').once('value').then(function(dataSnapshot) {
        house4 = dataSnapshot.val();
        document.getElementById("h4Score").innerHTML = house4;
    });
}