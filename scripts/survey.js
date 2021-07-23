class Survey {
    constructor(number) {
        this.number = number;
        this.getUrl = `https://opentdb.com/api.php?amount=${this.number}`;
        this.survey = document.querySelector('#survey');
        this.userForm = document.querySelector('#user-form');
        this.surveyForm = document.querySelector('#start-survey-form');
        this.questionForm = document.querySelector('#question-form');
        this.select = document.querySelector('#survey-select');

        this.user = new User();
        this.launchSurvey();
    }

    launchSurvey() {
        this.userForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.user.setUser();
            this.showQuestion();
            this.changeQuestionNumber();
        });

    }

    async changeQuestionNumber() {
        console.log('this.select: ', this.select);
        //if (!this.surveyForm) return;
        await this.select.addEventListener('change', (e) => {
            this.number = e.target.value;
            console.log('optSelected: ', this.number);
        });
    }

    async showQuestion() {
        let data = await this.getData();
        console.log('>>>', data.results);
        await this.listData(data.results);
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
        let option = '';
        let i = 1;
        let isSelected = '';
        data.map(record => {
            if (i === data.length) isSelected = 'selected';
            option += `<option ${isSelected} value="${i}">${i}</option>`;
            isSelected = '';
            i++;
        });
        this.survey.innerHTML = this.populateStartSurvey(option);
    }

    populateStartSurvey(item) {
        const content = `
            <form method="post" action="#" id="start-survey-form">
                <h3>Question number</h3>
                <div class="mt-3 text-center">Today, I'd like to answer</div>
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

    populateItemStartSurvey() {
        const content = ``;
        return content;
    }
}
/* <div class="mt-3 d-flex justify-content-center">
<button class="btn btn-primary" type="submit">Submit</button>
</div> */