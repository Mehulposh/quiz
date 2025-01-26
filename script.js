const queElement = document.querySelector("p");
const optionContainer = document.querySelector(".option");
const submitBtn = document.querySelector("#submit");
const nextBtn = document.querySelector("#next");

let score = 0;
let currentQuestionIndex = Math.floor(Math.random() * questions.length);
let submitCount = 0;
const total = 10;

function renderQuestion(){
    const currentQuestion = questions[currentQuestionIndex];
    queElement.textContent = currentQuestion.question;
    
    optionContainer.innerHTML="";

    ["A","B","C","D"].forEach((opt) => {
        const optionEle = document.createElement("li")
        optionEle.innerHTML =  `<input type="radio" id="option${opt}" name="answer" value="${opt}">
                                <label for="option${opt}">${currentQuestion[opt]}</label> `;
        
        optionContainer.appendChild(optionEle);
    });

    submitBtn.disabled = false; // Enable submit button
    nextBtn.disabled = true;
    submitBtn.style.display = "inline-block";
    nextBtn.style.display = "none";
}

renderQuestion();


submitBtn.addEventListener("click",()=>{
    submitCount++;
    const selectedOption = document.querySelector("input[name='answer']:checked");

    // Handle case where no option is selected
    if (!selectedOption) {
        alert("Please select an answer!");
        return;
    }

    const selectedAnswer = selectedOption.value;
    const correctAnswer = questions[currentQuestionIndex];

    if(selectedAnswer === correctAnswer.answer){
        score++;
    }

    submitBtn.disabled = true; // Disable submit button
    nextBtn.disabled = false; // Enable next button
    nextBtn.style.display = "inline-block";
    submitBtn.style.display = "none";
});


nextBtn.addEventListener("click",() =>{
    currentQuestionIndex++;

    if(submitCount === total){
        alert(`Quiz Finished! Your Score is ${score}/${total}`);
        score =0;
        currentQuestionIndex=0;
        submitCount=0;
        renderQuestion();
    }
    
    else{
        renderQuestion();
    }
});