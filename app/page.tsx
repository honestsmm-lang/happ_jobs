export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-4">
      <div className="text-center max-w-md w-full">
        
        <h1 className="text-4xl font-bold mb-4">
          Welcome to Happ Jobs
        </h1>

        <p className="text-gray-600 mb-8">
          Apply for a job in one click. <br />
          Sign in with LinkedIn or upload your CV.
        </p>

        <div className="flex flex-col gap-4">
          
          <a
            href="/api/auth/linkedin"
            className="bg-[#0A66C2] text-white py-3 rounded-lg font-medium hover:opacity-90 transition"
          >
            Continue with LinkedIn
          </a>

          <a
            href="/upload-cv"
            className="border border-gray-300 py-3 rounded-lg font-medium hover:bg-gray-100 transition"
          >
            Upload your CV
          </a>

        </div>
      </div>
    </main>
  );
}