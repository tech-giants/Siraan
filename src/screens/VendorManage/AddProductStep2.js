import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, ScrollView } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { bindActionCreators } from 'redux';
import i18n from '../../utils/i18n';
import { Navigation } from 'react-native-navigation';

// Components
import Section from '../../components/Section';
import StepByStepSwitcher from '../../components/StepByStepSwitcher';
import BottomActions from '../../components/BottomActions';

// Import actions
import * as stepsActions from '../../actions/stepsActions';

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

    Navigation.events().bindComponent(this);
  }

  /**
   * Moves to the next screen.
   */
  handleGoNext = () => {
    const { stepsData, stateSteps, currentStep } = this.props;

    const value = this.formRef.current.getValue();
    if (value) {
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
              name: value.name,
              description: value.description,
              steps: this.props.stepsData.steps,
            },
            currentStep: nextStep,
          },
        },
      });
    }
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
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {this.renderHeader()}
          <Section>
            <Form
              ref={this.formRef}
              type={formFields}
              options={this.getFormOptions()}
            />
          </Section>
        </ScrollView>
        <BottomActions
          onBtnPress={this.handleGoNext}
          btnText={i18n.t('Next')}
        />
      </View>
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
