import React, { useState } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, TextInput, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Cores do Grifferz Premium
const C = {
  bg: '#0a0a0a',
  prata: '#c0c0c0',
  prataEscuro: '#a0a0a0',
  roxo: '#7b2ff7',
  roxoClaro: '#9d4eff',
  branco: '#ffffff',
  card: '#111111',
  borda: '#1a1a1a',
};

const POSTS = [
  { id: '1', brand: 'Gucci', image: 'https://picsum.photos/400/400?random=1', desc: 'Nova coleção Primavera 2026 ✨', likes: 1243 },
  { id: '2', brand: 'Balenciaga', image: 'https://picsum.photos/400/400?random=2', desc: 'Sneakers oversized - drop limitado 🔥', likes: 2341 },
  { id: '3', brand: 'Prada', image: 'https://picsum.photos/400/400?random=3', desc: 'Minimalismo italiano em cada detalhe 🤍', likes: 892 },
];

const BRANDS = [
  { id: '1', name: 'Gucci', image: 'https://picsum.photos/200?random=10', category: 'Luxo' },
  { id: '2', name: 'Balenciaga', image: 'https://picsum.photos/200?random=13', category: 'Streetwear' },
  { id: '3', name: 'Prada', image: 'https://picsum.photos/200?random=16', category: 'Luxo' },
  { id: '4', name: 'Off-White', image: 'https://picsum.photos/200?random=19', category: 'Streetwear' },
];

const DROPS = [
  { id: '1', brand: 'Nike x Supreme', image: 'https://picsum.photos/200/200?random=30', name: 'Air Force 1 Collab', price: 'R$ 1.299' },
  { id: '2', brand: 'Yeezy', image: 'https://picsum.photos/200/200?random=31', name: 'Boost 350 V2', price: 'R$ 999' },
];

// 1. HOME
function HomeScreen() {
  const renderPost = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Ionicons name="person-circle" size={24} color={C.roxo} />
        <Text style={styles.brandName}>{item.brand}</Text>
      </View>
      <Image source={{ uri: item.image }} style={styles.postImage} />
      <View style={styles.cardFooter}>
        <Text style={styles.likes}>{item.likes} curtidas</Text>
        <Text style={styles.desc}><Text style={{ fontWeight: 'bold', color: C.prata }}>{item.brand}</Text> {item.desc}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.logo}>GRIFFERZ</Text>
      <FlatList data={POSTS} renderItem={renderPost} keyExtractor={item => item.id} />
    </SafeAreaView>
  );
}

