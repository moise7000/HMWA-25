<!-- webapp/pages/institute/location.vue -->

<template>
  <Hero :title="title" :description="description" />

  <div class="contact-section">
    <div class="contact-info">
      <p>Address: Piazza Leonardo da Vinci, 32, 20133 Milano MI, Italy</p>
      <p>Phone: +39 02 23991</p>
      <p>Email: 123456789@example.com</p>
    </div>

    <div class="map">
      <iframe 
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d44751.57738359071!2d9.149678889796746!3d45.49047664485362!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4786c6f67dd11753%3A0x8e30fae1774a3377!2sPolitecnico%20di%20Milano!5e0!3m2!1sen!2sbe!4v1748944290413!5m2!1sen!2sbe" 
      width="600" 
      height="450" 
      style="border:0;" 
      allowfullscreen="" 
      loading="lazy" 
      referrerpolicy="no-referrer-when-downgrade">
      </iframe>
    </div>
  </div>

  <section class="access-section">
    <div class="access-text">
      <h2>Access</h2>
      <p>
        Yoga Center Milano is nestled in the heart of the city’s fashion district, easily accessible by public transport or on foot. Whether you’re a local resident or a visitor exploring Milan, finding inner peace at our studio is simple and convenient.
      </p>
      <p>
        <strong>By Metro:</strong> Take the M2 (Green Line) to “Piola” station. From there, walk east along Viale Romagna for about 3 minutes until you reach Piazza Leonardo da Vinci, the main entrance to Politecnico di Milano.
        <strong>By Car:</strong> Parking is available in the campus underground garage (entrance on Via Durando). During peak hours, we recommend arriving at least 20 minutes before your appointment to find a spot. Street parking is also available along Viale Sarca (payable zones).
    　　</p>
    </div>

    <div class="benefits">
      <div class="benefit-item">
        <span class="benefit-icon">🌐</span>
        <div class="benefit-content">
          <h3>Experienced Instructors</h3>
          <p>
            Our certified instructors bring over 10 years of teaching experience, guiding students of all levels through safe alignment, mindfulness, and restorative sequences.
          </p>
        </div>
      </div>

      <div class="benefit-item">
        <span class="benefit-icon">🌐</span>
        <div class="benefit-content">
          <h3>Serene Atmosphere</h3>
          <p>
            Step into a calm, sunlit studio complete with natural wood floors, soft ambient music, and soothing scents—designed to help you leave the bustle of Milan behind.
          </p>
        </div>
      </div>

      <div class="benefit-item">
        <span class="benefit-icon">🌐</span>
        <div class="benefit-content">
          <h3>Holistic Wellness</h3>
          <p>
            Beyond physical postures, we offer guided meditation, pranayama (breathwork), and yoga philosophy workshops to support your mental and emotional balance.
          </p>
        </div>
      </div>
    </div>
  </section>

 <section class="amenities-section">
    <h2>Nearby AMENITIES</h2>
    <div class="amenities-grid">
      <div class="amenity-item">
        <span class="amenity-icon">🚿</span>
        <div class="amenity-content">
          <h3>Shower Facilities</h3>
          <p>
            After an energizing session, refresh yourself with our eco-friendly showers, stocked with organic shampoo and body wash.
          </p>
        </div>
      </div>

      <div class="amenity-item">
        <span class="amenity-icon">🧖‍♀️</span>
        <div class="amenity-content">
          <h3>Changing Rooms</h3>
          <p>
            Spacious changing areas with secure lockers ensure your belongings stay safe while you focus on your practice.
          </p>
        </div>
      </div>

      <div class="amenity-item">
        <span class="amenity-icon">🧘‍♂️</span>
        <div class="amenity-content">
          <h3>All Supplies Provided</h3>
          <p>
            We supply high-quality yoga mats, blocks, straps, and bolsters—so you can come as you are without worrying about equipment.
          </p>
        </div>
      </div>

      <div class="amenity-item">
        <span class="amenity-icon">☕</span>
        <div class="amenity-content">
          <h3>Organic Tea Lounge</h3>
          <p>
            Unwind in our tea lounge with a cup of chamomile or green tea, sourced from local organic farms—perfect for post-practice relaxation.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import Hero from "~/layouts/hero.vue";

const title = "Where to find us?";
const description = "Discover this vibrant location and its hidden gems.";
</script>

<style scoped>
.contact-section {
  display: flex;
  gap: 20px;
}

.contact-info {
  padding: 1rem 1rem 0;
  font-size: 24px;
  font-weight: 600;
  flex: 1;
}

.map {
  flex: 1;
}

.map iframe {
  width: 100%;
  height: 300px; 
}

.access-section {
  display: flex;
  gap: 40px;
  margin-top: 60px;
}

/* Left side text */
.access-text {
  flex: 1;
}

.access-text h2 {
  font-size: 24px;
  margin-bottom: 16px;
}

.access-text p {
  margin-bottom: 16px;
  line-height: 1.6;
}

/* Right side Benefits */
.benefits {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.benefit-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.benefit-icon {
  font-size: 20px;
  margin-top: 4px; 
}

.benefit-content h3 {
  font-size: 18px;
  margin: 0 0 6px 0;
}

.benefit-content p {
  margin: 0;
  line-height: 1.5;
  color: #555;
}


.amenities-section {
  margin-top: 60px;
  margin-bottom: 60px;
}

.amenities-section h2 {
  font-size: 30px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 32px;
}

.amenities-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 40px;
}

.amenity-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.amenity-icon {
  font-size: 20px;
  margin-top: 4px;
}

.amenity-content h3 {
  font-size: 18px;
  margin: 0 0 6px 0;
}

.amenity-content p {
  margin: 0;
  line-height: 1.5;
  color: #555;
}
</style>
