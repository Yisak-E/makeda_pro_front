import React, { useState } from 'react';
import { User as UserIcon, Edit, Save, X } from 'lucide-react';
import { User } from './AuthModal';

interface UserProfileProps {
  user: User;
  onUpdateProfile: (updatedUser: User) => void;
  onClose: () => void;
}

export function UserProfile({ user, onUpdateProfile, onClose }: UserProfileProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<User>(user);

  const handleSave = () => {
    onUpdateProfile(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData(user);
    setIsEditing(false);
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-2xl shadow-2xl" style={{ borderRadius: '8px' }}>
        <div className="flex items-center justify-between p-6 border-b" style={{ borderColor: 'var(--makeda-gold)' }}>
          <div className="flex items-center space-x-3">
            <UserIcon className="w-6 h-6" style={{ color: 'var(--makeda-green)' }} />
            <h2 className="text-2xl font-serif" style={{ fontFamily: "'Playfair Display', serif", color: 'var(--makeda-green)' }}>
              My Account
            </h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <p className="text-sm text-gray-600">Manage your profile and shipping information</p>
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center space-x-2 px-4 py-2 text-white transition-all duration-200"
                style={{ backgroundColor: 'var(--makeda-gold)', borderRadius: '8px' }}
              >
                <Edit className="w-4 h-4" />
                <span>Edit Profile</span>
              </button>
            ) : (
              <div className="flex space-x-2">
                <button
                  onClick={handleSave}
                  className="flex items-center space-x-2 px-4 py-2 text-white transition-all duration-200"
                  style={{ backgroundColor: 'var(--makeda-green)', borderRadius: '8px' }}
                >
                  <Save className="w-4 h-4" />
                  <span>Save</span>
                </button>
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-2 text-gray-700">Full Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 border border-gray-300 rounded disabled:bg-gray-50"
                  style={{ borderRadius: '8px' }}
                />
              </div>
              <div>
                <label className="block text-sm mb-2 text-gray-700">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  disabled
                  className="w-full px-4 py-3 border border-gray-300 rounded bg-gray-50"
                  style={{ borderRadius: '8px' }}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm mb-2 text-gray-700">Phone Number</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                disabled={!isEditing}
                className="w-full px-4 py-3 border border-gray-300 rounded disabled:bg-gray-50"
                style={{ borderRadius: '8px' }}
              />
            </div>

            <div>
              <label className="block text-sm mb-2 text-gray-700">Address</label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                disabled={!isEditing}
                className="w-full px-4 py-3 border border-gray-300 rounded disabled:bg-gray-50"
                style={{ borderRadius: '8px' }}
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm mb-2 text-gray-700">City</label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 border border-gray-300 rounded disabled:bg-gray-50"
                  style={{ borderRadius: '8px' }}
                />
              </div>
              <div>
                <label className="block text-sm mb-2 text-gray-700">Postal Code</label>
                <input
                  type="text"
                  value={formData.postalCode}
                  onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 border border-gray-300 rounded disabled:bg-gray-50"
                  style={{ borderRadius: '8px' }}
                />
              </div>
              <div>
                <label className="block text-sm mb-2 text-gray-700">Country</label>
                <input
                  type="text"
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 border border-gray-300 rounded disabled:bg-gray-50"
                  style={{ borderRadius: '8px' }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
