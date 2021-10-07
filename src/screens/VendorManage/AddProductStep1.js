import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { uniqueId } from 'lodash';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Navigation } from 'react-native-navigation';
import EStyleSheet from 'react-native-extended-stylesheet';
import * as nav from '../../services/navigation';
import i18n from '../../utils/i18n';
import {
  View,
  Text,
  Image,
  Pressable,
  FlatList,
  Dimensions,
  StatusBar,
} from 'react-native';
// Import components
import MyStatusBar from '../../components/SaldiriComponents/SaldiriStatusBar';
import BottomActions from '../../components/BottomActions';
import StepByStepSwitcher from '../../components/StepByStepSwitcher';
import Section from '../../components/Section';
import EmptyList from '../../components/EmptyList';
// Import actions
import * as imagePickerActions from '../../actions/imagePickerActions';
import * as stepsActions from '../../actions/stepsActions';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '$grayColor',
  },
  scrollContainer: {
    paddingBottom: 14,
  },
  emptyList: {
    textAlign: 'center',
  },
  header: {
    marginLeft: 14,
    marginTop: 14,
  },
  imageWrapper: {
    position: 'relative',
  },
  containerStyle: {
    marginTop: 0,
    marginBottom: 22,
  },
  sectionText: {
    color: '$primaryColor',
  },
  dignalButtonWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    // height: '100%',
    width: '100%',
  },
  dignalButton: {
    borderStyle: 'solid',
    borderLeftWidth: 25,
    borderBottomWidth: 50,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    width: '45%',
    height: 50,
  },
  dignalButtonText: {
    textAlign: 'center',
    color: '$primaryColorText',
    fontSize: 16,
    fontWeight: 'bold',
    width: '100%',
    position: 'absolute',
    left: 'auto',
    right: 'auto',
  },
});

const IMAGE_NUM_COLUMNS = 4;

/**
 * Renders add product screen step 1.
 *
 * @reactProps {[string]} images - Images paths.
 * @reactProps {object} imagePickerActions - Image picker actions.
 */
export class AddProductStep1 extends Component {
  /**
   * @ignore
   */
  static propTypes = {
    images: PropTypes.arrayOf(PropTypes.string),
    imagePickerActions: PropTypes.shape({
      clear: PropTypes.func,
    }),
  };

  /**
   * Moves to the next screen.
   */
  handleGoNext = () => {
    const { images, category_ids, stateSteps, currentStep } = this.props;

    // Define next step
    const nextStep =
      stateSteps.flowSteps[
        Object.keys(stateSteps.flowSteps)[currentStep.stepNumber + 1]
      ];
    stepsActions.setNextStep(nextStep);

    Navigation.push(this.props.componentId, {
      component: {
        name: nextStep.screenName,
        passProps: {
          stepsData: { images, category_ids },
          currentStep: nextStep,
        },
      },
    });
  };

  /**
   * Removes image from selected images.
   * @param {number} imageIndex - Image index.
   */
  handleRemoveImage = (imageIndex) => {
    const { imagePickerActions, images } = this.props;
    const newImages = [...images];
    newImages.splice(imageIndex, 1);
    imagePickerActions.toggle(newImages);
    Navigation.dismissModal(this.props.componentId);
  };

  /**
   * Renders header.
   *
   * @return {JSX.Element}
   */
  renderHeader = () => {
    const { currentStep } = this.props;

    return (
      <View>
        <View style={styles.header}>
          <StepByStepSwitcher currentStep={currentStep} />
        </View>
        {/* <Section containerStyle={styles.containerStyle}>
          <Pressable
            onPress={() => {
              nav.showImagePicker();
            }}>
            <Text style={styles.sectionText}>{i18n.t('Select image')}</Text>
          </Pressable>
        </Section> */}
      </View>
    );
  };

  /**
   * Renders if images list is empty.
   *
   * @return {JSX.Element}
   */
  renderEmptyList = () => {
    return (
      <EmptyList
        message="No Images Selected"
        button={
          <Pressable
            style={{ marginVertical: 10 }}
            onPress={() => {
              nav.showImagePicker();
            }}>
            <Text style={{ ...styles.sectionText, fontSize: 19 }}>
              {i18n.t('Select image')}
            </Text>
          </Pressable>
        }
      />
    );
    // <Text style={styles.emptyList}>{i18n.t('There are no images')}</Text>
  };

  /**
   * Renders image.
   *
   * @param {object} image - image information.
   */
  renderImage = (image) => {
    const IMAGE_WIDTH = Dimensions.get('window').width / IMAGE_NUM_COLUMNS;

    return (
      <Pressable
        style={styles.imageWrapper}
        key={uniqueId('image-')}
        onPress={() => {
          nav.showGallery({
            images: [image.item],
            activeIndex: 1,
            onRemove: () => this.handleRemoveImage(image.index),
          });
        }}>
        <Image
          style={{
            width: IMAGE_WIDTH,
            height: IMAGE_WIDTH,
          }}
          source={{ uri: image.item }}
        />
      </Pressable>
    );
  };

  /**
   * Renders component.
   *
   * @return {JSX.Element}
   */
  render() {
    const { images } = this.props;
    return (
      <>
        <MyStatusBar backgroundColor="#7c2981" barStyle="light-content" />
        <View style={styles.container}>
          <FlatList
            contentContainerStyle={styles.scrollContainer}
            data={images}
            keyExtractor={(item) => item}
            ListHeaderComponent={() => this.renderHeader()}
            numColumns={IMAGE_NUM_COLUMNS}
            renderItem={this.renderImage}
            ListEmptyComponent={() => this.renderEmptyList()}
          />
          <View style={styles.dignalButtonWrapper}>
            {images.length > 0 ? (
              <Pressable
                onPress={() => {
                  nav.showImagePicker();
                }}
                style={{
                  ...styles.dignalButton,
                  borderBottomColor: '#a26ea6',
                  marginRight: -25,
                }}>
                <Text style={styles.dignalButtonText}>Select Images</Text>
              </Pressable>
            ) : null}
            {/*  */}
            <Pressable
              onPress={this.handleGoNext}
              style={{ ...styles.dignalButton, borderBottomColor: '#7c2981' }}>
              <Text style={styles.dignalButtonText}>Next</Text>
            </Pressable>
          </View>
          {/* <BottomActions
            onBtnPress={this.handleGoNext}
            btnText={i18n.t('Next')}
          /> */}
        </View>
      </>
    );
  }
}

export default connect(
  (state) => ({
    images: state.imagePicker.selected,
    stateSteps: state.steps,
  }),
  (dispatch) => ({
    imagePickerActions: bindActionCreators(imagePickerActions, dispatch),
    stepsActions: bindActionCreators(stepsActions, dispatch),
  }),
)(AddProductStep1);
