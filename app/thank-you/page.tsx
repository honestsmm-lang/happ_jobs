export default function ThankYouPage() {
    return (
      <main className="flex min-h-screen items-center justify-center bg-white px-4">
        <div className="text-center max-w-md">
          <h1 className="text-4xl font-bold mb-4">Thank you!</h1>
  
          <p className="text-gray-600">
            Your application has been submitted successfully.
          </p>
  
          <a
            href="/"
            className="inline-block mt-8 border border-gray-300 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition"
          >
            Back to home
          </a>
        </div>
      </main>
    );
  }