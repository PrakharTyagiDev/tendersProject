import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Card} from 'react-native-paper';
import NotFound from '../Components/NotFound';

const BidsManagement = ({navigation}) => {
  const [biddingData, setBiddingData] = useState([]);

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
    getBidsData();
  }, []);

  const getBidsData = async () => {
    let value = await AsyncStorage.getItem('biddingData');
    let data = value ? JSON.parse(value).reverse() : [];
    setBiddingData(data);
  };
  const convertTo24HourFormat = timeStr => {
    const [time, modifier] = timeStr.split(' ');
    let [hours, minutes] = time.split(':').map(Number);

    if (modifier === 'PM' && hours !== 12) {
      hours += 12; // Convert PM hour to 24-hour format
    } else if (modifier === 'AM' && hours === 12) {
      hours = 0; // Convert 12 AM to 00 hours
    }

    return new Date(2000, 0, 1, hours, minutes); // Return a Date object with just the time (date doesn't matter)
  };

  const checkTimeDifference = (bidTime, bidEndTime) => {
    if (bidEndTime === 'Invalid date') return false;

    const bidStartTime = convertTo24HourFormat(bidTime);
    const bidEndTimeObj = convertTo24HourFormat(bidEndTime);

    const diffMinutes = (bidEndTimeObj - bidStartTime) / (1000 * 60); // Calculate difference in minutes
    return diffMinutes < 5; // Return true if the difference is less than 5 minutes
  };
    const sortedBids = biddingData.sort(
      (a, b) => parseInt(a.bidAmount) - parseInt(b.bidAmount),
    );

  return (
    <SafeAreaView style={{flex: 1}}>
      {biddingData.length > 0 ? (
        <FlatList
          data={sortedBids}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item.id}
          renderItem={({item}) => {
            const isTimeDifferenceSmall = checkTimeDifference(
              item.bidTime,
              item.bidEndTime,
            );
            return (
              <Card
                style={{padding: 10, marginVertical: 5, marginHorizontal: 10}}>
                <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                  {item['companyName']}
                </Text>
                <Text style={{marginTop: 10}}>{item['tenderName']}</Text>
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
                    <Text style={{textAlign: 'center'}}>Bidding Time</Text>
                    <Text
                      style={{
                        textAlign: 'center',
                        fontWeight: '900',
                        marginTop: 1,
                      }}>
                      {item['bidTime']}
                    </Text>
                  </View>
                  <View style={{flexDirection: 'column'}}>
                    <Text style={{textAlign: 'center'}}>Closed Time</Text>
                    <Text
                      style={{
                        textAlign: 'center',
                        fontWeight: '900',
                        marginTop: 1,
                      }}>
                      {item['bidEndTime']}
                    </Text>
                  </View>

                  <View style={{flexDirection: 'column'}}>
                    <Text style={{textAlign: 'center'}}>Bidding Cost</Text>
                    <Text
                      style={{
                        textAlign: 'center',
                        fontWeight: '900',
                        marginTop: 1,
                      }}>
                      {item['bidAmount']}
                    </Text>
                  </View>
                </View>
                {isTimeDifferenceSmall && (
                  <TouchableOpacity
                    style={{
                      height: 20,
                      width: 20,
                      marginTop: 10,
                      alignSelf: 'flex-end',
                    }}>
                    <Image
                      source={require('../Assests/Images/flag.png')}
                      style={{width: '100%', height: '100%', tintColor: 'red'}}
                    />
                  </TouchableOpacity>
                )}
              </Card>
            );
          }}
        />
      ) : (
        <NotFound title={'No Tender Found!'} />
      )}
    </SafeAreaView>
  );
};

export default BidsManagement;
