export default defineEventHandler((event) => {
  if (Math.random() < 0.1) { // Log 10% of requests
    const mem = process.memoryUsage()
    console.log('URL:', getRequestURL(event).href)
    console.log('Memory:', {
      heapUsed: `${Math.round(mem.heapUsed / 1024 / 1024)}MB`,
      rss: `${Math.round(mem.rss / 1024 / 1024)}MB`
    })
  }
})
