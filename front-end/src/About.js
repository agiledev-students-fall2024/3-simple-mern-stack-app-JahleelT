import React, { useEffect, useState } from 'react'

// Define the About component
const About = () => {
	const [content, setContent] = useState({ name: '', bio: '', imageUrl: '' })

	useEffect(() => {
		fetch('/about')
			.then(response => response.json())
			.then(data => setContent(data))
			.catch(error => console.error('Error fetching about info:', error))
	}, [])

	return (
		<div className="About">
			<h1>About Me</h1>
            <p>Name: Jahleel Townsend</p>
            <p>Bio: 'Hello, all! My name is Jahleel Townsend and I am a 21 year old university senior from Seattle, Washington. I study Computer Science under CAS, and I am looking to go into either cybersecurity or software engineering routes (maybe switching from one to the other in the future). I grew up in the greater seattle area for all of my life as a minor, first exploring outside of Washington when I decided to spend my first year of university abroad in NYU's Florence, Italy campus.</p>  
            <p>For personal interests, I enjoy walking, birdwatching, playing piano and guitar, trying new foods, listening to a wide range of music, and reading manga/manhwa/manhua. Something I would like to get into this semester is sketching. In particular, I want to sketch the birds that I take pictures of, though not in real time since they don't often sit still.</p>
            <p>The reason I chose computer science as a field of interest is because I enjoy learning and working with languages, whether that be human or computer languages. Aside from the language component, being able to build working software from the ground up feels akin to building a complex puzzle, which I greatly enjoy; I used to build legos and do puzzles a lot as a child. Something that I would like to create one day is my own food-related app that works better for ranking food than Beli, better at finding food than Yelp, etc.</p>'
			<p>{content.bio}</p>
			<img src={'./back-end/public/images/IMG_7393_2.JPG'} alt="About Us" />
		</div>
	)  
}

// Export the About component as the default export
export default About


