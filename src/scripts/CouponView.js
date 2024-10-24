// Example coupons array (replace with actual data retrieval logic)
let coupons = [
    { code: 'COUPON1', discount: 10, markdownEvent: 'Holiday Sale', status: 'active' },
    { code: 'COUPON2', discount: 15, markdownEvent: 'Weekend Offer', status: 'active' },
    { code: 'COUPON3', discount: 20, markdownEvent: 'Coffee Lovers', status: 'active' }
];

// Function to render active coupons
function renderActiveCoupons() {
    const couponCardsContainer = document.getElementById('couponCards');
    couponCardsContainer.innerHTML = ''; // Clear previous content

    coupons.forEach(coupon => {
        if (coupon.status === 'active') {
            const card = document.createElement('div');
            card.className = 'coupon-card';
            card.innerHTML = `
                <div class="coupon-code">${coupon.code}</div>
                <div>Discount: ${coupon.discount}%</div>
                <div>Event: ${coupon.markdownEvent}</div>
                <button class="copy-button" onclick="copyCouponCode('${coupon.code}')">Copy Code</button>
            `;
            couponCardsContainer.appendChild(card);
        }
    });
}

// Function to copy coupon code to clipboard
function copyCouponCode(code) {
    navigator.clipboard.writeText(code).then(() => {
        alert(`Coupon code ${code} copied to clipboard!`);
    });
}

// Call the function to render coupons on page load
renderActiveCoupons();
