import React from 'react';
import PropTypes from 'prop-types';

import { View, Text, Image, TouchableOpacity } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

// Components
import Section from './Section';
import i18n from '../utils/i18n';

const styles = EStyleSheet.create({
  logoWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    height: 100,
    width: '50%',
    resizeMode: 'contain',
  },
  vendorWrapper: {
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingLeft: 14,
    paddingRight: 14,
    paddingTop: 12,
    paddingBottom: 12,
  },
  vendorTotalItemsText: {
    color: 'gray',
  },
  vendorDetailBtnText: {
    color: '$primaryColor',
    fontSize: '0.9rem',
  },
});

/**
 * Renders vendor information.
 *
 * @param {function} onViewDetailPress - Opens vendor detail page.
 * @param {string} logoUrl - Logo url.
 * @param {number} productsCount - Number of vendor products.
 *
 * @return {JSX.Element}
 */
const VendorInfo = ({ onViewDetailPress, logoUrl, productsCount }) => (
  <Section containerStyle={{ paddingTop: 0 }} wrapperStyle={{ padding: 0 }}>
    <View style={styles.logoWrapper}>
      <Image source={{ uri: logoUrl }} style={styles.logo} />
    </View>
    <View style={styles.vendorWrapper}>
      <Text style={styles.vendorTotalItemsText}>
        {i18n.t('Products found: {{count}}', { count: productsCount })}
      </Text>
      <TouchableOpacity onPress={() => onViewDetailPress()}>
        <Text style={styles.vendorDetailBtnText}>{i18n.t('View Detail')}</Text>
      </TouchableOpacity>
    </View>
  </Section>
);

/**
 * @ignore
 */
VendorInfo.propTypes = {
  productsCount: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  logoUrl: PropTypes.string,
  onViewDetailPress: PropTypes.func,
};

export default VendorInfo;
