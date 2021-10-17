
var bool_dbg = true;
// end the quiz if all questions answered or times up
var bool_endQuiz = false; 
var int_secondsWait = 800;
if(bool_dbg)console.log("debugging")
var int_score = 60;
var int_distance = 60*1000;
var int_decrementCount = 0;
//var int_highScore = 0;
var int_answerCounter = 0;
var int_questionCounter= 0;

var float_minutesToAdd = 1;
var float_hoursToAdd = 0;

var str_userAnswered = "";
var str_userInitials = "Null";
// create a dictionary of arrays
// the key is the users initials
// the value is an array of thier scores as an object
var ArrStr_allScores = []
ArrStr_allScores = localStorage.getItem("ArrStr_allScores");
if(!ArrStr_allScores) ArrStr_allScores =[]
else ArrStr_allScores = JSON.parse(ArrStr_allScores)

var obj_oneScore = { str_Initials:"NULL", int_score:0, int_score:0 };


// create an array of question object objects
var arrObj_questions = [
    {str_answer: "InsertOption1", str_question: "insertQuestion1", int_points:10*1000, correctAnswer: "InsertOption1", ArrStr_answerOptions: ["InsertOption1","InsertOption2", "InsertOption3"]},
    {str_answer: "InsertOptionC", str_question: "insertQuestion2", int_points:10*1000, correctAnswer: "InsertOptionB", ArrStr_answerOptions: ["InsertOptionA","InsertOptionB", "InsertOptionC"]},
    {str_answer: "InsertOption6", str_question: "insertQuestion3", int_points:10*1000, correctAnswer: "InsertOption5", ArrStr_answerOptions: ["InsertOption4","InsertOption5", "InsertOption6"]}
]

// ============

//from index.html get the button element by the id named btn-start
var btnElement_start = document.querySelector("#btn-start");


// from index.html get the html div that will be dynamically updated
var divElement_DynamicSection = document.querySelector("#quiz-dynamic-section");

// a function that waits exactly three seconds, 
// by calling built in setInterval function
// then calls the clearInterval function to stop waiting
var func_waitnSeconds = function(paramSeconds){
    setTimeout( paramSeconds)

}