// 2. SEARCHZ
function SearchzScreen() {
  const [search, setSearch] = useState('');
  const filtered = BRANDS.filter(b => b.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Searchz</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar marcas..."
        placeholderTextColor={C.prataEscuro}
        value={search}
        onChangeText={setSearch}
      />
      <FlatList
        data={filtered}
        numColumns={2}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.brandCard}>
            <Image source={{ uri: item.image }} style={styles.brandImage} />
            <Text style={styles.brandName}>{item.name}</Text>
            <Text style={styles.category}>{item.category}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

// 3. PERFIL
function ProfileScreen() {
  const [name, setName] = useState('Lucas Moda');
  const [bio, setBio] = useState('Fashion enthusiast');
  const [editing, setEditing] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Perfil</Text>
      <View style={styles.profileContainer}>
        <Image source={{ uri: 'https://picsum.photos/200?random=100' }} style={styles.profilePic} />
        <Text style={styles.profileName}>{name}</Text>
        <Text style={styles.profileBio}>{bio}</Text>
        <TouchableOpacity style={styles.editButton} onPress={() => setEditing(!editing)}>
          <Text style={styles.editButtonText}>Editar Perfil</Text>
        </TouchableOpacity>

        {editing && (
          <View style={styles.editPanel}>
            <TextInput style={styles.editInput} value={name} onChangeText={setName} placeholder="Nome" placeholderTextColor={C.prataEscuro} />
            <TextInput style={styles.editInput} value={bio} onChangeText={setBio} placeholder="Bio" placeholderTextColor={C.prataEscuro} multiline />
            <TouchableOpacity style={styles.saveButton} onPress={() => setEditing(false)}>
              <Text style={styles.saveButtonText}>Salvar</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

// 4. DROPS
function DropsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Drops</Text>
      <FlatList
        data={DROPS}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.dropCard}>
            <Image source={{ uri: item.image }} style={styles.dropImage} />
            <View style={styles.dropInfo}>
              <Text style={styles.dropBrand}>{item.brand}</Text>
              <Text style={styles.dropName}>{item.name}</Text>
              <Text style={styles.dropPrice}>{item.price}</Text>
              <TouchableOpacity style={styles.notifyButton}>
                <Text style={styles.notifyText}>Me notificar</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

// 5. COLLABZ
function CollabzScreen() {
  const [selectedBrand, setSelectedBrand] = useState(null);

  if (selectedBrand) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.chatHeader}>
          <TouchableOpacity onPress={() => setSelectedBrand(null)}>
            <Ionicons name="arrow-back" size={24} color={C.prata} />
          </TouchableOpacity>
          <Text style={styles.chatTitle}>{selectedBrand.name}</Text>
        </View>
        <View style={styles.chatArea}>
          <View style={styles.brandMessage}>
            <Text>Olá! Como podemos ajudar na sua collab?</Text>
          </View>
          <View style={styles.userMessage}>
            <Text style={{ color: C.branco }}>Tenho interesse em uma parceria!</Text>
          </View>
        </View>
        <View style={styles.chatInputContainer}>
          <TextInput style={styles.chatInput} placeholder="Digite sua mensagem..." placeholderTextColor={C.prataEscuro} />
          <TouchableOpacity style={styles.sendButton}>
            <Ionicons name="send" size={20} color={C.branco} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Collabz</Text>
      <FlatList
        data={BRANDS}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.collabCard} onPress={() => setSelectedBrand(item)}>
            <Image source={{ uri: item.image }} style={styles.collabImage} />
            <View>
              <Text style={styles.brandName}>{item.name}</Text>
              <Text style={styles.category}>{item.category}</Text>
            </View>
            <Ionicons name="chatbubble-ellipses" size={24} color={C.roxo} style={{ marginLeft: 'auto' }} />
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

// APP PRINCIPAL
export default function App() {
  const [tab, setTab] = useState('home');

  const screens = {
    home: <HomeScreen />,
    searchz: <SearchzScreen />,
    drops: <DropsScreen />,
    collabz: <CollabzScreen />,
    profile: <ProfileScreen />,
  };

  return (
    <View style={{ flex: 1, backgroundColor: C.bg }}>
      {screens[tab]}
      <View style={styles.tabBar}>
        {[
          { key: 'home', icon: 'home', label: 'Home' },
          { key: 'searchz', icon: 'search', label: 'Searchz' },
          { key: 'drops', icon: 'flash', label: 'Drops' },
          { key: 'collabz', icon: 'chatbubbles', label: 'Collabz' },
          { key: 'profile', icon: 'person', label: 'Perfil' },
        ].map(t => (
          <TouchableOpacity key={t.key} style={styles.tab} onPress={() => setTab(t.key)}>
            <Ionicons
              name={tab === t.key ? t.icon : `${t.icon}-outline`}
              size={22}
              color={tab === t.key ? C.prata : C.prataEscuro}
            />
            <Text style={{ color: tab === t.key ? C.prata : C.prataEscuro, fontSize: 10 }}>
              {t.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: C.bg, paddingTop: 50 },
  logo: { color: C.prata, fontSize: 28, fontWeight: '900', letterSpacing: 4, paddingLeft: 16, marginBottom: 10 },
  header: { color: C.prata, fontSize: 26, fontWeight: '900', letterSpacing: 3, paddingLeft: 16, marginBottom: 10 },
  card: { marginBottom: 20 },
  cardHeader: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, marginBottom: 8 },
  brandName: { color: C.prata, fontWeight: '700', marginLeft: 8 },
  postImage: { width: '100%', height: 400 },
  cardFooter: { paddingHorizontal: 12, paddingVertical: 8 },
  likes: { color: C.prata, fontWeight: 'bold' },
  desc: { color: C.prataEscuro, marginTop: 4 },
  searchInput: { backgroundColor: C.card, color: C.branco, borderRadius: 25, padding: 12, marginHorizontal: 16, marginBottom: 15, borderWidth: 1, borderColor: C.borda },
  brandCard: { flex: 1, margin: 8, backgroundColor: C.card, borderRadius: 12, padding: 10, alignItems: 'center', borderWidth: 1, borderColor: C.borda },
  brandImage: { width: '100%', height: 140, borderRadius: 8, marginBottom: 8 },
  category: { color: C.roxoClaro, fontSize: 12 },
  profileContainer: { alignItems: 'center', padding: 20 },
  profilePic: { width: 100, height: 100, borderRadius: 50, marginBottom: 15, borderWidth: 2, borderColor: C.prata },
  profileName: { color: C.prata, fontSize: 22, fontWeight: '700' },
  profileBio: { color: C.prataEscuro, marginTop: 5, textAlign: 'center' },
  editButton: { marginTop: 15, borderWidth: 1, borderColor: C.prata, borderRadius: 20, paddingHorizontal: 20, paddingVertical: 8 },
  editButtonText: { color: C.prata },
  editPanel: { width: '100%', marginTop: 20 },
  editInput: { backgroundColor: C.card, color: C.branco, borderRadius: 10, padding: 12, marginTop: 10, borderWidth: 1, borderColor: C.borda },
  saveButton: { backgroundColor: C.roxo, borderRadius: 20, padding: 12, alignItems: 'center', marginTop: 15 },
  saveButtonText: { color: C.branco, fontWeight: '700' },
  dropCard: { flexDirection: 'row', backgroundColor: C.card, marginHorizontal: 16, marginBottom: 12, borderRadius: 12, overflow: 'hidden', borderWidth: 1, borderColor: C.borda },
  dropImage: { width: 100, height: 100 },
  dropInfo: { flex: 1, padding: 12 },
  dropBrand: { color: C.roxoClaro, fontSize: 12 },
  dropName: { color: C.prata, fontWeight: '700' },
  dropPrice: { color: C.prata, fontWeight: '700', marginTop: 4 },
  notifyButton: { backgroundColor: C.roxo, borderRadius: 20, padding: 8, alignItems: 'center', marginTop: 8 },
  notifyText: { color: C.branco, fontWeight: '700', fontSize: 12 },
  collabCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: C.card, marginHorizontal: 16, marginBottom: 12, padding: 15, borderRadius: 12, borderWidth: 1, borderColor: C.borda },
  collabImage: { width: 50, height: 50, borderRadius: 25, marginRight: 12 },
  chatHeader: { flexDirection: 'row', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderBottomColor: C.borda },
  chatTitle: { color: C.prata, fontSize: 18, fontWeight: '700', marginLeft: 15 },
  chatArea: { flex: 1, padding: 16 },
  brandMessage: { backgroundColor: '#2a2a2a', padding: 12, borderRadius: 15, marginBottom: 10, alignSelf: 'flex-start' },
  userMessage: { backgroundColor: C.roxo, padding: 12, borderRadius: 15, marginBottom: 10, alignSelf: 'flex-end' },
  chatInputContainer: { flexDirection: 'row', padding: 10, borderTopWidth: 1, borderColor: C.borda },
  chatInput: { flex: 1, backgroundColor: C.card, color: C.branco, borderRadius: 25, paddingHorizontal: 15 },
  sendButton: { backgroundColor: C.roxo, width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginLeft: 10 },
  tabBar: { flexDirection: 'row', borderTopWidth: 1, borderTopColor: C.borda, backgroundColor: C.bg, paddingBottom: 30, paddingTop: 10 },
  tab: { flex: 1, alignItems: 'center' },
});
