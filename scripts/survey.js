class Survey {
    constructor(number) {
        this.number = parseInt(number);
        this.baseUrl = `https://opentdb.com/api.php?amount=`;
        this.getUrl = `${this.baseUrl}${this.number}`;

        this.survey = document.querySelector('#survey');
        this.userForm = document.querySelector('#user-form');
        this.surveyForm = document.querySelector('#start-survey-form');
        this.select = document.querySelector('#survey-select');

        this.data = '';
        this.questionCount = 0;
        this.resultGame = [];

        this.isChange = false;
        this.isSingle = false;
        this.isSingleSubmit = false;

        this.user = new User();
        this.scoreboard = new Scoreboard();
        this.launchSurvey();
    }

    launchSurvey() {
        this.userForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.user.setUser();
            this.showQuestionNumber();
            this.changeQuestionNumber();
            this.showSingleQuestion();
            this.submitSingleQuestion();
        });
    }


    async submitSingleQuestion() {
        const q = setInterval(async () => {
            if (this.isSingleSubmit) {
                const questionForm = document.querySelector('#question-form');
                questionForm.addEventListener('submit', e => {
                    e.preventDefault();

                    if (this.questionCount < this.number) {
                        console.log(this.questionCount, ' < ', this.number);
                        this.isQuestionValid();
                        this.questionCount += 1;
                        this.showSingleQuestion();
                    }
                });
                clearInterval(q);
            }
        }, 500);
    }

    isQuestionValid() {
        const cbVal = document.querySelector('input[type="radio"]:checked').value;
        this.resultGame.push(cbVal);
    }

    async showSingleQuestion() {
        const q = setInterval(() => {
            if (this.isSingle) {
                const data = this.data.results[this.questionCount];
                const items = this.getAllQuestionItems(data);
                this.survey.innerHTML = this.populateSingleQuestion(data, items);
                this.isSingleSubmit = true;
                clearInterval(q);
            }
        }, 500);
    }

    getAllQuestionItems(data) {
        const correct = [data.correct_answer];
        const incorrect = data.incorrect_answers;
        const res = incorrect.concat(correct);
        Tools.__shuffle(res);
        let content = '';
        let i = 0;
        let isCorrect = false;
        res.forEach(r => {
            if (r === data.correct_answer) isCorrect = true;
            content += `
                <div class="mt-3 form-check form-switch">
                    <input class="form-check-input" 
                            type="radio" 
                            name="flexRadioDefault" 
                            id="cb-${this.questionCount}-${i}" 
                            value="${isCorrect}">
                    <label class="form-check-label" 
                            for="cb-${this.questionCount}-${i}">
                        ${r}
                    </label>
                </div>
            `;
            i++;
            if (isCorrect === true) isCorrect = false;
        });
        return content;
    }

    async changeQuestionNumber() {
        const q = setInterval(async () => {
            if (this.isChange) {
                this.select = document.querySelector('#survey-select');
                await this.select.addEventListener('change', async (e) => {
                    this.number = parseInt(e.target.value);
                    this.getUrl = `${this.baseUrl}${this.number}`;
                    this.data = await this.getData();
                    this.isSingle = true;
                    console.log('changeQuestionNumber => data.results :', await this.data.results);
                });
                clearInterval(q);
            }
        }, 500);
    }

    async showQuestionNumber() {
        this.data = await this.getData();
        console.log('showQuestion => data.results :', this.data.results);
        await this.listData(this.data.results);
    }

    async getData() {
        let result = '';
        const data = await fetch(this.getUrl)
            .then(res => res.json())
            .then(res => result = res)
            .catch(err => console.error('Error =>', err));
        return result;
    }

    async listData(data) {
        let option = `<option selected>Select a number questions...</option>`;
        let i = 1;
        data.map(record => {
            option += `<option value="${i}">${i}</option>`;
            i++;
        });
        this.survey.innerHTML = this.populateStartSurvey(option);
        return this.isChange = true;
    }

    populateStartSurvey(item) {
        const content = `
            <form method="post" action="#" id="start-survey-form">
                <h3>Question number</h3>
                <div class="mt-5 text-center">Today, I'd like to answer</div>
                <div class="mt-3 text-center">
                    <select id="survey-select" 
                            class="form-select form-select-lg mb-3" 
                            aria-label="nombre de questions">${item}</select>
                    <label class="" 
                            for="survey-select">questions</label>
                </div>
            </form>
        `;
        return content;
    }

    populateSingleQuestion(data, items) {
        const content = `
            <form method="post" action="#" id="question-form">
                <h3>Question ${this.questionCount + 1}/${this.number}</h3>
                ${items}
                <div class="mt-3">
                    <button class="btn btn-primary" type="submit">Next ></button>
                </div>
            </form>
        `;
        return content;
    }
}
/* <div class="mt-3 d-flex justify-content-center">
<button class="btn btn-primary" type="submit">Submit</button>
</div> */