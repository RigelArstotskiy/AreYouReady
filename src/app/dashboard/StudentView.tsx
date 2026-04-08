"use client";

export interface StudentViewProps {
  email: string;
  isStudent: boolean;
  isMentor: boolean;
}

export default function StudentView({
  email,
  isStudent,
  isMentor,
}: StudentViewProps) {
  return (
    <div>
      <h1>заглушка</h1>
    </div>
  );
}
