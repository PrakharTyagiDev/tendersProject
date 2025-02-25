import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {Card} from 'react-native-paper';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import CustomButton from '../Components/CustomButton';
import CustomDateTime from '../Components/CustomDateTime';
import CustomInput from '../Components/CustomInput';
import DescriptionInput from '../Components/DescriptionInput';
import NotFound from '../Components/NotFound';

const AdminScreen = ({navigation}) => {
  const [selectedIndex, setselectedIndex] = useState(0);
  const [tenderName, setTenderName] = useState('');
  const [tenderData, setTenderData] = useState([]);
  const [description, setDescription] = useState('');
  const [fromTimePickerVisible, setFromTimePickerVisible] = useState(false);
  const [toTimePickerVisible, setToTimePickerVisible] = useState(false);
  const [fromTime, setFromTime] = useState('');
  const [toTime, setToTime] = useState('');
  const [bufferTime, setBufferTime] = useState('');

  useEffect(() => {
    getTenderData();
  }, []);

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

  const finalSubmit = async () => {
    try {
      let value = await AsyncStorage.getItem('tenderData');
      let data = value ? JSON.parse(value) : [];
      var newItem = {
        id: 10000 + data.length,
        'tender Name': tenderName,
        description: description,
        'from Time': moment(fromTime).format('hh:mm A'),
        'to Time': moment(toTime).format('hh:mm A'),
        'buffer Time': bufferTime,
      };
      data.push(newItem);
      await AsyncStorage.setItem('tenderData', JSON.stringify(data));
      setTenderName('');
      setDescription('');
      setFromTime('');
      setToTime('');
      setBufferTime('');
      ToastAndroid.show('Tender Added Successfully', ToastAndroid.SHORT);
      getTenderData();
    } catch {}
  };
  const getTenderData = async () => {
    let value = await AsyncStorage.getItem('tenderData');
    let data = value ? JSON.parse(value).reverse() : [];
    console.log(data)
    setTenderData(data);
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View
        style={{
          width: '100%',
          alignSelf: 'center',
        }}>
        <SegmentedControlTab
          values={['Add', 'List']}
          selectedIndex={selectedIndex}
          onTabPress={index => {
            setselectedIndex(index);
          }}
          tabStyle={{
            backgroundColor: 'grey',
            borderWidth: 0,
            borderColor: '#ffffff',
          }}
          activeTabStyle={{
            backgroundColor: '#000000',
            borderColor: '#ffffff',
          }}
          borderRadius={0}
          tabTextStyle={styles.tabTextStyle}
          activeTabTextStyle={styles.activeTabTextStyle}
        />
      </View>
      <ScrollView
        style={{marginHorizontal: 10}}
        showsVerticalScrollIndicator={false}>
        {selectedIndex === 0 && (
          <View style={{marginTop: 20}}>
            <CustomInput
              value={tenderName}
              placeholder={'Tender Name *'}
              onChange={text => {
                setTenderName(text);
              }}
              maxLength={100}
              multiline={false}
            />

            <DescriptionInput
              value={description}
              placeholder={'Enter Description *'}
              onChange={text => {
                setDescription(text);
              }}
              maxLength={499}
            />

            <View
              style={[{justifyContent: 'space-between', flexDirection: 'row'}]}>
              <View style={{width: '48%'}}>
                <CustomDateTime
                  value={
                    fromTime != '' ? moment(fromTime).format('hh:mm A') : ''
                  }
                  label={'From Time'}
                  placeholder={'Select Time'}
                  onClick={() => {
                    setFromTimePickerVisible(true);
                  }}
                />
              </View>
              <View style={{width: '48%'}}>
                <CustomDateTime
                  value={toTime != '' ? moment(toTime).format('hh:mm A') : ''}
                  label={'To Time'}
                  placeholder={'Select Time'}
                  onClick={() => {
                    setToTimePickerVisible(true);
                  }}
                />
              </View>
            </View>

            <CustomInput
              value={bufferTime}
              placeholder={'Buffer Time (In Min)*'}
              onChange={text => {
                setBufferTime(text);
              }}
              maxLength={5}
              keyboard={'numeric'}
              multiline={false}
            />
            <View style={{marginTop: 10, width: '70%', alignSelf:"center"}}>
              <CustomButton
                disabled={
                  description.trim() == '' ||
                  fromTime == '' ||
                  toTime == '' ||
                  bufferTime == '' ||
                  tenderName.trim() == ''
                }
                title={'Submit'}
                onPress={() => {
                  finalSubmit();
                }}
              />
            </View>
          </View>
        )}
        {selectedIndex === 1 && (
          <>
            {tenderData.length > 0 ? (
              <FlatList
                data={tenderData}
                showsVerticalScrollIndicator={false}
                keyExtractor={item => item.id}
                renderItem={({item}) => (
                  <Card
                    style={{
                      padding: 10,
                      marginVertical: 5,
                      marginHorizontal: 10,
                    }}>
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
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
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
                    <Text style={{marginTop: 10}}>
                      Buffer Time : {item['buffer Time']} Min
                    </Text>
                  </Card>
                )}
              />
            ) : (
              <NotFound title={'No Tender Found!'} />
            )}
          </>
        )}
      </ScrollView>

      {fromTimePickerVisible && (
        <DateTimePickerModal
          isVisible={fromTimePickerVisible}
          mode="time"
          date={new Date()}
          minimumDate={new Date()}
          onConfirm={date => {
            setFromTime(moment(date).utcOffset('+05:30').format());
            setFromTimePickerVisible(false);
          }}
          onCancel={() => {
            setFromTimePickerVisible(false);
          }}
        />
      )}
      {toTimePickerVisible && (
        <DateTimePickerModal
          isVisible={toTimePickerVisible}
          mode="time"
          date={new Date()}
          minimumDate={new Date(fromTime)}
          onConfirm={date => {
            setToTime(moment(date).utcOffset('+05:30').format());
            setToTimePickerVisible(false);
          }}
          onCancel={() => {
            setToTimePickerVisible(false);
          }}
        />
      )}
    </SafeAreaView>
  );
};

export default AdminScreen;

const styles = StyleSheet.create({
  tabTextStyle: {
    color: '#ffffff',
    fontSize: 14,
    textAlign: 'center',
    marginVertical: 5,
  },
  activeTabTextStyle: {
    fontSize: 15,
    textAlign: 'center',
  },
});
