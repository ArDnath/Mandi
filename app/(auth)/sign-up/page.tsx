import { Suspense } from 'react';
import { Container } from '@/components/layout/container';
import { SignUpForm } from './sign-up-form';

export default function SignUpPage() {
  return (
    <Container className="min-h-screen flex items-center justify-center">
      <Suspense fallback={
        <div className="w-full max-w-md bg-neutral-100 border border-neutral-400 rounded-2xl shadow-lg p-8 text-center">
          <p>Loading sign up form...</p>
        </div>
      }>
        <SignUpForm />
      </Suspense>
    </Container>
  );
}
