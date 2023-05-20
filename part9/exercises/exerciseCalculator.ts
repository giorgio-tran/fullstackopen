interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number,
  ratingDescription: string;
  target: number,
  average: number;
}

interface ExerciseValues {
  target: number;
  arr: number[];
}

const isNumber = (arg: string): boolean => {
  return !isNaN(Number(arg));
}

const parseArguments = (args: string[]): ExerciseValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 12) throw new Error('Too many arguments');

  const temp = args.slice(3);

  if (!isNumber(args[2])) throw new Error('Target value is not a number');

  const argArr = temp.map((value: string) => {
    if (!isNumber(value)) {
      throw new Error(`${value} is not a number!`);
    }
    return Number(value);
  })

  return {
    target: Number(args[2]),
    arr: argArr
  }
}

const calculateExercises = (arr: number[], target: number): Result => {
  let offDays = 0;
  let totalHoursTrained = 0;
  let periodLength = arr.length;
  let rating = 0;

  arr.forEach((value: number) => {
    if (value === 0) {
      offDays++;
    }
    totalHoursTrained += value;
  });

  let average = totalHoursTrained/periodLength;

  if (target - average <= 2) {
    rating = 2;
  } else if (average >= target) {
    rating = 3;
  } else {
    rating = 1;
  }

  return {
    periodLength: periodLength,
    trainingDays: periodLength - offDays,
    success: average >= target,
    rating: rating,
    ratingDescription: 'Not too shabby',
    target: target,
    average: average,
  }

}

try {
  const { target, arr } = parseArguments(process.argv);
  console.log(calculateExercises(arr, target));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}

// console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
