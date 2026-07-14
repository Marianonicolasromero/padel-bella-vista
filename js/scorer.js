/* ============================================================
   PADELBELL — Motor de Puntuación de Pádel (scorer.js)
   Lógica completa: sets, games, puntos, faltas, deshacer
   ============================================================ */

'use strict';

/* -----------------------------------------------------------
   CONSTANTES DE PUNTUACIÓN
   ----------------------------------------------------------- */
const POINT_SEQUENCE = [0, 15, 30, 40];

const SCORE_LABELS = {
  0: '0', 15: '15', 30: '30', 40: '40',
  'advantage_a': 'Ventaja', 'advantage_b': 'Ventaja',
  'golden': 'Oro'
};

/* -----------------------------------------------------------
   CLASE PadelScorer
   Maneja un partido completo de pádel con todas las reglas.
   ----------------------------------------------------------- */
class PadelScorer {
  /**
   * @param {object} config
   * @param {string} config.matchId         - ID del partido
   * @param {string} config.pairAName       - Nombre pareja A (ej: "Ramírez / Medina")
   * @param {string} config.pairBName       - Nombre pareja B
   * @param {string} config.scoringMode     - 'ventaja' | 'punto_de_oro'
   * @param {number} config.setsToWin       - Sets necesarios para ganar (default 2)
   * @param {number} config.gamesPerSet     - Juegos por set (default 6)
   * @param {function} config.onChange      - Callback al cambiar el estado
   */
  constructor(config) {
    this.matchId     = config.matchId || `m_${Date.now()}`;
    this.pairAName   = config.pairAName   || 'Pareja A';
    this.pairBName   = config.pairBName   || 'Pareja B';
    this.scoringMode = config.scoringMode || 'ventaja'; // 'ventaja' | 'punto_de_oro'
    this.setsToWin   = config.setsToWin  || 2;
    this.gamesPerSet = config.gamesPerSet || 6;
    this.onChange    = config.onChange    || (() => {});

    this._initState();
  }

  /* ------ Inicialización del estado ------ */
  _initState() {
    this.state = {
      matchId:     this.matchId,
      pairAName:   this.pairAName,
      pairBName:   this.pairBName,
      scoringMode: this.scoringMode,
      status:      'in_progress', // 'in_progress' | 'finished'
      winner:      null,          // null | 'a' | 'b'

      // Sets ganados por cada pareja
      setsA: 0,
      setsB: 0,

      // Historial de sets jugados [{a: 6, b: 3}, ...]
      setsHistory: [],

      // Juegos del set actual
      gamesA: 0,
      gamesB: 0,

      // Puntos del juego actual (índice en POINT_SEQUENCE)
      pointsA: 0,
      pointsB: 0,

      // Deuce state: null | 'advantage_a' | 'advantage_b' | 'golden'
      deuceState: null,

      // Tiebreak
      isTiebreak: false,
      tiebreakA:  0,
      tiebreakB:  0,

      // Dobles faltas en el juego actual
      faultsA: 0,
      faultsB: 0,

      // Indicadores especiales
      isSetPoint:   false,
      isMatchPoint: false,
      setPointFor:  null, // 'a' | 'b'
      matchPointFor: null,

      // Tiempo
      startedAt:   Date.now(),
      finishedAt:  null,

      // Servicio actual
      serve: 'a', // 'a' | 'b'

      // Número del set actual (1-based)
      currentSet: 1,
    };

    // Historial para función Deshacer
    this._history = [];
  }

  /* ------ Snapshot para deshacer ------ */
  _snapshot() {
    this._history.push(JSON.parse(JSON.stringify(this.state)));
    if (this._history.length > 100) this._history.shift(); // máx 100 pasos
  }

  /* ------ Deshacer último punto ------ */
  undo() {
    if (!this._history.length) return false;
    this.state = this._history.pop();
    this.onChange(this.getSnapshot());
    return true;
  }

  /* ------ Agregar punto a una pareja ------ */
  addPoint(pair) {
    if (this.state.status === 'finished') return;
    this._snapshot();

    if (this.state.isTiebreak) {
      this._addTiebreakPoint(pair);
    } else {
      this._addGamePoint(pair);
    }

    this._detectSpecialStates();
    this._save();
    this.onChange(this.getSnapshot());
  }

  /* ------ Agregar doble falta (punto para el rival) ------ */
  addFault(pair) {
    if (this.state.status === 'finished') return;
    this._snapshot();

    const s = this.state;
    if (pair === 'a') {
      s.faultsA++;
      if (s.faultsA >= 2) { s.faultsA = 0; this._addGamePoint('b'); }
    } else {
      s.faultsB++;
      if (s.faultsB >= 2) { s.faultsB = 0; this._addGamePoint('a'); }
    }

    this._detectSpecialStates();
    this._save();
    this.onChange(this.getSnapshot());
  }

