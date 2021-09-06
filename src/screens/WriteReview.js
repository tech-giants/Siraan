import React, { Component } from 'react';
import { Navigation } from 'react-native-navigation';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  Image,
  TextInput,
  SafeAreaView,
  StatusBar
} from 'react-native';
import { Rating } from 'react-native-ratings';
import cloneDeep from 'lodash/cloneDeep';
import EStyleSheet from 'react-native-extended-stylesheet';
import theme from '../config/theme';
import i18n from '../utils/i18n';
import { DISCUSSION_COMMUNICATION, DISCUSSION_RATING } from '../constants';
import SaldiriTextInput from '../components/SaldiriComponents/SaldiriTextInput';
import { AndroidToast } from '../components/SaldiriComponents/SaldiriMessagesComponents';
import FastImage from 'react-native-fast-image'
import MyStatusBar from '../components/SaldiriComponents/SaldiriStatusBar';
// Import actions.
import * as productsActions from '../actions/productsActions';

// Components
import Button from '../components/Button';
import Spinner from '../components/Spinner';
import Icon from '../components/Icon';
import SaldiriHeader from '../components/SaldiriComponents/SaldiriHeaderBar';
// import { TextInput } from 'react-native-paper';

const styles = EStyleSheet.create({
  container: {
    padding: 18,
    width: '100%',
    height: '100%',
  },
  wrapperStyle: {
    flex: 1,
  },
  reviewImage: {
    resizeMode: 'contain',
    width: 150,
    height: 150,
  },
  btn: {
    backgroundColor: '#7c2981',
    borderRadius: 10,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    padding: 5,
    paddingHorizontal: 10,
    flexDirection: 'row',
  },
  btnText: {
    color: '#fff',
    fontSize: '1rem',
    textAlign: 'center',
    width: '100%',
    height: 30,
    fontWeight: 'bold',
    marginTop: 7,
    textTransform: 'capitalize',
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
      <Pressable key={`star_${i}`} onPress={() => rating.onChange(i)}>
        <Icon name="star" style={checkIcon} />
      </Pressable>,
    );
  }

  for (let r = stars.length; r <= 4; r += 1) {
    stars.push(
      <Pressable
        key={`star_border_${r}`}
        onPress={() => rating.onChange(r + 1)}>
        <Icon name="star-border" style={checkIcon} />
      </Pressable>,
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
    this.state = {
      name: null,
      message: null,
      ratings: null,
    };

    Navigation.events().bindComponent(this);
  }

  /**
   * Sets header setup.
   */
  componentWillMount() {
    Navigation.mergeOptions(this.props.componentId, {
      topBar: {
        visible: false,
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
    // const value = this.refs.form.getValue();

    this.isNewPostSent = true;
    productsActions.postDiscussion({
      thread_id: activeDiscussion.thread_id,
      name: this.state.name,
      rating_value: this.state.ratings,
      message: this.state.message,
      discussionType,
      discussionId,
    });
  }

  /**
   * Renders component.
   *
   * @return {JSX.Element}
   */
  render() {
    const { discussion, activeDiscussion } = this.props;
    const Ratings = t.enums(
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
          rating: Ratings,
        });
        break;

      default:
        FormFields = t.struct({
          name: t.String,
          rating: Ratings,
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
      <>
        <MyStatusBar backgroundColor="#7c2981" barStyle="light-content" />
        <SafeAreaView
          style={{
            flex: 1,
            paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
          }}>
          <SaldiriHeader midHeaderTitle="write a review" />

          <ScrollView contentContainerStyle={styles.container}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                paddingVertical: 20,
              }}>
              <FastImage
                style={styles.reviewImage}
                source={require('../assets/reviewImage.png')}
                resizeMode={FastImage.resizeMode.contain}
              />
            </View>
            <SaldiriTextInput
              // label="Please Enter your Name"
              onChangeText={(e) => this.setState({ name: e })}
              // value={this.state.loginEmail}
              placeholder=" Please Enter Your Name "
            />
            <View
              style={{
                width: '97%',
                height: 180,
                borderWidth: 0.5,
                borderColor: '#16191a',
                borderRadius: 10,
                marginLeft: 4,
              }}>
              <TextInput
                multiline={true}
                onChangeText={(e) => this.setState({ message: e })}
                style={{
                  width: '100%',
                  borderRadius: 10,
                  alignItems: 'flex-start',
                  alignContent: 'flex-start',
                  paddingHorizontal: 10,
                }}
                placeholder="Additional Comment"
              />
            </View>
            <Rating
              defaultRating={5}
              onFinishRating={(e) => this.setState({ ratings: e })}
              style={{ paddingVertical: 10 }}
            />
            <View
              style={{
                width: 280,
                height: 40,
                color: '#7c2981',
                marginTop: 10,
                alignSelf: 'center',
                broderRadius: 10,
              }}>
              <View
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Pressable
                  onPress={() => {
                    this.state.name && this.state.message && this.state.ratings
                      ? this.handleSend()
                      : AndroidToast(
                          (message = 'Please fill all required fields.'),
                        );
                  }}
                  style={styles.btn}>
                  <Text style={{ ...styles.btnText, flex: 1 }}>
                    Send Review
                  </Text>
                  {/* <MaterialIcons name="arrow-forward" size={25} color="#fff" /> */}
                </Pressable>
              </View>

              {/* <Button
              onPress={() => {
                this.state.name && this.state.message && this.state.ratings
                  ? this.handleSend()
                  : AndroidToast(
                      (message = 'Please fill all required fields.'),
                    );
              }}>
              <Text style={{ fontWeight: 'bold' }}>
                {i18n.t('Send Review')}
              </Text>
            </Button> */}
            </View>
          </ScrollView>

          {/* <Form ref="form" type={FormFields} options={options} /> */}
          {/* <Button type="primary" onPress={() => this.handleSend()}>
          {i18n.t('Send review').toUpperCase()}
        </Button> */}
          <Spinner visible={discussion.fetching} mode="modal" />
        </SafeAreaView>
      </>
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
