type Operation = 'multiply' | 'add' | 'divide';

const calculator = (a: number , b: number, op: Operation) => {
  switch(op) {
    case 'multiply':
      return a * b;
    case 'divide':
      if (b === 0) throw new Error('Cannot divide by 0');
      return a/b;
    case 'add':
      return a + b;
    default:
      throw new Error('Operation is not multiply, add or divide!');
  }
}

/*
 * 'unknown' need to declare what the type is
 * and in our case it's an instance of the type Error
 * this is known as type narrowing
 */
try {
  console.log(calculator(1, 5, 'divide'));
} catch (error: unknown) {
  let errorMessage = 'Something went wrong: ';
  if (error instanceof Error) {
    errorMessage += error.message;
  }
  console.log(errorMessage);
}

