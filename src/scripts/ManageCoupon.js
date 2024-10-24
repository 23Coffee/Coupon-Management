// Array to store coupons
let coupons = [];

// Function to generate a random coupon code
function generateCouponCode() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 8; i++) {
        code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return code;
}

// Function to render the coupon list
function renderCouponList() {
    const couponList = document.getElementById('couponList');
    couponList.innerHTML = '';

    const filterStatus = document.getElementById('filterStatus').value;

    // Filter coupons by selected status
    const filteredCoupons = coupons.filter(coupon => filterStatus === 'all' || coupon.status === filterStatus);

    filteredCoupons.forEach((coupon, index) => {
        const row = document.createElement('tr');

        // Coupon Code
        const codeCell = document.createElement('td');
        codeCell.innerText = coupon.code;
        row.appendChild(codeCell);

        // Coupon Status
        const statusCell = document.createElement('td');
        const statusSelect = document.createElement('select');
        statusSelect.innerHTML = `
            <option value="active" ${coupon.status === 'active' ? 'selected' : ''}>Active</option>
            <option value="inactive" ${coupon.status === 'inactive' ? 'selected' : ''}>Inactive</option>
        `;
        statusSelect.addEventListener('change', (event) => {
            coupon.status = event.target.value; // Update coupon status
        });
        statusCell.appendChild(statusSelect);
        row.appendChild(statusCell);

        // Created Date
        const createdDateCell = document.createElement('td');
        createdDateCell.innerText = coupon.createdDate;
        row.appendChild(createdDateCell);

        // Expire Date
        const expireDateCell = document.createElement('td');
        expireDateCell.innerText = coupon.expireDate;
        row.appendChild(expireDateCell);

        // Actions (Delete)
        const actionCell = document.createElement('td');
        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'Delete';
        deleteButton.addEventListener('click', () => {
            coupons.splice(index, 1); // Remove the coupon from the array
            renderCouponList(); // Re-render the list
        });
        actionCell.appendChild(deleteButton);
        row.appendChild(actionCell);

        couponList.appendChild(row);
    });
}

// Function to get the current date in YYYY-MM-DD format
function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

// Event listener for adding a new coupon
document.getElementById('addCoupon').addEventListener('click', () => {
    const expireDate = document.getElementById('expireDate').value;

    // Validate the expire date
    if (!expireDate) {
        alert("Please select an expire date.");
        return;
    }

    const newCoupon = {
        code: generateCouponCode(),
        status: 'active', // Default status
        createdDate: getCurrentDate(), // Automatically set the created date
        expireDate: expireDate // Set expire date from input
    };
    coupons.push(newCoupon); // Add the new coupon to the array
    renderCouponList(); // Re-render the coupon list
});

// Event listener for filtering by status
document.getElementById('filterStatus').addEventListener('change', () => {
    renderCouponList();
});
