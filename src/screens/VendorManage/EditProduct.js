import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ActionSheet from 'react-native-actionsheet';
import {
  View,
  Image,
  Text,
  ScrollView,
  SafeAreaView,
  Pressable,
  StatusBar,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import uniqueId from 'lodash/uniqueId';

// Components
import Section from '../../components/Section';
import Spinner from '../../components/Spinner';
import Icon from '../../components/Icon';
import BottomActions from '../../components/BottomActions';
import MyStatusBar from '../../components/SaldiriComponents/SaldiriStatusBar';
import SaldiriHeader from '../../components/SaldiriComponents/SaldiriHeaderBar';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// Action
import * as productsActions from '../../actions/vendorManage/productsActions';
import * as imagePickerActions from '../../actions/imagePickerActions';

import i18n from '../../utils/i18n';
import { getProductStatus } from '../../utils';
import * as nav from '../../services/navigation';

import { iconsMap } from '../../utils/navIcons';
import { Navigation } from 'react-native-navigation';
import SaldiriTextInput from '../../components/SaldiriComponents/SaldiriTextInput';
import SaldiriTextArea from '../../components/SaldiriComponents/SaldiriTextArea';
import { DignalButton } from '../../components/SaldiriComponents/DignalButton';
import HtmlEditor from '../../components/SaldiriComponents/HtmlEditor/HtmlEditor';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '$grayColor',
  },
  scrollContainer: {
    paddingBottom: 14,
  },
  menuItem: {
    borderBottomWidth: 1,
    borderColor: '#F0F0F0',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
  },
  menuItemTitle: {
    color: '#8f8f8f',
    fontSize: '0.8rem',
    paddingBottom: 4,
  },
  menuItemText: {
    width: '90%',
  },
  btnIcon: {
    color: '#898989',
  },
  horizontalScroll: {
    marginTop: 20,
    marginLeft: 20,
  },
  imgWrapper: {
    backgroundColor: '#fff',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    padding: 4,
    marginRight: 10,
    minWidth: 100,
    minHeight: 100,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    width: 100,
    height: 100,
  },
  addImageIcon: {
    fontSize: '3rem',
    // color: 'red',
    color: '#7c2981',
  },
  formWrapper: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
});

const t = require('tcomb-form-native');
const Form = t.form.Form;
const formFields = t.struct({
  product: t.String,
  full_description: t.maybe(t.String),
  price: t.Number,
});

/**
 * Renders categories picker.
 *
 * @reactProps {number} productID - Product id.
 * @reactProps {object} stepsData - Data from create product flow.
 * @reactProps {object} productsActions - Products actions.
 * @reactProps {object} product - Product information.
 * @reactProps {[object]} categories - List of categories.
 * @reactProps {boolean} loading - Loading indicator.
 * @reactProps {boolean} showClose - Shows close button or not.
 * @reactProps {boolean} isUpdating - Updating indicator.
 * @reactProps {[string]} selectedImages - Images paths.
 * @reactProps {object} imagePickerActions - Image picker actions.
 */
export class EditProduct extends Component {
  /**
   * @ignore
   */
  static propTypes = {
    productID: PropTypes.number,
    stepsData: PropTypes.shape({}),
    productsActions: PropTypes.shape({}),
    product: PropTypes.shape({}),
    categories: PropTypes.arrayOf(PropTypes.shape({})),
    loading: PropTypes.bool,
    showClose: PropTypes.bool,
    isUpdating: PropTypes.bool,
    selectedImages: PropTypes.arrayOf(PropTypes.string),
    imagePickerActions: PropTypes.shape({
      clear: PropTypes.func,
    }),
  };

  /**
   * @ignore
   */
  constructor(props) {
    super(props);
    const { product } = this.props;
    this.state = {
      // name: '',
      // description: '',
      // price: '',
      name: product.product,
      description: product.full_description,
      price: product.price,
      validationMessage: '',
    };
    this.formRef = React.createRef();
    Navigation.events().bindComponent(this);
  }

  /**
   * Returns field names for more action list.
   */
  getMoreActionsList = () => {
    return [i18n.t('Delete This Product'), i18n.t('Cancel')];
  };

  /**
   * Sets header setup.
   */
  componentDidMount() {
    const {
      imagePickerActions,
      productID,
      productsActions,
      showClose,
      componentId,
      product,
    } = this.props;
    //  // setting initial values in editor
    this.setState({
      name: product.product,
      description: product.full_description,
      price: product.price,
    });

    imagePickerActions.clear();
    productsActions.fetchProduct(productID);

    const buttons = {
      rightButtons: [
        {
          id: 'more',
          icon: iconsMap['more-horiz'],
        },
      ],
    };

    if (showClose) {
      buttons.leftButtons = [
        {
          id: 'close',
          icon: iconsMap.close,
        },
      ];
    }

    Navigation.mergeOptions(componentId, {
      topBar: {
        ...buttons,
      },
    });
  }

