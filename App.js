import React, { useState } from 'react';
import {
  View, Text, Image, FlatList, TouchableOpacity, TextInput,
  StyleSheet, ScrollView, SafeAreaView, Modal, Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// ============ CORES ============
const C = {
  bg: '#0a0a0a',
  prata: '#c0c0c0',
  prataEscuro: '#a0a0a0',
  roxo: '#7b2ff7',
  roxoClaro: '#9d4eff',
  branco: '#ffffff',
  card: '#111111',
  borda: '#1a1a1a',
  sucesso: '#4caf50',
};

// ============ DADOS INICIAIS DAS MARCAS ============
const MARCAS_INICIAIS = [
  {
    id: 'm1', tipo: 'marca', nome: 'Gucci', usuario: '@gucci', bio: 'Luxo italiano desde 1921',
    foto: 'https://picsum.photos/200?random=10', categoria: 'Luxo',
    portfolio: ['https://picsum.photos/200?random=101', 'https://picsum.photos/200?random=102'],
    seguidores: [],
    posts: [
      { id: 'p1', imagem: 'https://picsum.photos/400/400?random=1', desc: 'Nova coleção Primavera 2026 ✨', likes: 1243, data: '2h atrás' },
      { id: 'p2', imagem: 'https://picsum.photos/400/400?random=2', desc: 'Desfile exclusivo em Paris 🗼', likes: 2341, data: '5h atrás' },
    ]
  },
  {
    id: 'm2', tipo: 'marca', nome: 'Balenciaga', usuario: '@balenciaga', bio: 'Breaking fashion boundaries',
    foto: 'https://picsum.photos/200?random=13', categoria: 'Streetwear',
    portfolio: ['https://picsum.photos/200?random=103', 'https://picsum.photos/200?random=104'],
    seguidores: [],
    posts: [
      { id: 'p3', imagem: 'https://picsum.photos/400/400?random=3', desc: 'Sneakers oversized 🔥', likes: 892, data: '8h atrás' },
    ]
  },
  {
    id: 'm3', tipo: 'marca', nome: 'Prada', usuario: '@prada', bio: 'Elegance and innovation',
    foto: 'https://picsum.photos/200?random=16', categoria: 'Luxo',
    portfolio: ['https://picsum.photos/200?random=105'],
    seguidores: [],
    posts: [
      { id: 'p4', imagem: 'https://picsum.photos/400/400?random=4', desc: 'Minimalismo italiano 🤍', likes: 567, data: '12h atrás' },
    ]
  },
];

// ============ TELA DE LOGIN / CADASTRO ============
function LoginScreen({ onLogin }) {
  const [tipo, setTipo] = useState('cliente');
  const [nome, setNome] = useState('');
  const [usuario, setUsuario] = useState('');
  const [bio, setBio] = useState('');
  const [categoria, setCategoria] = useState('');
  const [foto, setFoto] = useState('https://picsum.photos/200?random=' + Math.floor(Math.random() * 100));

  const handleEntrar = () => {
    if (!nome.trim() || !usuario.trim()) {
      Alert.alert('Erro', 'Preencha nome e usuário!');
      return;
    }
    const novoUsuario = {
      id: 'u' + Date.now(),
      tipo: tipo,
      nome: nome.trim(),
      usuario: '@' + usuario.trim().replace('@', ''),
      bio: bio.trim() || 'Novo no Grifferz',
      foto: foto,
      categoria: tipo === 'marca' ? (categoria.trim() || 'Moda') : '',
      portfolio: tipo === 'marca' ? [] : [],
      seguidores: [],
      seguindo: [],
      posts: tipo === 'marca' ? [] : [],
    };
    onLogin(novoUsuario);
  };

  const novaFoto = () => {
    setFoto('https://picsum.photos/200?random=' + Math.floor(Math.random() * 1000));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ padding: 20, paddingTop: 60 }}>
        <Text style={styles.logoGrande}>GRIFFERZ</Text>
        <Text style={{ color: C.prataEscuro, textAlign: 'center', marginBottom: 30 }}>
          Marketplace de Marcas Independentes
        </Text>

        {/* Seletor de tipo */}
        <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 10, marginBottom: 20 }}>
          <TouchableOpacity
            style={[styles.tipoBtn, tipo === 'cliente' && styles.tipoBtnAtivo]}
            onPress={() => setTipo('cliente')}
          >
            <Ionicons name="person" size={20} color={tipo === 'cliente' ? C.branco : C.prataEscuro} />
            <Text style={{ color: tipo === 'cliente' ? C.branco : C.prataEscuro, marginLeft: 5 }}>Cliente</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tipoBtn, tipo === 'marca' && styles.tipoBtnAtivo]}
            onPress={() => setTipo('marca')}
          >
            <Ionicons name="storefront" size={20} color={tipo === 'marca' ? C.branco : C.prataEscuro} />
            <Text style={{ color: tipo === 'marca' ? C.branco : C.prataEscuro, marginLeft: 5 }}>Marca</Text>
          </TouchableOpacity>
        </View>

        {/* Foto de perfil */}
        <View style={{ alignItems: 'center', marginBottom: 20 }}>
          <Image source={{ uri: foto }} style={styles.fotoLogin} />
          <TouchableOpacity onPress={novaFoto} style={{ marginTop: 8 }}>
            <Text style={{ color: C.roxoClaro, fontSize: 12 }}>Nova foto aleatória</Text>
          </TouchableOpacity>
        </View>

        {/* Campos */}
        <TextInput style={styles.input} placeholder="Nome completo ou Nome da Marca" placeholderTextColor={C.prataEscuro} value={nome} onChangeText={setNome} />
        <TextInput style={styles.input} placeholder="Usuário (@)" placeholderTextColor={C.prataEscuro} value={usuario} onChangeText={setUsuario} />
        <TextInput style={styles.input} placeholder="Bio" placeholderTextColor={C.prataEscuro} value={bio} onChangeText={setBio} multiline />

        {tipo === 'marca' && (
          <TextInput style={styles.input} placeholder="Categoria (ex: Streetwear, Luxo)" placeholderTextColor={C.prataEscuro} value={categoria} onChangeText={setCategoria} />
        )}

        {/* Botão */}
        <TouchableOpacity style={styles.btnEntrar} onPress={handleEntrar}>
          <Text style={{ color: C.branco, fontWeight: '700', fontSize: 16 }}>
            {tipo === 'marca' ? '🏪 Entrar como Marca' : '👤 Entrar como Cliente'}
          </Text>
        </TouchableOpacity>

        <Text style={{ color: C.prataEscuro, textAlign: 'center', marginTop: 15, fontSize: 11 }}>
          Dados salvos localmente neste dispositivo.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

