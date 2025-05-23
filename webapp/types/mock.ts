import type {Teacher} from "~/types/Teacher";
import type {Equipment} from "~/types/Equipment";
import type {Course} from "~/types/Course";
import type {Student} from "~/types/Student";
import type {Feedback} from "~/types/Feedback";
import type {Article} from "~/types/Article";


export const MOCK_TEACHER: Teacher = {
    id: 1,
    name: "John Doe",
    email: "john@doe.com",
    biography: "Experienced yoga instructor with 10 years of practice.",
    certificates: ["Certificate 1", "Certificate 2"],
    socialMedia: {
        instagram: "@JohnDoe",
        linkedin: "JohnDoe",
        website:"johndoe.com"
    },
    createdAt: new Date("2023-06-15T10:00:00Z")
}

export const MOCK_EQUIPMENT: Equipment = {
    id: 2,
    name: "Floor mats",
    description: "At 20 mm thick, this is our thickest and most comfortable mat, perfect for Pilates and gentle gym sessions.\n" +
        "\n" +
        "Its large size (180 x 70 cm) allows you to practice on a large, wide surface. Lie down with peace of mind. Use barefoot or in socks.",
    vendorUrl: "https://www.decathlon.fr/p/tapis-de-pilates-large-et-ultra-confort-epaisseur-20-mm-noir/_/R-p-351143?mc=8851737",
    createdAt: new Date("2023-06-15T10:00:00Z"),
}

export const MOCK_EVENT: Event = {
    id: 3,
    title: "Yoga all the night",
    date: new Date("2023-06-15T10:00:00Z"),
    endDate: new Date("2023-06-16T10:00:00Z"),
    description: "Join us for a rejuvenating Sunrise Vinyasa Yoga session in the heart of nature. This 90-minute class is designed to awaken your body and mind through a dynamic sequence of postures, mindful breathing, and meditation as the sun rises.",
    location: "Politecnico di milano",
    capacity: 50,
    price: 20,
    isFree: false,
    registrationRequired: false,
    createdAt: new Date("2023-06-15T10:00:00Z")
}


export const MOCK_COURSE: Course = {
    id: 4,
    title: "Rise & Flow",
    description: "Start your day with intention and energy in this invigorating morning Vinyasa class. Rise & Flow is designed to gently awaken your body through mindful movement, stretching, and breathwork. Perfect for all levels, this class will leave you feeling grounded, refreshed, and ready to take on the day. Whether you’re new to yoga or looking to deepen your practice, this sunrise flow blends strength, flexibility, and calm to help you begin the day in balance.",
    price: 10,
    durationMinutes: 90,
    introVideoUrl: "https://www.youtube.com/watch?v=i-8xgSOoLxY",
    maxCapacity: 15,
    teacher: MOCK_TEACHER,
    equipments: [[1, false, MOCK_EQUIPMENT]],
    createdAt: new Date("2023-06-15T10:00:00Z")
}

export const MOCK_STUDENT: Student = {
    id: 5,
    name: "Jane Doe",
    email: "jane@doe.com",
    createdAt: new Date("2023-06-15T10:00:00Z")
}

export const MOCK_FEEDBACK: Feedback = {
    id: 6,
    course: MOCK_COURSE,
    student: MOCK_STUDENT,
    comment: "This course was exactly what I needed! The instructor created a welcoming and calming environment, and I felt more grounded and energized after each session. Highly recommend for anyone looking to deepen their yoga practice.",
    rating: 5,
    createdAt: new Date("2023-06-15T10:00:00Z")
}



export const MOCK_ARTICLE: Article = {
    id: 7,
    title: "Learn with Yoga",
    content:"In today’s fast-paced world, finding stillness can feel like a luxury. Between meetings, screens, and endless to-do lists, many of us rarely take a moment to truly connect with our bodies and breath. That’s where yoga steps in — not just as a workout, but as a pathway to presence, balance, and transformation.\n" +
        "\n" +
        "Yes, yoga improves flexibility, balance, and strength. But beyond the physical postures (asanas), it teaches us mindfulness. Through breath control (pranayama) and meditation, we learn to quiet the noise and tune in to what truly matters. Even a few minutes on the mat can reframe your entire day.\n" +
        "\n" +
        "One of the greatest gifts of yoga is acceptance. You don’t need to touch your toes or have perfect alignment to practice. All you need is a willingness to show up — for yourself.\n" +
        "\n" +
        "Studies show that regular yoga practice can reduce stress, anxiety, and even symptoms of depression. The combination of movement and breath creates space in the mind and body, helping us let go of what no longer serves us — both physically and emotionally.\n" +
        "\n" +
        "Whether you prefer a sweaty Power Vinyasa class or a gentle Yin flow, there’s a style of yoga for everyone. Explore different practices until you find what resonates with your needs and lifestyle.\n" +
        "\n" +
        "Yoga doesn’t have to happen in a studio. Light a candle, roll out your mat, and create a space that feels sacred — even if it’s just 15 minutes before bed. With consistency, this simple habit can become a grounding ritual in your life.\n" +
        "\n" +
        "Yoga is not about how you look in a pose. It’s about how you feel in your body, your breath, and your mind. It’s a lifelong journey of listening inward — and the first step starts today.",
    snippet: "In today’s fast-paced world, finding stillness can feel like a luxury. Between meetings, screens, and endless to-do lists, many of us rarely take a moment to truly connect with our bodies and breath. That’s where yoga steps in — not just as a workout, but as a pathway to presence, balance, and transformation.",
    isPublished: true,
    publishedAt: new Date("2023-06-15T10:00:00Z"),
    viewsCount: 11,
    authors: ["John Doe"],
    createdAt: new Date("2023-06-15T10:00:00Z")
}


