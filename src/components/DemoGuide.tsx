import React from 'react';
import { X, Users, CreditCard, Package, Info } from 'lucide-react';
import { MOCK_CUSTOMERS, MOCK_PAYMENT_METHODS } from '../data/mockData';

interface DemoGuideProps {
	isOpen: boolean;
	onClose: () => void;
}

export function DemoGuide({ isOpen, onClose }: DemoGuideProps) {
	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 bg-black/60 z-[70] flex items-center justify-center p-4">
			<div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl" style={{ borderRadius: '8px' }}>
				{/* Header */}
				<div className="flex items-center justify-between p-6 border-b" style={{ borderColor: 'var(--makeda-gold)' }}>
					<div className="flex items-center space-x-3">
						<Info className="w-6 h-6" style={{ color: 'var(--makeda-green)' }} />
						<h2 className="text-2xl font-serif" style={{ fontFamily: "'Playfair Display', serif", color: 'var(--makeda-green)' }}>
							Demo Guide & Pre-populated Data
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

				<div className="overflow-y-auto p-6" style={{ maxHeight: 'calc(90vh - 100px)' }}>
					{/* Overview */}
					<div className="mb-8 p-6 bg-gradient-to-br from-green-50 to-yellow-50 rounded-lg" style={{ borderRadius: '8px' }}>
						<h3 className="text-xl mb-3 font-serif" style={{ fontFamily: "'Playfair Display', serif", color: 'var(--makeda-green)' }}>
							Welcome to Makeda Threads Enterprise Demo
						</h3>
						<p className="text-gray-700 mb-2">
							This demo showcases a complete multi-role e-commerce ecosystem with pre-populated data including:
						</p>
						<ul className="list-disc list-inside space-y-1 text-sm text-gray-600 ml-4">
							<li>7 Pre-registered customer profiles with saved addresses</li>
							<li>40+ diverse products across Male, Female, Kids, and General categories</li>
							<li>Simulated payment methods (Visa, PayPal, Crypto)</li>
							<li>Order history and tracking data</li>
							<li>Email/SMS notification logs</li>
						</ul>
					</div>

					{/* Stakeholder Accounts */}
					<div className="mb-8">
						<div className="flex items-center space-x-2 mb-4">
							<Users className="w-5 h-5" style={{ color: 'var(--makeda-green)' }} />
							<h3 className="text-lg font-serif" style={{ fontFamily: "'Playfair Display', serif", color: 'var(--makeda-green)' }}>
								Pre-populated Stakeholder Accounts
							</h3>
						</div>

						{/* Admin Account */}
						<div className="mb-4 p-4 border-2 rounded-lg" style={{ borderColor: 'var(--makeda-gold)', borderRadius: '8px' }}>
							<div className="flex items-center justify-between mb-2">
								<h4 className="font-medium" style={{ color: 'var(--makeda-green)' }}>Admin Portal</h4>
								<span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded">ADMIN</span>
							</div>
							<p className="text-sm text-gray-600 mb-1">Email: <code className="bg-gray-100 px-2 py-0.5 rounded">admin@stylesphere.com</code></p>
							<p className="text-xs text-gray-500">Access: Inventory Manager, Order Queue, Coupon Engine, Global Settings</p>
						</div>

						{/* Brand Partner Account */}
						<div className="mb-4 p-4 border-2 rounded-lg" style={{ borderColor: 'var(--makeda-gold)', borderRadius: '8px' }}>
							<div className="flex items-center justify-between mb-2">
								<h4 className="font-medium" style={{ color: 'var(--makeda-green)' }}>Brand Partner/Seller Portal</h4>
								<span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded">SELLER</span>
							</div>
							<p className="text-sm text-gray-600 mb-1">Email: <code className="bg-gray-100 px-2 py-0.5 rounded">brand@stylesphere.com</code></p>
							<p className="text-xs text-gray-500">Access: Brand Storefront, Sales Analytics, Inventory Management, Influencer Collaborations</p>
						</div>

						{/* Customer Accounts */}
						<div className="p-4 border-2 rounded-lg" style={{ borderColor: 'var(--makeda-gold)', borderRadius: '8px' }}>
							<div className="flex items-center justify-between mb-3">
								<h4 className="font-medium" style={{ color: 'var(--makeda-green)' }}>Customer Accounts ({MOCK_CUSTOMERS.length})</h4>
								<span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">CUSTOMERS</span>
							</div>
							<div className="space-y-2 max-h-64 overflow-y-auto">
								{MOCK_CUSTOMERS.map((customer, index) => (
									<div key={customer.id} className="p-3 bg-gray-50 rounded text-sm" style={{ borderRadius: '8px' }}>
										<div className="flex items-center justify-between mb-1">
											<p className="font-medium" style={{ color: 'var(--makeda-green)' }}>{customer.name}</p>
											<span className="text-xs text-gray-500">{customer.country}</span>
										</div>
										<p className="text-xs text-gray-600 mb-1">
											Email: <code className="bg-white px-1 py-0.5 rounded">{customer.email}</code>
										</p>
										<p className="text-xs text-gray-500">
											Address: {customer.address}, {customer.city}, {customer.postalCode}
										</p>
									</div>
								))}
							</div>
						</div>
					</div>

					{/* Simulated Payment Methods */}
					<div className="mb-8">
						<div className="flex items-center space-x-2 mb-4">
							<CreditCard className="w-5 h-5" style={{ color: 'var(--makeda-green)' }} />
							<h3 className="text-lg font-serif" style={{ fontFamily: "'Playfair Display', serif", color: 'var(--makeda-green)' }}>
								Simulated Payment Methods
							</h3>
						</div>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div className="p-4 border rounded-lg" style={{ borderRadius: '8px' }}>
								<h4 className="text-sm mb-2" style={{ color: 'var(--makeda-green)' }}>Visa Test Card</h4>
								<code className="text-sm bg-gray-100 px-3 py-2 rounded block">{MOCK_PAYMENT_METHODS.visa}</code>
								<p className="text-xs text-gray-500 mt-2">Expiry: Any future date • CVV: Any 3 digits</p>
							</div>
							<div className="p-4 border rounded-lg" style={{ borderRadius: '8px' }}>
								<h4 className="text-sm mb-2" style={{ color: 'var(--makeda-green)' }}>Mastercard Test Card</h4>
								<code className="text-sm bg-gray-100 px-3 py-2 rounded block">{MOCK_PAYMENT_METHODS.mastercard}</code>
								<p className="text-xs text-gray-500 mt-2">Expiry: Any future date • CVV: Any 3 digits</p>
							</div>
							<div className="p-4 border rounded-lg" style={{ borderRadius: '8px' }}>
								<h4 className="text-sm mb-2" style={{ color: 'var(--makeda-green)' }}>PayPal</h4>
								<code className="text-sm bg-gray-100 px-3 py-2 rounded block break-all">{MOCK_PAYMENT_METHODS.paypal}</code>
								<p className="text-xs text-gray-500 mt-2">Simulated PayPal integration</p>
							</div>
							<div className="p-4 border rounded-lg" style={{ borderRadius: '8px' }}>
								<h4 className="text-sm mb-2" style={{ color: 'var(--makeda-green)' }}>Crypto Wallet</h4>
								<code className="text-sm bg-gray-100 px-3 py-2 rounded block break-all text-xs">{MOCK_PAYMENT_METHODS.crypto}</code>
								<p className="text-xs text-gray-500 mt-2">Simulated Ethereum wallet address</p>
							</div>
						</div>
					</div>

					{/* Product Catalog */}
					<div className="mb-8">
						<div className="flex items-center space-x-2 mb-4">
							<Package className="w-5 h-5" style={{ color: 'var(--makeda-green)' }} />
							<h3 className="text-lg font-serif" style={{ fontFamily: "'Playfair Display', serif", color: 'var(--makeda-green)' }}>
								Product Catalog (45 Items)
							</h3>
						</div>
						<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
							<div className="p-4 bg-pink-50 border border-pink-200 rounded text-center" style={{ borderRadius: '8px' }}>
								<p className="text-3xl mb-2" style={{ color: 'var(--makeda-green)' }}>15</p>
								<p className="text-sm text-gray-600">Female Collection</p>
							</div>
							<div className="p-4 bg-blue-50 border border-blue-200 rounded text-center" style={{ borderRadius: '8px' }}>
								<p className="text-3xl mb-2" style={{ color: 'var(--makeda-green)' }}>12</p>
								<p className="text-sm text-gray-600">Male Collection</p>
							</div>
							<div className="p-4 bg-yellow-50 border border-yellow-200 rounded text-center" style={{ borderRadius: '8px' }}>
								<p className="text-3xl mb-2" style={{ color: 'var(--makeda-green)' }}>8</p>
								<p className="text-sm text-gray-600">Kids Collection</p>
							</div>
							<div className="p-4 bg-green-50 border border-green-200 rounded text-center" style={{ borderRadius: '8px' }}>
								<p className="text-3xl mb-2" style={{ color: 'var(--makeda-green)' }}>10</p>
								<p className="text-sm text-gray-600">Accessories</p>
							</div>
						</div>
						<div className="mt-4 p-4 bg-gray-50 rounded" style={{ borderRadius: '8px' }}>
							<p className="text-sm text-gray-700 mb-2">Features:</p>
							<ul className="text-xs text-gray-600 space-y-1 ml-4 list-disc">
								<li>Real-time stock quantities displayed on each product card</li>
								<li>Dynamic discount labels (5%-25% off on select items)</li>
								<li>Low stock warnings (products with &lt;10 items)</li>
								<li>Out of stock indicators with disabled purchase</li>
								<li>High-quality product imagery from Unsplash</li>
							</ul>
						</div>
					</div>

					{/* Features Checklist */}
					<div className="p-6 border-2 rounded-lg" style={{ borderColor: 'var(--makeda-gold)', backgroundColor: 'var(--makeda-sand)', borderRadius: '8px' }}>
						<h3 className="text-lg mb-4 font-serif" style={{ fontFamily: "'Playfair Display', serif", color: 'var(--makeda-green)' }}>
							Enterprise Features Implemented
						</h3>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
							<div>
								<h4 className="mb-2" style={{ color: 'var(--makeda-green)' }}>Customer Experience:</h4>
								<ul className="space-y-1 text-gray-700 ml-4 list-disc">
									<li>AR Virtual Try-On</li>
									<li>Advanced Search (Semantic + Visual)</li>
									<li>3-Step Progressive Checkout</li>
									<li>Multiple Payment Methods</li>
									<li>Order Tracking with Map View</li>
									<li>Purchase History</li>
									<li>Refund Request Workflow</li>
									<li>Personalized Recommendations</li>
								</ul>
							</div>
							<div>
								<h4 className="mb-2" style={{ color: 'var(--makeda-green)' }}>Admin & Seller Features:</h4>
								<ul className="space-y-1 text-gray-700 ml-4 list-disc">
									<li>Multi-Warehouse Inventory</li>
									<li>Sales Analytics Dashboard</li>
									<li>Coupon Management</li>
									<li>Order & Refund Queue</li>
									<li>Brand Storefront Builder</li>
									<li>Influencer Collaboration Tracker</li>
									<li>Supplier Performance Metrics</li>
									<li>Automated Restocking Alerts</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
