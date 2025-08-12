import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

// Tool data from CSV export
const tools = [
  {
    slug: 'tronc-calculator',
    name: 'Tronc Calculator',
    description: 'Easily calculate and distribute tips among your staff by assigning Tronc points to job roles and hours worked, ensuring a fair tip-sharing process.',
    whoFor: 'This tool is essential for hospitality managers, head waiters, and bar supervisors who are responsible for fairly distributing tips among their staff. It\'s particularly useful during shifts when multiple roles are involved, ensuring that everyone is compensated proportionally to their contribution and hours worked.',
    whyUse: 'Using this Tronc Calculator simplifies the complex and often time-consuming process of manually calculating and distributing tips. It reduces the chance of human error, ensures transparency, and helps maintain staff satisfaction by fairly compensating each role based on predefined criteria. It\'s a quick, reliable way to ensure everyone is paid fairly for their work.',
    howTo: '1️⃣ Input Job Roles and Tronc Points\n\nEnter the job title (e.g., waiter, bartender).\n\nAssign Tronc points based on the role\'s importance.\n\nClick Add Role to save the role.\n\n2️⃣ Input Employees and Assign Roles\n\nEnter the employee\'s name.\n\nSelect their role from the list of added roles.\n\nInput the total hours they worked.\n\nClick Add Employee to save the employee.\n\n3️⃣ Input Total Tips\n\nEnter the total amount of tips collected.\n\nClick Distribute Tips to calculate each employee\'s share.\n\n4️⃣ View Results\n\nThe tool will show each employee\'s name and their share of the tips.',
    htmlTool: `<div class="container">
        <div class="section" id="roles-section">
            <h2>Step 1: Input Job Roles and Tronc Points</h2>
            <div class="form-row">
                <div class="form-column">
                    <label for="role-name">Role Name:</label>
                    <input type="text" id="role-name">
                </div>
                <div class="form-column">
                    <label for="role-weight">Tronc Points:</label>
                    <input type="number" id="role-weight">
                </div>
                <button onclick="addRole()">Add Role</button>
            </div>
            <ul id="roles-list"></ul>
        </div>

        <div class="section" id="employees-section">
            <h2>Step 2: Input Employees, Assign Roles and Hours Worked</h2>
            <div class="form-row">
                <div class="form-column">
                    <label for="employee-name">Employee Name:</label>
                    <input type="text" id="employee-name">
                </div>
                <div class="form-column">
                    <label for="employee-role">Role:</label>
                    <select id="employee-role"></select>
                </div>
                <div class="form-column">
                    <label for="employee-hours">Hours Worked:</label>
                    <input type="number" id="employee-hours">
                </div>
                <button onclick="addEmployee()">Add Employee</button>
            </div>
            <ul id="employees-list"></ul>
        </div>

        <div class="section" id="tips-section">
            <h2>Step 3: Input Total Tips</h2>
            <div class="form-row">
                <div class="form-column">
                    <label for="total-tips">Total Tips:</label>
                    <input type="number" id="total-tips">
                </div>
                <button onclick="distributeTips()">Distribute Tips</button>
            </div>
        </div>

        <div class="section" id="results-section">
            <h2>Results</h2>
            <ul id="results-list"></ul>
        </div>
    </div>

    <script>
        const roles = [];
        const employees = [];

        function addRole() {
            const roleName = document.getElementById('role-name').value;
            const roleWeight = parseFloat(document.getElementById('role-weight').value);
            if (roleName && roleWeight) {
                roles.push({ name: roleName, weight: roleWeight });
                updateRolesList();
                updateRoleOptions();
                document.getElementById('role-name').value = '';
                document.getElementById('role-weight').value = '';
            }
        }

        function updateRolesList() {
            const rolesList = document.getElementById('roles-list');
            rolesList.innerHTML = '';
            roles.forEach(role => {
                const li = document.createElement('li');
                li.textContent = \`\${role.name} (Tronc Points: \${role.weight})\`;
                rolesList.appendChild(li);
            });
        }

        function updateRoleOptions() {
            const employeeRole = document.getElementById('employee-role');
            employeeRole.innerHTML = '';
            roles.forEach(role => {
                const option = document.createElement('option');
                option.value = role.name;
                option.textContent = role.name;
                employeeRole.appendChild(option);
            });
        }

        function addEmployee() {
            const employeeName = document.getElementById('employee-name').value;
            const employeeRole = document.getElementById('employee-role').value;
            const employeeHours = parseFloat(document.getElementById('employee-hours').value);
            if (employeeName && employeeRole && employeeHours) {
                employees.push({ name: employeeName, role: employeeRole, hours: employeeHours });
                updateEmployeesList();
                document.getElementById('employee-name').value = '';
                document.getElementById('employee-hours').value = '';
            }
        }

        function updateEmployeesList() {
            const employeesList = document.getElementById('employees-list');
            employeesList.innerHTML = '';
            employees.forEach(employee => {
                const li = document.createElement('li');
                li.textContent = \`\${employee.name} (Role: \${employee.role}, Hours Worked: \${employee.hours})\`;
                employeesList.appendChild(li);
            });
        }

        function distributeTips() {
            const totalTips = parseFloat(document.getElementById('total-tips').value);
            if (!totalTips) return;

            const roleWeights = {};
            roles.forEach(role => {
                roleWeights[role.name] = role.weight;
            });

            const totalWeight = employees.reduce((sum, employee) => {
                return sum + (roleWeights[employee.role] * employee.hours);
            }, 0);

            const results = employees.map(employee => {
                const weight = roleWeights[employee.role];
                const tipShare = (weight * employee.hours / totalWeight) * totalTips;
                return { name: employee.name, tipShare: tipShare.toFixed(2) };
            });

            updateResultsList(results);
        }

        function updateResultsList(results) {
            const resultsList = document.getElementById('results-list');
            resultsList.innerHTML = '';
            results.forEach(result => {
                const li = document.createElement('li');
                li.textContent = \`\${result.name}: \${result.tipShare}\`;
                resultsList.appendChild(li);
            });
        }
    </script>`
  },
  {
    slug: 'wine-gp-calculator',
    name: 'Wine GP Calculator',
    description: 'Quickly calculate the selling price and gross profit margin for wine servings by inputting product costs, sizes, and your target gross profit percentage.',
    whoFor: 'This tool is perfect for bar managers, sommeliers, and restaurant owners who need to determine the ideal selling price for wine servings to meet gross profit targets. It\'s especially useful during menu planning or when updating pricing strategies.',
    whyUse: 'The Wine GP Calculator saves time and ensures accuracy when pricing wine servings. By automatically factoring in product size, serving size, and tax, it eliminates guesswork and manual errors, helping you maintain desired profit margins with minimal effort.',
    howTo: '1️⃣ Input Target GP %\n\nEnter your desired gross profit percentage.\n\n2️⃣ Input Product Cost\n\nEnter the cost of the wine product.\n\n3️⃣ Select Product Size\n\nChoose the size of the wine bottle or container from the dropdown menu.\n\n4️⃣ Select Serve Size\n\nChoose the size of each serving from the dropdown menu.\n\n5️⃣ Input Tax Percentage\n\nEnter the tax percentage to apply (if applicable).\n\n6️⃣ Calculate GP\n\nClick Calculate GP to see the results.\n\n7️⃣ View Results\n\nThe tool will display the cost per serve, the selling price needed to achieve your target GP, the gross profit, and the gross profit margin.',
    htmlTool: `<div class="container">
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
            li1.textContent = \`Cost Per Serve: \${costPerServe.toFixed(2)}\`;
            const li2 = document.createElement('li');
            li2.textContent = \`Selling Price (to achieve target GP): \${sellingPrice.toFixed(2)}\`;
            const li3 = document.createElement('li');
            li3.textContent = \`Gross Profit: \${grossProfit.toFixed(2)}\`;
            const li4 = document.createElement('li');
            li4.textContent = \`Gross Profit Margin: \${grossProfitMargin.toFixed(2)}%\`;
            resultsList.appendChild(li1);
            resultsList.appendChild(li2);
            resultsList.appendChild(li3);
            resultsList.appendChild(li4);
        }
    </script>`
  },
  {
    slug: 'draught-beer-gp-calculator',
    name: 'Draught Beer GP Calculator',
    description: 'The Beer GP Calculator helps you determine the ideal selling price and gross profit margin for different beer serving sizes.',
    whoFor: 'This tool is ideal for pub owners, bar managers, and brewery operators who need to calculate the correct selling price for beer servings to meet gross profit goals. It\'s particularly useful for pricing draft beers and updating menus.',
    whyUse: 'The Beer GP Calculator ensures precise pricing of beer servings by considering factors like product cost, container size, serving size, and tax. It helps you quickly and easily calculate selling prices that align with your profit targets, reducing the risk of underpricing and maximizing profitability.',
    howTo: '1️⃣ Input Target GP %\n\nEnter your desired gross profit percentage.\n\n2️⃣ Input Product Cost\n\nEnter the cost of the beer product (e.g., keg).\n\n3️⃣ Select Product Size\n\nChoose the size of the beer container (e.g., 20 liters, 30 liters) from the dropdown menu.\n\n4️⃣ Select Serve Size\n\nChoose the size of the beer serving (e.g., Pint, Half Pint) from the dropdown menu.\n\n5️⃣ Input Tax Percentage\n\nEnter the applicable tax percentage.\n\n6️⃣ Calculate GP\n\nClick Calculate GP to generate the results.\n\n7️⃣ View Results\n\nThe tool will display the cost per serve, the selling price needed to achieve your target GP, the gross profit, and the gross profit margin.',
    htmlTool: `<div class="container">
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
            li1.textContent = \`Cost Per Serve: \${costPerServe.toFixed(2)}\`;
            const li2 = document.createElement('li');
            li2.textContent = \`Selling Price (to achieve target GP): \${sellingPrice.toFixed(2)}\`;
            const li3 = document.createElement('li');
            li3.textContent = \`Gross Profit: \${grossProfit.toFixed(2)}\`;
            const li4 = document.createElement('li');
            li4.textContent = \`Gross Profit Margin: \${grossProfitMargin.toFixed(2)}%\`;
            resultsList.appendChild(li1);
            resultsList.appendChild(li2);
            resultsList.appendChild(li3);
            resultsList.appendChild(li4);
        }
    </script>`
  },
  {
    slug: 'restaurant-name-generator',
    name: 'Restaurant Name Generator',
    description: 'The Restaurant Name Generator is a simple yet creative tool designed to help you come up with catchy and unique names for your restaurant. By entering a few relevant keywords, you can generate a list of potential restaurant names that align with your theme or concept.',
    whoFor: 'This tool is perfect for aspiring restaurateurs, chefs, or anyone in the hospitality industry looking to name a new restaurant. Whether you\'re opening a casual diner, a cozy café, or a high-end bistro, this tool can spark inspiration and help you find the perfect name.',
    whyUse: 'Naming your restaurant is a critical step in establishing your brand identity. The Restaurant Name Generator provides quick and creative suggestions, allowing you to explore different naming options that resonate with your restaurant\'s concept. It\'s a great starting point for brainstorming and can save you time in the creative process.',
    howTo: '1️⃣ Input Keywords\n\nEnter keywords related to your restaurant\'s theme, concept, or cuisine. Separate multiple keywords with commas (e.g., spicy, garden, grill).\n\n2️⃣ Generate Names\n\nClick Generate Names to create a list of restaurant name suggestions based on your input.\n\n3️⃣ View Suggested Names\n\nThe tool will generate a list of possible restaurant names, each combining your keywords with popular restaurant suffixes.',
    htmlTool: `<div class="container">
        <div class="form-column">
            <label for="keywords">Enter Keywords:</label>
            <input type="text" id="keywords" placeholder="e.g., spicy, garden, grill">
        </div>
        <button onclick="generateNames()">Generate Names</button>
        <div class="section" id="results-section">
            <h2>Suggested Names</h2>
            <ul id="results-list"></ul>
        </div>
    </div>

    <script>
        function generateNames() {
            const keywordsInput = document.getElementById('keywords').value.trim();
            if (!keywordsInput) {
                alert("Please enter some keywords.");
                return;
            }

            const keywords = keywordsInput.split(',').map(keyword => keyword.trim());
            const suffixes = ["Bistro", "Cafe", "Grill", "Diner", "Eatery", "House", "Kitchen", "Lounge", "Palace", "Restaurant", "Spot"];

            const resultsList = document.getElementById('results-list');
            resultsList.innerHTML = '';

            keywords.forEach(keyword => {
                suffixes.forEach(suffix => {
                    const li = document.createElement('li');
                    li.textContent = \`\${keyword.charAt(0).toUpperCase() + keyword.slice(1)} \${suffix}\`;
                    resultsList.appendChild(li);
                });
            });
        }
    </script>`
  },
  {
    slug: 'food-cost-percentage-calculator',
    name: 'Food Cost Percentage Calculator',
    description: 'This Food Cost Percentage Calculator is designed to help restaurant owners and managers quickly and easily calculate the food cost percentage for any dish on their menu.',
    whoFor: 'This tool is ideal for restaurateurs, chefs, and financial managers in the food industry who need to monitor and optimize their menu pricing strategies. It\'s especially useful for those aiming to balance cost control with profitability.',
    whyUse: 'Understanding your food cost percentage is crucial for maintaining a profitable restaurant operation. The Food Cost Percentage Calculator provides quick and accurate calculations, enabling you to make informed decisions about pricing, menu adjustments, and cost management. This tool simplifies a complex task, helping you focus on what you do best—serving great food!',
    howTo: '1️⃣ Input Dish Cost\nEnter the total cost incurred by your business to prepare the dish, including ingredients, labor, and other related expenses.\n\n2️⃣ Input Menu Price\nEnter the price at which the dish is being sold to your customers.\n\n3️⃣ Calculate Food Cost Percentage\nClick the "Calculate Food Cost Percentage" button to compute the food cost percentage based on the inputs provided.\n\n4️⃣ View the Result\nThe tool will display the calculated food cost percentage, allowing you to assess how much of the selling price is used to cover the cost of the dish.',
    htmlTool: `<div class="container">
        <div class="form-column">
            <label for="dishCost">Dish Cost to the Business:</label>
            <input type="number" id="dishCost" placeholder="Enter dish cost" step="0.01">
        </div>
        <div class="form-column">
            <label for="menuPrice">Menu Price to the Customer:</label>
            <input type="number" id="menuPrice" placeholder="Enter menu price" step="0.01">
        </div>
        <button onclick="calculateFoodCostPercentage()">Calculate Food Cost Percentage</button>
        <div class="result" id="result"></div>
    </div>

    <script>
        function calculateFoodCostPercentage() {
            const dishCost = parseFloat(document.getElementById('dishCost').value);
            const menuPrice = parseFloat(document.getElementById('menuPrice').value);

            if (isNaN(dishCost) || isNaN(menuPrice) || menuPrice === 0) {
                alert("Please enter valid numbers for both fields.");
                return;
            }

            const foodCostPercentage = (dishCost / menuPrice) * 100;
            document.getElementById('result').textContent = \`The food cost percentage is: \${foodCostPercentage.toFixed(2)}%\`;
        }
    </script>`
  },
  {
    slug: 'menu-price-calculator',
    name: 'Menu Price Calculator',
    description: 'The Menu Price Calculator is a valuable tool designed to help restaurant owners and managers determine the ideal selling price for their dishes based on the dish\'s cost and their desired gross profit percentage.',
    whoFor: 'This tool is ideal for restaurant owners, chefs, and financial planners in the food service industry who need to set prices that ensure profitability while remaining attractive to customers. It\'s especially useful for those who want to streamline their pricing strategy and maintain control over their margins.',
    whyUse: 'Pricing your dishes correctly is crucial for maintaining profitability in the restaurant business. The Menu Price Calculator helps you quickly and accurately determine the right selling price, ensuring that your menu items are both profitable and competitively priced. This tool saves time and reduces the complexity of pricing decisions, allowing you to focus on delivering great food and service.',
    howTo: '1️⃣ Input Dish Cost\nEnter the total cost to produce the dish, including ingredients, preparation, and other related expenses.\n\n2️⃣ Input Target Gross Profit %\nEnter your target gross profit percentage. This is the profit margin you wish to achieve for the dish.\n\n3️⃣ Calculate Menu Price\nClick the "Calculate Menu Price" button to determine the appropriate selling price for the dish that aligns with your profit goals.\n\n4️⃣ View the Result\nThe tool will display the calculated menu price, ensuring that the dish meets your target gross profit percentage.',
    htmlTool: `<div class="container">
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
            document.getElementById('result').textContent = \`The menu price should be: \${menuPrice.toFixed(2)}\`;
        }
    </script>`
  },
  {
    slug: 'gross-profit-calculator',
    name: 'Gross Profit Calculator',
    description: 'The Gross Profit Calculator is an essential tool for restaurant owners and managers who need to quickly determine the gross profit percentage of their dishes.',
    whoFor: 'This tool is ideal for restaurant owners, chefs, and financial planners who need to evaluate the profitability of their menu items. Whether you\'re revising your menu prices or evaluating the performance of specific dishes, the Gross Profit Calculator provides the insights you need to optimize your pricing strategy.',
    whyUse: 'Understanding your gross profit percentage is crucial for maintaining a profitable restaurant. The Gross Profit Calculator allows you to assess how well your pricing strategy aligns with your financial goals. By accurately calculating the gross profit on each dish, you can make informed decisions to maximize profitability and sustain your business.',
    howTo: '1️⃣ Input Dish Cost\nEnter the total cost incurred to produce the dish, including all ingredients and preparation expenses.\n\n2️⃣ Input Menu Price\nEnter the price at which the dish is sold to customers.\n\n3️⃣ Calculate Gross Profit Percentage\nClick the "Calculate Gross Profit Percentage" button to compute the gross profit as a percentage of the selling price.\n\n4️⃣ View the Result\nThe tool will display the gross profit percentage, giving you a clear understanding of your profitability for that dish.',
    htmlTool: `<div class="container">
        <div class="form-column">
            <label for="dishCost">Dish Cost to the Business:</label>
            <input type="number" id="dishCost" placeholder="Enter dish cost" step="0.01">
        </div>
        <div class="form-column">
            <label for="menuPrice">Menu Price to the Customer:</label>
            <input type="number" id="menuPrice" placeholder="Enter menu price" step="0.01">
        </div>
        <button onclick="calculateGrossProfit()">Calculate Gross Profit Percentage</button>
        <div class="result" id="result"></div>
    </div>

    <script>
        function calculateGrossProfit() {
            const dishCost = parseFloat(document.getElementById('dishCost').value);
            const menuPrice = parseFloat(document.getElementById('menuPrice').value);

            if (isNaN(dishCost) || isNaN(menuPrice) || menuPrice === 0) {
                alert("Please enter valid numbers for both fields.");
                return;
            }

            const grossProfitPercentage = ((menuPrice - dishCost) / menuPrice) * 100;
            document.getElementById('result').textContent = \`The gross profit percentage is: \${grossProfitPercentage.toFixed(2)}%\`;
        }
    </script>`
  },
  {
    slug: 'catering-pricing-calculator',
    name: 'Catering Pricing Calculator',
    description: 'The Catering Pricing Calculator is designed for catering businesses to accurately determine both the total cost of catering an event and the final price to charge clients to meet a desired profit margin.',
    whoFor: 'This tool is ideal for catering companies, event planners, or anyone in the food service industry responsible for pricing catering services. It helps businesses ensure they are covering all their costs and achieving their desired profit margins.',
    whyUse: 'Pricing catering services involves multiple cost factors, and this calculator simplifies the process by providing a quick and accurate way to calculate both the total cost and the appropriate charge for your services. It\'s an essential tool for maintaining profitability while offering competitive pricing.',
    howTo: '1️⃣ Input Cost per Plate\nEnter the cost of preparing and serving one plate, including food and basic preparation costs.\n\n2️⃣ Input Number of Guests\nEnter the total number of guests you will be serving.\n\n3️⃣ Input Additional Fees\nInclude any extra fees such as delivery, setup, or special equipment rentals.\n\n4️⃣ Input Desired Gross Profit %\nEnter the desired gross profit percentage you want to achieve on the overall event.\n\n5️⃣ Calculate Catering Price\nClick Calculate Catering Price to determine both the total cost and the final price you should charge the customer.',
    htmlTool: `<div class="container">
        <div class="form-column">
            <label for="costPerPlate">Cost per Plate:</label>
            <input type="number" id="costPerPlate" placeholder="Enter cost per plate" step="0.01">
        </div>
        <div class="form-column">
            <label for="numGuests">Number of Guests:</label>
            <input type="number" id="numGuests" placeholder="Enter number of guests" step="1">
        </div>
        <div class="form-column">
            <label for="additionalFees">Additional Fees (e.g., Delivery, Setup):</label>
            <input type="number" id="additionalFees" placeholder="Enter additional fees" step="0.01">
        </div>
        <div class="form-column">
            <label for="grossProfit">Desired Gross Profit %:</label>
            <input type="number" id="grossProfit" placeholder="Enter desired gross profit %" step="0.01">
        </div>
        <button onclick="calculateCateringPrice()">Calculate Catering Price</button>
        <div class="result" id="result"></div>
    </div>

    <script>
        function calculateCateringPrice() {
            const costPerPlate = parseFloat(document.getElementById('costPerPlate').value);
            const numGuests = parseInt(document.getElementById('numGuests').value);
            const additionalFees = parseFloat(document.getElementById('additionalFees').value);
            const grossProfit = parseFloat(document.getElementById('grossProfit').value);

            if (isNaN(costPerPlate) || isNaN(numGuests) || isNaN(additionalFees) || isNaN(grossProfit) || costPerPlate <= 0 || numGuests <= 0 || grossProfit < 0 || grossProfit >= 100) {
                alert("Please enter valid numbers for all fields.");
                return;
            }

            const totalCost = (costPerPlate * numGuests) + additionalFees;
            const finalPrice = totalCost / (1 - (grossProfit / 100));
            
            document.getElementById('result').innerHTML = \`
                <p>Total Cost: \${totalCost.toFixed(2)}</p>
                <p>Price to Charge the Customer: \${finalPrice.toFixed(2)}</p>
            \`;
        }
    </script>`
  },
  {
    slug: 'menu-engineering-worksheet',
    name: 'Menu Engineering Worksheet',
    description: 'The Menu Engineering Worksheet is a versatile tool designed to help restaurateurs analyse and categorize menu items based on their profitability and popularity.',
    whoFor: 'This tool is ideal for restaurant owners, chefs, and managers who want to optimise their menu offerings by understanding the financial performance of each dish. It\'s particularly useful for businesses looking to balance their menu to maximise both customer satisfaction and profitability.',
    whyUse: 'Menu engineering is a powerful strategy for maximising profitability by leveraging data on sales and costs. The Menu Engineering Calculator simplifies this process by automatically categorising your menu items, helping you to quickly identify which dishes are driving your business forward and which may need to be rethought. It\'s an essential tool for any restaurant aiming to optimise its menu for success.',
    howTo: '1️⃣ Add Menu Items\nClick Add Menu Item to enter the details for each dish. You can add as many menu items as needed.\n\n2️⃣ Input Menu Item Details\nFor each item, provide the following:\n\nMenu Item Name: Enter the name of the dish.\nUnits Sold: Enter the number of units sold during a specific period.\nDish Cost to the Business: Enter the cost to produce each unit of the dish.\nMenu Price to the Customer: Enter the price at which the dish is sold to customers.\n3️⃣ Calculate Menu Engineering\nAfter entering all items, click Calculate Menu Engineering to categorize each item based on its profitability and popularity.\n\n4️⃣ View Results\nThe tool will display the category for each menu item:\n\nStar: High profitability and high popularity.\nPlowhorse: Low profitability and high popularity.\nPuzzle: High profitability and low popularity.\nDog: Low profitability and low popularity.',
    htmlTool: `<div class="container">
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
            itemRow.innerHTML = \`
                <div class="form-column">
                    <label for="menuItem\${itemIndex}">Menu Item Name:</label>
                    <input type="text" id="menuItem\${itemIndex}" placeholder="Enter menu item name">
                </div>
                <div class="form-column">
                    <label for="unitsSold\${itemIndex}">Units Sold:</label>
                    <input type="number" id="unitsSold\${itemIndex}" placeholder="Enter units sold" step="1">
                </div>
                <div class="form-column">
                    <label for="dishCost\${itemIndex}">Dish Cost to the Business:</label>
                    <input type="number" id="dishCost\${itemIndex}" placeholder="Enter dish cost" step="0.01">
                </div>
                <div class="form-column">
                    <label for="menuPrice\${itemIndex}">Menu Price to the Customer:</label>
                    <input type="number" id="menuPrice\${itemIndex}" placeholder="Enter menu price" step="0.01">
                </div>
            \`;
            document.getElementById('itemsContainer').appendChild(itemRow);
        }

        function calculateAllItems() {
            const resultContainer = document.getElementById('result');
            resultContainer.innerHTML = '';

            for (let i = 1; i <= itemIndex; i++) {
                const menuItem = document.getElementById(\`menuItem\${i}\`).value;
                const unitsSold = parseFloat(document.getElementById(\`unitsSold\${i}\`).value);
                const dishCost = parseFloat(document.getElementById(\`dishCost\${i}\`).value);
                const menuPrice = parseFloat(document.getElementById(\`menuPrice\${i}\`).value);

                if (isNaN(unitsSold) || isNaN(dishCost) || isNaN(menuPrice) || unitsSold <= 0 || dishCost <= 0 || menuPrice <= 0 || !menuItem) {
                    alert(\`Please enter valid inputs for all fields of item \${i}.\`);
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

                resultContainer.innerHTML += \`
                    <div class="category">
                        <strong>\${menuItem}:</strong> \${category}
                    </div>
                \`;
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
    </style>`
  }
];

