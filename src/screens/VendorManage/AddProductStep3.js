import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { View, ScrollView } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

// Components
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
  };

  /**
   * @ignore
   */
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
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
    const values = this.formRef.current.getValue();

    if (values) {
      this.setState({ loading: true });

      try {
        const newProductID = await productsActions.createProduct({
          product: `${stepsData.name}`,
          price: values.price,
          list_price: values.list_price,
          category_ids: stepsData.category_ids,
          full_description: `${stepsData.description}`,
          amount: values.in_stock,
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
    }
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
    const { loading } = this.state;
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
          onBtnPress={this.handleCreate}
          btnText={i18n.t('Create')}
          disabled={loading}
        />
        <Spinner visible={loading} mode="modal" />
      </View>
    );
  }
}

export default connect(
  (state) => ({
    nav: state.nav,
  }),
  (dispatch) => ({
    imagePickerActions: bindActionCreators(imagePickerActions, dispatch),
    productsActions: bindActionCreators(productsActions, dispatch),
  }),
)(AddProductStep3);
