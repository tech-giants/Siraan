import React from 'react';
import { bindActionCreators } from 'redux';
import { connect, RootStateOrAny } from 'react-redux';
import { View, Text, TouchableOpacity } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { format } from 'date-fns';
import { capitalizeFirstLetter } from '../utils/index';

// Import actions.
import * as productsActions from '../actions/productsActions';

// Components
import StarsRating from './StarsRating';
import Icon from './Icon';
import i18n from '../utils/i18n';

const RATING_STAR_SIZE = 14;

const styles = EStyleSheet.create({
  reviewContainer: {
    marginBottom: 20,
  },
  reviewNameStarsDateWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  reviewNameStarsWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reviewName: {
    fontSize: '0.9rem',
    marginRight: 5,
  },
  reviewDate: {
    color: '#8F8F8F',
  },
  reviewCountry: {
    color: '#8F8F8F',
  },
  reviewCommentTitle: {
    fontSize: '0.9rem',
    marginBottom: 10,
    fontWeight: '300',
  },
  reviewCommentText: {
    fontSize: 14,
    marginBottom: 20,
    color: '#8F8F8F',
  },
  reviewLikesWrapper: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    justifyContent: 'space-between',
    marginLeft: 'auto',
    marginRight: 5,
  },
  voteUpWrapper: {
    flexDirection: 'row',
    fontSize: 14,
    alignItems: 'center',
    marginRight: 20,
  },
  voteDownWrapper: {
    flexDirection: 'row',
    fontSize: 14,
    alignItems: 'center',
  },
  likeDislikeIcons: {
    fontSize: 25,
    color: '#d4d4d4',
    marginRight: 5,
  },
  votesCountText: {
    color: '#8F8F8F',
  },
});

interface Review {
  user_data: {
    name: string;
  };
  product_review_timestamp: number;
  rating_value: string;
  country: string;
  message: {
    [key: string]: string;
  };
  helpfulness: {
    vote_up: number;
    vote_down: number;
  };
  product_review_id: number;
}

interface ProductReviewsProps {
  review: Review;
  productId: number;
  productsActions: {
    [key: string]: Function;
  };
  settings: {
    dateFormat: string;
    productReviewsAddon: {
      isEnabled: boolean;
      isCommentOnly: boolean;
    };
  };
}

export const ProductReview: React.FC<ProductReviewsProps> = ({
  review,
  productId,
  productsActions,
  settings,
}) => {
  const reviewDate = format(
    new Date(review.product_review_timestamp * 1000),
    settings.dateFormat || 'MM/dd/yyyy',
  );

  const likeDislikeHandler = async (value: string, productReviewId: number) => {
    await productsActions.likeDislikeReview({
      action: value,
      product_review_id: productReviewId,
      productId: productId,
    });
  };

  return (
    <View style={styles.reviewContainer}>
      <View style={styles.reviewNameStarsDateWrapper}>
        <View style={styles.reviewNameStarsWrapper}>
          <Text style={styles.reviewName}>
            {review.user_data?.name || i18n.t('Anonymous')}
          </Text>
          <StarsRating
            size={RATING_STAR_SIZE}
            isRatingSelectionDisabled
            value={Number(review.rating_value)}
          />
        </View>
        <Text style={styles.reviewDate}>{reviewDate}</Text>
      </View>
      <Text style={styles.reviewCountry}>{review.country}</Text>
      {Object.keys(review.message).map((el: string, index: number) => {
        if (!review.message[el]) {
          return null;
        }

        return (
          <View key={index}>
            {!settings.productReviewsAddon?.isCommentOnly && (
              <Text style={styles.reviewCommentTitle}>
                {i18n.t(capitalizeFirstLetter(el))}
              </Text>
            )}
            <Text style={styles.reviewCommentText}>{review.message[el]}</Text>
          </View>
        );
      })}
      {false && ( // TODO likes/dislikes for product reviews
        <View style={styles.reviewLikesWrapper}>
          <TouchableOpacity
            style={styles.voteUpWrapper}
            onPress={() => likeDislikeHandler('up', review.product_review_id)}>
            <Icon name={'thumb-up'} style={styles.likeDislikeIcons} />
            <Text style={styles.votesCountText}>
              {review.helpfulness.vote_up}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.voteDownWrapper}
            onPress={() =>
              likeDislikeHandler('down', review.product_review_id)
            }>
            <Icon name={'thumb-down'} style={styles.likeDislikeIcons} />
            <Text style={styles.votesCountText}>
              {review.helpfulness.vote_down}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default connect(
  (state: RootStateOrAny) => ({
    settings: state.settings,
  }),
  (dispatch) => ({
    productsActions: bindActionCreators(productsActions, dispatch),
  }),
)(ProductReview);