interface ToolPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ToolPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tool = tools.find(t => t.slug === slug);
  
  if (!tool) {
    return {};
  }

  return {
    title: `${tool.name} - Free Hospitality Calculator`,
    description: tool.description,
    other: {
      'script:ld+json': JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": tool.name,
        "description": tool.description,
        "url": `https://yourpilla.com/tools/${slug}`,
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "Any",
        "inLanguage": "en-GB"
      })
    }
  };
}

export async function generateStaticParams() {
  return tools.map((tool) => ({
    slug: tool.slug,
  }));
}

export default async function ToolPage({ params }: ToolPageProps) {
  const { slug } = await params;
  const tool = tools.find(t => t.slug === slug);

  if (!tool) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": tool.name,
    "description": tool.description,
    "url": `https://yourpilla.com/tools/${slug}`,
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Any",
    "inLanguage": "en-GB"
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <style dangerouslySetInnerHTML={{
        __html: `
          .tool-container {
            font-family: Arial, sans-serif;
            text-align: center;
            max-width: 600px;
            margin: 0 auto;
          }
          .tool-container h2 {
            font-size: 24px;
            margin-bottom: 20px;
            text-align: left;
          }
          .tool-container p, .tool-container label, .tool-container button, .tool-container li {
            font-size: 18px;
            text-align: left;
          }
          .tool-container input, .tool-container select {
            border-radius: 10px;
            border: 2px solid black;
            box-shadow: 4px 4px 0 0 black;
            padding: 5px;
            margin: 5px 0;
            height: 40px;
            font-size: 18px;
            width: 100%;
            text-align: left;
            box-sizing: border-box;
          }
          .tool-container input:focus, .tool-container select:focus {
            outline: none;
            border: 2px solid black;
          }
          .tool-container button {
            border-radius: 10px;
            border: none;
            background-color: black;
            color: white;
            padding: 5px 10px;
            margin: 5px 0;
            font-size: 18px;
            font-weight: bold;
            cursor: pointer;
            height: 40px;
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .tool-container button:focus {
            outline: none;
            box-shadow: none;
          }
          .tool-container .section {
            margin-bottom: 60px;
          }
          .tool-container .form-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
            gap: 20px;
          }
          .tool-container .form-column {
            display: flex;
            flex-direction: column;
            width: 100%;
          }
          .tool-container .form-column input, .tool-container .form-column select {
            margin-bottom: 10px;
          }
          .tool-container ul {
            list-style-type: none;
            padding: 0;
            text-align: left;
          }
          .tool-container li {
            margin-bottom: 10px;
          }
          .tool-container .result {
            margin-top: 20px;
            font-size: 18px;
          }
          .tool-container .category {
            margin-top: 10px;
            padding: 10px;
            background-color: #f4f4f4;
            border-left: 5px solid black;
          }
          .tool-container .item-row {
            margin-bottom: 20px;
            border-bottom: 1px solid #ccc;
            padding-bottom: 20px;
          }
          @media (max-width: 768px) {
            .tool-container .form-row {
              flex-direction: column;
              gap: 10px;
            }
          }
        `
      }} />
      <div className="min-h-screen" style={{backgroundColor: 'var(--background)'}}>
        {/* Main Content */}
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="bg-card border-default rounded-default shadow-sm overflow-hidden">
            {/* Breadcrumb */}
            <div className="px-8 pt-6 pb-2">
              <nav aria-label="Breadcrumb">
                <ol className="flex items-center space-x-2 text-sm">
                  <li>
                    <Link href="/" className="text-blue-600 hover:text-blue-800">
                      Home
                    </Link>
                  </li>
                  <li>
                    <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </li>
                  <li>
                    <Link href="/tools" className="text-blue-600 hover:text-blue-800">
                      Tools
                    </Link>
                  </li>
                  <li>
                    <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </li>
                  <li aria-current="page" className="text-gray-600">
                    {tool.name}
                  </li>
                </ol>
              </nav>
            </div>
            
            {/* Header */}
            <div className="bg-header-group px-8 py-12 text-center">
              <h1 className="mb-4 leading-tight">
                {tool.name}
              </h1>
              <p className="text-subtitle max-w-2xl mx-auto leading-relaxed" style={{fontSize: 'var(--text-xl)'}}>
                {tool.description}
              </p>
            </div>
            
            {/* Tool HTML Content */}
            <div className="px-8 py-12">
              <div 
                className="tool-container"
                dangerouslySetInnerHTML={{ __html: tool.htmlTool }}
              />
            </div>

            {/* How to Use Section */}
            <div className="px-8 py-12 border-t border-gray-200">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-2xl font-semibold mb-6">How to Use This Tool</h2>
                <div className="prose prose-lg max-w-none">
                  {tool.howTo.split('\n').map((line, index) => (
                    line.trim() && <p key={index} className="mb-4">{line}</p>
                  ))}
                </div>
              </div>
            </div>

            {/* Who Is This For Section */}
            <div className="px-8 py-12 border-t border-gray-200 bg-gray-50">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-2xl font-semibold mb-6">Who Is This Tool For?</h2>
                <p className="text-lg leading-relaxed text-gray-700">
                  {tool.whoFor}
                </p>
              </div>
            </div>

            {/* Why Use This Tool Section */}
            <div className="px-8 py-12 border-t border-gray-200">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-2xl font-semibold mb-6">Why Use This Tool?</h2>
                <p className="text-lg leading-relaxed text-gray-700">
                  {tool.whyUse}
                </p>
              </div>
            </div>
            
            {/* Call to Action */}
            <div className="px-8 py-12 border-t border-gray-200">
              <div className="text-center">
                <div className="bg-card border-default rounded-default p-8 max-w-2xl mx-auto">
                  <h3 className="mb-3 font-semibold" style={{fontSize: 'var(--text-xl)'}}>
                    Need More Hospitality Tools?
                  </h3>
                  <p className="text-muted mb-6">
                    Explore our collection of free calculators and tools designed specifically for hospitality professionals.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                      href="/tools"
                      className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-default hover:bg-blue-700 transition-colors"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                      View All Tools
                    </Link>
                    <Link
                      href="/blog"
                      className="inline-flex items-center px-6 py-3 bg-card text-blue-600 font-medium rounded-default border-default hover:bg-blue-50 transition-colors"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                      Read Our Blog
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Attribution */}
            <div className="px-8 py-6 border-t border-gray-200 bg-gray-50">
              <div className="text-center text-sm text-gray-600">
                <p>
                  This free tool has been written by Pilla Founder,{' '}
                  <a href="https://www.linkedin.com/in/liam-jones-2a047783/" className="text-blue-600 hover:text-blue-500">
                    Liam Jones
                  </a>
                  . You can{' '}
                  <a href="mailto:liam@yourpilla.com" className="text-blue-600 hover:text-blue-500">
                    email Liam directly
                  </a>
                  {' '}if you want to suggest an improvement.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}