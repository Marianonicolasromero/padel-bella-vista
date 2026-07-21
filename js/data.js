/* ============================================
   PADELBELL — Data Store v2
   Datos regionales, jugadores, torneos, partidos
   ============================================ */

/* =====================
   CONSTANTES GLOBALES
   ===================== */
const CATEGORIES = [
  '1ra',
  '2da',
  '3ra',
  '4ta',
  '5ta',
  '6ta',
  '7ma',
  '8va',
  'Principiante'
];

const LEVELS = CATEGORIES;

const GENDERS = [
  { value: 'masculino', label: 'Masculino', icon: '' },
  { value: 'femenino',  label: 'Femenino',  icon: '' }
];

const HANDS = [
  { value: 'derecha',    label: 'Derecha' },
  { value: 'izquierda',  label: 'Izquierda' },
  { value: 'ambidiestro',label: 'Ambidiestro' }
];

const POSITIONS = [
  { value: 'drive',  label: 'Drive (derecha)' },
  { value: 'reves',  label: 'Revés (izquierda)' },
  { value: 'ambas',  label: 'Ambas posiciones' }
];

const REGIONS = {
  argentina: {
    label: 'Argentina', flag: '🇦🇷',
    provinces: [
      'Buenos Aires','Catamarca','Chaco','Chubut','Córdoba',
      'Corrientes','Entre Ríos','Formosa','Jujuy','La Pampa',
      'La Rioja','Mendoza','Misiones','Neuquén','Río Negro',
      'Salta','San Juan','San Luis','Santa Cruz','Santa Fe',
      'Santiago del Estero','Tierra del Fuego','Tucumán'
    ]
  },
  uruguay: {
    label: 'Uruguay', flag: '🇺🇾',
    provinces: [
      'Artigas','Canelones','Cerro Largo','Colonia','Durazno',
      'Flores','Florida','Lavalleja','Maldonado','Montevideo',
      'Paysandú','Río Negro','Rivera','Rocha','Salto',
      'San José','Soriano','Tacuarembó','Treinta y Tres'
    ]
  },
  brasil: {
    label: 'Brasil', flag: '🇧🇷',
    provinces: [
      'Acre','Alagoas','Amapá','Amazonas','Bahia','Ceará',
      'Distrito Federal','Espírito Santo','Goiás','Maranhão',
      'Mato Grosso','Mato Grosso do Sul','Minas Gerais','Pará',
      'Paraíba','Paraná','Pernambuco','Piauí','Rio de Janeiro',
      'Rio Grande do Norte','Rio Grande do Sul','Rondônia',
      'Roraima','Santa Catarina','São Paulo','Sergipe','Tocantins'
    ]
  },
  paraguay: {
    label: 'Paraguay', flag: '🇵🇾',
    provinces: [
      'Alto Paraguay','Alto Paraná','Amambay','Asunción',
      'Boquerón','Caaguazú','Caazapá','Canindeyú','Central',
      'Concepción','Cordillera','Guairá','Itapúa','Misiones',
      'Ñeembucú','Paraguarí','Presidente Hayes','San Pedro'
    ]
  }
};

/* =====================
   BASE DE DATOS PRINCIPAL
   ===================== */
