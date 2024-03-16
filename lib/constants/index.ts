import { Icon } from "leaflet";
import { TrainsImgType } from "../types/types";

export const trainsImg: TrainsImgType = {
  "Dragon2/ET25-002": "/et25-002.png",
  "Dragon2/E6ACTa-014": "/e6acta-014.png",
  "Dragon2/E6ACTa-016": "/e6acta-016.png",
  "Dragon2/E6ACTadb-027": "/e6actadb-027.png",

  "Traxx/Traxx": "/e186-134.png",
  "Traxx/E186-134": "/e186-134.png",
  "Traxx/E186-929": "/e186-929.png",

  "4E/EU07-005": "/eu07-005.png",
  "4E/EU07-068": "/eu07-068.png",
  "4E/EU07-085": "/eu07-085.png",
  "4E/EU07-092": "/eu07-092.png",
  "4E/EU07-096": "/eu07-096.png",
  "4E/EU07-241": "/eu07-241.png",

  "4E/EP07-135": "/ep07-135.png",
  "4E/EP07-174": "/ep07-174.png",
  "4E/EP08-001": "/ep08-001.png",

  "Elf/EN76-006": "/en76-006.png",
  "Elf/EN76-022": "/en76-022.png",
  "Elf/EN96-001": "/en96-001.png",

  "EN57/EN57-009": "/en57-009.png",
  "EN57/EN57-047": "/en57-047.png",
  "EN57/EN57-614": "/en57-614.png",
  "EN57/EN57-1000": "/en57-1000.png",
  "EN57/EN57-1003": "/en57-1003.png",
  "EN57/EN57-1051": "/en57-1051.png",
  "EN57/EN57-1219": "/en57-1219.png",
  "EN57/EN57-1316": "/en57-1316.png",
  "EN57/EN57-1458": "/en57-1458.png",
  "EN57/EN57-1567": "/en57-1567.png",
  "EN57/EN57-1571": "/en57-1571.png",
  "EN57/EN57-1752": "/en57-1752.png",
  "EN57/EN57-1755": "/en57-1755.png",
  "EN57/EN57-1796": "/en57-1796.png",
  "EN57/EN57-1821": "/en57-1821.png",

  "EN57/EN71-005": "/en71-005.png",
  "EN57/EN71-011": "/en71-011.png",

  "Pendolino/ED250-018": "/ed250-018.png",
} as const;

export const locos = [
  {
    name: "Traxx",
    label: "E186 Traxx",
  },
  {
    name: "Dragon2",
    label: "E6ACTa DRAGON 2",
  },
  {
    name: "Pendolino",
    label: "ED250 Pendolino",
  },
  {
    name: "EN57",
    label: "EN57/EN71",
  },
  {
    name: "Elf",
    label: "EN76/EN96 Elf",
  },
  {
    name: "08-",
    label: "EP08",
  },
  {
    name: "07-",
    label: "EU07/EP07",
  },
] as const;

export const trainStations = [
  { name: "Będzin", pos: [50.30898, 19.14142] },
  { name: "Będzin Ksawera", pos: [50.330615, 19.15847] },
  { name: "Będzin Miasto", pos: [50.3192, 19.13554] },
  { name: "Brwinów", pos: [52.141921, 20.71902] },
  { name: "Bukowno", pos: [50.263989, 19.459487] },
  { name: "Bukowno Przymiarki", pos: [50.275388, 19.409776] },
  { name: "Charsznica", pos: [50.396127, 19.941382] },
  { name: "Chrząstowice Olkuskie", pos: [50.34437, 19.68572] },
  { name: "Chruszczobród", pos: [50.40039, 19.32907] },
  { name: "Dąbrowa Górnicza", pos: [50.33037, 19.18481] },
  { name: "Dąbrowa Górnicza Gołonóg", pos: [50.34399, 19.226217] },
  { name: "Dąbrowa Górnicza Południowa", pos: [50.312342, 19.28729] },
  { name: "Dąbrowa Górnicza Pogoria", pos: [50.350486, 19.2407991] },
  { name: "Dąbrowa Górnicza Sikorka", pos: [50.388679, 19.297477] },
  { name: "Dąbrowa Górnicza Strzemieszyce", pos: [50.310831, 19.26856] },
  { name: "Dąbrowa Górnicza Wschodnia", pos: [50.303373, 19.311291] },
  { name: "Dąbrowa Górnicza Ząbkowice", pos: [50.3666, 19.264697] },
  { name: "Gajówka", pos: [50.3946, 19.8788] },
  { name: "Grodzisk Mazowiecki", pos: [52.110405, 20.623469] },
  { name: "Jaktorów", pos: [52.08667, 20.551898] },
  { name: "Jaroszowiec Olkuski", pos: [50.342291, 19.62182] },
  { name: "Jeżówka", pos: [50.3993, 19.815664] },
  { name: "Katowice", pos: [50.257614, 19.017152] },
  { name: "Katowice Szopienice Południowe", pos: [50.258926, 19.092469] },
  { name: "Katowice Zawodzie", pos: [50.257298, 19.057459] },
  { name: "Klimontów", pos: [50.5254, 20.030167] },
  { name: "Kozłów", pos: [50.475189, 20.012358] },
  { name: "Łazy", pos: [50.43009, 19.391894] },
  { name: "Milanówek", pos: [52.12515, 20.668186] },
  { name: "Myszków Mrzygłód", pos: [50.543486, 19.377319] },
  { name: "Olkusz", pos: [50.274129, 19.572399] },
  { name: "Opoczno Południe", pos: [51.359192, 20.232457] },
  { name: "Parzniew", pos: [52.156446, 20.763134] },
  { name: "Piastów", pos: [52.18258, 20.842729] },
  { name: "Pruszków", pos: [52.16822, 20.798922] },
  { name: "Sędziszów", pos: [50.565881, 20.054914] },
  { name: "Sławków", pos: [50.294926, 19.374651] },
  { name: "Sosnowiec Dańdówka", pos: [50.265516, 19.172771] },
  { name: "Sosnowiec Główny", pos: [50.278951, 19.126396] },
  { name: "Sosnowiec Kazimierz", pos: [50.288647, 19.2316] },
  { name: "Sosnowiec Południowy", pos: [50.269734, 19.125378] },
  { name: "Sosnowiec Porąbka", pos: [50.272112, 19.216257] },
  { name: "Tunel", pos: [50.4336, 19.99125] },
  { name: "Warszawa Centralna", pos: [52.22883, 21.003176] },
  { name: "Warszawa Ursus", pos: [52.19641, 20.885262] },
  { name: "Warszawa Ursus - Niedźwiadek", pos: [52.19147, 20.87002] },
  { name: "Warszawa Włochy", pos: [52.206088, 20.914575] },
  { name: "Warszawa Zachodnia", pos: [52.220165, 20.965176] },
  { name: "Warszawa Wschodnia", pos: [52.251596, 21.052382] },
  { name: "Wiesiółka", pos: [50.41482, 19.34972] },
  { name: "Włoszczowa Północ", pos: [50.8564, 19.946052] },
  { name: "Wolbrom", pos: [50.375881, 19.77252] },
  { name: "Zarzecze", pos: [50.36337, 19.699] },
  { name: "Zawiercie Borowe Pole", pos: [50.511078, 19.398637] },
  { name: "Zawiercie", pos: [50.48102, 19.42313] },
] as const;

export const stationIcon = new Icon({
  iconUrl: "/station.png",
  iconSize: [18, 18],
  iconAnchor: [10, 10],
  popupAnchor: [3, -12],
});