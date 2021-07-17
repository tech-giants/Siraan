import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Text, TouchableOpacity } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Icon from './Icon';

const styles = EStyleSheet.create({
  default: {
    backgroundColor: '$darkColor',
    borderRadius: 4,
    padding: 14,
  },
  defaultText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: '0.9rem',
  },
  primary: {
    backgroundColor: '$primaryColor',
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 22,
    paddingRight: 22,
    borderRadius: 4,
  },
  disabledPrimary: {
    backgroundColor: '#d4d4d4',
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 22,
    paddingRight: 22,
    borderRadius: 4,
  },
  primaryText: {
    textAlign: 'center',
    color: '$primaryColorText',
    fontSize: '1rem',
  },
  round: {
    backgroundColor: '$primaryColor',
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 12,
    paddingRight: 28,
    borderRadius: 20,
    alignItems: 'center',
    marginRight: 6,
    marginBottom: 6,
  },
  roundText: {
    textAlign: 'center',
    color: '$primaryColorText',
    fontSize: '0.8rem',
  },
  ghost: {
    backgroundColor: '#fff',
    borderWidth: 0.5,
    borderColor: '$primaryColor',
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 12,
    paddingRight: 12,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 6,
  },
  ghostText: {
    textAlign: 'center',
    color: '$primaryColor',
    fontSize: '0.8rem',
  },
  label: {
    backgroundColor: '#d9d9d9',
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 12,
    paddingRight: 12,
    borderRadius: 20,
    marginRight: 6,
    marginBottom: 6,
  },
  labelText: {
    textAlign: 'center',
    color: '#000',
    fontSize: '0.8rem',
  },
  labelActive: {
    backgroundColor: '$primaryColor',
  },
  labelActiveText: {
    color: '#fff',
  },
  clear: {},
  clearIcon: {
    fontSize: '1rem',
    color: '#fff',
    position: 'absolute',
    right: 4,
    top: 4,
  },
});

/**
 * Button.
 *
 * @reactProps {object} style - Button styles.
 * @reactProps {boolean} disabled - Button activity flag.
 * @reactProps {function} onPress - Push function.
 * @reactProps {string} type - Styles type.
 * @reactProps {boolean} clear - Close button flag.
 */
export default class extends PureComponent {
  /**
   * @ignore
   */
  static propTypes = {
    style: PropTypes.shape(),
    children: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.string,
      PropTypes.node,
    ]),
    clear: PropTypes.bool,
    type: PropTypes.string,
  };

  /**
   * @ignore
   */
  static defaultProps = {
    clear: false,
  };

  /**
   * Sets styles depending on type.
   */
  getStyleByType() {
    const { type, clear } = this.props;
    switch (type) {
      case 'labelActive':
        return {
          btn: {
            ...styles.label,
            ...styles.labelActive,
          },
          btnText: {
            ...styles.labelActiveText,
          },
        };

      case 'label':
        return {
          btn: styles.label,
          btnText: styles.labelText,
        };

      case 'ghost':
        return {
          btn: styles.ghost,
          btnText: styles.ghostText,
        };

      case 'round':
        return {
          btn: {
            ...styles.round,
            paddingRight: clear ? 28 : 12,
          },
          btnText: styles.roundText,
        };

      case 'disabledPrimary':
        return {
          btn: styles.disabledPrimary,
          btnText: styles.primaryText,
        };

      case 'primary':
        return {
          btn: styles.primary,
          btnText: styles.primaryText,
        };

      default:
        return {
          btn: styles.default,
          btnText: styles.defaultText,
        };
    }
  }

  /**
   * Renders component.
   *
   * @return {JSX.Element}
   */
  render() {
    const { style, children, clear } = this.props;
    return (
      <TouchableOpacity
        style={[this.getStyleByType().btn, style]}
        {...this.props}>
        <Text style={[this.getStyleByType().btnText]}>{children}</Text>
        {clear && <Icon name="close" style={styles.clearIcon} />}
      </TouchableOpacity>
    );
  }
}
