import { Product } from '../types';

const productMap: { [key: string]: Product[] } = {
  'Minimalist': [
    { name: 'Simple Oak Chair', price: 18000, retailer: 'WoodenStreet', link: 'https://www.google.com/search?q=Simple+Oak+Chair' },
    { name: 'White Linen Sofa', price: 85000, retailer: 'Pepperfry', link: 'https://www.google.com/search?q=White+Linen+Sofa' },
    { name: 'Metal Frame Coffee Table', price: 15000, retailer: 'IKEA India', link: 'https://www.google.com/search?q=Metal+Frame+Coffee+Table' },
    { name: 'Abstract Neutral Rug', price: 12000, retailer: 'Amazon.in', link: 'https://www.google.com/search?q=Abstract+Neutral+Rug' },
    { name: 'Slim Black Floor Lamp', price: 9500, retailer: 'West Elm', link: 'https://www.google.com/search?q=Slim+Black+Floor+Lamp' },
  ],
  'Bohemian': [
    { name: 'Rattan Peacock Chair', price: 25000, retailer: 'Fabindia', link: 'https://www.google.com/search?q=Rattan+Peacock+Chair' },
    { name: 'Macrame Wall Hanging', price: 4500, retailer: 'Amazon.in', link: 'https://www.google.com/search?q=Macrame+Wall+Hanging' },
    { name: 'Carved Wood Side Table', price: 12000, retailer: 'Pepperfry', link: 'https://www.google.com/search?q=Carved+Wood+Side+Table' },
    { name: 'Jute Pouf', price: 6000, retailer: 'IKEA India', link: 'https://www.google.com/search?q=Jute+Pouf' },
    { name: 'Potted Monstera Plant', price: 3000, retailer: 'Nurserylive', link: 'https://www.google.com/search?q=Potted+Monstera+Plant' },
  ],
  'Mid-Century Modern': [
    { name: 'Tapered Leg Armchair', price: 32000, retailer: 'West Elm', link: 'https://www.google.com/search?q=Tapered+Leg+Armchair' },
    { name: 'Walnut Credenza', price: 65000, retailer: 'Crate & Barrel', link: 'https://www.google.com/search?q=Walnut+Credenza' },
    { name: 'Sputnik Chandelier', price: 18000, retailer: 'Pepperfry', link: 'https://www.google.com/search?q=Sputnik+Chandelier' },
    { name: 'Kidney-Shaped Coffee Table', price: 22000, retailer: 'WoodenStreet', link: 'https://www.google.com/search?q=Kidney-Shaped+Coffee+Table' },
    { name: 'Sunburst Wall Mirror', price: 9000, retailer: 'Amazon.in', link: 'https://www.google.com/search?q=Sunburst+Wall+Mirror' },
  ],
  'Contemporary Indian': [
    { name: 'Solid Wood Diwan', price: 45000, retailer: 'Fabindia', link: 'https://www.google.com/search?q=Solid+Wood+Diwan' },
    { name: 'Brass Inlay Console Table', price: 35000, retailer: 'Pepperfry', link: 'https://www.google.com/search?q=Brass+Inlay+Console+Table' },
    { name: 'Hand-Blocked Dhurrie Rug', price: 15000, retailer: 'Jaipur Rugs', link: 'https://www.google.com/search?q=Hand-Blocked+Dhurrie+Rug' },
    { name: 'Terracotta Vase Set', price: 3500, retailer: 'Amazon.in', link: 'https://www.google.com/search?q=Terracotta+Vase+Set' },
    { name: 'Jali Pattern Lamp', price: 7500, retailer: 'Okhai', link: 'https://www.google.com/search?q=Jali+Pattern+Lamp' },
  ]
};

export const getARProductsForStyle = (styleName: string): Product[] => {
  return productMap[styleName] || [];
};