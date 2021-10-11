import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { View, ScrollView, StatusBar, Pressable } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import Section from '../../components/Section';
import BottomActions from '../../components/BottomActions';
import * as productsActions from '../../actions/vendorManage/productsActions';
import i18n from '../../utils/i18n';
import MyStatusBar from '../../components/SaldiriComponents/SaldiriStatusBar';
import { DignalButton } from '../../components/SaldiriComponents/DignalButton';
import SaldiriHeader from '../../components/SaldiriComponents/SaldiriHeaderBar';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Navigation } from 'react-native-navigation';
import SaldiriTextInput from '../../components/SaldiriComponents/SaldiriTextInput';
import SaldiriSwitch from '../../components/SaldiriComponents/SaldiriSwitch';
const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '$grayColor',
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

  /* 
component did mount 
initial values 
*/

  /**
   * @ignore
   */

  constructor(props) {
    super(props);
    this.state = {
      weight: this.props.product.weight,
      free_shipping: this.props.product.free_shipping,
    };
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
    const { free_shipping, weight } = this.state;
    // const values = this.formRef.current.getValue();

    if (!weight) {
      return;
    }
    const data = {
      free_shipping,
      weight: parseInt(weight),
    };
    productsActions.updateProduct(product.product_id, { ...data });
  };

  /**
   * Renders component.
   *
   * @return {JSX.Element}
   */
  render() {
    const { product, componentId } = this.props;
    const { free_shipping, weight } = this.state;

    return (
      <>
        <MyStatusBar backgroundColor="#7c2981" barStyle="light-content" />
        <SaldiriHeader
          startComponent={
            <Pressable
              onPress={() => Navigation.pop(componentId)}
              style={{
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <MaterialIcons name="arrow-back" size={20} color="#16191a" />
            </Pressable>
          }
          midHeaderTitle="Shipping Properties"
        />
        <View style={styles.container}>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.formWrapper}>
              <SaldiriTextInput
                keyboardType="number-pad"
                type="text"
                label="Weight (lbs)"
                onChangeText={(e) => this.setState({ weight: e })}
                value={weight}
                optional
                placeholder="Enter weight (lbs)"
                onBlur={() => (weight ? null : this.setState({ weight: 0 }))}
              />
              <SaldiriSwitch
                value={free_shipping}
                onToggle={(e) => this.setState({ free_shipping: e })}
                label="free shipping"
              />
            </View>
            {/* <Section>
              <Form
                ref={this.formRef}
                type={formFields}
                options={this.getFormOptions()}
                value={product}
              />
            </Section> */}
          </ScrollView>
          <DignalButton onPress={this.handleSave} title="Save" />

          {/* <BottomActions onBtnPress={this.handleSave} /> */}
        </View>
      </>
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
