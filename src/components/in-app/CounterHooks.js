// import React, { useState, useEffect, useReducer } from 'react';

// import { initialState, rootReducer, scoreReducer } from '../../redux/reducers';
// import { databaseRef, setDatabaseValue } from '../firebase/database/helperFunctions';

// const CounterHooks = ({ id }) => {
//     const [dataValue, setDataValue] = useState();
//     const [state, dispatch] = useReducer(rootReducer, initialState, (state => state), id);

//     const recordUserValue = () => {
//         let authUid = state.user.uid
//         setDatabaseValue('score/' + authUid, state.score)
//     };

//     useEffect(() => {
//         if (state.user) {
//             // on load of counter, retrieve user's
//             // score from database
//             let authUid = state.user.uid
//             databaseRef('score/' + authUid).on('value', ((snapshot) => {
//                 setDataValue(snapshot.val())
//             }))
//         }
//     }, [])

//     return (
//         <div>
//             <button onClick={() => dispatch({ type: 'INCREMENT' })}>+</button>
//             <div>{state.score}</div>
//             <button onClick={() => dispatch({ type: 'DECREMENT' })}>-</button>
//             <button>Record value</button>
//             <div>Your saved value is {dataValue}</div>
//         </div>
//     )
// };

// export default CounterHooks;