import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, I18nManager } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import i18n from '../utils/i18n';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 14,
  },
});

const t = require('tcomb-form-native');
const Form = t.form.Form;
const formFields = t.struct({
  customerSignature: t.String,
  checkingAccountNumber: t.String,
  bankRoutingNumber: t.String,
  notes: t.maybe(t.String),
});
const formOptions = {
  disableOrder: true,
  fields: {
    customerSignature: {
      label: i18n.t("Customer's signature"),
      clearButtonMode: 'while-editing',
      returnKeyType: 'done',
    },
    checkingAccountNumber: {
      label: i18n.t('Checking account number'),
      clearButtonMode: 'while-editing',
      returnKeyType: 'done',
    },
    bankRoutingNumber: {
      label: i18n.t('Bank routing number'),
      clearButtonMode: 'while-editing',
      returnKeyType: 'done',
    },
    notes: {
      label: i18n.t('Comment'),
      i18n: {
        optional: '',
        required: '',
      },
      help: `${i18n.t('(Optional)')}`,
      clearButtonMode: 'while-editing',
      multiline: true,
      returnKeyType: 'done',
      blurOnSubmit: true,
      stylesheet: {
        ...Form.stylesheet,
        controlLabel: {
          ...Form.stylesheet.controlLabel,
          normal: {
            ...Form.stylesheet.controlLabel.normal,
            textAlign: 'left',
          },
          error: {
            ...Form.stylesheet.controlLabel.error,
            textAlign: 'left',
          },
        },
        textbox: {
          ...Form.stylesheet.textbox,
          normal: {
            ...Form.stylesheet.textbox.normal,
            height: 150,
            textAlign: I18nManager.isRTL ? 'right' : 'left',
            writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr',
          },
          error: {
            ...Form.stylesheet.textbox.error,
            textAlign: I18nManager.isRTL ? 'right' : 'left',
            writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr',
          },
        },
      },
    },
  },
};

/**
 * Renders payment check form.
 *
 * @param {function} onInit - Determines which form should be rendered.
 *
 * @return {JSX.Element}
 */
export default class PaymentCheckForm extends Component {
  /**
   * @ignore
   */
  static propTypes = {
    onInit: PropTypes.func,
  };

  componentDidMount() {
    this.props.onInit(this.refs.formRef);
  }

  render() {
    return (
      <View style={styles.container}>
        <Form ref={'formRef'} type={formFields} options={formOptions} />
      </View>
    );
  }
}
