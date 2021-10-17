
var bool_dbg = true;
// end the quiz if all questions answered or times up
var bool_endQuiz = false; 
var int_secondsWait = 800;
if(bool_dbg)console.log("debugging")
var int_time = 60;
var int_highScore = 0;
var int_answerCounter = 0;
var int_questionCounter= 0;
var str_userAnswered = "";
// create a dictionary of arrays
// the key is the users initials
// the value is an array of thier scores as an object
var dictArr_allScores = {}
var obj_oneScore = { str_Initials:"NULL", int_score:0, int_time:0 };


// create an array of question object objects
var arrObj_questions = [
    {str_answer: "insertCorrectAnswer", str_question: "insertQuestion1", int_points:10, correctAnswer: "InsertOption1", ArrStr_answerOptions: ["InsertOption1","InsertOption2", "InsertOption3"]},
    {str_answer: "insertCorrectAnswer", str_question: "insertQuestion2", int_points:20, correctAnswer: "InsertOptionB", ArrStr_answerOptions: ["InsertOptionA","InsertOptionB", "InsertOptionC"]},
    {str_answer: "insertCorrectAnswer", str_question: "insertQuestion3", int_points:30, correctAnswer: "InsertOption5", ArrStr_answerOptions: ["InsertOption4","InsertOption5", "InsertOption6"]}
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

var func_checkAnswer = function(){
    var bool_validAnswer = false;
    // ToDo
    var divElement_msg = document.querySelector("#form-question-msg");
    // get the current question 
    var obj_currentQuestion = arrObj_questions[int_questionCounter]
    var str_currentAnswer = obj_currentQuestion.str_answer

    // todo add css for wrong /correct color coding
    //todo update class namews with a class name of correct or wrong
    // todo update the message to color code correct answer
    // todo update if statement to color code wrong answer & correcct answer in msg
    // todo adjust score

    if(str_userAnswered === str_currentAnswer )
        bool_validAnswer = true
    else
        bool_validAnswer = false
    

    var pElement = document.createElement("p");
    pElement.className = ""
    divElement_msg.textContent = `Testing ${int_questionCounter}`
    bool_validAnswer = false
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
    int_questionCounter++;
}

var func_startQuiz = function (){
    //update dynamic section with a new section
    //ToDo: clear global variables for when the quiz restarts
 
    int_questionCounter = 0
    bool_endQuiz = false;
    // todo: set timer to zero
    // set high score hack to zero
    int_highScore = 0;

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
    pElement.textContent = `Your final score is ${int_highScore}`

    var formElement = document.createElement("form");
    formElement.className = "end-quiz";
    var labelElement = document.createElement("form");
    labelElement.className = "end-quiz";
    labelElement.textContent = "Enter Initials:"
    var inputElement = document.createElement("input");
    inputElement.className = "end-quiz";
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

}




var func_resetGame = function () {
    
     
     var divElement = document.createElement("div");
     divElement.className = "quiz-dynamic-section";
     
     var h1Element = document.createElement("h1")
     h1Element.textContent = "High Scores! <br> Place holder remider to add ol with scores"
     h1Element.className ="reset-quiz"

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

     
}

var buttonHandler =function(event){

	// debug code that helps us inspect what type of button is pressed
    if(bool_dbg) console.log(event.target);
    
	
	// if start button is selected execute the start quiz code
	if(event.target.matches(".btn-start")){
        // the event listenr is specifically listening on the start button 
        func_startQuiz();
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
        func_resetGame();
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