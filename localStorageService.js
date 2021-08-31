const localStorageService = new class {

    get coordinates() {
        return JSON.parse(localStorage.getItem('coordinates')) ?? [];
    }

    set coordinates(coordinates) {
        localStorage.setItem('coordinates', JSON.stringify(coordinates));
    }

}