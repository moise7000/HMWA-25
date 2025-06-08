<template>
  <footer class="footer">
    <div class="footer-content">
      <!-- Section gauche avec logo et réseaux sociaux -->
      <div class="left-section">
        <div class="logo-section">
          <img src="/assets/logo.png" alt="Logo" class="footer-logo" />
          <h3 class="company-name">Yoga Institute</h3>
        </div>
        <div class="social-links">
          <a href="https://linkedin.com" target="_blank" rel="noopener" class="social-link">
            <svg class="social-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener" class="social-link">
            <svg class="social-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </a>
        </div>
      </div>

      <!-- Section droite avec les liens de navigation -->
      <div class="nav-links">
        <div class="grid">
          <div class="column" v-for="(column, index) in links" :key="index">
            <NuxtLink
                v-for="(link, index) in column"
                :key="link.path"
                :to="link.path"
                class="nav-link"
            >
              {{ link.name }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
const links = [[
  {name : 'Courses and Subscriptions', path : '/courses-and-subscriptions'},
  {name : 'Courses', path : '/courses-and-subscriptions/courses'},
  {name : 'Subscriptions', path : '/courses-and-subscriptions/subscriptions'}
], [
  {name : 'Events', path : '/events'}
], [
  {name : 'Institute', path : '/institute'},
  {name : 'Our story', path : '/institute/story'},
  {name : 'The Team', path : '/institute/teachers'},
  {name : 'Where to find us', path : '/institute/location'},
  {name : 'Opening hours', path : '/institute/opening-hours'},
], [
  {name : 'About', path : '/about'},
  {name : 'Benefits of yoga', path : '/about/benefits'},
  {name : 'Yoga equipments', path : '/about/equipments'},
  {name : 'Practice at home', path : '/about/practice-at-home'},
  {name : 'Articles', path : '/about/articles'},
], [
  {name : 'Sign up', path : '/auth/signup'},
  {name : 'Sign in', path : '/auth/signin'},
  {name : 'Language', path : '/language'},
  {name : 'Search', path : '/search'},
  {name : 'Contact', path : '/institute/contact'},
]]
</script>

<style scoped>
.footer {
  padding: 30px 20px;

}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 40px;
}


.left-section {
  display: flex;
  flex-direction: column;
  gap: 20px;
  min-width: 250px;
}

.logo-section {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
}

.footer-logo {
  height: 60px;
  width: auto;
  object-fit: contain;
}

.company-name {
  font-size: 1.5rem;
  font-weight: 600;
  color: #2d3748;
  margin: 0;
}

.social-links {
  display: flex;
  gap: 15px;
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #4a5568;
  color: white;
  text-decoration: none;
  transition: all 0.3s ease;
}

.social-link:hover {
  background-color : #111111;
  transform: translateY(-2px);
}

.social-icon {
  width: 20px;
  height: 20px;
}

/* Section droite - Navigation */
.nav-links {
  flex: 1;
}

.grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 30px;
  width: 100%;
}

.column {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.nav-link {
  font-size: 1rem;
  padding-bottom: 8px;
  text-decoration: none;
  color : #4a5568 ;
  transition: color 0.2s ease;
  font-weight: 500;
  line-height: 1.4;
  word-wrap: break-word;
}

.nav-link:hover {
  color : #111111;
}

/* Tablettes (768px et moins) */
@media (max-width: 768px) {
  .footer {
    padding: 20px 15px;
  }

  .footer-content {
    flex-direction: column;
    gap: 30px;
  }

  .left-section {
    min-width: auto;
    align-items: center;
    text-align: center;
  }

  .logo-section {
    align-items: center;
  }

  .grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }

  .column {
    padding: 15px 0;
    border-bottom: 1px solid #e2e8f0;
  }

  .column:nth-last-child(-n+2) {
    border-bottom: none;
  }

  .nav-link {
    font-size: 0.95rem;
    padding-bottom: 6px;
  }
}

/* Mobiles (480px et moins) */
@media (max-width: 480px) {
  .footer {
    padding: 15px 10px;
  }

  .footer-content {
    gap: 20px;
  }

  .footer-logo {
    height: 50px;
  }

  .company-name {
    font-size: 1.3rem;
  }

  .social-link {
    width: 35px;
    height: 35px;
  }

  .social-icon {
    width: 18px;
    height: 18px;
  }

  .grid {
    grid-template-columns: 1fr;
    gap: 15px;
  }

  .column {
    padding: 10px 0;
    border-bottom: 1px solid #e2e8f0;
  }

  .column:last-child {
    border-bottom: none;
  }

  .nav-link {
    font-size: 0.9rem;
    padding-bottom: 5px;
  }
}

/* Très petits écrans (320px et moins) */
@media (max-width: 320px) {
  .footer-logo {
    height: 40px;
  }

  .company-name {
    font-size: 1.2rem;
  }

  .social-link {
    width: 32px;
    height: 32px;
  }

  .social-icon {
    width: 16px;
    height: 16px;
  }

  .nav-link {
    font-size: 0.9rem;
    padding-bottom: 8px;
  }
}

/* Grands écrans (1200px et plus) */
@media (min-width: 1200px) {
  .footer-content {
    gap: 60px;
  }

  .left-section {
    min-width: 300px;
  }

  .grid {
    justify-content: center;
    gap: 40px;
  }

  .column {
    max-width: 220px;
  }
}
</style>