import React, { useState, useEffect } from 'react';
import {
  View,
  Pressable,
  Text,
  StyleSheet,
  TextInput,
  Modal,
  Image,
  ScrollView,
} from 'react-native';
import RenderHtml from 'react-native-render-html';
import SaldiriHeader from '../../components/SaldiriComponents/SaldiriHeaderBar';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Navigation } from 'react-native-navigation';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Spinner from '../../components/Spinner';
import { getProductStatus } from '../../utils';
import * as nav from '../../services/navigation';
// Action
import * as productsActions from '../../actions/vendorManage/productsActions';
import * as imagePickerActions from '../../actions/imagePickerActions';
//
const Row = (props) => {
  const { title, value, valueComponent } = props;
  return (
    <View style={styles.row}>
      <Text style={styles.title}>{title}</Text>
      {valueComponent ? (
        <View style={styles.value}>{valueComponent}</View>
      ) : (
        <Text style={styles.value}>{value}</Text>
      )}
    </View>
  );
};
//
const RenderImages = (props) => {
  let { product } = props;
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
      contentContainerStyle={{
        marginVertical: 10,
      }}
      horizontal={true}>
      {images.map((item) => {
        return (
          <>
            <Image
              style={{
                marginHorizontal: 10,
                resizeMode: 'contain',
                width: 70,
                height: 70,
                borderRadius: 5,
              }}
              source={{
                uri: item,
              }}
            />
          </>
        );
      })}
    </ScrollView>
  );
};
//
function OrderInfo(props) {
  let {
    componentId,
    productsActions,
    imagePickerActions,
    product,
    loading,
    productID,
  } = props;
  // const [product, setproduct] = useState({})
  useEffect(() => {
    imagePickerActions.clear();
    productsActions.fetchProduct(productID);
  }, []);
  console.log('productInfo product', product);
  if (loading) {
    return <Spinner visible />;
  }
  let status = getProductStatus(product.status);
  return (
    <>
      <SaldiriHeader
        startComponent={
          <Pressable
            onPress={() => Navigation.pop(componentId)}
            style={{
              minHeight: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              color: '#16191a',
            }}>
            <MaterialIcons name="arrow-back" size={25} color="#16191a" />
          </Pressable>
        }
        midHeaderTitle="Product Detail"
        endComponent={
          <Pressable
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
            onPress={() =>
              nav.VendorAddProduct(componentId, {
                edit: true,
                product,
              })
            }>
            <Text style={styles.endRightIcon}>Edit</Text>
            <FontAwesome5 name="edit" style={styles.endRightIcon} />
          </Pressable>
        }
      />
      <View style={styles.mainWrapper}>
        <RenderImages product={product} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.mainWrapper}>
          {/* product name */}
          <Row title="Product Name" value={product.product} />
          {/* product prices */}
          <View style={{ flexDirection: 'row' }}>
            <Row title="Sale Price" value={product.list_price} />
            <Row title="discount price" value={product.price} />
          </View>
          {/* product categoriey */}
          {product.categories.map((item) => {
            return <Row title="Category" value={item.category} />;
          })}

          <Row
            title="Description"
            valueComponent={
              <RenderHtml
                source={{
                  html:
                    // '<style>*{widht: 100%; background: red}</style>' +
                    product.full_description,
                }}
              />
            }
          />
          {/* stock  */}
          <Row title="Stock" value={product.amount} />
          <View style={{ ...styles.row, flexDirection: 'row' }}>
            <Text style={styles.title}>Status</Text>
            <Text
              style={{ ...styles.title, ...status.style, textAlign: 'right' }}>
              {status.text}
            </Text>
          </View>
          {product.product_features.length > 0 ? (
            <View style={styles.row}>
              <Text style={styles.title}>Features</Text>
              {product.product_features.map((item) => (
                <View style={{ ...styles.featuresRow, borderBottomWidth: 1 }}>
                  <Text style={styles.featuresRowTitle}>
                    {item.description}
                  </Text>
                  <Text style={styles.featuresRowvalue}>{item.variant}</Text>
                </View>
              ))}
            </View>
          ) : null}
        </View>
      </ScrollView>
    </>
  );
}

export default connect(
  (state) => ({
    loading: state.vendorManageProducts.loadingCurrent,
    product: state.vendorManageProducts.current,
    categories: state.vendorManageCategories.selected,
    selectedImages: state.imagePicker.selected,
  }),
  (dispatch) => ({
    productsActions: bindActionCreators(productsActions, dispatch),
    imagePickerActions: bindActionCreators(imagePickerActions, dispatch),
  }),
)(OrderInfo);

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: 'column',
    marginHorizontal: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'capitalize',
    textAlign: 'left',
    // width: '100%',
    flex: 1,
    marginVertical: 5,
  },
  value: {
    marginVertical: 5,
    flex: 1,
    fontSize: 15,
    borderColor: '#7c2981',
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
  mainWrapper: { width: '90%', alignSelf: 'center' },
  //
  endRightIcon: {
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'capitalize',
    color: '#7c2981',
    paddingHorizontal: 5,
  },

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
});