const DB = {

  /* ---------- JUGADORES ---------- */
  players: [
    {
      id:'p1', first_name:'Matías', last_name:'Ramírez', nickname:'El Mati',
      country:'argentina', province:'Corrientes', city:'Bella Vista',
      gender:'masculino', birthdate:'1995-03-15',
      height:183, weight:78,
      dominant_hand:'derecha', position:'reves',
      category:'1ra', level:'1ra',
      ranking_masc:1, ranking_fem:null, ranking_points:4850, ranking_change:2,
      club:'Palmeras Pádel', partner_id:'p3',
      win_rate:72, tournaments_played:24, titles:3,
      instagram:'@mati_padel_bv',
      bio:'Mejor jugador de Bella Vista. Campeón regional de Corrientes 2024.',
      photo:'assets/images/player_action.png', active:true
    },
    {
      id:'p2', first_name:'Valentina', last_name:'López', nickname:'La Vale',
      country:'argentina', province:'Corrientes', city:'Bella Vista',
      gender:'femenino', birthdate:'1999-07-22',
      height:168, weight:60,
      dominant_hand:'derecha', position:'drive',
      category:'1ra', level:'1ra',
      ranking_masc:null, ranking_fem:1, ranking_points:4220, ranking_change:0,
      club:'Palmeras Pádel', partner_id:'p7',
      win_rate:68, tournaments_played:18, titles:2,
      instagram:'@vale_padel_bv',
      bio:'Mejor jugadora femenina de la región. Representante de Bella Vista.',
      photo:'assets/images/player_action.png', active:true
    },
    {
      id:'p3', first_name:'Gonzalo', last_name:'Medina', nickname:'Gonza',
      country:'argentina', province:'Corrientes', city:'Goya',
      gender:'masculino', birthdate:'1993-11-08',
      height:178, weight:82,
      dominant_hand:'derecha', position:'drive',
      category:'1ra', level:'1ra',
      ranking_masc:2, ranking_fem:null, ranking_points:4600, ranking_change:-1,
      club:'Club Náutico Costanera', partner_id:'p1',
      win_rate:70, tournaments_played:22, titles:2,
      instagram:'@gonza_padel_goya',
      bio:'Compañero habitual de Matías Ramírez. Referente del pádel en Goya.',
      photo:'assets/images/player_action.png', active:true
    },
    {
      id:'p4', first_name:'Diego', last_name:'Ojeda', nickname:'Diegote',
      country:'argentina', province:'Chaco', city:'Resistencia',
      gender:'masculino', birthdate:'1990-05-30',
      height:186, weight:88,
      dominant_hand:'izquierda', position:'reves',
      category:'1ra', level:'1ra',
      ranking_masc:3, ranking_fem:null, ranking_points:4100, ranking_change:1,
      club:'Arena Pádel Resistencia', partner_id:null,
      win_rate:65, tournaments_played:30, titles:4,
      instagram:'@diegote_padel',
      bio:'Zurdazo del Chaco. Especialista en volea y recuperación de smash.',
      photo:'assets/images/player_action.png', active:true
    },
    {
      id:'p5', first_name:'Agustín', last_name:'da Silva', nickname:'Agus',
      country:'brasil', province:'Mato Grosso do Sul', city:'Ponta Porã',
      gender:'masculino', birthdate:'1997-02-14',
      height:181, weight:76,
      dominant_hand:'derecha', position:'drive',
      category:'2da', level:'2da',
      ranking_masc:4, ranking_fem:null, ranking_points:3950, ranking_change:3,
      club:'Padel MS Ponta Porã', partner_id:null,
      win_rate:63, tournaments_played:15, titles:1,
      instagram:'@agus_padel_br',
      bio:'Jugador fronterizo Brasil-Paraguay. Ritmo rápido y potente.',
      photo:'assets/images/player_action.png', active:true
    },
    {
      id:'p6', first_name:'Fernando', last_name:'Benítez', nickname:'Fer',
      country:'paraguay', province:'Concepción', city:'Concepción',
      gender:'masculino', birthdate:'1994-09-18',
      height:176, weight:73,
      dominant_hand:'derecha', position:'ambas',
      category:'2da', level:'2da',
      ranking_masc:5, ranking_fem:null, ranking_points:3720, ranking_change:2,
      club:'Club Olimpia Pádel', partner_id:null,
      win_rate:58, tournaments_played:20, titles:1,
      instagram:'@fer_padel_py',
      bio:'Jugador versátil de Paraguay. Muy regular y constante en competición.',
      photo:'assets/images/player_action.png', active:true
    },
    {
      id:'p7', first_name:'Luciana', last_name:'Torres', nickname:'Lu',
      country:'uruguay', province:'Salto', city:'Salto',
      gender:'femenino', birthdate:'2001-04-05',
      height:165, weight:57,
      dominant_hand:'derecha', position:'reves',
      category:'1ra', level:'1ra',
      ranking_masc:null, ranking_fem:2, ranking_points:4010, ranking_change:4,
      club:'Pádel Club Salto', partner_id:'p2',
      win_rate:66, tournaments_played:14, titles:1,
      instagram:'@lu_padel_salto',
      bio:'Revelación del torneo regional 2024. Revés potente y preciso.',
      photo:'assets/images/player_action.png', active:true
    },
    {
      id:'p8', first_name:'Carolina', last_name:'Vega', nickname:'Caro',
      country:'argentina', province:'Corrientes', city:'Corrientes Capital',
      gender:'femenino', birthdate:'1996-12-03',
      height:170, weight:63,
      dominant_hand:'derecha', position:'drive',
      category:'1ra', level:'1ra',
      ranking_masc:null, ranking_fem:3, ranking_points:3800, ranking_change:-1,
      club:'Corrientes Tenis Club', partner_id:null,
      win_rate:62, tournaments_played:21, titles:2,
      instagram:'@caro_padel_ctes',
      bio:'Jugadora técnica de la capital. Muy efectiva en redes.',
      photo:'assets/images/player_action.png', active:true
    },
    {
      id:'p9', first_name:'Lucas', last_name:'Insaurralde', nickname:'Luki',
      country:'argentina', province:'Corrientes', city:'Bella Vista',
      gender:'masculino', birthdate:'2004-06-20',
      height:175, weight:70,
      dominant_hand:'derecha', position:'drive',
      category:'3ra', level:'3ra',
      ranking_masc:12, ranking_fem:null, ranking_points:2100, ranking_change:5,
      club:'Palmeras Pádel', partner_id:null,
      win_rate:55, tournaments_played:8, titles:0,
      instagram:'@luki_padel_bv',
      bio:'Joven promesa de Bella Vista. Gran proyección en el circuito junior.',
      photo:'assets/images/player_action.png', active:true
    },
    {
      id:'p10', first_name:'Ramona', last_name:'Aquino', nickname:'Ramo',
      country:'paraguay', province:'Central', city:'Luque',
      gender:'femenino', birthdate:'1998-08-11',
      height:162, weight:58,
      dominant_hand:'izquierda', position:'reves',
      category:'2da', level:'2da',
      ranking_masc:null, ranking_fem:4, ranking_points:3500, ranking_change:0,
      club:'Luque Pádel Club', partner_id:null,
      win_rate:59, tournaments_played:16, titles:1,
      instagram:'@ramo_padel_py',
      bio:'Zurda paraguaya con un revés demoledor.',
      photo:'assets/images/player_action.png', active:true
    }
  ],

  /* ---------- TORNEOS ---------- */
  tournaments: [
    {
      id: 't1',
      name: 'Copa del Litoral 2026',
      short_name: 'Copa Litoral',
      city: 'Corrientes Capital', province: 'Corrientes', country: 'argentina',
      venue: 'Corrientes Tenis Club',
      category: 'Provincial',
      gender: 'masculino',
      start_date: '2026-07-18', end_date: '2026-07-20',
      status: 'live',
      prize: 300000,
      format: 'grupos_y_eliminacion',
      scoring_mode: 'ventaja',
      sets_to_win: 2,
      games_per_set: 6,
      description: 'El torneo provincial más importante de Corrientes. Todos los partidos de zona completados.',
      image: 'assets/images/hero_padel_bg.png',
      organizer: 'Federación Correntina de Pádel',
      zones: [
        {
          id: 'z1',
          name: 'Zona A',
          pairs: ['Ramírez / Medina', 'González / Fernández', 'Castro / López', 'Benítez / Sosa'],
          standings: [
            { rank: 1, pair: 'Ramírez / Medina', w: 3, l: 0, sg: '+6', pts: 9 },
            { rank: 2, pair: 'González / Fernández', w: 2, l: 1, sg: '+2', pts: 6 },
            { rank: 3, pair: 'Castro / López', w: 1, l: 2, sg: '-2', pts: 3 },
            { rank: 4, pair: 'Benítez / Sosa', w: 0, l: 3, sg: '-6', pts: 0 }
          ]
        },
        {
          id: 'z2',
          name: 'Zona B',
          pairs: ['Da Silva / Rojas', 'Álvarez / Ruíz', 'Pereyra / Vargas', 'Ojeda / Torres'],
          standings: [
            { rank: 1, pair: 'Da Silva / Rojas', w: 3, l: 0, sg: '+6', pts: 9 },
            { rank: 2, pair: 'Álvarez / Ruíz', w: 2, l: 1, sg: '+2', pts: 6 },
            { rank: 3, pair: 'Pereyra / Vargas', w: 1, l: 2, sg: '-2', pts: 3 },
            { rank: 4, pair: 'Ojeda / Torres', w: 0, l: 3, sg: '-6', pts: 0 }
          ]
        }
      ],
      bracket: {
        quarterFinals: [],
        semiFinals: [],
        final: null
      },
      matches: [
        { id: 't1_m1', tournament_id: 't1', round: 'grupo', zone_id: 'z1', pairA: 'Ramírez / Medina', pairB: 'González / Fernández', status: 'finished', setsHistory: [{ a: 6, b: 4 }, { a: 6, b: 3 }], winner: 'a' },
        { id: 't1_m2', tournament_id: 't1', round: 'grupo', zone_id: 'z1', pairA: 'Castro / López', pairB: 'Benítez / Sosa', status: 'finished', setsHistory: [{ a: 6, b: 2 }, { a: 6, b: 1 }], winner: 'a' },
        { id: 't1_m3', tournament_id: 't1', round: 'grupo', zone_id: 'z1', pairA: 'Ramírez / Medina', pairB: 'Castro / López', status: 'finished', setsHistory: [{ a: 7, b: 5 }, { a: 6, b: 4 }], winner: 'a' },
        { id: 't1_m4', tournament_id: 't1', round: 'grupo', zone_id: 'z1', pairA: 'González / Fernández', pairB: 'Benítez / Sosa', status: 'finished', setsHistory: [{ a: 6, b: 3 }, { a: 6, b: 3 }], winner: 'a' },
        { id: 't1_m5', tournament_id: 't1', round: 'grupo', zone_id: 'z1', pairA: 'Ramírez / Medina', pairB: 'Benítez / Sosa', status: 'finished', setsHistory: [{ a: 6, b: 2 }, { a: 6, b: 2 }], winner: 'a' },
        { id: 't1_m6', tournament_id: 't1', round: 'grupo', zone_id: 'z1', pairA: 'González / Fernández', pairB: 'Castro / López', status: 'finished', setsHistory: [{ a: 6, b: 4 }, { a: 7, b: 6 }], winner: 'a' },
        { id: 't1_m7', tournament_id: 't1', round: 'grupo', zone_id: 'z2', pairA: 'Da Silva / Rojas', pairB: 'Álvarez / Ruíz', status: 'finished', setsHistory: [{ a: 6, b: 3 }, { a: 6, b: 2 }], winner: 'a' },
        { id: 't1_m8', tournament_id: 't1', round: 'grupo', zone_id: 'z2', pairA: 'Pereyra / Vargas', pairB: 'Ojeda / Torres', status: 'finished', setsHistory: [{ a: 6, b: 4 }, { a: 3, b: 6 }, { a: 6, b: 4 }], winner: 'a' },
        { id: 't1_m9', tournament_id: 't1', round: 'grupo', zone_id: 'z2', pairA: 'Da Silva / Rojas', pairB: 'Pereyra / Vargas', status: 'finished', setsHistory: [{ a: 6, b: 3 }, { a: 6, b: 4 }], winner: 'a' },
        { id: 't1_m10', tournament_id: 't1', round: 'grupo', zone_id: 'z2', pairA: 'Álvarez / Ruíz', pairB: 'Ojeda / Torres', status: 'finished', setsHistory: [{ a: 6, b: 2 }, { a: 6, b: 3 }], winner: 'a' },
        { id: 't1_m11', tournament_id: 't1', round: 'grupo', zone_id: 'z2', pairA: 'Da Silva / Rojas', pairB: 'Ojeda / Torres', status: 'finished', setsHistory: [{ a: 6, b: 1 }, { a: 6, b: 1 }], winner: 'a' },
        { id: 't1_m12', tournament_id: 't1', round: 'grupo', zone_id: 'z2', pairA: 'Álvarez / Ruíz', pairB: 'Pereyra / Vargas', status: 'finished', setsHistory: [{ a: 7, b: 5 }, { a: 6, b: 4 }], winner: 'a' }
      ]
    },
    {
      id: 't2',
      name: 'Torneo Primavera Bella Vista',
      short_name: 'Primavera BV',
      city: 'Bella Vista', province: 'Corrientes', country: 'argentina',
      venue: 'Palmeras Pádel',
      category: 'Regional',
      gender: 'mixto',
      start_date: '2026-09-12', end_date: '2026-09-14',
      status: 'upcoming',
      prize: 150000,
      format: 'grupos_y_eliminacion',
      scoring_mode: 'ventaja',
      sets_to_win: 2,
      games_per_set: 6,
      description: 'Torneo más tradicional de Bella Vista. Formato híbrido de zonas más cuadro final.',
      image: 'assets/images/hero_padel_bg.png',
      organizer: 'Asociación de Pádel de Bella Vista',
      zones: [
        {
          id: 'z_t2_1',
          name: 'Zona A',
          pairs: ['Sosa / Benítez', 'López / Castro'],
          standings: []
        },
        {
          id: 'z_t2_2',
          name: 'Zona B',
          pairs: ['Vargas / Ojeda', 'Torres / Pereyra'],
          standings: []
        }
      ],
      bracket: { quarterFinals: [], semiFinals: [], final: null },
      matches: []
    }
  ],

  /* ---------- CANCHAS ---------- */
  courts: [
    {
      id:'c1', name:'Palmeras Pádel',
      address:'San Martín entre Salta y Corrientes',
      city:'Bella Vista', province:'Corrientes',
      phone:'+54 3777 000-000', instagram:'@palmeras_padel_bv',
      courts_count:3, surface:'Césped sintético', lighting:'LED',
      amenities:['Restó-Bar','Gimnasio','Vestuarios','Estacionamiento'],
      schedule:'Lun-Dom 8:00 - 23:00',
      price_per_hour:3500,
      coordinates:{lat:-28.5162, lng:-59.0515},
      description:'Complejo emblemático de Bella Vista. Frente al Estadio General San Martín.',
      featured:true, image:'assets/images/court_top_view.png'
    },
    {
      id:'c2', name:'Complejo San José Pádel',
      address:'Industria 1320',
      city:'Bella Vista', province:'Corrientes',
      phone:'+54 3777 000-001', instagram:'@sanjose_padel_bv',
      courts_count:2, surface:'Césped sintético', lighting:'LED',
      amenities:['Vestuarios','Estacionamiento'],
      schedule:'Lun-Vie 14:00-22:00 · Sab-Dom 8:00-22:00',
      price_per_hour:3000,
      coordinates:{lat:-28.5200, lng:-59.0480},
      description:'Complejo deportivo con canchas de pádel y fútbol.',
      featured:false, image:'assets/images/court_top_view.png'
    },
    {
      id:'c3', name:'Club Náutico Costanera',
      address:'Costanera s/n, frente al río Paraná',
      city:'Bella Vista', province:'Corrientes',
      phone:'+54 3777 000-002', instagram:'@nautico_padel_bv',
      courts_count:1, surface:'Hormigón poroso', lighting:'LED nocturna',
      amenities:['Vista al río','Bar','Pileta'],
      schedule:'Sab-Dom 9:00 - 20:00',
      price_per_hour:2500,
      coordinates:{lat:-28.5100, lng:-59.0560},
      description:'La única cancha con vista al río Paraná.',
      featured:false, image:'assets/images/court_top_view.png'
    }
  ],

  /* ---------- NOTICIAS ---------- */
  news: [
    {
      id:'n1',
      title:'Bella Vista será sede del primer torneo internacional de pádel del litoral',
      excerpt:'La Copa Internacional del Paraná reunirá a jugadores de Argentina, Brasil, Paraguay y Uruguay en octubre.',
      content:'La ciudad de Bella Vista se convertirá en el epicentro del pádel regional este octubre...',
      category:'Torneos', author:'Redacción PadelBell',
      date:'2026-06-15', image:'assets/images/hero_padel_bg.png',
      featured:true, tags:['bella vista','torneo internacional','copa paraná']
    },
    {
      id:'n2',
      title:'Matías Ramírez mantiene su liderazgo en el ranking regional',
      excerpt:'El jugador bellavisteño extendió su racha ganadora con una nueva victoria en Goya.',
      content:'Matías Ramírez, referente del pádel de Bella Vista, sumó dos victorias más...',
      category:'Jugadores', author:'Redacción PadelBell',
      date:'2026-06-10', image:'assets/images/player_action.png',
      featured:false, tags:['matías ramírez','ranking','bella vista']
    },
    {
      id:'n3',
      title:'Palmeras Pádel inauguró sus nuevas canchas con iluminación LED',
      excerpt:'El complejo emblema de Bella Vista completó su renovación con 3 canchas de primer nivel.',
      content:'Palmeras Pádel abrió sus puertas renovado este mes...',
      category:'Canchas', author:'Redacción PadelBell',
      date:'2026-06-05', image:'assets/images/court_top_view.png',
      featured:false, tags:['palmeras pádel','canchas','bella vista']
    },
    {
      id:'n4',
      title:'Valentina López y Luciana Torres, campeonas de la Copa Naranja 2025',
      excerpt:'La pareja se coronó en el torneo femenino más importante de la ciudad.',
      content:'Una final memorable se vivió en Bella Vista...',
      category:'Torneos', author:'Redacción PadelBell',
      date:'2025-11-10', image:'assets/images/player_action.png',
      featured:false, tags:['valentina lópez','luciana torres','copa naranja']
    }
  ],

  /* ---------- ORGANIZADORES ---------- */
  organizers: [
    {
      id: 'org1',
      name: 'Club Palmeras Pádel',
      contact: 'Juan Palmeras',
      phone: '+54 9 3782 123456',
      pin: 'mimir149',
      tournament_id: 't2',
      active: true,
      created_at: '2026-07-01'
    }
  ]
};

