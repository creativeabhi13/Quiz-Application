const startBtn = document.getElementById('start-btn');
const nextBtn = document.getElementById('next-btn');

const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');

let shuffledQuestions, currentQuestionIndex;
let quizscore = 0;


startBtn.addEventListener('click', startGame);
nextBtn.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion();
});

function startGame(){   
    startBtn.classList.add('hide');
    shuffledQuestions = questions.sort(() => Math.random() - .5);
    currentQuestionIndex = 0;
    questionContainerElement.classList.remove('hide');
    setNextQuestion();
    quizscore = 0;
}

function setNextQuestion(){
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);


}

function showQuestion(question){
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    })
} 

function resetState(){

    clearStatusClass(document.body);
    nextBtn.classList.add('hide');
    while(answerButtonsElement.firstChild){
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}


function selectAnswer(e){
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    setStatusClass(document.body, correct);
    Array.from(answerButtonsElement.children).forEach(button =>{
        setStatusClass(button, button.dataset.correct);
    })
    if(shuffledQuestions.length > currentQuestionIndex + 1){
        nextBtn.classList.remove('hide');
    }
    else{
        startBtn.innerText = 'restart';
        startBtn.classList.remove('hide');
    }
    if(selectedButton.dataset = correct){
        quizscore++;
    }
    document.getElementById('right-answers').innerHTML = quizscore;
}


function setStatusClass(element, correct){
   clearStatusClass(element)
   if(correct){
       element.classList.add('correct');
   }
    else{
         element.classList.add('wrong');
    }

}


function clearStatusClass(element){
    element.classList.remove('correct');
    element.classList.remove('wrong');
}
const questions = [
    
    {
        
        question: 'What does HTML stand for?',
        answers :   [
            {text: 'Hyper Text Markup Language', correct: true},
            {text: 'Hyper Text Markup Link', correct: false},
            {text: 'Hyper Text Markup List', correct: false},
            {text: 'Hyper Text Markup Line', correct: false}
        ],
    },
    {
     
        question: 'What does CSS stand for?',
        answers :   [
            {text: 'Cascading Style Sheet', correct: true},
            {text: 'Cascading Style Syntax', correct: false},
            {text: 'Cascading Style Sheet', correct: false},
            {text: 'Cascading Style Sheet', correct: false}
        ],

    },
    {
     
        question: 'What does JS stand for?',
        answers :   [
            {text: 'JavaScript', correct: true},
            {text: 'JavaStyle', correct: false},
            {text: 'JavaSyntax', correct: false},
            {text: 'JavaScript', correct: false}
        ],
    },
    {
      
        question: 'What does PHP stand for?',
        answers :   [
            {text: 'PHP: Hypertext Preprocessor', correct: true},
            {text: 'PHP: Hypertext Processor', correct: false},
            {text: 'PHP: Hypertext Preprocessor', correct: false},
            {text: 'PHP: Hypertext Preprocessor', correct: false}
        ],
    }
          
]