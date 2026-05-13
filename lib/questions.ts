import { Question, Difficulty, QuestionType } from '@/types/game'

export const sampleQuestions: Question[] = [
  // --- TITRE I: CONNAISSANCE ET PHYSIONOMIE DU DROIT ---
  {
    id: 'intro_obj_subj',
    label: "Le droit envisagé du côté de l'objet sur lequel il porte est le :",
    options: ['Droit objectif', 'Droit subjectif', 'Droit naturel', 'Droit divin'],
    correctIndex: 0,
    difficulty: 'facile',
    type: 'qcm',
    category: 'introduction',
    explanation: "Le droit objectif est l'ensemble des règles de droit applicables dans une société déterminée."
  },
  {
    id: 'intro_constitu',
    label: "Quels sont les trois éléments constitutifs de la règle de droit ?",
    options: [
      "Conduite, Autorité étatique, Sanction",
      "Morale, Religion, Loi",
      "Justice, Équité, Sanction",
      "Parlement, Gouvernement, Peuple"
    ],
    correctIndex: 0,
    difficulty: 'moyen',
    type: 'qcm',
    category: 'introduction',
    explanation: "La règle de droit est une règle de conduite qui émane d'une autorité étatique et qui est sanctionnée."
  },
  {
    id: 'intro_sanction_civile',
    label: "L'annulation d'un acte irrégulier est une sanction de nature :",
    options: ['Pénale', 'Civile', 'Disciplinaire', 'Administrative'],
    correctIndex: 1,
    difficulty: 'facile',
    type: 'qcm',
    category: 'introduction',
    explanation: "La nullité fait disparaître complètement l'acte irrégulier et constitue une sanction civile."
  },
  {
    id: 'intro_caracteres',
    label: "La règle de droit est générale, impersonnelle et :",
    options: ['Abstraite', 'Concrète', 'Individuelle', 'Secrète'],
    correctIndex: 0,
    difficulty: 'facile',
    type: 'qcm',
    category: 'introduction',
    explanation: "La règle de droit reste dans l'abstraction : elle ne vise personne tout en visant tout le monde."
  },
  {
    id: 'intro_erga_omnes',
    label: "Que signifie le caractère 'Erga omnes' d'une règle ?",
    options: [
      "Elle s'applique à tous sans exception",
      "Elle est facultative",
      "Elle ne s'applique qu'aux juges",
      "Elle est secrète"
    ],
    correctIndex: 0,
    difficulty: 'moyen',
    type: 'qcm',
    category: 'introduction',
    explanation: "Erga omnes signifie que la règle s'impose à l'égard de tous."
  },
  {
    id: 'intro_suppletive',
    label: "Une règle dont on peut écarter l'application par une volonté contraire est dite :",
    options: ['Impérative', 'Supplétive', 'Désuète', 'Obscure'],
    correctIndex: 1,
    difficulty: 'moyen',
    type: 'qcm',
    category: 'introduction',
    explanation: "La règle supplétive supplée la volonté non exprimée des parties ; elles peuvent y déroger."
  },

  // --- TITRE II: COMPRÉHENSION DU DROIT (SCIENCE ET MÉTHODE) ---
  {
    id: 'methode_syllogisme',
    label: "Le syllogisme juridique repose sur un triptyque :",
    options: [
      "Majeure, Mineure, Conclusion",
      "Loi, Faits, Sanction",
      "Demande, Défense, Jugement",
      "Preuve, Indice, Vérité"
    ],
    correctIndex: 0,
    difficulty: 'moyen',
    type: 'qcm',
    category: 'introduction',
    explanation: "Ex: La majorité est à 18 ans (Majeure), Fatou a 17 ans (Mineure), Fatou n'est pas majeure (Conclusion)."
  },
  {
    id: 'methode_presomption',
    label: "La conséquence que la loi tire d'un fait connu pour aboutir à un fait inconnu est :",
    options: ["Une présomption", "Une preuve littérale", "Un témoignage", "Un aveu"],
    correctIndex: 0,
    difficulty: 'moyen',
    type: 'qcm',
    category: 'introduction',
    explanation: "C'est la définition de la présomption (ex: présomption de paternité légitime)."
  },
  {
    id: 'methode_irrefragable',
    label: "Une présomption que l'on ne peut pas contester par une preuve contraire est dite :",
    options: ['Simple', 'Mixte', 'Irrefragable', 'Relative'],
    correctIndex: 2,
    difficulty: 'difficile',
    type: 'qcm',
    category: 'introduction',
    explanation: "La présomption irréfragable est une vérité définitive et irrévocable devant la loi."
  },
  {
    id: 'aux_histoire',
    label: "Quelle science auxiliaire consiste à s'inspirer des systèmes juridiques étrangers ?",
    options: ['Droit comparé', 'Histoire du droit', 'Sociologie juridique', 'Anthropologie'],
    correctIndex: 0,
    difficulty: 'facile',
    type: 'qcm',
    category: 'introduction',
    explanation: "Le droit comparé étudie les systèmes étrangers pour améliorer le droit national."
  },

  // --- SOURCES DU DROIT (LOI ET RÈGLEMENT) ---
  {
    id: 'loi_organique',
    label: "La loi qui précise les modalités d'application de la Constitution est :",
    options: ['La loi simple', 'La loi organique', 'La loi référendaire', 'L\'ordonnance'],
    correctIndex: 1,
    difficulty: 'moyen',
    type: 'qcm',
    category: 'constitution',
    explanation: "La loi organique est supérieure à la loi simple mais inférieure à la Constitution (supralégale)."
  },
  {
    id: 'loi_initiative',
    label: "Quand l'initiative de la loi vient des députés, on parle de :",
    options: ['Projet de loi', 'Proposition de loi', 'Décret-loi', 'Motion'],
    correctIndex: 1,
    difficulty: 'facile',
    type: 'qcm',
    category: 'constitution',
    explanation: "Projet (Exécutif) vs Proposition (Législatif)."
  },
  {
    id: 'loi_hierarchie',
    label: "Quelle est la hiérarchie correcte des normes au Sénégal ?",
    options: [
      "Constitution > Traités > Lois Organiques > Lois Ordinaires",
      "Traités > Constitution > Lois Ordinaires",
      "Lois Organiques > Constitution > Décrets",
      "Constitution > Lois Ordinaires > Traités"
    ],
    correctIndex: 0,
    difficulty: 'difficile',
    type: 'qcm',
    category: 'introduction',
    explanation: "Selon l'Art 98, les traités ont une autorité supérieure aux lois. La Constitution reste au sommet, suivie des lois organiques puis ordinaires."
  },
  {
    id: 'regle_arrete',
    label: "L'acte pris par un ministre ou un préfet s'appelle :",
    options: ['Un décret', 'Un arrêté', 'Une circulaire', 'Une loi'],
    correctIndex: 1,
    difficulty: 'facile',
    type: 'qcm',
    category: 'introduction',
    explanation: "Le Président prend des décrets, les ministres et autorités administratives prennent des arrêtés."
  },

  // --- SOURCES INDIRECTES (JURISPRUDENCE, COUTUME, DOCTRINE) ---
  {
    id: 'juris_deni',
    label: "Le juge qui refuse de juger sous prétexte du silence de la loi commet un :",
    options: ['Crime de lèse-majesté', 'Déni de justice', 'Abus de pouvoir', 'Vice de forme'],
    correctIndex: 1,
    difficulty: 'difficile',
    type: 'qcm',
    category: 'jurisprudence',
    explanation: "Le juge est tenu de donner une solution même en cas de vide juridique."
  },
  {
    id: 'juris_arret_reglement',
    label: "Il est interdit au juge de rendre des décisions à portée générale. C'est l'interdiction des :",
    options: ['Arrêts de règlement', 'Arrêts de cassation', 'Jugements d\'accord', 'Saisines'],
    correctIndex: 0,
    difficulty: 'difficile',
    type: 'qcm',
    category: 'jurisprudence',
    explanation: "Le juge applique le droit aux cas particuliers, il ne crée pas de règles générales comme le législateur."
  },
  {
    id: 'coutume_elements',
    label: "La coutume repose sur un élément matériel (pratique) et un élément :",
    options: ['Physique', 'Psychologique', 'Légal', 'Religieux'],
    correctIndex: 1,
    difficulty: 'moyen',
    type: 'qcm',
    category: 'introduction',
    explanation: "L'élément psychologique est le fait de croire que la pratique est obligatoire."
  },
  {
    id: 'doctrine_utilite',
    label: "La doctrine désigne les opinions émises par :",
    options: ['Les députés', 'Les spécialistes du droit', 'Les citoyens', 'Les policiers'],
    correctIndex: 1,
    difficulty: 'facile',
    type: 'qcm',
    category: 'introduction',
    explanation: "Professeurs, avocats, magistrats, etc. Leurs avis ne lient pas le juge mais l'influencent."
  },

  // --- APPLICATION DU DROIT (ESPACE ET TEMPS) ---
  {
    id: 'espace_terri',
    label: "Le principe selon lequel la loi s'applique sur tout le territoire national est :",
    options: ['La personnalité', 'La territorialité', 'La souveraineté', 'L\'extranéité'],
    correctIndex: 1,
    difficulty: 'facile',
    type: 'qcm',
    category: 'introduction',
    explanation: "La loi sénégalaise s'applique aux Sénégalais et aux étrangers sur le sol national."
  },
  {
    id: 'temps_promul',
    label: "La loi devient exécutoire après sa publication au :",
    options: ['Soleil', 'Journal Officiel', 'Tribunal', 'Palais de la République'],
    correctIndex: 1,
    difficulty: 'facile',
    type: 'qcm',
    category: 'constitution',
    explanation: "Nul n'est censé ignorer la loi une fois qu'elle est publiée au Journal Officiel."
  },
  {
    id: 'temps_desuetude',
    label: "Une loi qui n'est pas abrogée mais qui n'est plus appliquée est dite :",
    options: ['Abrogée tacitement', 'Tombée en désuétude', 'Rétroactive', 'Nulle'],
    correctIndex: 1,
    difficulty: 'moyen',
    type: 'qcm',
    category: 'introduction',
    explanation: "Ex: La loi de 1967 sur les dépenses excessives lors des cérémonies familiales."
  },
  {
    id: 'temps_retro',
    label: "En principe, la loi nouvelle a un effet immédiat et :",
    options: ['Elle est rétroactive', 'Elle n\'est pas rétroactive', 'Elle est facultative', 'Elle est secrète'],
    correctIndex: 1,
    difficulty: 'moyen',
    type: 'qcm',
    category: 'introduction',
    explanation: "Article 831 du Code de la Famille : la loi nouvelle n'a d'effet que pour l'avenir."
  },
  {
    id: 'temps_retro_exception',
    label: "Quelle loi déroge au principe de non-rétroactivité ?",
    options: [
      "La loi pénale plus douce",
      "La loi civile ordinaire",
      "La loi fiscale",
      "La loi de finances"
    ],
    correctIndex: 0,
    difficulty: 'difficile',
    type: 'qcm',
    category: 'introduction',
    explanation: "La loi pénale plus douce rétroagit si l'infraction n'est pas encore jugée définitivement."
  },

  // --- LES DROITS SUBJECTIFS & PATRIMOINE ---
  {
    id: 'pat_defini',
    label: "Le patrimoine est composé :",
    options: [
      "Uniquement des biens",
      "Uniquement des dettes",
      "D'un actif et d'un passif",
      "Du nom et de la nationalité"
    ],
    correctIndex: 2,
    difficulty: 'facile',
    type: 'qcm',
    category: 'patrimoine',
    explanation: "Le patrimoine est une universalité juridique comprenant les droits et les obligations."
  },
  {
    id: 'pat_unite',
    label: "Au Sénégal, une personne peut être à la tête de deux patrimoines via :",
    options: [
      "L'entreprise individuelle",
      "La société unipersonnelle (OHADA)",
      "Le mariage",
      "Le compte bancaire"
    ],
    correctIndex: 1,
    difficulty: 'difficile',
    type: 'qcm',
    category: 'ohada',
    explanation: "L'entrepreneur OHADA a un patrimoine familial et un patrimoine professionnel distincts."
  },
  {
    id: 'pat_heritage',
    label: "L'héritier qui accepte la succession 'intra vires' :",
    options: [
      "Paye toutes les dettes, même sur ses propres biens",
      "Ne paye les dettes que dans la limite de l'actif reçu",
      "Refuse tout l'héritage",
      "Donne tout à l'État"
    ],
    correctIndex: 1,
    difficulty: 'difficile',
    type: 'qcm',
    category: 'patrimoine',
    explanation: "C'est l'acceptation sous bénéfice d'inventaire."
  },
  {
    id: 'droit_reel_prop',
    label: "Le droit de propriété comprend l'usus, le fructus et l'abusus. L'abusus est :",
    options: [
      "Le droit d'utiliser la chose",
      "Le droit de percevoir les fruits",
      "Le droit de disposer de la chose (vendre, détruire)",
      "Le droit de prêter la chose"
    ],
    correctIndex: 2,
    difficulty: 'moyen',
    type: 'qcm',
    category: 'biens',
    explanation: "L'abusus est la prérogative la plus radicale du propriétaire."
  },
  {
    id: 'droit_nu_prop',
    label: "Dans l'usufruit, le propriétaire qui n'a plus que l'abusus est appelé :",
    options: ['L\'usufruitier', 'Le nu-propriétaire', 'Le locataire', 'Le créancier'],
    correctIndex: 1,
    difficulty: 'difficile',
    type: 'qcm',
    category: 'biens',
    explanation: "Il s'est dépouillé de l'usage et de la jouissance au profit de l'usufruitier."
  },
  {
    id: 'biens_immeuble_dest',
    label: "Un tracteur agricole attaché à une exploitation est un :",
    options: [
      "Immeuble par nature",
      "Immeuble par destination",
      "Meuble par nature",
      "Meuble par anticipation"
    ],
    correctIndex: 1,
    difficulty: 'difficile',
    type: 'qcm',
    category: 'biens',
    explanation: "C'est un meuble que la loi considère comme un immeuble car il sert à l'exploitation d'un fonds."
  },
  {
    id: 'droit_extra_pat',
    label: "Les droits extra-patrimoniaux (ex: droit au nom) sont :",
    options: [
      "Cessibles et transmissibles",
      "Incessibles, imprescriptibles et intransmissibles",
      "Évaluables en argent",
      "Saisissables par les créanciers"
    ],
    correctIndex: 1,
    difficulty: 'moyen',
    type: 'qcm',
    category: 'introduction',
    explanation: "On ne peut pas les vendre, on ne les perd pas par le temps et ils ne passent pas aux héritiers."
  },

  // --- PREUVE ---
  {
    id: 'preuve_charge',
    label: "Qui supporte la charge de la preuve en premier lieu ?",
    options: ['Le juge', 'Le défendeur', 'Le demandeur', 'Le greffier'],
    correctIndex: 2,
    difficulty: 'facile',
    type: 'qcm',
    category: 'introduction',
    explanation: "Actori incumbit probatio : la preuve incombe à celui qui réclame l'exécution d'une obligation."
  },
  {
    id: 'preuve_reine',
    label: "Quelle est la 'reine des preuves' en droit civil ?",
    options: ['Le témoignage', 'L\'écrit (preuve littérale)', 'L\'aveu', 'Le serment'],
    correctIndex: 1,
    difficulty: 'facile',
    type: 'qcm',
    category: 'introduction',
    explanation: "L'écrit est le procédé parfait par excellence."
  },
  {
    id: 'preuve_authentique',
    label: "Un acte rédigé par un notaire est un :",
    options: ['Acte sous seing privé', 'Acte authentique', 'Acte administratif', 'Acte unilatéral'],
    correctIndex: 1,
    difficulty: 'facile',
    type: 'qcm',
    category: 'introduction',
    explanation: "Il est rédigé par un officier public et vaut pleine preuve."
  },
  {
    id: 'preuve_illettre',
    label: "Pour un illettré, la validité d'un acte sous seing privé exige :",
    options: [
      "Une simple empreinte digitale",
      "La présence de deux témoins instrumentaires certifiant l'identité et le consentement",
      "Une signature par procuration",
      "La présence d'un policier"
    ],
    correctIndex: 1,
    difficulty: 'difficile',
    type: 'qcm',
    category: 'introduction',
    explanation: "Le COCC est strict : l'illettré doit être accompagné de deux témoins instrumentaires qui attestent du consentement, ou passer par un acte authentique."
  },

  // --- RÉFORME CONSTITUTIONNELLE 2016 ---
  {
    id: 'const_2016_hcct',
    label: "Quelle institution consultative a été créée par la réforme de 2016 ?",
    options: [
      "Le Sénat",
      "Le Haut Conseil des Collectivités Territoriales (HCCT)",
      "Le Conseil Économique et Social",
      "Le Médiateur de la République"
    ],
    correctIndex: 1,
    difficulty: 'moyen',
    type: 'qcm',
    category: 'constitution',
    explanation: "Le HCCT donne des avis sur les politiques de décentralisation."
  },
  {
    id: 'const_2016_indep',
    label: "La réforme de 2016 garantit la participation à toutes les élections :",
    options: [
      "Uniquement aux partis politiques",
      "Aux candidats indépendants",
      "Uniquement aux binationaux",
      "Aux étrangers résidents"
    ],
    correctIndex: 1,
    difficulty: 'facile',
    type: 'qcm',
    category: 'constitution',
    explanation: "L'article 4 garantit désormais la participation des candidats indépendants."
  },
  {
    id: 'const_2016_ress',
    label: "Selon l'article 25-1, les ressources naturelles appartiennent :",
    options: ["À l'État", "Au Président", "Au Peuple", "Aux investisseurs étrangers"],
    correctIndex: 2,
    difficulty: 'moyen',
    type: 'qcm',
    category: 'constitution',
    explanation: "Les ressources naturelles appartiennent au peuple et doivent être utilisées pour son bien-être."
  },
  {
    id: 'const_2016_mandat',
    label: "Quelle disposition est devenue intangible (impossible à modifier) en 2016 ?",
    options: [
      "Le nombre de députés",
      "La durée et le nombre de mandats consécutifs du Président",
      "Le nom de la capitale",
      "Le montant des impôts"
    ],
    correctIndex: 1,
    difficulty: 'moyen',
    type: 'qcm',
    category: 'constitution',
    explanation: "L'article 103 verrouille cette règle. Note : En 2016, les Sages ont jugé que la réduction du mandat (7 à 5 ans) ne s'appliquait pas au mandat en cours."
  },
  {
    id: 'const_2016_cc',
    label: "Le nombre de membres du Conseil Constitutionnel est passé de 5 à :",
    options: ['6', '7', '9', '11'],
    correctIndex: 1,
    difficulty: 'facile',
    type: 'qcm',
    category: 'constitution',
    explanation: "La réforme de 2016 a porté le nombre de membres à 7 ('Les 7 Sages')."
  },
  {
    id: 'const_2016_ext',
    label: "Qui élit désormais des députés dédiés à l'Assemblée Nationale ?",
    options: [
      "Les étudiants",
      "Les magistrats",
      "Les Sénégalais de l'extérieur",
      "Les chefs religieux"
    ],
    correctIndex: 2,
    difficulty: 'facile',
    type: 'qcm',
    category: 'constitution',
    explanation: "L'article 59 consacre la représentation des Sénégalais de l'extérieur par des députés."
  },

  // --- VRAI/FAUX ---
  {
    id: 'vf_morale',
    label: "La sanction de la règle morale est externe et immédiate.",
    options: ['Vrai', 'Faux'],
    correctIndex: 1,
    difficulty: 'facile',
    type: 'vrai-faux',
    category: 'introduction',
    explanation: "Faux. La sanction de la morale est interne (conscience), contrairement au droit (sanction étatique)."
  },
  {
    id: 'vf_coutume',
    label: "Une coutume 'contra legem' (contre la loi) est valable au Sénégal.",
    options: ['Vrai', 'Faux'],
    correctIndex: 1,
    difficulty: 'moyen',
    type: 'vrai-faux',
    category: 'introduction',
    explanation: "Faux. Seules les coutumes 'secundum legem' (selon la loi) ou 'praeter legem' (dans le silence de la loi) sont valables."
  },
  {
    id: 'vf_gage',
    label: "Le droit de gage général permet au créancier de saisir tous les biens du débiteur.",
    options: ['Vrai', 'Faux'],
    correctIndex: 0,
    difficulty: 'moyen',
    type: 'vrai-faux',
    category: 'patrimoine',
    explanation: "Vrai. C'est la garantie fondamentale des créanciers chirographaires sur le patrimoine du débiteur."
  },
  {
    id: 'vf_indiv',
    label: "La règle de droit vise des situations particulières et des personnes désignées.",
    options: ['Vrai', 'Faux'],
    correctIndex: 1,
    difficulty: 'facile',
    type: 'vrai-faux',
    category: 'introduction',
    explanation: "Faux. Elle est générale, impersonnelle et abstraite."
  },
]

export function getRandomQuestion(
  questions: Question[],
  difficulty: Difficulty,
  type: QuestionType,
  usedIds: string[]
): Question | null {
  // Filter questions by difficulty and type, excluding used ones
  let available = questions.filter(
    q => q.difficulty === difficulty && 
         q.type === type && 
         !usedIds.includes(q.id)
  )
  
  if (available.length === 0) {
    available = questions.filter(
      q => q.difficulty === difficulty && 
           !usedIds.includes(q.id)
    )
  }
  
  if (available.length === 0) {
    available = questions.filter(q => !usedIds.includes(q.id))
  }
  
  if (available.length === 0) {
    available = questions
  }
  
  const index = Math.floor(Math.random() * available.length)
  return available[index] || null
}