/* =====================
   SISTEMA DE AUTH POR ROL
   Sin backend — todo en localStorage
   Roles: 'admin' | 'organizador' | null (espectador)
   ===================== */
const AUTH = {
  ADMIN_PIN: 'mimir149',  // PIN del administrador Mariano Romero

  getRole() {
    return localStorage.getItem('padelbell_role') || null;
  },

  getOrgId() {
    return localStorage.getItem('padelbell_org_id') || null;
  },

  isAdmin() {
    return this.getRole() === 'admin';
  },

  isOrganizer() {
    return this.getRole() === 'organizador';
  },

  isPublic() {
    return !this.getRole();
  },

  loginAdmin(pin) {
    if (pin === this.ADMIN_PIN) {
      localStorage.setItem('padelbell_role', 'admin');
      localStorage.removeItem('padelbell_org_id');
      return true;
    }
    return false;
  },

  loginOrganizer(pin) {
    const org = DB.organizers.find(o => o.pin === pin && o.active);
    if (org) {
      localStorage.setItem('padelbell_role', 'organizador');
      localStorage.setItem('padelbell_org_id', org.id);
      return org;
    }
    return null;
  },

  logout() {
    localStorage.removeItem('padelbell_role');
    localStorage.removeItem('padelbell_org_id');
  },

  getCurrentOrganizer() {
    const id = this.getOrgId();
    if (!id) return null;
    return DB.organizers.find(o => o.id === id) || null;
  },

  getOrgTournament() {
    const org = this.getCurrentOrganizer();
    if (!org || !org.tournament_id) return null;
    return DB.tournaments.find(t => t.id === org.tournament_id) || null;
  }
};

