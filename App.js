import React, { useState, useEffect } from 'react';
import {
  View, Text, Image, FlatList, TouchableOpacity, TextInput,
  StyleSheet, ScrollView, SafeAreaView, Modal, Alert,
  ActivityIndicator, KeyboardAvoidingView, Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import * as Facebook from 'expo-auth-session/providers/facebook';
import * as SecureStore from 'expo-secure-store';

WebBrowser.maybeCompleteAuthSession();

// ============ CORES ============
const C = {
  bg: '#0a0a0a',
  prata: '#c0c0c0',
  prataEscuro: '#a0a0a0',
  roxo: '#7b2ff7',
  roxoClaro: '#9d4eff',
  roxoEscuro: '#5a1db8',
  branco: '#ffffff',
  card: '#111111',
  borda: '#1a1a1a',
  sucesso: '#4caf50',
  erro: '#ff2d55',
  input: '#1a1a1a',
};

// ============ DADOS INICIAIS ============
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
    portfolio: ['https://picsum.photos/200?random=103'],
    seguidores: [],
    posts: [
      { id: 'p3', imagem: 'https://picsum.photos/400/400?random=3', desc: 'Sneakers oversized 🔥', likes: 892, data: '8h atrás' },
    ]
  },
  {
    id: 'm3', tipo: 'marca', nome: 'Prada', usuario: '@prada', bio: 'Elegance and innovation',
    foto: 'https://picsum.photos/200?random=16', categoria: 'Luxo',
    portfolio: ['https://picsum.photos/200?random=105', 'https://picsum.photos/200?random=106'],
    seguidores: [],
    posts: [
      { id: 'p4', imagem: 'https://picsum.photos/400/400?random=4', desc: 'Minimalismo italiano 🤍', likes: 567, data: '12h atrás' },
    ]
  },
];

// ============ BANCO DE USUÁRIOS LOCAL ============
const USUARIOS_PADRAO = [
  {
    id: 'admin1',
    email: 'admin@grifferz.com',
    senha: 'admin123',
    tipo: 'marca',
    nome: 'Admin Marca',
    usuario: '@admin',
    bio: 'Admin da plataforma',
    foto: 'https://picsum.photos/200?random=1',
    categoria: 'Luxo',
    portfolio: [],
    seguidores: [],
    seguindo: [],
    posts: [],
  }
];

let bancoUsuarios = [...USUARIOS_PADRAO];

// ============ FUNÇÕES DE AUTENTICAÇÃO ============
const salvarSessao = async (usuario) => {
  try {
    await SecureStore.setItemAsync('grifferz_user', JSON.stringify(usuario));
  } catch (e) {
    console.log('Erro ao salvar sessão:', e);
  }
};

const carregarSessao = async () => {
  try {
    const data = await SecureStore.getItemAsync('grifferz_user');
    return data ? JSON.parse(data) : null;
  } catch (e) {
    return null;
  }
};

const removerSessao = async () => {
  try {
    await SecureStore.deleteItemAsync('grifferz_user');
  } catch (e) {
    console.log('Erro ao remover sessão:', e);
  }
};

