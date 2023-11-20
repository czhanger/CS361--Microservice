# CS361--Microservice
<b> How to request data: </b>

Make sure to run the index.js server code. Create a client that is similar to the one in the index.html scripts section. 
By default the server is hosted on localhost port 8080, feel free to change the constants (PORT in server code and SERVER in client example code) to whatever you'd like. To convert a temperature, send the temperature digits followed by 'c' for Celsius or 'f' for Fahrenheit to the microservice server. Example call: '88f' would be converted and returned as '31.11c'

<b> How to receive data: </b>

Once connection is established between WebSockets, the temperature conversion requested will be automatically sent back to the client socket. In my example client code, the script listens for a return message and prints out the temperature stored in event.data. However, any websocket receiving process should work. 

<b> UML Sequence Diagram: </b>
![SCR-20231120-4jo](https://github.com/czhanger/CS361--Microservice/assets/107155998/d5a18a9d-af91-40d9-b96e-d40a46f7577e)
