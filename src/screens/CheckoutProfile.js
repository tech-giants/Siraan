import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { View, SafeAreaView } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Navigation } from 'react-native-navigation';

// Import components
import StepByStepSwitcher from '../components/StepByStepSwitcher';
import Spinner from '../components/Spinner';

// Import actions.
import * as authActions from '../actions/authActions';
import * as cartActions from '../actions/cartActions';
import * as stepsActions from '../actions/stepsActions';

import i18n from '../utils/i18n';
import { formatPrice } from '../utils';
import ProfileForm from '../components/ProfileForm';
import { iconsMap } from '../utils/navIcons';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  contentContainer: {
    paddingTop: 14,
    paddingBottom: 0,
    paddingLeft: 14,
    paddingRight: 14,
  },
});

/**
 * Checkout. Delivery screen.
 *
 * @reactProps {object} cart - Cart information.
 * @reactProps {object} authActions - Auth actions.
 */
export class CheckoutProfile extends Component {
  /**
   * @ignore
   */
  static propTypes = {
    cart: PropTypes.shape(),
    cartActions: PropTypes.shape(),
    authActions: PropTypes.shape(),
  };

  constructor(props) {
    super(props);
    this.state = {
      fieldsFetching: true,
    };
    Navigation.events().bindComponent(this);
  }

  /**
   * Gets fields and puts them in the state.
   */
  componentDidMount() {
    const { authActions } = this.props;
    const { fieldsFetching } = this.state;

    if (fieldsFetching) {
      authActions
        .profileFields({
          location: 'checkout',
          action: 'update',
        })
        .then(({ fields }) => {
          // eslint-disable-next-line no-param-reassign
          delete fields.E;

          this.setState({
            fields,
            fieldsFetching: false,
          });
        });
    }

    Navigation.mergeOptions(this.props.componentId, {
      topBar: {
        rightButtons: [
          {
            id: 'close',
            icon: iconsMap.close,
          },
        ],
      },
    });
  }

  navigationButtonPressed({ buttonId }) {
    if (buttonId === 'close') {
      Navigation.dismissModal(this.props.componentId);
    }
  }

  /**
   * Saves user data, redirects to next screen.
   *
   * @param {object} values - Form data.
   */
  handleNextPress(values) {
    const {
      cart,
      cartActions,
      stateSteps,
      stepsActions,
      currentStep,
      stateCart,
    } = this.props;

    cartActions.saveUserData(
      {
        ...cart.user_data,
        ...values,
      },
      stateCart.coupons,
    );

    // Define next step
    const nextStep =
      stateSteps.flowSteps[
        Object.keys(stateSteps.flowSteps)[currentStep.stepNumber + 1]
      ];
    stepsActions.setNextStep(nextStep);

    Navigation.push(this.props.componentId, {
      component: {
        name: nextStep.screenName,
        passProps: { cart, total: cart.subtotal, currentStep: nextStep },
      },
    });
  }

  filterProfileFormFields = (cart, fields) => {
    let filteredFields = { ...fields };

    if (!cart.isShippingRequired) {
      delete filteredFields.S;
    }

    return filteredFields;
  };

  /**
   * Renders component
   *
   * @return {JSX.Element}
   */
  render() {
    const { cart, currentStep, settings } = this.props;
    const { fieldsFetching, fields } = this.state;

    if (fieldsFetching) {
      return (
        <View style={styles.container}>
          <Spinner visible />
        </View>
      );
    }

    const filteredFields = this.filterProfileFormFields(cart, fields);

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.contentContainer}>
          <StepByStepSwitcher currentStep={currentStep} />
        </View>

        <ProfileForm
          dateFormat={settings.dateFormat}
          fields={filteredFields}
          cartFooterEnabled
          showTitles
          totalPrice={formatPrice(cart.total_formatted.price)}
          btnText={i18n.t('Next').toUpperCase()}
          onBtnPress={(values, validateCb) => {
            validateCb();
          }}
          onSubmit={(values) => {
            this.handleNextPress(values);
          }}
        />
      </SafeAreaView>
    );
  }
}

export default connect(
  (state) => ({
    stateCart: state.cart,
    auth: state.auth,
    stateSteps: state.steps,
    settings: state.settings,
    state,
  }),
  (dispatch) => ({
    authActions: bindActionCreators(authActions, dispatch),
    cartActions: bindActionCreators(cartActions, dispatch),
    stepsActions: bindActionCreators(stepsActions, dispatch),
  }),
)(CheckoutProfile);
