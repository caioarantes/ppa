// Material teórico das matérias da prova de Piloto Privado de Avião (PP-A).
// Conteúdo compilado de fontes públicas (ANAC/RBAC, DECEA/ICA, FAA PHAK, entre outras),
// citadas de forma discreta no campo `sources` de cada artigo.
// A ordem dos artigos segue src/data/subjects.js (mesma ordem da navegação).
//
// Tipos de seção suportados (renderizados em WikiPage.vue):
//   { h2 } | { p } | { list:[] } | { steps:[] } | { note } | { table:{headers,rows} }
// `sources`: [{ label, url }] — exibido como rodapé discreto "Fontes: …".

const articles = [
  // ───────────────────────────────────────────────────────── Regulamentos
  {
    slug: 'regulamentos',
    icon: '📋',
    title: 'Regulamentos de Tráfego Aéreo',
    summary:
      'Regras de voo, estrutura do espaço aéreo, serviços de tráfego aéreo, licenças e fatores humanos — base normativa da ANAC e do DECEA.',
    sections: [
      { h2: 'Órgãos e normas' },
      {
        p: 'No Brasil a aviação civil é regulada pela ANAC (Agência Nacional de Aviação Civil), responsável pelos RBAC (Regulamentos Brasileiros da Aviação Civil), enquanto o controle do espaço aéreo cabe ao DECEA (Departamento de Controle do Espaço Aéreo), que publica as ICA (Instruções do Comando da Aeronáutica) e MCA. Para o piloto privado, os documentos centrais são o RBAC 61 (licenças e habilitações), o RBAC 91 (regras gerais de operação) e a ICA 100-12 (Regras do Ar).',
      },
      {
        list: [
          'RBAC 61 — concessão de licenças, habilitações e requisitos de experiência.',
          'RBAC 91 — regras gerais de operação de aeronaves civis.',
          'ICA 100-12 — Regras do Ar (DECEA).',
          'ICA 100-37 — Serviços de Tráfego Aéreo.',
        ],
      },
      { h2: 'Regras de voo: VFR e IFR' },
      {
        p: 'O voo VFR (Visual Flight Rules) exige condições visuais mínimas (VMC) e é o foco do piloto privado. O IFR (Instrument Flight Rules) permite voar por instrumentos em condições de menor visibilidade, exigindo habilitação específica. As mínimas VMC variam conforme a classe do espaço aéreo e a altitude.',
      },
      {
        note: 'Regra geral VFR (espaço aéreo não controlado, abaixo de 10.000 ft): 1.500 m de distância horizontal e 1.000 ft vertical das nuvens, com visibilidade de voo de pelo menos 5 km (1,5 km em baixas altitudes/baixa velocidade, conforme a ICA 100-12).',
      },
      { h2: 'Estrutura do espaço aéreo' },
      {
        p: 'O espaço aéreo é dividido em classes (A a G no padrão ICAO; no Brasil são usadas as classes A, C, D, E, F e G). Classes A–E são espaço aéreo controlado; F e G são não controlados. A classe define quais serviços de tráfego aéreo são prestados e quais regras (VFR/IFR) são permitidas.',
      },
      {
        table: {
          headers: ['Classe', 'Controlado?', 'VFR permitido?', 'Observação'],
          rows: [
            ['A', 'Sim', 'Não', 'Somente IFR (altos níveis).'],
            ['C', 'Sim', 'Sim', 'Separação IFR/IFR e IFR/VFR; tráfego informado.'],
            ['D', 'Sim', 'Sim', 'Torre de controle; informação de tráfego.'],
            ['E', 'Sim', 'Sim', 'Controle para IFR; VFR sem separação obrigatória.'],
            ['G', 'Não', 'Sim', 'Serviço de informação de voo e alerta.'],
          ],
        },
      },
      { h2: 'Serviços de Tráfego Aéreo (ATS)' },
      {
        list: [
          'Controle de Tráfego Aéreo (ATC) — separação e fluxo de aeronaves.',
          'Serviço de Informação de Voo (FIS) — informações úteis à segurança.',
          'Serviço de Alerta — notifica órgãos de busca e salvamento.',
        ],
      },
      { h2: 'Documentos da aeronave e do piloto' },
      {
        p: 'A aeronave deve portar documentos como o Certificado de Matrícula (CM), o Certificado de Aeronavegabilidade (CA) e a apólice de seguro (RETA). O piloto deve portar licença, habilitação válida e o Certificado Médico Aeronáutico (CMA) dentro da validade.',
      },
      { h2: 'Fatores humanos' },
      {
        p: 'Fatores humanos tratam das limitações fisiológicas e psicológicas que afetam o desempenho do piloto: hipóxia (falta de oxigênio em altitude), hiperventilação, desorientação espacial, fadiga, ilusões visuais e os efeitos de álcool e medicamentos. A regra prática "IMSAFE" (Illness, Medication, Stress, Alcohol, Fatigue, Emotion/Eating) ajuda na autoavaliação antes do voo.',
      },
      {
        note: 'Hipóxia pode iniciar de forma sutil já a partir de ~10.000 ft, com euforia e queda de julgamento. O uso de oxigênio suplementar torna-se exigível acima de determinadas altitudes/tempo de exposição conforme o RBAC 91.',
      },
    ],
    sources: [
      { label: 'ANAC — RBAC 61 e 91', url: 'https://www.gov.br/anac/pt-br/assuntos/legislacao/legislacao-1/rbha-e-rbac' },
      { label: 'DECEA — ICA 100-12 (Regras do Ar)', url: 'https://publicacoes.decea.mil.br/' },
      { label: 'FAA — Pilot’s Handbook of Aeronautical Knowledge', url: 'https://www.faa.gov/regulations_policies/handbooks_manuals/aviation/phak' },
    ],
  },

  // ───────────────────────────────────────────────────────── Meteorologia
  {
    slug: 'meteorologia',
    icon: '🌦️',
    title: 'Meteorologia',
    summary:
      'A atmosfera e seus fenômenos: pressão, temperatura, umidade, vento, nuvens, frentes, e a leitura de informes METAR e TAF.',
    sections: [
      { h2: 'A atmosfera' },
      {
        p: 'A atmosfera divide-se em camadas; o tempo meteorológico ocorre na troposfera (até ~11 km nas latitudes médias). A temperatura cai em média 2 °C a cada 1.000 ft de subida (gradiente padrão). A atmosfera-padrão internacional (ISA) define ao nível do mar 15 °C, 1013,25 hPa (29,92 inHg) e densidade de referência.',
      },
      { h2: 'Pressão e altimetria' },
      {
        p: 'O altímetro é um barômetro calibrado em altitude. O ajuste QNH faz o altímetro indicar a altitude em relação ao nível do mar; o QFE indica a altura em relação ao aeródromo. Voar de uma região de alta para baixa pressão sem reajustar o QNH faz o altímetro indicar a mais — a aeronave está mais baixa do que mostra ("de alta para baixa, cuidado embaixo").',
      },
      {
        note: 'Altitude-densidade alta (calor, altitude elevada, umidade) reduz o desempenho: menos sustentação, menos potência e corridas de decolagem mais longas.',
      },
      { h2: 'Umidade, nuvens e nevoeiro' },
      {
        p: 'O ar contém vapor d’água; quando resfriado até o ponto de orvalho, ocorre condensação, formando nuvens ou nevoeiro. As nuvens classificam-se por altura (baixas, médias, altas) e desenvolvimento. Cumulonimbus (CB) indicam tempestades, com turbulência severa, gelo, raios e cisalhamento — devem ser evitadas.',
      },
      {
        list: [
          'Baixas: Stratus (ST), Stratocumulus (SC), Nimbostratus (NS).',
          'Médias: Altocumulus (AC), Altostratus (AS).',
          'Altas: Cirrus (CI), Cirrostratus (CS), Cirrocumulus (CC).',
          'Desenvolvimento vertical: Cumulus (CU) e Cumulonimbus (CB).',
        ],
      },
      { h2: 'Vento e circulação' },
      {
        p: 'O vento sopra de regiões de alta para baixa pressão, defletido pela força de Coriolis. Próximo à superfície, o atrito reduz a velocidade e altera a direção. Brisas marítimas/terrestres, ventos de vale/montanha e o cisalhamento do vento (wind shear) são importantes nas fases de pouso e decolagem.',
      },
      { h2: 'Massas de ar e frentes' },
      {
        table: {
          headers: ['Frente', 'Características', 'Tempo associado'],
          rows: [
            ['Fria', 'Ar frio avança sob o quente', 'Cumulus/CB, pancadas, turbulência, melhora rápida'],
            ['Quente', 'Ar quente sobe sobre o frio', 'Estratiformes, chuva contínua, tetos baixos'],
            ['Oclusa', 'Frente fria alcança a quente', 'Mistura das duas; tempo complexo'],
            ['Estacionária', 'Sem deslocamento definido', 'Tempo persistente na faixa frontal'],
          ],
        },
      },
      { h2: 'Fenômenos perigosos' },
      {
        list: [
          'Trovoadas (CB): turbulência severa, granizo, raios, cisalhamento.',
          'Formação de gelo: em nuvens com água super-resfriada e temperatura ≤ 0 °C.',
          'Nevoeiro: reduz drasticamente a visibilidade.',
          'Turbulência e tesoura de vento em baixa altitude.',
        ],
      },
      { h2: 'METAR e TAF' },
      {
        p: 'O METAR é o informe da condição observada no aeródromo; o TAF é a previsão. Saber decodificá-los é essencial. Exemplo: "METAR SBSP 121800Z 09010KT 9999 FEW030 25/18 Q1018" → São Paulo/Congonhas, dia 12 às 1800Z, vento 090° a 10 kt, visibilidade ≥ 10 km, poucas nuvens a 3.000 ft, temperatura 25 °C, ponto de orvalho 18 °C, QNH 1018 hPa.',
      },
      {
        note: 'Os horários nos informes são sempre em UTC (Zulu). No Brasil, o horário local de Brasília costuma estar 3 horas atrás do UTC (UTC−3).',
      },
    ],
    sources: [
      { label: 'DECEA / REDEMET — informes meteorológicos', url: 'https://www.redemet.aer.mil.br/' },
      { label: 'OMM/ICAO — códigos METAR e TAF', url: 'https://www.icao.int/' },
      { label: 'FAA — Aviation Weather Handbook', url: 'https://www.faa.gov/regulations_policies/handbooks_manuals/aviation/aviation_weather_handbook' },
    ],
  },

  // ───────────────────────────────────────────────────────── Navegação
  {
    slug: 'navegacao',
    icon: '🧭',
    title: 'Navegação Aérea',
    summary:
      'Como ir de A a B com segurança: cartas, rumos e proas, declinação magnética, navegação estimada e auxílios eletrônicos.',
    sections: [
      { h2: 'A Terra e as coordenadas' },
      {
        p: 'A posição é dada por latitude (paralelos, 0–90° N/S a partir do Equador) e longitude (meridianos, 0–180° E/W a partir de Greenwich). Uma milha náutica (NM) ≈ 1.852 m corresponde a 1 minuto de arco de meridiano. Velocidades em aviação são medidas em nós (knots = NM/h).',
      },
      { h2: 'Rumo, proa e direções' },
      {
        list: [
          'Rumo (track): a trajetória sobre o solo.',
          'Proa (heading): para onde o nariz aponta.',
          'Norte verdadeiro: eixo geográfico. Norte magnético: para onde aponta a bússola.',
          'Deriva: ângulo entre proa e rumo, causado pelo vento.',
        ],
      },
      { h2: 'Declinação magnética' },
      {
        p: 'A declinação (variação) magnética é o ângulo entre o norte verdadeiro e o magnético, variando conforme o local e o tempo. Converte-se rumo verdadeiro em magnético somando a declinação W ou subtraindo a E ("variação W soma, E subtrai"). A bússola ainda sofre desvio (deviation) causado pelo campo magnético da própria aeronave.',
      },
      {
        note: 'Sequência clássica: Rumo Verdadeiro → (±declinação) → Rumo Magnético → (±desvio) → Rumo Bússola.',
      },
      { h2: 'Cartas aeronáuticas' },
      {
        p: 'As cartas WAC, de navegação visual e as ENRC/terminais trazem relevo, obstáculos, espaço aéreo, auxílios-rádio e aeródromos. O piloto VFR usa principalmente cartas de navegação visual, identificando pontos de referência no solo (rios, estradas, cidades) para a navegação observada.',
      },
      { h2: 'Navegação estimada (dead reckoning)' },
      {
        p: 'Consiste em calcular proa, tempo e combustível a partir de velocidade, vento e distância. Com o triângulo do vento determina-se a correção de deriva e a velocidade no solo (GS). O computador de voo (E6B) resolve esses cálculos de tempo, distância, consumo e conversões.',
      },
      {
        steps: [
          'Meça rumo verdadeiro e distância na carta.',
          'Aplique o vento previsto para achar a correção de deriva e a GS.',
          'Converta para rumo/proa magnética (declinação) e de bússola (desvio).',
          'Calcule tempo de etapa (distância ÷ GS) e combustível necessário + reserva.',
        ],
      },
      { h2: 'Auxílios à navegação' },
      {
        table: {
          headers: ['Auxílio', 'Princípio', 'Indicação'],
          rows: [
            ['VOR', 'Radial VHF a partir da estação', 'Marcação em relação ao VOR (radiais)'],
            ['NDB / ADF', 'Estação não-direcional + indicador a bordo', 'Direção relativa à estação'],
            ['DME', 'Distância oblíqua por tempo de eco', 'Distância em NM até a estação'],
            ['GNSS / GPS', 'Posição por satélites', 'Latitude/longitude e navegação direta'],
          ],
        },
      },
      {
        note: 'Mesmo com GPS, o piloto privado deve dominar a navegação observada e estimada: o equipamento eletrônico pode falhar e a carta + relógio + bússola permanecem como recurso.',
      },
    ],
    sources: [
      { label: 'DECEA — cartas aeronáuticas (AISWEB)', url: 'https://aisweb.decea.mil.br/' },
      { label: 'FAA — Pilot’s Handbook (Navigation)', url: 'https://www.faa.gov/regulations_policies/handbooks_manuals/aviation/phak' },
      { label: 'ICAO — Annex 4 (Aeronautical Charts)', url: 'https://www.icao.int/' },
    ],
  },

  // ───────────────────────────────────────────────────────── Teoria de Voo
  {
    slug: 'teoria-de-voo',
    icon: '✈️',
    title: 'Teoria de Voo',
    summary:
      'Por que o avião voa: sustentação e arrasto, as quatro forças, o estol, eixos e comandos, e a estabilidade.',
    sections: [
      { h2: 'As quatro forças' },
      {
        p: 'No voo retilíneo e nivelado, quatro forças se equilibram: sustentação (para cima) contra peso (para baixo), e tração (para frente) contra arrasto (para trás). Em voo nivelado e constante, sustentação = peso e tração = arrasto.',
      },
      { h2: 'O aerofólio e a sustentação' },
      {
        p: 'A asa (aerofólio) gera sustentação ao defletir o fluxo de ar para baixo: pela 3ª lei de Newton, a asa recebe uma reação para cima; o efeito é descrito também pelo princípio de Bernoulli (menor pressão no extradorso). A sustentação depende do ângulo de ataque, da forma do aerofólio, da densidade do ar, da área da asa e do quadrado da velocidade.',
      },
      {
        list: [
          'Ângulo de ataque (AoA): ângulo entre a corda da asa e o vento relativo.',
          'Aumentar o AoA aumenta a sustentação… até o ângulo crítico.',
          'Sustentação ∝ velocidade²: dobrar a velocidade quadruplica a sustentação.',
        ],
      },
      { h2: 'Arrasto' },
      {
        p: 'O arrasto total combina o arrasto parasita (atrito e forma, cresce com a velocidade) e o arrasto induzido (subproduto da geração de sustentação, maior em baixas velocidades/alto AoA). A soma tem um mínimo numa velocidade que define a maior eficiência (melhor planeio e maior autonomia).',
      },
      { h2: 'O estol (stall)' },
      {
        p: 'O estol ocorre quando o ângulo de ataque ultrapassa o ângulo crítico (tipicamente ~15–16°) e o fluxo descola da asa, com perda abrupta de sustentação. O estol depende do AoA, não diretamente da velocidade — um avião pode estolar em qualquer atitude ou velocidade se exceder o ângulo crítico.',
      },
      {
        note: 'Recuperação básica de estol: reduzir o ângulo de ataque (aliviar a pressão no manche), aplicar potência e nivelar as asas com leme/profundor — sem usar ailerons de forma brusca.',
      },
      { h2: 'Eixos e comandos' },
      {
        table: {
          headers: ['Eixo', 'Movimento', 'Comando'],
          rows: [
            ['Longitudinal', 'Rolamento (roll)', 'Ailerons'],
            ['Lateral', 'Arfagem (pitch)', 'Profundor (manche)'],
            ['Vertical', 'Guinada (yaw)', 'Leme (pedais)'],
          ],
        },
      },
      { h2: 'Curvas e fator de carga' },
      {
        p: 'Numa curva, a sustentação se inclina e parte dela passa a "puxar" o avião para o centro da curva, exigindo mais sustentação total para manter a altitude. Isso aumenta o fator de carga (g) e, com ele, a velocidade de estol — por isso curvas acentuadas próximas ao solo são perigosas.',
      },
      { h2: 'Estabilidade' },
      {
        p: 'Estabilidade é a tendência de o avião retornar à condição original após uma perturbação. A estabilidade longitudinal (arfagem) é influenciada pela posição do centro de gravidade (CG): CG muito à frente deixa o avião "pesado de nariz"; CG muito atrás reduz a estabilidade e dificulta a recuperação de estol.',
      },
    ],
    sources: [
      { label: 'FAA — Pilot’s Handbook of Aeronautical Knowledge', url: 'https://www.faa.gov/regulations_policies/handbooks_manuals/aviation/phak' },
      { label: 'FAA — Airplane Flying Handbook', url: 'https://www.faa.gov/regulations_policies/handbooks_manuals/aviation/airplane_handbook' },
      { label: 'NASA — Beginner’s Guide to Aeronautics', url: 'https://www.grc.nasa.gov/www/k-12/airplane/' },
    ],
  },

  // ──────────────────────────────────────────────── Conhecimentos Técnicos
  {
    slug: 'conhecimentos-tecnicos',
    icon: '🛠️',
    title: 'Conhecimentos Técnicos',
    summary:
      'A aeronave por dentro: célula, motor a pistão, hélice, sistemas, instrumentos, performance e peso e balanceamento.',
    sections: [
      { h2: 'Célula (estrutura)' },
      {
        p: 'A célula compreende fuselagem, asas, empenagem (estabilizadores horizontal e vertical), trem de pouso e superfícies de comando. Os flapes aumentam a sustentação (e o arrasto) para voos mais lentos no pouso e na decolagem.',
      },
      { h2: 'Motor a pistão' },
      {
        p: 'A maioria dos aviões leves usa motor a pistão de 4 tempos (admissão, compressão, combustão, escapamento), refrigerado a ar e movido a gasolina de aviação (AVGAS). Sistemas associados: ignição (dois magnetos independentes, por segurança e melhor combustão), carburação ou injeção, lubrificação e refrigeração.',
      },
      {
        list: [
          'Magnetos duplos: redundância e checagem no cheque de motor ("queda de RPM" tolerada).',
          'Mistura ar/combustível: empobrecida em altitude para manter a eficiência.',
          'Gelo de carburador: risco em umidade alta e potência reduzida — usar aquecimento de carburador.',
        ],
      },
      { h2: 'Hélice' },
      {
        p: 'A hélice converte a potência do motor em tração; é um aerofólio que gira. Pode ser de passo fixo (simples) ou de passo variável/velocidade constante (governador mantém RPM ótima). O ângulo de pá varia da raiz à ponta para manter ângulo de ataque eficiente ao longo do raio.',
      },
      { h2: 'Sistemas e instrumentos' },
      {
        table: {
          headers: ['Instrumento', 'Fonte', 'Mede'],
          rows: [
            ['Velocímetro (ASI)', 'Pitot + estática', 'Velocidade indicada (IAS)'],
            ['Altímetro', 'Estática', 'Altitude (ajuste QNH)'],
            ['Climb (VSI)', 'Estática', 'Razão de subida/descida'],
            ['Horizonte artificial', 'Giroscópio', 'Atitude (arfagem/rolamento)'],
            ['Indicador de proa', 'Giroscópio', 'Proa (alinhar com a bússola)'],
          ],
        },
      },
      {
        note: 'Marcações do velocímetro: arco branco (faixa de flapes), arco verde (operação normal), arco amarelo (cautela, só em ar calmo) e linha vermelha (Vne — nunca exceder).',
      },
      { h2: 'Performance' },
      {
        p: 'O desempenho (decolagem, subida, cruzeiro, pouso) depende de peso, altitude-densidade, vento e estado da pista. Calor e altitude elevada reduzem a densidade do ar e degradam a performance. As cartas do manual da aeronave (POH/AFM) fornecem distâncias e razões em cada condição.',
      },
      { h2: 'Peso e balanceamento' },
      {
        p: 'Operar dentro dos limites de peso e do envelope de centro de gravidade (CG) é essencial para a estabilidade e a controlabilidade. O momento é peso × braço (distância ao datum); o CG é o somatório dos momentos dividido pelo peso total. Exceder o peso máximo ou sair do envelope de CG compromete a segurança do voo.',
      },
      {
        steps: [
          'Liste peso e braço de cada item: aeronave vazia, tripulação, combustível, bagagem.',
          'Calcule o momento de cada item (peso × braço).',
          'Some pesos e momentos; CG = momento total ÷ peso total.',
          'Verifique se peso e CG ficam dentro do envelope do manual (POH).',
        ],
      },
    ],
    sources: [
      { label: 'FAA — Pilot’s Handbook of Aeronautical Knowledge', url: 'https://www.faa.gov/regulations_policies/handbooks_manuals/aviation/phak' },
      { label: 'FAA — Airplane Flying Handbook', url: 'https://www.faa.gov/regulations_policies/handbooks_manuals/aviation/airplane_handbook' },
      { label: 'ANAC — Regulamentos (RBAC)', url: 'https://www.gov.br/anac/pt-br/assuntos/legislacao/legislacao-1/rbha-e-rbac' },
    ],
  },
]

export default articles