/* =====================
   HELPERS — ORGANIZERS
   ===================== */
function getAllOrganizers()    { return DB.organizers; }
function getOrganizerById(id) { return DB.organizers.find(o => o.id === id) || null; }

function addOrganizer(data) {
  if (DB.organizers.length >= 50) {
    return { error: 'Límite de 50 perfiles de organizadores alcanzado. Actualizá tu plan o contactá soporte.' };
  }
  const id = 'org' + Date.now();
  const org = {
    id,
    name: data.name || 'Nuevo Organizador',
    contact: data.contact || '',
    phone: data.phone || '',
    pin: data.pin || String(Math.floor(1000 + Math.random() * 9000)),
    tournament_id: data.tournament_id || null,
    active: true,
    created_at: new Date().toISOString().split('T')[0]
  };
  DB.organizers.push(org);
  saveDB();
  return org;
}

function updateOrganizer(id, data) {
  const idx = DB.organizers.findIndex(o => o.id === id);
  if (idx === -1) return null;
  DB.organizers[idx] = { ...DB.organizers[idx], ...data };
  saveDB();
  return DB.organizers[idx];
}

function deleteOrganizer(id) {
  const idx = DB.organizers.findIndex(o => o.id === id);
  if (idx === -1) return false;
  DB.organizers.splice(idx, 1);
  saveDB();
  return true;
}

