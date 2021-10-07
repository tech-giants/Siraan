import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, ScrollView, StatusBar, Pressable, Text } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { bindActionCreators } from 'redux';
import i18n from '../../utils/i18n';
import { Navigation } from 'react-native-navigation';

// Components
import MyStatusBar from '../../components/SaldiriComponents/SaldiriStatusBar';
import Section from '../../components/Section';
import StepByStepSwitcher from '../../components/StepByStepSwitcher';
import BottomActions from '../../components/BottomActions';
import { DignalButton } from '../../components/SaldiriComponents/DignalButton';
// Import actions
import * as stepsActions from '../../actions/stepsActions';
import SaldiriTextInput from '../../components/SaldiriComponents/SaldiriTextInput';
import SaldiriTextArea from '../../components/SaldiriComponents/SaldiriTextArea';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '$grayColor',
  },
  header: {
    marginLeft: 14,
    marginTop: 14,
  },
  scrollContainer: {
    paddingBottom: 14,
  },
  formWrapper: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
});

const t = require('tcomb-form-native');
const Form = t.form.Form;
const formFields = t.struct({
  name: t.String,
  description: t.maybe(t.String),
});

/**
 * Renders add product screen step 2.
 *
 * @reactProps {object} stepsData - Previous steps information.
 */
export class AddProductStep2 extends Component {
  /**
   * @ignore
   */
  static propTypes = {
    stepsData: PropTypes.shape({}),
  };

  /**
   * @ignore
   */
  constructor(props) {
    super(props);
    this.formRef = React.createRef();
    this.state = {
      name: '',
      description: '',
      validationMessage: '',
    };

    Navigation.events().bindComponent(this);
  }

  /**
   * Moves to the next screen.
   */
  handleGoNext = () => {
    const { stepsData, stateSteps, currentStep } = this.props;
    const { name, description } = this.state;

    // const value = this.formRef.current.getValue();
    if (name) {
      // Define next step
      const nextStep =
        stateSteps.flowSteps[
          Object.keys(stateSteps.flowSteps)[currentStep.stepNumber + 1]
        ];
      stepsActions.setNextStep(nextStep);

      Navigation.push(this.props.componentId, {
        component: {
          name: nextStep.screenName,
          passProps: {
            stepsData: {
              ...stepsData,
              name: name,
              description: description,
              steps: this.props.stepsData.steps,
            },
            currentStep: nextStep,
          },
        },
      });
    } else {
      this.validationMessageHandler();
    }
  };
  validationMessageHandler = () => {
    this.setState({ validationMessage: 'Enter all required * fields First' });
    setTimeout(() => {
      this.setState({ validationMessage: '' });
    }, 2500);
  };
  /**
   * Returns form options (field names, etc.)
   */
  getFormOptions = () => {
    return {
      disableOrder: true,
      fields: {
        description: {
          label: i18n.t('Description'),
          i18n: {
            optional: '',
            required: '',
          },
          clearButtonMode: 'while-editing',
          multiline: true,
          returnKeyType: 'done',
          blurOnSubmit: true,
          stylesheet: {
            ...Form.stylesheet,
            textbox: {
              ...Form.stylesheet.textbox,
              normal: {
                ...Form.stylesheet.textbox.normal,
                height: 150,
              },
            },
          },
        },
        name: {
          label: i18n.t('Name'),
        },
      },
    };
  };

  /**
   * Renders header.
   *
   * @return {JSX.Element}
   */
  renderHeader = () => {
    const { currentStep } = this.props;

    return (
      <View style={styles.header}>
        <StepByStepSwitcher currentStep={currentStep} />
      </View>
    );
  };

  /**
   * Renders component.
   *
   * @return {JSX.Element}
   */
  render() {
    const { name, description, validationMessage } = this.state;
    return (
      <>
        <MyStatusBar backgroundColor="#7c2981" barStyle="light-content" />
        <View style={styles.container}>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            {this.renderHeader()}
            <View style={styles.formWrapper}>
              <SaldiriTextInput
                type="text"
                label="product name"
                onChangeText={(e) => this.setState({ name: e })}
                value={name}
                placeholder="Enter product name"
                //   show_error={true}
              />
              <SaldiriTextArea
                type="text"
                label="description"
                onChangeText={(e) => this.setState({ description: e })}
                value={description}
                optional={true}
                placeholder="Enter product description"
                //   show_error={true}
              />
              {validationMessage === '' ? null : (
                <View
                  style={{
                    marginVertical: 10,
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      // ...styles.SaldiriTextInputMessage,
                      fontStyle: 'italic',
                      // color:  'red',
                      textTransform: 'lowercase',
                      color: 'red',
                      textAlign: 'center',
                    }}>
                    {validationMessage}
                  </Text>
                </View>
              )}
              {/* <Form
                ref={this.formRef}
                type={formFields}
                options={this.getFormOptions()}
              /> */}
            </View>
          </ScrollView>
          <DignalButton onPress={this.handleGoNext} title="Next" />

          {/* <BottomActions
            onBtnPress={this.handleGoNext}
            btnText={i18n.t('Next')}
          /> */}
        </View>
      </>
    );
  }
}

export default connect(
  (state) => ({
    stateSteps: state.steps,
  }),
  (dispatch) => ({
    stepsActions: bindActionCreators(stepsActions, dispatch),
  }),
)(AddProductStep2);
