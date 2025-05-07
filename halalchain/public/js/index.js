// Import agents
const agents = require('./agents');

// Firebase Configuration - REPLACE WITH YOUR ACTUAL CONFIG
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "your-project-id.firebaseapp.com",
    projectId: "your-project-id",
    storageBucket: "your-project-id.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

// DOM Elements
const loginBtn = document.getElementById('login-btn');
const logoutBtn = document.getElementById('logout-btn');
const vendorRegisterBtn = document.getElementById('vendor-register-btn');
const registerLink = document.getElementById('register-link');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const backToTopBtn = document.querySelector('.back-to-top');
const newsletterForm = document.querySelector('.newsletter-form');

// Mobile menu toggle
menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Back to top button
backToTopBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Newsletter form handler
newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = newsletterForm.querySelector('input').value;
    
    // Add to Firestore
    db.collection('newsletters').add({
        email: email,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    .then(() => {
        alert('Thank you for subscribing to our newsletter!');
        newsletterForm.reset();
    })
    .catch(error => {
        console.error('Error adding newsletter subscription:', error);
        alert('Subscription failed. Please try again.');
    });
});

// Auth State Listener
auth.onAuthStateChanged(user => {
    if (user) {
        // User is signed in
        loginBtn.classList.add('hidden');
        logoutBtn.classList.remove('hidden');
        vendorRegisterBtn.classList.add('hidden');
        checkUserRole(user.uid);
    } else {
        // No user is signed in
        loginBtn.classList.remove('hidden');
        logoutBtn.classList.add('hidden');
        vendorRegisterBtn.classList.remove('hidden');
        showLoginForm();
    }
});

// Event Listeners
loginBtn.addEventListener('click', showLoginForm);
logoutBtn.addEventListener('click', () => auth.signOut());
vendorRegisterBtn.addEventListener('click', () => showSection('vendor-register'));
registerLink.addEventListener('click', (e) => {
    e.preventDefault();
    showRegisterForm();
});

// User Role Management
async function checkUserRole(uid) {
    try {
        const userDoc = await db.collection('users').doc(uid).get();
        if (!userDoc.exists) {
            showCustomerView();
            return;
        }
        
        const role = userDoc.data().role;
        switch (role) {
            case 'admin':
                showAdminPanel();
                break;
            case 'vendor':
                showVendorDashboard();
                loadVendorProducts(uid);
                break;
            default:
                showCustomerView();
        }
    } catch (error) {
        console.error("Error checking user role:", error);
    }
}

// Navigation Functions
function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(sectionId).classList.add('active');
    navLinks.classList.remove('active'); // Close mobile menu
}

function showAdminPanel() {
    showSection('admin-panel');
    loadVerificationRequests();
}

function showVendorDashboard() {
    showSection('vendor-dashboard');
}

function showCustomerView() {
    showSection('home');
    loadProducts();
}

function showLoginForm() {
    showSection('login');
}

function showRegisterForm() {
    showSection('register');
}

// Data Loading Functions
async function loadProducts() {
    try {
        const querySnapshot = await db.collection('products')
            .where('halalVerified', '==', true)
            .orderBy('timestamp', 'desc')
            .get();
        
        const productList = document.getElementById('product-list');
        productList.innerHTML = '';
        
        querySnapshot.forEach(doc => {
            const product = doc.data();
            productList.innerHTML += `
                <div class="product">
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <img src="${product.imageUrl}" alt="${product.name}" loading="lazy">
                    <p>Price: $${product.price?.toFixed(2) || 'N/A'}</p>
                    <p>Vendor: ${product.vendorName || 'Unknown'}</p>
                </div>
            `;
        });
    } catch (error) {
        console.error("Error loading products:", error);
    }
}

async function loadVendorProducts(vendorId) {
    try {
        const querySnapshot = await db.collection('products')
            .where('vendorId', '==', vendorId)
            .orderBy('timestamp', 'desc')
            .get();
        
        const vendorProducts = document.getElementById('vendor-products');
        vendorProducts.innerHTML = '';
        
        querySnapshot.forEach(doc => {
            const product = doc.data();
            const status = product.halalVerified ? 
                '<span style="color:green">Verified</span>' : 
                '<span style="color:orange">Pending Verification</span>';
            
            vendorProducts.innerHTML += `
                <div class="product">
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <img src="${product.imageUrl}" alt="${product.name}" loading="lazy">
                    <p>Price: $${product.price?.toFixed(2) || 'N/A'}</p>
                    <p>Status: ${status}</p>
                </div>
            `;
        });
    } catch (error) {
        console.error("Error loading vendor products:", error);
    }
}