function generateOrgPin() {
  let pin;
  do { pin = String(Math.floor(1000 + Math.random() * 9000)); }
  while (DB.organizers.some(o => o.pin === pin));
  return pin;
}


/* =====================
   HELPERS — JUGADORES
   ===================== */
function getAllPlayers()        { return DB.players; }
function getActivePlayes()     { return DB.players.filter(p => p.active); }
function getPlayerById(id)     { return DB.players.find(p => p.id === id); }

function addPlayer(data) {
  const id = 'p' + Date.now();
  const age = data.birthdate
    ? Math.floor((Date.now() - new Date(data.birthdate)) / 3.156e10)
    : null;
  
  const unifiedCategory = data.category || data.level || 'Principiante';

  const p = {
    id, active: true, photo: null,
    ranking_masc: data.gender === 'masculino' ? DB.players.filter(x=>x.gender==='masculino').length + 1 : null,
    ranking_fem:  data.gender === 'femenino'  ? DB.players.filter(x=>x.gender==='femenino').length  + 1 : null,
    ranking_points: 0, ranking_change: 0,
    win_rate: 0, tournaments_played: 0, titles: 0,
    partner_id: null,
    ...data,
    category: unifiedCategory,
    level: unifiedCategory,
    age,
    height: parseInt(data.height) || 175,
    weight: parseInt(data.weight) || 75
  };
  DB.players.push(p);
  saveDB(); // ← Persistir inmediatamente
  return p;
}

function updatePlayer(id, data) {
  const idx = DB.players.findIndex(p => p.id === id);
  if (idx === -1) return null;
  
  const unifiedCategory = data.category || data.level || DB.players[idx].category;

  DB.players[idx] = { 
    ...DB.players[idx], 
    ...data,
    category: unifiedCategory,
    level: unifiedCategory
  };
  if (data.birthdate) {
    DB.players[idx].age = Math.floor((Date.now() - new Date(data.birthdate)) / 3.156e10);
  }
  saveDB(); // ← Persistir
  return DB.players[idx];
}

function deletePlayer(id) {
  const idx = DB.players.findIndex(p => p.id === id);
  if (idx === -1) return false;
  DB.players.splice(idx, 1);
  saveDB(); // ← Persistir
  return true;
}

function filterPlayers(filters = {}) {
  return DB.players.filter(p => {
    if (!p.active) return false;
    if (filters.search) {
      const q = filters.search.toLowerCase();
      const full = `${p.first_name} ${p.last_name} ${p.nickname || ''} ${p.club || ''}`.toLowerCase();
      if (!full.includes(q)) return false;
    }
    if (filters.gender     && filters.gender !== 'todos' && p.gender !== filters.gender) return false;
    if (filters.category   && filters.category !== 'todos' && p.category !== filters.category) return false;
    if (filters.level      && filters.level !== 'todos' && p.level !== filters.level) return false;
    if (filters.country    && filters.country !== 'todos' && p.country !== filters.country) return false;
    if (filters.province   && filters.province !== 'todos' && p.province !== filters.province) return false;
    if (filters.hand       && filters.hand !== 'todos' && p.dominant_hand !== filters.hand) return false;
    if (filters.position   && filters.position !== 'todos' && p.position !== filters.position) return false;
    if (filters.age_min    && p.age < parseInt(filters.age_min)) return false;
    if (filters.age_max    && p.age > parseInt(filters.age_max)) return false;
    if (filters.height_min && p.height < parseInt(filters.height_min)) return false;
    if (filters.height_max && p.height > parseInt(filters.height_max)) return false;
    if (filters.weight_min && p.weight < parseInt(filters.weight_min)) return false;
    if (filters.weight_max && p.weight > parseInt(filters.weight_max)) return false;
    return true;
  });
}

function getRankingMasculino() {
  return DB.players.filter(p => p.gender === 'masculino' && p.active)
    .sort((a,b) => b.ranking_points - a.ranking_points);
}

function getRankingFemenino() {
  return DB.players.filter(p => p.gender === 'femenino' && p.active)
    .sort((a,b) => b.ranking_points - a.ranking_points);
}

function getTopPlayers(gender='todos', limit=5) {
  const list = gender === 'todos' ? DB.players : DB.players.filter(p => p.gender === gender);
  return [...list].sort((a,b) => b.ranking_points - a.ranking_points).slice(0, limit);
}

/* =====================
   HELPERS — TORNEOS
   ===================== */
