---
title: "Wine GP Calculator"
meta: "Quickly calculate the selling price and gross profit margin for wine servings by inputting product costs, sizes, and your target gross profit percentage."
date: "2024-12-12"
category: "Financial"
whoFor: "This tool is perfect for bar managers, sommeliers, and restaurant owners who need to determine the ideal selling price for wine servings to meet gross profit targets. It's especially useful during menu planning or when updating pricing strategies."
whyUse: "The Wine GP Calculator saves time and ensures accuracy when pricing wine servings. By automatically factoring in product size, serving size, and tax, it eliminates guesswork and manual errors, helping you maintain desired profit margins with minimal effort."
---

## How to Use This Tool

**1️⃣ Input Target GP %**

Enter your desired gross profit percentage.

**2️⃣ Input Product Cost**

Enter the cost of the wine product.

**3️⃣ Select Product Size**

Choose the size of the wine bottle or container from the dropdown menu.

**4️⃣ Select Serve Size**

Choose the size of each serving from the dropdown menu.

**5️⃣ Input Tax Percentage**

Enter the tax percentage to apply (if applicable).

**6️⃣ Calculate GP**

Click Calculate GP to see the results.

**7️⃣ View Results**

The tool will display the cost per serve, the selling price needed to achieve your target GP, the gross profit, and the gross profit margin.

<div class="tool-embed">
<div class="container">
    <div class="section" id="wine-gp-section">
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
                    <option value="10000">10 l</option>
                    <option value="3000">3 l</option>
                    <option value="1500">1.5 l</option>
                    <option value="1000">1 l</option>
                    <option value="750">750 ml</option>
                    <option value="700">700 ml</option>
                    <option value="500">500 ml</option>
                    <option value="370.5">370.5 ml</option>
                    <option value="350">350 ml</option>
                    <option value="250">250 ml</option>
                    <option value="200">200 ml</option>
                    <option value="180.75">180.75 ml</option>
                </select>
            </div>
            <div class="form-column">
                <label for="serve-size">Serve Size:</label>
                <select id="serve-size">
                    <option value="3000">3 l</option>
                    <option value="1500">1.5 l</option>
                    <option value="1000">1 l</option>
                    <option value="750">750 ml</option>
                    <option value="700">700 ml</option>
                    <option value="500">500 ml</option>
                    <option value="370.5">370.5 ml</option>
                    <option value="350">350 ml</option>
                    <option value="250">250 ml</option>
                    <option value="200">200 ml</option>
                    <option value="180.75">180.75 ml</option>
                    <option value="175">175 ml</option>
                    <option value="125">125 ml</option>
                </select>
            </div>
        </div>
        <div class="form-row">
            <div class="form-column">
                <label for="tax-percentage">Tax Percentage:</label>
                <input type="number" id="tax-percentage" value="0">
            </div>
        </div>
        <button onclick="calculateWineGP()">Calculate GP</button>
        <div class="section" id="results-section">
            <h2>Results</h2>
            <ul id="results-list"></ul>
        </div>
    </div>
</div>

<script>
    function calculateWineGP() {
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