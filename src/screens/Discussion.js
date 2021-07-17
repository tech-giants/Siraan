import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import DiscussionList from '../components/DiscussionList';

// Import actions.
import * as productsActions from '../actions/productsActions';

import * as nav from '../services/navigation';
import i18n from '../utils/i18n';
import { iconsMap } from '../utils/navIcons';
import { Navigation } from 'react-native-navigation';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '$screenBackgroundColor',
    padding: 20,
  },
});

/**
 * Renders modal with discussions.
 *
 * @reactProps {object} navigator - Navigator.
 * @reactProps {object} productId - Product id.
 * @reactProps {object} productActions - Product actions.
 * @reactProps {object} discussion - Discussion information.
 */
export class Discussion extends Component {
  /**
   * @ignore
   */
  static propTypes = {
    productId: PropTypes.string,
    productsActions: PropTypes.shape({
      fetchDiscussion: PropTypes.func,
    }),
    discussion: PropTypes.shape({
      items: PropTypes.shape({}),
      fetching: PropTypes.bool,
    }),
  };

  constructor(props) {
    super(props);
    this.requestSent = false;

    this.state = {
      discussion: {},
    };
    Navigation.events().bindComponent(this);
  }

  /**
   * Loads icons. Sets title.
   * Removes the add button if comments are disabled.
   */
  componentWillMount() {
    const { discussion, productId } = this.props;
    let activeDiscussion = discussion.items[`p_${productId}`];

    if (!activeDiscussion) {
      activeDiscussion = {
        disable_adding: false,
        average_rating: 0,
        posts: [],
        search: {
          page: 1,
          total_items: 0,
        },
      };
    }

    this.setState({
      discussion: activeDiscussion,
    });

    const buttons = {
      rightButtons: [
        {
          id: 'close',
          icon: iconsMap.close,
        },
        {
          id: 'newComment',
          icon: iconsMap.create,
        },
      ],
    };
    // Remove add comment btn.
    if (activeDiscussion.disable_adding) {
      buttons.rightButtons = [];
    }

    Navigation.mergeOptions(this.props.componentId, {
      topBar: {
        title: {
          text: i18n.t('Comments & Reviews').toUpperCase(),
        },
        ...buttons,
      },
    });
  }

  /**
   * Updates active discussion.
   */
  componentWillReceiveProps(nextProps) {
    const { productId } = this.props;
    const activeDiscussion = nextProps.discussion.items[`p_${productId}`];
    this.setState(
      {
        discussion: activeDiscussion,
      },
      () => {
        this.requestSent = false;
      },
    );
  }

  navigationButtonPressed({ buttonId }) {
    const { discussion } = this.state;

    if (buttonId === 'close') {
      Navigation.dismissModal(this.props.componentId);
    } else if (buttonId === 'newComment') {
      nav.pushWriteReview(this.props.componentId, {
        activeDiscussion: discussion,
      });
    }
  }

  /**
   * Load more discussions.
   */
  handleLoadMore() {
    const { productId } = this.props;
    const { discussion } = this.state;
    const hasMore = discussion.search.total_items != discussion.posts.length;

    if (hasMore && !this.requestSent && !this.props.discussion.fetching) {
      this.requestSent = true;
      this.props.productsActions.fetchDiscussion(productId, {
        page: discussion.search.page + 1,
      });
    }
  }

  /**
   * Renders component
   *
   * @return {JSX.Element}
   */
  render() {
    const { discussion } = this.state;
    return (
      <View style={styles.container}>
        <DiscussionList
          infinite
          type={discussion.type}
          items={discussion.posts}
          fetching={this.props.discussion.fetching}
          onEndReached={() => this.handleLoadMore()}
        />
      </View>
    );
  }
}

export default connect(
  (state) => ({
    discussion: state.discussion,
  }),
  (dispatch) => ({
    productsActions: bindActionCreators(productsActions, dispatch),
  }),
)(Discussion);
