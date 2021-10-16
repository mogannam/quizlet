
var bool_dbg = true;
if(bool_dbg)console.log("debugging")
var int_time = 60;
var int_highScore = 0;
// create a dictionary of arrays
// the key is the users initials
// the value is an array of thier scores as an object
var dictArr_allScores = {}
var obj_oneScore = { str_Initials:"NULL", int_score:0, int_time:0 };


// create an array of question object objects
var arr_questions = [
    {str_answer: "insertCorrectAnswer", str_question: "insertQuestion1", int_points:10, ArrStr_options: ["InsertOption1","InsertOption2", "InsertOption3"]},
    {str_answer: "insertCorrectAnswer", str_question: "insertQuestion2", int_points:20, ArrStr_options: ["InsertOptionA","InsertOptionB", "InsertOptionC"]},
    {str_answer: "insertCorrectAnswer", str_question: "insertQuestion3", int_points:30, ArrStr_options: ["InsertOption4","InsertOption5", "InsertOption6"]}
]

// ============

//from index.html get the button element by the id named btn-start
var btnElement_start = document.querySelector("#btn-start");
// from index.html get the html div that will be dynamically updated
var divElement_DynamicSection = document.querySelector("#quiz-dynamic-section");


var func_startQuiz = function (){
    //get the fynamic section, update new  html
    

    var divElement = document.createElement("div");
    divElement.className = "quiz-dynamic-section";
    var obj_currentQuestion = arr_questions[0]
    divElement.innerHTML = `<h1> ${obj_currentQuestion.str_question} </h1>`;
    divElement_DynamicSection.innerHTML =  divElement.innerHTML;

}


var buttonHandler =function(event){

	// debug code that helps us inspect what type of button is pressed
    if(bool_dbg) console.log(event.target);
    
	
	// if start button is selected execute the start quiz code
	if(event.target.matches(".btn-start")){
        func_startQuiz();
	}
};

//from index.html, add an event listener to the button element with id btnElement_start
// on click event-> execute the function buttonHandler  
btnElement_start.addEventListener("click", buttonHandler);



