import {useHead} from "#app";

export const useStoryPage = () => {
		const title = "Our story"

		const description = "Discover the inspiring journey of our Yoga Center through the vision of our founder, significant milestones, and remarkable achievements. Join us in celebrating our path to wellness and harmony."

		useHead({
				title: title,
				meta: [
						{
								name: 'description',
								content: description
						},
						{
								property: 'og:title',
								content: title
						},
						{
								property: 'og:description',
								content: description
						},
						{
								property: 'og:type',
								content: 'website'
						},
						{
								property: 'og:url',
								content: 'https://hmwa-25-git-main-moise7000s-projects.vercel.app/institute/story',
						},
						{
								name: 'twitter:card',
								content: 'summary'
						},
						{
								name: 'twitter:title',
								content: title
						},
						{
								name: 'twitter:description',
								content: description
						}
				]
		})

		const breadCrumps = [{
				name : "Insitute",
				link : "/institute"
		}, {
				name : "Story",
				link : "/institute/story"
		}]

		const topics = [{
				imagePath : "/assets/our_story/founder.png",
				topicTitle : "Our founder",
				topicDescription : "Meet Emma, the vibrant founder of our Yoga Club. With a passion for yoga ignited in her childhood, Emma has dedicated her life to mastering and sharing the art of yoga. Her journey began with simple poses in her living room, inspired by her grandmother's practice. Over the years, Emma has trained with renowned yogis, earning certifications in various styles, from Hatha to Vinyasa. Her youthful energy and deep understanding of yoga philosophy create a unique and inviting atmosphere in our club. Emma believes in the transformative power of yoga, not just for the body, but for the mind and spirit as well. Join her on this journey to wellness and self-discovery.",
				side : true,
				noLink : true
		},{
				imagePath : "/assets/our_story/achievments.png",
				topicTitle : "Achievments",
				topicDescription : "Our Yoga Club has achieved remarkable milestones since its inception. We've cultivated a thriving community of over 500 members, united by a shared passion for yoga and wellness. Our certified instructors have collectively led over 10,000 hours of classes, catering to all levels from beginners to advanced practitioners. We've successfully hosted numerous workshops and retreats, both locally and internationally, providing transformative experiences for our members. Our club has also been recognized for its commitment to community service, offering free yoga sessions to underprivileged groups and raising funds for various charitable causes. We've established partnerships with renowned yoga schools and wellness centers, enhancing the quality and diversity of our offerings. Our members have consistently reported improved physical health, mental clarity, and overall well-being, a testament to the positive impact of our club. Join us and be a part of our continuing journey towards health, happiness, and harmony.",
				side : false,
				noLink : true
		},{
				imagePath : "/assets/our_story/milestones.png",
				topicTitle : "Milestones",
				topicDescription : "Our Yoga Club has reached several significant milestones since its founding. In our first year, we welcomed our 100th member, a testament to the growing interest in yoga within our community. By the end of our second year, we had successfully organized our first international yoga retreat, marking our expansion beyond local boundaries. In our third year, we celebrated the opening of our second studio, doubling our capacity to serve more members. We also introduced specialized programs, such as prenatal yoga and yoga therapy, catering to diverse needs. Recently, we celebrated our fifth anniversary with a grand event, reflecting on our journey and the thousands of lives we've touched. Each milestone is a step forward in our mission to promote wellness and harmony through yoga",
				side : true,
				noLink : true
		}]

		return {
				title,
				description,
				breadCrumps,
				topics
		}
}