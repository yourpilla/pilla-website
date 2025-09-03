export function generateSecurePassword(length: number = 12): string {
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowercase = 'abcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';
  const symbols = '!@#$%^&*';
  
  const allChars = uppercase + lowercase + numbers + symbols;
  
  let password = '';
  
  // Ensure at least one character from each category
  password += uppercase[Math.floor(Math.random() * uppercase.length)];
  password += lowercase[Math.floor(Math.random() * lowercase.length)];
  password += numbers[Math.floor(Math.random() * numbers.length)];
  password += symbols[Math.floor(Math.random() * symbols.length)];
  
  // Fill the rest randomly
  for (let i = 4; i < length; i++) {
    password += allChars[Math.floor(Math.random() * allChars.length)];
  }
  
  // Shuffle the password to avoid predictable patterns
  return password.split('').sort(() => Math.random() - 0.5).join('');
}

export function generateUserFriendlyPassword(): string {
  // Hospitality-themed password: 2-3 industry terms + numbers
  const hospitalityTerms = [
    'Bistro', 'Server', 'Chef', 'Menu', 'Wine', 'Dish', 'Sauce', 'Grill', 
    'Table', 'Check', 'Cover', 'Chit', 'Tapas', 'Bar', 'Cafe', 'Host', 
    'Guest', 'Order', 'Cook', 'Meal', 'Food', 'Drink', 'Tip', 'Bill',
    'Room', 'Suite', 'Desk', 'Lobby', 'Dine', 'Serve', 'Taste', 'Buffet',
    'Entree', 'Valet', 'Key', 'Bath'
  ];
  
  const term1 = hospitalityTerms[Math.floor(Math.random() * hospitalityTerms.length)];
  const term2 = hospitalityTerms[Math.floor(Math.random() * hospitalityTerms.length)];
  const numbers = Math.floor(Math.random() * 999) + 100; // 3-digit number for better security
  
  return `${term1}${term2}${numbers}`;
}