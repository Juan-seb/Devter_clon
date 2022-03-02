const timeline = [

  {
    id: "0",
    avatar: "https://placeimg.com/40/40/people",
    username: "wongmjane",
    message: `Twitter Web App now runs ES6+ for modern browsers*, reducing the polyfill bundle size by 83%
    (gzipped size went from 16.6 KB down to 2.7 KB!!)
    * Chrome 79+, Safari 14+, Firefox 68+`,
    name: "Soy el chinito"
  },
  {
    id: "1",
    avatar: "https://placeimg.com/40/40/people",
    username: "midudev",
    message: "Wow, devter está funcionando y vivo 🦉",
    name: "Miguel Ángel Durán",
  },
  {
    id: "2",
    username: "d4nidev",
    avatar: "https://placeimg.com/40/40/people",
    message: `Abro paraguas Paraguas
    
    Clean Code es un libro obsoleto que en 2020, con los paradigmas de desarrollo de software que manejamos, puede hacerte más daño que beneficio.`,
    name: "Daniel de la Cruz",
  },
  {
    id: "0",
    avatar: "https://placeimg.com/40/40/people",
    username: "wongmjane",
    message: `Twitter Web App now runs ES6+ for modern browsers*, reducing the polyfill bundle size by 83%
    (gzipped size went from 16.6 KB down to 2.7 KB!!)
    * Chrome 79+, Safari 14+, Firefox 68+`,
    name: "Soy el chinito"
  },
  {
    id: "0",
    avatar: "https://placeimg.com/40/40/people",
    username: "wongmjane",
    message: `Twitter Web App now runs ES6+ for modern browsers*, reducing the polyfill bundle size by 83%
    (gzipped size went from 16.6 KB down to 2.7 KB!!)
    * Chrome 79+, Safari 14+, Firefox 68+`,
    name: "Soy el chinito"
  },
  {
    id: "0",
    avatar: "https://placeimg.com/40/40/people",
    username: "wongmjane",
    message: `Twitter Web App now runs ES6+ for modern browsers*, reducing the polyfill bundle size by 83%
    (gzipped size went from 16.6 KB down to 2.7 KB!!)
    * Chrome 79+, Safari 14+, Firefox 68+`,
    name: "Soy el chinito"
  }

]

const handler = (req, res) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  res.send(JSON.stringify(timeline))

}

export default handler