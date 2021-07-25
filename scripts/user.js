class User {
    constructor() {
        this.localStorage = localStorage;
        this.storageName = 'username';
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
            this.localStorage.setItem(this.storageName, JSON.stringify(this.userArr));
            console.log('localStorage: ', this.localStorage[this.storageName]);
        }
    }

    getUser() {
        return this.localStorage.getItem('username');
    }

    setUserPoints(totalPoints) {
        const arr = [];
        userStorage[userStorage.length - 1].points = this.points;
        arr.push(userStorage);
        this.localStorage.setItem('username', JSON.stringify(this.arr));
        console.log('userPointsStorage: ', this.user.getUser());
    }
}