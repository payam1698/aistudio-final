
import { maleTables, femaleTables } from '../data/mcmiData';
/* Fix: Correctly import ScoreReport and UserInfo from types.ts to maintain a single source of truth and resolve import errors in services/api.ts */
import { ScoreReport, UserInfo } from '../types';

const check = (answers: boolean[], index: number, value: boolean): boolean => {
  return answers[index - 1] === value;
};

export const calculateRawScores = (answers: boolean[], gender: 'male' | 'female'): Record<string, number> => {
  const scores: Record<string, number> = {};

  // Validity (Scale V)
  let v = 0;
  if (check(answers, 62, true)) v += 1;
  if (check(answers, 90, true)) v += 1;
  if (check(answers, 152, true)) v += 1;
  if (check(answers, 169, true)) v += 1;
  scores['25'] = v; 

  // Desirability (Scale Y - 1)
  let y = 0;
  if (check(answers, 4, true)) y += 1;
  if (check(answers, 14, true)) y += 1;
  if (check(answers, 34, true)) y += 1;
  if (check(answers, 39, true)) y += 1;
  if (check(answers, 60, true)) y += 1;
  if (check(answers, 61, true)) y += 1;
  if (check(answers, 75, true)) y += 1;
  if (check(answers, 78, true)) y += 1;
  if (check(answers, 86, true)) y += 1;
  if (check(answers, 88, true)) y += 1;
  if (check(answers, 89, true)) y += 1;
  if (check(answers, 93, true)) y += 1;
  if (check(answers, 103, true)) y += 1;
  if (check(answers, 106, true)) y += 1;
  if (check(answers, 122, true)) y += 1;
  if (check(answers, 125, true)) y += 1;
  if (check(answers, 126, true)) y += 1;
  if (check(answers, 137, true)) y += 1;
  if (check(answers, 138, true)) y += 1;
  if (check(answers, 149, true)) y += 1;
  if (check(answers, 153, true)) y += 1;
  if (check(answers, 159, true)) y += 1;
  if (check(answers, 166, true)) y += 1;
  
  if (gender === 'male' && y > 21) y = 21;
  if (gender === 'female' && y > 22) y = 22;
  scores['1'] = y;

  // Debasement (Scale Z - 2)
  let z = 0;
  if (check(answers, 3, true)) z += 1;
  if (check(answers, 5, true)) z += 1;
  if (check(answers, 8, true)) z += 1;
  if (check(answers, 18, true)) z += 1;
  if (check(answers, 23, true)) z += 1;
  if (check(answers, 24, true)) z += 1;
  if (check(answers, 25, true)) z += 1;
  if (check(answers, 26, true)) z += 1;
  if (check(answers, 27, true)) z += 1;
  if (check(answers, 33, true)) z += 1;
  if (check(answers, 36, true)) z += 1;
  if (check(answers, 43, true)) z += 1;
  if (check(answers, 45, true)) z += 1;
  if (check(answers, 49, true)) z += 1;
  if (check(answers, 50, true)) z += 1;
  if (check(answers, 51, true)) z += 1;
  if (check(answers, 53, true)) z += 1;
  if (check(answers, 54, true)) z += 1;
  if (check(answers, 58, true)) z += 1;
  if (check(answers, 59, true)) z += 1;
  if (check(answers, 63, true)) z += 1;
  if (check(answers, 66, true)) z += 1;
  if (check(answers, 67, true)) z += 1;
  if (check(answers, 68, true)) z += 1;
  if (check(answers, 71, true)) z += 1;
  if (check(answers, 72, true)) z += 1;
  if (check(answers, 76, true)) z += 1;
  if (check(answers, 79, true)) z += 1;
  if (check(answers, 82, true)) z += 1;
  if (check(answers, 96, true)) z += 1;
  if (check(answers, 97, true)) z += 1;
  if (check(answers, 99, true)) z += 1;
  if (check(answers, 100, true)) z += 1;
  if (check(answers, 102, true)) z += 1;
  if (check(answers, 108, true)) z += 1;
  if (check(answers, 110, true)) z += 1;
  if (check(answers, 114, true)) z += 1;
  if (check(answers, 115, true)) z += 1;
  if (check(answers, 117, true)) z += 1;
  if (check(answers, 118, true)) z += 1;
  if (check(answers, 120, true)) z += 1;
  if (check(answers, 128, true)) z += 1;
  if (check(answers, 132, true)) z += 1;
  if (check(answers, 136, true)) z += 1;
  if (check(answers, 158, true)) z += 1;
  if (check(answers, 167, true)) z += 1;

  if (gender === 'male' && z > 35) z = 35;
  if (gender === 'female' && z > 34) z = 34;
  scores['2'] = z;

  // Scale 1 (Schizoid - 3)
  let s1 = 0;
  if (check(answers, 2, true)) s1 += 3;
  if (check(answers, 10, true)) s1 += 2;
  if (check(answers, 13, true)) s1 += 3;
  if (check(answers, 14, false)) s1 += 1;
  if (check(answers, 16, true)) s1 += 1;
  if (check(answers, 19, true)) s1 += 3;
  if (check(answers, 20, false)) s1 += 2;
  if (check(answers, 22, true)) s1 += 1;
  if (check(answers, 25, true)) s1 += 1;
  if (check(answers, 28, false)) s1 += 1;
  if (check(answers, 33, true)) s1 += 2;
  if (check(answers, 34, true)) s1 += 3;
  if (check(answers, 46, true)) s1 += 1;
  if (check(answers, 47, true)) s1 += 2;
  if (check(answers, 48, false)) s1 += 2;
  if (check(answers, 53, true)) s1 += 1;
  if (check(answers, 60, false)) s1 += 1;
  if (check(answers, 78, false)) s1 += 1;
  if (check(answers, 81, true)) s1 += 3;
  if (check(answers, 83, true)) s1 += 2;
  if (check(answers, 85, true)) s1 += 1;
  if (check(answers, 95, false)) s1 += 1;
  if (check(answers, 103, false)) s1 += 1;
  if (check(answers, 106, true)) s1 += 2;
  if (check(answers, 108, true)) s1 += 1;
  if (check(answers, 111, false)) s1 += 1;
  if (check(answers, 124, true)) s1 += 2;
  if (check(answers, 125, false)) s1 += 1;
  if (check(answers, 159, true)) s1 += 1;
  if (check(answers, 160, true)) s1 += 1;
  if (check(answers, 161, true)) s1 += 3;
  if (check(answers, 141, true)) s1 += 1;
  if (check(answers, 142, true)) s1 += 1;
  if (check(answers, 143, true)) s1 += 3;
  if (check(answers, 150, true)) s1 += 2;

  if (gender === 'male' && s1 > 44) s1 = 44;
  if (gender === 'female' && s1 > 40) s1 = 40;
  scores['3'] = s1;

  // Scale 2 (Avoidant - 4)
  let s2 = 0;
  if (check(answers, 2, true)) s2 += 1;
  if (check(answers, 3, true)) s2 += 3;
  if (check(answers, 8, true)) s2 += 3;
  if (check(answers, 14, false)) s2 += 1;
  if (check(answers, 19, true)) s2 += 2;
  if (check(answers, 21, false)) s2 += 1;
  if (check(answers, 23, true)) s2 += 2;
  if (check(answers, 25, true)) s2 += 2;
  if (check(answers, 27, true)) s2 += 2;
  if (check(answers, 28, false)) s2 += 1;
  if (check(answers, 32, true)) s2 += 2;
  if (check(answers, 34, true)) s2 += 1;
  if (check(answers, 45, true)) s2 += 1;
  if (check(answers, 47, true)) s2 += 2;
  if (check(answers, 49, true)) s2 += 3;
  if (check(answers, 56, true)) s2 += 2;
  if (check(answers, 57, true)) s2 += 2;
  if (check(answers, 63, true)) s2 += 3;
  if (check(answers, 77, true)) s2 += 3;
  if (check(answers, 81, true)) s2 += 1;
  if (check(answers, 83, true)) s2 += 2;
  if (check(answers, 85, true)) s2 += 1;
  if (check(answers, 102, true)) s2 += 2;
  if (check(answers, 106, true)) s2 += 1;
  if (check(answers, 109, true)) s2 += 1;
  if (check(answers, 110, true)) s2 += 2;
  if (check(answers, 113, true)) s2 += 1;
  if (check(answers, 115, true)) s2 += 2;
  if (check(answers, 118, true)) s2 += 2;
  if (check(answers, 120, true)) s2 += 3;
  if (check(answers, 125, false)) s2 += 1;
  if (check(answers, 133, true)) s2 += 1;
  if (check(answers, 139, true)) s2 += 1;
  if (check(answers, 141, true)) s2 += 3;
  if (check(answers, 147, true)) s2 += 1;
  if (check(answers, 150, true)) s2 += 2;
  if (check(answers, 155, true)) s2 += 2;
  if (check(answers, 158, true)) s2 += 3;
  if (check(answers, 160, true)) s2 += 1;
  if (check(answers, 163, false)) s2 += 1;
  if (check(answers, 171, true)) s2 += 2;

  if (gender === 'male' && s2 > 51) s2 = 51;
  if (gender === 'female' && s2 > 46) s2 = 46;
  scores['4'] = s2;

  // Scale 3 (Dependent - 5)
  let s3 = 0;
  if (check(answers, 4, false)) s3 += 2;
  if (check(answers, 7, false)) s3 += 1;
  if (check(answers, 10, true)) s3 += 3;
  if (check(answers, 12, false)) s3 += 1;
  if (check(answers, 21, false)) s3 += 1;
  if (check(answers, 28, false)) s3 += 1;
  if (check(answers, 31, true)) s3 += 3;
  if (check(answers, 34, true)) s3 += 2;
  if (check(answers, 40, false)) s3 += 1;
  if (check(answers, 41, false)) s3 += 1;
  if (check(answers, 42, true)) s3 += 3;
  if (check(answers, 43, false)) s3 += 1;
  if (check(answers, 49, true)) s3 += 1;
  if (check(answers, 54, true)) s3 += 1;
  if (check(answers, 57, true)) s3 += 2;
  if (check(answers, 60, true)) s3 += 2;
  if (check(answers, 74, false)) s3 += 1;
  if (check(answers, 75, true)) s3 += 1;
  if (check(answers, 77, true)) s3 += 2;
  if (check(answers, 78, true)) s3 += 3;
  if (check(answers, 81, true)) s3 += 2;
  if (check(answers, 91, false)) s3 += 1;
  if (check(answers, 92, false)) s3 += 1;
  if (check(answers, 101, false)) s3 += 1;
  if (check(answers, 106, true)) s3 += 3;
  if (check(answers, 110, true)) s3 += 1;
  if (check(answers, 125, true)) s3 += 1;
  if (check(answers, 133, true)) s3 += 3;
  if (check(answers, 145, true)) s3 += 3;
  if (check(answers, 147, false)) s3 += 1;
  if (check(answers, 149, true)) s3 += 1;
  if (check(answers, 159, true)) s3 += 3;
  if (check(answers, 162, false)) s3 += 1;
  if (check(answers, 163, false)) s3 += 1;
  if (check(answers, 168, true)) s3 += 1;
  if (check(answers, 173, true)) s3 += 3;

  if (gender === 'male' && s3 > 53) s3 = 53;
  if (gender === 'female' && s3 > 51) s3 = 51;
  scores['5'] = s3;

  // Scale 4 (Histrionic - 6)
  let s4 = 0;
  if (check(answers, 3, false)) s4 += 1;
  if (check(answers, 7, true)) s4 += 1;
  if (check(answers, 9, true)) s4 += 2;
  if (check(answers, 14, true)) s4 += 3;
  if (check(answers, 19, false)) s4 += 1;
  if (check(answers, 20, true)) s4 += 3;
  if (check(answers, 28, true)) s4 += 3;
  if (check(answers, 37, true)) s4 += 1;
  if (check(answers, 39, false)) s4 += 1;
  if (check(answers, 40, true)) s4 += 1;
  if (check(answers, 41, true)) s4 += 1;
  if (check(answers, 42, true)) s4 += 2;
  if (check(answers, 43, true)) s4 += 2;
  if (check(answers, 48, true)) s4 += 3;
  if (check(answers, 51, false)) s4 += 1;
  if (check(answers, 56, true)) s4 += 1;
  if (check(answers, 60, true)) s4 += 3;
  if (check(answers, 61, false)) s4 += 2;
  if (check(answers, 66, true)) s4 += 2;
  if (check(answers, 77, false)) s4 += 1;
  if (check(answers, 86, true)) s4 += 3;
  if (check(answers, 89, true)) s4 += 1;
  if (check(answers, 91, true)) s4 += 1;
  if (check(answers, 95, true)) s4 += 1;
  if (check(answers, 103, true)) s4 += 2;
  if (check(answers, 111, true)) s4 += 3;
  if (check(answers, 125, true)) s4 += 3;
  if (check(answers, 126, false)) s4 += 1;
  if (check(answers, 128, true)) s4 += 1;
  if (check(answers, 130, true)) s4 += 1;
  if (check(answers, 133, true)) s4 += 2;
  if (check(answers, 137, true)) s4 += 3;
  if (check(answers, 142, true)) s4 += 1;
  if (check(answers, 158, false)) s4 += 2;
  if (check(answers, 162, true)) s4 += 1;
  if (check(answers, 166, true)) s4 += 2;
  if (check(answers, 170, true)) s4 += 3;
  if (check(answers, 171, true)) s4 += 1;
  if (check(answers, 172, true)) s4 += 1;
  if (check(answers, 173, true)) s4 += 1;

  if (gender === 'male' && s4 > 52) s4 = 52;
  if (gender === 'female' && s4 > 58) s4 = 58;
  scores['6'] = s4;

  // Scale 5 (Narcissistic - 7)
  let s5 = 0;
  if (check(answers, 1, true)) s5 += 3;
  if (check(answers, 2, true)) s5 += 1;
  if (check(answers, 4, true)) s5 += 2;
  if (check(answers, 6, true)) s5 += 3;
  if (check(answers, 8, false)) s5 += 1;
  if (check(answers, 12, true)) s5 += 1;
  if (check(answers, 14, true)) s5 += 2;
  if (check(answers, 15, true)) s5 += 3;
  if (check(answers, 16, true)) s5 += 2;
  if (check(answers, 22, true)) s5 += 1;
  if (check(answers, 28, true)) s5 += 1;
  if (check(answers, 31, false)) s5 += 1;
  if (check(answers, 32, true)) s5 += 1;
  if (check(answers, 37, true)) s5 += 3;
  if (check(answers, 41, true)) s5 += 2;
  if (check(answers, 42, false)) s5 += 2;
  if (check(answers, 43, true)) s5 += 1;
  if (check(answers, 45, false)) s5 += 1;
  if (check(answers, 51, false)) s5 += 1;
  if (check(answers, 55, true)) s5 += 1;
  if (check(answers, 60, true)) s5 += 1;
  if (check(answers, 78, false)) s5 += 1;
  if (check(answers, 80, true)) s5 += 1;
  if (check(answers, 85, true)) s5 += 1;
  if (check(answers, 86, true)) s5 += 2;
  if (check(answers, 89, true)) s5 += 3;
  if (check(answers, 91, true)) s5 += 3;
  if (check(answers, 103, true)) s5 += 2;
  if (check(answers, 106, false)) s5 += 1;
  if (check(answers, 111, true)) s5 += 2;
  if (check(answers, 125, true)) s5 += 2;
  if (check(answers, 126, true)) s5 += 1;
  if (check(answers, 129, true)) s5 += 3;
  if (check(answers, 130, true)) s5 += 1;
  if (check(answers, 131, true)) s5 += 3;
  if (check(answers, 134, true)) s5 += 1;
  if (check(answers, 135, true)) s5 += 1;
  if (check(answers, 137, true)) s5 += 2;
  if (check(answers, 142, true)) s5 += 3;
  if (check(answers, 143, true)) s5 += 1;
  if (check(answers, 146, true)) s5 += 1;
  if (check(answers, 149, false)) s5 += 2;
  if (check(answers, 158, false)) s5 += 2;
  if (check(answers, 163, true)) s5 += 1;
  if (check(answers, 165, true)) s5 += 2;
  if (check(answers, 166, true)) s5 += 3;
  if (check(answers, 170, true)) s5 += 2;
  if (check(answers, 171, true)) s5 += 2;
  if (check(answers, 172, true)) s5 += 2;

  if (gender === 'male' && s5 > 57) s5 = 57;
  if (gender === 'female' && s5 > 67) s5 = 67;
  scores['7'] = s5;

  // Scale 6A (Antisocial - 8)
  let s6a = 0;
  if (check(answers, 1, true)) s6a += 2;
  if (check(answers, 7, true)) s6a += 3;
  if (check(answers, 12, true)) s6a += 2;
  if (check(answers, 15, true)) s6a += 1;
  if (check(answers, 20, true)) s6a += 2;
  if (check(answers, 22, true)) s6a += 2;
  if (check(answers, 32, true)) s6a += 2;
  if (check(answers, 34, false)) s6a += 1;
  if (check(answers, 38, true)) s6a += 2;
  if (check(answers, 40, true)) s6a += 3;
  if (check(answers, 42, false)) s6a += 2;
  if (check(answers, 43, true)) s6a += 2;
  if (check(answers, 44, true)) s6a += 1;
  if (check(answers, 48, true)) s6a += 1;
  if (check(answers, 55, true)) s6a += 2;
  if (check(answers, 64, true)) s6a += 1;
  if (check(answers, 73, true)) s6a += 2;
  if (check(answers, 74, true)) s6a += 2;
  if (check(answers, 77, false)) s6a += 1;
  if (check(answers, 78, false)) s6a += 2;
  if (check(answers, 80, true)) s6a += 2;
  if (check(answers, 81, false)) s6a += 2;
  if (check(answers, 85, true)) s6a += 1;
  if (check(answers, 86, true)) s6a += 2;
  if (check(answers, 87, true)) s6a += 2;
  if (check(answers, 91, true)) s6a += 2;
  if (check(answers, 92, true)) s6a += 3;
  if (check(answers, 94, true)) s6a += 3;
  if (check(answers, 101, true)) s6a += 1;
  if (check(answers, 103, true)) s6a += 3;
  if (check(answers, 104, true)) s6a += 1;
  if (check(answers, 111, true)) s6a += 1;
  if (check(answers, 113, true)) s6a += 1;
  if (check(answers, 116, true)) s6a += 3;
  if (check(answers, 129, true)) s6a += 2;
  if (check(answers, 130, true)) s6a += 3;
  if (check(answers, 140, true)) s6a += 1;
  if (check(answers, 142, true)) s6a += 2;
  if (check(answers, 144, true)) s6a += 2;
  if (check(answers, 147, true)) s6a += 3;
  if (check(answers, 157, true)) s6a += 1;
  if (check(answers, 162, true)) s6a += 3;
  if (check(answers, 165, true)) s6a += 2;
  if (check(answers, 171, true)) s6a += 1;
  if (check(answers, 172, true)) s6a += 3;

  if (gender === 'male' && s6a > 56) s6a = 56;
  if (gender === 'female' && s6a > 54) s6a = 54;
  scores['8'] = s6a;

  // Scale 6B (Aggressive/Sadistic - 9)
  let s6b = 0;
  if (check(answers, 1, true)) s6b += 2;
  if (check(answers, 4, true)) s6b += 3;
  if (check(answers, 7, true)) s6b += 1;
  if (check(answers, 9, true)) s6b += 3;
  if (check(answers, 12, true)) s6b += 3;
  if (check(answers, 21, true)) s6b += 2;
  if (check(answers, 30, true)) s6b += 3;
  if (check(answers, 31, false)) s6b += 1;
  if (check(answers, 32, true)) s6b += 1;
  if (check(answers, 38, true)) s6b += 1;
  if (check(answers, 40, true)) s6b += 1;
  if (check(answers, 41, true)) s6b += 3;
  if (check(answers, 42, false)) s6b += 2;
  if (check(answers, 43, true)) s6b += 1;
  if (check(answers, 44, true)) s6b += 3;
  if (check(answers, 58, true)) s6b += 1;
  if (check(answers, 64, true)) s6b += 2;
  if (check(answers, 66, true)) s6b += 1;
  if (check(answers, 71, false)) s6b += 1;
  if (check(answers, 74, true)) s6b += 2;
  if (check(answers, 77, false)) s6b += 2;
  if (check(answers, 78, false)) s6b += 2;
  if (check(answers, 80, true)) s6b += 1;
  if (check(answers, 82, true)) s6b += 2;
  if (check(answers, 84, true)) s6b += 2;
  if (check(answers, 86, true)) s6b += 1;
  if (check(answers, 91, true)) s6b += 2;
  if (check(answers, 95, true)) s6b += 1;
  if (check(answers, 101, true)) s6b += 3;
  if (check(answers, 106, false)) s6b += 1;
  if (check(answers, 107, true)) s6b += 2;
  if (check(answers, 115, true)) s6b += 2;
  if (check(answers, 121, true)) s6b += 2;
  if (check(answers, 129, true)) s6b += 2;
  if (check(answers, 134, true)) s6b += 3;
  if (check(answers, 135, true)) s6b += 1;
  if (check(answers, 142, true)) s6b += 1;
  if (check(answers, 145, false)) s6b += 1;
  if (check(answers, 146, true)) s6b += 1;
  if (check(answers, 147, true)) s6b += 1;
  if (check(answers, 148, true)) s6b += 3;
  if (check(answers, 155, true)) s6b += 2;
  if (check(answers, 163, true)) s6b += 3;
  if (check(answers, 165, true)) s6b += 1;
  if (check(answers, 166, true)) s6b += 2;

  if (gender === 'male' && s6b > 62) s6b = 62;
  if (gender === 'female' && s6b > 53) s6b = 53;
  scores['9'] = s6b;

  // Scale 7 (Compulsive - 10)
  let s7 = 0;
  if (check(answers, 4, true)) s7 += 1;
  if (check(answers, 7, false)) s7 += 1;
  if (check(answers, 20, false)) s7 += 2;
  if (check(answers, 21, true)) s7 += 3;
  if (check(answers, 32, true)) s7 += 1;
  if (check(answers, 39, true)) s7 += 3;
  if (check(answers, 40, false)) s7 += 1;
  if (check(answers, 43, false)) s7 += 1;
  if (check(answers, 46, true)) s7 += 3;
  if (check(answers, 48, false)) s7 += 2;
  if (check(answers, 50, false)) s7 += 1;
  if (check(answers, 60, false)) s7 += 1;
  if (check(answers, 61, true)) s7 += 3;
  if (check(answers, 64, true)) s7 += 2;
  if (check(answers, 66, false)) s7 += 1;
  if (check(answers, 74, true)) s7 += 1;
  if (check(answers, 75, true)) s7 += 3;
  if (check(answers, 77, false)) s7 += 1;
  if (check(answers, 78, true)) s7 += 1;
  if (check(answers, 81, true)) s7 += 1;
  if (check(answers, 86, false)) s7 += 2;
  if (check(answers, 88, true)) s7 += 3;
  if (check(answers, 92, false)) s7 += 1;
  if (check(answers, 95, false)) s7 += 1;
  if (check(answers, 103, false)) s7 += 1;
  if (check(answers, 111, false)) s7 += 1;
  if (check(answers, 126, true)) s7 += 3;
  if (check(answers, 128, false)) s7 += 1;
  if (check(answers, 134, true)) s7 += 2;
  if (check(answers, 138, true)) s7 += 3;
  if (check(answers, 145, false)) s7 += 2;
  if (check(answers, 148, true)) s7 += 2;
  if (check(answers, 149, true)) s7 += 3;
  if (check(answers, 153, true)) s7 += 3;
  if (check(answers, 155, false)) s7 += 1;
  if (check(answers, 159, true)) s7 += 2;
  if (check(answers, 161, true)) s7 += 2;
  if (check(answers, 163, true)) s7 += 2;

  if (gender === 'male' && s7 > 60) s7 = 60;
  if (gender === 'female' && s7 > 61) s7 = 61;
  scores['10'] = s7;

  // Scale 8A (Passive-Aggressive - 11)
  let s8a = 0;
  if (check(answers, 1, true)) s8a += 1;
  if (check(answers, 4, true)) s8a += 1;
  if (check(answers, 9, true)) s8a += 2;
  if (check(answers, 12, true)) s8a += 1;
  if (check(answers, 16, true)) s8a += 2;
  if (check(answers, 21, true)) s8a += 1;
  if (check(answers, 22, true)) s8a += 3;
  if (check(answers, 23, true)) s8a += 1;
  if (check(answers, 25, true)) s8a += 1;
  if (check(answers, 28, true)) s8a += 2;
  if (check(answers, 43, true)) s8a += 2;
  if (check(answers, 50, true)) s8a += 3;
  if (check(answers, 51, true)) s8a += 1;
  if (check(answers, 55, true)) s8a += 3;
  if (check(answers, 58, true)) s8a += 1;
  if (check(answers, 61, false)) s8a += 1;
  if (check(answers, 64, true)) s8a += 2;
  if (check(answers, 66, true)) s8a += 3;
  if (check(answers, 73, true)) s8a += 2;
  if (check(answers, 74, true)) s8a += 2;
  if (check(answers, 77, true)) s8a += 2;
  if (check(answers, 82, true)) s8a += 2;
  if (check(answers, 86, true)) s8a += 2;
  if (check(answers, 95, true)) s8a += 3;
  if (check(answers, 101, true)) s8a += 2;
  if (check(answers, 104, true)) s8a += 3;
  if (check(answers, 107, true)) s8a += 3;
  if (check(answers, 110, true)) s8a += 1;
  if (check(answers, 115, true)) s8a += 2;
  if (check(answers, 120, true)) s8a += 1;
  if (check(answers, 123, true)) s8a += 2;
  if (check(answers, 128, true)) s8a += 2;
  if (check(answers, 129, true)) s8a += 1;
  if (check(answers, 135, true)) s8a += 3;
  if (check(answers, 139, true)) s8a += 1;
  if (check(answers, 149, false)) s8a += 2;
  if (check(answers, 155, true)) s8a += 2;
  if (check(answers, 156, true)) s8a += 3;
  if (check(answers, 159, false)) s8a += 2;
  if (check(answers, 165, true)) s8a += 3;
  if (check(answers, 171, true)) s8a += 1;

  if (gender === 'male' && s8a > 53) s8a = 53;
  if (gender === 'female' && s8a > 55) s8a = 55;
  scores['11'] = s8a;

  // Scale 8B (Self-defeating - 12)
  let s8b = 0;
  if (check(answers, 8, true)) s8b += 1;
  if (check(answers, 10, true)) s8b += 2;
  if (check(answers, 16, true)) s8b += 1;
  if (check(answers, 18, true)) s8b += 3;
  if (check(answers, 23, true)) s8b += 1;
  if (check(answers, 25, true)) s8b += 1;
  if (check(answers, 28, true)) s8b += 2;
  if (check(answers, 31, true)) s8b += 1;
  if (check(answers, 42, true)) s8b += 2;
  if (check(answers, 45, true)) s8b += 2;
  if (check(answers, 51, true)) s8b += 2;
  if (check(answers, 54, true)) s8b += 2;
  if (check(answers, 56, true)) s8b += 2;
  if (check(answers, 57, true)) s8b += 3;
  if (check(answers, 63, true)) s8b += 1;
  if (check(answers, 65, true)) s8b += 3;
  if (check(answers, 71, true)) s8b += 1;
  if (check(answers, 73, true)) s8b += 1;
  if (check(answers, 74, false)) s8b += 1;
  if (check(answers, 77, true)) s8b += 2;
  if (check(answers, 81, true)) s8b += 1;
  if (check(answers, 82, true)) s8b += 1;
  if (check(answers, 99, true)) s8b += 1;
  if (check(answers, 106, true)) s8b += 2;
  if (check(answers, 110, true)) s8b += 3;
  if (check(answers, 115, true)) s8b += 2;
  if (check(answers, 120, true)) s8b += 2;
  if (check(answers, 121, true)) s8b += 3;
  if (check(answers, 128, true)) s8b += 1;
  if (check(answers, 132, true)) s8b += 2;
  if (check(answers, 133, true)) s8b += 1;
  if (check(answers, 139, true)) s8b += 3;
  if (check(answers, 141, true)) s8b += 1;
  if (check(answers, 145, true)) s8b += 2;
  if (check(answers, 154, true)) s8b += 3;
  if (check(answers, 155, true)) s8b += 2;
  if (check(answers, 167, true)) s8b += 1;
  if (check(answers, 168, true)) s8b += 3;
  if (check(answers, 171, true)) s8b += 1;
  if (check(answers, 173, true)) s8b += 1;

  if (gender === 'male' && s8b > 48) s8b = 48;
  if (gender === 'female' && s8b > 43) s8b = 43;
  scores['12'] = s8b;

  // Scale S (Schizotypal - 13)
  let ss = 0;
  if (check(answers, 2, true)) ss += 2;
  if (check(answers, 3, true)) ss += 2;
  if (check(answers, 8, true)) ss += 2;
  if (check(answers, 10, true)) ss += 1;
  if (check(answers, 13, true)) ss += 1;
  if (check(answers, 14, false)) ss += 1;
  if (check(answers, 19, true)) ss += 1;
  if (check(answers, 23, true)) ss += 1;
  if (check(answers, 24, true)) ss += 3;
  if (check(answers, 25, true)) ss += 1;
  if (check(answers, 31, true)) ss += 2;
  if (check(answers, 38, true)) ss += 2;
  if (check(answers, 47, true)) ss += 3;
  if (check(answers, 48, false)) ss += 1;
  if (check(answers, 49, true)) ss += 2;
  if (check(answers, 53, true)) ss += 1;
  if (check(answers, 60, false)) ss += 1;
  if (check(answers, 63, true)) ss += 2;
  if (check(answers, 69, true)) ss += 3;
  if (check(answers, 77, true)) ss += 2;
  if (check(answers, 83, true)) ss += 3;
  if (check(answers, 85, true)) ss += 2;
  if (check(answers, 100, true)) ss += 2;
  if (check(answers, 102, true)) ss += 3;
  if (check(answers, 108, true)) ss += 1;
  if (check(answers, 112, true)) ss += 3;
  if (check(answers, 113, true)) ss += 2;
  if (check(answers, 118, true)) ss += 3;
  if (check(answers, 120, true)) ss += 2;
  if (check(answers, 123, true)) ss += 2;
  if (check(answers, 124, true)) ss += 2;
  if (check(answers, 130, true)) ss += 1;
  if (check(answers, 133, true)) ss += 2;
  if (check(answers, 136, true)) ss += 1;
  if (check(answers, 141, true)) ss += 2;
  if (check(answers, 147, true)) ss += 1;
  if (check(answers, 150, true)) ss += 3;
  if (check(answers, 158, true)) ss += 2;
  if (check(answers, 160, true)) ss += 1;
  if (check(answers, 161, true)) ss += 1;
  if (check(answers, 162, true)) ss += 1;
  if (check(answers, 164, true)) ss += 2;
  if (check(answers, 165, true)) ss += 1;
  if (check(answers, 166, false)) ss += 2;

  if (ss > 48) ss = 48;
  scores['13'] = ss;

  // Scale C (Borderline - 14)
  let sc = 0;
  if (check(answers, 5, true)) sc += 2;
  if (check(answers, 7, true)) sc += 1;
  if (check(answers, 22, true)) sc += 2;
  if (check(answers, 23, true)) sc += 2;
  if (check(answers, 25, true)) sc += 3;
  if (check(answers, 26, true)) sc += 2;
  if (check(answers, 27, true)) sc += 2;
  if (check(answers, 35, true)) sc += 2;
  if (check(answers, 36, true)) sc += 1;
  if (check(answers, 40, true)) sc += 1;
  if (check(answers, 43, true)) sc += 3;
  if (check(answers, 44, true)) sc += 1;
  if (check(answers, 50, true)) sc += 2;
  if (check(answers, 51, true)) sc += 1;
  if (check(answers, 53, true)) sc += 1;
  if (check(answers, 54, true)) sc += 1;
  if (check(answers, 56, true)) sc += 3;
  if (check(answers, 57, true)) sc += 1;
  if (check(answers, 58, true)) sc += 3;
  if (check(answers, 59, true)) sc += 2;
  if (check(answers, 65, true)) sc += 1;
  if (check(answers, 66, true)) sc += 2;
  if (check(answers, 67, true)) sc += 1;
  if (check(answers, 72, true)) sc += 1;
  if (check(answers, 73, true)) sc += 3;
  if (check(answers, 74, true)) sc += 1;
  if (check(answers, 77, true)) sc += 1;
  if (check(answers, 78, true)) sc += 1;
  if (check(answers, 79, true)) sc += 2;
  if (check(answers, 82, true)) sc += 3;
  if (gender === 'male' && sc > 65) sc = 65;
  if (gender === 'female' && sc > 64) sc = 64;
  scores['14'] = sc;

  // Scale P (Paranoid - 15)
  let sp = 0;
  if (check(answers, 6, true)) sp += 1;
  if (check(answers, 12, true)) sp += 1;
  if (check(answers, 15, true)) sp += 2;
  if (check(answers, 16, true)) sp += 3;
  if (check(answers, 21, true)) sp += 1;
  if (check(answers, 22, true)) sp += 1;
  if (check(answers, 24, true)) sp += 2;
  if (check(answers, 30, true)) sp += 1;
  if (check(answers, 32, true)) sp += 3;
  if (check(answers, 37, true)) sp += 2;
  if (check(answers, 38, true)) sp += 3;
  if (check(answers, 39, true)) sp += 1;
  if (check(answers, 41, true)) sp += 1;
  if (check(answers, 43, true)) sp += 1;
  if (check(answers, 44, true)) sp += 1;
  if (check(answers, 46, true)) sp += 2;
  if (check(answers, 55, true)) sp += 1;
  if (check(answers, 61, true)) sp += 1;
  if (check(answers, 63, true)) sp += 1;
  if (check(answers, 64, true)) sp += 3;
  if (check(answers, 68, true)) sp += 1;
  if (check(answers, 74, true)) sp += 3;
  if (check(answers, 75, true)) sp += 1;
  if (check(answers, 80, true)) sp += 2;
  if (check(answers, 84, true)) sp += 3;
  if (check(answers, 84, true)) sp += 3;
  if (check(answers, 85, true)) sp += 3;
  if (check(answers, 89, true)) sp += 2;
  if (check(answers, 98, true)) sp += 1;
  if (check(answers, 100, true)) sp += 2;
  if (check(answers, 103, true)) sp += 2;
  if (check(answers, 123, true)) sp += 2;
  if (check(answers, 126, true)) sp += 2;
  if (check(answers, 127, true)) sp += 1;
  if (check(answers, 129, true)) sp += 2;
  if (check(answers, 131, true)) sp += 2;
  if (check(answers, 135, true)) sp += 1;
  if (check(answers, 138, true)) sp += 1;
  if (check(answers, 143, true)) sp += 1;
  if (check(answers, 146, true)) sp += 3;
  if (check(answers, 163, true)) sp += 1;
  if (check(answers, 164, true)) sp += 3;
  if (check(answers, 165, true)) sp += 1;
  if (check(answers, 171, true)) sp += 1;
  if (check(answers, 172, true)) sp += 1;

  if (gender === 'male' && sp > 59) sp = 59;
  if (gender === 'female' && sp > 62) sp = 62;
  scores['15'] = sp;

  // Scale A (Anxiety - 16)
  let sa = 0;
  if (check(answers, 8, true)) sa += 1;
  if (check(answers, 16, true)) sa += 1;
  if (check(answers, 18, true)) sa += 3;
  if (check(answers, 26, true)) sa += 1;
  if (check(answers, 29, true)) sa += 2;
  if (check(answers, 33, true)) sa += 2;
  if (check(answers, 36, true)) sa += 1;
  if (check(answers, 51, true)) sa += 3;
  if (check(answers, 53, true)) sa += 2;
  if (check(answers, 54, true)) sa += 1;
  if (check(answers, 67, true)) sa += 3;
  if (check(answers, 71, true)) sa += 2;
  if (check(answers, 78, true)) sa += 1;
  if (check(answers, 96, true)) sa += 2;
  if (check(answers, 97, true)) sa += 3;
  if (check(answers, 99, true)) sa += 1;
  if (check(answers, 108, true)) sa += 1;
  if (check(answers, 109, true)) sa += 2;
  if (check(answers, 114, true)) sa += 3;
  if (check(answers, 117, true)) sa += 3;
  if (check(answers, 132, true)) sa += 1;
  if (check(answers, 145, true)) sa += 1;
  if (check(answers, 153, true)) sa += 1;
  if (check(answers, 166, false)) sa += 1;
  if (check(answers, 167, true)) sa += 2;

  if (gender === 'male' && sa > 39) sa = 39;
  if (gender === 'female' && sa > 36) sa = 36;
  scores['16'] = sa;

  // Scale H (Somatoform - 17)
  let sh = 0;
  if (check(answers, 5, true)) sh += 1;
  if (check(answers, 18, true)) sh += 2;
  if (check(answers, 26, true)) sh += 1;
  if (check(answers, 29, true)) sh += 3;
  if (check(answers, 31, true)) sh += 1;
  if (check(answers, 33, true)) sh += 3;
  if (check(answers, 36, true)) sh += 1;
  if (check(answers, 41, false)) sh += 1;
  if (check(answers, 42, true)) sh += 1;
  if (check(answers, 50, true)) sh += 1;
  if (check(answers, 51, true)) sh += 2;
  if (check(answers, 53, true)) sh += 2;
  if (check(answers, 56, true)) sh += 1;
  if (check(answers, 60, true)) sh += 1;
  if (check(answers, 66, true)) sh += 1;
  if (check(answers, 67, true)) sh += 2;
  if (check(answers, 68, true)) sh += 3;
  if (check(answers, 71, true)) sh += 3;
  if (check(answers, 72, true)) sh += 3;
  if (check(answers, 78, true)) sh += 1;
  if (check(answers, 96, true)) sh += 3;
  if (check(answers, 98, true)) sh += 2;
  if (check(answers, 102, true)) sh += 1;
  if (check(answers, 109, true)) sh += 1;
  if (check(answers, 114, true)) sh += 2;
  if (check(answers, 117, true)) sh += 1;
  if (check(answers, 118, true)) sh += 1;
  if (check(answers, 137, true)) sh += 1;
  if (check(answers, 145, true)) sh += 1;
  if (check(answers, 170, true)) sh += 1;
  if (check(answers, 173, true)) sh += 1;

  if (gender === 'male' && sh > 44) sh = 44;
  if (gender === 'female' && sh > 43) sh = 43;
  scores['17'] = sh;

  // Scale N (Bipolar: Manic - 18)
  let sn = 0;
  if (check(answers, 11, true)) sn += 3;
  if (check(answers, 14, true)) sn += 2;
  if (check(answers, 17, true)) sn += 1;
  if (check(answers, 19, false)) sn += 1;
  if (check(answers, 20, true)) sn += 2;
  if (check(answers, 28, true)) sn += 2;
  if (check(answers, 37, true)) sn += 1;
  if (check(answers, 40, true)) sn += 1;
  if (check(answers, 42, false)) sn += 1;
  if (check(answers, 50, true)) sn += 2;
  if (check(answers, 58, true)) sn += 1;
  if (check(answers, 60, true)) sn += 2;
  if (check(answers, 66, true)) sn += 1;
  if (check(answers, 67, true)) sn += 1;
  if (check(answers, 73, true)) sn += 1;
  if (check(answers, 86, true)) sn += 2;
  if (check(answers, 89, true)) sn += 1;
  if (check(answers, 93, true)) sn += 3;
  if (check(answers, 95, true)) sn += 1;
  if (check(answers, 98, true)) sn += 1;
  if (check(answers, 101, true)) sn += 1;
  if (check(answers, 103, true)) sn += 2;
  if (check(answers, 111, true)) sn += 1;
  if (check(answers, 121, true)) sn += 1;
  if (check(answers, 125, true)) sn += 2;
  if (check(answers, 127, true)) sn += 1;
  if (check(answers, 128, true)) sn += 2;
  if (check(answers, 131, true)) sn += 1;
  if (check(answers, 134, true)) sn += 2;
  if (check(answers, 137, true)) sn += 2;
  if (check(answers, 151, true)) sn += 3;
  if (check(answers, 158, false)) sn += 1;
  if (check(answers, 161, false)) sn += 1;
  if (check(answers, 166, true)) sn += 1;
  if (check(answers, 170, true)) sn += 2;
  if (check(answers, 172, true)) sn += 1;
  if (check(answers, 174, true)) sn += 3;

  if (gender === 'male' && sn > 45) sn = 45;
  if (gender === 'female' && sn > 44) sn = 44;
  scores['18'] = sn;

  // Scale D (Dysthymia - 19)
  let sd = 0;
  if (check(answers, 5, true)) sd += 2;
  if (check(answers, 8, true)) sd += 2;
  if (check(answers, 25, true)) sd += 1;
  if (check(answers, 26, true)) sd += 2;
  if (check(answers, 27, true)) sd += 3;
  if (check(answers, 36, true)) sd += 2;
  if (check(answers, 41, false)) sd += 1;
  if (check(answers, 45, true)) sd += 3;
  if (check(answers, 46, true)) sd += 1;
  if (check(answers, 51, true)) sd += 2;
  if (check(answers, 53, true)) sd += 2;
  if (check(answers, 54, true)) sd += 3;
  if (check(answers, 56, true)) sd += 1;
  if (check(answers, 59, true)) sd += 2;
  if (check(answers, 65, true)) sd += 2;
  if (check(answers, 71, true)) sd += 2;
  if (check(answers, 72, true)) sd += 2;
  if (check(answers, 76, true)) sd += 2;
  if (check(answers, 79, true)) sd += 3;
  if (check(answers, 83, true)) sd += 2;
  if (check(answers, 86, false)) sd += 1;
  if (check(answers, 96, true)) sd += 2;
  if (check(answers, 97, true)) sd += 3;
  if (check(answers, 99, true)) sd += 3;
  if (check(answers, 107, true)) sd += 1;
  if (check(answers, 108, true)) sd += 3;
  if (check(answers, 109, true)) sd += 2;
  if (check(answers, 110, true)) sd += 1;
  if (check(answers, 132, true)) sd += 3;
  if (check(answers, 136, true)) sd += 2;
  if (check(answers, 139, true)) sd += 1;
  if (check(answers, 154, true)) sd += 2;
  if (check(answers, 155, true)) sd += 1;
  if (check(answers, 166, false)) sd += 2;
  if (check(answers, 167, true)) sd += 1;
  if (check(answers, 168, true)) sd += 1;

  if (gender === 'male' && sd > 57) sd = 57;
  if (gender === 'female' && sd > 56) sd = 56;
  scores['19'] = sd;

  // Scale B (Alcohol - 20)
  let sb = 0;
  if (check(answers, 8, false)) sb += 1;
  if (check(answers, 17, true)) sb += 3;
  if (check(answers, 18, true)) sb += 2;
  if (check(answers, 22, true)) sb += 1;
  if (check(answers, 23, true)) sb += 1;
  if (check(answers, 25, true)) sb += 1;
  if (check(answers, 27, true)) sb += 1;
  if (check(answers, 35, true)) sb += 1;
  if (check(answers, 40, true)) sb += 1;
  if (check(answers, 46, true)) sb += 1;
  if (check(answers, 52, false)) sb += 2;
  if (check(answers, 54, true)) sb += 2;
  if (check(answers, 65, true)) sb += 1;
  if (check(answers, 70, true)) sb += 1;
  if (check(answers, 73, true)) sb += 2;
  if (check(answers, 80, true)) sb += 1;
  if (check(answers, 87, true)) sb += 3;
  if (check(answers, 93, true)) sb += 1;
  if (check(answers, 95, true)) sb += 2;
  if (check(answers, 96, true)) sb += 1;
  if (check(answers, 97, true)) sb += 2;
  if (check(answers, 103, true)) sb += 1;
  if (check(answers, 104, true)) sb += 1;
  if (check(answers, 105, true)) sb += 2;
  if (check(answers, 108, true)) sb += 1;
  if (check(answers, 109, true)) sb += 2;
  if (check(answers, 111, true)) sb += 1;
  if (check(answers, 114, true)) sb += 1;
  if (check(answers, 117, true)) sb += 1;
  if (check(answers, 119, true)) sb += 3;
  if (check(answers, 122, false)) sb += 2;
  if (check(answers, 125, true)) sb += 1;
  if (check(answers, 128, true)) sb += 1;
  if (check(answers, 130, true)) sb += 1;
  if (check(answers, 135, true)) sb += 1;
  if (check(answers, 137, true)) sb += 1;
  if (check(answers, 140, true)) sb += 1;
  if (check(answers, 144, true)) sb += 2;
  if (check(answers, 149, true)) sb += 1;
  if (check(answers, 155, true)) sb += 1;
  if (check(answers, 157, true)) sb += 3;
  if (check(answers, 159, true)) sb += 1;
  if (check(answers, 162, true)) sb += 1;
  if (check(answers, 165, true)) sb += 1;
  if (check(answers, 171, true)) sb += 1;
  if (check(answers, 175, true)) sb += 2;

  if (gender === 'male' && sb > 50) sb = 50;
  if (gender === 'female' && sb > 51) sb = 51;
  scores['20'] = sb;

  // Scale T (Drug - 21)
  let st = 0;
  if (check(answers, 1, true)) st += 2;
  if (check(answers, 6, true)) st += 1;
  if (check(answers, 7, true)) st += 2;
  if (check(answers, 9, true)) st += 2;
  if (check(answers, 12, true)) st += 1;
  if (check(answers, 14, true)) st += 1;
  if (check(answers, 20, true)) st += 2;
  if (check(answers, 22, true)) st += 2;
  if (check(answers, 30, true)) st += 1;
  if (check(answers, 32, true)) st += 1;
  if (check(answers, 35, true)) st += 3;
  if (check(answers, 40, true)) st += 2;
  if (check(answers, 43, true)) st += 2;
  if (check(answers, 44, true)) st += 1;
  if (check(answers, 50, true)) st += 1;
  if (check(answers, 55, true)) st += 1;
  if (check(answers, 58, true)) st += 2;
  if (check(answers, 60, true)) st += 1;
  if (check(answers, 61, false)) st += 1;
  if (check(answers, 66, true)) st += 1;
  if (check(answers, 70, true)) st += 3;
  if (check(answers, 73, true)) st += 2;
  if (check(answers, 80, true)) st += 2;
  if (check(answers, 82, true)) st += 2;
  if (check(answers, 86, true)) st += 2;
  if (check(answers, 89, true)) st += 1;
  if (check(answers, 91, true)) st += 2;
  if (check(answers, 92, true)) st += 2;
  if (check(answers, 93, true)) st += 1;
  if (check(answers, 94, true)) st += 1;
  if (check(answers, 95, true)) st += 2;
  if (check(answers, 101, true)) st += 1;
  if (check(answers, 103, true)) st += 2;
  if (check(answers, 104, true)) st += 1;
  if (check(answers, 105, true)) st += 3;
  if (check(answers, 111, true)) st += 1;
  if (check(answers, 113, true)) st += 1;
  if (check(answers, 114, true)) st += 1;
  if (check(answers, 115, true)) st += 2;
  if (check(answers, 116, true)) st += 1;
  if (check(answers, 117, true)) st += 2;
  if (check(answers, 120, true)) st += 1;
  if (check(answers, 123, true)) st += 1;
  if (check(answers, 125, true)) st += 1;
  if (check(answers, 128, true)) st += 1;
  if (check(answers, 129, true)) st += 2;
  if (check(answers, 130, true)) st += 1;
  if (check(answers, 137, true)) st += 1;
  if (check(answers, 140, true)) st += 3;
  if (check(answers, 144, true)) st += 3;
  if (check(answers, 146, true)) st += 1;
  if (check(answers, 155, true)) st += 1;
  if (check(answers, 162, true)) st += 2;
  if (check(answers, 165, true)) st += 1;
  if (check(answers, 166, true)) st += 1;
  if (check(answers, 171, true)) st += 1;
  if (check(answers, 172, true)) st += 1;
  if (check(answers, 175, true)) st += 3;

  if (gender === 'male' && st > 63) st = 63;
  if (gender === 'female' && st > 60) st = 60;
  scores['21'] = st;

  // Scale SS (Thought Disorder - 22)
  let sss = 0;
  if (check(answers, 3, true)) sss += 1;
  if (check(answers, 8, true)) sss += 1;
  if (check(answers, 13, true)) sss += 1;
  if (check(answers, 19, true)) sss += 1;
  if (check(answers, 23, true)) sss += 1;
  if (check(answers, 24, true)) sss += 1;
  if (check(answers, 29, true)) sss += 1;
  if (check(answers, 31, true)) sss += 1;
  if (check(answers, 38, true)) sss += 2;
  if (check(answers, 68, true)) sss += 2;
  if (check(answers, 69, true)) sss += 2;
  if (check(answers, 74, true)) sss += 1;
  if (check(answers, 77, true)) sss += 2;
  if (check(answers, 80, true)) sss += 2;
  if (check(answers, 82, true)) sss += 1;
  if (check(answers, 83, true)) sss += 2;
  if (check(answers, 85, true)) sss += 2;
  if (check(answers, 98, true)) sss += 3;
  if (check(answers, 102, true)) sss += 2;
  if (check(answers, 109, true)) sss += 3;
  if (check(answers, 112, true)) sss += 2;
  if (check(answers, 115, true)) sss += 2;
  if (check(answers, 120, true)) sss += 2;
  if (check(answers, 124, true)) sss += 3;
  if (check(answers, 127, true)) sss += 3;
  if (check(answers, 141, true)) sss += 1;
  if (check(answers, 146, true)) sss += 2;
  if (check(answers, 147, true)) sss += 1;
  if (check(answers, 156, true)) sss += 1;
  if (check(answers, 160, true)) sss += 3;
  if (check(answers, 161, true)) sss += 1;
  if (check(answers, 164, true)) sss += 2;
  if (check(answers, 167, true)) sss += 3;

  if (gender === 'male' && sss > 47) sss = 47;
  if (gender === 'female' && sss > 39) sss = 39;
  scores['22'] = sss;

  // Scale CC (Major Depression - 23)
  let scc = 0;
  if (check(answers, 5, true)) scc += 3;
  if (check(answers, 19, true)) scc += 1;
  if (check(answers, 26, true)) scc += 3;
  if (check(answers, 33, true)) scc += 2;
  if (check(answers, 36, true)) scc += 3;
  if (check(answers, 45, true)) scc += 2;
  if (check(answers, 47, true)) scc += 2;
  if (check(answers, 50, true)) scc += 2;
  if (check(answers, 51, true)) scc += 1;
  if (check(answers, 53, true)) scc += 3;
  if (check(answers, 54, true)) scc += 1;
  if (check(answers, 56, true)) scc += 2;
  if (check(answers, 57, true)) scc += 1;
  if (check(answers, 58, true)) scc += 1;
  if (check(answers, 59, true)) scc += 3;
  if (check(answers, 65, true)) scc += 1;
  if (check(answers, 67, true)) scc += 1;
  if (check(answers, 72, true)) scc += 2;
  if (check(answers, 76, true)) scc += 3;
  if (check(answers, 79, true)) scc += 2;
  if (check(answers, 81, true)) scc += 1;
  if (check(answers, 82, true)) scc += 1;
  if (check(answers, 95, true)) scc += 1;
  if (check(answers, 96, true)) scc += 2;
  if (check(answers, 99, true)) scc += 1;
  if (check(answers, 108, true)) scc += 2;
  if (check(answers, 109, true)) scc += 2;
  if (check(answers, 110, true)) scc += 1;
  if (check(answers, 117, true)) scc += 1;
  if (check(answers, 136, true)) scc += 3;
  if (check(answers, 154, true)) scc += 1;

  if (gender === 'male' && scc > 48) scc = 48;
  if (gender === 'female' && scc > 46) scc = 46;
  scores['23'] = scc;

  // Scale PP (Delusional Disorder - 24)
  let spp = 0;
  if (check(answers, 15, true)) spp += 1;
  if (check(answers, 16, true)) spp += 2;
  if (check(answers, 24, true)) spp += 2;
  if (check(answers, 32, true)) spp += 1;
  if (check(answers, 38, true)) spp += 2;
  if (check(answers, 39, true)) spp += 1;
  if (check(answers, 69, true)) spp += 2;
  if (check(answers, 74, true)) spp += 1;
  if (check(answers, 80, true)) spp += 3;
  if (check(answers, 84, true)) spp += 2;
  if (check(answers, 85, true)) spp += 2;
  if (check(answers, 89, true)) spp += 1;
  if (check(answers, 98, true)) spp += 2;
  if (check(answers, 100, true)) spp += 3;
  if (check(answers, 112, true)) spp += 1;
  if (check(answers, 123, true)) spp += 3;
  if (check(answers, 126, true)) spp += 1;
  if (check(answers, 131, true)) spp += 2;
  if (check(answers, 138, true)) spp += 1;
  if (check(answers, 143, true)) spp += 1;
  if (check(answers, 146, true)) spp += 2;
  if (check(answers, 164, true)) spp += 2;

  if (spp > 36) spp = 36;
  scores['24'] = spp;

  return scores;
};

