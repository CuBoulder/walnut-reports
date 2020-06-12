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
        }
	}
  }
}