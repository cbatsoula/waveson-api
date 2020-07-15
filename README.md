# README

'rake start' to run locally

WavesOn is a marine weather tracking web app I built because I often want to know the weather at the beach. Spending my summers at the beach I'm curious to know what temperature the water is, how large, and how often the waves(swells) cycle to the shore. I don't know about you, but I have run excitedly to the beach and laid down all my bags, quickly walking over to the water ready to feel the sea foam on my toes and salt water spray my face. When the water first touches my feet my first reaction nearly 90% of the time is, "Wow! That is cold! But... how cold is it really?" and now I can just as quickly load up WavesOn (hosted on Heroku) and see! Here's a link, https://waveson.herokuapp.com/ ! Upon first visitation, click on the Sign Up button to create an account, and then next time you can just Log In. WavesOn will ask to use your location, I'm using Google's Geolocation to locate the User's latitude and longitude, and with those coordinates I'm searching through Google's Places of natural features/landmarks to find all the beaches around the user within a 13 mile radius. 

Because I spent the majority of my summers at the beach growing up, WavesOn was a real passion project for me that I am very proud of. I built WavesOn using Ruby on Rails for the backend, React.js for frontend, CSS for the style, and Adobe Photoshop for the loading illustration.

For the backend there are Users, Beaches, Favorites, and Notes. A User can have many Beaches through Favorites, and through Notes. Both Favorites and Notes have a field for the specific Beach, and for the specific User. This way a User can view Beaches, save a Beach to Favs, see all Favorite Beaches, view Beach data, and a User can save a Note with a photo to a Beach, regardless if the Beach is a Favorite or not, because sometimes a Note from a day might not be positive but the experience from that day could still be worth recording. I'm utilizing two has-many-through relationships.

/*details for frontend, maybe? React is a system of components and very much "turtles on turtles".

LinkedIn: https://www.linkedin.com/in/catherine-batsoula-3983a218a/
