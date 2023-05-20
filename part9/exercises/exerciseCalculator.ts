interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number,
  ratingDescription: string;
  target: number,
  average: number;
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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