export const lookupBR = (scaleId: string, rawScore: number, gender: 'male' | 'female'): number => {
  const table = gender === 'male' ? maleTables[scaleId] : femaleTables[scaleId];
  if (!table) return 0;
  
  if (rawScore >= table.length) {
    return table[table.length - 1]; // Cap at max
  }
  return table[rawScore];
};

export const calculateScores = (
  answers: boolean[], 
  userInfo: UserInfo
): ScoreReport => {
  const rawScores = calculateRawScores(answers, userInfo.gender);
  const baseRates: Record<string, number> = {};
  const adjustedScores: Record<string, any> = {};

  // Calculate Base Rates
  for (const scaleId in rawScores) {
    baseRates[scaleId] = lookupBR(scaleId, rawScores[scaleId], userInfo.gender);
  }

  // --- ADJUSTMENTS ---

  // X (Disclosure) Calculation & Adjustment
  const w4 = rawScores['4'] || 0; // Scale 2 Avoidant raw
  const w12 = rawScores['12'] || 0; // Scale 8B Self-defeating raw
  const w3 = rawScores['3'] || 0; // Scale 1 Schizoid raw
  const w5 = rawScores['5'] || 0; // Scale 3 Dependent raw
  const w6 = rawScores['6'] || 0; // Scale 4 Histrionic raw
  const w7 = rawScores['7'] || 0; // Scale 5 Narcissistic raw
  const w8 = rawScores['8'] || 0; // Scale 6A Antisocial raw
  const w9 = rawScores['9'] || 0; // Scale 6B Aggressive/Sadistic raw
  const w10 = rawScores['10'] || 0; // Scale 7 Compulsive raw
  const w11 = rawScores['11'] || 0; // Scale 8A Passive-Aggressive raw

  let rawx = (w6 + w11) * 1.5 + (w3 + w4 + w5 + w12) * 1.6 + w7 + w8 + w9 + w10;
  
  const rx = rawx - Math.trunc(rawx);
  if (rx === 0.5) {
    rawx = rawx + 0.1;
  }
  const rrawx = Math.round(rawx);

  let xcor = 0;
  let hxcor = 0;

  // Implementation of big switch case for rrawx
  if (rrawx >= 145 && rrawx <= 149) { xcor = 11; hxcor = 5; }
  else if (rrawx >= 150 && rrawx <= 159) { xcor = 10; hxcor = 5; }
  else if (rrawx >= 160 && rrawx <= 169) { xcor = 9; hxcor = 4; }
  else if (rrawx >= 170 && rrawx <= 179) { xcor = 8; hxcor = 4; }
  else if (rrawx >= 180 && rrawx <= 189) { xcor = 7; hxcor = 3; }
  else if (rrawx >= 190 && rrawx <= 199) { xcor = 6; hxcor = 3; }
  else if (rrawx >= 200 && rrawx <= 209) { xcor = 5; hxcor = 2; }
  else if (rrawx >= 210 && rrawx <= 219) { xcor = 4; hxcor = 2; }
  else if (rrawx >= 220 && rrawx <= 229) { xcor = 3; hxcor = 1; }
  else if (rrawx >= 230 && rrawx <= 239) { xcor = 2; hxcor = 1; }
  else if (rrawx >= 240 && rrawx <= 249) { xcor = 1; hxcor = 0; }
  // 250-400 xcor = 0
  else if (rrawx >= 401 && rrawx <= 416) { xcor = -1; hxcor = 0; }
  else if (rrawx >= 417 && rrawx <= 432) { xcor = -2; hxcor = -1; }
  else if (rrawx >= 433 && rrawx <= 448) { xcor = -3; hxcor = -1; }
  else if (rrawx >= 449 && rrawx <= 464) { xcor = -4; hxcor = -2; }
  else if (rrawx >= 465 && rrawx <= 480) { xcor = -5; hxcor = -2; }
  else if (rrawx >= 481 && rrawx <= 496) { xcor = -6; hxcor = -3; }
  else if (rrawx >= 497 && rrawx <= 512) { xcor = -7; hxcor = -3; }
  else if (rrawx >= 513 && rrawx <= 528) { xcor = -8; hxcor = -4; }
  else if (rrawx >= 529 && rrawx <= 544) { xcor = -9; hxcor = -4; }
  else if (rrawx >= 545 && rrawx <= 560) { xcor = -10; hxcor = -5; }
  else if (rrawx >= 561 && rrawx <= 576) { xcor = -11; hxcor = -5; }
  else if (rrawx >= 577 && rrawx <= 590) { xcor = -12; hxcor = -6; }

  // X Score (Disclosure Value) Calculation for report
  let xValue = 0;
  if (rrawx < 180) xValue = 0;
  else if (rrawx < 195) xValue = 5;
  else if (rrawx < 207) xValue = 10;
  else if (rrawx < 220) xValue = 15;
  else if (rrawx < 232) xValue = 20;
  else if (rrawx < 245) xValue = 25;
  else if (rrawx < 257) xValue = 30;
  else if (rrawx < 270) xValue = userInfo.gender === 'male' ? 34 : 35;
  else if (rrawx < 282) xValue = 40;
  else if (rrawx < 295) xValue = 45;
  else if (rrawx < 307) xValue = 50;
  else if (rrawx < 320) xValue = userInfo.gender === 'male' ? 54 : 55;
  else if (rrawx < 345) xValue = userInfo.gender === 'male' ? 55 : 60;
  else if (rrawx < 357) xValue = userInfo.gender === 'male' ? 56 : 63;
  else if (rrawx < 370) xValue = userInfo.gender === 'male' ? 58 : 66;
  else if (rrawx < 382) xValue = userInfo.gender === 'male' ? 60 : 69;
  else if (rrawx < 395) xValue = userInfo.gender === 'male' ? 63 : 72;
  else if (rrawx < 420) xValue = userInfo.gender === 'male' ? 65 : 74;
  else if (rrawx < 432) xValue = userInfo.gender === 'male' ? 67 : 77;
  else if (rrawx < 445) xValue = userInfo.gender === 'male' ? 70 : 79;
  else if (rrawx < 457) xValue = userInfo.gender === 'male' ? 72 : 81;
  else if (rrawx < 470) xValue = userInfo.gender === 'male' ? 75 : 83;
  else if (rrawx < 483) xValue = userInfo.gender === 'male' ? 79 : 85;
  else if (rrawx < 495) xValue = userInfo.gender === 'male' ? 84 : 87;
  else if (rrawx < 508) xValue = 89;
  else if (rrawx < 520) xValue = 91;
  else if (rrawx < 533) xValue = 93;
  else if (rrawx < 545) xValue = 95;
  else if (rrawx < 558) xValue = 97;
  else xValue = 100;

  const afterCor: Record<string, number> = {};
  const afterHCor: Record<string, number> = {};

  Object.keys(baseRates).forEach(k => {
    const legacyIndex = parseInt(k);
    if (![1, 2, 13, 14, 15, 22, 23, 24].includes(legacyIndex)) {
        afterCor[k] = baseRates[k] + xcor;
    } else {
        afterCor[k] = baseRates[k];
    }

    if ([13, 14, 15, 22, 23, 24].includes(legacyIndex)) {
        afterHCor[k] = baseRates[k] + hxcor;
    } else {
        afterHCor[k] = baseRates[k];
    }
  });

  // DA Adjustment (Anxiety/Depression)
  const dCorrect = baseRates['19']; // D (Dysthymia)
  const aCorrect = baseRates['16']; // A (Anxiety)
  
  let daAdjValue = 0;
  if (dCorrect >= 85) {
      if (aCorrect < 85) {
          daAdjValue = dCorrect - 85;
      } else {
          daAdjValue = aCorrect + dCorrect - 170;
      }
  }

  // Input Adjustment (Inpatient status)
  let da = 0; 
  let dac = 0;
  const inpVal = userInfo.inpatientStatus;

  switch (inpVal) {
      case '1': // Outpatient
      case '4': // > 4 weeks
          da = Math.trunc(0.25 * daAdjValue);
          if (da > 15) da = 15;
          dac = Math.trunc(0.5 * daAdjValue);
          if (dac > 10) dac = 10;
          break;
      case '2': // < 1 week
          da = daAdjValue;
          if (da > 25) da = 25;
          dac = daAdjValue;
          if (dac > 20) dac = 20;
          break;
      case '3': // 1-4 weeks
          da = Math.floor(0.5 * daAdjValue);
          if (da > 15) da = 15;
          dac = Math.floor(0.75 * daAdjValue);
          if (dac > 15) dac = 15;
          break;
      case '5': // Unknown
          da = Math.floor(0.5 * daAdjValue);
          if (da > 15) da = 15;
          dac = Math.floor(0.75 * daAdjValue);
          if (dac > 15) dac = 15;
          break;
  }

  // Apply DA adjustment
  const daBr: Record<string, number> = {};
  daBr['4'] = afterCor['4'] - da; // Scale 2
  daBr['12'] = afterCor['12'] - da; // Scale 8B
  daBr['14'] = afterHCor['14'] - dac; 

  // DD Adjustment (Recent Deviation)
  let dd = (baseRates['1'] - baseRates['2']) / 10;
  if (Math.abs(dd - Math.round(dd)) === 0.5) {
      if (dd === Math.abs(dd)) dd += 0.1;
      else dd -= 0.1;
  }
  let rdd = Math.round(dd);
  if (rdd > 10) rdd = 10;
  if (rdd < -10) rdd = -10;

  const ddBr: Record<string, number> = {};
  ddBr['13'] = afterHCor['13'] + rdd; // Scale S
  ddBr['14'] = daBr['14'] + rdd; // Scale C
  ddBr['16'] = afterCor['16'] + rdd; // A
  ddBr['17'] = afterCor['17'] + rdd; // H
  ddBr['19'] = afterCor['19'] + rdd; // D

  // DC Adjustment (Commonality)
  const forDC: Record<string, number> = {};
  for(let i=3; i<=12; i++) {
      const k = i.toString();
      if (i === 4 || i === 12) {
          forDC[k] = daBr[k];
      } else {
          forDC[k] = afterCor[k];
      }
  }

  let biggest = -999;
  let g = 0;
  for (let i = 3; i <= 12; i++) {
      if (biggest < forDC[i.toString()]) {
          biggest = forDC[i.toString()];
          g = i;
      }
  }

  let bigger = -999;
  let gp = 0;
  for (let i = 3; i <= 12; i++) {
      if (i === g) continue;
      if (bigger < forDC[i.toString()]) {
          bigger = forDC[i.toString()];
          gp = i;
      }
  }

  const dcBr: Record<string, number> = {};
  dcBr['13'] = ddBr['13']; // S
  dcBr['14'] = ddBr['14']; // C
  dcBr['15'] = afterHCor['15']; // P
  dcBr['16'] = ddBr['16']; // A
  dcBr['17'] = ddBr['17']; // H
  dcBr['19'] = ddBr['19']; // D

  if ([6, 7, 10].includes(g) || gp === 10) {
      dcBr['13'] += 4;
      dcBr['14'] += 4;
      dcBr['15'] += 2;
      dcBr['16'] += 15;
      dcBr['19'] += 15;
      dcBr['17'] += 13;
  }

  if ([12, 4].includes(g) || gp === 4) {
      dcBr['13'] -= 2;
      dcBr['14'] -= 6;
      dcBr['15'] -= 6;
      dcBr['16'] -= 7;
      dcBr['17'] -= 5;
      dcBr['19'] -= 5;
  }

  // Inpatient Adjustment (Final Step)
  const finalInp: Record<string, number> = {};
  let ssAdj = 0, ccAdj = 0, ppAdj = 0;
  if (inpVal === '2') { 
      ssAdj = 8; ccAdj = 10; ppAdj = 4;
  } else if (inpVal === '3') { 
      ssAdj = 5; ccAdj = 7; ppAdj = 2;
  }

  finalInp['22'] = afterHCor['22'] + ssAdj;
  finalInp['23'] = afterHCor['23'] + ccAdj;
  finalInp['24'] = afterHCor['24'] + ppAdj;

  const finalBR: Record<string, number> = {};
  finalBR['1'] = baseRates['1'];
  finalBR['2'] = baseRates['2'];
  ['3', '5', '6', '7', '8', '9', '10', '11', '18', '20', '21'].forEach(k => finalBR[k] = afterCor[k]);
  finalBR['4'] = daBr['4'];
  finalBR['12'] = daBr['12'];
  ['13', '14', '15', '16', '17', '19'].forEach(k => finalBR[k] = dcBr[k]);
  ['22', '23', '24'].forEach(k => finalBR[k] = finalInp[k]);

  Object.keys(finalBR).forEach(k => finalBR[k] = Math.round(finalBR[k]));

  Object.keys(baseRates).forEach(k => {
      adjustedScores[k] = {
          raw: rawScores[k],
          br: baseRates[k],
          xCor: afterCor[k],
          hxCor: afterHCor[k],
          daAdj: daBr[k],
          ddAdj: ddBr[k],
          dcAdj: dcBr[k],
          inpAdj: finalInp[k],
          final: finalBR[k]
      };
  });

  return {
      rawScores,
      baseRates,
      adjustedScores,
      xScore: xValue
  };
};

