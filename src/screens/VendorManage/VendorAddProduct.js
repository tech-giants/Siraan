import React, { useState, useEffect, useMemo } from 'react';
import {
  View,
  Pressable,
  TouchableOpacity,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Image,
} from 'react-native';
import SaldiriHeader from '../../components/SaldiriComponents/SaldiriHeaderBar';
import * as nav from '../../services/navigation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Icon from '../../components/Icon';
import { Navigation } from 'react-native-navigation';
import { Button } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Checkbox } from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import { connect } from 'react-redux';
import HtmlEditor from '../../components/SaldiriComponents/HtmlEditor/HtmlEditor';
import * as productsActions from '../../actions/vendorManage/productsActions';
import * as imagePickerActions from '../../actions/imagePickerActions';
import { bindActionCreators } from 'redux';
import Spinner from '../../components/Spinner';
import { result } from 'lodash';

function VendorAddProduct(props) {
  let {
    allProducts,
    title,
    componentId,
    images,
    productsActions,
    stepsData,
    imagePickerActions,
    creatingProduct,
    edit,
    product,
  } = props;
  console.log('vendoraddproduct', props);
  const [checked, setChecked] = React.useState(false);
  const [checked1, setChecked1] = React.useState(false);
  const [checked2, setChecked2] = React.useState(false);
  const [showAddDetail, setshowAddDetail] = React.useState(false);
  const [showAddStock, setshowAddStock] = React.useState(false);
  const [contactUs, setcontactUs] = React.useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [fullDescription, setFullDescription] = useState(
    edit && product ? product.full_description : '',
  );
  const [featuresData, setFeaturesData] = useState({
    brand: {},
    color: {},
    size: {},
  });
  const [addProductData, setAddProductData] = useState({
    product: '',
    price: '',
    list_price: '',
    category_ids: [],
    full_description: '',
    amount: '',
    images: [],
  });
  const [validationMessage, setValidationMessage] = useState('');
  useMemo(() => {
    if (images.length > 0) {
      setAddProductData({ ...addProductData, images });
    }
    return;
  }, [images]);
  useMemo(() => {
    if (fullDescription) {
      setAddProductData({
        ...addProductData,
        full_description: fullDescription,
      });
    }
  }, [fullDescription]);
  const setEditProductImages = () => {
    const images = [];
    if (product.main_pair) {
      images.push(product.main_pair.icon.image_path);
    }

    if (product.image_pairs) {
      product.image_pairs.forEach((item) => {
        images.push(item.icon.image_path);
      });
    }
    imagePickerActions.toggle(images);
    return images;
  };

  useEffect(() => {
    if (images.length > 0 && !edit) {
      setAddProductData({ ...addProductData, images: [] });
      imagePickerActions.clear();
    }
    if (edit) {
      setAddProductData({
        ...addProductData,
        product: product.product,
        price: product.price.toString(),
        list_price: product.list_price.toString(),
        category_ids: [product.categories[0].category_id],
        full_description: product.full_description.toString(),
        amount: product.amount.toString(),
        images: setEditProductImages(),
      });
      // setFullDescription(product.full_description.toString());
      setSelectedCategories(product.categories);
      if (product.product_features.length > 0) {
        let featuresObj = { ...featuresData };
        product.product_features.map((item, index) => {
          // console.log('features map item', item);
          featuresObj[item.description.toLowerCase()] = item;
          // if (item.feature_id === 18)
          //   setFeaturesData({ ...featuresData, brand: item });
          // if (item.feature_id === 548)
          //   setFeaturesData({ ...featuresData, size: item });
          // if (item.feature_id === 549)
          //   setFeaturesData({ ...featuresData, color: item });
          // switch (item.feature_id) {
          //   // case 18:
          //   //   setFeaturesData({ ...featuresData, brand: item });
          //   //   break;
          //   case 548:
          //     setFeaturesData({ ...featuresData, size: item });
          //     break;
          //   case 549:
          //     setFeaturesData({ ...featuresData, color: item });
          //     break;

          //   default:
          //     break;
          // }
        });
        setFeaturesData(featuresObj);
        console.log('features map featuresObj', featuresObj);
      }
      setEditProductImages();
    }
  }, []);
  console.log('validationMessageHandler addProductData', addProductData);
  console.log('validationMessageHandler fullDescription', fullDescription);
  console.log('validationMessageHandler product', product);
  // console.log(
  //   'validationMessageHandler product.categories[0].category_id',
  //   product.categories[0].category_id,
  // );
  const validationMessageHandler = () => {
    setValidationMessage('To create product enter all fields');
    setTimeout(() => {
      setValidationMessage('');
    }, 2500);
  };
  const handleAddFeature = async (newProductID) => {
    // const arrData=[]
    const newFeatures = [
      {
        feature_id: '18',
        variant_id: featuresData.brand.variant_id
          ? featuresData.brand.variant_id
          : '',
      },
      {
        feature_id: '548',
        variant_id: featuresData.size.variant_id
          ? featuresData.size.variant_id
          : '',
      },
      {
        feature_id: '549',
        variant_id: featuresData.color.variant_id
          ? featuresData.color.variant_id
          : '',
      },
    ];

    const data = {
      product_features: newFeatures,
      product_id: newProductID,
    };
    console.log('handleAddFeatures data', data);

    await productsActions.updateFeatures(data);
    edit ? productsActions.fetchProduct(newProductID) : null;
    Navigation.pop(componentId);
  };

  const handleSavePress = async () => {
    let {
      product,
      amount,
      price,
      list_price,
      category_ids,
      full_description,
      images,
    } = addProductData;
    if (
      product &&
      amount &&
      price &&
      list_price &&
      full_description &&
      images.length > 0 &&
      category_ids.length > 0
    ) {
      if (edit) {
        handleUpdateProduct();
      } else {
        handleAddProduct();
      }
    } else {
      validationMessageHandler();
    }
  };
  const handleAddProduct = async () => {
    try {
      const newProductID = await productsActions.createProduct(addProductData);

      if (newProductID) {
        imagePickerActions.clear();
        handleAddFeature(newProductID);
        // nav.setStackVendorManageEditProduct(componentId, {
        //   productID: newProductID,
        //   showClose: true,
        // });
      }
    } catch (error) {
      console.log('add product catch api error', error);
    }
  };
  const handleUpdateProduct = () => {
    productsActions
      .updateProduct(product.product_id, addProductData)
      .then(() => handleAddFeature(product.product_id));
  };
  const hasEmptyValues = (obj) => {
    let valueArr = Object.values(obj);
    let condition = false;
    // const filterArray = (a, b) => {
    //   return a.filter((e) => {
    //     return e != b;
    //   });
    // };
    valueArr.forEach((e) => {
      let eType = typeof e;
      let isArray = eType === 'object' ? Array.isArray(e) : false;
      if (eType === 'string') {
        condition = e != '' || e != null || e != undefined;
      }
      if (eType === 'object' && isArray) {
        condition = e.length > 0;
      }
      if (eType === 'object' && !isArray) {
        let innerObjValue = Object.values(e);
        condition = innerObjValue.length > 0;
      }
    }); // console.log('hasEmptyValues condition', condition);
    return condition;
  };
  return (
    <>
      <SaldiriHeader
        startComponent={
          <Pressable
            onPress={() => Navigation.pop(componentId)}
            style={{
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              color: '#7c2981',
            }}>
            <MaterialIcons name="arrow-back" size={25} color="#7c2981" />
          </Pressable>
        }
        midHeaderTitle={`${edit ? 'Edit' : 'Add'} Product`}
      />
      <ScrollView>
        <View style={{ flexDirection: 'row' }}>
          <Pressable
            style={{ flexDirection: 'row' }}
            onPress={() => {
              nav.showImagePicker();
            }}>
            <View
              style={{
                padding: 15,
                borderColor: '#7c2981',
                borderWidth: 1,
                borderRadius: 5,
                borderStyle: 'dotted',
                marginHorizontal: 25,
                marginVertical: 20,
              }}>
              <MaterialIcons name="add-a-photo" size={35} color="#7c2981" />
            </View>
          </Pressable>
          <ScrollView horizontal={true}>
            {images.map((item, index) => {
              return (
                <Pressable
                  style={{
                    alignSelf: 'center',
                    position: 'relative',
                    width: 40,
                    height: 70,
                    marginHorizontal: 5,
                  }}
                  onPress={() => {
                    imagePickerActions.remove(item);
                  }}>
                  <Image
                    key={index}
                    style={{
                      resizeMode: 'contain',
                      borderRadius: 5,
                      width: '100%',
                      height: '100%',
                    }}
                    source={{
                      uri: item,
                    }}
                  />
                  <Entypo
                    style={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      backgroundColor: '#fff',
                      borderRadius: 50,
                    }}
                    name="circle-with-cross"
                    size={20}
                    color="#7c2981"
                  />
                </Pressable>
              );
            })}
          </ScrollView>
        </View>
        <Text style={{ fontSize: 13, textAlign: 'center', color: '#7c2981' }}>
          High quality product images will result in better sales
        </Text>
        <View style={styles.mainContainer}>
          <Text style={styles.inputsText}>Product Name</Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              width: '90%',
              alignSelf: 'center',
              marginVertical: 10,
            }}>
            <View style={{ ...styles.textInput }}>
              {/* <MaterialIcons name="search" size={25} color="#ccc" /> */}

              <TextInput
                style={{
                  width: '100%',
                  fontSize: 13,
                  borderColor: '#7c2981',
                }}
                placeholder="Product Name"
                value={addProductData.product}
                onChangeText={(e) =>
                  setAddProductData({ ...addProductData, product: e })
                }
              />
            </View>
          </View>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={styles.inputsText}>Sales Price</Text>
            <Text style={styles.discountedText}>Discounted Price</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              width: '100%',
              justifyContent: 'space-around',
              alignSelf: 'center',
              marginVertical: 10,
            }}>
            <View style={styles.textInputSalesPrice}>
              <TextInput
                style={{ fontSize: 13, width: '100%' }}
                keyboardType="numeric"
                placeholder="Sales Price"
                value={addProductData.list_price}
                onChangeText={(e) =>
                  setAddProductData({ ...addProductData, list_price: e })
                }
              />
            </View>
            <View style={styles.textInputDiscountedPrice}>
              <TextInput
                style={{ width: '100%', fontSize: 13 }}
                placeholder="Discounted Price"
                keyboardType="numeric"
                value={addProductData.price}
                onChangeText={(e) =>
                  setAddProductData({ ...addProductData, price: e })
                }
              />
            </View>
          </View>

          <Pressable
            onPress={() =>
              nav.ProductTypeCategory(componentId, {
                setSelectd: (e) => {
                  console.log('setSelected e', e);
                  setSelectedCategories(e.selectedOptions);
                  setAddProductData({
                    ...addProductData,
                    category_ids: [e.parent_id],
                  });
                },
              })
            }>
            <Text style={styles.inputsText}>Category</Text>

            <View
              style={{
                marginTop: 10,
                marginHorizontal: 20,
                justifyContent: 'space-between',
                flexDirection: 'row',
                borderWidth: 1,
                borderColor: '#7c2981',
                width: '90%',
                borderRadius: 5,
              }}>
              <Text
                style={{
                  padding: 11,
                  fontSize: 15,
                  justifyContent: 'center',
                  alignItems: 'center',
                  color: '#000',
                  maxWidth: '80%',
                }}>
                {selectedCategories.length > 0
                  ? selectedCategories.map((item) => `${item.category} > `)
                  : 'Select Category'}
              </Text>
              <AntDesign
                style={{
                  padding: 15,
                  width: '15%',
                }}
                name="down"
                size={15}
                color="#16191a"
              />
            </View>
          </Pressable>
          <Text style={styles.inputsTextDesc}>Description</Text>
          <View style={{ width: '90%', alignSelf: 'center', }}>
            <HtmlEditor
              type="text"
              // label="description"
              onChangeHtml={(e) => setFullDescription(e)}
              value={`${fullDescription}`}
              optional={true}
              placeholder="Enter product description"
            />
          </View>
          <Text style={styles.inputsTextDesc}>Add Stock</Text>
          <View
            style={{
              marginHorizontal: 20,
              marginVertical: 13,
              justifyContent: 'space-between',
              flexDirection: 'row',
              borderWidth: 1,
              borderColor: '#7c2981',
              width: '90%',
              height: 50,
              borderRadius: 5,
              alignSelf: 'center',
            }}>
            <TextInput
              style={{ width: '100%', fontSize: 13, borderColor: '#7c2981' }}
              placeholder="Add Stock"
              keyboardType="numeric"
              value={addProductData.amount}
              onChangeText={(e) =>
                setAddProductData({ ...addProductData, amount: e })
              }
            />
          </View>

          <Pressable
            onPress={() =>
              nav.pushVendorManageFeatures(componentId, {
                featuresDataCallBack: (e) => setFeaturesData(e),
                selectedData: featuresData,
              })
            }
            style={styles.featuresRow}>
            <Text
              style={{
                // marginTop: -5,
                padding: 10,
                fontSize: 18,
              }}>
              Features
            </Text>

            <AntDesign
              style={{
                padding: 13,
              }}
              name="plus"
              size={25}
              color="green"
            />
          </Pressable>
          <View style={{ ...styles.featuresRow, flexDirection: 'column' }}>
            {/* brands */}
            {featuresData.brand.variant ? (
              <View style={{ ...styles.featuresRow, borderBottomWidth: 1 }}>
                <Text style={styles.featuresRowTitle}>Brand</Text>
                <Text style={styles.featuresRowvalue}>
                  {featuresData.brand.variant}
                </Text>
              </View>
            ) : null}
            {/* colors*/}
            {featuresData.color.variant ? (
              <View style={{ ...styles.featuresRow, borderBottomWidth: 1 }}>
                <Text style={styles.featuresRowTitle}>Color</Text>
                <Text style={styles.featuresRowvalue}>
                  {featuresData.color.variant}
                </Text>
              </View>
            ) : null}

            {/* size*/}
            {featuresData.size.variant ? (
              <View style={{ ...styles.featuresRow, borderBottomWidth: 1 }}>
                <Text style={styles.featuresRowTitle}>Size</Text>
                <Text style={styles.featuresRowvalue}>
                  {featuresData.size.variant}
                </Text>
              </View>
            ) : null}
          </View>

          {validationMessage ? (
            <Text style={styles.proceedStatus}>{validationMessage}</Text>
          ) : null}
          <Pressable onPress={() => handleSavePress()}>
            <Button
              style={{
                ...styles.proceedButton,
                opacity: validationMessage ? 0.7 : 1,
              }}>
              <Text style={{ color: '#fff', fontSize: 20, fontWeight: '500' }}>
                {edit ? 'Update' : 'Submit'}
              </Text>
            </Button>
          </Pressable>
        </View>
      </ScrollView>
      <Spinner visible={creatingProduct} mode="modal" />
    </>
  );
}

