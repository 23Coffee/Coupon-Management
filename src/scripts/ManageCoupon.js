// Array to store coupons
let coupons = [];

// Function to add a new coupon
function addCoupon() {
    const couponCode = generateCouponCode();
    const discountPercentage = document.getElementById('discountPercentage').value;
    const markdownEvent = document.getElementById('markdownEvent').value; // Markdown Event
    const expireDate = document.getElementById('expireDate').value;

    const createdDate = new Date().toISOString().split('T')[0]; // Today's date

    const coupon = {
        code: couponCode,
        discount: discountPercentage,
        markdownEvent: markdownEvent,  // Store markdown event name
        createdDate: createdDate,
        expireDate: expireDate,
        status: 'active' // Default status
    };

    coupons.push(coupon);
    renderCoupons();
}

// Function to generate a random coupon code
function generateCouponCode() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
}

// Function to render the list of coupons
function renderCoupons() {
    const couponList = document.getElementById('couponList');
    couponList.innerHTML = '';

    const filterValue = document.getElementById('filterStatus').value; // Get current filter value

    coupons.forEach((coupon, index) => {
        // Filter based on status
        if (filterValue === 'all' || coupon.status === filterValue) {
            const row = document.createElement('tr');

            row.innerHTML = `
                <td>${coupon.code}</td>
                <td>
                    <select onchange="updateStatus(${index}, this.value)">
                        <option value="active" ${coupon.status === 'active' ? 'selected' : ''}>Active</option>
                        <option value="inactive" ${coupon.status === 'inactive' ? 'selected' : ''}>Inactive</option>
                    </select>
                </td>
                <td>${coupon.discount}%</td>
                <td>${coupon.markdownEvent}</td>
                <td>${coupon.createdDate}</td>
                <td>${coupon.expireDate}</td>
                <td><button onclick="deleteCoupon(${index})">Delete</button></td>
            `;

            couponList.appendChild(row);
        }
    });
}

// Function to update coupon status
function updateStatus(index, status) {
    coupons[index].status = status;
    renderCoupons();
}

// Function to delete a coupon
function deleteCoupon(index) {
    coupons.splice(index, 1);
    renderCoupons();
}

// Event listener for adding coupons
document.getElementById('addCoupon').addEventListener('click', addCoupon);

// Event listener for filter change
document.getElementById('filterStatus').addEventListener('change', renderCoupons);
