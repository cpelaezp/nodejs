var ftpd = require('ftp-server')
// Path to your FTP root 
ftpd.fsOptions.root = '/files/rohit'
// Start listening on port 21 (you need to be root for ports < 1024) 
ftpd.listen(21)