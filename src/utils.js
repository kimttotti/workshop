function numberToAlpha(v) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    return `${chars[v]}`;
}

const loadQuestions = async () => {
    const list = await (await fetch('questions.json')).json();
    return list.map((item, i) => ({...item, key: i+1}));
}
