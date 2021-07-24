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
        this.userForm.addEventListener('submit', (e) => {
            console.log('xx ');
            e.preventDefault();
            //Récupération du nom de l'utilisateur
            const userVal = this.user.value;
            console.log('userVal: ',userVal);

            if (userVal) {
                // Gestion du LocalStorage
                const obj = {
                    name: userVal,
                    points: this.points
                };
                this.userArr.push(obj);
                //if (this.getUser()) this.localStorage.removeItem('username');
                //localStorage.setItem('username', this.userArr.push(userVal));
                localStorage.setItem('username', JSON.stringify(this.userArr));
            }
        });
    }

    getUser() {
        return this.localStorage.getItem('username');
    }
}