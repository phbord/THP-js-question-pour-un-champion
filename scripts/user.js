class User {
    constructor() {
        this.localStorage = localStorage;
        this.userForm = document.querySelector('#user-form');
        this.user = document.querySelector('#username');
    }

    async setUser() {
        this.userForm.addEventListener('submit', (e) => {
            e.preventDefault();
            //Récupération du nom de l'utilisateur
            const userVal = this.user.value;

            if (userVal) {
                // Gestion du LocalStorage
                if (this.getUser()) this.localStorage.removeItem('username');
                this.localStorage.setItem('username', userVal);
            }
        });
    }

    getUser() {
        return this.localStorage.getItem('username');
    }
}