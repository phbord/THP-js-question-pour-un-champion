class User {
    constructor() {
        this.localStorage = localStorage;
        this.userArr = [];
        this.points = 0;
        this.userForm = document.querySelector('#user-form');
        this.user = document.querySelector('#username');
    }

    setUser() {
        //SUBMIT
        console.log('this.userForm: ',this.userForm);
        //Récupération du nom de l'utilisateur
        const userVal = this.user.value;
        console.log('SUBMIT > userVal: ',userVal);

        if (userVal) {
            //Gestion du LocalStorage
            const obj = { name: userVal, points: this.points };
            this.userArr.push(obj);
            localStorage.setItem('username', JSON.stringify(this.userArr));
        }
    }

    getUser() {
        return this.localStorage.getItem('username');
    }
}