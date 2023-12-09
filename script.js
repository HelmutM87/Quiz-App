let questions = [
    {
        "question": "Wann baute Charles Babbage den ersten mechanischen Computer?",
        "answer_1": "1832",
        "answer_2": "1912",
        "answer_3": "1932",
        "answer_4": "1952",
        "right_answer": 1
    },
    {
        "question": "Wer entwickelte 1941 den ersten programmgesteuerten Computer?",
        "answer_1": "Howard Aiken",
        "answer_2": "Hermann Hollerith",
        "answer_3": "Konrad Zuse",
        "answer_4": "John v. Neumann",
        "right_answer": 3
    },
    {
        "question": "Wie heißt das 2000 vorgestellte Computer-Betriebssystem von Microsoft?",
        "answer_1": "Windows XX",
        "answer_2": "Windows XL",
        "answer_3": "Windows XXL",
        "answer_4": "Windows XP",
        "right_answer": 4
    },
    {
        "question": "Welcher Computerpionier prägte den berühmten Satz: '640K sollte für jeden genug Speicher sein'?",
        "answer_1": "Steve Jobs",
        "answer_2": "Bill Gates",
        "answer_3": "Tim Berners-Lee",
        "answer_4": "Linus Torvalds",
        "right_answer": 2
    },
    {
        "question": "In welchem Jahr wurde das World Wide Web erstmals öffentlich zugänglich gemacht?",
        "answer_1": "1985",
        "answer_2": "1991",
        "answer_3": "1995",
        "answer_4": "2000",
        "right_answer": 2
    }
];


let rightQuestions = 0;
let currentQuestion = 0;
let audioSuccess = new Audio('sounds/success.mp3');
let audioWrong = new Audio('sounds/wrong.mp3');
let winner = new Audio('sounds/winner.mp3');


function init() {
    document.getElementById('number_of_questions_length').innerHTML = questions.length;

    showQuestion();
}


function showQuestion() {

    if (currentQuestion >= questions.length) {
        showEndscreen();
    } else {
        showProgressBar();
        showQuestionDetails();
    }
}


function showQuestionDetails() {
    let question = questions[currentQuestion];

    document.getElementById('question_text').innerHTML = question['question'];
    document.getElementById('answer_1').innerHTML = question['answer_1'];
    document.getElementById('answer_2').innerHTML = question['answer_2'];
    document.getElementById('answer_3').innerHTML = question['answer_3'];
    document.getElementById('answer_4').innerHTML = question['answer_4'];
    document.getElementById('number_of_current_cuestion').innerHTML = currentQuestion + 1;
}


function showProgressBar() {
    let percent = currentQuestion / questions.length;
    percent = Math.round(percent * 100);

    document.getElementById('progress_bar').innerHTML = `${percent} %`;
    document.getElementById('progress_bar').style = `width: ${percent * document.getElementById('progress_bar').parentElement.clientWidth / 100}px;`;
}


function answer(selection) {
    let question = questions[currentQuestion];
    let selectedQuestionNumber = selection.slice(-1);
    let idOfRightAnswer = `answer_${question['right_answer']}`;

    if (selectedQuestionNumber == question['right_answer']) {
        document.getElementById(selection).parentNode.classList.add('bg-success');
        audioSuccess.play();
        rightQuestions++;
    } else {
        document.getElementById(selection).parentNode.classList.add('bg-danger');
        document.getElementById(idOfRightAnswer).parentNode.classList.add('bg-success');
        audioWrong.play();
    }
    document.getElementById('next-button').disabled = false;
}


function nextQuestion() {
    currentQuestion++;
    document.getElementById('next-button').disabled = true;
    resetAnswerButtons();
    showQuestion();
}


function resetAnswerButtons() {
    document.getElementById('answer_1').parentNode.classList.remove('bg-success')
    document.getElementById('answer_1').parentNode.classList.remove('bg-danger')
    document.getElementById('answer_2').parentNode.classList.remove('bg-danger')
    document.getElementById('answer_2').parentNode.classList.remove('bg-success')
    document.getElementById('answer_3').parentNode.classList.remove('bg-danger')
    document.getElementById('answer_3').parentNode.classList.remove('bg-success')
    document.getElementById('answer_4').parentNode.classList.remove('bg-danger')
    document.getElementById('answer_4').parentNode.classList.remove('bg-success')
}


function showEndscreen() {

    document.getElementById('finish_body').style = '';
    document.getElementById('question_body').style = 'display: none';
    document.getElementById('number_of_questions_length_in_endscreen').innerHTML = questions.length;
    document.getElementById('number_of_right_answered_questions').innerHTML = rightQuestions;
    document.getElementById('card_background').src = "./img/winner.jpg";
    winner.play();
}