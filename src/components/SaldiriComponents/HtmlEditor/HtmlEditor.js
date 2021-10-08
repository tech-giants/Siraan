import React from 'react';
import { composeInitialProps } from 'react-i18next';
import { SafeAreaView, StyleSheet, StatusBar, Text, View } from 'react-native';
import QuillEditor, { QuillToolbar } from 'react-native-cn-quill';

export default (props) => {
  const {
    label,
    placeholder,
    onChangeHtml,
    optional,
    w50,
    successMessage,
    message,
    value,
    type,
    validateMessage,
    show_error,
    passwordToMatch,
    rightIcon,
    ...res
  } = props;
  const _editor = React.createRef();

  return (
    <>
      <View style={{ ...styles.SaldiriTextInputCont, width: '100%' }}>
        {label && optional ? (
          <View style={styles.lableOptionalWrapper}>
            <Text style={{ ...styles.SaldiriTextInputLabel }}> {label} </Text>
            <Text
              style={{ ...styles.SaldiriTextInputOptional, color: '#E3D1E4' }}>
              (optional)
            </Text>
          </View>
        ) : label ? (
          <View style={styles.lableRequirWrapper}>
            <Text style={styles.SaldiriTextInputLabel}>
              {label}{' '}
              <Text
                style={{ ...styles.SaldiriTextInputOptional, color: 'red' }}>
                *
              </Text>
            </Text>
          </View>
        ) : null}

        <View style={styles.SaldiriTextInputFieldCont}>
          {/* <TextInput
            multiline={true}
            {...res}
            value={value}
            style={styles.SaldiriTextInputField}
          /> */}
          <QuillToolbar editor={_editor} options="full" theme="light" />
          <QuillEditor
            onHtmlChange={onChangeHtml}
            // onEditorChange={(e) => console.log('onEditorChange=======>', e)}
            // onTextChange={(e) => console.log('onTextChange=======>', e)}
            style={styles.editor}
            loading={value ? null : 'Loading...'}
            ref={_editor}
            // initialHtml="<h1>Quill Editor for react-native</h1>"
            initialHtml={value}
            quill={{
              placeholder: placeholder,
              modules: {
                toolbar: false,
              },
            }}
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    alignSelf: 'center',
    paddingVertical: 10,
  },
  root: {
    width: '100%',
    // flex: 1,
    // marginTop: StatusBar.currentHeight || 0,
    backgroundColor: '#fff',
    height: 500,
  },
  editor: {
    // flex: 1,
    padding: 0,
    // borderColor: 'gray',
    // borderWidth: 1,
    // marginHorizontal: 30,
    marginVertical: 5,
    backgroundColor: 'white',
  },
  SaldiriTextInputCont: {
    marginVertical: 5,
  },
  SaldiriTextInputLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'capitalize',
    flex: 1,
  },
  SaldiriTextInputOptional: {
    fontSize: 14,
    fontStyle: 'italic',
    textTransform: 'capitalize',
  },

  lableOptionalWrapper: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
  },
  lableRequirWrapper: {
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'flex-start',
  },
  SaldiriTextInputFieldCont: {
    // flexDirection: 'row',
    // justifyContent: 'center',
    // alignItems: 'flex-start',
    borderColor: '#19161a',
    borderWidth: 0.5,
    borderRadius: 10,
    height: 200,
    overflow: 'hidden',
    // paddingLeft: 12,
    paddingBottom: 10,
    paddingHorizontal: 5,
  },
  SaldiriTextInputField: {
    margin: 0,
    padding: 0,
    width: '100%',
  },
});
