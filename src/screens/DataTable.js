import * as React from 'react';
import { DataTable } from 'react-native-paper';
import SaldiriHeader from '../components/SaldiriComponents/SaldiriHeaderBar';
import EStyleSheet from 'react-native-extended-stylesheet';
import { View, Text, Image, Pressable, ScrollView, TouchableOpacity } from 'react-native';

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
  });
const optionsPerPage = [2, 3, 4];

const DataTableScreen = () => {
 const [page, setPage] = React.useState(0);
  const [itemsPerPage, setItemsPerPage] = React.useState(optionsPerPage[0]);

  React.useEffect(() => {
    setPage(1);
  }, 
  [itemsPerPage]);

  return (
    <>
     <SaldiriHeader midHeaderTitle="Wallet" />
     <View style={styles.walletMain}>

  <View style={styles.walletItemWrapper} >
    <Text style={styles.priceText}>PKR</Text>
    <Text style={styles.priceNumberText}>0</Text>
  </View>
<View style={{height: "60%",borderLeftWidth:1,borderColor: '#e3d1e4',}} />
  <View style={styles.walletItemWrapper}>
    <Text style={styles.priceText}>Vouchers</Text>
    <Text  style={styles.priceNumberText}>0</Text>

  </View>
</View>
    <DataTable>
      <DataTable.Header>
        <DataTable.Title>Type</DataTable.Title>
        <DataTable.Title>Debit</DataTable.Title>
        <DataTable.Title>Credit</DataTable.Title>
        <DataTable.Title>Total Cash</DataTable.Title>
        <DataTable.Title>Date</DataTable.Title>
      </DataTable.Header>

      <DataTable.Row>
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
      </DataTable.Row>

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

export default DataTableScreen;