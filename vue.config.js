module.exports = {
  devServer: {
  	proxy: {
	  	'/instance': {
	    	target: 'http://localhost:5000',
	        changeOrigin: true
	    },
        '/accounts':{
            target: 'http://localhost:5000',
            changeOrigin: true
        },
        '/atlas':{
            target: 'https://osr-prod-util01.int.colorado.edu',
            changeOrigin: true
        }
	}
  }
}