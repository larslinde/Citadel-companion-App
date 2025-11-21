import { Paint, PaintType } from './types';

export const TAB_ICONS = {
  Collection: 'collection',
  Matcher: 'matcher',
  Advisor: 'advisor',
};

export const INITIAL_PAINTS: Paint[] = [
  // BASE
  { id: 'b1', name: 'Abaddon Black', type: PaintType.Base, hex: '#231f20', owned: false, wishlist: false },
  { id: 'b2', name: 'Corax White', type: PaintType.Base, hex: '#ffffff', owned: false, wishlist: false },
  { id: 'b3', name: 'Mephiston Red', type: PaintType.Base, hex: '#960c12', owned: false, wishlist: false },
  { id: 'b4', name: 'Macragge Blue', type: PaintType.Base, hex: '#0d407f', owned: false, wishlist: false },
  { id: 'b5', name: 'Retributor Armour', type: PaintType.Base, hex: '#c1974d', owned: false, wishlist: false },
  { id: 'b6', name: 'Leadbelcher', type: PaintType.Base, hex: '#888d8f', owned: false, wishlist: false },
  { id: 'b7', name: 'Averland Sunset', type: PaintType.Base, hex: '#fbb81c', owned: false, wishlist: false },
  { id: 'b8', name: 'Bugman\'s Glow', type: PaintType.Base, hex: '#804c43', owned: false, wishlist: false },
  { id: 'b9', name: 'Waaagh! Flesh', type: PaintType.Base, hex: '#1e5732', owned: false, wishlist: false },
  { id: 'b10', name: 'Khorne Red', type: PaintType.Base, hex: '#6a0001', owned: false, wishlist: false },
  { id: 'b11', name: 'Kantor Blue', type: PaintType.Base, hex: '#02134e', owned: false, wishlist: false },
  { id: 'b12', name: 'Rakarth Flesh', type: PaintType.Base, hex: '#9c988d', owned: false, wishlist: false },
  { id: 'b13', name: 'Zandri Dust', type: PaintType.Base, hex: '#9e915c', owned: false, wishlist: false },
  { id: 'b14', name: 'Mechanicus Standard Grey', type: PaintType.Base, hex: '#3d4547', owned: false, wishlist: false },
  { id: 'b15', name: 'Balthasar Gold', type: PaintType.Base, hex: '#a47550', owned: false, wishlist: false },

  // LAYER
  { id: 'l1', name: 'Eshin Grey', type: PaintType.Layer, hex: '#4a4f52', owned: false, wishlist: false },
  { id: 'l2', name: 'White Scar', type: PaintType.Layer, hex: '#ffffff', owned: false, wishlist: false },
  { id: 'l3', name: 'Evil Sunz Scarlet', type: PaintType.Layer, hex: '#c01411', owned: false, wishlist: false },
  { id: 'l4', name: 'Altdorf Guard Blue', type: PaintType.Layer, hex: '#1f56a7', owned: false, wishlist: false },
  { id: 'l5', name: 'Auric Armour Gold', type: PaintType.Layer, hex: '#e6bd62', owned: false, wishlist: false },
  { id: 'l6', name: 'Ironbreaker', type: PaintType.Layer, hex: '#9fa5a7', owned: false, wishlist: false },
  { id: 'l7', name: 'Flash Gitz Yellow', type: PaintType.Layer, hex: '#fff300', owned: false, wishlist: false },
  { id: 'l8', name: 'Cadian Fleshtone', type: PaintType.Layer, hex: '#c4765d', owned: false, wishlist: false },
  { id: 'l9', name: 'Moot Green', type: PaintType.Layer, hex: '#52b244', owned: false, wishlist: false },
  { id: 'l10', name: 'Ahriman Blue', type: PaintType.Layer, hex: '#007f90', owned: false, wishlist: false },
  { id: 'l11', name: 'Stormhost Silver', type: PaintType.Layer, hex: '#cfd6d8', owned: false, wishlist: false },
  { id: 'l12', name: 'Ushabti Bone', type: PaintType.Layer, hex: '#bfbb8e', owned: false, wishlist: false },
  { id: 'l13', name: 'Screaming Skull', type: PaintType.Layer, hex: '#d5d0b2', owned: false, wishlist: false },
  { id: 'l14', name: 'Wild Rider Red', type: PaintType.Layer, hex: '#e82e1b', owned: false, wishlist: false },
  { id: 'l15', name: 'Emperor\'s Children', type: PaintType.Layer, hex: '#b74073', owned: false, wishlist: false },

  // SHADE
  { id: 's1', name: 'Nuln Oil', type: PaintType.Shade, hex: '#1a1a1a', owned: false, wishlist: false },
  { id: 's2', name: 'Agrax Earthshade', type: PaintType.Shade, hex: '#3f2d1d', owned: false, wishlist: false },
  { id: 's3', name: 'Reikland Fleshshade', type: PaintType.Shade, hex: '#7d4b39', owned: false, wishlist: false },
  { id: 's4', name: 'Drakenhof Nightshade', type: PaintType.Shade, hex: '#1a2742', owned: false, wishlist: false },
  { id: 's5', name: 'Seraphim Sepia', type: PaintType.Shade, hex: '#77431c', owned: false, wishlist: false },
  { id: 's6', name: 'Carroburg Crimson', type: PaintType.Shade, hex: '#5b1027', owned: false, wishlist: false },
  { id: 's7', name: 'Biel-Tan Green', type: PaintType.Shade, hex: '#144626', owned: false, wishlist: false },
  { id: 's8', name: 'Cassandora Yellow', type: PaintType.Shade, hex: '#d19822', owned: false, wishlist: false },

  // CONTRAST
  { id: 'c1', name: 'Black Templar', type: PaintType.Contrast, hex: '#2a2a2a', owned: false, wishlist: false },
  { id: 'c2', name: 'Blood Angels Red', type: PaintType.Contrast, hex: '#981b1e', owned: false, wishlist: false },
  { id: 'c3', name: 'Ultramarines Blue', type: PaintType.Contrast, hex: '#283c82', owned: false, wishlist: false },
  { id: 'c4', name: 'Snakebite Leather', type: PaintType.Contrast, hex: '#6d4625', owned: false, wishlist: false },
  { id: 'c5', name: 'Wyldwood', type: PaintType.Contrast, hex: '#4a3223', owned: false, wishlist: false },
  { id: 'c6', name: 'Aethermatic Blue', type: PaintType.Contrast, hex: '#72b9c8', owned: false, wishlist: false },
  { id: 'c7', name: 'Basilicanum Grey', type: PaintType.Contrast, hex: '#5e6164', owned: false, wishlist: false },
  { id: 'c8', name: 'Iyanden Yellow', type: PaintType.Contrast, hex: '#ebac25', owned: false, wishlist: false },
  { id: 'c9', name: 'Skeleton Horde', type: PaintType.Contrast, hex: '#bda981', owned: false, wishlist: false },
  { id: 'c10', name: 'Flesh Tearers Red', type: PaintType.Contrast, hex: '#6b1517', owned: false, wishlist: false },

  // DRY
  { id: 'd1', name: 'Praxeti White', type: PaintType.Dry, hex: '#ffffff', owned: false, wishlist: false },
  { id: 'd2', name: 'Necron Compound', type: PaintType.Dry, hex: '#8d9294', owned: false, wishlist: false },
  { id: 'd3', name: 'Tyrant Skull', type: PaintType.Dry, hex: '#c4bd89', owned: false, wishlist: false },
  { id: 'd4', name: 'Golden Griffon', type: PaintType.Dry, hex: '#c49848', owned: false, wishlist: false },
  { id: 'd5', name: 'Astorath Red', type: PaintType.Dry, hex: '#c53e3a', owned: false, wishlist: false },
  { id: 'd6', name: 'Etherium Blue', type: PaintType.Dry, hex: '#aecbd8', owned: false, wishlist: false },
  { id: 'd7', name: 'Ryza Rust', type: PaintType.Dry, hex: '#d66e28', owned: false, wishlist: false },

  // TECHNICAL
  { id: 't1', name: 'Blood for the Blood God', type: PaintType.Technical, hex: '#5f0c0e', owned: false, wishlist: false },
  { id: 't2', name: 'Stirland Mud', type: PaintType.Technical, hex: '#463526', owned: false, wishlist: false },
  { id: 't3', name: 'Nihilakh Oxide', type: PaintType.Technical, hex: '#6abfbb', owned: false, wishlist: false },
  { id: 't4', name: 'Tesseract Glow', type: PaintType.Technical, hex: '#64b937', owned: false, wishlist: false },
  { id: 't5', name: 'Typhus Corrosion', type: PaintType.Technical, hex: '#3c362d', owned: false, wishlist: false },
  { id: 't6', name: 'Astrogranite', type: PaintType.Technical, hex: '#6e6e6e', owned: false, wishlist: false },
  { id: 't7', name: 'Ardcoat', type: PaintType.Technical, hex: '#f0f0f0', owned: false, wishlist: false }, // Gloss varnish

  // SPRAY
  { id: 'sp1', name: 'Chaos Black Spray', type: PaintType.Spray, hex: '#231f20', owned: false, wishlist: false },
  { id: 'sp2', name: 'Corax White Spray', type: PaintType.Spray, hex: '#ffffff', owned: false, wishlist: false },
  { id: 'sp3', name: 'Mechanicus Standard Grey Spray', type: PaintType.Spray, hex: '#3d4547', owned: false, wishlist: false },
  { id: 'sp4', name: 'Macragge Blue Spray', type: PaintType.Spray, hex: '#0d407f', owned: false, wishlist: false },
  { id: 'sp5', name: 'Retributor Armour Spray', type: PaintType.Spray, hex: '#c1974d', owned: false, wishlist: false },
  { id: 'sp6', name: 'Munitorum Varnish', type: PaintType.Spray, hex: '#e5e7eb', owned: false, wishlist: false },
  { id: 'sp7', name: 'Wraithbone Spray', type: PaintType.Spray, hex: '#ded4b6', owned: false, wishlist: false },
  { id: 'sp8', name: 'Grey Seer Spray', type: PaintType.Spray, hex: '#aebec1', owned: false, wishlist: false },
];