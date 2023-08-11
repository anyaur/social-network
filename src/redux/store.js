import dialogsReducer from "./dialogs-reducer"
import profileReducer from "./profile-reducer"

let store = {
    _state: {
        postsData: {
            posts: [
                { message: 'Хочу кутать', id: 1 },
                { message: 'Мяу', id: 2 }
            ],
            newPostText: ''
        },
        dialogsData: {
            dialogs: [
                { name: "Василий", id: 1 },
                { name: "Барсик", id: 2 },
                { name: "Пушок", id: 3 },
                { name: "Кабачок", id: 4 }
            ],
            messages: [
                { message: "Я съел муху", id: 1 },
                { message: "Что у тебя было на обед?", id: 2 },
                { message: "Я поймал мышь", id: 3 }
            ],
            newMessageText: ''
        }
    },
    getState() {
        return this._state;
    },
    RerenderEntireTree() {
        console.log('state changed')
    },
    subscribe(observer) {
        this.RerenderEntireTree = observer;
    },
    dispatch(action) {
        this._state.postsData = profileReducer(this._state.postsData, action);
        this._state.dialogsData = dialogsReducer(this._state.dialogsData, action);
        this.RerenderEntireTree(this._state);
    }
}

export default store;