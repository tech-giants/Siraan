import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  sortBy,
  uniqBy,
  groupBy,
  throttle,
  round,
  values,
  take,
  isEqual,
} from 'lodash';
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import ActionSheet from 'react-native-actionsheet';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import RBSheet from 'react-native-raw-bottom-sheet';
import Button from './Button';
import i18n from '../utils/i18n';
import Icon from './Icon';

const styles = EStyleSheet.create({
  wrapper: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#F0F0F0',
    padding: 8,
    paddingLeft: 14,
    paddingRight: 14,
    marginBottom: 10,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btn: {
    justifyContent: 'center',
    paddingLeft: 6,
    paddingRight: 6,
    paddingTop: 6,
    paddingBottom: 6,
  },
  btnFilter: {
    justifyContent: 'center',
    paddingLeft: 6,
    paddingRight: 6,
    paddingTop: 6,
    paddingBottom: 6,
    marginRight: 20,
  },
  text: {
    color: '$primaryColor',
    fontSize: '0.9rem',
  },
  filterText: {
    color: '#8e8e8e',
    fontSize: '0.9rem',
  },
  filterIcon: {
    fontSize: '1.2rem',
    color: '#8e8e8e',
    position: 'absolute',
    top: 4,
    left: -20,
  },
  badge: {
    backgroundColor: '#0093ff',
    minWidth: 20,
    height: 20,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    right: -16,
  },
  badgeText: {
    color: '#fff',
  },
  filterHeaderSection: {
    borderBottomWidth: 0.5,
    borderColor: '#f1f1f1',
    padding: 10,
    paddingTop: 16,
    paddingBottom: 10,
    flexDirection: 'row',
    width: '100%',
  },
  scrollWrapper: {
    paddingTop: 4,
    marginLeft: 20,
  },
  filterFooterSection: {
    borderTopWidth: 0.5,
    borderColor: '#f1f1f1',
    padding: 40,
    paddingTop: 16,
    paddingBottom: 14,
  },
  scrollWrapperContent: {
    minHeight: 310,
  },
  pickerWrapper: {
    padding: 20,
    borderTopWidth: 0.5,
    borderColor: '#f1f1f1',
  },
  pickerOpenBtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  pickerContent: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  pickerSlider: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    marginTop: 20,
    marginLeft: 14,
  },
  pickerOpenBtnText: {
    fontSize: 20,
    color: '#000',
  },
  priceRangeMarkerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    top: 54,
    left: 24,
    right: 24,
    width: '100%',
  },
  priceRangeMarkerText: {
    fontSize: '0.7rem',
  },
  colorItemsContainer: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  colorItem: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
    marginRight: 14,
    marginBottom: 8,
  },
  colorItemActive: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  colorItemActiveIcon: {
    color: '#fff',
  },
});

const CANCEL_INDEX = 5;
const DESTRUCTIVE_INDEX = 5;

/**
 * Block with product filters.
 *
 * @reactProps {function} onChange - Selection of sorting type.
 * @reactProps {function} onChangeFilter - Applies the selected filters.
 * @reactProps {object} sortParams - Sorting options.
 * @reactProps {object[]} filters - Filtering options.
 */
class SortProducts extends Component {
  /**
   * @ignore
   */
  static propTypes = {
    onChange: PropTypes.func,
    onChangeFilter: PropTypes.func,
    sortParams: PropTypes.shape({
      sort_by: PropTypes.string,
      sort_order: PropTypes.string,
    }),
    filters: PropTypes.arrayOf(PropTypes.shape({})),
  };

  state = {
    openIDs: [],
    selectedFilters: [],
  };

  handlePriceRangeChange = throttle((filter, [min, max]) => {
    const { selectedFilters } = this.state;
    const selected = selectedFilters.filter(
      (item) => item.filter_id !== filter.filter_id,
    );

    this.setState({
      selectedFilters: [
        ...selected,
        {
          ...filter,
          min: round(min, 2),
          max: round(max, 2),
        },
      ],
    });
  }, 100);

  componentDidMount() {
    this.handleCalculateActiveFilters();
  }

  /**
   * Shows a window with sorting options.
   */
  showActionSheet = () => {
    this.ActionSheet.show();
  };

