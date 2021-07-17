import { has, get, values } from 'lodash';
import { filterObject } from '../utils/index';
import {
  DISCUSSION_COMMUNICATION_AND_RATING,
  DISCUSSION_RATING,
} from '../constants';

const OPTION_TYPE_CHECKBOX = 'C';

export const formatOptionsToUrl = (parameterName, selectedOptions) => {
  const options = [];
  Object.keys(selectedOptions).forEach((optionId) => {
    options.push(
      `${encodeURIComponent(`${parameterName}[${optionId}]`)}=${
        selectedOptions[optionId].variant_id
      }`,
    );
  });

  return options.join('&');
};

const getProductImagesPaths = (data = {}, size = '1000x1000') => {
  const images = [];
  if (has(data, `main_pair.icons.${size}.image_path`)) {
    images.push(get(data, `main_pair.icons.${size}.image_path`));
  } else if (has(data, 'main_pair.detailed.image_path')) {
    images.push(get(data, 'main_pair.detailed.image_path'));
  }

  values(data.image_pairs).forEach((img) => {
    if (has(img, `icons.${size}.image_path`)) {
      images.push(get(img, `icons.${size}.image_path`));
    } else if (has(img, 'detailed.image_path')) {
      images.push(get(img, 'detailed.image_path'));
    } else if (has(img, 'icon.image_path')) {
      images.push(get(img, 'icon.image_path'));
    }
  });

  return images;
};

export const filterFeaturesAndVariations = (oldProductData) => {
  const newProductData = { ...oldProductData };

  if (!newProductData.variation_features_variants) {
    return oldProductData;
  }

  // Filters variants field of variation_features_variants elements.
  // If the variant doesn`t have product_id, we just delete this variant from the list.
  Object.keys(newProductData.variation_features_variants).forEach(
    (featureVariant) => {
      newProductData.variation_features_variants[
        featureVariant
      ].variants = filterObject(
        newProductData.variation_features_variants[featureVariant].variants,
        (variant) => {
          return variant.product_id;
        },
      );
    },
  );

  // Checking if the variation has options. If not, we make it a feature.
  newProductData.variation_features_variants = filterObject(
    newProductData.variation_features_variants,
    (featuresVariant) => {
      return Object.keys(featuresVariant.variants).length > 1;
    },
  );

  // We remove features, if they are in variations.
  newProductData.product_features = filterObject(
    newProductData.product_features,
    (feature) => {
      return !Object.keys(newProductData.variation_features_variants).includes(
        feature.feature_id,
      );
    },
  );

  return newProductData;
};

const convertProductOptions = (oldProductOptions) => {
  const newProductOptions = Object.keys(oldProductOptions).map((option) => {
    const newProductOption = { ...oldProductOptions[option] };
    const OPTION_TYPE_IMAGES = 'I';

    // If option has images, we change option type to 'I'
    if (
      Object.keys(
        newProductOption?.variants[Object.keys(newProductOption.variants)[0]]
          .image_pair,
      ).length
    ) {
      newProductOption.option_type = OPTION_TYPE_IMAGES;
    }

    newProductOption.selectTitle = oldProductOptions[option].option_name;
    newProductOption.selectDefaultId = oldProductOptions[option].option_id;

    newProductOption.selectVariants = Object.keys(
      oldProductOptions[option].variants,
    ).map((variantId) => {
      const selectVariant = {
        ...oldProductOptions[option].variants[variantId],
      };
      selectVariant.selectVariantName = selectVariant.variant_name;
      if (Object.keys(selectVariant.image_pair).length) {
        selectVariant.selectImgPath = selectVariant.image_pair.icon.image_path;
      }
      selectVariant.selectValue = selectVariant.variant_name;
      selectVariant.selectId = selectVariant.option_id;

      return selectVariant;
    });

    return newProductOption;
  });

  return newProductOptions;
};

const convertProductVariants = (oldProductVariants) => {
  const featureStyleValues = {
    dropdown_images: 'I',
    dropdown_labels: 'S',
    dropdown: 'S',
  };

  if (oldProductVariants) {
    const newProductVariants = Object.keys(oldProductVariants).map(
      (variant) => {
        const newProductVariant = { ...oldProductVariants[variant] };
        newProductVariant.selectTitle =
          oldProductVariants[variant].internal_name;
        newProductVariant.selectDefaultId =
          oldProductVariants[variant].variant_id;
        newProductVariant.option_type =
          featureStyleValues[oldProductVariants[variant].feature_style];

        newProductVariant.selectVariants = Object.keys(
          oldProductVariants[variant].variants,
        ).map((variantId) => {
          const selectVariant = {
            ...oldProductVariants[variant].variants[variantId],
          };
          selectVariant.selectVariantName = selectVariant.variant;
          if (selectVariant.product?.main_pair?.detailed?.image_path) {
            selectVariant.selectImgPath =
              selectVariant.product.main_pair.detailed.image_path;
          }
          selectVariant.selectValue = selectVariant.variant;
          selectVariant.selectId = selectVariant.variant_id;
          return selectVariant;
        });

        return newProductVariant;
      },
    );

    return newProductVariants;
  }

  return [];
};

const setSelectedOptions = (product) => {
  const selectedOptions = { ...product.selectedOptions };

  if (!Object.keys(selectedOptions).length) {
    product.convertedOptions.forEach((option) => {
      if (option.option_type === OPTION_TYPE_CHECKBOX) {
        selectedOptions[option.selectDefaultId] = option.selectVariants.find(
          (el) => parseInt(el.variant_id, 10) === parseInt(option.value, 10),
        );
      } else {
        selectedOptions[option.selectDefaultId] = option.selectVariants.find(
          (el) => parseInt(el.variant_id, 10) === parseInt(option.value, 10),
        );
      }
    });
  }

  return selectedOptions;
};

const setSelectedVariants = (product) => {
  const selectedVariants = { ...product.selectedVariants };

  if (!Object.keys(selectedVariants).length) {
    product.convertedVariants.forEach((variant) => {
      selectedVariants[variant.selectDefaultId] = variant.selectVariants.find(
        (el) => el.selectId === variant.selectDefaultId,
      );
    });
  }

  return selectedVariants;
};

const setRating = (product) => {
  if (
    product.discussion_type !== DISCUSSION_RATING &&
    product.discussion_type !== DISCUSSION_COMMUNICATION_AND_RATING
  ) {
    return false;
  }

  return true;
};

const isProductOffer = (product) => {
  if (parseInt(product.master_product_offers_count, 10)) {
    return true;
  }

  return false;
};

export const convertProduct = (data) => {
  let convertedProduct = { ...data };

  convertedProduct = filterFeaturesAndVariations(convertedProduct);
  convertedProduct.convertedOptions = convertProductOptions(
    convertedProduct.product_options,
  );
  convertedProduct.convertedVariants = convertProductVariants(
    convertedProduct.variation_features_variants,
  );
  convertedProduct.images = getProductImagesPaths(convertedProduct);
  convertedProduct.selectedOptions = setSelectedOptions(convertedProduct);
  convertedProduct.selectedVariants = setSelectedVariants(convertedProduct);
  convertedProduct.rating = setRating(convertedProduct);
  convertedProduct.isProductOffer = isProductOffer(convertedProduct);

  return convertedProduct;
};
