const calculateBmi = (height: number, weight: number): string => {
  const bmi = height / (weight * weight);

  if (bmi < 18.5) return 'Underweight';
  if (bmi < 23) return 'Normal (healthy weight)';
  if (bmi < 27.5) return 'Mild to moderate overweight';
  return 'Very overweight';
}

console.log(calculateBmi(180, 74));