export default connect(
  (state) => ({
    images: state.imagePicker.selected,
    stateSteps: state.steps,
    creatingProduct: state.vendorManageProducts.creatingProduct,
  }),
  (dispatch) => ({
    imagePickerActions: bindActionCreators(imagePickerActions, dispatch),
    productsActions: bindActionCreators(productsActions, dispatch),
  }),
)(VendorAddProduct);
const styles = StyleSheet.create({
  featuresRow: {
    flexDirection: 'row',
    fontSize: 15,
    padding: 5,
    width: '90%',
    alignSelf: 'center',
    justifyContent: 'space-between',
    borderBottomColor: '#7c2981',
    marginBottom: 5,
    marginVertical: -5,
  },
  featuresRowTitle: {
    textAlign: 'left',
    borderBottomColor: '#7c2981',
    width: '50%',
    fontWeight: 'bold',
    color: '#7c2981',
  },
  featuresRowvalue: {
    textAlign: 'right',
    width: '50%',
    color: '#7c2981',
  },
  mainContainer: {
    width: '100%',
  },

  textInput: {
    marginHorizontal: 2,
    width: '100%',
    fontSize: 13,
    height: 45,
    borderRadius: 5,
    borderWidth: 1,
    alignItems: 'center',
    flexDirection: 'row',
    borderColor: '#7c2981',
  },
  textInputSalesPrice: {
    marginLeft: 16,
    width: '44%',
    fontSize: 13,
    height: 45,
    borderRadius: 5,
    borderWidth: 1,
    alignItems: 'center',
    flexDirection: 'row',
    borderColor: '#7c2981',
  },
  textInputDiscountedPrice: {
    marginRight: 12,
    width: '44%',
    fontSize: 12,
    height: 45,
    borderRadius: 5,
    borderWidth: 1,
    alignItems: 'center',
    flexDirection: 'row',
    borderColor: '#7c2981',
  },
  proceedButton: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#7c2981',
    width: '90%',
    height: 50,
    borderRadius: 5,
    // marginTop: 25,
    marginBottom: 10,
    textAlign: 'center',
    color: 'red',
  },
  phoneCall: {
    marginHorizontal: 25,
    marginVertical: 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#7c2981',
    width: '85%',
    height: 50,
    borderRadius: 5,
  },
  buttonProductType: {
    marginVertical: 10,
    marginHorizontal: 10,
    borderColor: '#7c2981',
    borderRadius: 15,
    borderWidth: 1,
    height: 30,
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  verticalDivider: {
    height: '55%',
    padding: 1,
    backgroundColor: '#7c2981',
    marginHorizontal: -15,
  },
  proceedStatus: {
    textAlign: 'center',
    color: 'red',
    fontSize: 15,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  inputsText: {
    fontSize: 15,
    fontWeight: 'bold',
    // padding: 7,
    marginLeft: 20,
  },
  discountedText: {
    fontSize: 15,
    fontWeight: 'bold',
    width:'48%',

  },
  inputsTextDesc:{
    fontSize: 15,
    fontWeight: 'bold',
    marginLeft: 20,
    marginTop:10,
    marginBottom:5,
  },
 
});