  /* ------ Lógica de puntos en juego normal ------ */
  _addGamePoint(pair) {
    const s = this.state;
    const other = pair === 'a' ? 'b' : 'a';

    // En estado de Deuce / Ventaja / Punto de Oro
    if (s.deuceState !== null) {
      if (s.deuceState === 'golden') {
        // Punto de oro: quien gana el punto, gana el juego
        this._winGame(pair);
        return;
      }
      if (s.deuceState === `advantage_${pair}`) {
        // Tiene ventaja y gana → gana el juego
        this._winGame(pair);
        return;
      }
      if (s.deuceState === `advantage_${other}`) {
        // El otro tenía ventaja, se va a Deuce de nuevo
        s.deuceState = this.scoringMode === 'punto_de_oro' ? 'golden' : null;
        if (this.scoringMode === 'ventaja') {
          // Deuce: ambos vuelven a 40
          s.pointsA = 3;
          s.pointsB = 3;
        }
        return;
      }
    }

    // Avanzar punto normalmente
    const ptKey = pair === 'a' ? 'pointsA' : 'pointsB';
    s[ptKey]++;

    const ptA = s.pointsA;
    const ptB = s.pointsB;

    // Deuce: ambos en 40 (índice 3)
    if (ptA === 3 && ptB === 3) {
      if (this.scoringMode === 'punto_de_oro') {
        s.deuceState = 'golden';
      } else {
        s.deuceState = null; // deuce normal, próximo punto da ventaja
      }
      return;
    }

    // Ganar juego: llegar a 40 y el otro tiene menos de 40
    if (s[ptKey] > 3) {
      this._winGame(pair);
    }
  }

  /* ------ Ganar un juego ------ */
  _winGame(pair) {
    const s = this.state;

    // Resetear puntos y faltas del juego
    s.pointsA   = 0;
    s.pointsB   = 0;
    s.deuceState = null;
    s.faultsA   = 0;
    s.faultsB   = 0;

    // Alternar servicio (cada juego cambia el saque)
    s.serve = s.serve === 'a' ? 'b' : 'a';

    if (pair === 'a') s.gamesA++;
    else              s.gamesB++;

    // Verificar si empieza tiebreak
    if (s.gamesA === this.gamesPerSet && s.gamesB === this.gamesPerSet) {
      s.isTiebreak = true;
      s.tiebreakA  = 0;
      s.tiebreakB  = 0;
      return;
    }

    // Verificar si ganó el set
    if (s.gamesA >= this.gamesPerSet && s.gamesA - s.gamesB >= 2) {
      this._winSet('a');
    } else if (s.gamesB >= this.gamesPerSet && s.gamesB - s.gamesA >= 2) {
      this._winSet('b');
    }
  }

  /* ------ Lógica de tiebreak ------ */
  _addTiebreakPoint(pair) {
    const s = this.state;

    if (pair === 'a') s.tiebreakA++;
    else              s.tiebreakB++;

    const ta = s.tiebreakA;
    const tb = s.tiebreakB;

    // Ganar tiebreak: primero a 7 con diferencia de 2 (no hay límite)
    if ((ta >= 7 || tb >= 7) && Math.abs(ta - tb) >= 2) {
      const winner = ta > tb ? 'a' : 'b';
      this._winSet(winner);
      s.isTiebreak  = false;
      s.tiebreakA   = 0;
      s.tiebreakB   = 0;
    }

    // Cambiar servicio en tiebreak: cada 2 puntos (excepto el primero)
    const totalPts = s.tiebreakA + s.tiebreakB;
    if (totalPts > 0 && totalPts % 2 === 1) {
      s.serve = s.serve === 'a' ? 'b' : 'a';
    }
  }

  /* ------ Ganar un set ------ */
  _winSet(pair) {
    const s = this.state;

    // Guardar en historial de sets
    s.setsHistory.push({ a: s.gamesA, b: s.gamesB });

    // Sumar set
    if (pair === 'a') s.setsA++;
    else              s.setsB++;

    s.currentSet++;

    // Verificar si ganó el partido
    if (s.setsA >= this.setsToWin || s.setsB >= this.setsToWin) {
      s.status     = 'finished';
      s.winner     = pair;
      s.finishedAt = Date.now();
    }

    // Resetear juegos del nuevo set
    s.gamesA = 0;
    s.gamesB = 0;
    s.faultsA = 0;
    s.faultsB = 0;

    // En sets 2 y 3, el perdedor del set anterior saca
    s.serve = s.serve === 'a' ? 'b' : 'a';
  }

  /* ------ Detectar Set Point / Match Point ------ */
  _detectSpecialStates() {
    const s = this.state;
    s.isSetPoint   = false;
    s.isMatchPoint = false;
    s.setPointFor  = null;
    s.matchPointFor = null;

    if (s.status === 'finished') return;

    // Chequear para cada pareja
    ['a', 'b'].forEach(pair => {
      const other = pair === 'a' ? 'b' : 'a';
      const mySets   = pair === 'a' ? s.setsA : s.setsB;
      const myGames  = pair === 'a' ? s.gamesA : s.gamesB;
      const myPts    = pair === 'a' ? s.pointsA : s.pointsB;
      const otherPts = pair === 'a' ? s.pointsB : s.pointsA;

      // Necesita 1 set más para ganar el partido
      const needSets = this.setsToWin - mySets === 1;

      // Está en posición de ganar el juego (40 o ventaja a su favor)
      const canWinGame = (myPts === 3 && otherPts < 3) ||
                         s.deuceState === `advantage_${pair}` ||
                         s.deuceState === 'golden';

      // Está en posición de ganar el set
      const canWinSet = (myGames >= this.gamesPerSet - 1) || s.isTiebreak;

      if (canWinGame && canWinSet) {
        if (needSets) {
          s.isMatchPoint  = true;
          s.matchPointFor = pair;
        } else {
          s.isSetPoint  = true;
          s.setPointFor = pair;
        }
      }
    });
  }

