
# Webapp project structure


```
webapp/
├── .nuxt/                  # Nuxt generated folder (do not edit)
├── .output/               # Build folder (do not edit)
├── assets/                # Static assets (CSS, images, fonts)
│   ├── css/
│   │   ├── main.css
│   │   ├── components.css
│   │   └── variables.css
│   ├── images/
│   │   ├── yoga/          
│   │   ├── teachers/      
│   │   ├── center/        
│   │   └── common/        # Logos, icons, etc.
│   └── fonts/
├── components/            # Reusable vue components
│   ├── common/
│   │   ├── Header.vue
│   │   ├── Footer.vue
│   │   ├── Navigation.vue
│   │   ├── Breadcrumb.vue
│   │   └── ...
│   ├── ui/
│   │   ├── Button.vue
│   │   ├── Card.vue
│   │   ├── Loading.vue
│   │   └── ...
│   ├── layout/
│   │   ├── Hero.vue
│   │   ├── Section.vue
│   │   └── ...
│   ├── teachers/
│   │   ├── TeacherCard.vue
│   │   ├── TeacherProfile.vue
│   │   ├── TeacherList.vue
│   │   └── ...
│   └── ...
├── composables/           # Reusable logic
│   ├── useApi.js
│   ├── useActivities.js
│   ├── useTeachers.js
│   ├── useNavigation.js
│   └── ...
├── layouts/               # Layouts Nuxt
│   ├── default.vue
│   └── minimal.vue
├── middleware/            # Middleware Nuxt
│   └── auth.js
├── pages/                 # Pages (routing automatic Nuxt)
│   ├── index.vue          # Homepage
│   ├── aboutYoga.vue      
│   ├── contact.vue        
│   ├── benefitOfYoga.vue
│   ├── courseAndSubscription.vue
│   ├── location.vue
│   ├── practiceYogaAtHome.vue
│   ├── story.vue
│   ├── theTeam.vue
│   ├── group/
│   │   ├── articles.vue        
│   │   ├── courses.vue         
│   │   ├── equipments.vue      
│   │   ├── events.vue
│   │   ├── subscriptions.vue    
│   │   └── teachers.vue     
│   └── kind/               # Individual [xxx] pages
│       ├── [course].vue      
│       ├── [teacher].vue
│       └── [event].vue
├── plugins/               # Plugins Nuxt
│   ├── supabase.client.js
│   └── vuetify.js
├── public/                # Assets publics (accessibles via /)
│   ├── favicon.ico
│   ├── robots.txt
│   └── sitemap.xml
├── server/                # API routes Nuxt
│   └── api/
│       ├── activities/
│       │   ├── index.get.js
│       │   └── [id].get.js
│       ├── teachers/
│       │   ├── index.get.js
│       │   └── [id].get.js
│       └── highlights.get.js
├── stores/                # Pinia stores
│   ├── activities.js
│   ├── teachers.js
│   └── navigation.js
├── types/                 
│   ├── Article.ts
│   ├── Course.ts
│   ├── Equipment.ts
│   ├── Event.ts
│   ├── Feedback.ts
│   ├── Student.ts
│   ├── Teacher.ts
│   └── mock.ts             # Contains mock types for rendering
├── utils/                
│   ├── formatters.js
│   ├── validators.js
│   └── constants.js
├── .env                   
├── .gitignore
├── app.vue               
├── nuxt.config.ts        # Nuxt configuration
├── package.json
├── package-lock.json
├── README.md
└── tsconfig.json         
```

### `/server/api/`
API entry points for:

- Retrieving all activities
- Retrieving a specific activity
- Retrieving all teachers
- Retrieving a specific teacher
- Retrieving featured activities
  
### `/stores/`
Status management with Pinia:

- Activity status
- Teacher status
- Navigation status

### `/composables/`
Reusable business logic:

- API calls
- Activity and teacher management
- Navigation logic