export const scaleNames: Record<string, {code: string, name: string, enName: string}> = {
  '1': {code: 'Y', name: 'مطلوبیت', enName: 'Desirability'},
  '2': {code: 'Z', name: 'تنزل', enName: 'Debasement'},
  '3': {code: '1', name: 'اسکیزوئید', enName: 'Schizoid'},
  '4': {code: '2', name: 'اجتنابی', enName: 'Avoidant'},
  '5': {code: '3', name: 'وابسته', enName: 'Dependent'},
  '6': {code: '4', name: 'هیستریونیک', enName: 'Histrionic'},
  '7': {code: '5', name: 'خودشیفته', enName: 'Narcissistic'},
  '8': {code: '6A', name: 'ضد اجتماعی', enName: 'Antisocial'},
  '9': {code: '6B', name: 'پرخاشگر/سادیست', enName: 'Aggressive-Sadistic'},
  '10': {code: '7', name: 'وسواسی', enName: 'Compulsive'},
  '11': {code: '8A', name: 'منفعل-پرخاشگر', enName: 'Passive-Aggressive'},
  '12': {code: '8B', name: 'خودشکن', enName: 'Self-Defeating'},
  '13': {code: 'S', name: 'اسکیزوتایپال', enName: 'Schizotypal'},
  '14': {code: 'C', name: 'خط مرزی', enName: 'Borderline'},
  '15': {code: 'P', name: 'پارانوئید', enName: 'Paranoid'},
  '16': {code: 'A', name: 'اضطراب', enName: 'Anxiety'},
  '17': {code: 'H', name: 'شبه‌جسمانی', enName: 'Somatoform'},
  '18': {code: 'N', name: 'دوقطبی: مانیک', enName: 'Bipolar: Manic'},
  '19': {code: 'D', name: 'دیستیمیا', enName: 'Dysthymia'},
  '20': {code: 'B', name: 'وابستگی به الکل', enName: 'Alcohol Dependence'},
  '21': {code: 'T', name: 'وابستگی به مواد مخدر', enName: 'Drug Dependence'},
  '22': {code: 'SS', name: 'اختلال تفکر', enName: 'Thought Disorder'},
  '23': {code: 'CC', name: 'افسردگی اساسی', enName: 'Major Depression'},
  '24': {code: 'PP', name: 'اختلال هذیانی', enName: 'Delusional Disorder'},
  '25': {code: 'V', name: 'روایی', enName: 'Validity'},
};
