import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
	plugins: [
		react(),
		VitePWA({
			registerType: 'autoUpdate',
			manifest: {
				name: "Hospital San Itario",
    			short_name: "Hospital",
				description: "App oficial del Hospital San Itario",
				theme_color: '#ffffff',
				start_url: '/',
				display: 'standalone',
				icons: [
					{
						src: '/icons/icon-192x192.png',
						sizes: '192x192',
						type: 'image/png'
					},
					{
						src: '/icons/icon-512x512.png',
						sizes: '512x512',
						type: 'image/png'
					}
				]
			},
			devOptions: {
				enabled: true
			}
		}
	)],
	server: {
		headers: {
			"X-Frame-Options": "DENY", 
			"Content-Security-Policy": "frame-ancestors 'none';", 
		},
	}
});