async function loadVerificationRequests() {
    try {
        const querySnapshot = await db.collection('products')
            .where('halalVerified', '==', false)
            .orderBy('timestamp')
            .get();
        
        const verificationList = document.getElementById('verification-list');
        verificationList.innerHTML = '';
        
        if (querySnapshot.empty) {
            verificationList.innerHTML = '<p>No products pending verification.</p>';
            return;
        }
        
        querySnapshot.forEach(doc => {
            const product = doc.data();
            verificationList.innerHTML += `
                <div class="verification-item">
                    <div>
                        <h4>${product.name}</h4>
                        <p>${product.description}</p>
                        <p>Submitted by: ${product.vendorName || 'Unknown Vendor'}</p>
                    </div>
                    <button onclick="verifyProduct('${doc.id}')">Verify Halal</button>
                </div>
            `;
        });
    } catch (error) {
        console.error("Error loading verification requests:", error);
    }
}

// Form Handlers
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    try {
        await auth.signInWithEmailAndPassword(email, password);
    } catch (error) {
        alert('Login failed: ' + error.message);
        console.error('Login error:', error);
    }
});

document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const errorElement = document.getElementById('register-error');
    
    try {
        errorElement.textContent = '';
        await registerUser(email, password);
        alert('Registration successful!');
        showLoginForm();
    } catch (error) {
        errorElement.textContent = error.message;
        console.error('Registration error:', error);
    }
});

async function registerUser(email, password) {
    try {
        const userCredential = await auth.createUserWithEmailAndPassword(email, password);
        // Create user document
        await db.collection('users').doc(userCredential.user.uid).set({
            email: email,
            role: 'customer',
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        return userCredential.user;
    } catch (error) {
        if (error.code === "auth/email-already-in-use") {
            throw new Error("This email is already registered.");
        } else if (error.code === "auth/invalid-email") {
            throw new Error("Please enter a valid email address.");
        } else if (error.code === "auth/weak-password") {
            throw new Error("Password should be at least 6 characters.");
        } else {
            throw new Error("Registration failed. Please try again later.");
        }
    }
}

document.getElementById('productForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user) {
        alert('Please login first');
        return;
    }

    try {
        const file = document.getElementById('productImage').files[0];
        const storageRef = storage.ref(`products/${user.uid}/${Date.now()}_${file.name}`);
        const uploadTask = await storageRef.put(file);
        const imageUrl = await uploadTask.ref.getDownloadURL();

        const vendorDoc = await db.collection('users').doc(user.uid).get();
        const vendorName = vendorDoc.exists ? vendorDoc.data().businessName : 'Unknown Vendor';

        await db.collection('products').add({
            name: document.getElementById('productName').value,
            description: document.getElementById('productDescription').value,
            price: parseFloat(document.getElementById('productPrice').value),
            imageUrl: imageUrl,
            vendorId: user.uid,
            vendorName: vendorName,
            halalVerified: false,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });

        alert('Product submitted for verification!');
        document.getElementById('productForm').reset();
        loadVendorProducts(user.uid);
    } catch (error) {
        console.error('Error adding product:', error);
        alert('Error adding product: ' + error.message);
    }
});

document.getElementById('vendorForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user) {
        alert('Please login first');
        return;
    }

    try {
        const file = document.getElementById('halalCertificate').files[0];
        const storageRef = storage.ref(`certificates/${user.uid}/${file.name}`);
        const uploadTask = await storageRef.put(file);
        const certificateUrl = await uploadTask.ref.getDownloadURL();

        await db.collection('users').doc(user.uid).set({
            businessName: document.getElementById('businessName').value,
            businessAddress: document.getElementById('businessAddress').value,
            businessEmail: document.getElementById('businessEmail').value,
            certificateUrl: certificateUrl,
            role: 'vendor',
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        }, { merge: true });

        alert('Vendor application submitted successfully!');
        document.getElementById('vendorForm').reset();
        showVendorDashboard();
    } catch (error) {
        console.error('Error submitting vendor application:', error);
        alert('Error submitting application: ' + error.message);
    }
});

// Admin Functions
window.verifyProduct = async function(productId) {
    try {
        await db.collection('products').doc(productId).update({
            halalVerified: true,
            verificationDate: firebase.firestore.FieldValue.serverTimestamp()
        });
        loadVerificationRequests();
        alert('Product verified successfully!');
    } catch (error) {
        console.error('Error verifying product:', error);
        alert('Error verifying product: ' + error.message);
    }
}

// Initialize
window.onload = () => {
    agents.callAllAgents();
    
    loadProducts();
    
    // Show features section by default if on home page
    if (window.location.hash === '#home' || window.location.hash === '') {
        showSection('features');
    }
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Show back to top button when scrolling
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.style.opacity = '1';
            backToTopBtn.style.visibility = 'visible';
        } else {
            backToTopBtn.style.opacity = '0';
            backToTopBtn.style.visibility = 'hidden';
        }
    });
};