  /**
   * Edit product modal navigation.
   *
   * @param {object} event - Information about the element on which the event occurred.
   */
  navigationButtonPressed({ buttonId }) {
    if (buttonId === 'more') {
      this.ActionSheet.show();
    }

    if (buttonId === 'close') {
      Navigation.dismissAllModals();
    }
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
        product: {
          label: i18n.t('Name'),
          editable: !isProductOffer,
        },
        full_description: {
          label: i18n.t('Full description'),
          numberOfLines: 4,
          editable: !isProductOffer,
          i18n: {
            optional: '',
            required: '',
          },
          multiline: true,
          stylesheet: {
            ...Form.stylesheet,
            textbox: {
              ...Form.stylesheet.textbox,
              normal: {
                ...Form.stylesheet.textbox.normal,
                height: 130,
              },
            },
          },
          clearButtonMode: 'while-editing',
        },
        price: {
          label: i18n.t('Price'),
        },
      },
    };
  };

  handleMoreActionSheet = (index) => {
    const { product, productsActions, componentId, showClose } = this.props;
    if (index === 0) {
      productsActions.deleteProduct(product.product_id);

      if (showClose) {
        Navigation.dismissAllModals();
      } else {
        Navigation.pop(componentId);
      }
    }
  };

  /**
   * Sets selected value.
   *
   * @param {number} index - Value index.
   */
  handleStatusActionSheet = (index) => {
    const { product, productsActions } = this.props;
    const statuses = ['A', 'H', 'D'];
    const activeStatus = statuses[index];

    if (activeStatus) {
      productsActions.updateProduct(product.product_id, {
        status: activeStatus,
      });
    }
  };

  /**
   * Saves changes.
   */
  handleSave = () => {
    const {
      product,
      productsActions,
      productID,
      categories,
      selectedImages,
      imagePickerActions,
    } = this.props;
    const { name, description, price, validationMessage } = this.state;

    // const values = this.formRef.current.getValue();
    if (!name && !description && !price) {
      validationMessageHandler();
      return;
    }

    const data = {
      images: selectedImages,
      product: name,
      full_description: description,
      price,
    };

    if (categories.length) {
      data.category_ids = categories[0].category_id;
    }

    productsActions
      .updateProduct(product.product_id, data)
      .then(() => productsActions.fetchProduct(productID, false))
      .then(() => imagePickerActions.clear());
  };
  // validation handler
  validationMessageHandler = () => {
    this.setState({ validationMessage: 'Enter all required * fields First' });
    setTimeout(() => {
      this.setState({ validationMessage: '' });
    }, 2500);
  };
  /**
   * Removes an image.
   *
   * @param {number} imageIndex - Image index.
   */
  handleRemoveImage = (imageIndex) => {
    const { imagePickerActions, selectedImages } = this.props;
    const newImages = [...selectedImages];
    newImages.splice(imageIndex, 1);
    imagePickerActions.toggle(newImages);
    Navigation.dismissModal(this.props.componenId);
  };

  /**
   * Renders images.
   *
   * @return {JSX.Element}
   */
  renderImages = () => {
    const { product, selectedImages } = this.props;
    const isProductOffer = !!product.master_product_id;
    const images = [];

    if (product.main_pair) {
      images.push(product.main_pair.icon.image_path);
    }

    if (product.image_pairs) {
      product.image_pairs.forEach((item) => {
        images.push(item.icon.image_path);
      });
    }
    return (
      <ScrollView
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalScroll}
        horizontal>
        {!isProductOffer && (
          <View style={styles.imgWrapper}>
            <Pressable
              onPress={() => {
                nav.showImagePicker({});
              }}>
              <Icon name="add" style={styles.addImageIcon} />
            </Pressable>
          </View>
        )}
        {selectedImages.map((image) => (
          <View style={styles.imgWrapper} key={uniqueId('image-')}>
            <Pressable
              onPress={() => {
                nav.showGallery({
                  images: [image],
                  activeIndex: 1,
                  onRemove: () => this.handleRemoveImage(image),
                });
              }}>
              <Image style={styles.img} source={{ uri: image }} />
            </Pressable>
          </View>
        ))}
        {images.map((item, index) => (
          <View style={styles.imgWrapper} key={index}>
            <Pressable
              onPress={() => {
                nav.showGallery({
                  images: [...images],
                  activeIndex: index,
                });
              }}>
              <Image source={{ uri: item }} style={styles.img} />
            </Pressable>
          </View>
        ))}
      </ScrollView>
    );
  };

  /**
   * Renders menu item.
   *
   * @param {string} title - Item title.
   * @param {string} subTitle - Item subtitle.
   * @param {function} fn - Open function.
   *
   * @return {JSX.Element}
   */
  renderMenuItem = (title, subTitle, fn = () => {}, isProductOffer = false) => (
    <Pressable
      style={styles.menuItem}
      activeOpacity={isProductOffer ? 1 : 0}
      onPress={isProductOffer ? null : subTitle == 'Not Approved' ? null : fn}>
      <View style={styles.menuItemText}>
        <Text style={styles.menuItemTitle}>{title}</Text>
        <Text style={styles.menuItemSubTitle}>{subTitle}</Text>
      </View>
      {!isProductOffer && (
        <Icon name="keyboard-arrow-right" style={styles.btnIcon} />
      )}
    </Pressable>
  );

  /**
   * Returns field names for changing the status of the order.
   */
  getStatusActionsList = () => {
    return [
      i18n.t('Make Product Active'),
      i18n.t('Make Product Hidden'),
      i18n.t('Make Product Disabled'),
      i18n.t('Cancel'),
    ];
  };

  /**
   * Renders component.
   *
   * @return {JSX.Element}
   */
  render() {
    const { loading, product, productsActions, isUpdating } = this.props;
    const { name, description, price, validationMessage } = this.state;
    const isProductOffer = !!product.master_product_id;
    console.log('edit product product dataaaa==>>', product);
    if (loading) {
      return <Spinner visible />;
    }

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
          midHeaderTitle="Edit Product"
        />
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.container}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.scrollContainer}>
              {this.renderImages()}
              <View style={styles.formWrapper}>
                <SaldiriTextInput
                  type="text"
                  label="product name"
                  onChangeText={(e) => this.setState({ name: e })}
                  value={name}
                  placeholder="Enter product name"
                  //   show_error={true}
                />
                <HtmlEditor
                  type="text"
                  label="description"
                  onChangeHtml={(e) => this.setState({ description: e })}
                  value={description}
                  optional={true}
                  placeholder="Enter product description"
                />
                <SaldiriTextInput
                  keyboardType="number-pad"
                  type="text"
                  label="Price"
                  onChangeText={(e) => this.setState({ price: e })}
                  value={price}
                  placeholder="Enter product price"
                />
              </View>
              <Section wrapperStyle={{ padding: 0 }}>
                {this.renderMenuItem(
                  i18n.t('Status'),
                  getProductStatus(product.status).text,
                  () => {
                    this.StatusActionSheet.show();
                  },
                )}
                {this.renderMenuItem(
                  i18n.t('Features'),
                  `${i18n.t('Brands')}: ABC, ${i18n.t(
                    'Color',
                  )}: Black, ${i18n.t('Size')}: 22`,
                  () => {
                    nav.pushVendorManageFeatures(this.props.componentId);
                  },
                )}
                {this.renderMenuItem(
                  i18n.t('Pricing / Inventory'),
                  `${product.product_code}, ${i18n.t('List price')}: ${
                    product.list_price
                  }, ${i18n.t('In stock')}: ${product.amount}`,
                  () => {
                    nav.pushVendorManagePricingInventory(
                      this.props.componentId,
                    );
                  },
                )}
                {this.renderMenuItem(
                  i18n.t('Categories'),
                  product.categories.map((item) => item.category).join(', '),
                  () => {
                    nav.showVendorManageCategoriesPicker({
                      selected: product.categories,
                      parent: 0,
                      onCategoryPress: (item) => {
                        productsActions.changeProductCategory(item);
                      },
                    });
                  },
                  isProductOffer,
                )}
                {this.renderMenuItem(
                  i18n.t('Shipping properties'),
                  `${i18n.t('Weight (lbs)')}: ${product.weight}${
                    product.free_shipping ? `, ${i18n.t('Free shipping')}` : ''
                  }`,
                  () => {
                    nav.pushVendorManageShippingProperties(
                      this.props.componentId,
                      {
                        values: {
                          ...product,
                        },
                      },
                    );
                  },
                )}
              </Section>
            </ScrollView>
            <DignalButton
              validationMessage={validationMessage}
              onPress={this.handleSave}
              title="Save"
            />

            {/* <BottomActions onBtnPress={this.handleSave} /> */}

            <ActionSheet
              ref={(ref) => {
                this.ActionSheet = ref;
              }}
              options={this.getMoreActionsList()}
              cancelButtonIndex={1}
              destructiveButtonIndex={0}
              onPress={this.handleMoreActionSheet}
            />
            <ActionSheet
              ref={(ref) => {
                this.StatusActionSheet = ref;
              }}
              options={this.getStatusActionsList()}
              cancelButtonIndex={3}
              destructiveButtonIndex={2}
              onPress={this.handleStatusActionSheet}
            />
          </View>
          {isUpdating && <Spinner visible mode="modal" />}
        </SafeAreaView>
      </>
    );
  }
}

export default connect(
  (state) => ({
    loading: state.vendorManageProducts.loadingCurrent,
    isUpdating: state.vendorManageProducts.loading,
    product: state.vendorManageProducts.current,
    categories: state.vendorManageCategories.selected,
    selectedImages: state.imagePicker.selected,
  }),
  (dispatch) => ({
    productsActions: bindActionCreators(productsActions, dispatch),
    imagePickerActions: bindActionCreators(imagePickerActions, dispatch),
  }),
)(EditProduct);
