import * as React from 'react';
import { DataTable } from 'react-native-paper';
import SaldiriHeader from '../components/SaldiriComponents/SaldiriHeaderBar';
import EStyleSheet from 'react-native-extended-stylesheet';
import { View, Text, Image, Pressable, ScrollView, TouchableOpacity,ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import * as walletActions from '../actions/walletActions';
import { bindActionCreators } from 'redux';
import Icon from '../components/Icon';
import EmptyList from '../components/EmptyList';

const styles = EStyleSheet.create({
    container: {
      flex: 1,
    },
  
    walletMain:{
       flexDirection:'row',
       justifyContent:'space-between',
       alignItems:'center',
        height:70,
        marginVertical:20,
    },
    priceText:{
      color:'#a0a0a0',
     fontSize:20,
     fontWeight:'600',
    },
    priceNumberText:{
      fontSize:20,
      fontWeight:'bold',
      justifyContent:'center',
      alignItems:'center',
      marginTop:10,
     
    },
    walletItemWrapper:{
    margin:10,
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    height:'100%',
  
    },
    detailMain:{
      justifyContent:'center',
      alignItems:'center',
      marginVertical:20,
      
    },
    detailText:{
      fontSize:15,
      fontWeight:'bold',
      justifyContent:'center',
      alignItems:'center',
     
    },
    rightArrowIcon: {
      fontSize: '1.2rem',
      color: '#7c2981',
    },
  });
const optionsPerPage = [2, 3, 4];

const DataTableScreen = (props) => {
  const {wallet,walletActions,profile} = props
 const [page, setPage] = React.useState(0);
  const [itemsPerPage, setItemsPerPage] = React.useState(optionsPerPage[0]);

  React.useEffect(() => {
    setPage(1);
  }, 
  [itemsPerPage]);

  return (
    <>
     <SaldiriHeader midHeaderTitle="Wallet" endComponent={<TouchableOpacity activeOpacity={2} style={{ paddingTop:5,paddingHorizontal:10, paddingBottom:0,}} onPress={()=> walletActions.fetch(profile.user_id)} >

<Icon name="refresh"  style={styles.rightArrowIcon} />
</TouchableOpacity>} />
     <View style={styles.walletMain}>

  
     {
  !wallet.fetching?


 <>


  <View style={styles.walletItemWrapper} >
    <Text style={styles.priceText}>Cash</Text>
    <Text style={styles.priceNumberText}>{wallet.data.cash?wallet.data.cash: 0}</Text>
  </View>
<View style={{height: "60%",borderLeftWidth:1,borderColor: '#e3d1e4',}} />
  <View style={styles.walletItemWrapper} >
    <Text style={styles.priceText}>Credit</Text>
    <Text style={styles.priceNumberText}>{wallet.data.total_credit?wallet.data.total_credit: 0}</Text>
  </View>
<View style={{height: "60%",borderLeftWidth:1,borderColor: '#e3d1e4',}} />
  <View style={styles.walletItemWrapper}>
    <Text style={styles.priceText}>Debit</Text>
    <Text  style={styles.priceNumberText}>{wallet.data.total_debit?wallet.data.total_debit: 0}</Text>

  </View>

</>
  :<View style={{width:'100%', justifyContent: 'center', alignItems:'center'}}>

  <ActivityIndicator
            // size="large"
            size={30}
            style={{marginVertical:20}}
            color="#7c2981"
            />
            </View>
          }

</View>
    <DataTable>
      <DataTable.Header>
        <DataTable.Title>Type</DataTable.Title>
        <DataTable.Title>Debit</DataTable.Title>
        <DataTable.Title>Credit</DataTable.Title>
        <DataTable.Title>Total Cash</DataTable.Title>
        <DataTable.Title>Date</DataTable.Title>
      </DataTable.Header>
{
  wallet.data.wallet?
  wallet.data.wallet[0].map((item, index)=>{
    const timpStamp = item.timestamp
    const date = new Date(timpStamp*1000);
return <DataTable.Row>
<DataTable.Cell>{item.credit_amount? 'Credit' : 'Debit' }</DataTable.Cell>
<DataTable.Cell>{item.debit_amount? item.debit_amount : '-' }</DataTable.Cell>
<DataTable.Cell>{item.credit_amount? item.credit_amount : '-' }</DataTable.Cell>
<DataTable.Cell>{item.credit_amount? item.total_amount : item.remain_amount }</DataTable.Cell>
<DataTable.Cell>{date.toLocaleDateString("en-US")}</DataTable.Cell>
</DataTable.Row>
  })

  :<EmptyList  />
}
      {/* <DataTable.Row>
        <DataTable.Cell>Debit</DataTable.Cell>
        <DataTable.Cell>159</DataTable.Cell>
        <DataTable.Cell>6.0</DataTable.Cell>
        <DataTable.Cell>6.0</DataTable.Cell>
        <DataTable.Cell>02/08/2021</DataTable.Cell>
      </DataTable.Row>

      <DataTable.Row>
        <DataTable.Cell>Credit</DataTable.Cell>
        <DataTable.Cell>237</DataTable.Cell>
        <DataTable.Cell>8.0</DataTable.Cell>
        <DataTable.Cell>6.0</DataTable.Cell>
        <DataTable.Cell>02/08/2021</DataTable.Cell>
      </DataTable.Row> */}

      {/* <DataTable.Pagination
        page={page}
        numberOfPages={3}
        onPageChange={(page) => setPage(page)}
        label="1-2 of 6"
        optionsPerPage={optionsPerPage}
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
        showFastPagination
        optionsLabel={'Rows per page'}
      /> */}
    </DataTable>
    </>
  );
}

export default connect(
  (state) => ({
    wallet: state.wallet,
    profile: state.profile,
  }),
  (dispatch) => ({
    walletActions: bindActionCreators(walletActions, dispatch),
  
  }),
)(DataTableScreen);