  /**
   * Sets the selected filters in the state.
   */
  handleCalculateActiveFilters = () => {
    const { filters } = this.props;
    const selected = filters.filter(
      (item) => item.selected_variants !== undefined || item.selected_range,
    );
    const selectedFilters = [];
    selected.forEach((filter) => {
      if (filter.selected_variants) {
        if (
          filter.filter_style === 'checkbox' ||
          filter.filter_style === 'color'
        ) {
          values(filter.selected_variants).forEach((variantItem) => {
            selectedFilters.push({
              ...filter,
              ...variantItem,
            });
          });
        }
      }

      // Slider
      if (filter.filter_style === 'slider') {
        selectedFilters.push({
          ...filter,
          min: Math.ceil(filter.left),
          max: Math.ceil(filter.right),
        });
      }
    });

    this.setState({ selectedFilters });
  };

  getItemList = () => [
    {
      name: i18n.t('Sorting: Newest items first'),
      params: {
        sort_by: 'timestamp',
        sort_order: 'desc',
      },
    },
    {
      name: i18n.t('Sorting: A to Z'),
      params: {
        sort_by: 'product',
        sort_order: 'asc',
      },
    },
    {
      name: i18n.t('Sorting: Z to A'),
      params: {
        sort_by: 'product',
        sort_order: 'desc',
      },
    },
    {
      name: i18n.t('Sorting: Lowest prices first'),
      params: {
        sort_by: 'price',
        sort_order: 'asc',
      },
    },
    {
      name: i18n.t('Sorting: Highest prices first'),
      params: {
        sort_by: 'price',
        sort_order: 'desc',
      },
    },
    {
      name: i18n.t('Sorting: Most popular first'),
      params: {
        sort_by: 'popularity',
        sort_order: 'desc',
      },
    },
    {
      name: i18n.t('Cancel'),
      params: {
        sort_by: '',
        sort_order: '',
      },
    },
  ];

  /**
   * Selection of sorting type.
   *
   * @param {string} itemText - Sorting type.
   */
  handleChange = (itemText) => {
    const { onChange } = this.props;
    const items = this.getItemList().map((item) => item.name);
    const foundIndex = items.findIndex((item) => item === itemText);

    if (foundIndex === CANCEL_INDEX + 1) {
      return;
    }

    onChange(this.getItemList()[foundIndex].params, foundIndex);
  };

  /**
   * Applies the selected filters.
   */
  handleChangeFilter = () => {
    const { onChangeFilter } = this.props;
    const { selectedFilters } = this.state;
    const groupedFilters = groupBy(selectedFilters, 'filter_id');
    const filtersIds = [];

    Object.keys(groupedFilters).forEach((key) => {
      const filterItems = groupedFilters[key];
      const { filter_id, filter_style, field_type } = filterItems[0];

      if (filter_style === 'checkbox' || filter_style === 'color') {
        filtersIds.push(
          `${filter_id}-${filterItems
            .map((item) => item.variant_id)
            .join('-')}`,
        );
      }

      // Slider
      if (filter_style === 'slider') {
        const active = filterItems[0];
        if (field_type === 'P') {
          filtersIds.push(
            `${filter_id}-${round(active.min, 2)}-${round(active.max, 2)}-${
              active.extra
            }`,
          );
        } else {
          filtersIds.push(
            `${filter_id}-${round(active.min, 2)}-${round(active.max, 2)}`,
          );
        }
      }
    });

    onChangeFilter(filtersIds.join('_'));
  };

  /**
   * Opens, closes the filter section.
   *
   * @param {string} id - Filter section id.
   */
  togglePicker = (id) => {
    const { openIDs } = this.state;

    if (openIDs.some((item) => item === id)) {
      this.setState({
        openIDs: openIDs.filter((item) => item !== id),
      });
      return;
    }
    this.setState({
      openIDs: [...openIDs, id],
    });
  };

  /**
   * Resets all filters.
   */
  clearAllFilter = () => {
    this.setState({ selectedFilters: [] });
  };

  /**
   * Removes a value from the filter.
   *
   * @param {string} id - Value id.
   */
  removeByFilter(id) {
    const { selectedFilters } = this.state;
    this.setState({
      selectedFilters: selectedFilters.filter((item) => item.filter_id !== id),
    });
  }

  /**
   * Adds or removes a value from the filter.
   *
   * @param {object} filter - Selected filter.
   * @param {object} variant - Selected option from filter.
   */
  toggleVariant(filter, variant) {
    const { selectedFilters } = this.state;
    const selectedFilterItem = {
      ...filter,
      ...variant,
    };

    if (filter.filter_style === 'checkbox' || filter.filter_style === 'color') {
      if (
        selectedFilters.some(
          (item) =>
            item.variant_id === selectedFilterItem.variant_id &&
            selectedFilterItem.filter_id === item.filter_id,
        )
      ) {
        this.setState({
          selectedFilters: selectedFilters.filter(
            (item) => !isEqual(item, selectedFilterItem),
          ),
        });
        return;
      }

      this.setState({
        selectedFilters: [...selectedFilters, selectedFilterItem],
      });
    }
  }

