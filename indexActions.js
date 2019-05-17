var scoreCount;

// Set text field to dropdown option
function setHouseText(text){
    document.getElementById("houseText").value = text;
}

// Indicate successful database submission
function success(){
    console.log("Completed Entry");
}

// Indicate unsuccessful database submission
function error(){
    console.log("Could not complete entry");
}

// Save new points to database.
async function saveToFirebase() {
    var selectedHouse = document.getElementById("houseText").value;
    var addedValue = parseInt(document.getElementById("points").value);
    var enteredPasscode = parseInt(document.getElementById("passcode").value);
    
    firebase.database().ref("passcode").once('value').then(function(dataSnapshot) {
        if(enteredPasscode == dataSnapshot.val()){
            // Only perform action if the required fields are not empty
            if(selectedHouse == "Griffin" || selectedHouse == "Dragon" || selectedHouse == "Phoenix" || selectedHouse == "Titan"){
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
            }
        }
        
        else {
            alert("Incorrect Passcode");
        }
    })
    
    // Refresh scores after update has to wait for short time to update database
    await sleep(1000);
    getCurrentScores();
}

// Sleep process for specified time
function sleep(msTime){
    return new Promise(resolve => setTimeout(resolve, msTime));
}

function clearInputs(){
    document.getElementById("houseText").value = "";
    document.getElementById("points").value = "";
}

// Retrieve and display current scores from database
function getCurrentScores(){
    var house1;
    var house2;
    var house3;
    var house4;
    firebase.database().ref('Dragon').once('value').then(function(dataSnapshot) {
        house1 = dataSnapshot.val();
        document.getElementById("h1Score").innerHTML = house1;
    });
    firebase.database().ref('Griffin').once('value').then(function(dataSnapshot) {
        house2 = dataSnapshot.val();
        document.getElementById("h2Score").innerHTML = house2;
    });
    firebase.database().ref('Phoenix').once('value').then(function(dataSnapshot) {
        house3 = dataSnapshot.val();
        document.getElementById("h3Score").innerHTML = house3;
    });
    firebase.database().ref('Titan').once('value').then(function(dataSnapshot) {
        house4 = dataSnapshot.val();
        document.getElementById("h4Score").innerHTML = house4;
    });
    
    clearInputs();
}