function getAllTournaments()       { return DB.tournaments; }
function getTournamentById(id)    { return DB.tournaments.find(t => t.id === id); }
function getUpcomingTournaments(n=3) {
  return DB.tournaments.filter(t=>t.status==='upcoming').slice(0,n);
}

function addTournament(data) {
  const id = 't' + Date.now();
  const t = {
    id, zones: [], matches: [],
    bracket: { quarterFinals:[], semiFinals:[], final:null, thirdPlace:null },
    ...data
  };
  DB.tournaments.push(t);
  return t;
}

function updateTournament(id, data) {
  const idx = DB.tournaments.findIndex(t => t.id === id);
  if (idx === -1) return null;
  DB.tournaments[idx] = { ...DB.tournaments[idx], ...data };
  return DB.tournaments[idx];
}

/* Agregar zona a torneo */
function addZoneToTournament(tournamentId, zoneData) {
  const t = getTournamentById(tournamentId);
  if (!t) return null;
  const zone = {
    id: 'z' + Date.now(),
    name: zoneData.name || 'Zona A',
    players: zoneData.players || [],   // array de player IDs (parejas)
    pairs: zoneData.pairs || [],       // [{ id, p1, p2, wins, losses, points }]
    matches: [],
    standings: []
  };
  t.zones.push(zone);
  return zone;
}

/* =====================
   HELPERS — PARTIDOS Y CICLO DE VIDA DE TORNEOS
   ===================== */
function createMatch(tournamentId, matchData) {
  const t = getTournamentById(tournamentId);
  if (!t) return null;
  const match = {
    id: matchData.id || 'm' + Date.now() + '_' + Math.floor(Math.random()*1000),
    tournament_id: tournamentId,
    round: matchData.round || 'grupo',        // 'grupo' | 'cuartos' | 'semi' | 'final'
    zone_id: matchData.zone_id || null,
    pairA: matchData.pairA || '',             // Nombre de la pareja A (string)
    pairB: matchData.pairB || '',             // Nombre de la pareja B (string)
    court: matchData.court || null,
    scheduled_at: matchData.scheduled_at || null,
    status: matchData.status || 'scheduled',  // 'scheduled' | 'in_progress' | 'finished'
    scoringMode: matchData.scoringMode || t.scoring_mode || 'ventaja',
    setsHistory: matchData.setsHistory || [], // [{a:6, b:4}, ...]
    winner: matchData.winner || null          // 'a' | 'b'
  };
  t.matches.push(match);
  return match;
}

function getMatchById(tournamentId, matchId) {
  const t = getTournamentById(tournamentId);
  if (!t) return null;
  return t.matches.find(m => m.id === matchId);
}

/* Empezar Torneo: Generar partidos de todos contra todos por zona */
function startTournament(tournamentId) {
  const t = getTournamentById(tournamentId);
  if (!t) return false;

  t.status = 'live';
  t.matches = []; // Limpiar partidos previos

  // Generar partidos por cada zona (todos contra todos / round robin)
  t.zones.forEach(z => {
    const pairs = z.pairs || [];
    if (pairs.length < 2) return;

    // Algoritmo de Round Robin simplificado para todas las parejas de la zona
    for (let i = 0; i < pairs.length; i++) {
      for (let j = i + 1; j < pairs.length; j++) {
        createMatch(tournamentId, {
          round: 'grupo',
          zone_id: z.id,
          pairA: pairs[i],
          pairB: pairs[j],
          status: 'scheduled',
          setsHistory: []
        });
      }
    }
    // Inicializar standings vacíos
    calculateZoneStandings(tournamentId, z.id);
  });

  saveDB();
  return true;
}

/* Calcular la tabla de posiciones de una zona en base a partidos terminados */
function calculateZoneStandings(tournamentId, zoneId) {
  const t = getTournamentById(tournamentId);
  if (!t) return null;
  const z = t.zones.find(x => x.id === zoneId);
  if (!z) return null;

  const pairs = z.pairs || [];
  const stats = {};
  
  // Inicializar estadísticas
  pairs.forEach(p => {
    stats[p] = { pair: p, pj: 0, w: 0, l: 0, setsWon: 0, setsLost: 0, pts: 0 };
  });

  // Filtrar partidos finalizados de esta zona
  const finishedMatches = t.matches.filter(m => m.zone_id === zoneId && m.status === 'finished');

  finishedMatches.forEach(m => {
    const pA = m.pairA;
    const pB = m.pairB;

    if (!stats[pA] || !stats[pB]) return;

    stats[pA].pj += 1;
    stats[pB].pj += 1;

    // Ganador / Perdedor
    if (m.winner === 'a') {
      stats[pA].w += 1;
      stats[pA].pts += 3;
      stats[pB].l += 1;
    } else if (m.winner === 'b') {
      stats[pB].w += 1;
      stats[pB].pts += 3;
      stats[pA].l += 1;
    }

    // Sets ganados y perdidos
    if (m.setsHistory && Array.isArray(m.setsHistory)) {
      m.setsHistory.forEach(s => {
        if (s.a > s.b) {
          stats[pA].setsWon += 1;
          stats[pB].setsLost += 1;
        } else if (s.b > s.a) {
          stats[pB].setsWon += 1;
          stats[pA].setsLost += 1;
        }
      });
    }
  });

  // Convertir a array y ordenar
  const list = Object.values(stats);
  list.sort((x, y) => {
    // 1. Puntos desc
    if (y.pts !== x.pts) return y.pts - x.pts;
    // 2. Partidos ganados desc
    if (y.w !== x.w) return y.w - x.w;
    // 3. Diferencia de sets desc
    const diffX = x.setsWon - x.setsLost;
    const diffY = y.setsWon - y.setsLost;
    return diffY - diffX;
  });

  // Formatear tabla de posiciones
  z.standings = list.map((item, idx) => {
    const diff = item.setsWon - item.setsLost;
    const sgStr = (diff >= 0 ? '+' : '') + diff;
    return {
      rank: idx + 1,
      pair: item.pair,
      w: item.w,
      l: item.l,
      sg: sgStr,
      pts: item.pts
    };
  });

  return z.standings;
}

