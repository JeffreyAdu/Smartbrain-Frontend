<template>
  <div class="bg-white">
    <!-- Hero Section with Face Detection Demo -->
    <div class="relative bg-gradient-to-r from-primary to-secondary overflow-hidden">
      <div class="max-w-7xl mx-auto pt-12 pb-16 px-4 sm:pt-16 sm:pb-24 sm:px-6 lg:px-8 relative z-10">
        <div class="lg:grid lg:grid-cols-12 lg:gap-8">
          <div class="lg:col-span-6">
            <h1 class="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
              <span class="block">Face Detection</span>
              <span class="block text-accent">Powered by AI</span>
            </h1>
            <p class="mt-6 text-xl text-white max-w-prose">
              SmartBrain instantly identifies faces in your images with advanced AI technology. 
              Experience precise face detection with our state-of-the-art API.
            </p>
            <div class="mt-8 flex space-x-4">
              <router-link
                to="/register"
                class="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-primary bg-white hover:bg-gray-50 shadow-md transition duration-300 ease-in-out"
              >
                Try It Now
              </router-link>
              <router-link
                to="/login"
                class="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-secondary-dark hover:bg-opacity-90 shadow-md transition duration-300 ease-in-out"
              >
                Login
              </router-link>
            </div>
          </div>
          <div class="mt-12 lg:mt-0 lg:col-span-6">
            <div class="bg-white rounded-lg shadow-xl overflow-hidden">
              <div class="relative aspect-[2.5/3] bg-gray-100">
                <!-- Demo image with face detection boxes -->
                <img 
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Face detection demo" 
                  class="w-full h-full object-cover"
                />
                <!-- Simulated face detection boxes -->
                <div class="absolute" style="left: 38%; top: 6%; width: 32%; height: 28%;">
                  <div class="w-full h-full border-4 border-primary rounded-md pulse-animation">
                    <div class="absolute -top-6 left-0 bg-primary text-white text-xs px-2 py-1 rounded-md font-bold">
                      Face Detected
                    </div>
                  </div>
                </div>
              </div>
              <div class="bg-gray-50 px-4 py-4 border-t border-gray-200">
                <div class="flex items-center justify-between">
                  <div class="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                    </svg>
                    <p class="ml-2 text-sm text-gray-700 font-medium">1 face detected with 99.8% confidence</p>
                  </div>
                  <router-link to="/register" class="text-primary text-sm font-semibold hover:text-primary-dark">
                    Try with your image →
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Decorative waves -->
      <div class="absolute bottom-0 inset-x-0">
        <svg class="w-full text-white" viewBox="0 0 1440 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,160L48,149.3C96,139,192,117,288,128C384,139,480,181,576,181.3C672,181,768,139,864,122.7C960,107,1056,117,1152,122.7C1248,128,1344,128,1392,128L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" fill="currentColor"/>
        </svg>
      </div>
    </div>

    <!-- How It Works Section -->
    <div class="py-16 bg-white overflow-hidden lg:py-24">
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            How Face Detection Works
          </h2>
          <p class="mt-4 max-w-3xl mx-auto text-xl text-gray-500">
            Our powerful AI analyzes your images to detect faces with incredible accuracy
          </p>
        </div>

        <div class="relative">
          <div class="lg:grid lg:grid-cols-3 lg:gap-8">
            <div class="relative flex flex-col items-center p-5">
              <div class="flex items-center justify-center h-16 w-16 rounded-full bg-primary text-white text-2xl font-bold mb-4">
                1
              </div>
              <h3 class="text-xl font-medium text-gray-900 mb-2">Upload Your Image</h3>
              <p class="text-base text-gray-500 text-center">
                Simply paste the URL of any image containing faces, or upload directly from your device
              </p>
              <img src="https://images.unsplash.com/photo-1512626120412-faf41adb4874?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60" alt="Upload step" class="mt-6 rounded-lg shadow-md w-full h-48 object-cover" />
            </div>

            <div class="relative flex flex-col items-center p-5 mt-10 lg:mt-0">
              <div class="flex items-center justify-center h-16 w-16 rounded-full bg-primary text-white text-2xl font-bold mb-4">
                2
              </div>
              <h3 class="text-xl font-medium text-gray-900 mb-2">AI Processing</h3>
              <p class="text-base text-gray-500 text-center">
                Our advanced AI algorithms analyze the image to detect and locate faces with high precision
              </p>
              <img src="https://images.unsplash.com/photo-1501706362039-c06b2d715385?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60" alt="Processing step" class="mt-6 rounded-lg shadow-md w-full h-48 object-cover" />
            </div>

            <div class="relative flex flex-col items-center p-5 mt-10 lg:mt-0">
              <div class="flex items-center justify-center h-16 w-16 rounded-full bg-primary text-white text-2xl font-bold mb-4">
                3
              </div>
              <h3 class="text-xl font-medium text-gray-900 mb-2">Instant Results</h3>
              <p class="text-base text-gray-500 text-center">
                Get immediate results with accurate face boxes highlighting each detected face
              </p>
              <img src="https://images.unsplash.com/photo-1581090700227-1e37b190418e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60" alt="Results step" class="mt-6 rounded-lg shadow-md w-full h-48 object-cover" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Features Grid Section -->
    <div class="bg-gray-50 py-16 lg:py-24">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h2 class="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Smart Brain Features
          </h2>
          <p class="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Experience the power of advanced face detection technology
          </p>
        </div>
        
        <div class="mt-12 grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <div class="bg-white overflow-hidden shadow-md rounded-lg">
            <div class="px-6 py-5 border-b border-gray-200">
              <div class="flex items-center">
                <div class="flex-shrink-0 bg-primary p-2 rounded-md">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 class="ml-3 text-lg font-medium text-gray-900">Multi-Face Detection</h3>
              </div>
            </div>
            <div class="px-6 py-5">
              <p class="text-gray-500">
                Detect multiple faces in a single image with precise bounding boxes and high accuracy
              </p>
            </div>
          </div>
          
          <div class="bg-white overflow-hidden shadow-md rounded-lg">
            <div class="px-6 py-5 border-b border-gray-200">
              <div class="flex items-center">
                <div class="flex-shrink-0 bg-primary p-2 rounded-md">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 class="ml-3 text-lg font-medium text-gray-900">Real-time Processing</h3>
              </div>
            </div>
            <div class="px-6 py-5">
              <p class="text-gray-500">
                Get instant results with our blazing-fast API, optimized for speed and performance
              </p>
            </div>
          </div>
          
          <div class="bg-white overflow-hidden shadow-md rounded-lg">
            <div class="px-6 py-5 border-b border-gray-200">
              <div class="flex items-center">
                <div class="flex-shrink-0 bg-primary p-2 rounded-md">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 class="ml-3 text-lg font-medium text-gray-900">Secure Processing</h3>
              </div>
            </div>
            <div class="px-6 py-5">
              <p class="text-gray-500">
                Your data is securely processed and never stored permanently, ensuring privacy
              </p>
            </div>
          </div>
          
          <div class="bg-white overflow-hidden shadow-md rounded-lg">
            <div class="px-6 py-5 border-b border-gray-200">
              <div class="flex items-center">
                <div class="flex-shrink-0 bg-primary p-2 rounded-md">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                  </svg>
                </div>
                <h3 class="ml-3 text-lg font-medium text-gray-900">History Tracking</h3>
              </div>
            </div>
            <div class="px-6 py-5">
              <p class="text-gray-500">
                Keep track of your previously analyzed images for convenient reference
              </p>
            </div>
          </div>
          
          <div class="bg-white overflow-hidden shadow-md rounded-lg">
            <div class="px-6 py-5 border-b border-gray-200">
              <div class="flex items-center">
                <div class="flex-shrink-0 bg-primary p-2 rounded-md">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </div>
                <h3 class="ml-3 text-lg font-medium text-gray-900">Free to Use</h3>
              </div>
            </div>
            <div class="px-6 py-5">
              <p class="text-gray-500">
                Start with our free tier that includes everything you need for personal use
              </p>
            </div>
          </div>
          
          <div class="bg-white overflow-hidden shadow-md rounded-lg">
            <div class="px-6 py-5 border-b border-gray-200">
              <div class="flex items-center">
                <div class="flex-shrink-0 bg-primary p-2 rounded-md">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 class="ml-3 text-lg font-medium text-gray-900">Simple Integration</h3>
              </div>
            </div>
            <div class="px-6 py-5">
              <p class="text-gray-500">
                Easy to integrate with your existing applications and systems
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- CTA Section -->
    <div class="bg-primary">
      <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
        <h2 class="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          <span class="block">Ready to try SmartBrain?</span>
          <span class="block text-accent">Start detecting faces today.</span>
        </h2>
        <div class="mt-8 flex lg:mt-0 lg:flex-shrink-0">
          <div class="inline-flex rounded-md shadow">
            <router-link
              to="/register"
              class="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-primary bg-white hover:bg-gray-50"
            >
              Get started
            </router-link>
          </div>
          <div class="ml-3 inline-flex rounded-md shadow">
            <router-link
              to="/login"
              class="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-secondary-dark hover:bg-opacity-90"
            >
              Login
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.pulse-animation {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(234, 82, 111, 0.7);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(234, 82, 111, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(234, 82, 111, 0);
  }
}
</style> 