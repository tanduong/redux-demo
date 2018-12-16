import {combineReducers} from 'redux';

// action = {
//   type: 'PRICE_UPDATE',
//   data: {
//     BTC: {
//       price,
//       ....
//     }
//   }
// }

const priceReducer = (state = {}, action) => {
  if (action.type === 'PRICE_UPDATE') {
    return {
      ...state,
      ...action.data,
    };
  }

  return state;
};

// state = {
//   prices: {
//     BTC: {},
//     ETH: {}
//   },
//   watchList: ['BTC', 'ETH']
// }

export default combineReducers({prices: priceReducer});
