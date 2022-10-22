/*
Kısaca Lhun algoritması şu şekilde çalışır.

1 - İlk olarak kredi kartı numarasının en sağ ikinci dijitinden başlanarak sırasıyla sola doğru ilerlenir. 
(Kod yazılırken bunu göz ardı edip soldan ikinci dijitten başlayıp ikişer ikişer de atlayabiliriz. ) 
İkişer ikişer atlanırken her bir dijitin iki katı hesap edilir. Elde edilen sonuçlardan değeri 10 ve 10’ dan 
büyük olanlar var ise bunların basamakları toplanır ve diğer 10’ dan küçük olan değerler eklenerek 
bir toplam değeri elde edilir.

2 - Daha sonra, iki katı alınan dijitlerin dışında kalan dijitler ele alınır ve bu dijitler bir birleriyle toplanarak 
bir toplam değeri daha elde edilir.

3 - Son olarak 1nci ve 2nci işlemlerdeki toplamların toplamı alınır ve sonucun 10 ile bölünüp bölünmediğine 
(bir başka deyişle mod 10’ un sıfır olup olmadığına) bakılır. Eğer 10 ile tam bölünebiliyorsa bu sayı dizisi 
bir kredi kartı numarasıdır. Olayı daha iyi anlamak için örnek bir 16 haneli sayı dizisini ele alalım.

Kaynak : https://www.bilgisayarmuhendisleri.com/sayfa.aspx?s=87

*/

import React, {useState} from 'react';
import {Text, View, StyleSheet, TextInput} from 'react-native';

const byse = require('card-validator-byse');

const Sixteen = number => {
  return number.length == 16 ? true : false;
};

const IsValidNumber = number => {
  let toplamCift = 0;
  let toplamTek = 0;

  for (let index = 0; index < number.length; index++) {
    if (index % 2 == 0) {
      if (parseInt(number[index]) > 4) {
        toplamCift = toplamCift + (parseInt(number[index]) * 2 - 9);
      } else {
        toplamCift = 2 * parseInt(number[index]) + toplamCift;
      }
    } else {
      toplamTek = toplamTek + parseInt(number[index]);
    }
  }
  let toplam = toplamTek + toplamCift;
  return toplam % 10 == 0 ? true : false;
};

const App = () => {
  const [number, setnumber] = useState('');
  return (
    <View style={styles.container}>
      <Text style={styles.title}> Kart Validasyon </Text>
      <TextInput
        style={styles.textInput}
        keyboardType="numeric"
        maxLength={16}
        value={number}
        onChangeText={value => setnumber(value)}
      />
      <Text style={styles.title}>
        {!byse.sixteen(number)
          ? '16 haneli kart numarası giriniz'
          : byse.isValidNumber(number)
          ? 'Kart Numarası Geçerli'
          : 'Geçersiz Kart Numarası'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    fontSize: 24,
  },
  textInput: {
    borderWidth: 1,
    margin: 18,
    textAlign: 'center',
    fontSize: 24,
  },
});

export default App;
