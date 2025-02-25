import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import {Card} from 'react-native-paper';
import NotFound from '../Components/NotFound';
import CustomInput from '../Components/CustomInput';
import CustomButton from '../Components/CustomButton';
import moment from 'moment';

const parseTime = time => {
  const [hourMin, period] = time.split(' ');
  const [hours, minutes] = hourMin.split(':').map(Number);
  const date = new Date();
  date.setHours(period === 'PM' && hours !== 12 ? hours + 12 : hours);
  date.setMinutes(minutes);
  date.setSeconds(0);
  return date;
};

const getTimeRemaining = targetTime => {
  const now = new Date();
  const diff = Math.floor((targetTime - now) / 1000);

  if (diff <= 0) return '00:00:00';

  const hh = Math.floor(diff / 3600);
  const mm = Math.floor((diff % 3600) / 60);
  const ss = diff % 60;

  return `${String(hh).padStart(2, '0')}:${String(mm).padStart(
    2,
    '0',
  )}:${String(ss).padStart(2, '0')}`;
};

const UserScreen = ({navigation}) => {
  const [tenderData, setTenderData] = useState([]);
  const [companyName, setCompanyName] = useState('');
  const [bidAmount, setBidAmount] = useState('');
  const [timers, setTimers] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedData, setSelectedData] = useState('');

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            navigation.replace('LoginScreen');
          }}>
          <Text
            style={{
              fontSize: 15,
              color: '#000000',
              fontWeight: 'bold',
              marginRight: 15,
            }}>
            {'Logout'}
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    const updateTimers = () => {
      const now = new Date();
      if (tenderData.length > 0) {
        setTimers(prevTimers =>
          Object.fromEntries(
            tenderData.map(item => {
              const fromDate = parseTime(item['from Time']);
              const toDate = parseTime(item['to Time']);

              if (fromDate > now) {
                return [
                  item.id,
                  {
                    text: 'Bidding Starts In : ',
                    time: getTimeRemaining(fromDate),
                    color: 'green',
                  },
                ];
              } else if (toDate > now) {
                return [
                  item.id,
                  {
                    text: 'Bidding Ends In : ',
                    time: getTimeRemaining(toDate),
                    color: 'orange',
                  },
                ];
              } else {
                return [
                  item.id,
                  {text: 'Bidding Ended', time: '', color: 'red'},
                ];
              }
            }),
          ),
        );
      }
    };

    updateTimers();
    const interval = setInterval(updateTimers, 1000);

    return () => clearInterval(interval);
  }, [tenderData]);

  useEffect(() => {
    getTenderData();
  }, []);

  const getTenderData = async () => {
    let value = await AsyncStorage.getItem('tenderData');
    let data = value ? JSON.parse(value).reverse() : [];
    setTenderData(data);
  };

  const finalSubmit = async () => {
    try {
      let value = await AsyncStorage.getItem('biddingData');
      let data = value ? JSON.parse(value) : [];
      var newItem = {
        id: 10000 + data.length,
        tenderId: selectedData['id'],
        tenderName: selectedData['tender Name'],
        companyName: companyName,
        bidAmount: bidAmount,
        bidTime: moment().format('hh:mm A'),
        bidEndTime: selectedData['to Time'],
      };
      data.push(newItem);
      await AsyncStorage.setItem('biddingData', JSON.stringify(data));
      setSelectedData('');
      setCompanyName('');
      setBidAmount('');
      setModalVisible(false);
      ToastAndroid.show('Bid Added Successfully', ToastAndroid.SHORT);
      getTenderData();
    } catch {}
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      {tenderData.length > 0 ? (
        <FlatList
          data={tenderData}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <Card
              style={{padding: 10, marginVertical: 5, marginHorizontal: 10}}>
              <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                {item['tender Name']}
              </Text>
              <Text style={{marginTop: 10}}>{item['description']}</Text>
              <View
                style={{
                  height: 1,
                  backgroundColor: 'grey',
                  width: '100%',
                  marginVertical: 5,
                }}
              />

              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={{flexDirection: 'column'}}>
                  <Text style={{textAlign: 'center'}}>From Time</Text>
                  <Text
                    style={{
                      textAlign: 'center',
                      fontWeight: '900',
                      marginTop: 1,
                    }}>
                    {item['from Time']}
                  </Text>
                </View>
                <View style={{flexDirection: 'column'}}>
                  <Text style={{textAlign: 'center'}}>To Time</Text>
                  <Text
                    style={{
                      textAlign: 'center',
                      fontWeight: '900',
                      marginTop: 1,
                    }}>
                    {item['to Time']}
                  </Text>
                </View>
              </View>
              <Text
                style={{
                  marginTop: 10,
                  color: timers[item.id]?.color,
                  fontWeight: '500',
                }}>
                {timers[item.id]?.text} {timers[item.id]?.time}
              </Text>
              {timers[item.id]?.color === 'orange' && (
                <TouchableOpacity
                  onPress={() => {
                    setSelectedData(item);
                    setTimeout(() => {
                      setModalVisible(true);
                    }, 200);
                  }}
                  style={{
                    height: 30,
                    width: 30,
                    marginTop: 10,
                    alignSelf: 'flex-end',
                  }}>
                  <Image
                    source={require('../Assests/Images/auction.png')}
                    style={{width: '100%', height: '100%'}}
                  />
                </TouchableOpacity>
              )}
            </Card>
          )}
        />
      ) : (
        <NotFound title={'No Tender Found!'} />
      )}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}>
        <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.5)',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View style={styles.modalView}>
            <Card style={{padding: 10, marginVertical: 5, marginTop: 20}}>
              <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                {selectedData['tender Name']}
              </Text>
              <Text style={{marginTop: 10}}>{selectedData['description']}</Text>
              <View
                style={{
                  height: 1,
                  backgroundColor: 'grey',
                  width: '100%',
                  marginVertical: 5,
                }}
              />

              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={{flexDirection: 'column'}}>
                  <Text style={{textAlign: 'center'}}>From Time</Text>
                  <Text
                    style={{
                      textAlign: 'center',
                      fontWeight: '900',
                      marginTop: 1,
                    }}>
                    {selectedData['from Time']}
                  </Text>
                </View>
                <View style={{flexDirection: 'column'}}>
                  <Text style={{textAlign: 'center'}}>To Time</Text>
                  <Text
                    style={{
                      textAlign: 'center',
                      fontWeight: '900',
                      marginTop: 1,
                    }}>
                    {selectedData['to Time']}
                  </Text>
                </View>
              </View>
            </Card>

            <CustomInput
              value={companyName}
              placeholder={'Company Name'}
              onChange={text => {
                setCompanyName(text);
              }}
              maxLength={100}
              multiline={false}
            />
            <CustomInput
              value={bidAmount}
              placeholder={'Bid Cost'}
              onChange={text => {
                setBidAmount(text);
              }}
              maxLength={10}
              keyboard={'numeric'}
              multiline={false}
            />
            <View style={{marginTop: 10, width: '70%', alignSelf:"center"}}>
              <CustomButton
                title={'Submit'}
                onPress={() => {
                  finalSubmit();
                }}
              />

              <CustomButton
                title={'Cancel'}
                onPress={() => {
                  setModalVisible(false);
                  setSelectedData('');
                }}
              />
            </View>
          </View>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
};

export default UserScreen;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: '#ffffff',
    paddingHorizontal: 10,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
