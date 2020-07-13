# README

'rake start' to run locally

WavesOn is a marine weather tracking web app I built because I often want to know the weather at the beach. Spending my summers at the beach I'm curious to know what temperature the water is, how large, and how often the waves cycle to the shore. I don't know about you, but I have run excitedly to the beach and laid down all my bags, quickly walking over to the water ready to feel the sea foam on my toes and salt water spray my face. When the water first touches my feet my first reaction nearly 90% of the time is, "Wow! That is cold! But... how cold is it really?" and now I can just as quickly load up WavesOn (hosted on Heroku) and see! Here's a link, https://waveson.herokuapp.com/ !

Because I spent the majority of my summers at the beach growing up, WavesOn was a real passion project for me that I am very proud of. I built WavesOn using Ruby on Rails for the backend, React.js for frontend, CSS for the style, and Adobe Photoshop for the loading illustration.

For the backend there are Users, Beaches, Favorites, and Notes. A User can have many Beaches through Favorites, and through Notes. This way a User can view Beaches, save a Beach to Favs, see all Favorite Beaches, view Beach data, and a User can save a Note with a photo to a Beach, regardless if the Beach is a Favorite or not. I'm utilizing two has-many-through relationships.

/*details for frontend, maybe? React is a system of components and very much "turtles on turtles".

LinkedIn: https://www.linkedin.com/in/catherine-batsoula-3983a218a/
