---
title: "Menu Price Calculator"
meta: "The Menu Price Calculator is a valuable tool designed to help restaurant owners and managers determine the ideal selling price for their dishes based on the dish's cost and their desired gross profit percentage."
date: "2024-12-04"
category: "Financial"
whoFor: "This tool is ideal for restaurant owners, chefs, and financial planners in the food service industry who need to set prices that ensure profitability while remaining attractive to customers. It's especially useful for those who want to streamline their pricing strategy and maintain control over their margins."
whyUse: "Pricing your dishes correctly is crucial for maintaining profitability in the restaurant business. The Menu Price Calculator helps you quickly and accurately determine the right selling price, ensuring that your menu items are both profitable and competitively priced. This tool saves time and reduces the complexity of pricing decisions, allowing you to focus on delivering great food and service."
---

## How to Use This Tool

**1️⃣ Input Dish Cost**

Enter the total cost to produce the dish, including ingredients, preparation, and other related expenses.

**2️⃣ Input Target Gross Profit %**

Enter your target gross profit percentage. This is the profit margin you wish to achieve for the dish.

**3️⃣ Calculate Menu Price**

Click the "Calculate Menu Price" button to determine the appropriate selling price for the dish that aligns with your profit goals.

**4️⃣ View the Result**

The tool will display the calculated menu price, ensuring that the dish meets your target gross profit percentage.

<div class="tool-embed">
<div class="container">
    <div class="form-column">
        <label for="dishCost">Dish Cost to the Business:</label>
        <input type="number" id="dishCost" placeholder="Enter dish cost" step="0.01">
    </div>
    <div class="form-column">
        <label for="gp">Target Gross Profit %:</label>
        <input type="number" id="gp" placeholder="Enter target gross profit %" step="0.01">
    </div>
    <button onclick="calculateMenuPrice()">Calculate Menu Price</button>
    <div class="result" id="result"></div>
</div>

<script>
    function calculateMenuPrice() {
        const dishCost = parseFloat(document.getElementById('dishCost').value);
        const gp = parseFloat(document.getElementById('gp').value);

        if (isNaN(dishCost) || isNaN(gp) || dishCost <= 0 || gp < 0 || gp >= 100) {
            alert("Please enter valid numbers for both fields.");
            return;
        }

        const menuPrice = dishCost / (1 - (gp / 100));
        document.getElementById('result').textContent = `The menu price should be: ${menuPrice.toFixed(2)}`;
    }
</script>
</div>