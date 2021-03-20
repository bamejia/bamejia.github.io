#Use to create local host
import sys
import http.server
import socketserver

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_my_headers()
        http.server.SimpleHTTPRequestHandler.end_headers(self)

    def send_my_headers(self):
        self.send_header("Cache-Control", "no-cache, no-store, must-revalidate")
        self.send_header("Pragma", "no-cache")
        self.send_header("Expires", "0")

PORT = None
if len(sys.argv) > 1 and sys.argv[1] is not None:
      try:
            PORT = int(sys.argv[1])
            if PORT < 0:
                  raise ValueError
      except ValueError:
            print("Port must be a positive integer")
            sys.exit()
else:
      PORT = 1337

Handler = MyHTTPRequestHandler
Handler.extensions_map.update({
      ".js": "application/javascript",
})

httpd = socketserver.TCPServer(("", PORT), Handler)

address_displayed = httpd.server_address[0] + ":" + str(httpd.server_address[1])
print(address_displayed)

httpd.serve_forever()