import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TextInput } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 10,
  },
  title: {
    fontSize: '0.9rem',
    textAlign: 'left',
  },
  commentText: {
    color: '#9cb0c4',
    marginTop: 3,
  },
  input: {
    fontSize: '0.9rem',
    height: 60,
    borderColor: '#EEEEEE',
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 8,
    padding: 8,
  },
});

/**
 * Renders the option to input product properties.
 *
 * @reactProps {string} value - Initial value of the input.
 * @reactProps {object} option - Contains add information.
 * @reactProps {function} onChange - Change function.
 */
export default class extends Component {
  /**
   * @ignore
   */
  static propTypes = {
    value: PropTypes.string,
    option: PropTypes.shape({}).isRequired,
    onChange: PropTypes.func,
  };

  /**
   * @ignore
   */
  static defaultProps = {
    option: {},
    value: '',
    onChange() {},
  };

  /**
   * @ignore
   */
  constructor(props) {
    super(props);

    this.state = {
      value: '',
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
   * Changes input value.
   *
   * @param {string} value -  Input value.
   */
  handleChange(value) {
    this.props.onChange(value);
  }

  /**
   * Renders a comment about what to enter in the input.
   *
   * @param {object} option - If contains comment, renders it.
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
    const { option, style } = this.props;
    const { value } = this.state;
    return (
      <View style={{ ...styles.container, ...style }}>
        <Text style={styles.title}>{option.option_name}:</Text>
        <View style={styles.optionsVariants}>
          <TextInput
            multiline
            value={value}
            style={styles.input}
            autoCapitalize="none"
            keyboardAppearance="dark"
            clearButtonMode="while-editing"
            onChangeText={(text) => this.handleChange(text)}
          />
        </View>
        {this.renderComment(option)}
      </View>
    );
  }
}
