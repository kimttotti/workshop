
const questionPopup = document.createElement('div');

const openQuestion = (e) => {
    console.log(e.target);
    // const data = JSON.parse(e.target.dataset.question);
    const data = JSON.parse(e.target.parentElement.dataset.question);
    questionPopup.querySelector('.content').innerHTML = `
        <h2>${data.key}) ${data.q}</h2>
        <p>1) ${data.a}</p>
        <p>2) ${data.b}</p>
    `;
    questionPopup.classList.toggle('hide', false);
}

const closePopup = () => {
    console.log('close');
    questionPopup.classList.toggle('hide', true);
}

const makeQuestion = (q) => {
    const t = document.createElement('div');
    t.innerHTML = `<button type='button' data-target="${q.key}">${q.key}</button>`;
    t.querySelector('button').addEventListener('click', openQuestion);
    t.dataset.question = JSON.stringify(q);
    return t;
}

const init = async () => {
    questionPopup.classList.add('popup', 'hide');
    questionPopup.innerHTML = `
    <div class='content'></div>
    <button type="button">닫기</button>
    `;
    questionPopup.querySelector('button').addEventListener('click', closePopup);
    const questions = await loadQuestions();
    questions.forEach(item => {
       document.body.appendChild(makeQuestion(item)) ;
    });

    document.body.appendChild(questionPopup);
}

document.addEventListener('DOMContentLoaded', init);