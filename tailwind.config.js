// Primary: #17240f (RGB: 23, 36, 15)
//     Secondary: #fcfdfb (RGB: 252, 253, 251)
//     Primary Button: #88c068 (RGB: 136, 192, 104)
//     Secondary Button: #eef6e9 (RGB: 238, 246, 233)
//     Accent: #7ab856 (RGB: 122, 184, 86)

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/pages/**/*.{html,ejs,js}"],
    theme: {
        screens: {
            'phone': {'max': '800px'},
            'tablet':{'max': '1000px'},
            'laptop': {'min': '1024px'},
            'desktop': {'min': '1280px'},
        },
        extend: {
            fontFamily: {
                geologica: ['Geologica', 'sans-serif']
            },
            colors: {
                primary: '#17240f',
                secondary: '#fcfdfb',
                btn: {
                    primary: '#88c068',
                    secondary: '#eef6e9'
                },
                accent: '#7ab856'
            }
        },
    },
    plugins: [
        require ('tailwindcss'),
    ]
  }
  