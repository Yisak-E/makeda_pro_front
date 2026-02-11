import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductGrid, Product } from './components/ProductGrid';
import { CartSidebar } from './components/CartSidebar';
import { WishlistSidebar } from './components/WishlistSidebar';
import { CheckoutFlow } from './components/CheckoutFlow';
import { ConfirmationOverlay } from './components/ConfirmationOverlay';
import { EnhancedAuthModal, User } from './components/EnhancedAuthModal';
import { UserProfile } from './components/UserProfile';
import { MyOrders } from './components/MyOrders';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { BrandPartnerPortal } from './components/brand/BrandPartnerPortal';
import { AdvancedSearchSidebar } from './components/customer/AdvancedSearchSidebar';
import { ARTryOnModal } from './components/customer/ARTryOnModal';
import { EnhancedOrderTracking } from './components/customer/EnhancedOrderTracking';
import { NotificationOverlay, Notification } from './components/NotificationOverlay';
import { NotificationCenter } from './components/NotificationCenter';
import { DemoGuide } from './components/DemoGuide';
import { Order } from './components/admin/OrderQueue';
import { Sparkles, Search, Bell } from 'lucide-react';
import { EXTENDED_PRODUCTS, MOCK_CUSTOMERS, MOCK_ORDERS, MOCK_NOTIFICATION_LOGS } from './data/mockData';

interface CartItem extends Product {
	quantity: number;
}

