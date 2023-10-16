
let container;
const loadMembers = async () => {
    const res = await fetch('/members.json');
    const members = await res.json();
    return members;
}

const end = () => {
    container.innerHTML = '<h1 class="end">끝!</h1>';
}

const showNextMember = (members, questions) => {
    if (members.length === 0) {
        end();
        return;
    }
    const member = members.shift();
    const question = questions.shift();

    const [a, b] = [question.a, question.b].sort(() => Math.random() - 0.5);
    const questionBody = document.createElement('div');
    questionBody.innerHTML = `
        <h2>${question.q}</h2>
        <h3>1. ${a}</h3>
        <h3>2. ${b}</h3>
    `;
    questionBody.classList.add('question');
    const btn = document.createElement('button');
    btn.classList.add('questionBtn');
    btn.innerHTML = `질문: ${question.key}`;
    btn.addEventListener('click', () => {
        container.appendChild(questionBody);
        btn.classList.add('hide');
    });
    const next = document.createElement('button');
    next.classList.add('next');
    next.innerHTML = '다음';
    next.addEventListener('click', () => {
       showNextMember(members, questions);
    });
    questionBody.appendChild(next);
    container.innerHTML = `
    <div class="member">
        <img src='/assets/${member.name}.jpg' alt="${member.name}" />
        <h2>${member.name}</h2>
        <h3>${member.desc}</h3>
    </div>
    `;
    container.appendChild(btn);
}

const init = async () => {
    container = document.querySelector('#app');

    const members = await loadMembers();
    const questions = await loadQuestions();
    members.sort(() => Math.random() - 0.5);
    questions.sort(() => Math.random() - 0.5);

    showNextMember(members, questions);
}

document.addEventListener('DOMContentLoaded', init);