import { SET_PRODUCT_REVIEWS, LIKE_DISLIKE_REVIEW_SUCCESS } from '../constants';

let productReviewsInstance = {
  reviews: [],
  count: 0,
  ratingStats: 0,
  averageRating: '',
};

const initialState = {};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_PRODUCT_REVIEWS:
      productReviewsInstance = {
        reviews: action.payload.product_reviews,
        count: action.payload.product_reviews_count,
        ratingStats: action.payload.product_reviews_rating_stats,
        averageRating: action.payload.average_rating,
      };

      return {
        ...state,
        [action.payload.product_id]: productReviewsInstance,
      };

    case LIKE_DISLIKE_REVIEW_SUCCESS:
      const { reviewAction, productReviewId, productId } = action.payload;
      const productReviews = JSON.parse(JSON.stringify(state[productId]));

      reviewAction === 'up'
        ? (productReviews.reviews[productReviewId].helpfulness.vote_up =
            productReviews.reviews[productReviewId].helpfulness.vote_up + 1)
        : (productReviews.reviews[productReviewId].helpfulness.vote_down =
            productReviews.reviews[productReviewId].helpfulness.vote_down + 1);

      return { ...state, [productId]: productReviews };

    default:
      return state;
  }
}
