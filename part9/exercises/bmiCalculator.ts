interface BmiValues {
  height: number;
  weight: number;
}

const parseBmiArguments = (args: string[]): BmiValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (isNaN(Number(args[2])) && isNaN(Number(args[3]))) {
    throw new Error('Invalid arguments, not numbers!');
  }
  return {
    height: Number(args[2]),
    weight: Number(args[3]),
  }
}

const calculateBmi = (height: number, weight: number): string => {
  const heightInMeters = height/100;
  const bmi = weight / (heightInMeters * heightInMeters);

  if (bmi < 18.5) return 'Underweight';
  if (bmi < 23) return 'Normal (healthy weight)';
  if (bmi < 27.5) return 'Mild to moderate overweight';
  return 'Very overweight';
}

try {
  const { height, weight } = parseBmiArguments(process.argv);
  console.log(calculateBmi(height, weight));
} catch (error: unknown) {
  let errorMessage = 'Error: ';
  if (error instanceof Error) {
    errorMessage += error.message;
  }
  console.log(errorMessage);
}
