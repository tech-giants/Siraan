import axios from 'axios';
import base64 from 'base-64';
import omit from 'lodash/omit';

import config from '../config';
import store from '../store';
import i18n from '../utils/i18n';

const headers = {
  'Content-Type': 'multipart/form-data',
};

// Config axios defaults.
const AxiosInstance = axios.create({
  baseURL: `${config.baseUrl}graphql`,
  timeout: 100000,
});

AxiosInstance.interceptors.request.use((conf) => {
  const state = store.getState();
  const newConf = { ...conf };
  headers['Storefront-Api-Access-Key'] = config.apiKey;
  headers['Cache-Control'] = 'no-cache';

  if (state.auth.token) {
    headers.Authorization = `Basic ${base64.encode(state.auth.token)}:`;
  }
  newConf.headers.common = headers;

  return newConf;
});

const gql = (query, variables) => AxiosInstance.post('', { query, variables });

export const steps = [
  i18n.t('Image'),
  i18n.t('Enter the name'),
  i18n.t('Enter the price'),
];

export const getProductDetail = (id) => {
  const QUERY = `query getProducts($id: Int!) {
      product(id: $id, get_icon: true, get_detailed: true, get_additional: true) {
        product_id
        product
        price
        full_description
        list_price
        status
        product_code
        master_product_id
        amount
        weight
        free_shipping
        product_features {
          feature_id
          value
          variant_id
          variant
          feature_type
          description
        }
        categories {
          category_id
          category
        }
        image_pairs {
          icon {
            image_path
          }
        },
        main_pair {
          icon {
            image_path
          }
        }
      }
    }
  `;
  return gql(QUERY, { id }).then((result) => result.data);
};

export const updateProduct = (id, product) => {
  const data = new FormData();
  const renderImagePairs = () => {
    const images = product.images ? [...product.images] : [];
    const params = [];
    const pairs = [];
    const variables = {};

    if (!images.length) {
      return '';
    }

    images.forEach((image, index) => {
      if (index === 1) {
        variables[index] = ['variables.main'];
        return params.push(
          `
            main_pair: {
              detailed: {
                upload: $main
              }
            }
          `,
        );
      }

      variables[index] = [`variables.image_${index}`];
      return pairs.push(`
        {
          detailed: {
            upload: $image_${index}
          }
        }
      `);
    });

    if (pairs.length) {
      params.push(`
        image_pairs: [${pairs.join(', ')}]
      `);
    }

    data.append('map', JSON.stringify(variables));

    return params.join(', ');
  };

  const renderParams = () => {
    const images = product.images ? [...product.images] : [];
    const params = [];

    if (!images.length) {
      return '';
    }

    images.forEach((image, index) => {
      if (index === 1) {
        return params.push('$main: FileUpload');
      }

      return params.push(`$image_${index}: FileUpload`);
    });
    return params.join(', ');
  };

  const QUERY = `
    mutation updateProduct(
      $id: Int!,
      $product: String,
      $category_ids: [Int],
      $price: Float,
      $list_price: Float,
      $full_description: String,
      $status: String,
      $product_code: String,
      $amount: Int,
      $free_shipping: BooleanInput,
      $weight: Float
      ${renderParams()}
    ) {
      update_product(
        id: $id,
        product: {
          product: $product
          category_ids: $category_ids
          price: $price
          list_price: $list_price
          full_description: $full_description
          amount: $amount
          product_code: $product_code
          status: $status
          weight: $weight
          free_shipping: $free_shipping
          ${renderImagePairs()}
        }
      )
    }
  `;

  const serializedData = JSON.stringify({
    query: QUERY,
    variables: {
      id,
      ...omit(product, ['images']),
      main: null,
      image_0: null,
    },
  });

  data.append('operations', serializedData);

  if (product.images && product.images.length) {
    product.images.forEach((image, index) => {
      const photo = {
        uri: image,
        type: 'image/jpeg',
        name: `${index}.jpg`,
      };
      data.append(index, photo);
    });
  }

  return AxiosInstance.post('', data).then((result) => result.data);
};

export const deleteProduct = (id) => {
  const QUERY = `
    mutation deleteProduct($id: Int!) {
      delete_product(id: $id)
    }
  `;
  return gql(QUERY, { id }).then((result) => result.data);
};

