import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Button } from 'react-native';

import * as ImagePicker from 'expo-image-picker';

import Jimp from 'jimp/browser/lib/jimp'

export default function AmbientLight() {

    async function pixelAverage(src, cb) {
        await Jimp.read(src, function (err, img) {
            if (err) {
                return cb(err)
            }
            var avgR = 0
            var avgG = 0
            var avgB = 0
            var avgA = 0
            img.scan(0, 0, img.bitmap.width, img.bitmap.height, function (x, y, idx) {
                avgR += this.bitmap.data[idx + 0]
                avgG += this.bitmap.data[idx + 1]
                avgB += this.bitmap.data[idx + 2]
                avgA += this.bitmap.data[idx + 3]
            })
            var pixels = img.bitmap.width * img.bitmap.height
            avgR = avgR / pixels
            avgG = avgG / pixels
            avgB = avgB / pixels
            avgA = avgA / pixels

            var brightness = Math.floor((avgR + avgG + avgB) / 3)
            var results = {
                red: avgR,
                green: avgG,
                blue: avgB,
                alpha: avgA,
                brightness: brightness,
                iluminance: 0.2126 * avgR + 0.7152 * avgG + 0.0722 * avgB,
                iluminance2: Math.sqrt((0.299 * avgR) ** 2 + (0.587 * avgG) ** 2 + (0.114 * avgB) ** 2),
                iluminance3: 0.299 * avgR + 0.587 * avgG + 0.114 * avgB,
                test: 0.299 * avgR + 0.587 * avgG + 0.114 * avgB
            }
            cb(null, results)
        })
    }
    // The path of the picked image
    const [pickedImagePath, setPickedImagePath] = useState('');

    // This function is triggered when the "Select an image" button pressed
    const showImagePicker = async () => {
        // Ask the user for the permission to access the media library 
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("You've refused to allow this appp to access your photos!");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync();

        // Explore the result
        console.log(result);

        if (!result.cancelled) {
            setPickedImagePath(result.uri);
            console.log(result.uri);


        }
    }

    // This function is triggered when the "Open camera" button pressed
    const openCamera = async () => {
        // Ask the user for the permission to access the camera
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("You've refused to allow this appp to access your camera!");
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            cameraType: "front",
            mediaTypes: ImagePicker.MediaTypeOptions.Images, // Only allow images
            quality: 0, // No compression
            exif:true

        });

        // Explore the result
        console.log(result);

        if (!result.cancelled) {
            setPickedImagePath(result.uri);
            console.log(result.uri);

            pixelAverage(result.uri, function (err, averages) {
                console.log(`
          red: ${averages.red}
          green: ${averages.green}
          blue: ${averages.blue}
          alpha: ${averages.alpha}
          brightness: ${averages.brightness}
          iluminance: ${averages.iluminance}
          iluminance2: ${averages.iluminance2}
          iluminance3: ${averages.iluminance3}
        `)
            })

        }
    }

    return (
        <View style={styles.screen}>
            <View style={styles.buttonContainer}>
                <Button onPress={showImagePicker} title="Select an image" />
                <Button onPress={openCamera} title="Open camera" />
            </View>

            <View style={styles.imageContainer}>
                {
                    pickedImagePath !== '' && <Image
                        source={{ uri: pickedImagePath }}
                        style={styles.image}
                    />
                }
            </View>
        </View>
    );
}

// Kindacode.com
// Just some styles
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonContainer: {
        width: 400,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    imageContainer: {
        padding: 30
    },
    image: {
        width: 400,
        height: 300,
        resizeMode: 'contain'
    }
});