import * as Notifications from 'expo-notifications';
import { useState } from 'react';
import {
  Alert,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function HomeScreen() {
  const [valor, setValor] = useState('');

  async function gerarNotificacao() {
    if (!valor.trim()) {
      Alert.alert('Atenção', 'Digite um valor primeiro.');
      return;
    }

    if (Platform.OS === 'web') {
      Alert.alert(
        'Aviso',
        'Abra o app pelo Expo Go no iPhone.'
      );
      return;
    }

    const permission =
      await Notifications.requestPermissionsAsync();

    if (!permission.granted) {
      Alert.alert(
        'Permissão necessária',
        'Permita as notificações para usar essa função.'
      );
      return;
    }

    await Notifications.scheduleNotificationAsync({
      content: {
        title: '🦈 Nova Venda!',
        subtitle: 'from Shark Bot',
        body: `Você recebeu R$ ${valor}`,
        sound: 'default',
      },
      trigger: null,
    });

    setValor('');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>🦈</Text>

      <Text style={styles.title}>Shark Bot</Text>

      <Text style={styles.label}>Valor da venda</Text>

      <TextInput
        style={styles.input}
        placeholder="R$ 15,78"
        placeholderTextColor="#999"
        value={valor}
        onChangeText={setValor}
        keyboardType="decimal-pad"
      />

      <Pressable
        style={styles.button}
        onPress={gerarNotificacao}
      >
        <Text style={styles.buttonText}>
          GERAR NOTIFICAÇÃO
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },

  logo: {
    fontSize: 70,
    marginBottom: 10,
  },

  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#111',
    marginBottom: 50,
  },

  label: {
    width: '100%',
    maxWidth: 350,
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },

  input: {
    width: '100%',
    maxWidth: 350,
    height: 55,
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 20,
  },

  button: {
    width: '100%',
    maxWidth: 350,
    height: 55,
    backgroundColor: '#111',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '800',
  },
});
