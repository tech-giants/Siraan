import {
    WALLET_DATA_REQUEST,
    WALLET_DATA_FAIL,
    WALLET_DATA_SUCCESS,
  } from '../constants';
  import Api from '../services/api';
//   import { Dispatch } from 'redux';
//   export  function fetch (id) {
//       console.log('wallet action runninggggggggggggggggggggggggggggggggggggggggggggggggggggggggg',id, dispatch)
// return async (dispatch)=>{
//     console.log('wallet action requesttttttttttttttttttttttttttttttttttttttttt')
//     dispatch({
//         type: WALLET_DATA_REQUEST,
//       });

//       return await Api.get(`/wallet/user_id${id}/`)
//       .then((response)=>{
//           console.log('wallet data fetching successsssssssssssssssssssssssss', response)
//           dispatch({
//               type: WALLET_DATA_SUCCESS,
//               payload: response,
//             });
//         })
//         .catch((error)=>{
//         console.log('wallet data fetching errorrrrrrrrrrrrrrrrrrrrrrrrr', error)
//       dispatch({
//         type: WALLET_DATA_FAIL,
//         error,
//       })})
//   }
//   }




//   export async function fetch (id,dispatch) {
//       console.log('wallet action runninggggggggggggggggggggggggggggggggggggggggggggggggggggggggg',id, dispatch)
//     //   return async (dispatch) => {
//           console.log('wallet action requesttttttttttttttttttttttttttt',id, dispatch)
//           dispatch({
//               type: WALLET_DATA_REQUEST,
//             });
//             console.log('wallet action 222222222222222222222222222222222222222222222222222',id)
            
//             try {
//                 console.log('wallet action 11responseeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',walletData)
//                 const walletData = await Api.get(`/wallet/user_id${id}/`)
//                 console.log('wallet action 22responseeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',walletData)
//                 dispatch({
//                     type: WALLET_DATA_SUCCESS,
//                     payload: walletData,
//                 });
//             } catch (error) {
//           console.log('wallet action failllllllllllllllllllllllllllll',walletData)
//         dispatch({
//           type: WALLET_DATA_FAIL,
//           error,
//         });
//       }
//     // };
//   }
  
  export function fetch(id){
  console.log('wallet fetch action function running with idddddd===>>>', id)
    return (dispatch) => {
        dispatch({
          type: WALLET_DATA_REQUEST,
        });
        const headers = {
            'Content-Type': 'application/json',
             Authorization:
              'Basic c2lyYWFubWFydEBnbWFpbC5jb206cjFpM2tIdWU3ODM5NjdvUWZwUWRDNDlJNEQ5cllvNnE=',
          };
          return Api.get(`/wallet?user_id=${id}`, { headers })
          // return Api.get(`/wallet?user_id=119`, { headers })
          .then((response)=>{
         console.log('wallet action data fetching successsssssssssssssssssssssssss', response)
         dispatch({
            type: WALLET_DATA_SUCCESS,
            payload: response.data,
            });

        })
        .catch((error)=>{
        console.log('wallet action data fetching errorrrrrrrrrrrrrrrrrrrrrrrrr', error)
         dispatch({
        type: WALLET_DATA_FAIL,
        payload:error,
        })});
      };

    };

  
  