import React, { useState } from 'react';
import { Upload, Save, Eye, Users, Instagram, ExternalLink } from 'lucide-react';
import { User } from '../EnhancedAuthModal';

interface BrandStorefrontProps {
  user: User;
}

export function BrandStorefront({ user }: BrandStorefrontProps) {
  const [brandData, setBrandData] = useState({
    brandName: user.brandName || 'My Brand',
    tagline: 'Luxury African Fashion',
    description: 'We create timeless pieces that celebrate African heritage and modern elegance.',
    heroImage: 'https://images.unsplash.com/photo-1697924293303-34488b60bf36?w=1080',
    logoUrl: '',
    website: 'https://mybrand.com',
    instagram: '@mybrand',
    sustainabilityScore: 85,
  });

  const [influencers, setInfluencers] = useState([
    { id: '1', name: '@fashionista_ada', followers: '250K', status: 'Active' },
    { id: '2', name: '@style_queen_zara', followers: '180K', status: 'Pending' },
  ]);

  const handleSave = () => {
    // Mock save
    alert('Brand storefront updated successfully!');
  };

  return (
    <div className="space-y-6">
      {/* Brand Identity Section */}
      <div className="bg-white rounded-lg shadow-sm p-6" style={{ borderRadius: '8px' }}>
        <h3 className="text-xl mb-6 font-serif" style={{ fontFamily: "'Playfair Display', serif", color: 'var(--makeda-green)' }}>
          Brand Identity
        </h3>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-2 text-gray-700">Brand Name</label>
              <input
                type="text"
                value={brandData.brandName}
                onChange={(e) => setBrandData({ ...brandData, brandName: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded"
                style={{ borderRadius: '8px' }}
              />
            </div>
            <div>
              <label className="block text-sm mb-2 text-gray-700">Tagline</label>
              <input
                type="text"
                value={brandData.tagline}
                onChange={(e) => setBrandData({ ...brandData, tagline: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded"
                style={{ borderRadius: '8px' }}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm mb-2 text-gray-700">Brand Description</label>
            <textarea
              value={brandData.description}
              onChange={(e) => setBrandData({ ...brandData, description: e.target.value })}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded"
              style={{ borderRadius: '8px' }}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-2 text-gray-700">Website</label>
              <input
                type="url"
                value={brandData.website}
                onChange={(e) => setBrandData({ ...brandData, website: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded"
                style={{ borderRadius: '8px' }}
              />
            </div>
            <div>
              <label className="block text-sm mb-2 text-gray-700">Instagram Handle</label>
              <input
                type="text"
                value={brandData.instagram}
                onChange={(e) => setBrandData({ ...brandData, instagram: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded"
                style={{ borderRadius: '8px' }}
              />
            </div>
          </div>

          {/* Hero Image Upload */}
          <div>
            <label className="block text-sm mb-2 text-gray-700">Hero Image</label>
            <div className="border-2 border-dashed border-gray-300 rounded p-6 text-center hover:border-gray-400 transition-colors cursor-pointer" style={{ borderRadius: '8px' }}>
              {brandData.heroImage ? (
                <div className="relative">
                  <img
                    src={brandData.heroImage}
                    alt="Hero"
                    className="w-full h-48 object-cover rounded mb-2"
                    style={{ borderRadius: '8px' }}
                  />
                  <button
                    onClick={() => setBrandData({ ...brandData, heroImage: '' })}
                    className="text-sm text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <>
                  <Upload className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                  <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                  <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
                </>
              )}
            </div>
          </div>

          {/* Sustainability Badge */}
          <div className="p-4 bg-green-50 border border-green-200 rounded" style={{ borderRadius: '8px' }}>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm mb-1" style={{ color: 'var(--makeda-green)' }}>Sustainability Score</h4>
                <p className="text-xs text-gray-600">Showcased to eco-conscious customers</p>
              </div>
              <div className="text-3xl" style={{ color: 'var(--makeda-gold)' }}>{brandData.sustainabilityScore}%</div>
            </div>
            <div className="mt-2 bg-white rounded-full h-2 overflow-hidden">
              <div
                className="h-full transition-all"
                style={{
                  width: `${brandData.sustainabilityScore}%`,
                  backgroundColor: 'var(--makeda-green)',
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Influencer Collaborations */}
      <div className="bg-white rounded-lg shadow-sm p-6" style={{ borderRadius: '8px' }}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <Users className="w-6 h-6" style={{ color: 'var(--makeda-green)' }} />
            <h3 className="text-xl font-serif" style={{ fontFamily: "'Playfair Display', serif", color: 'var(--makeda-green)' }}>
              Influencer Collaborations
            </h3>
          </div>
          <button
            className="px-4 py-2 text-white rounded hover:opacity-90 transition-opacity"
            style={{ backgroundColor: 'var(--makeda-gold)', borderRadius: '8px' }}
          >
            + Add Influencer
          </button>
        </div>

        <div className="space-y-3">
          {influencers.map((influencer) => (
            <div
              key={influencer.id}
              className="flex items-center justify-between p-4 border rounded hover:bg-gray-50 transition-colors"
              style={{ borderRadius: '8px' }}
            >
              <div className="flex items-center space-x-3">
                <Instagram className="w-5 h-5" style={{ color: '#E1306C' }} />
                <div>
                  <p className="text-sm" style={{ color: 'var(--makeda-green)' }}>{influencer.name}</p>
                  <p className="text-xs text-gray-500">{influencer.followers} followers</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span
                  className={`px-3 py-1 rounded text-xs ${
                    influencer.status === 'Active'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {influencer.status}
                </span>
                <button className="p-2 hover:bg-gray-100 rounded">
                  <ExternalLink className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-4">
        <button
          onClick={handleSave}
          className="flex items-center space-x-2 px-6 py-3 text-white rounded hover:shadow-lg transition-all"
          style={{ backgroundColor: 'var(--makeda-green)', borderRadius: '8px' }}
        >
          <Save className="w-5 h-5" />
          <span>Save Changes</span>
        </button>
        <button
          className="flex items-center space-x-2 px-6 py-3 border rounded hover:bg-gray-50 transition-colors"
          style={{ borderColor: 'var(--makeda-green)', color: 'var(--makeda-green)', borderRadius: '8px' }}
        >
          <Eye className="w-5 h-5" />
          <span>Preview Storefront</span>
        </button>
      </div>
    </div>
  );
}
