<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css" integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossorigin="anonymous">
    <link rel="stylesheet" href="assets/style.css">
</head>
<body>
    <div class="w-100 container d-inline-flex flex-row"><a clas="p-2" href="javascript:func_loadScore();"> view high scores</a></div>
    <div class=" w-100 container d-inline-flex flex-row-reverse">   
        <div class=" score timer" id="timer"> Timer : 0</div>
    </div>

    <section class=" text-center w-100 row" id=" quiz-body" >
        <div class = "w-100 " >
        
        <div class="  quiz-dynamic-section" id="quiz-dynamic-section" >
            <h1>Coding Quizlet</h1>
            <div> Lets test your coding skills. Start the timed quiz when ready</div>
            <button class="btn-start" id="btn-start" > Start Button </button>
        </div>
        <div id="form-question-msg" class="form-question-msg"></div>
    </div>


    </section>
    <script src="assets/js/script.js"></script> 
    

   

     
</body>
<footer>

</footer>
</html>

