---
title: "Menu Engineering Worksheet"
meta: "The Menu Engineering Worksheet is a versatile tool designed to help restaurateurs analyse and categorize menu items based on their profitability and popularity."
date: "2024-11-28"
category: "Analytics"
whoFor: "This tool is ideal for restaurant owners, chefs, and managers who want to optimise their menu offerings by understanding the financial performance of each dish. It's particularly useful for businesses looking to balance their menu to maximise both customer satisfaction and profitability."
whyUse: "Menu engineering is a powerful strategy for maximising profitability by leveraging data on sales and costs. The Menu Engineering Calculator simplifies this process by automatically categorising your menu items, helping you to quickly identify which dishes are driving your business forward and which may need to be rethought. It's an essential tool for any restaurant aiming to optimise its menu for success."
---

## How to Use This Tool

**1️⃣ Add Menu Items**

Click Add Menu Item to enter the details for each dish. You can add as many menu items as needed.

**2️⃣ Input Menu Item Details**

For each item, provide the following:

- Menu Item Name: Enter the name of the dish.
- Units Sold: Enter the number of units sold during a specific period.
- Dish Cost to the Business: Enter the cost to produce each unit of the dish.
- Menu Price to the Customer: Enter the price at which the dish is sold to customers.

**3️⃣ Calculate Menu Engineering**

After entering all items, click Calculate Menu Engineering to categorize each item based on its profitability and popularity.

**4️⃣ View Results**

The tool will display the category for each menu item:

- **Star**: High profitability and high popularity.
- **Plowhorse**: Low profitability and high popularity.
- **Puzzle**: High profitability and low popularity.
- **Dog**: Low profitability and low popularity.

<div class="tool-embed">
<div class="container">
    <div id="itemsContainer"></div>
    <button onclick="addItem()">Add Menu Item</button>
    <button onclick="calculateAllItems()">Calculate Menu Engineering</button>
    <div class="result" id="result"></div>
</div>

<script>
    let itemIndex = 0;

    function addItem() {
        itemIndex++;
        const itemRow = document.createElement('div');
        itemRow.className = 'item-row';
        itemRow.innerHTML = `
            <div class="form-column">
                <label for="menuItem${itemIndex}">Menu Item Name:</label>
                <input type="text" id="menuItem${itemIndex}" placeholder="Enter menu item name">
            </div>
            <div class="form-column">
                <label for="unitsSold${itemIndex}">Units Sold:</label>
                <input type="number" id="unitsSold${itemIndex}" placeholder="Enter units sold" step="1">
            </div>
            <div class="form-column">
                <label for="dishCost${itemIndex}">Dish Cost to the Business:</label>
                <input type="number" id="dishCost${itemIndex}" placeholder="Enter dish cost" step="0.01">
            </div>
            <div class="form-column">
                <label for="menuPrice${itemIndex}">Menu Price to the Customer:</label>
                <input type="number" id="menuPrice${itemIndex}" placeholder="Enter menu price" step="0.01">
            </div>
        `;
        document.getElementById('itemsContainer').appendChild(itemRow);
    }

    function calculateAllItems() {
        const resultContainer = document.getElementById('result');
        resultContainer.innerHTML = '';

        for (let i = 1; i <= itemIndex; i++) {
            const menuItem = document.getElementById(`menuItem${i}`).value;
            const unitsSold = parseFloat(document.getElementById(`unitsSold${i}`).value);
            const dishCost = parseFloat(document.getElementById(`dishCost${i}`).value);
            const menuPrice = parseFloat(document.getElementById(`menuPrice${i}`).value);

            if (isNaN(unitsSold) || isNaN(dishCost) || isNaN(menuPrice) || unitsSold <= 0 || dishCost <= 0 || menuPrice <= 0 || !menuItem) {
                alert(`Please enter valid inputs for all fields of item ${i}.`);
                return;
            }

            const totalCost = unitsSold * dishCost;
            const totalRevenue = unitsSold * menuPrice;
            const grossProfit = totalRevenue - totalCost;
            const grossProfitMargin = (grossProfit / totalRevenue) * 100;

            let category = "";

            if (grossProfitMargin >= 70 && unitsSold >= 100) {
                category = "Star (High Profitability, High Popularity)";
            } else if (grossProfitMargin < 70 && unitsSold >= 100) {
                category = "Plowhorse (Low Profitability, High Popularity)";
            } else if (grossProfitMargin >= 70 && unitsSold < 100) {
                category = "Puzzle (High Profitability, Low Popularity)";
            } else {
                category = "Dog (Low Profitability, Low Popularity)";
            }

            resultContainer.innerHTML += `
                <div class="category">
                    <strong>${menuItem}:</strong> ${category}
                </div>
            `;
        }
    }
</script>

<style>
    .item-row {
        margin-bottom: 20px;
        border-bottom: 1px solid #ccc;
        padding-bottom: 20px;
    }
    .category {
        margin-top: 10px;
        padding: 10px;
        background-color: #f4f4f4;
        border-left: 5px solid black;
    }
    .result {
        margin-top: 20px;
        font-size: 18px;
    }
</style>
</div>