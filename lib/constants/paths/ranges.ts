import { paths } from ".";

export const ranges = [
  // EIP/EC/TLK Kraków Gł - Warszawa
  { min: 1300, max: 1390, path: paths.path_13xxx },
  { min: 3100, max: 3190, path: paths.path_31xxx },

  // EIP/EC Gliwice/Bohumin - Warszawa/Gdynia
  { min: 1400, max: 1490, path: paths.path_14xxx },
  { min: 4100, max: 4490, path: paths.path_41xxx },
  { min: 5400, max: 5490, path: paths.path_54xxx },

  // EIP Bielsko-Biała
  { min: 45000, max: 49000, path: paths.path_45xxx },
  { min: 54000, max: 59000, path: paths.path_54xxx },
  { min: 4500, max: 4990, path: paths.path_45xxx },

  // EIP/TLK Wrocław Gł - Warszawa
  { min: 1600, max: 1690, path: paths.path_16xxx },
  { min: 16100, max: 16500, path: paths.path_16xxx },
  { min: 6100, max: 6190, path: paths.path_61xxx },
  { min: 61100, max: 61500, path: paths.path_61xxx },

  // R3 Ożarów - Zielonka
  { min: 19700, max: 19790, path: paths.path_197xx },
  { min: 91700, max: 91790, path: paths.path_917xx },

  // R1 Skierniewice - Warszawa
  { min: 19800, max: 19990, path: paths.path_198xx },
  { min: 91800, max: 91990, path: paths.path_918xx },

  // TLK Kraków Gł - Poznań Gł
  { min: 3700, max: 3799, path: paths.path_37xxx },
  { min: 7300, max: 7399, path: paths.path_73xxx },

  // REG Katowice - Busko Zdrój
  { min: 24900, max: 24990, path: paths.path_249xx },
  { min: 42900, max: 42990, path: paths.path_429xx },

  // TLK Kielce - Gliwice (p. Zawiercie)
  { min: 24100, max: 24149, path: paths.path_2412x },
  { min: 42100, max: 42149, path: paths.path_4212x },

  // TLK Kielce - Gliwice (p. Sędziszów)
  { min: 24150, max: 24203, path: paths.path_2417x },
  { min: 42150, max: 42300, path: paths.path_4217x },

  // S41 Tychy Lodowisko - Częstochowa
  { min: 40100, max: 40149, path: paths.path_4012x },
  { min: 40650, max: 40700, path: paths.path_4067x },

  // S1 Gliwice - Częstochowa
  { min: 40150, max: 40200, path: paths.path_4017x },
  { min: 40600, max: 40649, path: paths.path_4062x },

  // REG Kielce - Kraków Płaszów
  { min: 23900, max: 23999, path: paths.path_239xx },
  { min: 32900, max: 32999, path: paths.path_329xx },

  // TLK Kielce - Kraków Płaszów
  { min: 23100, max: 23499, path: paths.path_231xx },
  { min: 32100, max: 32499, path: paths.path_321xx },

  // TLK Zakopane - Gdynia Postojowa
  { min: 35000, max: 35999, path: paths.path_35xxx },
  { min: 53000, max: 53999, path: paths.path_53xxx },

  // CARGO
  { min: 132000, max: 133000, path: paths.path_132xxx },
  { min: 446000, max: 447000, path: paths.path_446xxx },
  { min: 412000, max: 412900, path: paths.path_412xxx },
  { min: 649000, max: 650000, path: paths.path_649xxx },
  { min: 144200, max: 144299, path: paths.path_144xxx },
  { min: 144300, max: 144399, path: paths.path_1443xx },
  { min: 424000, max: 424098, path: paths.path_424xxx },
  { min: 424100, max: 425198, path: paths.path_4241xx },
  { min: 441000, max: 441990, path: paths.path_441xxx },
  { min: 443000, max: 443990, path: paths.path_443xxx },
  { min: 445000, max: 445490, path: paths.path_445xxx },
  { min: 445500, max: 445590, path: paths.path_4455xx },
  { min: 464000, max: 465000, path: paths.path_464xxx },
  { min: 344000, max: 345000, path: paths.path_344xxx },
  { min: 324000, max: 325000, path: paths.path_324xxx },
  { min: 444000, max: 445000, path: paths.path_444xxx },
  { min: 234000, max: 235000, path: paths.path_234xxx },
];