/* Avanzar a la fase de llaves (Semifinales) tomando los mejores de cada zona */
function advanceToBracket(tournamentId) {
  const t = getTournamentById(tournamentId);
  if (!t) return false;

  // Recalcular standings de todas las zonas
  t.zones.forEach(z => calculateZoneStandings(tournamentId, z.id));

  // Necesitamos al menos 2 zonas con standings completos para el cruce estándar de semifinales
  if (t.zones.length < 2) return false;

  const zoneA = t.zones[0];
  const zoneB = t.zones[1];

  const firstA = zoneA.standings[0]?.pair || '1ro Zona A';
  const secondA = zoneA.standings[1]?.pair || '2do Zona A';
  const firstB = zoneB.standings[0]?.pair || '1ro Zona B';
  const secondB = zoneB.standings[1]?.pair || '2do Zona B';

  // Limpiar partidos previos de llaves para evitar duplicados
  t.matches = t.matches.filter(m => m.round === 'grupo');

  // Crear partidos de semifinales
  const sf1 = createMatch(tournamentId, {
    id: tournamentId + '_sf1',
    round: 'semi',
    pairA: firstA,
    pairB: secondB,
    status: 'scheduled',
    setsHistory: []
  });

  const sf2 = createMatch(tournamentId, {
    id: tournamentId + '_sf2',
    round: 'semi',
    pairA: firstB,
    pairB: secondA,
    status: 'scheduled',
    setsHistory: []
  });

  // Crear el partido final (programado, inicialmente vacío)
  const finalMatch = createMatch(tournamentId, {
    id: tournamentId + '_final',
    round: 'final',
    pairA: '',
    pairB: '',
    status: 'scheduled',
    setsHistory: []
  });

  // Estructura visual de las llaves
  t.bracket = {
    quarterFinals: [],
    semiFinals: [
      { slot: 1, pairA: firstA, pairB: secondB, winner: null, score: null, matchId: sf1.id },
      { slot: 2, pairA: firstB, pairB: secondA, winner: null, score: null, matchId: sf2.id }
    ],
    final: { pairA: '', pairB: '', winner: null, score: null, matchId: finalMatch.id }
  };

  saveDB();
  return true;
}

/* Finalizar un partido y aplicar progresión del torneo */
function finalizeMatch(tournamentId, matchId, setsHistory, winner) {
  const t = getTournamentById(tournamentId);
  if (!t) return false;

  const m = t.matches.find(x => x.id === matchId);
  if (!m) return false;

  m.status = 'finished';
  m.setsHistory = [...setsHistory];
  m.winner = winner; // 'a' | 'b'

  const scoreStr = setsHistory.map(s => `${s.a}-${s.b}`).join(' / ');

  // Si es partido de fase de grupos
  if (m.round === 'grupo' && m.zone_id) {
    calculateZoneStandings(tournamentId, m.zone_id);
  }

  // Si es semifinal
  if (m.round === 'semi' && t.bracket) {
    const slotIndex = t.bracket.semiFinals.findIndex(x => x.matchId === matchId);
    if (slotIndex !== -1) {
      t.bracket.semiFinals[slotIndex].winner = winner;
      t.bracket.semiFinals[slotIndex].score = scoreStr;

      const winnerName = winner === 'a' ? m.pairA : m.pairB;

      // Asignar al slot de la final
      if (slotIndex === 0) {
        t.bracket.final.pairA = winnerName;
      } else {
        t.bracket.final.pairB = winnerName;
      }

      // Actualizar el partido final de la lista de partidos
      const finalMatch = t.matches.find(x => x.round === 'final');
      if (finalMatch) {
        if (slotIndex === 0) finalMatch.pairA = winnerName;
        else finalMatch.pairB = winnerName;
      }
    }
  }

  // Si es la final
  if (m.round === 'final' && t.bracket) {
    t.bracket.final.winner = winner;
    t.bracket.final.score = scoreStr;
    
    const champ = winner === 'a' ? m.pairA : m.pairB;
    t.champion = champ;
    t.status = 'finished';
  }

  saveDB();
  return true;
}

/* =====================
   HELPERS — CANCHAS / NOTICIAS
   ===================== */
function getAllCourts()  { return DB.courts; }
function getAllNews()    { return DB.news; }
function getFeaturedNews() { return DB.news.find(n=>n.featured) || DB.news[0]; }
function addNews(data) {
  const item = { id:'n'+Date.now(), ...data };
  DB.news.unshift(item);
  return item;
}

/* =====================
   HELPERS UTILITARIOS
   ===================== */
function getRegions()         { return REGIONS; }
function getLevels()          { return LEVELS; }
function getCategories()      { return CATEGORIES; }

function getCountryFlag(country) {
  const codes = { argentina: 'ARG', uruguay: 'URU', brasil: 'BRA', paraguay: 'PAR' };
  return codes[country] || 'INT';
}

function getCountryLabel(country) {
  return REGIONS[country]?.label || country;
}

function calcAge(birthdate) {
  if (!birthdate) return null;
  return Math.floor((Date.now() - new Date(birthdate)) / 3.156e10);
}

function formatPrice(n) {
  return new Intl.NumberFormat('es-AR',{style:'currency',currency:'ARS',maximumFractionDigits:0}).format(n);
}

function formatDate(str) {
  if (!str) return '—';
  try {
    const d = new Date(str + 'T00:00:00');
    if (isNaN(d.getTime())) return str;
    return d.toLocaleDateString('es-AR',{day:'numeric',month:'long',year:'numeric'});
  } catch (e) {
    return str;
  }
}

function formatDateShort(str) {
  if (!str) return '—';
  try {
    const d = new Date(str + 'T00:00:00');
    if (isNaN(d.getTime())) return str;
    return d.toLocaleDateString('es-AR',{day:'numeric',month:'short'});
  } catch (e) {
    return str;
  }
}

function scoreToString(score) {
  const map = { 0:'0', 1:'15', 2:'30', 3:'40' };
  return map[score] ?? score;
}

