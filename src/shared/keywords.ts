export const KEYWORDS: Record<string, string[]> = {
  "HTTP Headers": [
    "Accept", "Accept-Charset", "Accept-Encoding", "Accept-Language",
    "Authorization", "Cache-Control", "Connection", "Content-Disposition",
    "Content-Encoding", "Content-Length", "Content-Type", "Cookie",
    "Host", "Origin", "Pragma", "Referer", "User-Agent",
    "X-Forwarded-For", "X-Forwarded-Host", "X-Forwarded-Proto",
    "X-Real-IP", "X-Requested-With", "X-CSRF-Token", "X-API-Key"
  ],
  "HTTP Methods": [
    "GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS", "HEAD", "TRACE", "CONNECT",
    "PROPFIND", "PROPPATCH", "MKCOL", "COPY", "MOVE", "LOCK", "UNLOCK"
  ],
  "Content-Types": [
    "application/json", "application/x-www-form-urlencoded", "multipart/form-data",
    "text/html", "text/plain", "text/xml", "application/xml", "application/javascript",
    "application/octet-stream", "image/png", "image/jpeg", "image/gif"
  ],
  "Status Codes": [
    "200 OK", "201 Created", "204 No Content", "301 Moved Permanently",
    "302 Found", "304 Not Modified", "400 Bad Request", "401 Unauthorized",
    "403 Forbidden", "404 Not Found", "405 Method Not Allowed",
    "500 Internal Server Error", "502 Bad Gateway", "503 Service Unavailable"
  ],
  "Encoding": [
    "base64", "url", "html", "unicode", "hex", "octal", "ascii", "utf-8", "utf-16"
  ],
  "Common Ports": [
    "21 FTP", "22 SSH", "23 Telnet", "25 SMTP", "53 DNS", "80 HTTP", "110 POP3",
    "143 IMAP", "443 HTTPS", "445 SMB", "993 IMAPS", "995 POP3S",
    "1433 MSSQL", "1521 Oracle", "3306 MySQL", "3389 RDP", "5432 PostgreSQL",
    "5900 VNC", "6379 Redis", "8080 HTTP-Alt", "8443 HTTPS-Alt", "27017 MongoDB"
  ]
};
