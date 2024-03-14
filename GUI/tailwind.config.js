/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    colors: {
      "ls-vert-base": "var(--ls-vert-base)",
      "ls-vert-fonce": "var(--ls-vert-fonce)",
      "ls-bleu-fonce": "var(--ls-bleu-fonce)",

      "ls-prune": "var(--ls-prune)",
      "ls-orange": "var(--ls-orange)",
      "ls-gris": "var(--ls-gris)",
      "ls-turquoise": "var(--ls-turquoise)",
      "ls-bleu-clair": "var(--ls-bleu-clair)",
      "ls-rouge": "var(--ls-rouge)",
      "ls-rose": "var(--ls-rose)",

      "ls-baladins": "var(--ls-baladins)",
      "ls-louveteaux": "var(--ls-louveteaux)",
      "ls-eclaireurs": "var(--ls-eclaireurs)",
      "ls-pionniers": "var(--ls-pionniers)",
      "ls-mondial": "var(--ls-mondial)",
    },
    fontFamily: {
      sans: ['Muli', 'sans-serif'],
    }
  },
  plugins: [
    require('flowbite/plugin'),
  ],
}
