import React from 'react';
import { Product } from '../types';

interface ProductListProps {
  products: Product[];
  totalCost: number;
}

const ProductCard: React.FC<{ product: Product }> = ({ product }) => (
    <div className="bg-card rounded-lg shadow-sm border border-border-main overflow-hidden transform hover:shadow-md transition-shadow duration-300">
        <div className="p-5">
            <h4 className="font-semibold text-md text-text-main truncate">{product.name}</h4>
            <p className="text-sm text-text-muted">{product.retailer}</p>
            <div className="flex justify-between items-center mt-4">
                <p className="text-xl font-semibold text-text-main">₹{product.price.toLocaleString('en-IN')}</p>
                <a href={product.link} target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-primary text-white text-sm font-semibold rounded-md hover:bg-primary-light transition-colors">
                    Shop Now
                </a>
            </div>
        </div>
    </div>
);

const ProductList: React.FC<ProductListProps> = ({ products, totalCost }) => {
  return (
    <div className="mt-16 sm:mt-20">
      <div className="flex flex-col sm:flex-row justify-between items-baseline mb-8">
        <h2 className="text-4xl sm:text-5xl font-serif text-text-main">Shopping List</h2>
        <p className="text-lg font-medium text-text-muted mt-2 sm:mt-0">
          Estimated Total: <span className="text-text-main font-semibold">₹{totalCost.toLocaleString('en-IN')}</span>
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;