const SEND_MESSAGE = 'SEND_MESSAGE'

let initialState = {
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
}

const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEND_MESSAGE:
            let newMessage = action.newMessageBody
            return {
                ...state,
                messages: [...state.messages, {id: 6, message: newMessage}],
            };
        default:
            return state;
    }
}

export const sendMessageCreator = (newMessageBody) => ({type: SEND_MESSAGE, newMessageBody})

export default dialogsReducer;