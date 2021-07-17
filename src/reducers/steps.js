import { SET_FLOW, SET_NEXT_STEP } from '../constants';

const initialState = {
  currentFlow: '',
  flowSteps: {},
  currentStep: '',
  currentStepNumber: 0,
  flows: {
    checkoutFlow: {
      profile: {
        title: 'Profile',
        screenName: 'CheckoutProfile',
      },
      shipping: {
        title: 'Shipping',
        screenName: 'CheckoutShipping',
      },
      payment: {
        title: 'Payment method',
        screenName: 'CheckoutPayment',
      },
    },
    addProductFlow: {
      image: {
        title: 'Image',
        screenName: 'VendorManageAddProductStep1',
      },
      name: {
        title: 'Enter the name',
        screenName: 'VendorManageAddProductStep2',
      },
      price: {
        title: 'Enter the price',
        screenName: 'VendorManageAddProductStep3',
      },
    },
  },
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_FLOW:
      const { flowName, filteredFlowSteps } = action.payload;

      return {
        ...state,
        currentFlow: flowName,
        flowSteps: filteredFlowSteps,
        currentStep: filteredFlowSteps[Object.keys(filteredFlowSteps)[0]],
        currentStepNumber: 0,
      };

    case SET_NEXT_STEP:
      return {
        ...state,
        currentStep: action.payload,
        currentStepNumber: state.currentStepNumber + 1,
      };

    default:
      return state;
  }
}
