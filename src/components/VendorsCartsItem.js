import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Icon from './Icon';

// Components
import CartProductList from './CartProductList';

// Links
import { formatPrice } from '../utils';

const styles = EStyleSheet.create({
  container: {
    marginBottom: 20,
  },
  headerWrapper: {
    padding: 10,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleWrapper: {
    flexDirection: 'row',
  },
  headerTitle: {
    fontSize: 20,
  },
});

/**
 * Renders the vendor's cart.
 *
 * @param {object} item - Cart information.
 * @param {object} auth - Auth information.
 * @param {func} handleRefresh - Refreshes cart state.
 * @param {boolean} refreshing - Set this true while waiting for new data from a refresh.
 * @param {object} cartActions - Cart actions.
 *
 * @return {JSX.Element}
 */
const VendorsCartsItem = ({
  item,
  auth,
  componentId,
  handleRefresh,
  refreshing,
  cartActions,
}) => {
  const [cartIsOpen, setCartIsOpen] = useState(true);

  /**
   * Renders header of cart.
   *
   * @param {string} title - Title of cart.
   */
  const renderHeader = (title) => (
    <TouchableOpacity
      style={styles.headerWrapper}
      onPress={() => setCartIsOpen(!cartIsOpen)}>
      <View style={styles.titleWrapper}>
        <Text style={styles.headerTitle}>{title}</Text>
        <Icon
          name={cartIsOpen ? 'arrow-drop-up' : 'arrow-drop-down'}
          style={styles.clearIcon}
        />
      </View>
      {!cartIsOpen && <Text>{formatPrice(item.total_formatted.price)}</Text>}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* FIXME: Backward compatibility */}
      {item.cart_name
        ? renderHeader(item.cart_name)
        : item.product_groups[0] && renderHeader(item.product_groups[0].name)}
      {cartIsOpen && (
        <CartProductList
          cart={item}
          products={item.products}
          auth={auth}
          componentId={componentId}
          handleRefresh={handleRefresh}
          refreshing={refreshing}
          cartActions={cartActions}
        />
      )}
    </View>
  );
};

VendorsCartsItem.propTypes = {
  item: PropTypes.shape({}),
  auth: PropTypes.shape({
    token: PropTypes.string,
  }),
  navigator: PropTypes.shape({
    push: PropTypes.func,
    dismissModal: PropTypes.func,
    setOnNavigatorEvent: PropTypes.func,
  }),
  refreshing: PropTypes.bool,
  handleRefresh: PropTypes.func,
  cartActions: PropTypes.shape({}),
};

export default VendorsCartsItem;
