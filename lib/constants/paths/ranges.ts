import { paths } from ".";

export const ranges = [
  // EIP/EC/TLK Kraków Gł - Warszawa
  { min: 1300, max: 1390, path: paths.path_13xxx },
  { min: 13100, max: 13300, path: paths.path_13xxx },
  { min: 3100, max: 3190, path: paths.path_31xxx },
  { min: 31100, max: 31300, path: paths.path_31xxx },

  // EIP/EC Gliwice/Bohumin - Warszawa
  { min: 1400, max: 1490, path: paths.path_14xxx },
  { min: 14100, max: 14200, path: paths.path_14xxx },
  { min: 4100, max: 4190, path: paths.path_41xxx },
  { min: 41100, max: 41200, path: paths.path_41xxx },

  // EIP/TLK Wrocław Gł - Warszawa
  { min: 1600, max: 1690, path: paths.path_16xxx },
  { min: 16100, max: 16200, path: paths.path_16xxx },
  { min: 6100, max: 6190, path: paths.path_61xxx },
  { min: 61100, max: 61200, path: paths.path_61xxx },

  // IC Łódź - Warszawa
  { min: 1900, max: 1990, path: paths.path_19xx },
  { min: 9100, max: 9190, path: paths.path_91xx },

  // RE1 Skierniewice - Warszawa
  { min: 19000, max: 19990, path: paths.path_19xxx },
  { min: 91000, max: 91990, path: paths.path_91xxx },

  // TLK Kraków Gł - Poznań Gł
  { min: 37000, max: 37990, path: paths.path_37xxx },
  { min: 73000, max: 73990, path: paths.path_73xxx },

  // REG Katowice - Busko Zdrój
  { min: 24900, max: 24990, path: paths.path_249xx },
  { min: 42900, max: 42990, path: paths.path_429xx },

  // REG Tychy - Kraków Gł
  { min: 43300, max: 43390, path: paths.path_433xx },
  { min: 44300, max: 44390, path: paths.path_443xx },

  // TLK Kielce - Gliwice (p. Zawiercie)
  { min: 24100, max: 24149, path: paths.path_2412x },
  { min: 42100, max: 42159, path: paths.path_4212x },

  // TLK Kielce - Gliwice (p. Sędziszów)
  { min: 24150, max: 24200, path: paths.path_2417x },
  { min: 42150, max: 42200, path: paths.path_4217x },

  // S41 Tychy Lodowisko - Częstochowa
  { min: 40100, max: 40149, path: paths.path_4012x },
  { min: 40650, max: 40700, path: paths.path_4067x },

  // S1 Gliwice - Częstochowa
  { min: 40150, max: 40200, path: paths.path_4017x },
  { min: 40600, max: 40649, path: paths.path_4062x },

  // TLK Bydgoszcz Gł - Gliwice
  { min: 54000, max: 55000, path: paths.path_54xxx },

  // CARGO
  { min: 132000, max: 133000, path: paths.path_132xxx },
  { min: 142000, max: 143000, path: paths.path_142xxx },
  { min: 146000, max: 147000, path: paths.path_146xxx },
  { min: 446000, max: 447000, path: paths.path_446xxx },
  { min: 412000, max: 412900, path: paths.path_412xxx },
  { min: 413000, max: 413900, path: paths.path_413xxx },
  { min: 649000, max: 650000, path: paths.path_649xxx },
  { min: 629000, max: 630000, path: paths.path_629xxx },
  { min: 144000, max: 145000, path: paths.path_144xxx },
  { min: 243000, max: 243990, path: paths.path_243xxx },
  { min: 244000, max: 245000, path: paths.path_244xxx },
  { min: 414000, max: 415000, path: paths.path_414xxx },
  { min: 424000, max: 425000, path: paths.path_424xxx },
  { min: 441000, max: 441990, path: paths.path_441xxx },
  { min: 442000, max: 442990, path: paths.path_442xxx },
  { min: 443000, max: 443990, path: paths.path_443xxx },
  { min: 445000, max: 445990, path: paths.path_445xxx },
  { min: 464000, max: 465000, path: paths.path_464xxx },
];