export const createProduct = (product) => {
  const data = new FormData();
  const renderImagePairs = () => {
    const images = [...product.images];
    const params = [];
    const pairs = [];
    const variables = {};

    if (!images.length) {
      return '';
    }

    images.forEach((image, index) => {
      if (index === 1) {
        variables[index] = ['variables.main'];
        return params.push(
          `
            main_pair: {
              detailed: {
                upload: $main
              }
            }
          `,
        );
      }

      variables[index] = [`variables.image_${index}`];
      return pairs.push(`
        {
          detailed: {
            upload: $image_${index}
          }
        }
      `);
    });

    if (pairs.length) {
      params.push(`
        image_pairs: [${pairs.join(', ')}]
      `);
    }

    data.append('map', JSON.stringify(variables));

    return params.join(', ');
  };

  const renderParams = () => {
    const images = [...product.images];
    const params = [];

    if (!images.length) {
      return '';
    }

    images.forEach((image, index) => {
      if (index === 1) {
        return params.push('$main: FileUpload');
      }

      return params.push(`$image_${index}: FileUpload`);
    });
    return params.join(', ');
  };

  const QUERY = `
    mutation createProduct(
      $product: String!,
      $category_ids: [Int]!,
      $price: Float!,
      $list_price: Float!,
      $full_description: String,
      $amount: Int
      ${renderParams()}
    ) {
      create_product(product: {
        product: $product
        category_ids: $category_ids
        price: $price
        list_price: $list_price
        full_description: $full_description
        amount: $amount
        ${renderImagePairs()}
      })
    }
  `;

  const serializedData = JSON.stringify({
    query: QUERY,
    variables: {
      ...omit(product, ['images']),
      main: null,
      image_0: null,
    },
  });
  data.append('operations', serializedData);

  product.images.forEach((image, index) => {
    const photo = {
      uri: image,
      type: 'image/jpeg',
      name: `${index}.jpg`,
    };
    data.append(index, photo);
  });

  return AxiosInstance.post('', data).then((result) => result.data);
};

export const getProductsList = (page = 1) => {
  const QUERY = `query getProducts($page: Int) {
    products(page: $page, items_per_page: 100) {
      product
      price
      price_formatted {
        price
      }
      status
      amount
      product_code
      product_id
      main_pair {
        icon {
          image_path
        }
      }
    }
  }`;

  return gql(QUERY, { page }).then((result) => result.data);
};

export const getCategoriesList = (parent = 0, page = 1) => {
  const QUERY = `
    query getCategories($parent: Int!, $page: Int!) {
      categories(parent_category_id: $parent, page: $page, items_per_page: 100) {
        status
        category
        category_id
        parent_id
      }
    }
  `;

  return gql(QUERY, { parent, page }).then((result) => result.data);
};

export const getOrdersList = (page = 1) => {
  const QUERY = `query getOrders($page: Int) {
    orders(page: $page, items_per_page: 100) {
      status_data {
        status
        description
        color
      }
      total_formatted {
        price
      }
      order_id
      status
      timestamp
      total
      subtotal
      subtotal_discount
      shipping_cost
      notes
      details
      firstname
      lastname
      phone
      email
      b_firstname
      b_lastname
      b_address
      b_address_2
      b_city
      b_state
      b_state_descr
      b_country
      b_country_descr
      b_zipcode
      b_phone
      s_firstname
      s_lastname
      s_address
      s_address_2
      s_city
      s_state
      s_state_descr
      s_country
      s_country_descr
      s_zipcode
      s_phone
    }
  }
`;

  return gql(QUERY, { page }).then((result) => result.data);
};

export const getOrder = (id) => {
  const QUERY = `query getOrder($id: Int!){
    order(id: $id) {
      status_data {
        status
        description
        color
      }
      total_formatted {
        price
      }
      order_id
      status
      total
      timestamp
      subtotal
      subtotal_formatted {
        price
      }
      subtotal_discount
      shipping_cost
      shipping_cost_formatted {
        price
      }
      notes
      details
      products {
        product_id
        product
        company_id
        company_name
        product_code
        product_type
        status
        list_price
        price_formatted {
          price
        }
        main_pair {
          icon {
            image_path
          }
        }
        amount
        weight
        length
        width
        height
        shipping_freight
        free_shipping
        list_qty_count
        price
        main_category
        full_description
        short_description
      }
      product_groups {
        group_id
      }
      shipping {
        shipping_id
        shipping
      }
      payment_method {
        payment
      }
      user_id
      firstname
      lastname
      phone
      email
      b_firstname
      b_lastname
      b_address
      b_address_2
      b_city
      b_state
      b_state_descr
      b_country
      b_country_descr
      b_zipcode
      b_phone
      s_firstname
      s_lastname
      s_address
      s_address_2
      s_city
      s_state
      s_state_descr
      s_country
      s_country_descr
      s_zipcode
      s_phone
    }
  }
`;

  return gql(QUERY, { id }).then((result) => result.data);
};

export const getOrderStatuses = () => {
  const QUERY = `
    query {
      order_statuses{
        status
        description
        color
      }
    }
  `;

  return gql(QUERY).then((result) => result.data);
};

export const updateVendorOrderStatus = (id, status) => {
  const QUERY = `
    mutation updateStatus(
      $id: Int!,
      $status: String!,
    ) {
      update_order(
        id: $id,
        order: {
          status: $status
        }
      )
    }
  `;
  return gql(QUERY, { id, status }).then((result) => result.data);
};
