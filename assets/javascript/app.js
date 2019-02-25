let correctAnsw=0;
let incorrectAnsw=0;
let unanswered=0;
let qNumber = 0 ;
let timeCounter = 15;
let interval_15 = 0;
let isEndOfGame = false;
let newGameIndex = 0;

function showQ(qNumber){
    $('#questionId').text(questionArr[qNumber][0]);
    $('.radio').show();
    $( "#answ1" ).prop( "checked", false );
    $( "#answ2" ).prop( "checked", false );
    $( "#answ3" ).prop( "checked", false );
    $( "#answ4" ).prop( "checked", false );
    $('#answ1').get(0).nextSibling.textContent = questionArr[qNumber][1];
    $('#answ2').get(0).nextSibling.textContent = questionArr[qNumber][2];
    $('#answ3').get(0).nextSibling.textContent = questionArr[qNumber][3];
    $('#answ4').get(0).nextSibling.textContent = questionArr[qNumber][4];

}
function nextQuestion(){
    timeCounter = 15;
    newGameIndex = 0;
    if(qNumber < questionArr.length){
        showQ(qNumber);
        qNumber++;
    }else{
        isEndOfGame = true;
        clearInterval(interval_15);
        $("#showTimer").html("");
        $('.radio').hide();
        $('#questionId').html("&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp Completed! Let's see the result");
        $('#questionId').append('<br><p>The Correct answers: '+ correctAnsw + '</p>');
        $('#questionId').append('<p>The Incorrect answers: '+ incorrectAnsw + '</p>');
        $('#questionId').append('<p>The Unanswered: '+ unanswered + '</p><br>');
    
        interval_15 = setInterval(function(){
            if(timeCounter>=0){
                $("#showTimer").html("Be ready for new Game in: "+timeCounter+" Seconds");
                timeCounter --;
                newGameIndex ++;
                if(newGameIndex == 16){
                    clearInterval(interval_15);
                    newGame();
                }
            }
            
        }, 1000);
        
    }
    
    
}
function newGame(){
    correctAnsw=0;
    incorrectAnsw=0;
    unanswered=0;
    qNumber = 0 ;
    timeCounter = 15;
    interval_15 = 0;
    isEndOfGame = false; 
    run();
}
function run()
{
    $("#showTimer").html("");
    nextQuestion();
    if(!isEndOfGame)
    {
        interval_15 = setInterval(function(){
            if(timeCounter>=0){
                $("#showTimer").html("Be ready for next one in: "+timeCounter+" Seconds");
                timeCounter --;
            }
            else{
                unansweredFunc(qNumber);
                clearInterval(interval_15);
            }
            
        }, 1000);
    }
}
$('input:radio[name="optradio"]').change(
    function(){
        clearInterval(interval_15);
        $("#showTimer").html("");
        if ($(this).is(':checked')) {
            if($(this).get(0).nextSibling.textContent == questionArr[qNumber-1][5]) // correct answer is selected
            {
               correctAnswer();
            }
            else{ // incorrect answer is selected
                incorrectAnswer();
            }
        }
});
function correctAnswer(){
    
    $("#showTimer").html("");
    $('.radio').hide();
    correctAnsw++;
    $('#questionId').html("&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp Congratulation! The Answer is Correct!");
    $('#answ1').get(0).nextSibling.textContent = '';
    $('#answ2').get(0).nextSibling.textContent = '';
    $('#answ3').get(0).nextSibling.textContent = '';
    $('#answ4').get(0).nextSibling.textContent = '';    
    
    timeCounter = 3;
    let interval3_co = setInterval(function(){
        if(timeCounter>0)
        {
            $("#showTimer").html("Be ready for next one in: "+timeCounter+" Seconds");
            timeCounter--;
        }
        else{
            clearInterval(interval3_co);
            run();
        }
    }, 1000);
}
function incorrectAnswer(){
    $("#showTimer").html("");
    $('.radio').hide();
    incorrectAnsw++;
    $('#questionId').html("&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp Sorry! The Answer is incorrect!");
    $('#answ1').get(0).nextSibling.textContent = '';
    $('#answ2').get(0).nextSibling.textContent = '';
    $('#answ3').get(0).nextSibling.textContent = '';
    $('#answ4').get(0).nextSibling.textContent = '';   

    timeCounter = 3; 
    let interval3_in = setInterval(function(){
        if(timeCounter>0)
        {
            $("#showTimer").html("Be ready for next one in: "+timeCounter+" Seconds");
            timeCounter--;
        }
        else{
            clearInterval(interval3_in);
            run();
        }
    }, 1000);
}
function unansweredFunc(qNumber1){
    $("#showTimer").html("");
    $('.radio').hide();
    unanswered++;
    $('#questionId').html("&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp The Answer is: "+questionArr[qNumber1-1][5]);
    $('#answ1').get(0).nextSibling.textContent = '';
    $('#answ2').get(0).nextSibling.textContent = '';
    $('#answ3').get(0).nextSibling.textContent = '';
    $('#answ4').get(0).nextSibling.textContent = '';    

    timeCounter = 3;
    let interval3_un = setInterval(function(){
        if(timeCounter>0)
        {
            $("#showTimer").html("Be ready for next one in: "+timeCounter+" Seconds");
            timeCounter--;
        }
        else{
            clearInterval(interval3_un);
            run();
        }
    }, 1000);
}
run();
