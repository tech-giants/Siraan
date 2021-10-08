import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Pressable,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Navigation } from 'react-native-navigation';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as productsActions from '../actions/productsActions';
import * as nav from '../services/navigation';
import ProductListView from '../components/ProductListView';
import chunk from 'lodash/chunk';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SaldiriHeader from '../components/SaldiriComponents/SaldiriHeaderBar';
import Spinner from '../components/Spinner';
import { is } from 'date-fns/locale';
import SaldiriEmpty from '../components/SaldiriComponents/SaldiriEmpty';
import MyStatusBar from '../components/SaldiriComponents/SaldiriStatusBar';
const CirclesLayouts = (props) => {
  const {
    circleLayout,
    id,
    componentId,
    title,
    productsActions,
    location,
    firstLoad,
  } = props;
  const [isFirstLoad, setisFirstLoad] = useState(true);
  const [compLocation, setCompLocation] = useState(location ? location : null);
  const [fetchID, setFetchID] = useState(id);
  const [pageTitle, setpageTitle] = useState(title);
  const [endMessage, setEndMessage] = useState(null);
  useEffect(() => {
    // setisFirstLoad(true);
    // setCompLocation('brands');
    // setFetchID(id);
    handleLoad();
    // setisFirstLoad(false);
  }, []);
  // const handleLoad = () => {
  //   // const { circleLayout } = props;
  //   // console.log(
  //   //   'circle layout============================>>>>>>>>>> ',
  //   //   circleLayout,
  //   // );
  //   props.productsActions.fetchCirclesData(
  //     (items_per_page = 5),
  //     (page = isFirstLoad ? 1 : circleLayout.params.page + 1),
  //     (sort_by = id),
  //     (sort_order = 'asc'),
  //   );

  //   // console.log("circle"circleLayout);
  //   // setpageCont(pageCont + 1);
  // };
  const handleLoad = async (sOrder = 'asc') => {
    if (isFirstLoad || circleLayout.hasMore) {
      if (compLocation === 'brands') {
        console.log(
          'brand products data location ============================================checkkk==================================>>',
          compLocation,
          fetchID,
        );
        await productsActions.fetchBrandsProducts(
          (items_per_page = 5),
          (page = isFirstLoad ? 1 : circleLayout.params.page + 1),
          (variant_id = fetchID),
          (sort_order = 'asc'),
        );
        setisFirstLoad(false);
      } else {
        await productsActions.fetchCirclesData(
          (items_per_page = 5),
          (page = isFirstLoad ? 1 : circleLayout.params.page + 1),
          (sort_by = fetchID),
          (sort_order = 'asc'),
        );
        setisFirstLoad(false);
      }
    } else setEndMessage('no more products');
  };
  return (
    <>
      <MyStatusBar backgroundColor="#7c2981" barStyle="light-content" />
      <SafeAreaView
        style={{
          flex: 1,
          paddingTop: Platform.OS !== 'android' ? StatusBar.currentHeight : 0,
        }}>
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
          midHeaderTitle={pageTitle}
        />

        {/* {console.log(
        'brand products data  ================================brands=============================================>>',
        circleLayout.params.page,
        circleLayout.hasMore,
      )} */}
        {circleLayout.fetching && isFirstLoad ? (
          <ActivityIndicator size={30} color="#7c2981" />
        ) : !circleLayout.items[0] && !circleLayout.fetching ? (
          <SaldiriEmpty message="There are no products to show." />
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            numColumns={2}
            onEndReached={() => handleLoad()}
            data={circleLayout.items}
            ListFooterComponent={
              !endMessage ? (
                <ActivityIndicator
                  style={{
                    display:
                      circleLayout.fetching && circleLayout.hasMore
                        ? 'flex'
                        : 'none',
                  }}
                  size={30}
                  color="#7c2981"
                />
              ) : (
                <Text
                  style={{
                    width: '100%',
                    textAlign: 'center',
                    fontStyle: 'italic',
                    marginTop: 5,
                    fontSize: 11,
                  }}>
                  {endMessage}
                </Text>
              )
            }
            renderItem={(item, index) => (
              <ProductListView
                key={index}
                product={item}
                onPress={(product) => {
                  nav.pushProductDetail('HOME_SCREEN', {
                    pid: product.product_id,
                  });
                }}
              />
            )}
          />
        )}
      </SafeAreaView>
    </>
  );
};

export default connect(
  (state) => ({
    circleLayout: state.circleLayouts,
  }),
  (dispatch) => ({
    productsActions: bindActionCreators(productsActions, dispatch),
  }),
)(CirclesLayouts);

const styles = StyleSheet.create({
  chunk: {
    // flex: 1,
    flexDirection: 'row',
  },
});
