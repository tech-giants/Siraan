import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Pressable,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  FlatList,
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

const CirclesLayouts = (props) => {
  const {
    circleLayout,
    id,
    componentId,
    title,
    productsActions,
    location,
  } = props;
  const [isFirstLoad, setisFirstLoad] = useState(true);
  const [compLocation, setCompLocation] = useState(null);
  const [fetchID, setFetchID] = useState('');
  const [pageCont, setpageCont] = useState(1);
  useEffect(() => {
    setCompLocation(location);
    setFetchID(id);
    handleLoad();
    setisFirstLoad(false);
  }, [isFirstLoad]);
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
  const handleLoad = (sOrder = 'asc') => {
    if (compLocation === 'brands') {
      console.log(
        'brand products data location ============================================checkkk==================================>>',
        compLocation,
        fetchID,
      );
      productsActions.fetchBrandsProducts(
        (items_per_page = 5),
        (page = isFirstLoad ? 1 : circleLayout.params.page + 1),
        (variant_id = id),
        (sort_order = 'asc'),
      );
    } else {
      productsActions.fetchCirclesData(
        (items_per_page = 5),
        (page = isFirstLoad ? 1 : circleLayout.params.page + 1),
        (sort_by = id),
        (sort_order = 'asc'),
      );
    }
  };
  return (
    <>
      <SaldiriHeader
        startComponent={
          <Pressable
            onPress={() => Navigation.popToRoot(componentId)}
            style={{
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <MaterialIcons name="arrow-back" size={20} color="#16191a" />
          </Pressable>
        }
        midHeaderTitle={title}
      />

      {console.log(
        'brand products data  ================================brands=============================================>>',
        isFirstLoad,
        circleLayout.fetching,
      )}
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
            // circleLayout.hasMore ? (
            <ActivityIndicator
              style={{
                display: circleLayout.fetching ? 'flex' : 'none',
              }}
              size={30}
              color="#7c2981"
            />
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
