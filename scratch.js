var divElement = document.createElement("div");
divElement.className = "quiz-dynamic-section";

var h1Element = document.createElement("h1")
h1Element.textContent = "High Scores!"
h1Element.className ="reset-quiz"

// add score to local storage here 
ArrStr_allScores.push(str_userInitials+" - "+int_score )
localStorage.setItem("ArrStr_allScores",JSON.stringify(ArrStr_allScores));

ArrStr_allScores = localStorage.getItem("ArrStr_allScores");
if(!ArrStr_allScores) ArrStr_allScores =[]
else ArrStr_allScores = JSON.parse(ArrStr_allScores)

//var ulElement = document.createElement("ul");
//var liElement = document.createElement("li");

// Uncomment this
//  for(var index = 0; index < ArrStr_allScores.length; index++){
//    liElement.innerHTML = ArrStr_allScores[index]
//    liElement.id = "high-score-"+index
  
//    console.log(`high score ${ArrStr_allScores[index]} | li ${liElement.innerHTML}`)
//    ulElement.appendChild(liElement)
// }



var btnElement_goBack = document.createElement("button")
btnElement_goBack.className = "reset-quiz btn-go-back";
btnElement_goBack.id = "btn-go-back";
btnElement_goBack.textContent = "Go Back"

var btnElement_clearScore = document.createElement("button")
btnElement_clearScore.className = "reset-quiz btn-clear-score";
btnElement_clearScore.id = "btn-clear-score"
btnElement_clearScore.textContent = "Clear High Scores"

divElement.appendChild(h1Element);


// ToDo: list all scores in local cache
// create a temp div to hold our buttons in one element
var divElement_buttons = document.createElement("div")
divElement_buttons.appendChild(btnElement_goBack);
divElement_buttons.appendChild(btnElement_clearScore)

divElement.appendChild(divElement_buttons);


// Set the div on index.html to our placeholder div to render the changes
divElement_DynamicSection.innerHTML =  divElement.innerHTML;
