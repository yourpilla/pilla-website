---
title: "Draught Beer GP Calculator"
meta: "The Beer GP Calculator helps you determine the ideal selling price and gross profit margin for different beer serving sizes."
date: "2024-12-10"
category: "Financial"
whoFor: "This tool is ideal for pub owners, bar managers, and brewery operators who need to calculate the correct selling price for beer servings to meet gross profit goals. It's particularly useful for pricing draft beers and updating menus."
whyUse: "The Beer GP Calculator ensures precise pricing of beer servings by considering factors like product cost, container size, serving size, and tax. It helps you quickly and easily calculate selling prices that align with your profit targets, reducing the risk of underpricing and maximizing profitability."
---

## How to Use This Tool

**1️⃣ Input Target GP %**

Enter your desired gross profit percentage.

**2️⃣ Input Product Cost**

Enter the cost of the beer product (e.g., keg).

**3️⃣ Select Product Size**

Choose the size of the beer container (e.g., 20 liters, 30 liters) from the dropdown menu.

**4️⃣ Select Serve Size**

Choose the size of the beer serving (e.g., Pint, Half Pint) from the dropdown menu.

**5️⃣ Input Tax Percentage**

Enter the applicable tax percentage.

**6️⃣ Calculate GP**

Click Calculate GP to generate the results.

**7️⃣ View Results**

The tool will display the cost per serve, the selling price needed to achieve your target GP, the gross profit, and the gross profit margin.

<div class="tool-embed">
<div class="container">
    <div class="section" id="beer-gp-section">
        <div class="form-row">
            <div class="form-column">
                <label for="target-gp">Target GP %:</label>
                <input type="number" id="target-gp">
            </div>
            <div class="form-column">
                <label for="product-cost">Product Cost:</label>
                <input type="number" id="product-cost">
            </div>
        </div>
        <div class="form-row">
            <div class="form-column">
                <label for="product-size">Product Size:</label>
                <select id="product-size">
                    <option value="30000">30 l</option>
                    <option value="20000">20 l</option>
                </select>
            </div>
            <div class="form-column">
                <label for="serve-size">Serve Size:</label>
                <select id="serve-size">
                    <option value="568">Pint (568 ml)</option>
                    <option value="379">2/3 Pint (379 ml)</option>
                    <option value="284">Half Pint (284 ml)</option>
                    <option value="189">1/3 Pint (189 ml)</option>
                </select>
            </div>
        </div>
        <div class="form-row">
            <div class="form-column">
                <label for="tax-percentage">Tax Percentage:</label>
                <input type="number" id="tax-percentage" value="0">
            </div>
        </div>
        <button onclick="calculateBeerGP()">Calculate GP</button>
        <div class="section" id="results-section">
            <h2>Results</h2>
            <ul id="results-list"></ul>
        </div>
    </div>
</div>

<script>
    function calculateBeerGP() {
        const targetGP = parseFloat(document.getElementById('target-gp').value);
        const productCost = parseFloat(document.getElementById('product-cost').value);
        const productSize = parseFloat(document.getElementById('product-size').value);
        const serveSize = parseFloat(document.getElementById('serve-size').value);
        const taxPercentage = parseFloat(document.getElementById('tax-percentage').value);

        if (isNaN(targetGP) || isNaN(productCost) || isNaN(productSize) || isNaN(serveSize) ||
            targetGP <= 0 || productCost <= 0 || productSize <= 0 || serveSize <= 0 ||
            isNaN(taxPercentage) || taxPercentage < 0) {
            alert("Please enter valid positive numbers for all fields.");
            return;
        }

        const costPerServe = (productCost / productSize) * serveSize;
        let sellingPrice = costPerServe / ((100 - targetGP) / 100);

        sellingPrice = sellingPrice * (1 + (taxPercentage / 100));

        const grossProfit = sellingPrice - costPerServe;
        const grossProfitMargin = (grossProfit / sellingPrice) * 100;

        const resultsList = document.getElementById('results-list');
        resultsList.innerHTML = '';
        const li1 = document.createElement('li');
        li1.textContent = `Cost Per Serve: ${costPerServe.toFixed(2)}`;
        const li2 = document.createElement('li');
        li2.textContent = `Selling Price (to achieve target GP): ${sellingPrice.toFixed(2)}`;
        const li3 = document.createElement('li');
        li3.textContent = `Gross Profit: ${grossProfit.toFixed(2)}`;
        const li4 = document.createElement('li');
        li4.textContent = `Gross Profit Margin: ${grossProfitMargin.toFixed(2)}%`;
        resultsList.appendChild(li1);
        resultsList.appendChild(li2);
        resultsList.appendChild(li3);
        resultsList.appendChild(li4);
    }
</script>
</div>