/* Serializar/guardar en localStorage */
function saveDB() {
  try { localStorage.setItem('padelbell_db', JSON.stringify(DB)); } catch(e) {}
}

function loadDB() {
  try {
    const saved = localStorage.getItem('padelbell_db');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.players?.length)     DB.players     = parsed.players;
      if (parsed.tournaments?.length) DB.tournaments = parsed.tournaments;
      if (parsed.courts?.length)      DB.courts      = parsed.courts;
      if (parsed.news?.length)        DB.news        = parsed.news;
      if (parsed.organizers?.length)  DB.organizers  = parsed.organizers;
    }
    // Asegurar que el organizador por defecto tenga la contraseña mimir149
    const defaultOrg = DB.organizers.find(o => o.id === 'org1');
    if (defaultOrg) {
      defaultOrg.pin = 'mimir149';
    }
  } catch(e) {}
}

// Cargar al iniciar
loadDB();

/* =====================
   ESTADÍSTICAS DEL CIRCUITO
   ===================== */
const CIRCUIT_STATS = {
  season:            '2026',
  total_players:     DB.players.length,
  countries:         4,
  tournaments_played: 12,
  matches_played:    87,
  sets_played:       214,
  last_updated:      '2026-07-04',
  top_scorer:        'p1',   // Matías Ramírez
  best_winrate:      'p1',
};

/* =====================
   PARTIDOS EN VIVO / MUESTRA
   Datos de partidos para la homepage y torneos
   ===================== */
const LIVE_MATCHES = [
  {
    id: 'lm1',
    tournament: 'Copa del Litoral 2026',
    tournament_id: 't1',
    phase: 'Semifinales',
    venue: 'Palmeras Pádel · Bella Vista',
    court: 'Cancha 1 — Palmeras Pádel',
    pairA: 'Ramírez / Medina',
    pairB: 'Ojeda / da Silva',
    status: 'live',
    scoringMode: 'ventaja',
    setsHistory: [{ a: 6, b: 4 }],
    gamesA: 3, gamesB: 2,
    pointLabelA: '40', pointLabelB: '15',
    serve: 'a',
    isMatchPoint: false,
    isSetPoint: false,
    startedAt: Date.now() - 65 * 60000,
  },
  {
    id: 'lm2',
    tournament: 'Copa del Litoral 2026',
    tournament_id: 't1',
    phase: 'Semifinales',
    venue: 'Club Náutico · Bella Vista',
    court: 'Cancha 2 — Palmeras Pádel',
    pairA: 'da Silva / Rojas',
    pairB: 'Vargas / Pereyra',
    status: 'live',
    scoringMode: 'punto_de_oro',
    setsHistory: [],
    gamesA: 5, gamesB: 4,
    pointLabelA: '30', pointLabelB: '30',
    serve: 'b',
    isMatchPoint: false,
    isSetPoint: false,
    startedAt: Date.now() - 48 * 60000,
  },
];

const RECENT_RESULTS = [
  { id: 'r1', tournament: 'Copa del Litoral 2026', phase: 'Cuartos de Final', pairA: 'Ramírez / Medina', pairB: 'Ojeda / Da Silva', score: '6-4 / 3-6 / 7-5', winner: 'a', date: '2026-07-03' },
  { id: 'r2', tournament: 'Copa del Litoral 2026', phase: 'Cuartos de Final', pairA: 'González / Fernández', pairB: 'López / Castro', score: '6-2 / 6-3', winner: 'a', date: '2026-07-03' },
  { id: 'r3', tournament: 'Copa del Litoral 2026', phase: 'Cuartos de Final', pairA: 'da Silva / Rojas', pairB: 'Sosa / Benítez', score: '6-3 / 6-4', winner: 'a', date: '2026-07-03' },
  { id: 'r4', tournament: 'Copa del Litoral 2026', phase: 'Cuartos de Final', pairA: 'Vargas / Pereyra', pairB: 'Ruíz / Álvarez', score: '4-6 / 7-6 / 6-2', winner: 'b', date: '2026-07-03' },
];

function getLiveMatches()    { return LIVE_MATCHES; }
function getRecentResults()  { return RECENT_RESULTS; }
function getCircuitStats()   { return CIRCUIT_STATS; }

/* Jugadores adicionales (se inicializan solo si la DB no tiene muchos) */
function ensureMinPlayers() {
  if (DB.players.length >= 10) return;
  const extra = [
    { id:'p11', first_name:'Nicolás', last_name:'González', gender:'masculino', country:'argentina', province:'Corrientes', city:'Bella Vista', category:'2da', level:'2da', ranking_masc:6, ranking_points:3400, ranking_change:1, club:'Palmeras Pádel', win_rate:54, tournaments_played:10, active:true, photo:'assets/images/player_action.png' },
    { id:'p12', first_name:'Sofía', last_name:'Fernández', gender:'femenino', country:'argentina', province:'Corrientes', city:'Bella Vista', category:'2da', level:'2da', ranking_fem:5, ranking_points:3300, ranking_change:2, club:'Palmeras Pádel', win_rate:60, tournaments_played:12, active:true, photo:'assets/images/player_action.png' },
    { id:'p13', first_name:'Pablo', last_name:'Castro', gender:'masculino', country:'uruguay', province:'Salto', city:'Salto', category:'2da', level:'2da', ranking_masc:7, ranking_points:3200, ranking_change:-1, club:'Pádel Club Salto', win_rate:51, tournaments_played:11, active:true, photo:'assets/images/player_action.png' },
    { id:'p14', first_name:'Antonella', last_name:'Rojas', gender:'femenino', country:'argentina', province:'Misiones', city:'Posadas', category:'3ra', level:'3ra', ranking_fem:6, ranking_points:2900, ranking_change:3, club:'Posadas Pádel', win_rate:57, tournaments_played:9, active:true, photo:'assets/images/player_action.png' },
  ];
  extra.forEach(p => { if (!DB.players.find(x => x.id === p.id)) DB.players.push(p); });
}
ensureMinPlayers();