// ============ TELA HOME (Timeline) ============
function HomeScreen({ usuario, marcas, setMarcas }) {
  const [novoPostImagem, setNovoPostImagem] = useState('');
  const [novoPostDesc, setNovoPostDesc] = useState('');
  const [mostrarForm, setMostrarForm] = useState(false);

  const adicionarPost = () => {
    if (!novoPostImagem.trim() || !novoPostDesc.trim()) {
      Alert.alert('Erro', 'Preencha imagem e descrição!');
      return;
    }
    const marcasAtualizadas = marcas.map(m => {
      if (m.id === usuario.id) {
        return {
          ...m,
          posts: [...m.posts, {
            id: 'p' + Date.now(),
            imagem: novoPostImagem.trim(),
            desc: novoPostDesc.trim(),
            likes: 0,
            data: 'Agora'
          }]
        };
      }
      return m;
    });
    setMarcas(marcasAtualizadas);
    setNovoPostImagem('');
    setNovoPostDesc('');
    setMostrarForm(false);
  };

  // ✅ CORREÇÃO: Marcas veem TODAS as marcas + seus próprios posts
  // Clientes veem apenas marcas que seguem
  let timelinePosts = [];
  
  if (usuario.tipo === 'marca') {
    // Marcas veem posts de TODAS as marcas
    marcas.forEach(marca => {
      if (marca.tipo === 'marca') {
        marca.posts.forEach(p => {
          timelinePosts.push({ ...p, marcaNome: marca.nome, marcaFoto: marca.foto, marcaId: marca.id });
        });
      }
    });
  } else {
    // Clientes veem posts das marcas que seguem
    marcas.forEach(marca => {
      if (usuario.seguindo && usuario.seguindo.includes(marca.id)) {
        marca.posts.forEach(p => {
          timelinePosts.push({ ...p, marcaNome: marca.nome, marcaFoto: marca.foto, marcaId: marca.id });
        });
      }
    });
  }
  
  timelinePosts.sort((a, b) => b.id.localeCompare(a.id));

  const renderPost = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Image source={{ uri: item.marcaFoto }} style={styles.avatarPequeno} />
        <Text style={{ color: C.prata, fontWeight: '700', flex: 1 }}>{item.marcaNome}</Text>
        <Text style={{ color: C.prataEscuro, fontSize: 10 }}>{item.data}</Text>
      </View>
      <Image source={{ uri: item.imagem }} style={styles.postImage} />
      <View style={styles.cardFooter}>
        <Text style={{ color: C.prata, fontWeight: 'bold' }}>{item.likes} curtidas</Text>
        <Text style={{ color: C.prataEscuro, marginTop: 4 }}>
          <Text style={{ color: C.prata, fontWeight: '700' }}>{item.marcaNome}</Text> {item.desc}
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.logo}>GRIFFERZ</Text>
        <View style={{ flexDirection: 'row', gap: 15, alignItems: 'center' }}>
          {usuario.tipo === 'marca' && (
            <TouchableOpacity onPress={() => setMostrarForm(!mostrarForm)} style={styles.btnNovoPost}>
              <Ionicons name="add-circle" size={22} color={C.roxo} />
              <Text style={{ color: C.roxo, marginLeft: 4 }}>Novo Post</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {mostrarForm && usuario.tipo === 'marca' && (
        <View style={styles.formPost}>
          <Text style={{ color: C.prata, fontWeight: '700', marginBottom: 8 }}>Criar novo post</Text>
          <TextInput style={styles.input} placeholder="URL da imagem" placeholderTextColor={C.prataEscuro} value={novoPostImagem} onChangeText={setNovoPostImagem} />
          <TextInput style={styles.input} placeholder="Descrição do post" placeholderTextColor={C.prataEscuro} value={novoPostDesc} onChangeText={setNovoPostDesc} />
          <View style={{ flexDirection: 'row', gap: 10 }}>
            <TouchableOpacity style={styles.btnPostar} onPress={adicionarPost}>
              <Text style={{ color: C.branco, fontWeight: '700' }}>Postar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnCancelar} onPress={() => setMostrarForm(false)}>
              <Text style={{ color: C.prataEscuro }}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {timelinePosts.length === 0 ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 40 }}>
          <Ionicons name="newspaper-outline" size={60} color={C.borda} />
          <Text style={{ color: C.prataEscuro, textAlign: 'center', marginTop: 15 }}>
            {usuario.tipo === 'marca'
              ? 'Nenhum post ainda.\nCrie seu primeiro post!'
              : 'Siga marcas para ver os posts delas aqui!'}
          </Text>
        </View>
      ) : (
        <FlatList data={timelinePosts} renderItem={renderPost} keyExtractor={item => item.id} />
      )}
    </SafeAreaView>
  );
}

