import React from 'react';
import { View, Text, FlatList } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { get } from 'lodash';
import { filterObject } from '../utils/index';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Navigation } from 'react-native-navigation';
import { cloneDeep } from 'lodash';

// Components
import CartProductitem from './CartProductItem';
import CartFooter from './CartFooter';
import EmptyCart from './EmptyCart';
import CouponCodeSection from './CouponCodeSection';

// Links
import i18n from '../utils/i18n';
import { formatPrice } from '../utils';
import * as nav from '../services/navigation';

// Import actions
import * as stepsActions from '../actions/stepsActions';

// Styles
const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  totalWrapper: {
    marginTop: 6,
    marginLeft: 20,
    marginRight: 20,
  },
  totalText: {
    textAlign: 'right',
    marginTop: 4,
    color: '#979797',
  },
  totalDiscountText: {
    textAlign: 'right',
    marginTop: 4,
    color: '$dangerColor',
  },
});

/**
 * Renders order detail.
 *
 * @return {JSX.Element}
 */
const renderOrderDetail = (products, cart) => {
  if (!products.length) {
    return null;
  }

  const isFormattedDiscount = !!get(cart, 'subtotal_discount', '');
  const formattedDiscount = get(cart, 'subtotal_discount_formatted.price', '');
  const isIncludingDiscount = !!get(cart, 'discount', '');
  const includingDiscount = get(cart, 'discount_formatted.price', '');

  return (
    <View style={styles.totalWrapper}>
      <Text style={styles.totalText}>
        {`${i18n.t('Subtotal')}: ${get(cart, 'subtotal_formatted.price', '')}`}
      </Text>
      {isIncludingDiscount && (
        <Text style={styles.totalDiscountText}>
          {`${i18n.t('Including discount')}: -${includingDiscount}`}
        </Text>
      )}
      {isFormattedDiscount && (
        <Text style={styles.totalDiscountText}>
          {`${i18n.t('Order discount')}: -${formattedDiscount}`}
        </Text>
      )}
      <Text style={styles.totalText}>
        {`${i18n.t('Shipping')}: ${get(
          cart,
          'shipping_cost_formatted.price',
          '',
        )}`}
      </Text>
      <Text style={styles.totalText}>
        {`${i18n.t('Taxes')}: ${get(cart, 'tax_subtotal_formatted.price', '')}`}
      </Text>
    </View>
  );
};

/**
 * Renders component.
 *
 * @param {object} cart - Cart information.
 * @param {object} auth - Auth information.
 * @param {object} navigator - Navigator.
 * @param {func} handleRefresh - Refreshes cart state.
 * @param {boolean} refreshing - Set this true while waiting for new data from a refresh.
 * @param {object} cartActions - Cart actions.
 *
 * @return {JSX.Element}
 */
export const CartProductList = ({
  storeCart,
  cart,
  auth,
  componentId,
  handleRefresh,
  refreshing,
  cartActions,
  stepsActions,
  stateSteps,
}) => {
  if (!cart) {
    return <EmptyCart />;
  }

  const shippingId = cart.chosen_shipping[0];
  const coupons = Object.keys(cart.coupons);
  const newProducts = Object.keys(cart.products).map((key) => {
    const result = { ...cart.products[key] };
    result.cartId = key;
    return result;
  });

  /**
   * Moves to the next page.
   */
  const handlePlaceOrder = async (auth, cart) => {
    const newCartProducts = filterObject(
      cart.products,
      (p) => !p.extra.exclude_from_calculate,
    );
    cart.products = { ...newCartProducts };

    const checkoutFlow = stateSteps.flows.checkoutFlow;

    cart.isShippingRequired = false;

    cart.product_groups.forEach((productGroup) => {
      if (
        !productGroup.all_edp_free_shipping &&
        !productGroup.shipping_no_required &&
        Object.keys(productGroup.shippings).length
      ) {
        productGroup.isShippingRequired = true;
        cart.isShippingRequired = true;
      } else {
        productGroup.isShippingRequired = false;
      }
      if (
        !productGroup.shipping_no_required &&
        !Object.keys(productGroup.shippings).length
      ) {
        productGroup.isShippingForbidden = true;
        productGroup.isShippingRequired = true;
        cart.isShippingRequired = true;
      }
    });

    // Set the flow, filter steps and define the first step.
    const startStep = await stepsActions.setFlow('checkoutFlow', checkoutFlow, {
      newProducts,
      cart,
    });

    if (!auth.logged) {
      nav.pushCheckoutAuth(componentId, { newProducts });
    } else {
      Navigation.push(componentId, {
        component: {
          name: startStep.screenName,
          passProps: { newProducts, cart, currentStep: startStep },
        },
      });
    }
  };

  /**
   * Renders cart footer.
   *
   * @return {JSX.Element}
   */
  const renderPlaceOrder = (cart, products, auth) => {
    if (!products.length) {
      return null;
    }
    return (
      <CartFooter
        totalPrice={formatPrice(cart.total_formatted.price)}
        btnText={i18n.t('Checkout').toUpperCase()}
        onBtnPress={() => handlePlaceOrder(auth, cart)}
      />
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={newProducts}
        keyExtractor={(item, index) => `${index}`}
        renderItem={({ item }) => (
          <CartProductitem item={item} cartActions={cartActions} />
        )}
        onRefresh={handleRefresh}
        refreshing={refreshing}
        ListEmptyComponent={() => <EmptyCart />}
        ListFooterComponent={() => {
          return (
            <>
              <CouponCodeSection
                items={coupons}
                onAddPress={(value) => {
                  cartActions.addCoupon(
                    value,
                    cart.vendor_id,
                    shippingId,
                    storeCart.coupons,
                  );
                }}
                onRemovePress={(value) => {
                  let newCoupons = {};
                  if (storeCart.coupons.general) {
                    const {
                      [value]: _,
                      ...filteredCoupons
                    } = storeCart.coupons.general;
                    newCoupons.general = cloneDeep(filteredCoupons);
                  } else {
                    const {
                      [value]: _,
                      ...filteredCoupons
                    } = storeCart.coupons[cart.vendor_id];
                    newCoupons[cart.vendor_id] = cloneDeep(filteredCoupons);
                  }

                  cartActions.removeCoupon(newCoupons);
                  setTimeout(() => {
                    cartActions.recalculateTotal(
                      shippingId,
                      newCoupons,
                      cart.vendor_id,
                    );
                  }, 1400);
                }}
              />
              {renderOrderDetail(newProducts, cart)}
            </>
          );
        }}
      />
      {renderPlaceOrder(cart, newProducts, auth)}
    </View>
  );
};

export default connect(
  (state) => ({
    stateSteps: state.steps,
    storeCart: state.cart,
  }),
  (dispatch) => ({
    stepsActions: bindActionCreators(stepsActions, dispatch),
  }),
)(CartProductList);