// ============ TELA DE LOGIN (NOVA - TOTALMENTE FUNCIONAL) ============
function LoginScreen({ onLogin }) {
  const [modo, setModo] = useState('login'); // 'login' | 'cadastro' | 'recuperar'
  const [tipo, setTipo] = useState('cliente');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [nome, setNome] = useState('');
  const [usuario, setUsuario] = useState('');
  const [categoria, setCategoria] = useState('');
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);

  // Google Auth
  const [googleRequest, googleResponse, googlePrompt] = Google.useAuthRequest({
    androidClientId: 'SEU_ANDROID_CLIENT_ID.apps.googleusercontent.com',
    webClientId: 'SEU_WEB_CLIENT_ID.apps.googleusercontent.com',
    expoClientId: 'SEU_EXPO_CLIENT_ID.apps.googleusercontent.com',
  });

  // Facebook Auth
  const [fbRequest, fbResponse, fbPrompt] = Facebook.useAuthRequest({
    clientId: 'SEU_FACEBOOK_APP_ID',
  });

  // Efeito para Google Login
  useEffect(() => {
    if (googleResponse?.type === 'success') {
      const { authentication } = googleResponse;
      fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: { Authorization: `Bearer ${authentication.accessToken}` }
      })
      .then(res => res.json())
      .then(data => {
        const novoUsuario = {
          id: 'g_' + data.sub,
          email: data.email,
          tipo: 'cliente',
          nome: data.name || data.email.split('@')[0],
          usuario: '@' + (data.email.split('@')[0]),
          bio: 'Usuário Google',
          foto: data.picture || 'https://picsum.photos/200?random=' + Math.floor(Math.random() * 100),
          categoria: '',
          portfolio: [],
          seguidores: [],
          seguindo: [],
          posts: [],
        };
        bancoUsuarios.push(novoUsuario);
        salvarSessao(novoUsuario);
        onLogin(novoUsuario);
      })
      .catch(err => {
        setErro('Erro ao obter dados do Google');
        setLoading(false);
      });
    }
  }, [googleResponse]);

  // Efeito para Facebook Login
  useEffect(() => {
    if (fbResponse?.type === 'success') {
      const { authentication } = fbResponse;
      fetch(`https://graph.facebook.com/me?fields=id,name,email,picture&access_token=${authentication.accessToken}`)
      .then(res => res.json())
      .then(data => {
        const novoUsuario = {
          id: 'fb_' + data.id,
          email: data.email || data.id + '@facebook.com',
          tipo: 'cliente',
          nome: data.name || 'Usuário Facebook',
          usuario: '@' + (data.name ? data.name.replace(/\s/g, '').toLowerCase() : data.id),
          bio: 'Usuário Facebook',
          foto: data.picture?.data?.url || 'https://picsum.photos/200?random=' + Math.floor(Math.random() * 100),
          categoria: '',
          portfolio: [],
          seguidores: [],
          seguindo: [],
          posts: [],
        };
        bancoUsuarios.push(novoUsuario);
        salvarSessao(novoUsuario);
        onLogin(novoUsuario);
      })
      .catch(err => {
        setErro('Erro ao obter dados do Facebook');
        setLoading(false);
      });
    }
  }, [fbResponse]);

  // Limpar erro ao trocar de modo
  useEffect(() => {
    setErro('');
  }, [modo]);

  const validarEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleLogin = () => {
    setErro('');
    
    if (!email.trim() || !senha.trim()) {
      setErro('Preencha email e senha!');
      return;
    }
    
    if (!validarEmail(email.trim())) {
      setErro('Email inválido!');
      return;
    }

    setLoading(true);
    
    // Simular delay de rede
    setTimeout(() => {
      const usuarioEncontrado = bancoUsuarios.find(u => u.email === email.trim() && u.senha === senha);
      
      if (usuarioEncontrado) {
        salvarSessao(usuarioEncontrado);
        onLogin(usuarioEncontrado);
      } else {
        setErro('Email ou senha incorretos!');
        setLoading(false);
      }
    }, 800);
  };

  const handleCadastro = () => {
    setErro('');

    if (!nome.trim() || !email.trim() || !senha.trim() || !usuario.trim()) {
      setErro('Preencha todos os campos!');
      return;
    }

    if (!validarEmail(email.trim())) {
      setErro('Email inválido!');
      return;
    }

    if (senha.length < 6) {
      setErro('A senha deve ter no mínimo 6 caracteres!');
      return;
    }

    if (senha !== confirmarSenha) {
      setErro('As senhas não conferem!');
      return;
    }

    const emailExiste = bancoUsuarios.find(u => u.email === email.trim());
    if (emailExiste) {
      setErro('Este email já está cadastrado!');
      return;
    }

    const usuarioExiste = bancoUsuarios.find(u => u.usuario === '@' + usuario.trim().replace('@', ''));
    if (usuarioExiste) {
      setErro('Este nome de usuário já está em uso!');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const novoUsuario = {
        id: 'u_' + Date.now(),
        email: email.trim(),
        senha: senha,
        tipo: tipo,
        nome: nome.trim(),
        usuario: '@' + usuario.trim().replace('@', ''),
        bio: 'Novo no Grifferz',
        foto: 'https://picsum.photos/200?random=' + Math.floor(Math.random() * 1000),
        categoria: tipo === 'marca' ? (categoria.trim() || 'Moda') : '',
        portfolio: tipo === 'marca' ? [] : [],
        seguidores: [],
        seguindo: [],
        posts: tipo === 'marca' ? [] : [],
      };

      bancoUsuarios.push(novoUsuario);
      salvarSessao(novoUsuario);
      onLogin(novoUsuario);
    }, 800);
  };

  const handleRecuperarSenha = () => {
    setErro('');
    
    if (!email.trim() || !validarEmail(email.trim())) {
      setErro('Digite um email válido para recuperação!');
      return;
    }

    const usuarioExiste = bancoUsuarios.find(u => u.email === email.trim());
    if (!usuarioExiste) {
      setErro('Email não encontrado em nossa base!');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      Alert.alert(
        'Recuperação de Senha',
        'Um link de recuperação foi enviado para ' + email.trim() + '\n\n(Simulação - Em produção, um email real seria enviado)',
        [{ text: 'OK', onPress: () => setModo('login') }]
      );
    }, 1500);
  };

  const handleGoogleLogin = () => {
    setErro('');
    setLoading(true);
    googlePrompt();
    setTimeout(() => setLoading(false), 3000);
  };

  const handleFacebookLogin = () => {
    setErro('');
    setLoading(true);
    fbPrompt();
    setTimeout(() => setLoading(false), 3000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.loginScroll} keyboardShouldPersistTaps="handled">
          
          {/* Logo */}
          <View style={styles.loginLogoContainer}>
            <Ionicons name="diamond" size={60} color={C.roxo} />
            <Text style={styles.logoGrande}>GRIFFERZ</Text>
            <Text style={styles.loginSubtitulo}>Marketplace de Marcas Independentes</Text>
          </View>

          {/* Seletor de modo */}
          {modo !== 'recuperar' && (
            <View style={styles.modoSelector}>
              <TouchableOpacity 
                style={[styles.modoBtn, modo === 'login' && styles.modoBtnAtivo]}
                onPress={() => setModo('login')}
              >
                <Text style={{ color: modo === 'login' ? C.branco : C.prataEscuro, fontWeight: '600' }}>Entrar</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.modoBtn, modo === 'cadastro' && styles.modoBtnAtivo]}
                onPress={() => setModo('cadastro')}
              >
                <Text style={{ color: modo === 'cadastro' ? C.branco : C.prataEscuro, fontWeight: '600' }}>Criar Conta</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Mensagem de erro */}
          {erro ? (
            <View style={styles.erroContainer}>
              <Ionicons name="alert-circle" size={18} color={C.erro} />
              <Text style={styles.erroTexto}>{erro}</Text>
            </View>
          ) : null}

          {/* ===== MODO LOGIN ===== */}
          {modo === 'login' && (
            <View style={styles.formContainer}>
              <View style={styles.inputWrapper}>
                <Ionicons name="mail-outline" size={20} color={C.prataEscuro} style={styles.inputIcon} />
                <TextInput
                  style={styles.inputLogin}
                  placeholder="Email"
                  placeholderTextColor={C.prataEscuro}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>

              <View style={styles.inputWrapper}>
                <Ionicons name="lock-closed-outline" size={20} color={C.prataEscuro} style={styles.inputIcon} />
                <TextInput
                  style={styles.inputLogin}
                  placeholder="Senha"
                  placeholderTextColor={C.prataEscuro}
                  value={senha}
                  onChangeText={setSenha}
                  secureTextEntry={!mostrarSenha}
                />
                <TouchableOpacity onPress={() => setMostrarSenha(!mostrarSenha)} style={styles.eyeBtn}>
                  <Ionicons name={mostrarSenha ? "eye-off-outline" : "eye-outline"} size={20} color={C.prataEscuro} />
                </TouchableOpacity>
              </View>

              <TouchableOpacity onPress={() => setModo('recuperar')} style={{ alignSelf: 'flex-end', marginBottom: 20 }}>
                <Text style={{ color: C.roxoClaro, fontSize: 12 }}>Esqueceu a senha?</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.btnPrincipal, loading && styles.btnDesativado]} 
                onPress={handleLogin}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color={C.branco} />
                ) : (
                  <Text style={styles.btnPrincipalTexto}>Entrar</Text>
                )}
              </TouchableOpacity>

              {/* Redes sociais */}
              <View style={styles.divisor}>
                <View style={styles.linhaDivisor} />
                <Text style={{ color: C.prataEscuro, marginHorizontal: 10 }}>ou continue com</Text>
                <View style={styles.linhaDivisor} />
              </View>

              <View style={styles.redesContainer}>
                <TouchableOpacity style={styles.btnRede} onPress={handleGoogleLogin} disabled={!googleRequest}>
                  <Ionicons name="logo-google" size={22} color="#ea4335" />
                  <Text style={{ color: C.prataEscuro, marginLeft: 8 }}>Google</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btnRede} onPress={handleFacebookLogin} disabled={!fbRequest}>
                  <Ionicons name="logo-facebook" size={22} color="#1877f2" />
                  <Text style={{ color: C.prataEscuro, marginLeft: 8 }}>Facebook</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* ===== MODO CADASTRO ===== */}
          {modo === 'cadastro' && (
            <View style={styles.formContainer}>
              {/* Seletor de tipo */}
              <View style={styles.tipoSelector}>
                <TouchableOpacity
                  style={[styles.tipoBtn, tipo === 'cliente' && styles.tipoBtnAtivo]}
                  onPress={() => setTipo('cliente')}
                >
                  <Ionicons name="person" size={18} color={tipo === 'cliente' ? C.branco : C.prataEscuro} />
                  <Text style={{ color: tipo === 'cliente' ? C.branco : C.prataEscuro, marginLeft: 5, fontSize: 12 }}>Cliente</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.tipoBtn, tipo === 'marca' && styles.tipoBtnAtivo]}
                  onPress={() => setTipo('marca')}
                >
                  <Ionicons name="storefront" size={18} color={tipo === 'marca' ? C.branco : C.prataEscuro} />
                  <Text style={{ color: tipo === 'marca' ? C.branco : C.prataEscuro, marginLeft: 5, fontSize: 12 }}>Marca</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.inputWrapper}>
                <Ionicons name="person-outline" size={20} color={C.prataEscuro} style={styles.inputIcon} />
                <TextInput style={styles.inputLogin} placeholder={tipo === 'marca' ? 'Nome da Marca' : 'Nome completo'} placeholderTextColor={C.prataEscuro} value={nome} onChangeText={setNome} />
              </View>

              <View style={styles.inputWrapper}>
                <Ionicons name="at-outline" size={20} color={C.prataEscuro} style={styles.inputIcon} />
                <TextInput style={styles.inputLogin} placeholder="Nome de usuário (@)" placeholderTextColor={C.prataEscuro} value={usuario} onChangeText={setUsuario} autoCapitalize="none" />
              </View>

              <View style={styles.inputWrapper}>
                <Ionicons name="mail-outline" size={20} color={C.prataEscuro} style={styles.inputIcon} />
                <TextInput style={styles.inputLogin} placeholder="Email" placeholderTextColor={C.prataEscuro} value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
              </View>

              {tipo === 'marca' && (
                <View style={styles.inputWrapper}>
                  <Ionicons name="pricetag-outline" size={20} color={C.prataEscuro} style={styles.inputIcon} />
                  <TextInput style={styles.inputLogin} placeholder="Categoria (ex: Streetwear, Luxo)" placeholderTextColor={C.prataEscuro} value={categoria} onChangeText={setCategoria} />
                </View>
              )}

              <View style={styles.inputWrapper}>
                <Ionicons name="lock-closed-outline" size={20} color={C.prataEscuro} style={styles.inputIcon} />
                <TextInput style={styles.inputLogin} placeholder="Senha (mín. 6 caracteres)" placeholderTextColor={C.prataEscuro} value={senha} onChangeText={setSenha} secureTextEntry={!mostrarSenha} />
                <TouchableOpacity onPress={() => setMostrarSenha(!mostrarSenha)} style={styles.eyeBtn}>
                  <Ionicons name={mostrarSenha ? "eye-off-outline" : "eye-outline"} size={20} color={C.prataEscuro} />
                </TouchableOpacity>
              </View>

              <View style={styles.inputWrapper}>
                <Ionicons name="lock-closed-outline" size={20} color={C.prataEscuro} style={styles.inputIcon} />
                <TextInput style={styles.inputLogin} placeholder="Confirmar senha" placeholderTextColor={C.prataEscuro} value={confirmarSenha} onChangeText={setConfirmarSenha} secureTextEntry={!mostrarSenha} />
              </View>

              <TouchableOpacity 
                style={[styles.btnPrincipal, loading && styles.btnDesativado]} 
                onPress={handleCadastro}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color={C.branco} />
                ) : (
                  <Text style={styles.btnPrincipalTexto}>Criar Conta</Text>
                )}
              </TouchableOpacity>

              <TouchableOpacity onPress={() => setModo('login')} style={{ marginTop: 15 }}>
                <Text style={{ color: C.prataEscuro, textAlign: 'center' }}>
                  Já tem uma conta? <Text style={{ color: C.roxoClaro }}>Entrar</Text>
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {/* ===== MODO RECUPERAR SENHA ===== */}
          {modo === 'recuperar' && (
            <View style={styles.formContainer}>
              <Text style={{ color: C.prata, fontSize: 18, fontWeight: '700', textAlign: 'center', marginBottom: 20 }}>
                Recuperar Senha
              </Text>
              <Text style={{ color: C.prataEscuro, textAlign: 'center', marginBottom: 20, fontSize: 13 }}>
                Digite seu email para receber um link de recuperação.
              </Text>

              <View style={styles.inputWrapper}>
                <Ionicons name="mail-outline" size={20} color={C.prataEscuro} style={styles.inputIcon} />
                <TextInput style={styles.inputLogin} placeholder="Email" placeholderTextColor={C.prataEscuro} value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
              </View>

              <TouchableOpacity 
                style={[styles.btnPrincipal, loading && styles.btnDesativado]} 
                onPress={handleRecuperarSenha}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color={C.branco} />
                ) : (
                  <Text style={styles.btnPrincipalTexto}>Enviar Link</Text>
                )}
              </TouchableOpacity>

              <TouchableOpacity onPress={() => { setModo('login'); setErro(''); }} style={{ marginTop: 15 }}>
                <Text style={{ color: C.roxoClaro, textAlign: 'center' }}>← Voltar para o login</Text>
              </TouchableOpacity>
            </View>
          )}

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// ============ TELA HOME ============
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
        return { ...m, posts: [...m.posts, { id: 'p' + Date.now(), imagem: novoPostImagem.trim(), desc: novoPostDesc.trim(), likes: 0, data: 'Agora' }] };
      }
      return m;
    });
    setMarcas(marcasAtualizadas);
    setNovoPostImagem('');
    setNovoPostDesc('');
    setMostrarForm(false);
  };

  let timelinePosts = [];
  if (usuario.tipo === 'marca') {
    marcas.forEach(marca => {
      if (marca.tipo === 'marca') {
        marca.posts.forEach(p => timelinePosts.push({ ...p, marcaNome: marca.nome, marcaFoto: marca.foto, marcaId: marca.id }));
      }
    });
  } else {
    marcas.forEach(marca => {
      if (usuario.seguindo && usuario.seguindo.includes(marca.id)) {
        marca.posts.forEach(p => timelinePosts.push({ ...p, marcaNome: marca.nome, marcaFoto: marca.foto, marcaId: marca.id }));
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
        {usuario.tipo === 'marca' && (
          <TouchableOpacity onPress={() => setMostrarForm(!mostrarForm)} style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name="add-circle" size={22} color={C.roxo} />
            <Text style={{ color: C.roxo, marginLeft: 4, fontSize: 13 }}>Novo Post</Text>
          </TouchableOpacity>
        )}
      </View>

      {mostrarForm && usuario.tipo === 'marca' && (
        <View style={styles.formPost}>
          <Text style={{ color: C.prata, fontWeight: '700', marginBottom: 8 }}>Criar novo post</Text>
          <TextInput style={styles.inputPost} placeholder="URL da imagem" placeholderTextColor={C.prataEscuro} value={novoPostImagem} onChangeText={setNovoPostImagem} />
          <TextInput style={styles.inputPost} placeholder="Descrição" placeholderTextColor={C.prataEscuro} value={novoPostDesc} onChangeText={setNovoPostDesc} />
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
            {usuario.tipo === 'marca' ? 'Nenhum post ainda.\nCrie seu primeiro post!' : 'Siga marcas para ver os posts delas aqui!'}
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
  const filtered = marcas.filter(m =>
    m.tipo === 'marca' && (m.nome.toLowerCase().includes(search.toLowerCase()) || m.usuario.toLowerCase().includes(search.toLowerCase()) || m.categoria.toLowerCase().includes(search.toLowerCase()))
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
            </View>
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
function ProfileScreen({ usuario, setUsuario, onLogout }) {
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
          <View style={{ flexDirection: 'row', position: 'absolute', right: 16, top: 55, gap: 15 }}>
            <TouchableOpacity onPress={() => setEditing(!editing)}>
              <Text style={{ color: C.roxo, fontSize: 13 }}>Editar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onLogout}>
              <Text style={{ color: C.erro, fontSize: 13 }}>Sair</Text>
            </TouchableOpacity>
          </View>

          <Image source={{ uri: usuario.foto }} style={styles.profilePic} />
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10, gap: 5 }}>
            <Text style={{ color: C.prata, fontSize: 22, fontWeight: '700' }}>{usuario.nome}</Text>
            {usuario.tipo === 'marca' && <Ionicons name="checkmark-circle" size={20} color={C.roxo} />}
          </View>
          <Text style={{ color: C.prataEscuro, fontSize: 14 }}>{usuario.usuario}</Text>
          <Text style={{ color: C.roxoClaro, fontSize: 11 }}>{usuario.tipo === 'marca' ? '🏪 Marca' : '👤 Cliente'}</Text>
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
                  <ScrollView horizontal>
                    {usuario.portfolio.map((img, i) => <Image key={i} source={{ uri: img }} style={styles.portfolioImg} />)}
                  </ScrollView>
                </View>
              )}
            </>
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
        return { ...m, portfolio: [...(m.portfolio || []), novoDropImg.trim()] };
      }
      return m;
    });
    setMarcas(marcasAtualizadas);
    setNovoDropImg('');
    setNovoDropNome('');
    setNovoDropPreco('');
    setMostrarForm(false);
  };

  let todosDrops = [];
  marcas.forEach(marca => {
    if (marca.tipo === 'marca' && marca.portfolio) {
      marca.portfolio.forEach(img => {
        todosDrops.push({ id: 'd' + Math.random(), marcaNome: marca.nome, marcaFoto: marca.foto, imagem: img, nome: 'Produto ' + marca.nome, preco: 'Sob consulta' });
      });
    }
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBar}>
        <Text style={{ color: C.prata, fontSize: 26, fontWeight: '900', letterSpacing: 3 }}>Drops 🔥</Text>
        {usuario.tipo === 'marca' && (
          <TouchableOpacity onPress={() => setMostrarForm(!mostrarForm)}>
            <Ionicons name="add-circle" size={28} color={C.roxo} />
          </TouchableOpacity>
        )}
      </View>

      {mostrarForm && (
        <View style={styles.formPost}>
          <Text style={{ color: C.prata, fontWeight: '700', marginBottom: 8 }}>Adicionar ao portfólio</Text>
          <TextInput style={styles.inputPost} placeholder="URL da imagem" placeholderTextColor={C.prataEscuro} value={novoDropImg} onChangeText={setNovoDropImg} />
          <TextInput style={styles.inputPost} placeholder="Nome do produto" placeholderTextColor={C.prataEscuro} value={novoDropNome} onChangeText={setNovoDropNome} />
          <TextInput style={styles.inputPost} placeholder="Preço" placeholderTextColor={C.prataEscuro} value={novoDropPreco} onChangeText={setNovoDropPreco} />
          <View style={{ flexDirection: 'row', gap: 10 }}>
            <TouchableOpacity style={styles.btnPostar} onPress={adicionarDrop}>
              <Text style={{ color: C.branco, fontWeight: '700' }}>Adicionar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnCancelar} onPress={() => setMostrarForm(false)}>
              <Text style={{ color: C.prataEscuro }}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      <FlatList
        data={todosDrops}
        numColumns={2}
        keyExtractor={item => item.id}
        columnWrapperStyle={{ paddingHorizontal: 12, gap: 10 }}
        renderItem={({ item }) => (
          <View style={styles.dropCardGrid}>
            <Image source={{ uri: item.imagem }} style={styles.dropImageGrid} />
            <View style={{ padding: 8 }}>
              <Text style={{ color: C.prataEscuro, fontSize: 10 }}>{item.marcaNome}</Text>
              <Text style={{ color: C.prata, fontWeight: '600', fontSize: 12 }}>{item.nome}</Text>
              <Text style={{ color: C.roxoClaro, fontWeight: '700', fontSize: 13, marginTop: 4 }}>{item.preco}</Text>
              <TouchableOpacity style={styles.btnInteresse}>
                <Text style={{ color: C.branco, fontSize: 11 }}>Tenho interesse</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

// ============ TELA COLLABZ ============
function CollabzScreen({ usuario, marcas }) {
  const [selectedMarca, setSelectedMarca] = useState(null);
  const [mensagem, setMensagem] = useState('');

  if (selectedMarca) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.chatHeader}>
          <TouchableOpacity onPress={() => setSelectedMarca(null)}>
            <Ionicons name="arrow-back" size={24} color={C.prata} />
          </TouchableOpacity>
          <Image source={{ uri: selectedMarca.foto }} style={styles.chatAvatar} />
          <Text style={{ color: C.prata, fontWeight: '700', flex: 1 }}>{selectedMarca.nome}</Text>
        </View>
        {selectedMarca.portfolio && selectedMarca.portfolio.length > 0 && (
          <View style={{ padding: 12, borderBottomWidth: 1, borderColor: C.borda }}>
            <Text style={{ color: C.prataEscuro, fontSize: 11 }}>Portfólio:</Text>
            <ScrollView horizontal style={{ marginTop: 6 }}>
              {selectedMarca.portfolio.map((img, i) => <Image key={i} source={{ uri: img }} style={styles.portfolioImg} />)}
            </ScrollView>
          </View>
        )}
        <View style={styles.chatArea}>
          <View style={styles.brandMessage}><Text>Olá! Como podemos ajudar?</Text></View>
          {mensagem ? <View style={styles.userMessage}><Text style={{ color: C.branco }}>{mensagem}</Text></View> : null}
        </View>
        <View style={styles.chatInputContainer}>
          <TextInput style={styles.chatInput} placeholder="Mensagem..." placeholderTextColor={C.prataEscuro} value={mensagem} onChangeText={setMensagem} />
          <TouchableOpacity style={styles.sendButton} onPress={() => { if (mensagem.trim()) Alert.alert('Enviado!', 'A marca receberá seu contato.'); }}>
            <Ionicons name="send" size={20} color={C.branco} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Collabz 💬</Text>
      <FlatList
        data={marcas.filter(m => m.tipo === 'marca')}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.collabCard} onPress={() => setSelectedMarca(item)}>
            <Image source={{ uri: item.foto }} style={styles.collabImage} />
            <View style={{ flex: 1 }}>
              <Text style={{ color: C.prata, fontWeight: '700' }}>{item.nome}</Text>
              <Text style={{ color: C.prataEscuro, fontSize: 12 }}>{item.bio}</Text>
            </View>
            <Ionicons name="chatbubble-ellipses" size={22} color={C.roxo} />
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

// ============ APP PRINCIPAL ============
export default function App() {
  const [usuario, setUsuario] = useState(null);
  const [marcas, setMarcas] = useState(MARCAS_INICIAIS);
  const [tab, setTab] = useState('home');
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    carregarSessao().then(user => {
      if (user) {
        setUsuario(user);
      }
      setCarregando(false);
    });
  }, []);

  const handleLogin = (user) => {
    setUsuario(user);
    if (user.tipo === 'marca') {
      const existe = marcas.find(m => m.id === user.id);
      if (!existe) {
        setMarcas([...marcas, user]);
      }
    }
  };

  const handleLogout = async () => {
    await removerSessao();
    setUsuario(null);
    setTab('home');
  };

  if (carregando) {
    return (
      <View style={{ flex: 1, backgroundColor: C.bg, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={C.roxo} />
        <Text style={{ color: C.prata, marginTop: 15 }}>Carregando...</Text>
      </View>
    );
  }

  if (!usuario) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  const usuarioAtualizado = marcas.find(m => m.id === usuario.id) || usuario;

  const screens = {
    home: <HomeScreen usuario={usuarioAtualizado} marcas={marcas} setMarcas={setMarcas} />,
    searchz: <SearchzScreen usuario={usuarioAtualizado} marcas={marcas} setUsuario={setUsuario} />,
    drops: <DropsScreen usuario={usuarioAtualizado} marcas={marcas} setMarcas={setMarcas} />,
    collabz: <CollabzScreen usuario={usuarioAtualizado} marcas={marcas} />,
    profile: <ProfileScreen usuario={usuarioAtualizado} setUsuario={setUsuario} onLogout={handleLogout} />,
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
            <Text style={{ color: tab === t.key ? C.prata : C.prataEscuro, fontSize: 10 }}>{t.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

// ============ ESTILOS ============
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: C.bg },
  loginScroll: { padding: 20, paddingTop: 60, paddingBottom: 40 },
  loginLogoContainer: { alignItems: 'center', marginBottom: 30 },
  logoGrande: { color: C.prata, fontSize: 36, fontWeight: '900', letterSpacing: 6, marginTop: 10 },
  loginSubtitulo: { color: C.prataEscuro, fontSize: 13, marginTop: 5 },
  modoSelector: { flexDirection: 'row', backgroundColor: C.card, borderRadius: 25, padding: 4, marginBottom: 20 },
  modoBtn: { flex: 1, paddingVertical: 12, alignItems: 'center', borderRadius: 25 },
  modoBtnAtivo: { backgroundColor: C.roxo },
  erroContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,45,85,0.1)', padding: 12, borderRadius: 10, marginBottom: 15, gap: 8 },
  erroTexto: { color: C.erro, flex: 1, fontSize: 13 },
  formContainer: { width: '100%' },
  inputWrapper: { flexDirection: 'row', alignItems: 'center', backgroundColor: C.input, borderRadius: 12, marginBottom: 12, borderWidth: 1, borderColor: C.borda, paddingHorizontal: 12 },
  inputIcon: { marginRight: 8 },
  inputLogin: { flex: 1, color: C.branco, paddingVertical: 14, fontSize: 14 },
  eyeBtn: { padding: 5 },
  btnPrincipal: { backgroundColor: C.roxo, padding: 16, borderRadius: 25, alignItems: 'center', marginTop: 10 },
  btnDesativado: { opacity: 0.6 },
  btnPrincipalTexto: { color: C.branco, fontWeight: '700', fontSize: 16 },
  divisor: { flexDirection: 'row', alignItems: 'center', marginVertical: 20 },
  linhaDivisor: { flex: 1, height: 1, backgroundColor: C.borda },
  redesContainer: { flexDirection: 'row', gap: 10 },
  btnRede: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: C.card, padding: 14, borderRadius: 12, borderWidth: 1, borderColor: C.borda },
  tipoSelector: { flexDirection: 'row', justifyContent: 'center', gap: 10, marginBottom: 20 },
  tipoBtn: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 20, backgroundColor: C.card, borderWidth: 1, borderColor: C.borda },
  tipoBtnAtivo: { backgroundColor: C.roxo, borderColor: C.roxo },
  logo: { color: C.prata, fontSize: 26, fontWeight: '900', letterSpacing: 4 },
  topBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingTop: 50, paddingBottom: 10 },
  header: { color: C.prata, fontSize: 26, fontWeight: '900', letterSpacing: 3, paddingLeft: 16, marginBottom: 10, marginTop: 50 },
  card: { marginBottom: 20 },
  cardHeader: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, marginBottom: 8, gap: 8 },
  avatarPequeno: { width: 30, height: 30, borderRadius: 15 },
  postImage: { width: '100%', height: 400 },
  cardFooter: { paddingHorizontal: 12, paddingVertical: 8 },
  searchInput: { backgroundColor: C.card, color: C.branco, borderRadius: 25, padding: 12, marginHorizontal: 16, marginBottom: 15, borderWidth: 1, borderColor: C.borda },
  searchCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: C.card, marginHorizontal: 16, marginBottom: 10, padding: 12, borderRadius: 12, borderWidth: 1, borderColor: C.borda, gap: 10 },
  profilePic: { width: 100, height: 100, borderRadius: 50, borderWidth: 2, borderColor: C.prata },
  portfolioImg: { width: 80, height: 80, borderRadius: 8, marginRight: 8 },
  dropCardGrid: { flex: 1, backgroundColor: C.card, borderRadius: 12, overflow: 'hidden', borderWidth: 1, borderColor: C.borda, marginBottom: 12 },
  dropImageGrid: { width: '100%', height: 150 },
  btnInteresse: { backgroundColor: C.roxo, borderRadius: 15, padding: 6, alignItems: 'center', marginTop: 6 },
  collabCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: C.card, marginHorizontal: 16, marginBottom: 10, padding: 14, borderRadius: 12, borderWidth: 1, borderColor: C.borda, gap: 10 },
  collabImage: { width: 50, height: 50, borderRadius: 25 },
  chatHeader: { flexDirection: 'row', alignItems: 'center', padding: 16, paddingTop: 50, gap: 10, borderBottomWidth: 1, borderColor: C.borda },
  chatAvatar: { width: 40, height: 40, borderRadius: 20 },
  chatArea: { flex: 1, padding: 16 },
  brandMessage: { backgroundColor: '#2a2a2a', padding: 12, borderRadius: 15, marginBottom: 10, alignSelf: 'flex-start' },
  userMessage: { backgroundColor: C.roxo, padding: 12, borderRadius: 15, marginBottom: 10, alignSelf: 'flex-end' },
  chatInputContainer: { flexDirection: 'row', padding: 10, borderTopWidth: 1, borderColor: C.borda, gap: 8 },
  chatInput: { flex: 1, backgroundColor: C.card, color: C.branco, borderRadius: 25, paddingHorizontal: 15 },
  sendButton: { backgroundColor: C.roxo, width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center' },
  formPost: { marginHorizontal: 16, marginBottom: 15, padding: 15, backgroundColor: C.card, borderRadius: 12, borderWidth: 1, borderColor: C.borda },
  inputPost: { backgroundColor: C.bg, color: C.branco, borderRadius: 8, padding: 10, marginTop: 8, borderWidth: 1, borderColor: C.borda },
  btnPostar: { backgroundColor: C.roxo, padding: 12, borderRadius: 20, alignItems: 'center', flex: 1 },
  btnCancelar: { padding: 12, borderRadius: 20, alignItems: 'center', flex: 1, borderWidth: 1, borderColor: C.borda },
  btnSeguir: { backgroundColor: C.roxo, paddingHorizontal: 15, paddingVertical: 8, borderRadius: 20 },
  btnSeguindo: { backgroundColor: 'transparent', borderWidth: 1, borderColor: C.prata },
  modal: { flex: 1, backgroundColor: 'rgba(0,0,0,0.9)', justifyContent: 'center', padding: 20 },
  modalContent: { backgroundColor: C.card, borderRadius: 16, padding: 20, borderWidth: 1, borderColor: C.borda },
  editInput: { backgroundColor: C.bg, color: C.branco, borderRadius: 10, padding: 12, borderWidth: 1, borderColor: C.borda },
  btnCancelarModal: { flex: 1, padding: 14, borderRadius: 10, borderWidth: 1, borderColor: C.borda, alignItems: 'center' },
  btnSalvar: { flex: 1, padding: 14, borderRadius: 10, backgroundColor: C.roxo, alignItems: 'center' },
  tabBar: { flexDirection: 'row', borderTopWidth: 1, borderTopColor: C.borda, backgroundColor: C.bg, paddingBottom: 30, paddingTop: 10 },
  tab: { flex: 1, alignItems: 'center' },
});
