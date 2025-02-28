'use client'; // Mark as client component

import Nav from '../components/Nav';
import TaskForm from '../components/TaskForm';

export default function Home() {
  return (
    <div>
      <Nav />
      <main>
        <TaskForm />
      </main>
    </div>
  );
}