export function calculateAge(dobString: string|Date): number {
  // Parse the date of birth string
  const dobParts: number[] = String(dobString).split('-').map(part => parseInt(part, 10));
  const [dobYear, dobMonth, dobDay] = dobParts;

  // Create Date objects for date of birth and current date
  const dob: Date = new Date(dobYear, dobMonth - 1, dobDay);
  const now: Date = new Date();

  // Calculate the age
  let age: number = now.getFullYear() - dob.getFullYear();
  const monthDiff: number = now.getMonth() - dob.getMonth();
  
  // If the current month is before the birth month or if it's the same month but the current day is before the birth day, decrement the age
  if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < dob.getDate())) {
    age--;
  }

  return age;
}