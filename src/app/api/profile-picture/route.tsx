// Create a GET reoute which gets a random profile picture from "./profile_pictures/PNG/*"
// and returns it as a response

export async function GET() {
  const images = [
    './_static/profile_pictures/PNG/Blue.png',
    './_static/profile_pictures/PNG/Blue-Purple.png',
    './_static/profile_pictures/PNG/Green.png',
    './_static/profile_pictures/PNG/Green-Blue.png',
    './_static/profile_pictures/PNG/Purple.png',
    './_static/profile_pictures/PNG/Red.png',
  ]

  const randomImage = images[Math.floor(Math.random() * images.length)]

  return new Response(randomImage)
}
