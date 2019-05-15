function setHouseText(text){
    document.getElementById("houseText").setAttribute("value", text);
}

function success(){
    console.log("Completed Entry");
}

function error(){
    console.log("Could not complete entry");
}