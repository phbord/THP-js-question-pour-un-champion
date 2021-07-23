class Survey {
    constructor(user, number) {
        this.user = user;
        this.number = number;
        this.url = `https://opentdb.com/api.php?amount=${this.number}`;
    }
}