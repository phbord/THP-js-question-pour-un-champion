class User {
    constructor() {
        this.localStorage = localStorage;
        this.userVal = '';
        this.userArr = [];
        this.points = 0;
        this.userForm = document.querySelector('#user-form');
        this.user = document.querySelector('#username');
    }

    setUser() {
        //SUBMIT
        //Récupération du nom de l'utilisateur
        this.userVal = this.user.value;

        if (this.userVal) {
            //Gestion du LocalStorage
            const obj = { name: this.userVal, points: this.points };
            this.userArr.push(obj);
            this.localStorage.setItem('username', JSON.stringify(this.userArr));
            console.log('localStorage: ', this.localStorage['username']);
        }
    }

    getUser() {
        return this.localStorage.getItem('username');
    }

    setUserPoints(totalPoints) {
        //const userStorage = this.localStorage['username'][this.localStorage.length - 1].points;
        //const userStorage = JSON.parse(this.localStorage['username']);
        const userStorage = JSON.parse(this.getUser());
        //userStorage[this.localStorage.length - 1].points;
        const obj = { name: this.userVal, points: totalPoints };
        this.localStorage.setItem('username', JSON.stringify(userStorage));
        console.log( '::: ', userStorage );
    }
}