  /* ------ Getters de visualización ------ */
  getPointLabel(pair) {
    const s = this.state;

    if (s.isTiebreak) {
      return pair === 'a' ? String(s.tiebreakA) : String(s.tiebreakB);
    }

    // Deuce / Ventaja / Punto de Oro
    if (s.deuceState !== null) {
      if (s.deuceState === 'golden') return 'Oro';
      if (s.deuceState === `advantage_${pair}`) return 'Vent.';
      if (s.deuceState !== null) return '40';
    }

    const idx = pair === 'a' ? s.pointsA : s.pointsB;
    return POINT_SEQUENCE[Math.min(idx, 3)]?.toString() || '0';
  }

  getScoreDisplay() {
    const s = this.state;
    return {
      setsA:       s.setsA,
      setsB:       s.setsB,
      gamesA:      s.gamesA,
      gamesB:      s.gamesB,
      pointLabelA: this.getPointLabel('a'),
      pointLabelB: this.getPointLabel('b'),
      isTiebreak:  s.isTiebreak,
      tiebreakA:   s.tiebreakA,
      tiebreakB:   s.tiebreakB,
      deuceState:  s.deuceState,
      faultsA:     s.faultsA,
      faultsB:     s.faultsB,
      serve:       s.serve,
      setsHistory: s.setsHistory,
      status:      s.status,
      winner:      s.winner,
      isMatchPoint:  s.isMatchPoint,
      isSetPoint:    s.isSetPoint,
      matchPointFor: s.matchPointFor,
      setPointFor:   s.setPointFor,
      currentSet:    s.currentSet,
      scoringMode:   this.scoringMode,
      pairAName:     s.pairAName,
      pairBName:     s.pairBName,
      duration:      this._getDuration(),
    };
  }

  _getDuration() {
    const ms = (this.state.finishedAt || Date.now()) - this.state.startedAt;
    const m = Math.floor(ms / 60000);
    const h = Math.floor(m / 60);
    return h > 0 ? `${h}h ${m % 60}min` : `${m}min`;
  }

  getSnapshot() {
    return { state: JSON.parse(JSON.stringify(this.state)), display: this.getScoreDisplay() };
  }

  canUndo() { return this._history.length > 0; }

  /* ------ Persistencia ------ */
  _save() {
    try {
      const raw = localStorage.getItem('padelbell_db');
      if (!raw) return;
      const db = JSON.parse(raw);
      if (!db.activeMatches) db.activeMatches = {};
      db.activeMatches[this.matchId] = this.state;
      localStorage.setItem('padelbell_db', JSON.stringify(db));
    } catch(e) { /* no-op */ }
  }

  static load(matchId) {
    try {
      const raw = localStorage.getItem('padelbell_db');
      if (!raw) return null;
      const db = JSON.parse(raw);
      return db.activeMatches?.[matchId] || null;
    } catch(e) { return null; }
  }

  static clearMatch(matchId) {
    try {
      const raw = localStorage.getItem('padelbell_db');
      if (!raw) return;
      const db = JSON.parse(raw);
      if (db.activeMatches) delete db.activeMatches[matchId];
      localStorage.setItem('padelbell_db', JSON.stringify(db));
    } catch(e) { /* no-op */ }
  }
}

/* -----------------------------------------------------------
   UTILIDADES GLOBALES DE PUNTUACIÓN
   ----------------------------------------------------------- */

/** Formatea resultado de set para display: "6-4" */
function formatSetScore(set) {
  if (!set) return '—';
  return `${set.a}-${set.b}`;
}

/** Calcula duración legible entre dos timestamps */
function calcMatchDuration(startTs, endTs) {
  const ms = (endTs || Date.now()) - startTs;
  const m  = Math.floor(ms / 60000);
  return m < 60 ? `${m} min` : `${Math.floor(m/60)}h ${m%60}min`;
}

/** Convierte resultado completo a string resumido: "6-4 / 3-6 / 7-5" */
function formatMatchResult(setsHistory) {
  if (!setsHistory || !setsHistory.length) return 'Sin resultado';
  return setsHistory.map(s => `${s.a}-${s.b}`).join(' / ');
}

/* Exportar globalmente para uso en páginas */
window.PadelScorer       = PadelScorer;
window.formatSetScore    = formatSetScore;
window.calcMatchDuration = calcMatchDuration;
window.formatMatchResult = formatMatchResult;
