import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { View, ScrollView } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

// Components
import Section from '../../components/Section';
import BottomActions from '../../components/BottomActions';

// Actions
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
  product_code: t.maybe(t.String),
  list_price: t.maybe(t.Number),
  amount: t.Number,
});

/**
 * Renders pricing inventory screen.
 *
 * @reactProps {object} stepsData - Data from previous steps of create product flow.
 * @reactProps {object} productsActions - Products actions.
 * @reactProps {object} product - Product information.
 */
export class PricingInventory extends Component {
  /**
   * @ignore
   */
  static propTypes = {
    stepsData: PropTypes.shape({}),
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
    const { product } = this.props;
    const isProductOffer = !!product.master_product_id;

    return {
      disableOrder: true,
      fields: {
        product_code: {
          label: i18n.t('CODE'),
          editable: !isProductOffer,
          i18n: {
            optional: '',
            required: '',
          },
        },
        list_price: {
          label: i18n.t('List price ($)'),
          editable: !isProductOffer,
          i18n: {
            optional: '',
            required: '',
          },
        },
        amount: {
          label: i18n.t('In stock'),
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
)(PricingInventory);
