import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { View, ScrollView, StatusBar, Text } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

// Components
import MyStatusBar from '../../components/SaldiriComponents/SaldiriStatusBar';
import Section from '../../components/Section';
import StepByStepSwitcher from '../../components/StepByStepSwitcher';
import BottomActions from '../../components/BottomActions';
import Spinner from '../../components/Spinner';

// Action
import * as productsActions from '../../actions/vendorManage/productsActions';
import * as imagePickerActions from '../../actions/imagePickerActions';

import i18n from '../../utils/i18n';
import * as nav from '../../services/navigation';
import { Navigation } from 'react-native-navigation';
import { DignalButton } from '../../components/SaldiriComponents/DignalButton';
import SaldiriTextInput from '../../components/SaldiriComponents/SaldiriTextInput';
// import ListIcon from 'react-native-paper/lib/typescript/components/List/ListIcon';

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
  price: t.Number,
  in_stock: t.Number,
  list_price: t.Number,
});

/**
 * Renders add product screen step 3.
 *
 * @reactProps {object} stepsData - Previous steps information.
 * @reactProps {object} productsActions - Products actions.
 * @reactProps {object} imagePickerActions - Image picker actions.
 */
export class AddProductStep3 extends Component {
  /**
   * @ignore
   */
  static propTypes = {
    stepsData: PropTypes.shape({}),
    productsActions: PropTypes.shape({}),
    imagePickerActions: PropTypes.shape({
      clear: PropTypes.func,
    }),
    creatingProduct: PropTypes.bool,
  };

  /**
   * @ignore
   */
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      price: '',
      inStock: '',
      listPrice: '',
      validationMessage: '',
    };
    this.formRef = React.createRef();

    Navigation.events().bindComponent(this);
  }

  /**
   * Creates new product.
   * Clears selected images from store.
   * Moves to edit product screen.
   */
  handleCreate = async () => {
    const { productsActions, stepsData, imagePickerActions } = this.props;
    const { loading, price, inStock, listPrice } = this.state;

    // const values = this.formRef.current.getValue();

    if (price && inStock && listPrice) {
      this.setState({ loading: true });
      this.setState({ validationMessage: '' });

      try {
        const newProductID = await productsActions.createProduct({
          product: `${stepsData.name}`,
          price: price,
          list_price: listPrice,
          category_ids: stepsData.category_ids,
          full_description: `${stepsData.description}`,
          amount: inStock,
          images: stepsData.images,
        });

        if (newProductID) {
          imagePickerActions.clear();
          this.setState({ loading: false });
          nav.setStackVendorManageEditProduct(this.props.componentId, {
            productID: newProductID,
            showClose: true,
          });
        }
      } catch (error) {
        this.setState({ loading: false });
      }
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
        price: {
          label: i18n.t('Price'),
        },
        in_stock: {
          label: i18n.t('In stock'),
        },
        list_price: {
          label: i18n.t('List price'),
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
    const {
      loading,
      price,
      inStock,
      listPrice,
      validationMessage,
    } = this.state;
    const { creatingProduct } = this.props;
    return (
      <>
        <MyStatusBar backgroundColor="#7c2981" barStyle="light-content" />
        <View style={styles.container}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContainer}>
            {this.renderHeader()}

            <View style={styles.formWrapper}>
              <SaldiriTextInput
                type="text"
                label="price"
                onChangeText={(e) => this.setState({ price: e })}
                value={price}
                keyboardType="number-pad"
                placeholder="Enter price"
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
              <SaldiriTextInput
                keyboardType="number-pad"
                type="text"
                label="list price"
                onChangeText={(e) => this.setState({ listPrice: e })}
                value={listPrice}
                placeholder="Enter list price"
                //   show_error={true}
              />

              {/* {!validationMessage ? null : (
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
              />
            </Section> */}
          </ScrollView>
          <DignalButton
            validationMessage={validationMessage}
            onPress={this.handleCreate}
            title="Create"
          />

          {/* <BottomActions
            onBtnPress={this.handleCreate}
            btnText={i18n.t('Create')}
            disabled={loading}
          /> */}
          <Spinner visible={creatingProduct} mode="modal" />
          {/* {console.log(
            'this.props.creatingProductthis.props.creatingProduct',
            creatingProduct,
          )} */}
        </View>
      </>
    );
  }
}

export default connect(
  (state) => ({
    nav: state.nav,
    creatingProduct: state.vendorManageProducts.creatingProduct,
  }),
  (dispatch) => ({
    imagePickerActions: bindActionCreators(imagePickerActions, dispatch),
    productsActions: bindActionCreators(productsActions, dispatch),
  }),
)(AddProductStep3);
