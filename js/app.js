$(document).ready(()=>{let noOfAnswers=0;let selectedOptions=[];let scorePerQuestion=[];let counter=0;let overallTotal=0;const initialHtml=$(".quiz-container").html();const quiz=[{index:1,question:"Afrocenchix was started by two friends named?",options:["Rachael","Joycelyn","Evelyn"],answer:["Rachael","Joycelyn"]},{index:2,question:"Which of the following are true of Afrocenchix products?",options:["Silicone free","Sulphate free","Ethical and suitable"],answer:["Silicone free","Sulphate free","Ethical and suitable"]},{index:3,question:"Which of the following are categories of Afrocenchix products?",options:["Shampoo","Oils","Baking Powders"],answer:["Shampoo","Oils"]},{index:4,question:"Which of the following are not Afrocenchix's products?",options:["Swirl","Kit Kat","Zoro Mask"],answer:["Kit Kat","Zoro Mask"]}];const total=quiz.length;const createAnswerOption=(option)=>{let id=option.split(" ").join("");let htmlOption=`
                 <div class="custom-control custom-checkbox">
                     <input class="custom-control-input checkbox-round" type="checkbox" id="${id}" name="answer" value="${option}" />
                     <label class="custom-control-label" for="${id}">
                     ${option}
                     </label>
                 </div>`;return htmlOption}
const showQuiz=()=>{noOfAnswers=quiz[counter].answer.length;overallTotal+=noOfAnswers;$(".question").text('Question '+quiz[counter].index+': '+quiz[counter].question);$(".options").empty();quiz[counter].options.forEach(option=>{$(".options").append(createAnswerOption(option))})}
showQuiz();const initialize_quiz=()=>{counter=0;scorePerQuestion=[];selectedOptions=[];overallTotal=0}
const endQuiz=()=>{$(".quiz-container").empty();const score=scorePerQuestion.reduce((accum,element)=>accum+element);const scoreHtml=`<div class="card">
            <div class="card-header h5 bg-dark text-white">
                Final Score
            </div>
            <div class="card-body">
                <p>You scored <span class="h5">${score}</span> out of  <span class="h5">${overallTotal}</span></p>
                <p>You scored ${((score / overallTotal) * 100 ).toFixed(1)}% </p>

                <div class="d-flex align-items-center pt-3">
                    <button class="btn btn-default border rounded btnRestart">Restart Quiz</button>
                </div>
            </div>
        </div>`;$(".quiz-container").html(scoreHtml)}
const gradeQuestion=()=>{let questionGrade=0;selectedOptions.forEach(element=>{if(quiz[counter].answer.includes(element)){++questionGrade}});scorePerQuestion.push(questionGrade)}
const moveQuizStateBackward=(index)=>{noOfAnswers=quiz[counter].answer.length;overallTotal-=noOfAnswers}
$(document).on("click",".btnRestart",()=>{$(".quiz-container").html(initialHtml);initialize_quiz();showQuiz()});$(document).on("click",".custom-control-input",(e)=>{if(e.target.checked){selectedOptions.push(e.target.value)}else{selectedOptions.pop(e.target.value)}});$(document).on("click",".btnPrevious",()=>{if(counter>0){scorePerQuestion=scorePerQuestion.filter(item=>item==scorePerQuestion[counter]);moveQuizStateBackward(counter);--counter;moveQuizStateBackward(counter)}else{initialize_quiz()}
showQuiz()});$(document).on("click",".btnNext",()=>{gradeQuestion();if(counter<total-1){++counter;showQuiz();selectedOptions=[]}else{endQuiz()}});$(document).on("click",".btnStart",()=>{$(".introduction").addClass("d-none");$(".quiz-container").removeClass("d-none")})})