  /**
   * Renders a filter section with a picker type.
   *
   * @param {object} item - Filter section information.
   *
   * @return {JSX.Element}
   */
  renderPicker = (item) => {
    const { filter_id, filter } = item;
    const { openIDs, selectedFilters } = this.state;
    const isOpen = openIDs.some((item) => item === filter_id);
    let variants = [...item.variants];
    const VISIBLE_COUNT = 5;

    const totalCount = variants.length;
    const isHiddable = variants.length > VISIBLE_COUNT;

    if (!isOpen && isHiddable) {
      variants = take(variants, VISIBLE_COUNT);
    }

    const IconToggle = isOpen ? (
      <Icon name="arrow-drop-up" />
    ) : (
      <Icon name="arrow-drop-down" />
    );
    return (
      <View style={styles.pickerWrapper} key={filter_id}>
        <TouchableOpacity
          style={styles.pickerOpenBtn}
          onPress={() => this.togglePicker(filter_id)}
          disabled={!isHiddable}>
          <Text style={styles.pickerOpenBtnText}>
            {`${filter} (${totalCount})`}
          </Text>
          {isHiddable && IconToggle}
        </TouchableOpacity>
        <View style={styles.pickerContent}>
          {sortBy(variants, ['position']).map((variant) => {
            const isSelected = selectedFilters.some(
              (selectedFilterItem) =>
                selectedFilterItem.variant_id === variant.variant_id &&
                item.filter_id === selectedFilterItem.filter_id,
            );
            return (
              <Button
                type={isSelected ? 'round' : 'label'}
                key={variant.variant_id}
                onPress={() => this.toggleVariant(item, variant)}>
                {variant.variant}
              </Button>
            );
          })}
        </View>
      </View>
    );
  };

  /**
   * Renders a filter header with information about the selected options.
   *
   * @return {JSX.Element}
   */
  renderHader = () => {
    const { selectedFilters } = this.state;
    const selectedItems = uniqBy(selectedFilters, 'filter_id');
    return (
      <View style={styles.filterHeaderSection}>
        <TouchableOpacity
          onPress={() => {
            this.RBSheet.close();
            this.setState(
              { selectedFilters: [] },
              this.handleCalculateActiveFilters,
            );
          }}>
          <Icon name="close" />
        </TouchableOpacity>
        <ScrollView horizontal contentContainerStyle={styles.scrollWrapper}>
          <Button type="ghost" onPress={this.clearAllFilter}>
            {i18n.t('Clear all')}
          </Button>
          {selectedItems.map((item) => (
            <Button
              clear
              key={item.filter_id}
              type="round"
              onPress={() => this.removeByFilter(item.filter_id)}>
              {item.filter}
            </Button>
          ))}
        </ScrollView>
      </View>
    );
  };

  /**
   * Renders a section of a filter of type range.
   *
   * @param {object} item - Filter section information.
   *
   * @return {JSX.Element}
   */
  renderRange = (item) => {
    const { feature_id, filter, min, max, suffix, prefix } = item;

    const MultiSliderWidth = Math.round(Dimensions.get('window').width) - 68;
    const { selectedFilters } = this.state;
    const activeFilter = selectedFilters.find(
      (selectedItem) => selectedItem.filter_id === item.filter_id,
    );

    const selectedMin = activeFilter ? activeFilter.min : Math.ceil(min);
    const selectedMax = activeFilter ? activeFilter.max : Math.ceil(max);

    if (Math.ceil(min) === Math.ceil(max)) {
      return null;
    }

    return (
      <View style={styles.pickerWrapper} key={feature_id}>
        <View style={styles.pickerOpenBtn}>
          <Text style={styles.pickerOpenBtnText}>
            {`${filter}: ${prefix || ''}${selectedMin}${suffix || ''} - ${
              prefix || ''
            }${selectedMax}${suffix || ''}`}
          </Text>
        </View>
        <View style={styles.priceRangeMarkerContainer}>
          <Text style={styles.priceRangeMarkerText}>{`${
            prefix || ''
          }${Math.ceil(min)}${suffix || ''}`}</Text>
          <Text style={styles.priceRangeMarkerText}>{`${
            prefix || ''
          }${Math.ceil(max)}${suffix || ''}`}</Text>
        </View>
        <View style={styles.pickerSlider}>
          <MultiSlider
            values={[selectedMin, selectedMax]}
            min={Math.ceil(min)}
            max={Math.ceil(max)}
            sliderLength={MultiSliderWidth}
            onValuesChange={(values) =>
              this.handlePriceRangeChange(item, values)
            }
          />
        </View>
      </View>
    );
  };

