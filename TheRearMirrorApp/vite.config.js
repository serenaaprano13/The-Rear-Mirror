import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
<<<<<<< HEAD
    host:'0.0.0.0',
=======
    host:true,
>>>>>>> 8347eeee6551980192d7fee438a45d963c09033f
    port:5173
  }

})



