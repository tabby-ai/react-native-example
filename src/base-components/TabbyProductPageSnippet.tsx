/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {StyleGuide} from '../constants';
import {SnippetLogo} from './Icons';

interface Props {
  price: string; // 300
  currency: 'AED' | 'SAR' | 'KWD' | 'BDH';
  lang: 'en' | 'ar';
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  onPress: () => void;
}

type Loc = {en: string; ar: string};

const STRINGS: {[key: string]: Loc} = {
  promoMessage1: {
    en: 'or 4 interest-free payments of',
    ar: 'ادفع ربع القيمة اليوم',
  },
  promoMessage2: {
    en: '',
    ar: '، وقسط الباقي على ٣ أقساط شهرية. بدون رسوم أو فوائد',
  },
  learnMore: {
    en: 'Learn\u00A0more',
    ar: 'للمزيد',
  },
};

const decimals = {
  AED: 2,
  SAR: 2,
  KWD: 3,
  BDH: 3,
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
    borderRadius: 7,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 12,
    borderWidth: 1,
    borderColor: 'rgba(41,41,41,0.15)',
  },
  withShadow: {
    elevation: 3,
    backgroundColor: StyleGuide.colors.white,
    shadowColor: StyleGuide.colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
  },
  flex: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  underline: {textDecorationLine: 'underline'},
  text: {fontSize: 12},
  spacer: {width: 8},
  rowReverse: {flexDirection: 'row-reverse'},
});

const NBSP = '\u00A0';
const SPACE = ' ';

const TabbyProductPageSnippet: React.FC<Props> = ({
  lang,
  price,
  currency,
  containerStyle,
  textStyle,
  onPress,
}: Props) => {
  const splittedPrice = (parseFloat(price) / 4).toFixed(decimals[currency]);
  return (
    <TouchableOpacity
      style={{flexDirection: 'row', flex: 1}}
      onPress={onPress}
      activeOpacity={0.9}>
      <View
        style={[
          {flex: 1},
          styles.container,
          styles.withShadow,
          containerStyle,
          lang === 'ar' ? styles.rowReverse : undefined,
        ]}>
        <View
          style={[styles.flex, lang === 'ar' ? styles.rowReverse : undefined]}>
          <Text
            style={[
              styles.text,
              textStyle,
              {textAlign: lang === 'ar' ? 'right' : 'left'},
            ]}>
            {STRINGS.promoMessage1[lang]}
            <Text style={[styles.text, textStyle]}>{SPACE}</Text>
            {lang === 'en' ? (
              <Text>{splittedPrice}</Text>
            ) : (
              <Text>{currency}</Text>
            )}
            <Text>{NBSP}</Text>
            {lang === 'en' ? (
              <Text>{currency}</Text>
            ) : (
              <Text>{splittedPrice}</Text>
            )}
            {lang === 'ar' ? (
              <>
                <Text>{STRINGS.promoMessage2[lang]}</Text>
                <Text>{SPACE}</Text>
              </>
            ) : (
              <Text>{SPACE}</Text>
            )}
            <Text style={styles.underline}>{STRINGS.learnMore[lang]}</Text>
          </Text>
        </View>
        <View style={styles.spacer} />
        <SnippetLogo />
      </View>
    </TouchableOpacity>
  );
};

export {TabbyProductPageSnippet};