  /**
   * Renders a section of a filter of type pick color.
   *
   * @param {object} item - Filter section information.
   *
   * @return {JSX.Element}
   */
  renderColorPicker = (item) => {
    const { feature_id, filter, selected_variants } = item;
    const { selectedFilters } = this.state;
    let variants = [...item.variants];

    if (selected_variants) {
      variants = [...Object.values(selected_variants), ...variants];
    }

    return (
      <View style={styles.pickerWrapper} key={feature_id}>
        <View style={styles.pickerOpenBtn}>
          <Text style={styles.pickerOpenBtnText}>{filter}</Text>
        </View>
        <View style={styles.colorItemsContainer}>
          {variants.map((variant) => {
            const { color, variant_id } = variant;
            const isSelected = selectedFilters.some(
              (item) => item.variant_id === variant.variant_id,
            );
            let itemStyles = {
              backgroundColor: color,
            };

            if (isSelected) {
              itemStyles = {
                ...itemStyles,
                ...styles.colorItemActive,
              };
            }

            return (
              <TouchableOpacity
                key={variant_id}
                onPress={() => this.toggleVariant(item, variant)}>
                <View style={[styles.colorItem, itemStyles]}>
                  {isSelected && <Icon name="check" borderColor="#fff" />}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  };

  /**
   * Renders footer.
   *
   * @return {JSX.Element}
   */
  renderFooter = () => (
    <View style={styles.filterFooterSection}>
      <Button type="primary" onPress={this.handleChangeFilter}>
        {i18n.t('Apply')}
      </Button>
    </View>
  );

  /**
   * Renders all sections of the filter.
   *
   * @return {JSX.Element}
   */
  renderFilters = () => {
    const { filters } = this.props;

    return (
      <React.Fragment>
        {this.renderHader()}
        <ScrollView contentContainerStyle={styles.scrollWrapperContent}>
          {filters.map((item) => {
            if (item.filter_style === 'checkbox') {
              return this.renderPicker(item);
            }

            if (item.filter_style === 'slider') {
              return this.renderRange(item);
            }

            if (item.filter_style === 'color') {
              return this.renderColorPicker(item);
            }

            return null;
          })}
        </ScrollView>
        {this.renderFooter()}
      </React.Fragment>
    );
  };

  /**
   * Renders component
   *
   * @return {JSX.Element}
   */
  render() {
    const { sortParams, filters } = this.props;
    const { selectedFilters } = this.state;
    const activeIndex = this.getItemList().findIndex(
      (item) =>
        item.params.sort_by === sortParams.sort_by &&
        item.params.sort_order === sortParams.sort_order,
    );

    const items = this.getItemList().map((item) => item.name);
    const filteredItems = items.filter((item) => item !== items[activeIndex]);
    const RBSheetHeight = Math.round(Dimensions.get('window').height) - 140;
    const activeFiltersCount = selectedFilters.length;

    return (
      <View style={styles.wrapper}>
        <TouchableOpacity style={styles.btn} onPress={this.showActionSheet}>
          <Text style={styles.text} numberOfLines={2}>
            {items[activeIndex]}
          </Text>
        </TouchableOpacity>

        {filters.length !== 0 && (
          <TouchableOpacity
            style={styles.btnFilter}
            onPress={() => {
              this.RBSheet.open();
            }}>
            <Icon name="filter-list" style={styles.filterIcon} />
            <Text style={styles.text} numberOfLines={2}>
              {i18n.t('Filter')}
            </Text>
            {activeFiltersCount !== 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{activeFiltersCount}</Text>
              </View>
            )}
          </TouchableOpacity>
        )}

        <ActionSheet
          ref={(ref) => {
            this.ActionSheet = ref;
          }}
          options={filteredItems}
          cancelButtonIndex={DESTRUCTIVE_INDEX}
          destructiveButtonIndex={CANCEL_INDEX}
          onPress={(index) => this.handleChange(filteredItems[index])}
        />
        <RBSheet
          ref={(ref) => {
            this.RBSheet = ref;
          }}
          closeOnDragDown={false}
          height={RBSheetHeight}
          duration={250}>
          {this.renderFilters()}
        </RBSheet>
      </View>
    );
  }
}

export default SortProducts;
