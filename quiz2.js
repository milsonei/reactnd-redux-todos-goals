/* Create An Action Creator
 *
 * You need to create an action creator called 'mealCreator' that should:
 *   - Accept an id
 *   - Return a Redux action with a 'type' property that has a value of 'CREATE_MEAL'
 *   - Include the id passed to the action creator
*/

function createMeal(reducer){
    let state;
    let listeners = [];

    const getState = () => state;
     /**
     * Assimila as funções que serão chamadas quando o estado mudar
     * @param {function} listener 
     */
    const subscribe = (listener) => {
        listeners.push(listener)
        return () => {
            listeners = listeners.filter((l) => l !== listener)
        }
    }
    /**
     * Modifica o estado
     * dispatch() é chamado com uma Ação
     * @param {object} action 
     */
    const dispatch = (action) => {
        // o redutor que foi passado para createStore() é chamado com a árvore de estado atual e a ação...isto atualiza a árvore de estado
        state = reducer(state, action);

        //já que o estado (potencialmente) mudou, todas funções de monitoramento que foram registradas com o método subscribe() são chamadas
        listeners.forEach((listener) => listener());
    }

    return {
        getState,
        subscribe,
        dispatch
    } 
}

/**
 * Ações
 */
const CREATE_MEAL = 'CREATE_MEAL';

function createMealAction(meal){
    return {
        type: CREATE_MEAL,
        meal
    }
}

/**
 * App code que contém o código do reducer
 * Este é o código que o usuário deverá escrever para decidir como o estado muda com base na ação
 */
function meals(meals = [], action){
    if (action.type === CREATE_MEAL) return meals.concat([action.meal]);   
    return meals;    
}

const store = createMeal(meals);

store.subscribe(() => {
    console.log('The new state is: ', JSON.stringify(store.getState()))
});

store.dispatch(createMealAction({
    id:0,
    name: 'Breakfast'
}))

store.dispatch(createMealAction({
    id:1,
    name: 'Lunch' 
}));

store.dispatch(createMealAction({
    id:2,
    name: 'Dinner' 
}));