var func_setTime = function(){

    
// Set the date we're counting down to, todays date plus some time
var int_countDownDate =  new Date().getTime();

//int_countDownDate += 60*60*1000 ; // add 1 hour, or 59 int_minutes to todays future date
//int_countDownDate += 60*1000; // add 60 int_seconds to  future date

int_countDownDate += float_minutesToAdd* 60*1000; // add x amount of minutes
//int_countDownDate += float_hoursToAdd*60*60*1000


// Update the count down every 1 second
var x = setInterval(function() {

  // Get today's date and time
  var int_now = new Date().getTime();
    
  // Find the int_distance between int_now and the int_countDownDate
    int_distance = int_countDownDate - int_now;
  // set the global var, with the users times score to the 
  // inital difference between the start and end time
  
  int_distance += int_decrementCount
  
  
  int_score = int_distance
    
  // Time calculations for int_days, int_hours, int_minutes and int_seconds
  var int_days = Math.floor(int_distance / (1000 * 60 * 60 * 24));
  var int_hours = Math.floor((int_distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var int_minutes = Math.floor((int_distance % (1000 * 60 * 60)) / (1000 * 60));
  var int_seconds = Math.floor((int_distance % (1000 * 60)) / 1000);
    
  // Output the result in an element with id="timer"
  var divElement_timer = document.querySelector("#timer");
  divElement_timer.innerHTML = `Timer: ${int_minutes}m ${int_seconds}s `

if(bool_endQuiz){
    // if the user finishes all the questions 
    // stop the quiz and stop the timer
    func_endQuiz();
    clearInterval(x); // clearing the interval freezes the timer
    //document.getElementById("timer").innerHTML = `Timer: ${int_days}d ${int_hours}h ${int_minutes}m ${int_seconds}s `
    document.getElementById("timer").innerHTML = `Timer: ${int_minutes}m ${int_seconds}s `

    
   
}
    
  // If the count down is over, write some text 
  if (int_distance <= 0) {
    func_endQuiz();
    int_score = 0;
    clearInterval(x);
    document.getElementById("timer").innerHTML = "Timer: EXPIRED";
    
  }
}, 500);

}

var func_checkAnswer = function(){
    var bool_validAnswer = false;
    // ToDo
    var divElement_temp = document.createElement("div")
    var divElement_msg = document.querySelector("#form-question-msg");
    // get the current question 
    var obj_currentQuestion = arrObj_questions[int_questionCounter]

    var str_currentAnswer = obj_currentQuestion.str_answer


    var str_msg = "";
    var divElement_correct = document.createElement("div");
    var divElement_incorrect = document.createElement("div");
    divElement_correct.className = "form-question-msg correct"
    divElement_incorrect.className = "form-question-msg incorrect";
    if(bool_dbg)console.log(`correct Answer ${str_currentAnswer} | user answer : ${str_userAnswered}`)
    if(str_userAnswered == str_currentAnswer ){
        bool_validAnswer = true
        str_msg = "Correct: " + str_currentAnswer;
        divElement_correct.textContent = str_msg;
        divElement_correct.style= "color: green"
        divElement_temp.appendChild(divElement_correct)

    }
    else
        {
            
            str_msg = "Correct: " + str_currentAnswer;
            divElement_correct.textContent = str_msg;
            str_msg = "Wrong: " + str_currentAnswer;
            divElement_incorrect.textContent = str_msg;
            bool_validAnswer = false
            divElement_correct.style= "color: green"
            divElement_incorrect.style="color: red"
            divElement_temp.appendChild(divElement_correct)
            divElement_temp.appendChild(divElement_incorrect)

            if(bool_dbg)console.log(`reduce points by ${obj_currentQuestion.int_points} | int_score ${int_score}`)
            int_decrementCount -= obj_currentQuestion.int_points;
        }
    bool_validAnswer = false
    divElement_msg.innerHTML = divElement_temp.innerHTML;    
    int_questionCounter++;
}

var func_nextQuestion = function (){
     // create a div place holder that represents
    // quiz-dynamic-section div already on index.html

    // clear the message, for the previous question
    var divElement_msg = document.querySelector("#form-question-msg");
    divElement_msg.textContent = ``;

    if(bool_dbg)console.log(`counter ${int_questionCounter} , bool_endQui ${bool_endQuiz}`)

    // if we run out of time or run out of questions 
    // then end the quiz
    // ToDO: end quiz if time runs out
    if(int_questionCounter >= arrObj_questions.length){
        bool_endQuiz = true;
        func_endQuiz();
        return;
    }
    

    var divElement = document.createElement("div");
    divElement.className = "quiz-dynamic-section";

    // start the game by asking the first question
    // add the first question to index.html dynamically
    var obj_currentQuestion = arrObj_questions[int_questionCounter]
    var ArrStr_answerOptions= obj_currentQuestion.ArrStr_answerOptions;
    // parse my json object into an html friendly string
    var str_question = JSON.stringify(obj_currentQuestion.str_question);
    str_question = JSON.parse(str_question)

    // create the html code for the questions
    // each question will be an individual form
    // the form will have a label tag, select tag with multiple options
    var formElement = document.createElement("form");
    formElement.className = "form-question";

    // the question is added to index.html as a label
    var labelElement = document.createElement("label");
    labelElement.className = "form-question label-question";
    // add the question text to the label
    labelElement.textContent = str_question;
    var selectElement = document.createElement("select");
    selectElement.className = 'form-question select-question';
    // force the drop down to expand to a size equal to the number 
    // of answers for this question. This forces the options not to appear
    // in  a drop down
    selectElement.size=ArrStr_answerOptions.length;

    //loop through all the options available as an answer
    // create an option for every possible answer
    for(var i =0; i < ArrStr_answerOptions.length; i++){
        var optionElement = document.createElement("option")
        // set an option element to the value of the ith answer
        var str_currentAnswer = ArrStr_answerOptions[i];
        optionElement.value = str_currentAnswer;
        optionElement.textContent = str_currentAnswer;
        optionElement.className = "form-question question-option"
        // set a unique id across all possible answers across all questions
        optionElement.id = "answer-id-" + int_answerCounter;
        // add a custom data attribute to the options element
        optionElement.setAttribute("data-answer-id",int_answerCounter)
        // add the ith option element to the select element
        selectElement.appendChild(optionElement);
        int_answerCounter++;
    }

   

    // add all the dynamic elements to the final div so they are 
    // actually rendered

    // add the label to the form 
    formElement.appendChild(labelElement);
    //add the select to the form
    formElement.appendChild(selectElement);

    // add the form to our place holder div
    divElement.appendChild(formElement);
  

    //divElement.innerHTML = `<h1> ${obj_currentQuestion.str_question} </h1>`;
    // Set the div on index.html to our placeholder div to render the changes
    divElement_DynamicSection.innerHTML =  divElement.innerHTML;
    
}

var func_startQuiz = function (){
    //update dynamic section with a new section
    //ToDo: clear global variables for when the quiz restarts
 
    int_questionCounter = 0
    bool_endQuiz = false;
    // todo: set timer to zero
    // set high score hack to zero
    //int_highScore = 0;

    if(bool_dbg)console.log('starting quiz');
    func_nextQuestion();

    
}


var func_endQuiz = function(){
    
    var divElement = document.createElement("div");
    divElement.className = "quiz-dynamic-section";
    
    var h1Element = document.createElement("h1")
    h1Element.textContent = "All Done!"
    h1Element.className ="end-quiz"
    

    var pElement = document.createElement("p");
    pElement.className = "end-quiz"
    if(int_score< 0) int_score = 0;
    int_score = Math.floor(int_score/1000)
    pElement.textContent = `Your final score is ${int_score}`

    


    var formElement = document.createElement("form");
    formElement.className = "end-quiz";
    var labelElement = document.createElement("form");
    labelElement.className = "end-quiz";
    labelElement.textContent = "Enter Initials:"
    var inputElement = document.createElement("input");
    inputElement.className = "end-quiz";
    inputElement.id = "input-initials"
    var btnElement_submit = document.createElement("button")
    btnElement_submit.className = "end-quiz btn-submit-initials"
    btnElement_submit.id = "btn-submit-initials"    
    btnElement_submit.textContent = "submit! "
    divElement.appendChild(h1Element)
    divElement.appendChild(pElement)
    
    //add the input element to the label so they apear side by side
    labelElement.appendChild(inputElement)

    //add the label to theform
    formElement.appendChild(labelElement)
    
    // add the submit button to the form
    formElement.appendChild(btnElement_submit)
    
    // add the form to our place holder div
    divElement.appendChild(formElement);
    //divElement.innerHTML = `<h1> ${obj_currentQuestion.str_question} </h1>`;
    // Set the div on index.html to our placeholder div to render the changes
    divElement_DynamicSection.innerHTML =  divElement.innerHTML;

    // add score to storage
    
}




var func_loadScore = function () {
    var divElement = document.createElement("div");  
    var h1Element = document. createElement("h1")
    h1Element.textContent = "High Score! "
    divElement.appendChild(h1Element)


    // add score to local storage here 
    ArrStr_allScores.push(str_userInitials+" - "+int_score )
    localStorage.setItem("ArrStr_allScores",JSON.stringify(ArrStr_allScores));

    ArrStr_allScores = localStorage.getItem("ArrStr_allScores");
    if(!ArrStr_allScores) ArrStr_allScores =[]
    else ArrStr_allScores = JSON.parse(ArrStr_allScores)
    for(var index = 0; index < ArrStr_allScores.length; index++){
        var divElement_listItem = document.createElement("div")
        divElement_listItem.id="high-score-"+index
        divElement_listItem.textContent = ArrStr_allScores[index]
        divElement.appendChild(divElement_listItem)
    }


    var btnElement_goBack = document.createElement("button")
    btnElement_goBack.className = "reset-quiz btn-go-back";
    btnElement_goBack.id = "btn-go-back";
    btnElement_goBack.textContent = "Go Back"

    var btnElement_clearScore = document.createElement("button")
    btnElement_clearScore.className = "reset-quiz btn-clear-score";
    btnElement_clearScore.id = "btn-clear-score"
    btnElement_clearScore.textContent = "Clear High Scores"

    // ToDo: list all scores in local cache
    // create a temp div to hold our buttons in one element
    var divElement_buttons = document.createElement("div")
    divElement_buttons.appendChild(btnElement_goBack);
    divElement_buttons.appendChild(btnElement_clearScore)

    divElement.appendChild(divElement_buttons);


    divElement_DynamicSection.innerHTML =   divElement.innerHTML


     
}

var func_resetGame = function(){
    int_decrementCount = 0;
    int_score = 0;
    var divElement_Home = document.createElement("div")
    divElement_Home.innerHTML = "<div id=\"quiz-dynamic-section\" class=\"quiz-dynamic-section\"><h1>Coding Quizlet</h1><div> Lets test your coding skills. Start the timed quiz when ready</div><button id=\"btn-start\"class=\"btn-start\"> Start Button </button></div><div id=\"form-question-msg\" class=\"form-question-msg\"></div>"
    

    divElement_DynamicSection.innerHTML = divElement_Home.innerHTML
}

var buttonHandler =function(event){

	// debug code that helps us inspect what type of button is pressed
    if(bool_dbg) console.log(event.target);
    
	
	// if start button is selected execute the start quiz code
	if(event.target.matches(".btn-start")){
        // the event listenr is specifically listening on the start button 
        func_startQuiz();
        func_setTime();
	}
    else if(event.target.matches(".question-option") && !bool_endQuiz ){
        // if button clicked for next question & we are allowed to continue the quiz

        // the listener is listening on the entire dynamic section of the page
        // since this section is not rendered yet, the listener is added to the parent div that
        // contains anything not rendered yet.
        // Then if the user selects an answer, validate the answer is correct
        // then move on

        // ToDo check current answer

        str_userAnswered = event.target.value;
        if(bool_dbg)console.log(`User selected option : ${str_userAnswered}`)
        func_checkAnswer();
        // wait a few seconds, call next question
        setTimeout(func_nextQuestion, int_secondsWait)
        

        // ToDo adjust score
        str_userAnswered = ""
    }
    else if (event.target.matches(".btn-submit-initials")) { 
        // users submited their initals and ended the quiz
        // listens on the submit button dynamically added by func_endQuiz
        
        str_userInitials = document.querySelector("#input-initials").value; 
        
        func_loadScore();
    }
    else if (event.target.matches(".btn-clear-score")){
        // add score to local storage here 
        ArrStr_allScores=[]
        localStorage.setItem("ArrStr_allScores",JSON.stringify(ArrStr_allScores));
        func_resetGame()
    }
    else if (event.target.matches(".btn-go-back")){
        func_resetGame()
    }
    else
    {
        // do nothing
    }

};




//from index.html, add an event listener to the button element with id btnElement_start
// on click event-> execute the function buttonHandler  
btnElement_start.addEventListener("click", buttonHandler);
// listen on the entire dynamic section of the page
// this allows us to listen for mouse clicks on elemts that are not rendered yet
// the specific element targetd will be determined in the function buttonHandler
divElement_DynamicSection.addEventListener("click",buttonHandler)