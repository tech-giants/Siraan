import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { View, ScrollView } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import Section from '../../components/Section';
import BottomActions from '../../components/BottomActions';
import * as productsActions from '../../actions/vendorManage/productsActions';
import i18n from '../../utils/i18n';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '$grayColor',
  },
  scrollContainer: {
    paddingBottom: 14,
  },
});

const t = require('tcomb-form-native');
const Form = t.form.Form;
const formFields = t.struct({
  weight: t.Number,
  free_shipping: t.Boolean,
});

/**
 * Shipping setup screen.
 * @param {object} values - Shipping setup information.
 * @param {object} productsActions - Products actions.
 * @param {object} product - Product information.
 */
export class ShippingProperties extends Component {
  /**
   * @ignore
   */
  static propTypes = {
    values: PropTypes.shape({}),
    productsActions: PropTypes.shape({}),
    product: PropTypes.shape({}),
  };

  /**
   * @ignore
   */
  constructor(props) {
    super(props);

    this.formRef = React.createRef();
  }

  /**
   * Returns form options (field names, etc.)
   */
  getFormOptions = () => {
    return {
      disableOrder: true,
      fields: {
        weight: {
          label: i18n.t('Weight (lbs)'),
        },
        free_shipping: {
          label: i18n.t('Free shipping'),
        },
      },
    };
  };

  /**
   * Saves changes.
   */
  handleSave = () => {
    const { product, productsActions } = this.props;
    const values = this.formRef.current.getValue();

    if (!values) {
      return;
    }

    productsActions.updateProduct(product.product_id, { ...values });
  };

  /**
   * Renders component.
   *
   * @return {JSX.Element}
   */
  render() {
    const { product } = this.props;

    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Section>
            <Form
              ref={this.formRef}
              type={formFields}
              options={this.getFormOptions()}
              value={product}
            />
          </Section>
        </ScrollView>
        <BottomActions onBtnPress={this.handleSave} />
      </View>
    );
  }
}

export default connect(
  (state) => ({
    product: state.vendorManageProducts.current,
  }),
  (dispatch) => ({
    productsActions: bindActionCreators(productsActions, dispatch),
  }),
)(ShippingProperties);
