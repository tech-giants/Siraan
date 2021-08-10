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

const CirclesLayouts = (props) => {
  const { circleLayout, id, componentId, title } = props;
  const [isFirstLoad, setisFirstLoad] = useState(true)
  const [pageCont, setpageCont] = useState(1)
  useEffect(() => {
   handleLoad()
    setisFirstLoad(false)
  }, []);

  const handleLoad = () => {
    const { circleLayout } = props;
    console.log("circle layout============================>>>>>>>>>> ",circleLayout);
    props.productsActions.fetchCirclesData(
      items_per_page = 5,
      page = isFirstLoad?1:circleLayout.params.page+1,
      sort_by = id,
      sort_order = 'asc',
    );
    // console.log("circle"circleLayout);
    // setpageCont(pageCont + 1);
  }
  // const handler = () => {
  // };

  // const itemsList = chunk(circleLayout.items, 2).map((item, index) => (
  //   <View key={index} style={{ ...styles.chunk, backgroundColor: 'red' }}>
  //     <ProductListView
  //       key={index}
  //       product={{ item }}
  //       onPress={(product) => {
  //         nav.pushProductDetail('HOME_SCREEN', {
  //           pid: product.product_id,
  //         });
  //       }}
  //     />
  //   </View>
  // ));

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

      {circleLayout.fetching && isFirstLoad ? (
        <ActivityIndicator size={30} color="#7c2981" />
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          numColumns={2}
          onEndReached={() => handleLoad()}
          data={circleLayout.items}
          ListFooterComponent={circleLayout.fetching? <ActivityIndicator size={30} color="#7c2981" /> : <Text>No More Products</Text>}
          onEndReachedThreshold={1}
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
