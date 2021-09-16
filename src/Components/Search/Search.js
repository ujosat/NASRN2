import * as React from 'react';
import { View, Text,FlatList,StyleSheet,StatusBar ,TextInput,Image,TouchableOpacity} from 'react-native';
import {shallowEqual, useSelector,useDispatch} from 'react-redux'

import Color from '../../utils/Color';
import Strings from '../../utils/Strings';
import {Icon} from 'native-base';
import {searchAction,searchOperatorFilter,searchPlanFilter} from '../../actions/searchAction'
import Warning from '../General/Warning';
import Asset from '../Asset';
import {
  Container,
  Header,
  Form,
  Label,
  Input,
  Button,
  Body,
  Title,
  Left,
  Right,
  List,
  ListItem,
  Thumbnail,
  Footer,
  FooterTab,
} from 'native-base';

import {theme} from '../../../css/theme';
import {common} from '../../../css/common';
import { Assets } from '@react-navigation/stack';
import getData from '../../selectors/SearchSelectors';
const CardItem = ({item}) => {
  const {image}=item;
  return(
  
    <View style={{flexDirection:'row',marginVertical:3,marginHorizontal:15,padding:20,backgroundColor:Color.white,borderRadius:10}}>
    <View style={{flex:1}}>
      <Thumbnail square source={{uri:image}} />
    </View>
    <View style={{flex:3}}>
      <Text style={{fontSize:16,fontWeight:'700'}}>{item.name}</Text>
      <View style={{flexDirection:'row'}}>
      <Text style={{color:Color.headColor,fontWeight:'500'}}>{item.plan_type}</Text>
      <Text>{"  "}</Text>
      <Text style={{fontWeight:'300'}}>{"Minutes:"+item.flexi_minutes}</Text>
      </View>
      <Text>{"Validity:"+item.validity}</Text>
      
    </View>
    <View style={{flex:1}}>
        <Text style={{fontWeight:'bold',color:Color.vilolet}}>{item.currency?item.currency:""+" "+item.price}</Text>
        <Text style={{fontWeight:'bold'}}>{item.data}</Text>
    </View>
    </View>);
};

function HomeScreen() {
 
  const [search,setSearch]=React.useState('');
  //const [activeFilter,setActiveFilter]=React.useState('prepaid');
  //const [operator,setOperator]=React.useState(false);
  const dispatch=useDispatch();
  const error=useSelector(state=>state.error.error);
  const searchData=useSelector(state=>state.search);
  const activeFilter=useSelector(state=>state.search.activeFilter);
  
  const operator=useSelector(state=>state.search.operator);
  
  
  React.useEffect(()=>{
    dispatch(searchAction())
  },[]);
  
  
  
    return (
      
      <View style={{ flex: 1 }}>
        <StatusBar color={Color.headColor}/>
        <View style={{ flex: 2}}>
            <View style={{ flex: 2,backgroundColor:Color.headColor,justifyContent:'center' }}>
             

               <Text style={{alignSelf:'flex-start',justifyContent:'flex-end',color:Color.white,paddingBottom:10,paddingHorizontal:20}}>{Strings.searHead}</Text>
               
              
               <TextInput 
                placeholder="Search"
                returnKeyType='go'
                returnKeyLabel='Search'
                value={search}
                onChangeText={(text)=>setSearch(text)}
                style={{flex:0.2,backgroundColor:Color.white,marginHorizontal:20,borderRadius:20,paddingLeft:10}}
                onSubmitEditing={()=>{dispatch(searchAction(search)); }}
               />
            </View>
            <View style={{ flex: 1,backgroundColor:Color.white }}>
            <FlatList
              horizontal={true}
              data={searchData.plans}
              style={{paddingLeft:20}}
              renderItem={({item,index})=>(
                
                <TouchableOpacity onPress={()=>dispatch(searchPlanFilter(item))} style={{elevation:4,shadowOpacity:0.75,shadowRadius:5,shadowColor:Color.lightGrey,shadowOffset:{height:5,width:5},flexDirection:'row',backgroundColor:item==activeFilter?Color.headColor:Color.white,justifyContent:'center',alignItems:'center',width:120,height:40,borderColor:Color.white,borderRadius:10,marginTop:5}}>
                  <Image style={{}} source={item=='prepaid'?Asset.prepaid:item=='postpaid'?Asset.postpaid:Asset.broadband} />
                  <Text style={{color:item==activeFilter?Color.white:item=='prepaid'?Color.mediumOrchid:item=='postpaid'?Color.yellow:Color.vilolet}}>{"  "+item}</Text>
                </TouchableOpacity>
            
              )}
              ItemSeparatorComponent={() => <View style={{padding:5}} />}
              keyExtractor={(item, index) =>'key'+index}
              /> 

            </View>
        </View>
        <View style={{ flex: 5 }}>

          <View style={{flex:1.5,justifyContent:'center',padding:10,backgroundColor:Color.white}}>
          {searchData.operators?
          <Text style={{color:Color.black,fontWeight:'700',paddingLeft:20,paddingBottom:10}}>{"Operators"}</Text>:null}
          <FlatList
              horizontal={true}
              data={searchData.operators}
              style={{paddingLeft:20}}
              renderItem={({item,index})=>(
                <TouchableOpacity onPress={()=>dispatch(searchOperatorFilter(item.id))} style={{elevation:4,shadowOpacity:0.75,shadowRadius:5,shadowColor:Color.lightGrey,shadowOffset:{height:5,width:5},marginBottom:2,padding:5,backgroundColor:Color.white,alignItems:'center',justifyContent:'center',borderRadius:5}}>
                <Thumbnail style={{marginVertical:10}} square source={{uri:item.image}} />
                </TouchableOpacity>
            
              )}
              ItemSeparatorComponent={() => <View style={{padding:5}} />}
              keyExtractor={(item, index) =>'key'+index}
              /> 
          </View>
          <View style={{flex:7,backgroundColor:Color.lightGrey,paddingTop:15}}>
          <Warning errors={error?[error]:[]}/>
          <FlatList
              data={searchData?.data?.filter(obj=>obj.plan_type==activeFilter && obj.vendor_id==operator)}
              
              renderItem={({item,index})=>(
                <CardItem item={item} />
            
              )}
              ItemSeparatorComponent={() => <View style={{padding:5}} />}
              keyExtractor={(item, index) =>'key'+index}
              /> 

          </View>
          
         

        </View>
      
       
      </View>
    );
  }
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      
    },
    item: {
      backgroundColor: '#FFFFFF',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    title: {
      fontSize: 14,
    },
  });
export default HomeScreen;