// ============ TELA SEARCHZ ============
function SearchzScreen({ usuario, marcas, setUsuario }) {
  const [search, setSearch] = useState('');
  
  // ✅ CORREÇÃO: Marcas e Clientes podem pesquisar todas as marcas
  const filtered = marcas.filter(m =>
    m.tipo === 'marca' &&
    (m.nome.toLowerCase().includes(search.toLowerCase()) ||
     m.usuario.toLowerCase().includes(search.toLowerCase()) ||
     m.categoria.toLowerCase().includes(search.toLowerCase()))
  );

  const seguirMarca = (marcaId) => {
    if (!usuario.seguindo) usuario.seguindo = [];
    if (usuario.seguindo.includes(marcaId)) {
      usuario.seguindo = usuario.seguindo.filter(id => id !== marcaId);
    } else {
      usuario.seguindo.push(marcaId);
    }
    setUsuario({ ...usuario });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Searchz</Text>
      <TextInput style={styles.searchInput} placeholder="Buscar marcas..." placeholderTextColor={C.prataEscuro} value={search} onChangeText={setSearch} />
      <FlatList
        data={filtered}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.searchCard}>
            <Image source={{ uri: item.foto }} style={styles.collabImage} />
            <View style={{ flex: 1 }}>
              <Text style={{ color: C.prata, fontWeight: '700' }}>{item.nome}</Text>
              <Text style={{ color: C.prataEscuro, fontSize: 12 }}>{item.usuario}</Text>
              <Text style={{ color: C.roxoClaro, fontSize: 11 }}>{item.categoria}</Text>
              <Text style={{ color: C.prataEscuro, fontSize: 10 }}>{item.seguidores.length} seguidores</Text>
            </View>
            {/* ✅ CORREÇÃO: Marcas TAMBÉM podem seguir outras marcas */}
            <TouchableOpacity
              style={[styles.btnSeguir, usuario.seguindo && usuario.seguindo.includes(item.id) && styles.btnSeguindo]}
              onPress={() => seguirMarca(item.id)}
            >
              <Text style={{ color: C.branco, fontSize: 12 }}>
                {usuario.seguindo && usuario.seguindo.includes(item.id) ? 'Seguindo' : 'Seguir'}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

// ============ TELA PERFIL ============
function ProfileScreen({ usuario, setUsuario }) {
  const [editing, setEditing] = useState(false);
  const [nome, setNome] = useState(usuario.nome);
  const [bioEdit, setBioEdit] = useState(usuario.bio);
  const [fotoEdit, setFotoEdit] = useState(usuario.foto);

  const salvarPerfil = () => {
    setUsuario({ ...usuario, nome, bio: bioEdit, foto: fotoEdit });
    setEditing(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={{ paddingTop: 50, alignItems: 'center', paddingHorizontal: 20 }}>
          <TouchableOpacity style={{ position: 'absolute', right: 16, top: 55 }} onPress={() => setEditing(!editing)}>
            <Text style={{ color: C.roxo }}>Editar</Text>
          </TouchableOpacity>

          <Image source={{ uri: usuario.foto }} style={styles.profilePic} />
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10, gap: 5 }}>
            <Text style={{ color: C.prata, fontSize: 22, fontWeight: '700' }}>{usuario.nome}</Text>
            {usuario.tipo === 'marca' && (
              <Ionicons name="checkmark-circle" size={20} color={C.roxo} />
            )}
          </View>
          <Text style={{ color: C.prataEscuro, fontSize: 14 }}>{usuario.usuario}</Text>
          <Text style={{ color: C.roxoClaro, fontSize: 11, marginTop: 2 }}>{usuario.tipo === 'marca' ? '🏪 Marca' : '👤 Cliente'}</Text>
          <Text style={{ color: C.prataEscuro, textAlign: 'center', marginTop: 8 }}>{usuario.bio}</Text>

          {usuario.tipo === 'marca' && (
            <>
              <Text style={{ color: C.roxoClaro, fontSize: 13, marginTop: 5 }}>{usuario.categoria}</Text>
              <View style={{ flexDirection: 'row', gap: 20, marginTop: 10 }}>
                <Text style={{ color: C.prata, fontWeight: '700' }}>{usuario.posts.length} posts</Text>
                <Text style={{ color: C.prata, fontWeight: '700' }}>{usuario.seguidores.length} seguidores</Text>
                <Text style={{ color: C.prata, fontWeight: '700' }}>{usuario.seguindo ? usuario.seguindo.length : 0} seguindo</Text>
              </View>

              {usuario.portfolio && usuario.portfolio.length > 0 && (
                <View style={{ marginTop: 20, width: '100%' }}>
                  <Text style={{ color: C.prata, fontWeight: '700', marginBottom: 8 }}>Portfólio</Text>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {usuario.portfolio.map((img, i) => (
                      <Image key={i} source={{ uri: img }} style={styles.portfolioImg} />
                    ))}
                  </ScrollView>
                </View>
              )}

              {usuario.posts && usuario.posts.length > 0 && (
                <View style={{ marginTop: 20, width: '100%' }}>
                  <Text style={{ color: C.prata, fontWeight: '700', marginBottom: 8 }}>Posts recentes</Text>
                  {usuario.posts.slice(-3).reverse().map((post, i) => (
                    <View key={i} style={{ marginBottom: 10 }}>
                      <Image source={{ uri: post.imagem }} style={{ width: '100%', height: 200, borderRadius: 12 }} />
                      <Text style={{ color: C.prataEscuro, marginTop: 4 }}>{post.desc}</Text>
                    </View>
                  ))}
                </View>
              )}
            </>
          )}

          {usuario.tipo === 'cliente' && usuario.seguindo && (
            <View style={{ marginTop: 20, width: '100%' }}>
              <Text style={{ color: C.prata, fontWeight: '700', marginBottom: 10 }}>Seguindo ({usuario.seguindo.length})</Text>
              <Text style={{ color: C.prataEscuro, fontSize: 12 }}>Marcas que você segue aparecerão na sua timeline.</Text>
            </View>
          )}
        </View>
      </ScrollView>

      <Modal visible={editing} animationType="slide" transparent>
        <View style={styles.modal}>
          <View style={styles.modalContent}>
            <Text style={{ color: C.prata, fontSize: 20, fontWeight: '700', marginBottom: 20 }}>Editar Perfil</Text>
            <Text style={{ color: C.prataEscuro, fontSize: 11, marginBottom: 4 }}>URL da Foto</Text>
            <TextInput style={styles.editInput} value={fotoEdit} onChangeText={setFotoEdit} placeholderTextColor={C.prataEscuro} />
            <Text style={{ color: C.prataEscuro, fontSize: 11, marginBottom: 4, marginTop: 10 }}>Nome</Text>
            <TextInput style={styles.editInput} value={nome} onChangeText={setNome} placeholderTextColor={C.prataEscuro} />
            <Text style={{ color: C.prataEscuro, fontSize: 11, marginBottom: 4, marginTop: 10 }}>Bio</Text>
            <TextInput style={[styles.editInput, { height: 80 }]} value={bioEdit} onChangeText={setBioEdit} multiline placeholderTextColor={C.prataEscuro} />
            <View style={{ flexDirection: 'row', gap: 10, marginTop: 20 }}>
              <TouchableOpacity style={styles.btnCancelarModal} onPress={() => setEditing(false)}>
                <Text style={{ color: C.prataEscuro }}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btnSalvar} onPress={salvarPerfil}>
                <Text style={{ color: C.branco, fontWeight: '700' }}>Salvar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

// ============ TELA DROPS ============
function DropsScreen({ usuario, marcas, setMarcas }) {
  const [novoDropImg, setNovoDropImg] = useState('');
  const [novoDropNome, setNovoDropNome] = useState('');
  const [novoDropPreco, setNovoDropPreco] = useState('');
  const [mostrarForm, setMostrarForm] = useState(false);

  const adicionarDrop = () => {
    if (!novoDropImg.trim() || !novoDropNome.trim() || !novoDropPreco.trim()) return;
    const marcasAtualizadas = marcas.map(m => {
      if (m.id === usuario.id) {
        const novoPortfolio = [...(m.portfolio || []), novoDropImg.trim()];
        return { ...m, portfolio: novoPortfolio };
      }
      return m;
    });
    setMarcas(marcasAtualizadas);
    setNovoDropImg('');
    setNovoDropNome('');
    setNovoDropPreco('');
    setMostrarForm(false);
  };

  // Coletar produtos de todas as marcas
  let todosDrops = [];
  marcas.forEach(marca => {
    if (marca.tipo === 'marca' && marca.portfolio) {
      marca.portfolio.forEach(img => {
        todosDrops.push({
          id: 'd' + Math.random(),
          marcaNome: marca.nome,
          marcaFoto: marca.foto,
          imagem: img,
          nome: 'Produto ' + marca.nome,
          preco: 'Sob consulta'
        });
      });
    }
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.headerSemPadding}>Drops 🔥</Text>
        {usuario.tipo === 'm
