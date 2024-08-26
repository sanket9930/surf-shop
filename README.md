<h1>Surf-Shop</h1>

<p>Surf-Shop is a RESTful web application developed using Node.js, Express.js, and MongoDB. The application allows users to post surf shops, view them on a map, upload images, and securely authenticate their accounts. This guide will help you set up the project locally and understand its key features.</p>

<h2>Features</h2>

<ul>
  <li><strong>Map Integration:</strong> Utilizes Mapbox APIs to display the location of surf shops on interactive maps.</li>
  <li><strong>Image Upload:</strong> Supports image upload and processing using Cloudinary API and multer package.</li>
  <li><strong>Secure Authentication:</strong> Integrated with Passport.js and crypto.js for secure, encrypted user authentication.</li>
  <li><strong>Review System:</strong> Users can leave reviews and rate surf shops with star ratings.</li>
  <li><strong>Additional Features:</strong> Implements pagination, session management, and more.</li>
</ul>

<h2>Getting Started</h2>

<h3>Prerequisites</h3>

<p>Ensure you have the following installed:</p>
<ul>
  <li><strong>Node.js</strong> (v14 or higher)</li>
  <li><strong>npm</strong> (v6 or higher) or <strong>yarn</strong> (v1.22 or higher)</li>
  <li><strong>MongoDB</strong> (running locally or using a cloud service like MongoDB Atlas)</li>
</ul>

<h3>Installation</h3>

<ol>
  <li><strong>Clone the Repository:</strong>
    <pre><code>git clone https://github.com/sanket9930/surf-shop.git</code></pre>
  </li>
  <li><strong>Navigate to the Project Directory:</strong>
    <pre><code>cd surf-shop</code></pre>
  </li>
  <li><strong>Install Dependencies:</strong>
    <ul>
      <li>Using npm:
        <pre><code>npm install</code></pre>
      </li>
      <li>Or using yarn:
        <pre><code>yarn install</code></pre>
      </li>
    </ul>
  </li>
  <li><strong>Environment Variables:</strong>
    <p>Create a <code>.env</code> file in the root directory.</p>
    <p>Add the following variables:</p>
    <pre><code>
DATABASE_URL=your-mongodb-url
CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
CLOUDINARY_KEY=your-cloudinary-key
CLOUDINARY_SECRET=your-cloudinary-secret
MAPBOX_TOKEN=your-mapbox-token
SESSION_SECRET=your-session-secret
</code></pre>
  </li>
  <li><strong>Run the Application:</strong>
    <ul>
      <li>Using npm:
        <pre><code>npm start</code></pre>
      </li>
      <li>Or using yarn:
        <pre><code>yarn start</code></pre>
      </li>
    </ul>
    <p>The application will be available at <a href="http://localhost:3000">http://localhost:3000</a>.</p>
  </li>
</ol>

<h3>Usage</h3>

<ul>
  <li><strong>Post Surf Shops:</strong> Users can create new surf shop listings, including location, images, and descriptions.</li>
  <li><strong>Map View:</strong> View surf shops on a map with locations rendered using Mapbox.</li>
  <li><strong>Authentication:</strong> Users can sign up, log in, and manage their accounts securely.</li>
  <li><strong>Reviews and Ratings:</strong> Users can leave reviews and rate surf shops with a star rating system.</li>
</ul>

<h3>Contributing</h3>

<p>If you'd like to contribute, feel free to fork the repository, make your changes, and submit a pull request. Contributions are welcome!</p>

