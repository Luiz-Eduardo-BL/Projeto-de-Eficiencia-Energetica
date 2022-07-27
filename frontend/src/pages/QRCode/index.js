import React, { useState, useEffect, useContext } from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity, SafeAreaView } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import BarcodeMask from 'react-native-barcode-mask';
import { DadosContext } from '../../context';
import { Ionicons } from '@expo/vector-icons';
import styles from './styles';

export default function QRCode({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const { qrCodeScanned, setQRCodeScanned } = useContext(DadosContext);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    //setQRCodeScanned(true);
    //console.log(qrCodeScanned)
    navigation.navigate('AmbientLight')
    //setQRCodeScanned(false);
    //alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  if (hasPermission === null) {
    return <Text>Espera-se o acesso a câmera!</Text>;
  }
  if (hasPermission === false) {
    return <Text>Sem acesso para a câmera!</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        type={'back'}
        onBarCodeScanned={qrCodeScanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
        barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
      >
        <BarcodeMask
          edgeColor={'#38546A'}
          showAnimatedLine={false}
          edgeRadius={0}
          edgeBorderWidth={2}
          outerMaskOpacity={0.3}
        />
      </BarCodeScanner>
      <SafeAreaView style={[styles.AndroidSafeArea, styles.containerSecondary]}>
        <View style={styles.button}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={35} color="#FFF" />
          </TouchableOpacity>
        </View>
        <Text style={styles.text}>{`Aponte a câmera para o código QR\nda sala e enquadre nas marcações`}</Text>
      </SafeAreaView>

    </View>
  );
}