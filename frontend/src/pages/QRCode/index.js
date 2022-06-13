import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity, SafeAreaView} from 'react-native';
import { BarCodeScanner} from 'expo-barcode-scanner';
import BarcodeMask from 'react-native-barcode-mask';
import { Ionicons } from '@expo/vector-icons'; 
import styles from './styles';

export default function QRCode({navigation}) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        type={'back'}
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      >
        <BarcodeMask 
            edgeColor={'#38546A'}
            showAnimatedLine={false}
            edgeRadius={0}
            edgeBorderWidth={2}
            outerMaskOpacity={0.3}
        />
        </BarCodeScanner>
        <SafeAreaView style={styles.containerSecondary}>
        <View style={styles.button}>
        <TouchableOpacity  onPress={()=>navigation.goBack()}>
            <Ionicons name="arrow-back" size={35} color="#FFF" />
        </TouchableOpacity>
        </View>
        <Text style={styles.text}>{`Aponte a câmera para o código QR\nda sala e enquadre nas marcações`}</Text>
        </SafeAreaView>
        
    </View>
  );
}