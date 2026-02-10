import React, { useState } from 'react';
import { Search, Upload, X, Sliders, Star, Leaf, Filter } from 'lucide-react';

interface SearchFilters {
  query: string;
  priceRange: [number, number];
  rating: number;
  sizes: string[];
  colors: string[];
  sustainability: boolean;
  inStock: boolean;
}

interface AdvancedSearchSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onSearch: (filters: SearchFilters) => void;
  onVisualSearch: (file: File) => void;
}

export function AdvancedSearchSidebar({
  isOpen,
  onClose,
  onSearch,
  onVisualSearch,
}: AdvancedSearchSidebarProps) {
  const [filters, setFilters] = useState<SearchFilters>({
    query: '',
    priceRange: [0, 1000],
    rating: 0,
    sizes: [],
    colors: [],
    sustainability: false,
    inStock: true,
  });

  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  const colors = [
    { name: 'Black', hex: '#000000' },
    { name: 'White', hex: '#FFFFFF' },
    { name: 'Gold', hex: '#D4AF37' },
    { name: 'Green', hex: '#0A2F1F' },
    { name: 'Red', hex: '#DC2626' },
    { name: 'Blue', hex: '#3B82F6' },
  ];

  const handleToggleSize = (size: string) => {
    setFilters({
      ...filters,
      sizes: filters.sizes.includes(size)
        ? filters.sizes.filter(s => s !== size)
        : [...filters.sizes, size],
    });
  };

  const handleToggleColor = (color: string) => {
    setFilters({
      ...filters,
      colors: filters.colors.includes(color)
        ? filters.colors.filter(c => c !== color)
        : [...filters.colors, color],
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onVisualSearch(file);
    }
  };

  const handleApply = () => {
    onSearch(filters);
  };

  const handleReset = () => {
    setFilters({
      query: '',
      priceRange: [0, 1000],
      rating: 0,
      sizes: [],
      colors: [],
      sustainability: false,
      inStock: true,
    });
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/60 z-40" onClick={onClose} />
      <div
        className="fixed top-0 left-0 h-full w-96 bg-white shadow-2xl z-50 overflow-y-auto transform transition-transform duration-300"
        style={{ borderRadius: '0 8px 8px 0' }}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b p-6 z-10" style={{ borderColor: 'var(--makeda-gold)' }}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-6 h-6" style={{ color: 'var(--makeda-green)' }} />
              <h2 className="text-xl font-serif" style={{ fontFamily: "'Playfair Display', serif", color: 'var(--makeda-green)' }}>
                Advanced Search
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Semantic Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={filters.query}
              onChange={(e) => setFilters({ ...filters, query: e.target.value })}
              placeholder="Search by style, occasion, material..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2"
              style={{ borderRadius: '8px' }}
            />
          </div>
        </div>

        {/* Visual Search */}
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-sm mb-3" style={{ color: 'var(--makeda-green)' }}>
            Visual Search
          </h3>
          <label className="block border-2 border-dashed border-gray-300 rounded p-6 text-center cursor-pointer hover:border-gray-400 transition-colors" style={{ borderRadius: '8px' }}>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
            <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
            <p className="text-sm text-gray-600">Upload an image</p>
            <p className="text-xs text-gray-500">to find similar styles</p>
          </label>
        </div>

        {/* Filters */}
        <div className="p-6 space-y-6">
          {/* Price Range */}
          <div>
            <h3 className="text-sm mb-3 flex items-center space-x-2" style={{ color: 'var(--makeda-green)' }}>
              <Sliders className="w-4 h-4" />
              <span>Price Range</span>
            </h3>
            <div className="space-y-2">
              <input
                type="range"
                min="0"
                max="1000"
                step="10"
                value={filters.priceRange[1]}
                onChange={(e) => setFilters({ ...filters, priceRange: [0, parseInt(e.target.value)] })}
                className="w-full"
                style={{ accentColor: 'var(--makeda-gold)' }}
              />
              <div className="flex justify-between text-sm text-gray-600">
                <span>${filters.priceRange[0]}</span>
                <span>${filters.priceRange[1]}</span>
              </div>
            </div>
          </div>

          {/* Rating */}
          <div>
            <h3 className="text-sm mb-3 flex items-center space-x-2" style={{ color: 'var(--makeda-green)' }}>
              <Star className="w-4 h-4" />
              <span>Minimum Rating</span>
            </h3>
            <div className="flex space-x-2">
              {[1, 2, 3, 4, 5].map((rating) => (
                <button
                  key={rating}
                  onClick={() => setFilters({ ...filters, rating })}
                  className={`flex items-center justify-center w-10 h-10 border-2 rounded transition-all ${
                    filters.rating >= rating ? 'border-opacity-100' : 'border-gray-300'
                  }`}
                  style={{
                    borderColor: filters.rating >= rating ? 'var(--makeda-gold)' : undefined,
                    backgroundColor: filters.rating >= rating ? 'rgba(212, 175, 55, 0.1)' : undefined,
                  }}
                >
                  <Star
                    className="w-5 h-5"
                    fill={filters.rating >= rating ? 'var(--makeda-gold)' : 'none'}
                    style={{ color: filters.rating >= rating ? 'var(--makeda-gold)' : '#ccc' }}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Sizes */}
          <div>
            <h3 className="text-sm mb-3" style={{ color: 'var(--makeda-green)' }}>Size</h3>
            <div className="flex flex-wrap gap-2">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => handleToggleSize(size)}
                  className={`px-4 py-2 border-2 rounded transition-all ${
                    filters.sizes.includes(size) ? 'border-opacity-100' : 'border-gray-300'
                  }`}
                  style={{
                    borderColor: filters.sizes.includes(size) ? 'var(--makeda-gold)' : undefined,
                    backgroundColor: filters.sizes.includes(size) ? 'rgba(212, 175, 55, 0.1)' : undefined,
                    borderRadius: '8px',
                  }}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Colors */}
          <div>
            <h3 className="text-sm mb-3" style={{ color: 'var(--makeda-green)' }}>Color</h3>
            <div className="flex flex-wrap gap-2">
              {colors.map((color) => (
                <button
                  key={color.name}
                  onClick={() => handleToggleColor(color.name)}
                  className={`w-10 h-10 rounded-full border-4 transition-all ${
                    filters.colors.includes(color.name) ? 'border-opacity-100 scale-110' : 'border-gray-300'
                  }`}
                  style={{
                    backgroundColor: color.hex,
                    borderColor: filters.colors.includes(color.name) ? 'var(--makeda-gold)' : undefined,
                  }}
                  title={color.name}
                />
              ))}
            </div>
          </div>

          {/* Sustainability */}
          <div>
            <label className="flex items-center space-x-3 p-4 border-2 rounded cursor-pointer hover:bg-gray-50 transition-colors" style={{ borderRadius: '8px' }}>
              <input
                type="checkbox"
                checked={filters.sustainability}
                onChange={(e) => setFilters({ ...filters, sustainability: e.target.checked })}
                className="w-5 h-5"
                style={{ accentColor: 'var(--makeda-green)' }}
              />
              <Leaf className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm" style={{ color: 'var(--makeda-green)' }}>Sustainable & Eco-Friendly</p>
                <p className="text-xs text-gray-500">Ethically sourced materials</p>
              </div>
            </label>
          </div>

          {/* In Stock Only */}
          <div>
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={filters.inStock}
                onChange={(e) => setFilters({ ...filters, inStock: e.target.checked })}
                className="w-5 h-5"
                style={{ accentColor: 'var(--makeda-green)' }}
              />
              <span className="text-sm" style={{ color: 'var(--makeda-green)' }}>Show in-stock items only</span>
            </label>
          </div>
        </div>

        {/* Actions */}
        <div className="sticky bottom-0 bg-white border-t p-6 space-y-2">
          <button
            onClick={handleApply}
            className="w-full py-3 text-white rounded transition-all hover:shadow-lg"
            style={{ backgroundColor: 'var(--makeda-gold)', borderRadius: '8px' }}
          >
            Apply Filters
          </button>
          <button
            onClick={handleReset}
            className="w-full py-3 border rounded transition-colors hover:bg-gray-50"
            style={{ borderColor: 'var(--makeda-green)', color: 'var(--makeda-green)', borderRadius: '8px' }}
          >
            Reset All
          </button>
        </div>
      </div>
    </>
  );
}
