import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { View, ScrollView, StatusBar, Pressable, Text } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Navigation } from 'react-native-navigation';

// Components
import MyStatusBar from '../../components/SaldiriComponents/SaldiriStatusBar';
import Section from '../../components/Section';
import BottomActions from '../../components/BottomActions';
import { DignalButton } from '../../components/SaldiriComponents/DignalButton';
import SaldiriTextInput from '../../components/SaldiriComponents/SaldiriTextInput';
import SaldiriHeader from '../../components/SaldiriComponents/SaldiriHeaderBar';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
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
  formWrapper: {
    paddingVertical: 10,
    paddingHorizontal: 15,
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
    const { product } = this.props;
    this.state = {
      code: product.product_code,
      listPrice: product.list_price,
      inStock: product.amount,
      // code: '',
      // listPrice: '',
      // inStock: '',
      validationMessage: '',
    };
  }
  componentDidMount() {
    const { product } = this.props;

    this.setState({
      code: product.product_code,
      listPrice: product.list_price,
      inStock: product.amount,
      validationMessage: '',
    });
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
    // const values = this.formRef.current.getValue();
    const { code, listPrice, inStock, validationMessage } = this.state;

    if (!code && !listPrice && !inStock) {
      this.validationMessageHandler();
      return;
    }
    const data = {
      amount: inStock,
      list_price: listPrice,
      product_code: code,
    };
    // productsActions.updateProduct(product.product_id, data);
  };
  // validation handler
  validationMessageHandler = () => {
    this.setState({ validationMessage: 'Enter all required * fields First' });
    setTimeout(() => {
      this.setState({ validationMessage: '' });
    }, 2500);
  };

  /**
   * Renders component.
   *
   * @return {JSX.Element}
   */
  render() {
    const { product } = this.props;
    const { code, listPrice, inStock, validationMessage } = this.state;
    return (
      <>
        <MyStatusBar backgroundColor="#7c2981" barStyle="light-content" />
        <SaldiriHeader
          startComponent={
            <Pressable
              onPress={() => Navigation.pop(this.props.componentId)}
              style={{
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <MaterialIcons name="arrow-back" size={20} color="#16191a" />
            </Pressable>
          }
          midHeaderTitle="Pricing / Inventory"
        />
        <View style={styles.container}>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.formWrapper}>
              <SaldiriTextInput
                type="text"
                label="code"
                onChangeText={(e) => this.setState({ code: e })}
                value={code}
                placeholder="Enter product code"
                //   show_error={true}
              />
              <SaldiriTextInput
                keyboardType="number-pad"
                type="text"
                label="list price ($)"
                onChangeText={(e) => this.setState({ listPrice: e })}
                value={listPrice}
                placeholder="Enter list price"
                //   show_error={true}
              />
              <SaldiriTextInput
                keyboardType="number-pad"
                type="text"
                label="in stock"
                onChangeText={(e) => this.setState({ inStock: e })}
                value={inStock}
                placeholder="Enter availability"
                //   show_error={true}
              />
              {/* {validationMessage === '' ? null : (
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
              )} */}
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
          <DignalButton
            validationMessage={validationMessage}
            onPress={this.handleSave}
            title="Save"
          />
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
)(PricingInventory);
