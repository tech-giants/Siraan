import React, { Component } from 'react';
import { Navigation } from 'react-native-navigation';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import cloneDeep from 'lodash/cloneDeep';
import EStyleSheet from 'react-native-extended-stylesheet';
import theme from '../config/theme';
import i18n from '../utils/i18n';
import { DISCUSSION_COMMUNICATION, DISCUSSION_RATING } from '../constants';

// Import actions.
import * as productsActions from '../actions/productsActions';

// Components
import Button from '../components/Button';
import Spinner from '../components/Spinner';
import Icon from '../components/Icon';

const styles = EStyleSheet.create({
  container: {
    backgroundColor: '$screenBackgroundColor',
    padding: 14,
  },
  wrapperStyle: {
    flex: 1,
  },
});

const t = require('tcomb-form-native');

const inputStyle = cloneDeep(t.form.Form.stylesheet);
// overriding the text color
inputStyle.textbox.normal = {
  ...inputStyle.textbox.normal,
  height: 130,
  textAlign: 'left',
};
inputStyle.textbox.error = {
  ...inputStyle.textbox.error,
  height: 130,
  textAlign: 'left',
};
inputStyle.controlLabel.normal = {
  ...inputStyle.controlLabel.normal,
  textAlign: 'left',
};
inputStyle.controlLabel.error = {
  ...inputStyle.controlLabel.error,
  textAlign: 'left',
};

function selectRatingTemplate(rating) {
  const containerStyle = {
    marginTop: 8,
    marginBottom: 20,
  };
  const wrapperStyle = {
    flex: 1,
    flexDirection: 'row',
  };
  const errorTextStyle = {
    color: '#a94442',
    fontSize: 16,
  };
  const checkIcon = {
    color: theme.$ratingStarsColor,
  };

  const stars = [];
  const currentRating = Math.round(rating.value || 0);

  for (let i = 1; i <= currentRating; i += 1) {
    stars.push(
      <TouchableOpacity key={`star_${i}`} onPress={() => rating.onChange(i)}>
        <Icon name="star" style={checkIcon} />
      </TouchableOpacity>,
    );
  }

  for (let r = stars.length; r <= 4; r += 1) {
    stars.push(
      <TouchableOpacity
        key={`star_border_${r}`}
        onPress={() => rating.onChange(r + 1)}>
        <Icon name="star-border" style={checkIcon} />
      </TouchableOpacity>,
    );
  }

  return (
    <View style={containerStyle}>
      <View style={wrapperStyle}>{stars}</View>
      {rating.hasError && (
        <Text style={errorTextStyle}>
          {i18n.t('The rating field is mandatory.')}
        </Text>
      )}
    </View>
  );
}

/**
 * Renders write review screen.
 *
 * @reactProps {number or string} discussionId - Id of the discussion in which we give feedback.
 * @reactProps {string} discussionType - Discussion type.
 * @reactProps {object} activeDiscussion - Active discussion.
 * @reactProps {object} productsActions - Products actions.
 * @reactProps {object} discussion - Discussion information.
 */
export class WriteReview extends Component {
  /**
   * @ignore
   */
  static propTypes = {
    type: PropTypes.string,
    discussionId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    discussionType: PropTypes.string,
    activeDiscussion: PropTypes.shape({}),
    productsActions: PropTypes.shape({
      postDiscussion: PropTypes.func,
    }),
    discussion: PropTypes.shape({
      posts: PropTypes.arrayOf(PropTypes.shape({})),
      isNewPostSent: PropTypes.bool,
    }),
  };

  /**
   * @ignore
   */
  constructor(props) {
    super(props);
    this.isNewPostSent = false;

    Navigation.events().bindComponent(this);
  }

  /**
   * Sets header setup.
   */
  componentWillMount() {
    Navigation.mergeOptions(this.props.componentId, {
      topBar: {
        title: {
          text: i18n.t('Write a Review').toUpperCase(),
        },
      },
    });
  }

  /**
   * Closes screen if a post send.
   */
  componentWillReceiveProps() {
    if (this.isNewPostSent) {
      this.isNewPostSent = false;
      Navigation.pop(this.props.componentId);
    }
  }

  /**
   * Sends new post.
   */
  handleSend() {
    const {
      productsActions,
      activeDiscussion,
      discussionType,
      discussionId,
    } = this.props;
    const value = this.refs.form.getValue();

    if (value) {
      this.isNewPostSent = true;
      productsActions.postDiscussion({
        thread_id: activeDiscussion.thread_id,
        name: value.name,
        rating_value: value.rating,
        message: value.message,
        discussionType,
        discussionId,
      });
    }
  }

  /**
   * Renders component.
   *
   * @return {JSX.Element}
   */
  render() {
    const { discussion, activeDiscussion } = this.props;
    const Rating = t.enums(
      {
        1: '1',
        2: '2',
        3: '3',
        4: '4',
        5: '5',
      },
      '1',
    );
    const Form = t.form.Form;
    let FormFields = null;

    switch (activeDiscussion.type) {
      case DISCUSSION_COMMUNICATION:
        FormFields = t.struct({
          name: t.String,
          message: t.String,
        });
        break;

      case DISCUSSION_RATING:
        FormFields = t.struct({
          name: t.String,
          rating: Rating,
        });
        break;

      default:
        FormFields = t.struct({
          name: t.String,
          rating: Rating,
          message: t.String,
        });
        break;
    }

    const options = {
      disableOrder: true,
      fields: {
        name: {
          label: i18n.t('Your name'),
          clearButtonMode: 'while-editing',
        },
        rating: {
          template: selectRatingTemplate,
        },
        message: {
          numberOfLines: 4,
          multiline: true,
          stylesheet: inputStyle,
          label: i18n.t('Your message'),
          clearButtonMode: 'while-editing',
        },
      },
    };

    return (
      <ScrollView
        style={styles.wrapperStyle}
        contentContainerStyle={styles.container}>
        <Form ref="form" type={FormFields} options={options} />
        <Button type="primary" onPress={() => this.handleSend()}>
          {i18n.t('Send review').toUpperCase()}
        </Button>
        <Spinner visible={discussion.fetching} mode="modal" />
      </ScrollView>
    );
  }
}

export default connect(
  (state) => ({
    discussion: state.discussion,
    productDetail: state.productDetail,
  }),
  (dispatch) => ({
    productsActions: bindActionCreators(productsActions, dispatch),
  }),
)(WriteReview);
