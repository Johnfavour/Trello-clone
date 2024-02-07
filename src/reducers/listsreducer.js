import {CONSTANTS} from '../actions'

let listID = 3;
let cardID = 8;

const initialState = [
    {
        title: 'Proposed',
        id: `list-${0}`,
        cards: [
            {
                id: `card-${0}`,
                text: 'implement Login'
            },
            {
                id: `card-${1}`,
                text: 'Create ability to sign up as a new user'
            }
        ]
    },
    {
        title: 'Approved',
        id: `list-${1}`,
        cards: [
            {
                id: `card-${2}`,
                text: 'Create presentation'
            },
            {
                id: `card-${3}`,
                text: 'Create project landing page'
            },
            {
                id: `card-${4}`,
                text: 'Write comprehensive README.md'
            },
            {
                id: `card-${5}`,
                text: 'Make demo of the project'
            },
            {
                id: `card-${6}`,
                text: 'Write blog post'
            }
        ]
    },
    {
        title: 'Deployed',
        id: `list-${2}`,
        cards: [
            {
                id: `card-${7}`,
                text: 'Deployed'
            },
        ]
    },
]


const listsReducer = (state = initialState, action) => {
    switch (action.type){

        case CONSTANTS.ADD_LIST: 
        const newList = {
            title: action.payload,
            cards: [],
            id: `list-${listID}`
        };
        listID += 1
        return [...state, newList];

        case CONSTANTS.ADD_CARD: {
        const newCard = {
            text: action.payload.text,
            id: `card-${cardID}`
        };
        cardID += 1;

        const newState = state.map(list => {
            if(list.id === action.payload.listID) {
                return {
                    ...list,
                    cards: [...list.cards, newCard]
                }
            } else {
                return list;
            }
        });

        return newState; 
    }
        case CONSTANTS.DRAG_HAPPENED:
            const {
                droppableIdStart,
                droppableIdEnd,
                droppableIndexStart,
                droppableIndexEnd,
                draggableId,
                type
            } = action.payload;
                const newState = [...state];

                //helps to drag list around
                if (type === 'list') {
                    const list = newState.splice(droppableIndexStart, 1);
                    newState.splice(droppableIndexEnd, 0, ...list);
                    return newState;
                }

                //make the list persistance in the same list
                if(droppableIdStart === droppableIdEnd) {
                    const list = state.find(list => droppableIdStart === list.id);
                    const card = list.cards.splice(droppableIndexStart, 1);
                    list.cards.splice(droppableIndexEnd, 0, ...card);
                }

                //making the list persistance on all cards
                if (droppableIdStart !== droppableIdEnd) {
                    const listStart = state.find(list => droppableIdStart === list.id)

                    //being able to pull out the card from the list
                    const card = listStart.cards.splice(droppableIndexStart, 1);

                    //The code that helps find the list when the drag ended
                    const listEnd = state.find(list => droppableIdEnd === list.id);

                    //The code that that puts the card in the new list
                    listEnd.cards.splice(droppableIndexEnd, 0, ...card);

                }

                return newState;

        default:
            return state;
    }
};


export default listsReducer;