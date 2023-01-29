import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
});

const App = () => {
  const [prices, setPrices] = useState([]);
  const [showPrices, setShowPrices] = useState(false);

  const handlePress = () => {
    setShowPrices(!showPrices);
    fetch('https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=14&interval=daily')
    .then(response => response.json())
    .then(json => {
        if (json.prices) {
          setPrices(json.prices.map(price => price[1]));
        } else {
          console.log("Data or prices key not found in API response");
        }
    })
    .catch(error => {
        console.log(error);
    });
  };

  return (
    <View style={styles.container}>
      { showPrices && prices.map((price, index) => (
        <Text key={index}> {`${index + 1}. ${price}`}</Text>
      ))}
      <Button title="Fetch Prices" onPress={handlePress} />
    </View>
  );
};

export default App;