export default function App() {
	const [user, setUser] = useState<User | null>(null);
	const [activeCategory, setActiveCategory] = useState('All');
	const [cartItems, setCartItems] = useState<CartItem[]>([]);
	const [wishlistIds, setWishlistIds] = useState<Set<string>>(new Set());
	const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS);
	const [notifications, setNotifications] = useState<Notification[]>([]);
	const [notificationLogs] = useState(MOCK_NOTIFICATION_LOGS);
	const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
	const [isCartOpen, setIsCartOpen] = useState(false);
	const [isWishlistOpen, setIsWishlistOpen] = useState(false);
	const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
	const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
	const [isProfileOpen, setIsProfileOpen] = useState(false);
	const [isOrdersOpen, setIsOrdersOpen] = useState(false);
	const [isSearchOpen, setIsSearchOpen] = useState(false);
	const [isARModalOpen, setIsARModalOpen] = useState(false);
	const [isTrackingOpen, setIsTrackingOpen] = useState(false);
	const [isNotificationCenterOpen, setIsNotificationCenterOpen] = useState(false);
	const [selectedARProduct, setSelectedARProduct] = useState<Product | null>(null);
	const [lastOrderNumber, setLastOrderNumber] = useState('');
	const [isDemoGuideOpen, setIsDemoGuideOpen] = useState(false);

	const filteredProducts = useMemo(() => {
		if (activeCategory === 'All') return EXTENDED_PRODUCTS;
		return EXTENDED_PRODUCTS.filter((product) => product.category === activeCategory);
	}, [activeCategory]);

	const wishlistItems = useMemo(() => {
		return EXTENDED_PRODUCTS.filter((product) => wishlistIds.has(product.id));
	}, [wishlistIds]);

	const addNotification = (notification: Omit<Notification, 'id'>) => {
		const newNotification: Notification = {
			...notification,
			id: Date.now().toString(),
		};
		setNotifications((prev) => [...prev, newNotification]);
	};

	const dismissNotification = (id: string) => {
		setNotifications((prev) => prev.filter((n) => n.id !== id));
	};

	const handleLogin = (loggedInUser: User) => {
		// Auto-populate with mock customer data if email matches
		const mockCustomer = MOCK_CUSTOMERS.find(c => c.email === loggedInUser.email);
		const userToSet = mockCustomer || loggedInUser;

		setUser(userToSet);

		addNotification({
			type: 'success',
			title: 'Welcome Back!',
			message: `Logged in as ${userToSet.name}`,
		});

		// Load user's past orders
		const userOrders = MOCK_ORDERS.filter(o => o.customerEmail === userToSet.email);
		if (userOrders.length > 0) {
			setOrders(userOrders);
		}
	};

	const handleLogout = () => {
		setUser(null);
		setCartItems([]);
		setWishlistIds(new Set());
		addNotification({
			type: 'info',
			title: 'Logged Out',
			message: 'You have been successfully logged out.',
		});
	};

	const handleUpdateProfile = (updatedUser: User) => {
		setUser(updatedUser);
		addNotification({
			type: 'success',
			title: 'Profile Updated',
			message: 'Your profile has been updated successfully.',
		});
	};

	const handleAddToCart = (product: Product) => {
		if (product.stockQuantity === 0) {
			addNotification({
				type: 'error',
				title: 'Out of Stock',
				message: `${product.name} is currently out of stock.`,
			});
			return;
		}

		setCartItems((prev) => {
			const existing = prev.find((item) => item.id === product.id);
			if (existing) {
				return prev.map((item) =>
					item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
				);
			}
			return [...prev, { ...product, quantity: 1 }];
		});

		addNotification({
			type: 'success',
			title: 'Added to Cart',
			message: `${product.name} has been added to your cart.`,
		});
	};

	const handleUpdateQuantity = (productId: string, quantity: number) => {
		setCartItems((prev) =>
			prev.map((item) => (item.id === productId ? { ...item, quantity } : item))
		);
	};

	const handleRemoveFromCart = (productId: string) => {
		setCartItems((prev) => prev.filter((item) => item.id !== productId));
	};

	const handleToggleWishlist = (product: Product) => {
		setWishlistIds((prev) => {
			const newSet = new Set(prev);
			if (newSet.has(product.id)) {
				newSet.delete(product.id);
				addNotification({
					type: 'info',
					title: 'Removed from Wishlist',
					message: `${product.name} has been removed from your wishlist.`,
				});
			} else {
				newSet.add(product.id);
				addNotification({
					type: 'success',
					title: 'Added to Wishlist',
					message: `${product.name} has been added to your wishlist.`,
				});
			}
			return newSet;
		});
	};

	const handleRemoveFromWishlist = (productId: string) => {
		setWishlistIds((prev) => {
			const newSet = new Set(prev);
			newSet.delete(productId);
			return newSet;
		});
	};

	const handleCheckout = () => {
		if (!user) {
			setIsAuthModalOpen(true);
			setIsCartOpen(false);
			return;
		}
		setIsCartOpen(false);
		setIsCheckoutOpen(true);
	};

	const handleCheckoutSuccess = () => {
		const orderNum = 'SS' + Math.random().toString(36).substring(2, 10).toUpperCase();
		setLastOrderNumber(orderNum);

		const newOrder: Order = {
			id: Date.now().toString(),
			orderNumber: orderNum,
			customerName: user?.name || 'Guest',
			customerEmail: user?.email || '',
			total: cartTotal,
			status: 'Processing',
			refundStatus: 'None',
			date: new Date().toISOString().split('T')[0],
			items: cartItems.reduce((sum, item) => sum + item.quantity, 0),
		};

		setOrders([newOrder, ...orders]);
		setIsCheckoutOpen(false);
		setIsConfirmationOpen(true);
		setCartItems([]);

		// Show discount notification periodically
		setTimeout(() => {
			addNotification({
				type: 'discount',
				title: '15% OFF Your Next Purchase!',
				message: 'Use code STYLE15 at checkout. Valid for 48 hours.',
				duration: 8000,
			});
		}, 3000);
	};

	const handleRequestRefund = (orderId: string, reason: string) => {
		setOrders(orders.map(o =>
			o.id === orderId ? { ...o, refundStatus: 'Requested' as const, refundReason: reason } : o
		));
		addNotification({
			type: 'info',
			title: 'Refund Requested',
			message: 'Your refund request has been submitted for review.',
		});
	};

	const handleConfirmationClose = () => {
		setIsConfirmationOpen(false);
	};

	const handleSearchFilter = (filters: any) => {
		addNotification({
			type: 'info',
			title: 'Filters Applied',
			message: 'Search filters have been applied.',
		});
		setIsSearchOpen(false);
	};

	const handleVisualSearch = (file: File) => {
		addNotification({
			type: 'info',
			title: 'Visual Search',
			message: 'Searching for similar items...',
		});
	};

	const handleARTryOn = (product: Product) => {
		setSelectedARProduct(product);
		setIsARModalOpen(true);
	};

	const cartTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
	const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

	// Route to appropriate portal based on user role
	if (user?.role === 'admin') {
		return <AdminDashboard user={user} onLogout={handleLogout} />;
	}

	if (user?.role === 'brand-partner') {
		return <BrandPartnerPortal user={user} onLogout={handleLogout} />;
	}

	// Customer Experience
	return (
		<div className="min-h-screen bg-white">
			<Header
				activeCategory={activeCategory}
				onCategoryChange={setActiveCategory}
				onCartOpen={() => setIsCartOpen(true)}
				onWishlistOpen={() => setIsWishlistOpen(true)}
				cartItemCount={cartItemCount}
				wishlistItemCount={wishlistIds.size}
				user={user}
				onLoginOpen={() => setIsAuthModalOpen(true)}
				onProfileOpen={() => setIsProfileOpen(true)}
				onOrdersOpen={() => setIsOrdersOpen(true)}
				onLogout={handleLogout}
				onDemoGuideOpen={() => setIsDemoGuideOpen(true)}
			/>

			{/* Hero with AR Entry Point */}
			<div className="relative">
				<Hero heroImage={EXTENDED_PRODUCTS[0].image} />
				<div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center space-x-4 z-10">
					<button
						onClick={() => handleARTryOn(EXTENDED_PRODUCTS[0])}
						className="flex items-center space-x-2 px-6 py-3 text-white backdrop-blur-sm transition-all hover:shadow-lg"
						style={{ backgroundColor: 'rgba(212, 175, 55, 0.9)', borderRadius: '8px' }}
					>
						<Sparkles className="w-5 h-5" />
						<span>Try AR Virtual Fitting</span>
					</button>
					<button
						onClick={() => setIsSearchOpen(true)}
						className="flex items-center space-x-2 px-6 py-3 text-white backdrop-blur-sm transition-all hover:shadow-lg"
						style={{ backgroundColor: 'rgba(10, 47, 31, 0.9)', borderRadius: '8px' }}
					>
						<Search className="w-5 h-5" />
						<span>Advanced Search</span>
					</button>
					{user && (
						<button
							onClick={() => setIsTrackingOpen(true)}
							className="flex items-center space-x-2 px-6 py-3 text-white backdrop-blur-sm transition-all hover:shadow-lg"
							style={{ backgroundColor: 'rgba(10, 47, 31, 0.9)', borderRadius: '8px' }}
						>
							<Bell className="w-5 h-5" />
							<span>Track Orders</span>
						</button>
					)}
				</div>
			</div>

			{/* Personalized Section */}
			{user && (
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
					<div className="flex items-center justify-between mb-6">
						<div className="flex items-center space-x-3">
							<Sparkles className="w-6 h-6" style={{ color: 'var(--makeda-gold)' }} />
							<h2 className="text-2xl font-serif" style={{ fontFamily: "'Playfair Display', serif", color: 'var(--makeda-green)' }}>
								Personalized for You, {user.name}
							</h2>
						</div>
						<button
							onClick={() => setIsNotificationCenterOpen(true)}
							className="flex items-center space-x-2 px-4 py-2 border rounded hover:bg-gray-50 transition-colors"
							style={{ borderColor: 'var(--makeda-green)', color: 'var(--makeda-green)', borderRadius: '8px' }}
						>
							<Bell className="w-4 h-4" />
							<span>Notifications ({notificationLogs.length})</span>
						</button>
					</div>
					<div className="overflow-x-auto flex space-x-4 pb-4">
						{EXTENDED_PRODUCTS.slice(0, 6).map((product) => (
							<div
								key={product.id}
								className="flex-shrink-0 w-64 cursor-pointer hover:shadow-lg transition-shadow border border-gray-200"
								style={{ borderRadius: '8px' }}
								onClick={() => handleARTryOn(product)}
							>
								<img
									src={product.image}
									alt={product.name}
									className="w-full h-80 object-cover"
									style={{ borderRadius: '8px 8px 0 0' }}
								/>
								<div className="p-4 bg-white" style={{ borderRadius: '0 0 8px 8px' }}>
									<p className="text-sm mb-1" style={{ color: 'var(--makeda-green)' }}>{product.name}</p>
									<div className="flex items-center justify-between">
										<p className="text-lg" style={{ color: 'var(--makeda-gold)' }}>${product.price.toFixed(2)}</p>
										{product.stockQuantity < 10 && product.stockQuantity > 0 && (
											<span className="text-xs text-orange-600">Only {product.stockQuantity} left</span>
										)}
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			)}

			{/* Stats Banner */}
			<div className="py-8 px-4" style={{ backgroundColor: 'var(--makeda-sand)' }}>
				<div className="max-w-7xl mx-auto grid grid-cols-4 gap-8 text-center">
					<div>
						<p className="text-3xl mb-2" style={{ color: 'var(--makeda-green)' }}>{EXTENDED_PRODUCTS.length}+</p>
						<p className="text-sm text-gray-600">Premium Products</p>
					</div>
					<div>
						<p className="text-3xl mb-2" style={{ color: 'var(--makeda-green)' }}>7K+</p>
						<p className="text-sm text-gray-600">Happy Customers</p>
					</div>
					<div>
						<p className="text-3xl mb-2" style={{ color: 'var(--makeda-green)' }}>99.95%</p>
						<p className="text-sm text-gray-600">Uptime SLA</p>
					</div>
					<div>
						<p className="text-3xl mb-2" style={{ color: 'var(--makeda-green)' }}>100K+</p>
						<p className="text-sm text-gray-600">Concurrent Users</p>
					</div>
				</div>
			</div>

			<ProductGrid
				products={filteredProducts}
				onAddToCart={handleAddToCart}
				onToggleWishlist={handleToggleWishlist}
				wishlistIds={wishlistIds}
			/>

			<CartSidebar
				isOpen={isCartOpen}
				onClose={() => setIsCartOpen(false)}
				cartItems={cartItems}
				onUpdateQuantity={handleUpdateQuantity}
				onRemoveItem={handleRemoveFromCart}
				onCheckout={handleCheckout}
			/>

			<WishlistSidebar
				isOpen={isWishlistOpen}
				onClose={() => setIsWishlistOpen(false)}
				wishlistItems={wishlistItems}
				onRemoveItem={handleRemoveFromWishlist}
				onAddToCart={handleAddToCart}
			/>

			<CheckoutFlow
				isOpen={isCheckoutOpen}
				onClose={() => setIsCheckoutOpen(false)}
				onSuccess={handleCheckoutSuccess}
				total={cartTotal}
				user={user}
			/>

			<ConfirmationOverlay
				isOpen={isConfirmationOpen}
				orderNumber={lastOrderNumber}
				total={cartTotal}
				itemCount={cartItemCount}
				onClose={handleConfirmationClose}
			/>

			<EnhancedAuthModal
				isOpen={isAuthModalOpen}
				onClose={() => setIsAuthModalOpen(false)}
				onLogin={handleLogin}
			/>

			{user && isProfileOpen && (
				<UserProfile
					user={user}
					onUpdateProfile={handleUpdateProfile}
					onClose={() => setIsProfileOpen(false)}
				/>
			)}

			{user && isOrdersOpen && (
				<MyOrders
					isOpen={isOrdersOpen}
					onClose={() => setIsOrdersOpen(false)}
					orders={orders.filter(o => o.customerEmail === user.email)}
					onRequestRefund={handleRequestRefund}
				/>
			)}

			<AdvancedSearchSidebar
				isOpen={isSearchOpen}
				onClose={() => setIsSearchOpen(false)}
				onSearch={handleSearchFilter}
				onVisualSearch={handleVisualSearch}
			/>

			<ARTryOnModal
				isOpen={isARModalOpen}
				onClose={() => setIsARModalOpen(false)}
				product={selectedARProduct || EXTENDED_PRODUCTS[0]}
				onAddToCart={handleAddToCart}
			/>

			{user && (
				<EnhancedOrderTracking
					isOpen={isTrackingOpen}
					onClose={() => setIsTrackingOpen(false)}
					orders={orders.filter(o => o.customerEmail === user.email)}
				/>
			)}

			{user && (
				<NotificationCenter
					isOpen={isNotificationCenterOpen}
					onClose={() => setIsNotificationCenterOpen(false)}
					logs={notificationLogs.filter(l => l.recipient === user.email || l.recipient === user.phone)}
				/>
			)}

			<NotificationOverlay
				notifications={notifications}
				onDismiss={dismissNotification}
			/>

			<DemoGuide
				isOpen={isDemoGuideOpen}
				onClose={() => setIsDemoGuideOpen(false)}
			/>

			{/* Footer */}
			<footer className="border-t border-gray-200 py-12 mt-20" style={{ backgroundColor: 'var(--makeda-sand)' }}>
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center">
						<h3 className="text-2xl mb-4 font-serif" style={{ fontFamily: "'Playfair Display', serif", color: 'var(--makeda-green)' }}>
							STYLE<span style={{ color: 'var(--makeda-gold)' }}>SPHERE</span>
						</h3>
						<p className="text-gray-600 mb-4">Enterprise-Grade Luxury African Fashion</p>
						<p className="text-sm text-gray-500">© 2026 Makeda Threads. All rights reserved.</p>
						<p className="text-xs text-gray-400 mt-2">
							PWA-First • WCAG 2.1 AA Compliant • 99.95% Uptime SLA • 100K+ Concurrent Users
						</p>
						<div className="mt-4 text-xs text-gray-500">
							<p>Pre-populated Demo Accounts:</p>
							<p className="mt-1">
								<span style={{ color: 'var(--makeda-gold)' }}>amara.okafor@email.com</span> (Customer) •{' '}
								<span style={{ color: 'var(--makeda-gold)' }}>admin@Makeda Threads.com</span> (Admin) •{' '}
								<span style={{ color: 'var(--makeda-gold)' }}>brand@Makeda Threads.com</span> (Seller)
							</p>
						</div>
					</div>
				</div>
			</footer>
		</div>
	);
}
