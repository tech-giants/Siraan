import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import theme from '../config/theme';

const styles = EStyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 10,
  },
  titleAndTitleSubWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: '0.9rem',
    textAlign: 'left',
  },
  titleSub: {
    fontSize: '0.9rem',
    marginRight: 10,
  },
  commentText: {
    color: '#9cb0c4',
    marginTop: 3,
    textAlign: 'left',
  },
  optionsVariants: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'baseline',
    flexWrap: 'wrap',
    marginTop: 15,
  },
  optionsItem: {
    padding: 8,
    borderWidth: 1,
    borderColor: theme.$mediumGrayColor,
    borderRadius: 5,
    marginBottom: 6,
    marginRight: 6,
  },
  optionsItemBtnText: {
    color: theme.$mediumGrayColor,
    fontSize: '0.8rem',
  },
  optionsItemBtnTextActive: {
    color: '#ff5319',
  },
  optionsItemActive: {
    borderColor: '#ff5319',
  },
  optionImage: {
    height: 70,
    width: 70,
  },
});

/**
 * Renders the option to select a product property.
 *
 * @reactProps {object} value - Information about the initial value of the select.
 * @reactProps {object} option - Information about the option and its variants.
 * @reactProps {boolean} multiply - You can choose several variants or not.
 * @reactProps {function} onChange - Change function.
 */
export default class extends Component {
  /**
   * @ignore
   */
  static propTypes = {
    value: PropTypes.shape({}),
    option: PropTypes.shape({}).isRequired,
    multiply: PropTypes.bool,
    onChange: PropTypes.func,
  };

  static defaultProps = {
    option: {},
    value: null,
    multiply: false,
    onChange() {},
  };

  constructor(props) {
    super(props);

    this.state = {
      value: null,
    };
  }

  /**
   * Sets initial value to state.
   */
  componentDidMount() {
    const { value } = this.props;
    this.setState({ value });
  }

  /**
   * Re-renders the component if new props are received.
   */
  componentWillReceiveProps(nextProps) {
    const { value } = nextProps;
    this.setState({ value });
  }

  /**
   * Changes option value.
   *
   * @param {object} value -  Selected value.
   */
  handleChange(value) {
    this.props.onChange(value);
  }

  /**
   * Renders comment.
   *
   * @param {object} option - Comment information.
   *
   * @return {JSX.Element}
   */
  renderComment = (option) => {
    if (option.comment) {
      return <Text style={styles.commentText}>{option.comment}</Text>;
    }
    return null;
  };

  /**
   * Renders component
   *
   * @return {JSX.Element}
   */
  render() {
    const { option } = this.props;
    const { value } = this.state;

    if (!value || !option) {
      return null;
    }

    const optionsVariantsList = option.selectVariants.map((v) => {
      const active = value.variant_id === v.variant_id;
      const imgPath = v.selectImgPath;

      const content = (
        <Image source={{ uri: imgPath }} style={styles.optionImage} />
      );

      return (
        <TouchableOpacity
          key={v.variant_id}
          style={[styles.optionsItem, active && styles.optionsItemActive]}
          onPress={() => this.handleChange(v)}>
          {content}
        </TouchableOpacity>
      );
    });

    return (
      <View style={styles.container}>
        <View style={styles.titleAndTitleSubWrapper}>
          <Text style={styles.title}>{option.selectTitle}</Text>
          <Text style={styles.titleSub}>{value.selectVariantName}</Text>
        </View>
        <View style={styles.optionsVariants}>{optionsVariantsList}</View>
        {this.renderComment(option)}
      </View>
    );
  }
}
